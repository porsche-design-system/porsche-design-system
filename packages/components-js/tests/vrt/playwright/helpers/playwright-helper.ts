import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

type Options = {
  baseUrl?: string;
  namePostfix?: string;
  scenario?: (page: Page) => Promise<void>;
};

const defaultOptions: Options = {
  baseUrl: 'http://localhost:8575',
  namePostfix: '',
  scenario: undefined,
};

export const executeVisualRegressionTest = async (route: string, options?: Options): Promise<void> => {
  const { baseUrl, namePostfix, scenario } = { ...defaultOptions, ...options };
  const testName = `${route}${namePostfix}`;

  return test(testName, async ({ page, viewport: { width } }, testInfo) => {
    testInfo.snapshotSuffix = ''; // removes system OS names in snapshot

    await page.setViewportSize({ width, height: 1 });
    await page.goto(`${baseUrl}/#${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => (window as any).componentsReady());
    await page.setViewportSize({ width, height: await page.evaluate(() => document.body.clientHeight) });

    if (scenario) {
      await scenario(page);
    }

    expect(await page.locator('#app').screenshot()).toMatchSnapshot(`${testName}.png`);
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
      const button = popover.shadowRoot.querySelector('p-button-pure, my-prefix-p-button-pure') as HTMLElement;
      button.click();
    });
  });
};
