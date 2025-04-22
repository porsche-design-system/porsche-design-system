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

export const resetAnimations = async (page: Page) => {
  // Reset animations
  await page.evaluate(() => {
    document.documentElement.style.setProperty('--p-animation-duration', '0s');
    document.documentElement.style.setProperty('--p-transition-duration', '0s');
    const animations = document.querySelectorAll('[data-animation=fade-in-up]');
    animations.forEach((animation) => {
      (animation as HTMLElement).style.opacity = '1';
      (animation as HTMLElement).style.transform = 'none';
    });
  });
};
