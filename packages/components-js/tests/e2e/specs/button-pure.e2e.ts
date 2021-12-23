import {
  addEventListener,
  ClickableTests,
  expectedStyleOnFocus,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getAttribute,
  getLifecycleStatus,
  getOutlineStyle,
  hasFocus,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';

describe('button-pure', () => {
  let page: Page;

  beforeEach(async () => {
    page = await browser.newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-button-pure');
  const getButton = () => selectNode(page, 'p-button-pure >>> button');

  const initButtonPure = (opts?: { isLoading?: boolean; withSubline?: boolean }): Promise<void> => {
    const { isLoading = false, withSubline = false } = opts ?? {};
    const loading = isLoading ? `loading="${isLoading}"` : '';

    return setContentWithDesignSystem(
      page,
      `
      <p-button-pure ${loading}>
        Some label
        ${withSubline ? '<span slot="subline">Some Subline </span>' : ''}
      </p-button-pure>`
    );
  };
  const clickableTests: ClickableTests = [
    {
      state: 'disabled',
      setContent: async () =>
        await setContentWithDesignSystem(page, '<p-button-pure disabled>Some label</p-button-pure>'),
    },
    {
      state: 'loading',
      setContent: async () => await initButtonPure({ isLoading: true }),
    },
  ];

  for (const { state, setContent } of clickableTests) {
    it(`should not be clickable when ${state}`, async () => {
      await setContent();
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
  }

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
      await waitForEventSerialization(page);
    }
    await waitForEventSerialization(page); // 🙈
    await waitForEventSerialization(page); // 🙈

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
        document.querySelector('#wrapper').addEventListener('click', (e) => {
          e.preventDefault();
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

    expect(beforeFocusCalls, 'beforeFocusCalls initially').toBe(0);
    expect(buttonFocusCalls, 'buttonFocusCalls initially').toBe(0);
    expect(buttonFocusInCalls, 'buttonFocusInCalls initially').toBe(0);
    expect(buttonBlurCalls, 'buttonBlurCalls initially').toBe(0);
    expect(buttonFocusOutCalls, 'buttonFocusOutCalls initially').toBe(0);
    expect(afterFocusCalls, 'afterFocusCalls initially').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls, 'beforeFocusCalls after 1st tab').toBe(1);
    expect(buttonFocusCalls, 'buttonFocusCalls after 1st tab').toBe(0);
    expect(buttonFocusInCalls, 'buttonFocusInCalls after 1st tab').toBe(0);
    expect(buttonBlurCalls, 'buttonBlurCalls after 1st tab').toBe(0);
    expect(buttonFocusOutCalls, 'buttonFocusOutCalls after 1st tab').toBe(0);
    expect(afterFocusCalls, 'afterFocusCalls after 1st tab').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls, 'beforeFocusCalls after 2nd tab').toBe(1);
    expect(buttonFocusCalls, 'buttonFocusCalls after 2nd tab').toBe(1);
    expect(buttonFocusInCalls, 'buttonFocusInCalls after 2nd tab').toBe(1);
    expect(buttonBlurCalls, 'buttonBlurCalls after 2nd tab').toBe(0);
    expect(buttonFocusOutCalls, 'buttonFocusOutCalls after 2nd tab').toBe(0);
    expect(afterFocusCalls, 'afterFocusCalls after 2nd tab').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-button-pure');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls, 'beforeFocusCalls after 3rd tab').toBe(1);
    expect(buttonFocusCalls, 'buttonFocusCalls after 3rd tab').toBe(1);
    expect(buttonFocusInCalls, 'buttonFocusInCalls after 3rd tab').toBe(1);
    expect(buttonBlurCalls, 'buttonBlurCalls after 3rd tab').toBe(1);
    expect(buttonFocusOutCalls, 'buttonFocusOutCalls after 3rd tab').toBe(1);
    expect(afterFocusCalls, 'afterFocusCalls after 3rd tab').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 3rd tab').toBe('after');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls, 'beforeFocusCalls after 1st tab back').toBe(1);
    expect(buttonFocusCalls, 'buttonFocusCalls after 1st tab back').toBe(2);
    expect(buttonFocusInCalls, 'buttonFocusInCalls after 1st tab back').toBe(2);
    expect(buttonBlurCalls, 'buttonBlurCalls after 1st tab back').toBe(1);
    expect(buttonFocusOutCalls, 'buttonFocusOutCalls after 1st tab back').toBe(1);
    expect(afterFocusCalls, 'afterFocusCalls after 1st tab back').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-button-pure');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls, 'beforeFocusCalls after 2nd tab back').toBe(2);
    expect(buttonFocusCalls, 'buttonFocusCalls after 2nd tab back').toBe(2);
    expect(buttonFocusInCalls, 'buttonFocusInCalls after 2nd tab back').toBe(2);
    expect(buttonBlurCalls, 'buttonBlurCalls after 2nd tab back').toBe(2);
    expect(buttonFocusOutCalls, 'buttonFocusOutCalls after 2nd tab back').toBe(2);
    expect(afterFocusCalls, 'afterFocusCalls after 2nd tab back').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 2nd tab back').toBe('before');

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

  it.each(['tabbable="false"', 'tabindex="-1"'])('should be removed from tab order for %s', async (attribute) => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-button-pure ${attribute}>Some label</p-button-pure>
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
    await waitForEventSerialization(page);
    expect(buttonFocusCalls, 'buttonFocusCalls after tab').toBe(0);
    expect(afterFocusCalls, 'afterFocusCalls after tab').toBe(1);

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(buttonFocusCalls, 'buttonFocusCalls after second tab').toBe(0);
    expect(afterFocusCalls, 'afterFocusCalls after second tab').toBe(1);
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

    const host = await getHost();
    await focusElAndPressEnter(host);
    expect(submitCalls).toBe(1); // type isn't submit, yet

    await setProperty(host, 'type', 'button');
    await focusElAndPressEnter(host);
    expect(submitCalls).toBe(1); // type isn't submit, yet

    await setProperty(host, 'type', 'reset');
    await focusElAndPressEnter(host);
    expect(submitCalls).toBe(1); // type isn't submit, yet

    await setProperty(host, 'type', 'submit');
    await focusElAndPressEnter(host);
    expect(submitCalls).toBe(2);

    await focusElAndPressEnter(host);
    expect(submitCalls).toBe(3);
  });

  it('should add aria-busy when loading and remove if finished', async () => {
    await setContentWithDesignSystem(page, `<p-button-pure>Some label</p-button-pure>`);
    const host = await getHost();
    const button = await getButton();

    expect(await getAttribute(button, 'aria-busy')).toBeNull();

    await setProperty(host, 'loading', true);
    await waitForStencilLifecycle(page);

    expect(await getAttribute(button, 'aria-busy')).toBe('true');

    await setProperty(host, 'loading', false);
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

      expect(await getOutlineStyle(button, { pseudo: '::before' })).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(button, { pseudo: '::before' })).toBe(visible);
    });

    it('should keep focus if state switches to loading', async () => {
      await initButtonPure();

      const host = await getHost();
      expect(await hasFocus(page, host)).toBe(false);

      await page.keyboard.press('Tab');

      expect(await hasFocus(page, host), 'after Tab').toBe(true);

      await setProperty(host, 'loading', true);
      await waitForStencilLifecycle(page);

      expect(await hasFocus(page, host), 'focus style on loading').toBe(true);

      await setProperty(host, 'loading', false);
      await waitForStencilLifecycle(page);

      expect(await hasFocus(page, host), 'final focus style').toBe(true);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initButtonPure();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(1);
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips with spinner', async () => {
      await initButtonPure({ isLoading: true });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(1);
      expect(status.componentDidLoad['p-spinner'], 'componentDidLoad: p-spinner').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initButtonPure();
      const host = await getHost();

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(1);

      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree properties', async () => {
      await initButtonPure();
      const button = await getButton();

      await expectA11yToMatchSnapshot(page, button);
    });

    it('should expose correct accessibility name if label is hidden', async () => {
      await initButtonPure();
      const host = await getHost();
      const button = await getButton();
      await setProperty(host, 'hide-label', 'true');
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, button);
    });

    it('should expose accessibility tree description with slotted subline', async () => {
      await initButtonPure({ withSubline: true });
      const button = await getButton();

      await expectA11yToMatchSnapshot(page, button);
    });

    it('should expose correct accessibility tree if accessibility properties are set', async () => {
      await initButtonPure();
      const host = await getHost();
      const button = await getButton();
      await setProperty(host, 'aria', {
        'aria-label': 'Some more detailed label',
        'aria-expanded': true,
        'aria-haspopup': true,
      });
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, button, { message: 'Initial' });

      await setProperty(host, 'aria', {
        'aria-pressed': true,
      });
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, button, { message: 'Pressed' }); // need to split the test in 2, because aria-expanded and aria-pressed are invalid if used simultaneously. Also aria-pressed removes the accessible name.
    });

    it('should add aria-busy attribute when loading and remove it if finished', async () => {
      await initButtonPure();
      const host = await getHost();
      const button = await getButton();

      expect(await getAttribute(button, 'aria-busy')).toBeNull();

      await setProperty(host, 'loading', true);
      await waitForStencilLifecycle(page);

      expect(await getAttribute(button, 'aria-busy')).toBe('true');

      await setProperty(host, 'loading', false);
      await waitForStencilLifecycle(page);

      expect(await getAttribute(button, 'aria-busy')).toBeNull();
    });
  });
});
