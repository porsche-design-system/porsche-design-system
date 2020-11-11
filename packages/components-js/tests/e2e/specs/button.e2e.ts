import {
  addEventListener,
  getActiveElementId,
  getAttribute,
  getBrowser,
  getProperty, getStyleOnFocus,
  initAddEventListener,
  selectNode, setAttribute,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { expectedStyleOnFocus } from '../constants';

describe('button', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getButtonHost = () => selectNode(page, 'p-button');
  const getButtonRealButton = () => selectNode(page, 'p-button >>> button');
  const getIconOrSpinner = () => selectNode(page, 'p-button >>> .p-button__icon');

  it('should render', async () => {
    await setContentWithDesignSystem(page, `<p-button>Some label</p-button>`);
    const el = await getButtonRealButton();
    expect(el).not.toBeNull();
  });

  it('should not be clickable when disabled', async () => {
    await setContentWithDesignSystem(page, `<p-button disabled>Some label</p-button>`);
    const host = await getButtonHost();
    const button = await getButtonRealButton();

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
    await setContentWithDesignSystem(page, `<div><p-button id="hostElement">Some label</p-button></div>`);

    const wrapper = await selectNode(page, 'div');
    const host = await getButtonHost();
    const button = await getButtonRealButton();

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
      `<form onsubmit="return false;"><p-button type="submit">Some label</p-button></form>`
    );
    const button = await getButtonRealButton();
    const host = await getButtonHost();
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
          <p-button type="submit">Some label</p-button>
        </form>
      </div>
      <script>
        document.querySelector('#wrapper').addEventListener('click', function(event) {
          event.preventDefault();
        });
      </script>
    `
    );

    const button = await getButtonRealButton();
    const form = await selectNode(page, 'form');

    let calls = 0;
    await addEventListener(form, 'submit', () => calls++);

    await button.click();
    await waitForStencilLifecycle(page);
    expect(calls).toBe(0);
  });

  it('should not submit the form if button is disabled', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <form onsubmit="return false;">
          <p-button type="submit" disabled="true">Some label</p-button>
        </form>
      </div>
    `
    );

    const innerButton = await getButtonRealButton();
    const outerButton = await getButtonHost();
    const form = await selectNode(page, 'form');

    let calls = 0;
    await addEventListener(form, 'submit', () => calls++);

    await innerButton.click();
    await outerButton.click();
    await waitForStencilLifecycle(page);
    expect(calls).toBe(0);
  });

  it('should trigger focus&blur events at the correct time', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-button id="my-button">Some label</p-button>
        <a href="#" id="after">after</a>
      </div>
    `
    );

    const button = await getButtonHost();
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
    expect(await getActiveElementId(page)).toBe('my-button');

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
    expect(await getActiveElementId(page)).toBe('my-button');

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
        <p-button>Some label</p-button>
      </div>
    `
    );

    const buttonHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-button'));

    const button = await getButtonHost();
    const before = await selectNode(page, '#before');
    await before.focus();
    expect(await buttonHasFocus()).toBe(false);
    await button.focus();
    expect(await buttonHasFocus()).toBe(true);
    await page.evaluate(() => {
      const buttonElement = document.querySelector('p-button') as HTMLElement;
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
        <p-button tabbable="false">Some label</p-button>
        <a href="#" id="after">after</a>
      </div>
    `
    );

    const button = await getButtonHost();
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

  it('should submit form via enter key when type is submit', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <form>
        <input type="text" name="test" value="ok">
        <p-button type="button">Submit</p-button>
      </form>

      <script>
      document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
      })
      </script>
    `
    );

    let submitCalls = 0;
    await addEventListener(await selectNode(page, 'form'), 'submit', () => submitCalls++);

    const focusElAndPressEnter = async (el: ElementHandle<Element>) => {
      await el.focus();
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
    };

    const input = await selectNode(page, 'input');
    await focusElAndPressEnter(input);
    expect(submitCalls).toBe(1);

    const button = await getButtonHost();
    await focusElAndPressEnter(button);
    expect(submitCalls).toBe(1); // type isn't submit, yet

    await button.evaluate((el) => el.setAttribute('type', 'button'));
    await focusElAndPressEnter(button);
    expect(submitCalls).toBe(1); // type isn't submit, yet

    await button.evaluate((el) => el.setAttribute('type', 'reset'));
    await focusElAndPressEnter(button);
    expect(submitCalls).toBe(1); // type isn't submit, yet

    await button.evaluate((el) => el.setAttribute('type', 'submit'));
    await focusElAndPressEnter(button);
    expect(submitCalls).toBe(2);

    await focusElAndPressEnter(button);
    expect(submitCalls).toBe(3);
  });

  it('should add aria-busy when loading and remove if finished', async () => {
    await setContentWithDesignSystem(page, `<p-button>Some label</p-button>`);
    const host = await getButtonHost();
    const button = await getButtonRealButton();

    expect(await getAttribute(button, 'aria-busy')).toBeNull();

    await host.evaluate((el) => el.setAttribute('loading', 'true'));
    await waitForStencilLifecycle(page);

    expect(await getAttribute(button, 'aria-busy')).toBe('true');

    await host.evaluate((el) => el.setAttribute('loading', 'false'));
    await waitForStencilLifecycle(page);

    expect(await getAttribute(button, 'aria-busy')).toBeNull();
  });

  it('should change theme of spinner if changed programmatically and variant tertiary', async () => {
    await setContentWithDesignSystem(page, `<p-button loading="true">Some label</p-button>`);
    const host = await getButtonHost();
    const spinner = await getIconOrSpinner();

    expect(await getProperty(spinner, 'theme')).toBe('dark');

    await host.evaluate((el) => el.setAttribute('theme', 'light'));
    await waitForStencilLifecycle(page);

    expect(await getProperty(spinner, 'theme')).toBe('dark');

    await host.evaluate((el) => el.setAttribute('variant', 'tertiary'));
    await waitForStencilLifecycle(page);

    expect(await getProperty(spinner, 'theme')).toBe('light');
  });

  describe('focus state', () => {
    it('should show outline of shadowed <button> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-button>Some label</p-button>`
      );

      const host = await getButtonHost();
      const button = await getButtonRealButton();

      expect(await getStyleOnFocus(button)).toBe(expectedStyleOnFocus({color: 'contrastHigh'}));

      await setAttribute(host, 'variant', 'secondary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(button)).toBe(expectedStyleOnFocus({theme: 'dark'}));

      await setAttribute(host, 'variant', 'primary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(button)).toBe(expectedStyleOnFocus({color: 'brand', theme: 'dark'}));

      await setAttribute(host, 'variant', 'primary');
      await setAttribute(host, 'theme', 'light');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(button)).toBe(expectedStyleOnFocus({color: 'brand'}));

      await setAttribute(host, 'variant', 'tertiary');
      await setAttribute(host, 'theme', 'light');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(button)).toBe(expectedStyleOnFocus({color: 'contrastHigh'}));

      await setAttribute(host, 'variant', 'tertiary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(button)).toBe(expectedStyleOnFocus({theme: 'dark'}));
    });
  });
});
