import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { SKELETONS_ACTIVE } from 'shared/src';

export const testIfSkeletonsActive = SKELETONS_ACTIVE ? test.describe : test.describe.skip;

const defaultOptions = {
  baseUrl: 'http://localhost:8575',
};
type CBVRTestOptions = {
  namePostfix?: string;
  scenario?: (page: Page) => Promise<void>;
};

export const cbVRT = async (route: string, options?: CBVRTestOptions): Promise<void> => {
  const { scenario, namePostfix = '' } = options || {};
  const { baseUrl } = defaultOptions;
  const testName = `${route}${namePostfix}`;

  return test(testName, async ({ page, viewport: { width } }) => {
    await page.setViewportSize({
      width,
      height: 1,
    });
    await page.goto(`${baseUrl}/#${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => (window as any).componentsReady());

    const contentHeight = await page.evaluate(() => document.body.clientHeight);

    await page.setViewportSize({
      width,
      height: contentHeight,
    });

    if (scenario) {
      await scenario(page);
    }

    expect(await page.locator('#app').screenshot()).toMatchSnapshot(`${testName}.png`); // system OS names in snapshot might be removable soon: https://github.com/microsoft/playwright/issues/13296
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
