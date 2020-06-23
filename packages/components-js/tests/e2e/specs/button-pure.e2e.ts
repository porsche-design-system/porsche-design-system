import {
  addEventListener,
  getActiveElementId,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';
import { getBrowser } from '../helpers/setup';

describe('button pure', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getButtonPureHost = () => selectNode(page, 'p-button-pure');
  const getButtonPureRealButton = () => selectNode(page, 'p-button-pure >>> button');

  it('should render', async () => {
    await setContentWithDesignSystem(page, `<p-button-pure>Some label</p-button-pure>`);
    const el = await getButtonPureRealButton();
    expect(el).not.toBeNull();
  });

  it('should not be clickable when disabled', async () => {
    await setContentWithDesignSystem(page, `<p-button-pure disabled>Some label</p-button-pure>`);
    const host = await getButtonPureHost();
    const button = await getButtonPureRealButton();

    let calls = 0;
    await addEventListener(host, 'click', () => calls++);

    await host.click();
    await button.click();

    const coords = await host.boundingBox();
    await page.mouse.click(coords.x + 1, coords.y + 1); // click the top left corner
    await page.mouse.click(coords.x + 1, coords.y + coords.height - 1); // click the bottom left corner
    await page.mouse.click(coords.x + coords.width - 1, coords.y + 1); // click the top right corner
    await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height - 1); // click the bottom right corner
    await page.mouse.click(coords.x + 1, coords.y + coords.height / 2); // click the left center
    await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height / 2); // click the right center
    await page.mouse.click(coords.x + coords.width / 2, coords.y + coords.height / 2); // click the center center

    await waitForStencilLifecycle(page);

    expect(calls).toBe(0);
  });

  it('should dispatch correct click events', async () => {
    await setContentWithDesignSystem(page, `<div><p-button-pure id="hostElement">Some label</p-button-pure></div>`);

    const wrapper = await selectNode(page, 'div');
    const host = await getButtonPureHost();
    const button = await getButtonPureRealButton();

    const events = [];
    await addEventListener(wrapper, 'click', (ev) => events.push(ev));

    await button.click();
    await host.click();

    await waitForStencilLifecycle(page);
    expect(events.length).toBe(2);
    for (const event of events) {
      expect(event.target.id).toBe('hostElement');
    }
  });

  it("submits outer forms on click, if it's type submit", async () => {
    await setContentWithDesignSystem(
      page,
      `<form onsubmit="return false;"><p-button-pure type="submit">Some label</p-button-pure></form>`
    );
    const button = await getButtonPureRealButton();
    const host = await getButtonPureHost();
    const form = await selectNode(page, 'form');

    let calls = 0;
    await addEventListener(form, 'submit', () => calls++);

    for (const triggerElement of [host, button]) {
      await triggerElement.click();
    }
    expect(calls).toBe(1);
  });

  it('should not submit the form if default is prevented', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <form onsubmit="return false;">
          <p-button-pure type="submit">Some label</p-button-pure>
        </form>
      </div>
      <script>
        document.querySelector('#wrapper').addEventListener('click', function(event) {
          event.preventDefault();
        });
      </script>
    `
    );

    const button = await getButtonPureRealButton();
    const form = await selectNode(page, 'form');

    let calls = 0;
    await addEventListener(form, 'submit', () => calls++);

    await button.click();
    expect(calls).toBe(0);
  });

  it('should not submit the form if button is disabled', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <form onsubmit="return false;">
          <p-button-pure type="submit" disabled="true">Some label</p-button-pure>
        </form>
      </div>
    `
    );
    const innerButton = await getButtonPureRealButton();
    const outerButton = await getButtonPureHost();
    const form = await selectNode(page, 'form');

    let calls = 0;
    await addEventListener(form, 'submit', () => calls++);

    await innerButton.click();
    await outerButton.click();
    expect(calls).toBe(0);
  });

  it('should trigger focus&blur events at the correct time', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-button-pure id="my-button-pure">Some label</p-button-pure>
        <a href="#" id="after">after</a>
      </div>
    `
    );

    const button = await getButtonPureHost();
    const before = await selectNode(page, '#before');
    const after = await selectNode(page, '#after');

    let beforeFocusCalls = 0;
    await addEventListener(before, 'focus', () => beforeFocusCalls++);
    let buttonFocusCalls = 0;
    await addEventListener(button, 'focus', () => buttonFocusCalls++);
    let buttonFocusInCalls = 0;
    await addEventListener(button, 'focusin', () => buttonFocusInCalls++);
    let buttonBlurCalls = 0;
    await addEventListener(button, 'blur', () => buttonBlurCalls++);
    let buttonFocusOutCalls = 0;
    await addEventListener(button, 'focusout', () => buttonFocusOutCalls++);
    let afterFocusCalls = 0;
    await addEventListener(after, 'focus', () => afterFocusCalls++);

    expect(beforeFocusCalls).toBe(0);
    expect(buttonFocusCalls).toBe(0);
    expect(buttonFocusInCalls).toBe(0);
    expect(buttonBlurCalls).toBe(0);
    expect(buttonFocusOutCalls).toBe(0);
    expect(afterFocusCalls).toBe(0);
    expect(await getActiveElementId(page)).toBe('');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(beforeFocusCalls).toBe(1);
    expect(buttonFocusCalls).toBe(0);
    expect(buttonFocusInCalls).toBe(0);
    expect(buttonBlurCalls).toBe(0);
    expect(buttonFocusOutCalls).toBe(0);
    expect(afterFocusCalls).toBe(0);
    expect(await getActiveElementId(page)).toBe('before');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(beforeFocusCalls).toBe(1);
    expect(buttonFocusCalls).toBe(1);
    expect(buttonFocusInCalls).toBe(1);
    expect(buttonBlurCalls).toBe(0);
    expect(buttonFocusOutCalls).toBe(0);
    expect(afterFocusCalls).toBe(0);
    expect(await getActiveElementId(page)).toBe('my-button-pure');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(beforeFocusCalls).toBe(1);
    expect(buttonFocusCalls).toBe(1);
    expect(buttonFocusInCalls).toBe(1);
    expect(buttonBlurCalls).toBe(1);
    expect(buttonFocusOutCalls).toBe(1);
    expect(afterFocusCalls).toBe(1);
    expect(await getActiveElementId(page)).toBe('after');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(beforeFocusCalls).toBe(1);
    expect(buttonFocusCalls).toBe(2);
    expect(buttonFocusInCalls).toBe(2);
    expect(buttonBlurCalls).toBe(1);
    expect(buttonFocusOutCalls).toBe(1);
    expect(afterFocusCalls).toBe(1);
    expect(await getActiveElementId(page)).toBe('my-button-pure');

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(beforeFocusCalls).toBe(2);
    expect(buttonFocusCalls).toBe(2);
    expect(buttonFocusInCalls).toBe(2);
    expect(buttonBlurCalls).toBe(2);
    expect(buttonFocusOutCalls).toBe(2);
    expect(afterFocusCalls).toBe(1);
    expect(await getActiveElementId(page)).toBe('before');

    await page.keyboard.up('ShiftLeft');
  });

  it('should provide methods to focus&blur the element', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-button-pure>Some label</p-button-pure>
      </div>
    `
    );

    const buttonHasFocus = () =>
      page.evaluate(() => document.activeElement === document.querySelector('p-button-pure'));

    const button = await getButtonPureHost();
    const before = await selectNode(page, '#before');
    await before.focus();
    expect(await buttonHasFocus()).toBe(false);
    await button.focus();
    expect(await buttonHasFocus()).toBe(true);
    await page.evaluate(() => {
      const buttonElement = document.querySelector('p-button-pure') as HTMLElement;
      buttonElement.blur();
    });
    expect(await buttonHasFocus()).toBe(false);
  });

  it('should be removed from tab order for tabbable false', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-button-pure tabbable="false">Some label</p-button-pure>
        <a href="#" id="after">after</a>
      </div>
    `
    );

    const button = await getButtonPureHost();
    const before = await selectNode(page, '#before');
    const after = await selectNode(page, '#after');

    await before.focus();

    let buttonFocusCalls = 0;
    await addEventListener(button, 'focus', () => buttonFocusCalls++);
    let afterFocusCalls = 0;
    await addEventListener(after, 'focus', () => afterFocusCalls++);

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(buttonFocusCalls).toBe(0);
    expect(afterFocusCalls).toBe(1);

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(buttonFocusCalls).toBe(0);
    expect(afterFocusCalls).toBe(1);
  });
});
