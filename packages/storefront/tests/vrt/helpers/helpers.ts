import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export const closeSidebars = async (page: Page) => {
  const flyoutStart = page.locator('.flyout-start');
  const flyoutEnd = page.locator('.flyout-end');

  // Flyout's only exist and need to be closed on mobile
  const startCount = await flyoutStart.count();
  const endCount = await flyoutEnd.count();

  if (startCount > 0) {
    await flyoutStart.evaluate((el) => {
      (el as HTMLElement & { open: boolean }).open = false;
    });
    await expect(flyoutStart).toBeHidden();
  }

  if (endCount > 0) {
    await flyoutEnd.evaluate((el) => {
      (el as HTMLElement & { open: boolean }).open = false;
    });
    await expect(flyoutEnd).toBeHidden();
  }
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

export const waitForImagesToBeLoaded = async (page: Page) => {
  for (const img of await page.getByRole('img').all()) {
    await expect(img).toHaveJSProperty('complete', true);
    await expect(img).not.toHaveJSProperty('naturalWidth', 0);
  }
};
