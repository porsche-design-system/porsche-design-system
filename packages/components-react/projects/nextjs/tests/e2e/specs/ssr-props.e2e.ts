import { type Page } from '@playwright/test';
import { expect, test } from '@porsche-design-system/testing/playwright';
import { goto } from '../helpers';

// Records the variant each button had when Stencil finished its first render, keyed by the button's id.
const trackFirstRenderVariants = (page: Page) =>
  page.addInitScript(() => {
    (window as any).firstRenderVariants = {};
    window.addEventListener('stencil_componentDidLoad', (e) => {
      const host = e.composedPath()[0] as HTMLElement & { variant: string };
      if (host.id) {
        (window as any).firstRenderVariants[host.id] = host.variant;
      }
    });
  });

const getFirstRenderVariant = (page: Page, id: string) =>
  page.evaluate((id) => (window as any).firstRenderVariants[id], id);

test.describe('streaming', () => {
  test('should render a streamed component with its props from the first render', async ({ page }) => {
    // the streamed button starts as soon as it is parsed, before React hydrates it and syncs its props
    await trackFirstRenderVariants(page);
    await goto(page, '/streaming-props');
    const host = page.locator('#streamed-button');

    await expect(host).toHaveJSProperty('variant', 'secondary');
    await expect.poll(() => getFirstRenderVariant(page, 'streamed-button')).toBe('secondary');
    await expect(host).not.toHaveAttribute('data-ssr-props');
  });
});

test.describe('loader script', () => {
  test('should render a component registered before hydration with its props from the first render', async ({
    page,
  }) => {
    // delays hydration, so the loader script registers and renders the button long before React syncs its props,
    // only the scripts, because a pending stylesheet would hold back the loader script as well
    await page.route(/\/_next\/static\/chunks\/.*\.js$/, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.continue();
    });
    await trackFirstRenderVariants(page);
    await goto(page, '/loader-script-props');
    const host = page.locator('#loader-script-button');

    await expect(host).toHaveJSProperty('variant', 'secondary');
    await expect.poll(() => getFirstRenderVariant(page, 'loader-script-button')).toBe('secondary');
    await expect(host).not.toHaveAttribute('data-ssr-props');
  });
});
