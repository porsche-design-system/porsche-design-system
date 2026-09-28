import { type BrowserContext, expect, type Frame, type Page, type Request, test } from '@playwright/test';

/**
 * The patterns and templates the storefront frames from `public/examples/`, and opens in StackBlitz.
 *
 * Both halves come from the build of `@porsche-design-system/examples`: the self-contained page in the iframe and the
 * `stackblitz.json` next to it. What is asserted here is the part the storefront adds – that the page is served by
 * this deployment, same-origin, with its media resolved against the slug, and that the payload reaches StackBlitz with
 * those media made absolute.
 */

/** Every storefront page framing examples, with the examples it frames. */
const pagesWithExamples: [path: string, examples: string[]][] = [
  ['/patterns/header/', ['patterns/header/overlay', 'patterns/header/stacked']],
  ['/patterns/footer/', ['patterns/footer']],
  ['/patterns/feedback/', ['patterns/feedback/inline', 'patterns/feedback/dialog']],
  [
    '/patterns/popover/',
    ['patterns/popover/local-market-switch', 'patterns/popover/priority-navigation', 'patterns/popover/feature-tour'],
  ],
  ['/templates/admin-panel/', ['templates/admin-panel']],
  ['/templates/landing-page/', ['templates/landing-page']],
];

/**
 * Serves the Porsche Design System CDN from `serve-cdn`.
 *
 * The copy step already points the literal URLs of a framed page at the local CDN, but the loader partial builds the
 * URL of the components at runtime (`"https://cdn.ui.porsche." + …`), so that one request still leaves for production –
 * where the chunks of an unreleased build do not exist.
 */
const routeCdnToLocal = async (context: BrowserContext): Promise<void> => {
  await context.route(/^https:\/\/cdn\.ui\.porsche\.com\/porsche-design-system\//, async (route) => {
    const url = route
      .request()
      .url()
      .replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001');
    await route.fulfill({ response: await route.fetch({ url }) });
  });
};

const waitForComponentsReady = (frame: Frame) =>
  frame.waitForFunction(() => {
    const pdsElements = Array.from(document.querySelectorAll('*')).filter((element) =>
      element.tagName.startsWith('P-')
    );
    return (
      pdsElements.length > 0 &&
      document.querySelectorAll(':not(:defined)').length === 0 &&
      pdsElements.every((element) => element.classList.contains('hydrated'))
    );
  });

const getExampleFrames = async (page: Page): Promise<Frame[]> => {
  const iframes = page.locator('iframe[src*="/examples/"]');
  await expect(iframes.first()).toBeAttached();

  const frames: Frame[] = [];
  for (const iframe of await iframes.all()) {
    const frame = await (await iframe.elementHandle())?.contentFrame();
    if (frame) frames.push(frame);
  }
  return frames;
};

test.beforeEach(async ({ context }) => {
  await routeCdnToLocal(context);
});

for (const [path, examples] of pagesWithExamples) {
  test.describe(path, () => {
    test('frames its examples from this deployment', async ({ page }) => {
      const mediaResponses: { url: string; status: number }[] = [];
      page.on('response', (response) => {
        if (response.url().includes('/examples/media/')) {
          mediaResponses.push({ url: response.url(), status: response.status() });
        }
      });

      await page.goto(path);

      const iframes = page.locator('iframe[src*="/examples/"]');
      await expect(iframes).toHaveCount(examples.length);
      for (const [index, example] of examples.entries()) {
        await expect(iframes.nth(index)).toHaveAttribute('src', `/examples/${example}/index.html`);
      }

      for (const frame of await getExampleFrames(page)) {
        // Same-origin, which is what lets the page be framed without a second origin in the CSP.
        expect(new URL(frame.url()).origin).toBe(new URL(page.url()).origin);
        await waitForComponentsReady(frame);
        await expect(frame.locator('style')).not.toHaveCount(0);
      }

      // 206 is the answer to the range requests a browser plays a video with.
      for (const { url, status } of mediaResponses) {
        expect([200, 206], url).toContain(status);
      }
    });

    test('links every example in full screen', async ({ page }) => {
      await page.goto(path);

      const links = page.getByRole('link', { name: 'View Fullscreen' });
      await expect(links).toHaveCount(examples.length);
      for (const [index, example] of examples.entries()) {
        await expect(links.nth(index)).toHaveAttribute('href', `/examples/${example}/index.html`);
      }
    });
  });
}

