import { expect, Page, test } from '@playwright/test';
import { goto, waitForComponentsReady } from '../helpers';

const getSelect = (page: Page) => page.locator('p-select button');
const getSelectOptionsVisible = (page: Page) => page.locator('p-select-option[title="visible"]');
const getSelectOptionsHidden = (page: Page) => page.locator('p-select-option[title="hidden"]');
const getButtonsVisible = (page: Page) => page.locator('p-button[title="visible"]');
const getButtonsHidden = (page: Page) => page.locator('p-button[title="hidden"]');

test('should apply global hidden attribute correctly', async ({ page }) => {
  await goto(page, 'hidden-attribute-example');
  expect(await waitForComponentsReady(page)).toBe(9); // p-select + 4 p-select-option + 4 p-button
  const select = getSelect(page);
  const selectOptionsVisible = getSelectOptionsVisible(page);
  const selectOptionsHidden = getSelectOptionsHidden(page);
  const buttonsVisible = getButtonsVisible(page);
  const buttonsHidden = getButtonsHidden(page);

  await select.click(); // Open select dropdown

  for (const selectOption of await selectOptionsVisible.all()) {
    await expect(selectOption).toBeVisible();
  }
  for (const button of await buttonsVisible.all()) {
    await expect(button).toBeVisible();
  }

  for (const selectOption of await selectOptionsHidden.all()) {
    await expect(selectOption).toBeHidden();
    await expect(selectOption).toHaveAttribute('hidden', '');
  }
  for (const button of await buttonsHidden.all()) {
    await expect(button).toBeHidden();
    await expect(button).toHaveAttribute('hidden', '');
  }
});
