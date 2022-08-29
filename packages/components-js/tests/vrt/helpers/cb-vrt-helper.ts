import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export const defaultViewports = [320, 480, 760, 1000, 1300, 1760] as const;
export const extendedViewports = [...defaultViewports, 1920, 2560] as const;
export type Viewport = typeof extendedViewports[number];

const defaultOptions = {
  baseUrl: 'http://localhost:8575',
};
type CBVRTestOptions = {
  namePostfix?: string;
  scenario?: (page: Page) => Promise<void>;
};

export const cbVRT = async (route: string, viewport: Viewport = 1000, options?: CBVRTestOptions): Promise<void> => {
  const { scenario, namePostfix = '' } = options || {};
  const { baseUrl } = defaultOptions;
  const testName = `${route}${namePostfix}-${viewport}`;
  return test(testName, async ({ page }) => {
    await page.setViewportSize({
      width: viewport,
      height: viewport,
    });
    await page.goto(`${baseUrl}/#${route}`, { waitUntil: 'networkidle' });

    if (scenario) {
      await scenario(page);
    }

    expect(await page.locator('#app').screenshot()).toMatchSnapshot(`${testName}.png`); // system OS names in snapshot might be removable soon: https://github.com/microsoft/playwright/issues/13296
  });
};
