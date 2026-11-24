import { expect, test } from '@porsche-design-system/testing/playwright';
import { goto } from '../helpers';

test.use({
  expectedConsole: async ({ expectedConsole }, use) =>
    // TODO: Remove once the SSR streaming issue is fixed (#4162)
    use([...expectedConsole, /A second declarative shadow root cannot be created on a host/]),
});

test('should render a streamed component with its props from the first render', async ({ page }) => {
  // the streamed button starts as soon as it is parsed, before React hydrates it and syncs its props
  await page.addInitScript(() => {
    (window as any).firstRenderVariants = [];
    window.addEventListener('stencil_componentDidLoad', (e) => {
      const host = e.composedPath()[0] as HTMLElement & { variant: string };
      if (host.id === 'streamed-button') {
        (window as any).firstRenderVariants.push(host.variant);
      }
    });
  });

  await goto(page, '/streaming-props');
  const host = page.locator('#streamed-button');

  await expect(host).toHaveJSProperty('variant', 'secondary');
  await expect.poll(() => page.evaluate(() => (window as any).firstRenderVariants)).toEqual(['secondary']);
  await expect(host).not.toHaveAttribute('data-ssr-props');
});
