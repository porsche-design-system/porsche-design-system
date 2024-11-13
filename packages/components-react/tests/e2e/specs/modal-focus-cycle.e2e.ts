import { expect, type Locator, test } from '@playwright/test';
import { goto } from '../helpers';
import { getProperty } from '../../../../components-js/tests/a11y/helpers';

test.use({
  // to prevent horizontal scrollable table
  viewport: { width: 1400, height: 800 },
});

test('should focus correct element', async ({ page }) => {
  await goto(page, 'modal-focus-cycle');

  const host = page.locator('p-modal');
  const getActiveElementTagName = () => page.evaluate(() => document.activeElement.tagName);
  const getActiveElementId = () => page.evaluate(() => document.activeElement.id);

  const waitForFocus = async (el: Locator) => {
    await host.evaluateHandle((el) => el.shadowRoot.activeElement);
    return el;
  };

  const expectDismissButtonToBeFocused = async (failMessage: string) => {
    const dismissHandle = page.locator('p-modal .dismiss');
    const focused = await waitForFocus(dismissHandle);
    expect(await getProperty(focused, 'tagName'), failMessage).toBe('P-BUTTON');
    expect(await getProperty(focused, 'className'), failMessage).toContain('dismiss');
  };

  const btnOpen = page.locator('#btn-open');
  await btnOpen.click();

  await page.waitForSelector('#loading');
  await expectDismissButtonToBeFocused('after open 1st tab');
  await page.keyboard.press('Tab');
  expect(await getActiveElementTagName()).toBe('P-MODAL');
  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused('after open 3rd tab');

  await page.waitForSelector('p-table');

  await page.keyboard.press('Tab');
  const activeElementTagName = await page.evaluate(() => document.activeElement.tagName);
  expect(await getActiveElementTagName(), 'after loading 1st tab').toBe(activeElementTagName); // should be P-TABLE when table is scrollable, but sometimes this is P-TABLE-HEAD-CELL 🤷‍

  const btnReload = page.locator('#btn-reload');
  await btnReload.focus();
  await page.keyboard.press('Tab');
  expect(await getActiveElementTagName()).toBe('BODY');
  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  expect(await getActiveElementId()).toBe('btn-reload');

  await btnReload.click();
  await page.waitForSelector('#loading');
  await page.keyboard.press('Tab');
  expect(await getActiveElementTagName()).toBe('BODY');
  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused('after reload 2nd tab');

  await page.keyboard.press('Space'); // dismiss modal

  await expect(page.locator('p-modal')).toBeHidden();
  await expect(btnOpen, 'after dismiss').toBeFocused();

  await page.keyboard.press('Tab');

  await expect(page.locator('#btn-after'), 'after dismiss 1st tab').toBeFocused();
});