test('opens an example in StackBlitz as the project it was built from', async ({ page, context }) => {
  // The form the SDK submits is answered here instead of by stackblitz.com, which a test must not depend on.
  let stackblitzRequest: Request | undefined;
  await context.route(/^https:\/\/stackblitz\.com\//, async (route) => {
    stackblitzRequest = route.request();
    await route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>StackBlitz</title>' });
  });

  // The button is busy until the viewer has fetched the payload on mount – see `OpenExampleInStackblitz`.
  const payloadResponse = page.waitForResponse(/\/examples\/templates\/landing-page\/stackblitz\.json$/);
  await page.goto('/templates/landing-page/');
  expect((await payloadResponse).status()).toBe(200);

  const button = page.getByRole('button', { name: 'Open in StackBlitz' });

  const popupPromise = page.waitForEvent('popup');
  await button.click();
  await (await popupPromise).waitForLoadState();

  expect(stackblitzRequest?.method()).toBe('POST');
  const fields = new URLSearchParams(stackblitzRequest?.postData() ?? '');
  const origin = new URL(page.url()).origin;

  expect(fields.get('project[template]')).toBe('node');
  expect(fields.get('project[title]')).toMatch(/\| Dummy Patterns$/);
  for (const file of ['package.json', 'vite.config.ts', 'index.html', 'main.js', 'style.css']) {
    expect(fields.get(`project[files][${file}]`), file).toBeTruthy();
  }

  // The WebContainer loads the media cross-origin, so they have to point at this deployment in full.
  const indexHtml = fields.get('project[files][index.html]') ?? '';
  expect(indexHtml).toContain(`src="${origin}/examples/media/`);
  expect(indexHtml).not.toMatch(/(src|poster)="\/examples\/media\//);
});

