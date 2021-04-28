import {
  addEventListener,
  getActiveElementId,
  getAttribute,
  getBrowser,
  getStyleOnFocus,
  initAddEventListener,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForInheritedCSSTransition,
  expectedStyleOnFocus,
  waitForStencilLifecycle,
  getOutlineStyle,
  getLifecycleStatus,
  waitForEventSerialization,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';

describe('button-pure', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-button-pure');
  const getButton = () => selectNode(page, 'p-button-pure >>> button');

  const initButtonPure = (opts?: { isLoading?: boolean }): Promise<void> => {
    const { isLoading = false } = opts ?? {};
    const loading = isLoading ? `loading="${isLoading}"` : '';

    return setContentWithDesignSystem(
      page,
      `
      <p-button-pure ${loading}>
        Some label
      </p-button-pure>`
    );
  };

  it('should not be clickable when disabled', async () => {
    await setContentWithDesignSystem(page, `<p-button-pure disabled>Some label</p-button-pure>`);
    const host = await getHost();
    const button = await getButton();

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
    const host = await getHost();
    const button = await getButton();

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

  it("submits parent form on click if it's type submit", async () => {
    await setContentWithDesignSystem(
      page,
      `<form onsubmit="return false;"><p-button-pure type="submit">Some label</p-button-pure></form>`
    );
    const button = await getButton();
    const host = await getHost();
    const form = await selectNode(page, 'form');

    let calls = 0;
    await addEventListener(form, 'submit', () => calls++);

    for (const triggerElement of [host, button]) {
      await triggerElement.click();
    }
    await waitForEventSerialization(page);
    expect(calls).toBe(2);
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

    const button = await getButton();
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
    const button = await getButton();
    const outerButton = await getHost();
    const form = await selectNode(page, 'form');

    let calls = 0;
    await addEventListener(form, 'submit', () => calls++);

    await button.click();
    await outerButton.click();
    expect(calls).toBe(0);
  });

  it('should trigger focus & blur events at the correct time', async () => {
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

    const button = await getHost();
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

    expect(beforeFocusCalls).toBe(0, 'beforeFocusCalls initially');
    expect(buttonFocusCalls).toBe(0, 'buttonFocusCalls initially');
    expect(buttonFocusInCalls).toBe(0, 'buttonFocusInCalls initially');
    expect(buttonBlurCalls).toBe(0, 'buttonBlurCalls initially');
    expect(buttonFocusOutCalls).toBe(0, 'buttonFocusOutCalls initially');
    expect(afterFocusCalls).toBe(0, 'afterFocusCalls initially');
    expect(await getActiveElementId(page)).toBe('', 'activeElementId initially');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 1st tab');
    expect(buttonFocusCalls).toBe(0, 'buttonFocusCalls after 1st tab');
    expect(buttonFocusInCalls).toBe(0, 'buttonFocusInCalls after 1st tab');
    expect(buttonBlurCalls).toBe(0, 'buttonBlurCalls after 1st tab');
    expect(buttonFocusOutCalls).toBe(0, 'buttonFocusOutCalls after 1st tab');
    expect(afterFocusCalls).toBe(0, 'afterFocusCalls after 1st tab');
    expect(await getActiveElementId(page)).toBe('before', 'activeElementId after 1st tab');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 2nd tab');
    expect(buttonFocusCalls).toBe(1, 'buttonFocusCalls after 2nd tab');
    expect(buttonFocusInCalls).toBe(1, 'buttonFocusInCalls after 2nd tab');
    expect(buttonBlurCalls).toBe(0, 'buttonBlurCalls after 2nd tab');
    expect(buttonFocusOutCalls).toBe(0, 'buttonFocusOutCalls after 2nd tab');
    expect(afterFocusCalls).toBe(0, 'afterFocusCalls after 2nd tab');
    expect(await getActiveElementId(page)).toBe('my-button-pure', 'activeElementId after 2nd tab');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 3rd tab');
    expect(buttonFocusCalls).toBe(1, 'buttonFocusCalls after 3rd tab');
    expect(buttonFocusInCalls).toBe(1, 'buttonFocusInCalls after 3rd tab');
    expect(buttonBlurCalls).toBe(1, 'buttonBlurCalls after 3rd tab');
    expect(buttonFocusOutCalls).toBe(1, 'buttonFocusOutCalls after 3rd tab');
    expect(afterFocusCalls).toBe(1, 'afterFocusCalls after 3rd tab');
    expect(await getActiveElementId(page)).toBe('after', 'activeElementId after 3rd tab');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 1st tab back');
    expect(buttonFocusCalls).toBe(2, 'buttonFocusCalls after 1st tab back');
    expect(buttonFocusInCalls).toBe(2, 'buttonFocusInCalls after 1st tab back');
    expect(buttonBlurCalls).toBe(1, 'buttonBlurCalls after 1st tab back');
    expect(buttonFocusOutCalls).toBe(1, 'buttonFocusOutCalls after 1st tab back');
    expect(afterFocusCalls).toBe(1, 'afterFocusCalls after 1st tab back');
    expect(await getActiveElementId(page)).toBe('my-button-pure', 'activeElementId after 1st tab back');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).toBe(2, 'beforeFocusCalls after 2nd tab back');
    expect(buttonFocusCalls).toBe(2, 'buttonFocusCalls after 2nd tab back');
    expect(buttonFocusInCalls).toBe(2, 'buttonFocusInCalls after 2nd tab back');
    expect(buttonBlurCalls).toBe(2, 'buttonBlurCalls after 2nd tab back');
    expect(buttonFocusOutCalls).toBe(2, 'buttonFocusOutCalls after 2nd tab back');
    expect(afterFocusCalls).toBe(1, 'afterFocusCalls after 2nd tab back');
    expect(await getActiveElementId(page)).toBe('before', 'activeElementId after 2nd tab back');

    await page.keyboard.up('ShiftLeft');
  });

  it('should provide functionality to focus & blur the custom element', async () => {
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

    const button = await getHost();
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

    const button = await getHost();
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
        <p-button-pure type="button">Submit</p-button-pure>
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

    const button = await getHost();
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
    await setContentWithDesignSystem(page, `<p-button-pure>Some label</p-button-pure>`);
    const host = await getHost();
    const button = await getButton();

    expect(await getAttribute(button, 'aria-busy')).toBeNull();

    await host.evaluate((el) => el.setAttribute('loading', 'true'));
    await waitForStencilLifecycle(page);

    expect(await getAttribute(button, 'aria-busy')).toBe('true');

    await host.evaluate((el) => el.setAttribute('loading', 'false'));
    await waitForStencilLifecycle(page);

    expect(await getAttribute(button, 'aria-busy')).toBeNull();
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation only', async () => {
      await initButtonPure();

      const button = await getButton();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'hover', offset: '1px' });

      expect(await getOutlineStyle(button, { pseudo: '::before' })).toBe(hidden);

      await button.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(button, { pseudo: '::before' })).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(button, { pseudo: '::before' })).toBe(visible);
    });

    it('should show outline of shadowed <button> when it is focused', async () => {
      await initButtonPure();

      const host = await getHost();
      const button = await getButton();

      expect(await getStyleOnFocus(button, 'outline', { pseudo: '::before' })).toBe(
        expectedStyleOnFocus({ offset: '1px' })
      );

      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);
      expect(await getStyleOnFocus(button, 'outline', { pseudo: '::before' })).toBe(
        expectedStyleOnFocus({ theme: 'dark', offset: '1px' })
      );
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initButtonPure();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-button-pure']).toBe(1, 'componentDidLoad: p-button-pure');
      expect(status.componentDidLoad['p-text']).toBe(1, 'componentDidLoad: p-text');
      expect(status.componentDidLoad['p-icon']).toBe(1, 'componentDidLoad: p-icon');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips with spinner', async () => {
      await initButtonPure({ isLoading: true });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-button-pure']).toBe(1, 'componentDidLoad: p-button-pure');
      expect(status.componentDidLoad['p-text']).toBe(1, 'componentDidLoad: p-text');
      expect(status.componentDidLoad['p-spinner']).toBe(1, 'componentDidLoad: p-spinner');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initButtonPure();
      const host = await getHost();

      await setAttribute(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-button-pure']).toBe(1, 'componentDidUpdate: p-button-pure');

      expect(status.componentDidUpdate.all).toBe(1, 'componentDidUpdate: all');
    });
  });
});
