import {
  addEventListener,
  getActiveElementId,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem, waitForEventCallbacks
} from '../helpers';
import { Page } from 'puppeteer';
import { getBrowser } from '../helpers/setup';

describe('link pure', () => {

  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getLinkPureHost = () => selectNode(page, 'p-link-pure');
  const getLinkPureRealLink = () => selectNode(page, 'p-link-pure >>> a');

  it('should render', async () => {
    await setContentWithDesignSystem(page, `<p-link-pure href="#">Some label</p-link-pure>`);
    const el = await getLinkPureRealLink();
    expect(el).toBeDefined();
  });

  it('should dispatch correct click events', async () => {
    await setContentWithDesignSystem(page, `<div><p-link-pure href="#" id="hostElement">Some label</p-link-pure></div>`);

    const wrapper = await selectNode(page, 'div');
    const host = await getLinkPureHost();
    const link = await getLinkPureRealLink();

    const events = [];
    await addEventListener(wrapper, 'click', (ev) => events.push(ev));

    await link.click();
    await host.click();
    await waitForEventCallbacks(page);

    expect(events.length).toBe(2);
    for (const event of events) {
      expect(event.target.id).toBe('hostElement');
    }
  });

  it(`should trigger focus&blur events at the correct time`, async () => {
    await setContentWithDesignSystem(page, `
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-link-pure href="#" id="my-link-pure">Some label</p-link-pure>
            <a href="#" id="after">after</a>
          </div>
    `);
    const link = await getLinkPureHost();
    const before = await selectNode(page, '#before');
    const after = await selectNode(page, '#after');

    let beforeFocusCalls = 0;
    await addEventListener(before, 'focus', () => beforeFocusCalls++);
    let linkFocusCalls = 0;
    await addEventListener(link, 'focus', () => linkFocusCalls++)
    let linkFocusInCalls = 0;
    await addEventListener(link, 'focusin', () => linkFocusInCalls++);
    let linkBlurCalls = 0;
    await addEventListener(link, 'blur', () => linkBlurCalls++);
    let linkFocusOutCalls = 0;
    await addEventListener(link, 'focusout', () => linkFocusOutCalls++);
    let afterFocusCalls = 0;
    await addEventListener(after, 'focus', () => afterFocusCalls++);

    expect(beforeFocusCalls).toBe(0);
    expect(linkFocusCalls).toBe(0);
    expect(linkFocusInCalls).toBe(0);
    expect(linkBlurCalls).toBe(0);
    expect(linkFocusOutCalls).toBe(0);
    expect(afterFocusCalls).toBe(0);
    expect(await getActiveElementId(page)).toBe('');

    await page.keyboard.press('Tab');
    await waitForEventCallbacks(page);
    expect(beforeFocusCalls).toBe(1);
    expect(linkFocusCalls).toBe(0);
    expect(linkFocusInCalls).toBe(0);
    expect(linkBlurCalls).toBe(0);
    expect(linkFocusOutCalls).toBe(0);
    expect(afterFocusCalls).toBe(0);
    expect(await getActiveElementId(page)).toBe('before');

    await page.keyboard.press('Tab');
    await waitForEventCallbacks(page);
    expect(beforeFocusCalls).toBe(1);
    expect(linkFocusCalls).toBe(1);
    expect(linkFocusInCalls).toBe(1);
    expect(linkBlurCalls).toBe(0);
    expect(linkFocusOutCalls).toBe(0);
    expect(afterFocusCalls).toBe(0);
    expect(await getActiveElementId(page)).toBe('my-link-pure');

    await page.keyboard.press('Tab');
    await waitForEventCallbacks(page);
    expect(beforeFocusCalls).toBe(1);
    expect(linkFocusCalls).toBe(1);
    expect(linkFocusInCalls).toBe(1);
    expect(linkBlurCalls).toBe(1);
    expect(linkFocusOutCalls).toBe(1);
    expect(afterFocusCalls).toBe(1);
    expect(await getActiveElementId(page)).toBe('after');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await waitForEventCallbacks(page);
    expect(beforeFocusCalls).toBe(1);
    expect(linkFocusCalls).toBe(2);
    expect(linkFocusInCalls).toBe(2);
    expect(linkBlurCalls).toBe(1);
    expect(linkFocusOutCalls).toBe(1);
    expect(afterFocusCalls).toBe(1);
    expect(await getActiveElementId(page)).toBe('my-link-pure');

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await waitForEventCallbacks(page);
    expect(beforeFocusCalls).toBe(2);
    expect(linkFocusCalls).toBe(2);
    expect(linkFocusInCalls).toBe(2);
    expect(linkBlurCalls).toBe(2);
    expect(linkFocusOutCalls).toBe(2);
    expect(afterFocusCalls).toBe(1);
    expect(await getActiveElementId(page)).toBe('before');

    await page.keyboard.up('ShiftLeft');
  });

  it(`should provide methods to focus&blur the element`, async () => {
    await setContentWithDesignSystem(page, `
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-link-pure href="#">Some label</p-link-pure>
          </div>
    `);

    const linkHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-link-pure'));

    const link = await getLinkPureHost();
    const before = await selectNode(page, '#before');
    await before.focus();

    expect(await linkHasFocus()).toBe(false);
    await link.focus();
    expect(await linkHasFocus()).toBe(true);
    await page.evaluate(() => {
      const linkElement: HTMLElement = document.querySelector('p-link-pure');
      linkElement.blur();
    });
    expect(await linkHasFocus()).toBe(false);
  });
});