test('switches an example between its preview and its code, one file per tab', async ({ page }) => {
  const payloadResponse = page.waitForResponse(/\/examples\/templates\/landing-page\/stackblitz\.json$/);
  await page.goto('/templates/landing-page/');
  const { files } = (await (await payloadResponse).json()) as { files: Record<string, string> };

  // The tabs are slotted into the tablist of `p-tabs-bar`, so they are found below its host rather than the tablist.
  const tabsBar = page.locator('p-tabs-bar', { has: page.getByRole('tab', { name: 'Preview' }) });
  const tabs = tabsBar.getByRole('tab');
  const iframe = page.locator('iframe[src*="/examples/"]');
  const code = page.getByRole('region', { name: /^(HTML|CSS|JS) of / });

  await expect(page.getByRole('tablist', { name: 'Select the view of Template: Landing Page' })).toBeVisible();
  await expect(tabs).toHaveText(['Preview', 'HTML', 'CSS', 'JS']);
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Preview' })).toBeVisible();
  await expect(code).toHaveCount(0);

  // Marks the framed document, to tell a hidden iframe from a reloaded one on the way back.
  const frame = await (await iframe.elementHandle())?.contentFrame();
  await frame?.evaluate(() => {
    (window as Window & { isUntouched?: boolean }).isUntouched = true;
  });

  const tabFiles = [
    ['HTML', 'index.html'],
    ['CSS', 'style.css'],
    ['JS', 'main.js'],
  ];
  for (const [index, [name, file]] of tabFiles.entries()) {
    await tabs.nth(index + 1).click();
    await expect(tabs.nth(index + 1)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel', { name })).toBeVisible();
    await expect(iframe).toBeHidden();
    await expect(code).toHaveAccessibleName(`${name} of Template: Landing Page`);
    // The highlighter splits the code into spans, the text stays the file's verbatim.
    expect(await code.textContent()).toBe(files[file]);
  }

  // Long lines scroll inside the code instead of widening it beyond its column.
  await tabs.nth(1).click();
  const [panelBox, codeBox] = await Promise.all([
    page.getByRole('tabpanel', { name: 'HTML' }).boundingBox(),
    code.boundingBox(),
  ]);
  expect(codeBox?.width).toBeLessThanOrEqual(panelBox?.width ?? 0);
  expect(await code.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);

  await tabs.first().click();
  await expect(iframe).toBeVisible();
  await expect(code).toHaveCount(0);
  expect(await frame?.evaluate(() => (window as Window & { isUntouched?: boolean }).isUntouched)).toBe(true);
});

test('keeps the toolbar of a resized example within its column when the window narrows', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 900 });
  await page.goto('/templates/landing-page/');

  const toolbar = page.locator('div:has(> div > p-tabs-bar)');
  const viewer = toolbar.locator('xpath=..');
  const columnWidth = (await viewer.boundingBox())?.width;

  await page.setViewportSize({ width: 1400, height: 900 });
  // Resized from wider than the narrow column, so the px width left behind exceeds it.
  await expect.poll(async () => (await viewer.boundingBox())?.width).toBeGreaterThan(800);
  await page.getByRole('slider').focus();
  await page.keyboard.press('PageDown');
  await expect(page.getByRole('button', { name: /^Reset \d+px viewport width$/ })).toBeVisible();
  await page.setViewportSize({ width: 600, height: 900 });

  // The preview has a width in px now, which must not widen the grid column the toolbar shares with it – the
  // toolbar would overflow the viewer instead of wrapping.
  await expect.poll(async () => (await toolbar.boundingBox())?.width).toBe(columnWidth);

  // The width shown, and announced by the slider, is the one the column caps the preview at, not the one chosen.
  const renderedWidth = Math.round((await page.locator('iframe[src*="/examples/"]').boundingBox())?.width ?? 0);
  expect(renderedWidth).toBeLessThan(800);
  await expect(page.getByRole('button', { name: `Reset ${renderedWidth}px viewport width` })).toBeVisible();
  await expect(page.getByRole('slider')).toHaveAttribute('aria-valuenow', String(renderedWidth));

  // Once the window is wide again, so is the preview – at the width chosen.
  await page.setViewportSize({ width: 1400, height: 900 });
  await expect
    .poll(async () => (await page.locator('iframe[src*="/examples/"]').boundingBox())?.width)
    .toBeGreaterThan(800);
  await expect(page.getByRole('button', { name: /^Reset \d+px viewport width$/ })).not.toHaveAccessibleName(
    `Reset ${renderedWidth}px viewport width`
  );
});

test('explains the setup of the examples next to their tabs', async ({ page }) => {
  await page.goto('/templates/landing-page/');

  const info = page.getByRole('button', { name: 'About the setup of Template: Landing Page' });
  await expect(info).toHaveAttribute('aria-expanded', 'false');

  await info.click();
  await expect(info).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText(/rely on Tailwind CSS, which requires a bundler such as Vite/)).toBeVisible();
});

test('tells while the code of an example loads, and when it failed to', async ({ page }) => {
  // Held until the assertions on the loading state are done, then answered with a 404.
  let answer = () => {};
  const isAnswered = new Promise<void>((resolve) => {
    answer = resolve;
  });
  await page.route(/\/examples\/templates\/landing-page\/stackblitz\.json$/, async (route) => {
    await isAnswered;
    await route.fulfill({ status: 404 });
  });
  await page.goto('/templates/landing-page/');

  const stackblitz = page.getByRole('button', { name: 'Open in StackBlitz' });
  const codePanel = page.getByRole('tabpanel', { name: 'HTML' });

  await page.getByRole('tab', { name: 'HTML' }).click();
  await expect(codePanel.getByRole('alert', { name: 'Loading the code of Template: Landing Page' })).toBeAttached();
  await expect(stackblitz).toBeDisabled();

  answer();
  await expect(codePanel.getByText('The code could not be loaded.')).toBeVisible();
  await expect(codePanel.getByRole('alert')).toHaveCount(0);
  await expect(stackblitz).toBeDisabled();
  // The preview does not depend on the payload.
  await page.getByRole('tab', { name: 'Preview' }).click();
  await expect(page.locator('iframe[src*="/examples/"]')).toBeVisible();
});

