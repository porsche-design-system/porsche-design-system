import type { Page } from '@playwright/test';

export const isElementAtIndexFocused = async (page: Page, elementIndex: number): Promise<boolean> => {
  const snapshot = await page.accessibility.snapshot();
  const element = snapshot!.children![elementIndex];
  return element.focused || false;
};
