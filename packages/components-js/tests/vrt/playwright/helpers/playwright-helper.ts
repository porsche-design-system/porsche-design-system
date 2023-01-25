import type { Page, ElementHandle } from '@playwright/test';
import { expect, test } from '@playwright/test';

type Options = {
  baseUrl?: string;
  scenario?: (page: Page) => Promise<void>;
};

const defaultOptions: Options = {
  baseUrl: 'http://localhost:8575',
  scenario: undefined,
};

export const executeVisualRegressionTest = async (route: string, options?: Options): Promise<void> => {
  const { baseUrl, scenario } = { ...defaultOptions, ...options };

  return test(route, async ({ page, viewport: { width } }, testInfo) => {
    testInfo.snapshotSuffix = ''; // removes system OS names in snapshot

    await page.setViewportSize({ width, height: 1 });
    await page.goto(`${baseUrl}/#${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => (window as any).componentsReady());
    await page.setViewportSize({ width, height: await page.evaluate(() => document.body.clientHeight) });

    if (scenario) {
      await scenario(page);
    }

    expect(await page.locator('#app').screenshot()).toMatchSnapshot(`${route}.png`);
  });
};

export const openPopovers = async (page: Page): Promise<void> => {
  const bodyHeightWidth = await page.evaluate(() => {
    return {
      height: document.body.clientHeight,
      width: document.body.clientWidth,
    };
  });

  await page.setViewportSize(bodyHeightWidth);

  await page.evaluate(() => {
    // Enable multiple open popovers
    document.addEventListener('mousedown', (e) => e.stopPropagation(), true);

    document.querySelectorAll('p-popover, my-prefix-p-popover').forEach((popover) => {
      const button = popover.shadowRoot.querySelector('button');
      button.click();
    });
  });
};

export const selectNode = async (page: Page, selector: string): Promise<ElementHandle> => {
  const selectorParts = selector.split('>>>');
  const shadowRootSelectors =
    selectorParts.length > 1
      ? selectorParts
          .slice(1)
          .map((x) => `.shadowRoot.querySelector('${x.trim()}')`)
          .join('')
      : '';
  return (
    await page.evaluateHandle(`document.querySelector('${selectorParts[0].trim()}')${shadowRootSelectors}`)
  ).asElement() as ElementHandle;
};
