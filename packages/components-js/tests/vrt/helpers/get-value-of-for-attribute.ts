import { type Page } from '@playwright/test';

export const getValueOfForAttribute = async (page: Page, selector: string) => {
  return await page
    .locator(selector)
    .first()
    .evaluate((label) => label.getAttribute('for'));
};
