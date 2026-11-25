import { createServer, type Server, type ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';
import { type Page } from '@playwright/test';
import { expect, test } from '@porsche-design-system/testing/playwright';

// A server rendered host as the React SSR wrapper writes it: marked with `data-dsr`, its shadow DOM in a declarative
// shadow root. When the markup is streamed after the components were defined, the parser creates the host with its
// definition at hand, before it has read the `<template>`. The patched Stencil runtime then holds the host until the
// parser is done with it (see patches/@stencil+core+*.patch and #4162).
const hostStart = `<p-button id="host" data-ssr data-dsr data-ssr-props='{"variant":"secondary"}'>`;
const templateStart = '<template shadowrootmode="open"><span id="server-rendered">Server';
const templateEnd = ' rendered</span></template>';
const hostEnd = 'Some label</p-button>';

const shell = `<!DOCTYPE html>
<html>
  <head>
    <base href="http://localhost:8575">
    <script src="http://localhost:8575/index.js"></script>
  </head>
  <body>
    <script>
      porscheDesignSystem.load();
      window.firstRenderVariants = {};
      window.addEventListener('stencil_componentDidLoad', (e) => {
        const host = e.composedPath()[0];
        window.firstRenderVariants[host.id] = host.variant;
      });
    </script>
    <p id="shell">Shell</p>`;

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

  test('should render a host at the very end of the document once the document is parsed', async ({ page }) => {
    const { url, sendNextChunk } = await streamDocument([
      shell,
      // nothing follows the host, so only the end of the document tells that it is complete
      hostStart + templateStart + templateEnd + hostEnd,
      '',
    ]);
    await gotoShell(page, url);

    await sendNextChunk();
    await expect
      .poll(() => getHostState(page))
      .toMatchObject({ hasServerMarkup: true, serverText: 'Server rendered', hasLeftoverTemplate: false });
    expect(await isRenderedByStencil(page)).toBe(false);

    await sendNextChunk();
    await expect.poll(() => isRenderedByStencil(page)).toBe(true);
    expect(await getHostState(page)).toMatchObject({ hasShadowRoot: true, hasLeftoverTemplate: false });
    expect(await getFirstRenderVariant(page), 'first render variant').toBe('secondary');
  });

  test('should render a server rendered host nested in the light DOM of another one', async ({ page }) => {
    const { url, sendNextChunk } = await streamDocument([
      shell,
      `<p-fieldset id="parent" data-ssr data-dsr><template shadowrootmode="open"><span id="server-rendered">Server rendered</span><slot></slot></template>${hostStart}${templateStart}`,
      `${templateEnd}${hostEnd}</p-fieldset><p id="after">After</p>`,
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