test('resets a resized preview to its full width, and offers that on the preview only', async ({ page }) => {
  await page.goto('/templates/landing-page/');

  const previewPanel = page.getByRole('tabpanel', { name: 'Preview' });
  const iframe = page.locator('iframe[src*="/examples/"]');
  const reset = page.getByRole('button', { name: /^Reset \d+px viewport width$/ });
  const fullWidth = (await previewPanel.boundingBox())?.width;

  await expect(reset).toHaveCount(0);
  await page.getByRole('slider').focus();
  await page.keyboard.press('PageDown');
  await expect(reset).toBeVisible();
  expect((await iframe.boundingBox())?.width).toBeLessThan(fullWidth ?? 0);

  await page.getByRole('tab', { name: 'CSS' }).click();
  await expect(reset).toHaveCount(0);
  await page.getByRole('tab', { name: 'Preview' }).click();
  await expect(reset).toBeVisible();

  await reset.click();
  await expect(reset).toHaveCount(0);
  await expect.poll(async () => (await iframe.boundingBox())?.width).toBe(fullWidth);
});

test('switches every example of a page on its own, at the height of its preview', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('/patterns/header/');

  const overlay = page.getByTitle('Header: Overlay');
  const stacked = page.getByTitle('Header: Stacked');
  const previewHeight = (await overlay.boundingBox())?.height;

  await page.getByRole('tab', { name: 'JS' }).first().click();

  await expect(overlay).toBeHidden();
  await expect(stacked).toBeVisible();
  await expect(page.getByRole('region', { name: 'JS of Header: Overlay' })).toBeVisible();
  await expect(page.getByRole('region', { name: /^(HTML|CSS|JS) of Header: Stacked$/ })).toHaveCount(0);
  await expect(page.getByRole('tab', { name: 'Preview' }).nth(1)).toHaveAttribute('aria-selected', 'true');

  // The code takes the place of the preview at its height, so the page does not move on a switch.
  expect((await page.getByRole('region', { name: 'JS of Header: Overlay' }).boundingBox())?.height).toBe(previewHeight);
});

test('frames the framework apps from the examples repository, without the example controls', async ({ page }) => {
  // The framework apps are deployed from the examples repository, which a test must not depend on.
  await page.route(/^https:\/\/porsche-design-system\.github\.io\//, (route) =>
    route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Vue</title>' })
  );
  const payloadRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().endsWith('/stackblitz.json')) payloadRequests.push(request.url());
  });

  await page.goto('/developing/vue/demo/');

  const iframe = page.getByTitle('Vue: Demo application');
  await expect(iframe).toHaveAttribute('src', /^https:\/\/porsche-design-system\.github\.io\/examples\/v\d+\/vue$/);
  await expect(page.getByRole('link', { name: 'Source Code' })).toHaveAttribute(
    'href',
    /^https:\/\/github\.com\/porsche-design-system\/examples\/tree\/v\d+\/frameworks\/vue$/
  );
  await expect(page.getByRole('link', { name: 'View Fullscreen' })).toHaveAttribute(
    'href',
    await iframe.getAttribute('src').then((src) => src ?? '')
  );

  await expect(page.getByRole('tab', { name: 'Preview' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /^About the setup of / })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Open in StackBlitz' })).toHaveCount(0);
  await expect(page.getByRole('slider')).toBeVisible();
  expect(payloadRequests).toEqual([]);
});
