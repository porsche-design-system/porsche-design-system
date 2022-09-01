import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { SKELETONS_ACTIVE } from 'shared/src';

export const testIfSkeletonsActive = SKELETONS_ACTIVE ? test.describe : test.describe.skip;
export const defaultViewports = [320, 480, 760, 1000, 1300, 1760] as const;
export const extendedViewports = [...defaultViewports, 1920, 2560] as const;
export type Viewport = typeof extendedViewports[number];

const defaultOptions = {
  baseUrl: 'http://localhost:8575',
};
type CBVRTestOptions = {
  namePostfix?: string;
  scenario?: (page: Page) => Promise<void>;
  viewportHeight?: number;
};

export const cbVRT = async (route: string, viewport: Viewport = 1000, options?: CBVRTestOptions): Promise<void> => {
  const { scenario, namePostfix = '', viewportHeight } = options || {};
  const { baseUrl } = defaultOptions;
  const testName = `${route}${namePostfix}-${viewport}`;
  return test(testName, async ({ page }, workerInfo) => {
    const isMobileSafari = workerInfo.project.name === 'Mobile Safari';

    // Skip this resolution for Mobile Safari because of bug where scrollbars are always visible https://github.com/microsoft/playwright/issues/844
    if (viewport === 2560 && isMobileSafari) {
      return;
    }

    await page.setViewportSize({
      width: viewport === 320 && isMobileSafari ? 358 : viewport, // Workaround for Mobile Safari if viewport < 358 an empty screenshot is created, since the Target is closed after navigation
      height: viewportHeight ? viewportHeight : viewport,
    });
    await page.goto(`${baseUrl}/#${route}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => (window as any).componentsReady());

    if (isMobileSafari) {
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    if (scenario) {
      await scenario(page);
    }

    expect(await page.locator('#app').screenshot()).toMatchSnapshot(`${testName}.png`); // system OS names in snapshot might be removable soon: https://github.com/microsoft/playwright/issues/13296
  });
};
