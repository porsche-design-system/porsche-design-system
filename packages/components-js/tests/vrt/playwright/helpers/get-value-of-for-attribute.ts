import type { Page } from '@playwright/test';
import { selectNode } from '../../../a11y/helpers';

export const getValueOfForAttribute = async (page: Page, selector: string) => {
  return await (await selectNode(page, selector)).evaluate((label) => label.getAttribute('for'));
};
