import { type Page } from '@playwright/test';
import { expect, test } from '@porsche-design-system/testing/playwright';
import { goto } from '../helpers';

const getLabelWrapperWidth = async (page: Page, id: string): Promise<number> => {
  const boundingBox = await page.locator(`#${id} .label-wrapper`).boundingBox();
  if (!boundingBox) {
    throw new Error(`Label wrapper of #${id} is not rendered`);
  }
  return boundingBox.width;
};

test('should treat hide-label without value like :hide-label="true"', async ({ page }) => {
  await goto(page, 'boolean-attribute-shorthand-example');

  const shorthand = await getLabelWrapperWidth(page, 'shorthand');
  const explicitTrue = await getLabelWrapperWidth(page, 'explicit-true');
  const explicitFalse = await getLabelWrapperWidth(page, 'explicit-false');
  const omitted = await getLabelWrapperWidth(page, 'omitted');

  expect(shorthand).toBe(explicitTrue);
  expect(shorthand).toBeLessThan(explicitFalse);
  expect(explicitFalse).toBe(omitted);
});
