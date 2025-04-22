import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export const closeSidebars = async (page: Page) => {
  const flyoutStart = page.locator('.flyout-start');
  const flyoutEnd = page.locator('.flyout-start');

  await flyoutStart.evaluate((el) => {
    (el as HTMLElement & { open: boolean }).open = false;
  });

  await flyoutEnd.evaluate((el) => {
    (el as HTMLElement & { open: boolean }).open = false;
  });

  await expect(flyoutStart).toBeHidden();
  await expect(flyoutEnd).toBeHidden();
};
