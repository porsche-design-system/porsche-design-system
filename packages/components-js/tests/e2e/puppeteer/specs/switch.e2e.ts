import type { Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  hasFocus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-switch');
const getButton = () => selectNode(page, 'p-switch >>> button');
const getLabel = () => selectNode(page, 'p-switch >>> .label');
const getLoadingStatus = () => selectNode(page, 'p-switch >>> .loading');
const getLoadingMessage = async () => (await getLoadingStatus()).evaluate((el) => el.textContent);

const clickHandlerScript = `
<script>
  const switchComponent = document.querySelector('p-switch');
  switchComponent.addEventListener('update', (e) => {
    e.target.checked = e.detail.checked;
  });
</script>`;

type InitOptions = {
  isDisabled?: boolean;
  isLoading?: boolean;
  otherMarkup?: string;
};

const initSwitch = (opts?: InitOptions): Promise<void> => {
  const { isDisabled = false, isLoading = false, otherMarkup = '' } = opts || {};
  return setContentWithDesignSystem(
    page,
    `<p-switch disabled="${isDisabled}" loading="${isLoading}">Some Label</p-switch>${otherMarkup}`
  );
};

describe('label', () => {
  it('should check/uncheck switch on click', async () => {
    await initSwitch({ otherMarkup: clickHandlerScript });
    const host = await getHost();
    const label = await getLabel();

    expect(await getProperty(host, 'checked')).toBeFalsy();

    await label.click();
    await waitForStencilLifecycle(page);

    expect(await getProperty(host, 'checked')).toBeTruthy();
  });
});

describe('events', () => {
  it('should trigger event on click', async () => {
    await initSwitch();

    const host = await getHost();
    const button = await getButton();
    await addEventListener(host, 'switchChange');

    await button.click();
    const { counter } = await getEventSummary(host, 'switchChange');

    expect(counter).toBe(1);
  });

  it('should not trigger event on click if switch is disabled', async () => {
    await initSwitch({ isDisabled: true });

    const host = await getHost();
    const button = await getButton();
    await addEventListener(host, 'switchChange');

    await button.click();
    const { counter } = await getEventSummary(host, 'switchChange');

    expect(counter).toBe(0);
  });

  it('should not trigger event on click if switch is loading', async () => {
    await initSwitch({ isLoading: true });

    const host = await getHost();
    const button = await getButton();
    await addEventListener(host, 'switchChange');

    await button.click();
    await host.click();
    const { counter } = await getEventSummary(host, 'switchChange');

    expect(counter).toBe(0);
  });

  it('should dispatch correct click events', async () => {
    await setContentWithDesignSystem(page, `<div><p-switch id="hostElement">Some label</p-switch></div>`);

    const wrapper = await selectNode(page, 'div');
    const host = await getHost();
    const button = await getButton();
    await addEventListener(wrapper, 'click');

    await button.click();
    await host.click();
    const { counter, targets } = await getEventSummary(wrapper, 'click');

    expect(counter).toBe(2);
    for (const target of targets) {
      expect(target.id).toBe('hostElement');
    }
  });

  it('should trigger focus & blur events at the correct time', async () => {
    await setContentWithDesignSystem(
      page,
      `<div id="wrapper">
 <a href="#" id="before">before</a>
 <p-switch id="my-switch">Some label</p-switch>
 <a href="#" id="after">after</a>
</div>`
    );

    const host = await getHost();
    const before = await selectNode(page, '#before');
    const after = await selectNode(page, '#after');

    await addEventListener(before, 'focus');
    await addEventListener(host, 'focus');
    await addEventListener(host, 'focusin');
    await addEventListener(host, 'blur');
    await addEventListener(host, 'focusout');
    await addEventListener(after, 'focus');

    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls initially').toBe(0);
    expect((await getEventSummary(host, 'focus')).counter, 'buttonFocusCalls initially').toBe(0);
    expect((await getEventSummary(host, 'focusin')).counter, 'buttonFocusInCalls initially').toBe(0);
    expect((await getEventSummary(host, 'blur')).counter, 'buttonBlurCalls initially').toBe(0);
    expect((await getEventSummary(host, 'focusout')).counter, 'buttonFocusOutCalls initially').toBe(0);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls initially').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab').toBe(1);
    expect((await getEventSummary(host, 'focus')).counter, 'buttonFocusCalls after 1st tab').toBe(0);
    expect((await getEventSummary(host, 'focusin')).counter, 'buttonFocusInCalls after 1st tab').toBe(0);
    expect((await getEventSummary(host, 'blur')).counter, 'buttonBlurCalls after 1st tab').toBe(0);
    expect((await getEventSummary(host, 'focusout')).counter, 'buttonFocusOutCalls after 1st tab').toBe(0);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab').toBe(1);
    expect((await getEventSummary(host, 'focus')).counter, 'buttonFocusCalls after 2nd tab').toBe(1);
    expect((await getEventSummary(host, 'focusin')).counter, 'buttonFocusInCalls after 2nd tab').toBe(1);
    expect((await getEventSummary(host, 'blur')).counter, 'buttonBlurCalls after 2nd tab').toBe(0);
    expect((await getEventSummary(host, 'focusout')).counter, 'buttonFocusOutCalls after 2nd tab').toBe(0);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-switch');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(host, 'focus')).counter, 'buttonFocusCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(host, 'focusin')).counter, 'buttonFocusInCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(host, 'blur')).counter, 'buttonBlurCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(host, 'focusout')).counter, 'buttonFocusOutCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 3rd tab').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 3rd tab').toBe('after');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab back').toBe(1);
    expect((await getEventSummary(host, 'focus')).counter, 'buttonFocusCalls after 1st tab back').toBe(2);
    expect((await getEventSummary(host, 'focusin')).counter, 'buttonFocusInCalls after 1st tab back').toBe(2);
    expect((await getEventSummary(host, 'blur')).counter, 'buttonBlurCalls after 1st tab back').toBe(1);
    expect((await getEventSummary(host, 'focusout')).counter, 'buttonFocusOutCalls after 1st tab back').toBe(1);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab back').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-switch');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(host, 'focus')).counter, 'buttonFocusCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(host, 'focusin')).counter, 'buttonFocusInCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(host, 'blur')).counter, 'buttonBlurCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(host, 'focusout')).counter, 'buttonFocusOutCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab back').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 2nd tab back').toBe('before');

    await page.keyboard.up('ShiftLeft');
  });

  it('should provide functionality to focus & blur the custom element', async () => {
    await setContentWithDesignSystem(
      page,
      `<div id="wrapper">
 <a href="#" id="before">before</a>
 <p-switch>Some label</p-switch>
</div>`
    );

    const host = await getHost();
    const before = await selectNode(page, '#before');
    await before.focus();
    expect(await hasFocus(host)).toBe(false);
    await host.focus();
    expect(await hasFocus(host)).toBe(true);
    // Cant use ElementHandle 'host' because .blur() is not available
    await page.evaluate(() => {
      const switchElement = document.querySelector('p-switch') as HTMLElement;
      switchElement.blur();
    });
    expect(await hasFocus(host)).toBe(false);
  });

  it('should emit both switchChange and update event', async () => {
    await initSwitch();
    const host = await getHost();

    await addEventListener(host, 'switchChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'switchChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const button = await getButton();
    await button.click();
    expect((await getEventSummary(host, 'switchChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });
});

describe('focus', () => {
  it('should keep focus if state switches to loading', async () => {
    await initSwitch();

    const host = await getHost();
    expect(await hasFocus(host)).toBe(false);

    await page.keyboard.press('Tab');

    expect(await hasFocus(host), 'after Tab').toBe(true);

    await setProperty(host, 'loading', true);
    await waitForStencilLifecycle(page);

    expect(await hasFocus(host), 'focus style on loading').toBe(true);

    await setProperty(host, 'loading', false);
    await waitForStencilLifecycle(page);

    expect(await hasFocus(host), 'final focus style').toBe(true);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initSwitch();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-switch'], 'componentDidLoad: p-switch').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips with spinner', async () => {
    await initSwitch({ isLoading: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-switch'], 'componentDidLoad: p-switch').toBe(1);
    expect(status.componentDidLoad['p-spinner'], 'componentDidLoad: p-spinner').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initSwitch();
    const host = await getHost();

    await setProperty(host, 'checked', true);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-switch'], 'componentDidUpdate: p-switch').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initSwitch();
    const label = () => selectNode(page, 'p-switch >>> label');
    const status = await getLoadingStatus();

    await expectA11yToMatchSnapshot(page, await label(), { interestingOnly: false });
    await expectA11yToMatchSnapshot(page, status, { interestingOnly: false });
  });

  it('should expose correct loading message initially: loading: false', async () => {
    await initSwitch();

    expect(await getLoadingMessage()).toBe('');
  });

  it('should expose correct loading message if loading is initially true and then changed programmatically', async () => {
    await initSwitch({ isLoading: true });
    const host = await getHost();

    expect(await getLoadingMessage()).toBe('Loading');

    await setProperty(host, 'loading', false);
    await waitForStencilLifecycle(page);

    expect(await getLoadingMessage()).toBe('Loading finished');
  });

  it('should expose correct loading message if loading is changed programmatically', async () => {
    await initSwitch();
    const host = await getHost();

    expect(await getLoadingMessage()).toBe('');

    await setProperty(host, 'loading', true);
    await waitForStencilLifecycle(page);

    expect(await getLoadingMessage()).toBe('Loading');

    await setProperty(host, 'loading', false);
    await waitForStencilLifecycle(page);

    expect(await getLoadingMessage()).toBe('Loading finished');
  });
});
