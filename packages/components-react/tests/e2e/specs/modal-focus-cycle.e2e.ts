import { Page } from 'puppeteer';
import { goto, selectNode } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should focus correct element', async () => {
  await page.setViewport({ width: 1400, height: 800 }); // to prevent horizontal scrollable table
  await goto(page, 'modal-focus-cycle');
  const host = await selectNode(page, 'p-modal');

  const expectDialogToBeFocused = async (failMessage?: string) => {
    const { tagName, className } = await host.evaluate((el) => {
      const { tagName, className } = el.shadowRoot.activeElement;
      return { tagName, className };
    });
    expect(tagName, failMessage).toBe('DIV');
    expect(className, failMessage).toBe('root');
  };

  const expectCloseButtonToBeFocused = async (failMessage?: string) => {
    const { tagName, className } = await host.evaluate((el) => {
      const { tagName, className } = el.shadowRoot.activeElement;
      return { tagName, className };
    });
    expect(tagName, failMessage).toBe('P-BUTTON-PURE');
    expect(className, failMessage).toContain('close');
  };

  const waitForSlotChange = () => new Promise((resolve) => setTimeout(resolve));

  const getActiveElementTagName = () => page.evaluate(() => document.activeElement.tagName);
  const getActiveElementId = () => page.evaluate(() => document.activeElement.id);

  const btnOpen = await selectNode(page, '#btn-open');
  await btnOpen.click();

  await page.waitForSelector('#loading');
  await page.waitForTimeout(50); // give it some time to focus via stencil lifecycle
  await expectDialogToBeFocused('after open');

  await page.keyboard.press('Tab');
  await expectCloseButtonToBeFocused('after open 1st tab');
  await page.keyboard.press('Tab');
  await expectCloseButtonToBeFocused('after open 2nd tab');
  await page.keyboard.press('Tab');
  await expectCloseButtonToBeFocused('after open 3rd tab');

  await page.waitForSelector('p-table');
  await expectDialogToBeFocused('after loading');
  await page.keyboard.press('Tab');
  await expectCloseButtonToBeFocused('after loading 1st tab');
  await page.keyboard.press('Tab');
  expect(await getActiveElementTagName(), 'after loading 2nd tab').toBe('P-TABLE-HEAD-CELL');

  const btnReload = await selectNode(page, '#btn-reload');
  await btnReload.focus();
  await page.keyboard.press('Tab');
  await expectCloseButtonToBeFocused('after reload tab');
  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  expect(await getActiveElementId()).toBe('btn-reload');

  await btnReload.click();
  await waitForSlotChange();
  await expectDialogToBeFocused('after reload');
  await page.keyboard.press('Tab');
  await expectCloseButtonToBeFocused('after reload 1st tab');
  await page.keyboard.press('Tab');
  await expectCloseButtonToBeFocused('after reload 2nd tab');
  await page.keyboard.press('Space'); // close modal
  await page.waitForTimeout(250); // give it some time to close and refocus via stencil lifecycle

  expect(await getActiveElementId(), 'after close').toBe('btn-open');

  await page.keyboard.press('Tab');
  expect(await getActiveElementId(), 'after close 1st tab').toBe('btn-after');
});
