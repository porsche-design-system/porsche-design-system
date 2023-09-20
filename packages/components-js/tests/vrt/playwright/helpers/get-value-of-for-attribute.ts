import type { Page } from '@playwright/test';
import { selectNode } from '../../../e2e/puppeteer/helpers';

export const getValueOfForAttribute = async (page: Page, selector: string) => {
  return await (await selectNode(page, selector)).evaluate((label) => label.getAttribute('for'));
};
