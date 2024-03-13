import { type Page } from '@playwright/test';

export const getValueOfForAttribute = async (page: Page, selector: string) => {
  return await (await page.$(selector)).evaluate((label) => label.getAttribute('for'));
};
