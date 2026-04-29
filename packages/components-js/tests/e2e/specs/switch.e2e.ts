import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getActiveElementId,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  hasFocus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-switch');
const getButton = (page: Page) => page.locator('p-switch button');
const getLabel = (page: Page) => page.locator('p-switch label');

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

const initSwitch = (page: Page, opts?: InitOptions): Promise<void> => {
  const { isDisabled = false, isLoading = false, otherMarkup = '' } = opts || {};
  return setContentWithDesignSystem(
    page,
    `<p-switch disabled="${isDisabled}" loading="${isLoading}">Some Label</p-switch>${otherMarkup}`
  );
};

test.describe('label', () => {
  test('should check/uncheck switch on click', async ({ page }) => {
    await initSwitch(page, { otherMarkup: clickHandlerScript });
    const host = getHost(page);
    const label = getLabel(page);

    expect(await getProperty(host, 'checked')).toBeFalsy();

    await label.click();
    await waitForStencilLifecycle(page);

    expect(await getProperty(host, 'checked')).toBeTruthy();
  });
});

test.describe('events', () => {
  test('should trigger update event on click', async ({ page }) => {
    await initSwitch(page);

    const host = getHost(page);
    const button = getButton(page);
    await addEventListener(host, 'update');

    await button.click();
    const { counter } = await getEventSummary(host, 'update');

    expect(counter).toBe(1);
  });

  test('should not trigger update event on click if switch is disabled', async ({ page }) => {
    await initSwitch(page, { isDisabled: true });

    const host = getHost(page);
    const button = getButton(page);
    await addEventListener(host, 'update');

    await button.click({ force: true });
    const { counter } = await getEventSummary(host, 'update');

    expect(counter).toBe(0);
  });

  test('should not trigger update event on click if switch is loading', async ({ page }) => {
    await initSwitch(page, { isLoading: true });

    const host = getHost(page);
    const button = getButton(page);
    await addEventListener(host, 'update');

    await button.click({ force: true });
    await host.click();
    const { counter } = await getEventSummary(host, 'update');

    expect(counter).toBe(0);
  });

  test('should dispatch correct click events', async ({ page }) => {
    await setContentWithDesignSystem(page, `<div><p-switch id="hostElement">Some label</p-switch></div>`);

    const wrapper = page.locator('div');
    const button = getButton(page);
    const label = getLabel(page);
    await addEventListener(wrapper, 'click');

    await button.click();
    await label.click(); // the first click is related to the label, the second to the associated button => native browser behaviour results in 2 clicks
    const { counter, targets } = await getEventSummary(wrapper, 'click');

    expect(counter).toBe(3);
    for (const target of targets) {
      expect(target.id).toBe('hostElement');
    }
  });

  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger focus & blur events at the correct time', async ({ page }) => {
      await setContentWithDesignSystem(
        page,
        `<div id="wrapper">
 <a href="#" id="before">before</a>
 <p-switch id="my-switch">Some label</p-switch>
 <a href="#" id="after">after</a>
</div>`
      );

      const host = getHost(page);
      const before = page.locator('#before');
      const after = page.locator('#after');

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
  });

  test('should provide functionality to focus & blur the custom element', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `<div id="wrapper">
 <a href="#" id="before">before</a>
 <p-switch>Some label</p-switch>
</div>`
    );

    const host = getHost(page);
    const before = page.locator('#before');
    await before.focus();
    expect(await hasFocus(host)).toBe(false);
    await host.focus();
    expect(await hasFocus(host)).toBe(true);
    const switchElement = page.locator('p-switch');
    await switchElement.blur();
    expect(await hasFocus(host)).toBe(false);
  });

});

test.describe('focus', () => {
  skipInBrowsers(['webkit']);
  test('should keep focus if state switches to loading', async ({ page }) => {
    await initSwitch(page);

    const host = getHost(page);
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

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initSwitch(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-switch'], 'componentDidLoad: p-switch').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips with spinner', async ({ page }) => {
    await initSwitch(page, { isLoading: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-switch'], 'componentDidLoad: p-switch').toBe(1);
    expect(status.componentDidLoad['p-spinner'], 'componentDidLoad: p-spinner').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initSwitch(page);
    const host = getHost(page);

    await setProperty(host, 'checked', true);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-switch'], 'componentDidUpdate: p-switch').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
