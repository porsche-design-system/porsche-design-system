import { createServer, type Server, type ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';
import { type Page } from '@playwright/test';
import { expect, test } from '@porsche-design-system/testing/playwright';
import { sleep } from '../helpers';

// A server rendered host as the React SSR wrapper writes it: marked with `data-dsr`, its shadow DOM in a declarative
// shadow root, and an end marker after its children. When the markup is streamed after the components were defined,
// the parser creates the host with its definition at hand, before it has read the `<template>` and the children. The
// patched Stencil runtime then holds the host until the parser has read the end marker (see
// patches/@stencil+core+*.patch and #4162).
const hostStart = `<p-button id="host" data-ssr data-dsr data-ssr-props='{"variant":"secondary"}'>`;
const templateStart = '<template shadowrootmode="open"><span id="server-rendered">Server';
const templateEnd = ' rendered</span></template>';
// React can't render a comment, so the wrapper writes it into a stray frame element, whose tags the HTML parser drops
const endMarker = '<frame><!--dsr-end--></frame>';
const hostEnd = `Some label${endMarker}</p-button>`;

// WebKit on Linux reads the first 512 bytes to detect the content type before it starts the document, so the first
// chunk has to be longer than that
const sniffingBufferPadding = `<!-- ${'.'.repeat(2048)} -->`;

const getShell = ({ loadComponents }: { loadComponents: boolean }): string => `<!DOCTYPE html>
<html>
  <head>
    ${sniffingBufferPadding}
    <base href="http://localhost:8575">
    <script src="http://localhost:8575/index.js"></script>
  </head>
  <body>
    <script>
      ${loadComponents ? 'porscheDesignSystem.load();' : ''}
      window.firstRenderVariants = {};
      window.addEventListener('stencil_componentDidLoad', (e) => {
        const host = e.composedPath()[0];
        window.firstRenderVariants[host.id] = host.variant;
      });
    </script>
    <p id="shell">Shell</p>`;

const shell = getShell({ loadComponents: true });

type StreamedDocument = { url: string; sendNextChunk: () => Promise<void> };

let server: Server | undefined;

// Serves the chunks as one document, the first one right away and each further one when the test asks for it,
// so a test can look at the page while the response is still open.
const streamDocument = async (chunks: string[]): Promise<StreamedDocument> => {
  const remainingChunks = [...chunks];
  let resolveResponse: (response: ServerResponse) => void;
  const response = new Promise<ServerResponse>((resolve) => (resolveResponse = resolve));

  server = createServer((req, res) => {
    if (req.url !== '/') {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    res.write(remainingChunks.shift());
    resolveResponse(res);
  });
  await new Promise<void>((resolve) => server!.listen(0, 'localhost', resolve));

  return {
    url: `http://localhost:${(server.address() as AddressInfo).port}/`,
    sendNextChunk: async () => {
      const res = await response;
      const chunk = remainingChunks.shift();
      await new Promise<void>((resolve) =>
        remainingChunks.length ? res.write(chunk, () => resolve()) : res.end(chunk, resolve)
      );
    },
  };
};

test.afterEach(async () => {
  server?.closeAllConnections();
  await new Promise((resolve) => (server ? server.close(resolve) : resolve(undefined)));
  server = undefined;
});

const gotoShell = async (page: Page, url: string): Promise<void> => {
  await page.goto(url, { waitUntil: 'commit' });
  // the components have to be defined before the parser reaches the streamed host,
  // polled from outside, because WebKit runs no animation frames for page.waitForFunction() while the shell loads
  await expect.poll(() => page.evaluate(() => !!customElements.get('p-button'))).toBe(true);
  expect(await page.evaluate(() => document.readyState)).toBe('loading');
};

type HostState = {
  hasServerMarkup: boolean;
  hasShadowRoot: boolean;
  hasLeftoverTemplate: boolean;
  serverText: string | undefined;
};

const getHostState = (page: Page, id = 'host'): Promise<HostState | undefined> =>
  page.evaluate((id) => {
    const host = document.getElementById(id);
    if (!host) {
      return undefined;
    }
    const serverMarkup = host.shadowRoot?.querySelector('#server-rendered');
    return {
      hasServerMarkup: !!serverMarkup,
      hasShadowRoot: !!host.shadowRoot,
      hasLeftoverTemplate: !!host.querySelector(':scope > template'),
      serverText: serverMarkup?.textContent ?? undefined,
    };
  }, id);

const isRenderedByStencil = (page: Page, id = 'host'): Promise<boolean> =>
  page.evaluate((id) => {
    const host = document.getElementById(id);
    return !!host?.shadowRoot?.querySelector('button') && !host.shadowRoot.querySelector('#server-rendered');
  }, id);

const getFirstRenderVariant = (page: Page, id = 'host'): Promise<string | undefined> =>
  page.evaluate((id) => (window as any).firstRenderVariants[id], id);

// What a portal, a toast container or a script loader does while the document is still streamed. The node becomes
// the next sibling of an ancestor of every host the parser is inside of.
const appendNodeToBody = (page: Page): Promise<void> =>
  page.evaluate(() => {
    document.body.append(document.createElement('div'));
  });

const getChildNodes = (page: Page, id = 'host'): Promise<string[]> =>
  page.evaluate((id) => Array.from(document.getElementById(id)!.childNodes, ({ nodeName }) => nodeName), id);

const getServerNodesInShadowRoot = (page: Page, id = 'host'): Promise<string[]> =>
  page.evaluate(
    (id) =>
      Array.from(document.getElementById(id)!.shadowRoot!.querySelectorAll('[id^="server-rendered"]'), (el) => el.id),
    id
  );

test.describe('server rendered host streamed after the components are defined', () => {
  test('should keep the declarative shadow root while the template is streamed and render once the host is parsed', async ({
    page,
  }) => {
    const { url, sendNextChunk } = await streamDocument([
      shell,
      // the chunk ends in the middle of the template
      hostStart + templateStart,
      templateEnd + hostEnd + '<p id="after">After</p>',
      '</body></html>',
    ]);
    await gotoShell(page, url);

    await sendNextChunk();
    await expect.poll(() => getHostState(page)).toMatchObject({ hasServerMarkup: true, serverText: 'Server' });
    // the server markup stays visible, the component has not started
    expect(await isRenderedByStencil(page)).toBe(false);
    expect(await getFirstRenderVariant(page)).toBeUndefined();

    await sendNextChunk();
    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    expect(await page.evaluate(() => document.readyState), 'renders while the document is still streamed').toBe(
      'loading'
    );
    expect(await getHostState(page)).toMatchObject({ hasShadowRoot: true, hasLeftoverTemplate: false });
    await expect(page.locator('#host')).toHaveText('Some label');
    await expect(page.locator('#host')).not.toHaveAttribute('data-ssr-props');
    expect(await getFirstRenderVariant(page), 'first render variant').toBe('secondary');

    await sendNextChunk();
    await page.waitForLoadState('domcontentloaded');
    expect(await isRenderedByStencil(page)).toBe(true);
  });

  test('should render a complete host while the document is still streamed, with nothing after it', async ({
    page,
  }) => {
    const { url, sendNextChunk } = await streamDocument([
      shell,
      // the end marker tells that the host is complete, nothing has to follow it
      hostStart + templateStart + templateEnd + hostEnd,
      '',
    ]);
    await gotoShell(page, url);

    await sendNextChunk();
    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    expect(await page.evaluate(() => document.readyState)).toBe('loading');
    expect(await getHostState(page)).toMatchObject({ hasShadowRoot: true, hasLeftoverTemplate: false });
    expect(await getFirstRenderVariant(page), 'first render variant').toBe('secondary');
    // the markers of the server are gone, and the parser has left no frame element behind
    await expect(page.locator('#host')).not.toHaveAttribute('data-dsr');
    expect(await getChildNodes(page)).toEqual(['#text']);

    await sendNextChunk();
  });

  test('should render a host without end marker once the document is parsed', async ({ page }) => {
    const { url, sendNextChunk } = await streamDocument([
      shell,
      // e.g. when something between the server and the browser removes comments
      `${hostStart + templateStart + templateEnd}Some label</p-button><p id="after">After</p>`,
      '</body></html>',
    ]);
    await gotoShell(page, url);

    await sendNextChunk();
    await expect
      .poll(() => getHostState(page))
      .toMatchObject({ hasServerMarkup: true, serverText: 'Server rendered', hasLeftoverTemplate: false });
    await sleep(500);
    expect(await isRenderedByStencil(page)).toBe(false);

    await sendNextChunk();
    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    expect(await getFirstRenderVariant(page), 'first render variant').toBe('secondary');
  });

  test('should render a complete host in a shadow root while the document is still streamed, with nothing after it', async ({
    page,
  }) => {
    const { url, sendNextChunk } = await streamDocument([
      shell,
      // e.g. the declarative shadow root of a component of the application. What the parser adds within a shadow root
      // is no mutation of the document, so nothing else tells that the end marker has arrived
      // (https://github.com/stenciljs/core/issues/7058).
      `<div id="outer"><template shadowrootmode="open">${hostStart}${templateStart}${templateEnd}${hostEnd}`,
      '</template></div></body></html>',
    ]);
    await gotoShell(page, url);
    const isRenderedByStencilInShadowRoot = (): Promise<boolean> =>
      page.evaluate(() => {
        const host = document.getElementById('outer')?.shadowRoot?.getElementById('host');
        return !!host?.shadowRoot?.querySelector('button') && !host.shadowRoot.querySelector('#server-rendered');
      });

    await sendNextChunk();
    await expect.poll(isRenderedByStencilInShadowRoot).toBe(true);
    expect(await page.evaluate(() => document.readyState)).toBe('loading');
    expect(await getFirstRenderVariant(page), 'first render variant').toBe('secondary');

    await sendNextChunk();
  });

  test('should render a server rendered host nested in the light DOM of another one', async ({ page }) => {
    const { url, sendNextChunk } = await streamDocument([
      shell,
      `<p-fieldset id="parent" data-ssr data-dsr><template shadowrootmode="open"><span id="server-rendered">Server rendered</span><slot></slot></template>${hostStart}${templateStart}`,
      `${templateEnd}${hostEnd}${endMarker}</p-fieldset><p id="after">After</p>`,
      '</body></html>',
    ]);
    await gotoShell(page, url);

    await sendNextChunk();
    await expect.poll(() => getHostState(page)).toMatchObject({ hasServerMarkup: true, serverText: 'Server' });
    expect(await getHostState(page, 'parent')).toMatchObject({ hasServerMarkup: true, hasLeftoverTemplate: false });

    await sendNextChunk();
    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    await expect
      .poll(() => getHostState(page, 'parent'))
      .toMatchObject({ hasServerMarkup: false, hasShadowRoot: true, hasLeftoverTemplate: false });
    expect(await getHostState(page)).toMatchObject({ hasLeftoverTemplate: false });
    expect(await getFirstRenderVariant(page), 'first render variant').toBe('secondary');

    await sendNextChunk();
  });
});

// A next sibling of the host or of one of its ancestors doesn't tell that the parser is done with the host: a script
// can insert one while the parser is still inside the host. Only the end marker does
// (https://github.com/stenciljs/core/issues/7049).
test.describe('node inserted by a script while a server rendered host is streamed', () => {
  test('should keep waiting for the declarative shadow root when the node is inserted before it', async ({ page }) => {
    const { url, sendNextChunk } = await streamDocument([
      `${shell}<main>`,
      // the chunk ends after the opening tag of the host
      hostStart,
      templateStart,
      `${templateEnd}${hostEnd}</main><p id="after">After</p>`,
      '</body></html>',
    ]);
    await gotoShell(page, url);

    await sendNextChunk();
    await expect.poll(() => getHostState(page)).toMatchObject({ hasShadowRoot: false });
    await appendNodeToBody(page);
    // a host that starts attaches its shadow root right away, and the parser can't attach the declarative one anymore
    expect(await getHostState(page)).toMatchObject({ hasShadowRoot: false });

    await sendNextChunk();
    await expect
      .poll(() => getHostState(page))
      .toMatchObject({ hasServerMarkup: true, serverText: 'Server', hasLeftoverTemplate: false });

    await sendNextChunk();
    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    expect(await page.evaluate(() => document.readyState)).toBe('loading');
    expect(await getHostState(page)).toMatchObject({ hasShadowRoot: true, hasLeftoverTemplate: false });
    expect(await getFirstRenderVariant(page), 'first render variant').toBe('secondary');

    await sendNextChunk();
  });

  test('should not start while the declarative shadow root is streamed', async ({ page }) => {
    const { url, sendNextChunk } = await streamDocument([
      `${shell}<main>`,
      // the chunk ends between two nodes of the declarative shadow root
      `${hostStart}<template shadowrootmode="open"><span id="server-rendered">Server rendered</span>`,
      `<span id="server-rendered-late">Late</span></template>${hostEnd}</main><p id="after">After</p>`,
      '</body></html>',
    ]);
    await gotoShell(page, url);

    await sendNextChunk();
    await expect.poll(() => getHostState(page)).toMatchObject({ hasServerMarkup: true });
    await appendNodeToBody(page);
    // time for a host that started by mistake to render
    await sleep(500);
    expect(await getFirstRenderVariant(page), 'has not started').toBeUndefined();
    expect(await getServerNodesInShadowRoot(page)).toEqual(['server-rendered']);

    await sendNextChunk();
    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    // the parser would add the late node to a shadow root the component has rendered already
    expect(await getServerNodesInShadowRoot(page)).toEqual([]);
    expect(await getFirstRenderVariant(page), 'first render variant').toBe('secondary');

    await sendNextChunk();
  });

  test('should not start before its children are streamed', async ({ page }) => {
    const { url, sendNextChunk } = await streamDocument([
      `${shell}<main>`,
      // the chunk ends after the declarative shadow root, before the slotted label
      `<p-input-text id="host" data-ssr data-dsr data-ssr-props='{"name":"field"}'><template shadowrootmode="open"><span id="server-rendered">Server rendered</span></template>`,
      `<span slot="label">Search</span>${endMarker}</p-input-text></main><p id="after">After</p>`,
      '</body></html>',
    ]);
    await gotoShell(page, url);
    const host = page.locator('#host');

    await sendNextChunk();
    await expect.poll(() => getHostState(page)).toMatchObject({ hasServerMarkup: true });
    await appendNodeToBody(page);
    // time for a host that started by mistake to render
    await sleep(500);
    await expect(host).not.toHaveClass(/hydrated/);
    expect(await getServerNodesInShadowRoot(page)).toEqual(['server-rendered']);

    await sendNextChunk();
    await expect(host).toHaveClass(/hydrated/);
    // a component that starts without its label never renders it, which leaves the input without accessible name
    await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible();

    await sendNextChunk();
  });

  test('should keep waiting for the declarative shadow root when the components are loaded before it', async ({
    page,
  }) => {
    const { url, sendNextChunk } = await streamDocument([
      `${getShell({ loadComponents: false })}<main>`,
      hostStart,
      `${templateStart}${templateEnd}${hostEnd}</main><p id="after">After</p>`,
      '</body></html>',
    ]);
    await page.goto(url, { waitUntil: 'commit' });
    await expect.poll(() => page.evaluate(() => 'porscheDesignSystem' in window)).toBe(true);

    await sendNextChunk();
    await expect.poll(() => getHostState(page)).toMatchObject({ hasShadowRoot: false });
    await page.evaluate(() => (window as any).porscheDesignSystem.load());
    await expect.poll(() => page.evaluate(() => !!customElements.get('p-button'))).toBe(true);
    // the loader has appended the script of the core chunk to the body, which is what releases the host by mistake
    expect(await page.evaluate(() => document.querySelector('main')!.nextElementSibling?.localName)).toBe('script');
    expect(await getHostState(page)).toMatchObject({ hasShadowRoot: false });

    await sendNextChunk();
    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    expect(await getHostState(page)).toMatchObject({ hasShadowRoot: true, hasLeftoverTemplate: false });
    expect(await getFirstRenderVariant(page), 'first render variant').toBe('secondary');

    await sendNextChunk();
  });
});

test.describe('clone of a server rendered host that has started', () => {
  test('should start while the document is still streamed', async ({ page }) => {
    const { url, sendNextChunk } = await streamDocument([
      shell,
      `${hostStart}${templateStart}${templateEnd}${hostEnd}<p id="after">After</p>`,
      '</body></html>',
    ]);
    await gotoShell(page, url);

    await sendNextChunk();
    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    // the markers are gone, so that a clone, which has no end marker, isn't held until the document is parsed
    await expect(page.locator('#host')).not.toHaveAttribute('data-dsr');
    expect(await getChildNodes(page)).toEqual(['#text']);

    await page.evaluate(() => {
      const clone = document.getElementById('host')!.cloneNode(true) as HTMLElement;
      clone.id = 'clone';
      document.body.append(clone);
    });
    await expect.poll(() => getFirstRenderVariant(page, 'clone')).toBeDefined();
    expect(await page.evaluate(() => document.readyState)).toBe('loading');

    await sendNextChunk();
  });
});

test.describe('server rendered host that React has hydrated before the components are loaded', () => {
  // the usual order in an application: the provider loads the components in an effect, after React has hydrated
  for (const { name, addChild, childNodes } of [
    { name: 'that React has not changed', addChild: false, childNodes: [] },
    { name: 'that React has added a child to', addChild: true, childNodes: ['SPAN'] },
  ]) {
    test(`should remove the end marker from a host ${name}`, async ({ page }) => {
      const { url, sendNextChunk } = await streamDocument([
        getShell({ loadComponents: false }),
        // without children, like an icon only item: a component that reads its children must not find the marker
        `${hostStart}${templateStart}${templateEnd}${endMarker}</p-button><p id="after">After</p>`,
        '</body></html>',
      ]);
      await page.goto(url, { waitUntil: 'commit' });
      await expect.poll(() => page.evaluate(() => 'porscheDesignSystem' in window)).toBe(true);

      await sendNextChunk();
      await expect.poll(() => getHostState(page)).toMatchObject({ hasServerMarkup: true });
      expect(await getChildNodes(page)).toEqual(['#comment']);
      await page.evaluate((addChild) => {
        const host = document.getElementById('host')!;
        // what the React SSR wrapper does once React has hydrated the host, React itself leaves the comment alone
        host.removeAttribute('data-dsr');
        if (addChild) {
          host.append(document.createElement('span'));
        }
        (window as any).porscheDesignSystem.load();
      }, addChild);

      await expect.poll(() => isRenderedByStencil(page)).toBe(true);
      expect(await getChildNodes(page)).toEqual(childNodes);
      expect(await page.evaluate(() => document.getElementById('host')!.innerHTML)).toBe(
        addChild ? '<span></span>' : ''
      );

      await sendNextChunk();
    });
  }

  test('should start a host that is held without end marker once React has hydrated it', async ({ page }) => {
    const { url, sendNextChunk } = await streamDocument([
      shell,
      // e.g. when something between the server and the browser removes comments: the components are loaded and hold
      // the host until the document is parsed
      `${hostStart + templateStart + templateEnd}Some label</p-button><p id="after">After</p>`,
      '</body></html>',
    ]);
    await gotoShell(page, url);

    await sendNextChunk();
    await expect.poll(() => getHostState(page)).toMatchObject({ hasServerMarkup: true });
    await sleep(500);
    expect(await isRenderedByStencil(page)).toBe(false);

    // what the React SSR wrapper does once React has hydrated the host, it changes nothing else in the document
    await page.evaluate(() => document.getElementById('host')!.removeAttribute('data-dsr'));
    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    expect(await page.evaluate(() => document.readyState)).toBe('loading');
    expect(await getHostState(page)).toMatchObject({ hasShadowRoot: true, hasLeftoverTemplate: false });

    await sendNextChunk();
  });

  test('should start while the document is still streamed, although React has replaced its children', async ({
    page,
  }) => {
    const { url, sendNextChunk } = await streamDocument([
      getShell({ loadComponents: false }),
      `${hostStart}${templateStart}${templateEnd}${hostEnd}<p id="after">After</p>`,
      '</body></html>',
    ]);
    await page.goto(url, { waitUntil: 'commit' });
    await expect.poll(() => page.evaluate(() => 'porscheDesignSystem' in window)).toBe(true);

    await sendNextChunk();
    await expect.poll(() => getHostState(page)).toMatchObject({ hasServerMarkup: true, serverText: 'Server rendered' });
    await page.evaluate(() => {
      const host = document.getElementById('host')!;
      // what the React SSR wrapper does once React has hydrated the host,
      host.removeAttribute('data-dsr');
      // and what React does when the component gets another label right after, which removes the end marker
      host.textContent = 'Another label';
      (window as any).porscheDesignSystem.load();
    });

    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    expect(await page.evaluate(() => document.readyState)).toBe('loading');
    await expect(page.locator('#host')).toHaveText('Another label');

    await sendNextChunk();
  });
});

test.describe('host without server rendering streamed after the components are defined', () => {
  test('should render right away, without waiting for the rest of the document', async ({ page }) => {
    const { url, sendNextChunk } = await streamDocument([
      shell,
      // the chunk ends inside the host
      '<p-button id="host" variant="secondary">Some',
      ' label</p-button><p id="after">After</p>',
      '</body></html>',
    ]);
    await gotoShell(page, url);

    await sendNextChunk();
    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    expect(await getFirstRenderVariant(page), 'first render variant').toBe('secondary');

    await sendNextChunk();
    await expect(page.locator('#host')).toHaveText('Some label');

    await sendNextChunk();
  });
});
