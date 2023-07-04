import type { ElementHandle, Page } from 'puppeteer';
import { goto, selectNode } from '../helpers';
import { getProperty } from '../../../../components-js/tests/e2e/puppeteer/helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should focus correct element', async () => {
  await page.setViewport({ width: 1400, height: 800 }); // to prevent horizontal scrollable table
  await goto(page, 'modal-focus-cycle');

  const host = await selectNode(page, 'p-modal');
  const getActiveElementTagName = () => page.evaluate(() => document.activeElement.tagName);
  const getActiveElementId = () => page.evaluate(() => document.activeElement.id);

  const waitForFocus = async (el: ElementHandle<Element>) => {
    await page.waitForFunction((host, el) => host.shadowRoot.activeElement === el, {}, host, el);
    return await host.evaluateHandle((el) => el.shadowRoot.activeElement);
  };

  const expectDialogToBeFocused = async (failMessage: string) => {
    const dialog = await selectNode(page, 'p-modal >>> div.root');
    const focused = await waitForFocus(dialog);
    expect(await getProperty(focused, 'tagName'), failMessage).toBe('DIV');
    expect(await getProperty(focused, 'className'), failMessage).toBe('root');
  };

  const expectDismissButtonToBeFocused = async (failMessage: string) => {
    const dismissHandle = await selectNode(page, 'p-modal >>> p-button-pure.dismiss');
    const focused = await waitForFocus(dismissHandle);
    expect(await getProperty(focused, 'tagName'), failMessage).toBe('P-BUTTON-PURE');
    expect(await getProperty(focused, 'className'), failMessage).toContain('dismiss');
  };

  const btnOpen = await selectNode(page, '#btn-open');
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

  const table = await selectNode(page, 'p-table');
  await page.waitForFunction((el) => document.activeElement === el, {}, table);
  expect(await getActiveElementTagName(), 'after loading 2nd tab').toBe('P-TABLE'); // when table is scrollable, otherwise it would be P-TABLE-HEAD-CELL

  const btnReload = await selectNode(page, '#btn-reload');
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

  await page.waitForFunction((el) => window.getComputedStyle(el).visibility === 'hidden', {}, host);
  expect(await getActiveElementId(), 'after dismiss').toBe('btn-open');

  await page.keyboard.press('Tab');

  await page.waitForFunction((btn) => document.activeElement.id === btn.id, {}, await selectNode(page, '#btn-after'));
  expect(await getActiveElementId(), 'after dismiss 1st tab').toBe('btn-after');
});
