import { createServer, request, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { type Page } from '@playwright/test';
import { expect, test } from '@porsche-design-system/testing/playwright';
import { goto, waitForComponentsReady } from '../helpers';

// The static shell has loaded the components before the Suspense boundary arrives, so the parser creates the
// streamed hosts with their definition at hand. The patched Stencil runtime holds them until the parser has attached
// their declarative shadow root (#4162). Unexpected console output, such as the browser's "A second declarative
// shadow root cannot be created on a host" or a hydration error of React, fails these tests through the console guard.
const getLeftoverTemplates = (page: Page): Promise<string[]> =>
  page.evaluate(() =>
    Array.from(document.querySelectorAll('template[shadowrootmode]'), (template) =>
      (template.parentElement as HTMLElement).tagName.toLowerCase()
    )
  );

// Remembers the elements the parser created for the streamed hosts. React replaces them when it has to render the
// boundary again on the client after a hydration error.
const streamedHostIds = ['streamed-button', 'streamed-text', 'streamed-input'];
const trackParsedHosts = (page: Page) =>
  page.addInitScript((ids) => {
    const parsedHosts: Record<string, Element> = ((window as any).parsedHosts = {});
    new MutationObserver(() => {
      for (const id of ids) {
        const host = document.getElementById(id);
        if (host && !parsedHosts[id]) {
          parsedHosts[id] = host;
        }
      }
    }).observe(document, { childList: true, subtree: true });
  }, streamedHostIds);

const getHostsKeptByReact = (page: Page): Promise<string[]> =>
  page.evaluate(
    (ids) => ids.filter((id) => document.getElementById(id) === (window as any).parsedHosts[id]),
    streamedHostIds
  );

type HeldDocument = { url: string; isHeld: Promise<void>; release: () => void; close: () => Promise<void> };

// Proxies the app and holds the streamed document back inside a host, right before the given markup, the way a
// network does when a chunk of the response ends there, until the test releases it.
const holdDocumentInHost = async (
  baseURL: string,
  path: string,
  openingTag: string,
  before: string
): Promise<HeldDocument> => {
  const { hostname, port } = new URL(baseURL);
  let release!: () => void;
  const isReleased = new Promise<void>((resolve) => (release = resolve));
  let hold!: () => void;
  const isHeld = new Promise<void>((resolve) => (hold = resolve));

  const server: Server = createServer((req, res) => {
    const upstream = request(
      {
        hostname,
        port,
        path: req.url,
        method: req.method,
        // the document has to arrive as text to find the place to hold it
        headers: { ...req.headers, host: `${hostname}:${port}`, 'accept-encoding': 'identity' },
      },
      (upstreamRes) => {
        if (req.url !== path) {
          res.writeHead(upstreamRes.statusCode!, upstreamRes.headers);
          upstreamRes.pipe(res);
          return;
        }
        const { 'content-length': _, ...headers } = upstreamRes.headers;
        res.writeHead(upstreamRes.statusCode!, headers);
        let pendingHtml = '';
        let rest: Promise<void> | undefined;

        upstreamRes.setEncoding('utf8');
        upstreamRes.on('data', (html: string) => {
          if (rest) {
            rest = rest.then(() => void res.write(html));
            return;
          }
          pendingHtml += html;
          const hostIndex = pendingHtml.indexOf(openingTag);
          const holdIndex = hostIndex === -1 ? -1 : pendingHtml.indexOf(before, hostIndex);
          if (holdIndex === -1) {
            // passes on everything but the host, or the end of the chunk when the opening tag may go on in the next one
            const partialTagLength = Array.from(openingTag, (_, i) => openingTag.length - 1 - i).find((length) =>
              pendingHtml.endsWith(openingTag.slice(0, length))
            );
            const sentUntil = hostIndex === -1 ? pendingHtml.length - (partialTagLength ?? 0) : hostIndex;
            res.write(pendingHtml.slice(0, sentUntil));
            pendingHtml = pendingHtml.slice(sentUntil);
            return;
          }
          res.write(pendingHtml.slice(0, holdIndex));
          const heldHtml = pendingHtml.slice(holdIndex);
          hold();
          rest = isReleased.then(() => void res.write(heldHtml));
        });
        upstreamRes.on('end', () => {
          if (rest) {
            rest.then(() => res.end());
          } else {
            res.end(pendingHtml);
          }
        });
      }
    );
    req.pipe(upstream);
  });
  await new Promise<void>((resolve) => server.listen(0, 'localhost', resolve));

  return {
    url: `http://localhost:${(server.address() as AddressInfo).port}${path}`,
    isHeld,
    release,
    close: () => {
      server.closeAllConnections();
      return new Promise((resolve) => server.close(() => resolve()));
    },
  };
};

test('should keep the declarative shadow roots of streamed components', async ({ page }) => {
  await goto(page, '/streaming-props');

  await expect(page.locator('#streamed-button')).toHaveJSProperty('variant', 'secondary');
  expect(await getLeftoverTemplates(page)).toEqual([]);
});

test('should hydrate streamed components with element children', async ({ page }) => {
  await trackParsedHosts(page);
  await goto(page, '/streaming-children');
  const button = page.locator('#streamed-button');

  await expect(button).toHaveJSProperty('variant', 'secondary');
  await expect(button.locator('#streamed-button-label')).toHaveText('Streamed button');
  await expect(page.locator('#streamed-text')).toHaveText('Streamed text');
  await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible();
  expect(await getLeftoverTemplates(page)).toEqual([]);

  // React kept the server rendered hosts instead of rendering the boundary again on the client
  expect(await getHostsKeptByReact(page)).toEqual(streamedHostIds);
});

// A portal container, a toast or a script loader appends its node to the body. While the parser is inside a streamed
// host, that node is a next sibling of an ancestor of the host, which Stencil used to take for the parser being done
// with the host (https://github.com/stenciljs/core/issues/7049). The host has to wait for its end marker.
const appendNodeToBody = (page: Page): Promise<void> =>
  page.evaluate(() => {
    document.body.append(document.createElement('div'));
  });

test('should hydrate a streamed component when a script appends a node to the body before its declarative shadow root', async ({
  page,
  baseURL,
}) => {
  const heldDocument = await holdDocumentInHost(
    baseURL!,
    '/streaming-children',
    '<p-button id="streamed-button"',
    '<template'
  );
  await trackParsedHosts(page);

  try {
    await page.goto(heldDocument.url, { waitUntil: 'commit' });
    await heldDocument.isHeld;
    const button = page.locator('#streamed-button');
    await expect(button).toBeAttached();
    // the shell has loaded the components while the boundary was pending
    expect(await page.evaluate(() => !!customElements.get('p-button'))).toBe(true);

    await appendNodeToBody(page);
    // a host that starts attaches its shadow root right away, and the parser can't attach the declarative one anymore
    expect(await button.evaluate((host) => !!host.shadowRoot)).toBe(false);

    heldDocument.release();
    await page.waitForLoadState('load');
    await waitForComponentsReady(page);

    await expect(button).toHaveJSProperty('variant', 'secondary');
    await expect(button.locator('#streamed-button-label')).toHaveText('Streamed button');
    expect(await getLeftoverTemplates(page)).toEqual([]);
    expect(await getHostsKeptByReact(page)).toEqual(streamedHostIds);
  } finally {
    await heldDocument.close();
  }
});

test('should give a streamed input its slotted label when a script appends a node to the body before the label', async ({
  page,
  baseURL,
}) => {
  const heldDocument = await holdDocumentInHost(
    baseURL!,
    '/streaming-children',
    '<p-input-text id="streamed-input"',
    '<span slot="label"'
  );
  await trackParsedHosts(page);

  try {
    await page.goto(heldDocument.url, { waitUntil: 'commit' });
    await heldDocument.isHeld;
    const input = page.locator('#streamed-input');
    await expect(input).toBeAttached();
    expect(await page.evaluate(() => !!customElements.get('p-input-text'))).toBe(true);
    // the declarative shadow root is there, the label is not
    expect(await input.evaluate((host) => [!!host.shadowRoot, host.children.length])).toEqual([true, 0]);

    await appendNodeToBody(page);
    // time for a host that started by mistake to render
    await page.waitForTimeout(500);
    await expect(input).not.toHaveClass(/hydrated/);

    heldDocument.release();
    await page.waitForLoadState('load');
    await waitForComponentsReady(page);

    // a component that starts without its label never renders it, which leaves the input without accessible name
    await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible();
    expect(await getHostsKeptByReact(page)).toEqual(streamedHostIds);
  } finally {
    await heldDocument.close();
  }
});

test('should render streamed components with nested components', async ({ page }) => {
  await goto(page, '/streaming');

  await expect(page.getByText('Streamed content after 5 seconds')).toBeVisible();
  await expect(page.locator('p-tabs p-tabs-item').first()).toBeVisible();
  expect(await getLeftoverTemplates(page)).toEqual([]);
});
