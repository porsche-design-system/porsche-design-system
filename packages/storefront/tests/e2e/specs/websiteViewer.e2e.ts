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
        await expect(iframes.nth(index)).toHaveAttribute('src', `/examples/${example}/`);
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
        await expect(links.nth(index)).toHaveAttribute('href', `/examples/${example}/`);
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
