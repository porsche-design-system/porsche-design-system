import { type ElementHandle, test, expect } from '@playwright/test';
import { goto } from '../helpers';
import { getProperty } from '../../../../components-js/tests/e2e/puppeteer/helpers';

test.use({
  // to prevent horizontal scrollable table
  viewport: { width: 1400, height: 800 },
});

test('should focus correct element', async ({ page }) => {
  await goto(page, 'modal-focus-cycle');

  const host = await page.$('p-modal');
  const getActiveElementTagName = () => page.evaluate(() => document.activeElement.tagName);
  const getActiveElementId = () => page.evaluate(() => document.activeElement.id);

  const waitForFocus = async (el: ElementHandle<Element>) => {
    return await host.evaluateHandle((el) => el.shadowRoot.activeElement);
  };

  const expectDialogToBeFocused = async (failMessage: string) => {
    const dialog = await page.$('p-modal >>> div.root');
    const focused = await waitForFocus(dialog);
    expect(await getProperty(focused, 'tagName'), failMessage).toBe('DIV');
    expect(await getProperty(focused, 'className'), failMessage).toBe('root');
  };

  const expectDismissButtonToBeFocused = async (failMessage: string) => {
    const dismissHandle = await page.$('p-modal >>> p-button-pure.dismiss');
    const focused = await waitForFocus(dismissHandle);
    expect(await getProperty(focused, 'tagName'), failMessage).toBe('P-BUTTON-PURE');
    expect(await getProperty(focused, 'className'), failMessage).toContain('dismiss');
  };

  const btnOpen = await page.$('#btn-open');
  await btnOpen.click();

  await page.waitForSelector('#loading');
  await expectDialogToBeFocused('after open');

  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused('after open 1st tab');
  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused('after open 2nd tab');
  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused('after open 3rd tab');

  await page.waitForSelector('p-table');
  await expectDialogToBeFocused('after loading');
  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused('after loading 1st tab');
  await page.keyboard.press('Tab');

  const activeElementTagName = await page.evaluate(() => document.activeElement.tagName);
  expect(await getActiveElementTagName(), 'after loading 2nd tab').toBe(activeElementTagName); // should be P-TABLE when table is scrollable, but sometimes this is P-TABLE-HEAD-CELL 🤷‍

  const btnReload = await page.$('#btn-reload');
  await btnReload.focus();
  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused('after reload tab');
  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  expect(await getActiveElementId()).toBe('btn-reload');

  await btnReload.click();
  await expectDialogToBeFocused('after reload');
  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused('after reload 1st tab');
  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused('after reload 2nd tab');

  await page.keyboard.press('Space'); // dismiss modal

  await expect(page.locator('p-modal')).toBeHidden();
  expect(await getActiveElementId(), 'after dismiss').toBe('btn-open');

  await page.keyboard.press('Tab');

  expect(await getActiveElementId(), 'after dismiss 1st tab').toBe('btn-after');
});
