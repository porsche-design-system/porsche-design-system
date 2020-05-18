import {
  addEventListener,
  getActiveElementId,
  getIdFromNode, initAddEventListener,
  selectNode,
  setContentWithDesignSystem, waitForEventCallbacks
} from "./helpers";

describe('link', () => {
  beforeAll(async () => {
    await initAddEventListener(); // needed for setup
  });

  it('should render', async () => {
    await setContentWithDesignSystem(`<p-link href="#">Some label</p-link>`);
    const el = await selectNode('p-link >>> a');
    expect(el).toBeDefined();
  });

  it('should dispatch correct click events', async () => {
    await setContentWithDesignSystem(`<div><p-link href="#testpage" id="hostElement">Some label</p-link></div>`);
    const link = await selectNode('p-link >>> a');
    const host = await selectNode('#hostElement');
    const wrapper = await selectNode('div');

    const events = [];
    await addEventListener(wrapper, 'click', (ev) => events.push(ev));

    await link.click();
    await host.click();
    await waitForEventCallbacks();

    expect(events.length).toBe(2);
    for (const event of events) {
      expect(event.target.id).toBe(await getIdFromNode(host));
    }
  });

  it(`should trigger focus&blur events at the correct time`, async () => {
    await setContentWithDesignSystem(`
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-link href="#" id="link">Some label</p-link>
        <a href="#" id="after">after</a>
      </div>
    `);

    const link = await selectNode('p-link');
    const before = await selectNode('#before');
    const after = await selectNode('#after');
    const linkId = await getIdFromNode(link);
    await before.focus();

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

    expect(await getActiveElementId()).toEqual(await getIdFromNode(before));

    await page.keyboard.press('Tab');
    expect(linkFocusCalls).toBe(1);
    expect(linkFocusInCalls).toBe(1);
    expect(linkBlurCalls).toBe(0);
    expect(linkFocusOutCalls).toBe(0);
    expect(afterFocusCalls).toBe(0);
    expect(await getActiveElementId()).toEqual(linkId);

    await page.keyboard.press('Tab');
    expect(linkFocusCalls).toBe(1);
    expect(linkFocusInCalls).toBe(1);
    expect(linkBlurCalls).toBe(1);
    expect(linkFocusOutCalls).toBe(1);
    expect(afterFocusCalls).toBe(1);
    expect(await getActiveElementId()).toEqual(await getIdFromNode(after));

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(linkFocusCalls).toBe(2);
    expect(linkFocusInCalls).toBe(2);
    expect(linkBlurCalls).toBe(1);
    expect(linkFocusOutCalls).toBe(1);
    expect(beforeFocusCalls).toBe(0);
    expect(await getActiveElementId()).toEqual(linkId);

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(linkFocusCalls).toBe(2);
    expect(linkFocusInCalls).toBe(2);
    expect(linkBlurCalls).toBe(2);
    expect(linkFocusOutCalls).toBe(2);
    expect(beforeFocusCalls).toBe(1);
    expect(await getActiveElementId()).toEqual(await getIdFromNode(before));

    await page.keyboard.up('ShiftLeft');
  });

  it(`should provide methods to focus&blur the element`, async () => {
    await setContentWithDesignSystem(`
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-link href="#">Some label</p-link>
      </div>
    `);

    const linkHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-link'));

    const link = await selectNode('p-link');
    const before = await selectNode('#before');
    await before.focus();
    expect(await linkHasFocus()).toBe(false);
    await link.focus();
    expect(await linkHasFocus()).toBe(true);
    await page.evaluate(() => {
      const linkElement: HTMLElement = document.querySelector('p-link');
      linkElement.blur();
    });
    expect(await linkHasFocus()).toBe(false);
  });
});
