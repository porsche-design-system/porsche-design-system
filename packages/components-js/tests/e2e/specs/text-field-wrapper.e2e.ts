import type { Locator, Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  clickElementPosition,
  getAttribute,
  getElementInnerText,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  hoverElementPosition,
  removeAttribute,
  setAttribute,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForImproveButtonHandlingForCustomElement,
  waitForStencilLifecycle,
} from '../helpers';
import type { FormState } from '@porsche-design-system/components';

const getHost = (page: Page) => page.locator('p-text-field-wrapper');
const getInput = (page: Page) => page.locator('input');
const getLabel = (page: Page) => page.locator('p-text-field-wrapper label');
const getLabelSrText = (page: Page) => page.locator('p-text-field-wrapper label .sr-only');
const getCounterOrUnit = (page: Page) => page.locator('p-text-field-wrapper .unit-counter');
const getToggleOrClearButtonHost = (page: Page) => page.locator('p-text-field-wrapper p-button-pure');
const getToggleOrClearButton = (page: Page) => page.locator('p-text-field-wrapper p-button-pure button');
const getLocateActionButton = (page: Page) => page.locator('p-text-field-wrapper p-button-pure + p-button-pure button');
const getSubmitButtonHost = (page: Page) => page.locator('p-text-field-wrapper p-button-pure').first();
const getSubmitButton = (page: Page) => page.locator('p-text-field-wrapper p-button-pure button').first();
const getIconName = (icon: Locator) => getProperty(icon, 'icon');
const counterCharacterLengthCssVarValue = async (page: Page) =>
  getHost(page).evaluate((element) =>
    getComputedStyle(element).getPropertyValue('--p-internal-counter-character-length')
  );

type InitOptions = {
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
  type?: 'number' | 'text' | 'password' | 'search';
  hasLabel?: boolean;
  hasUnit?: boolean;
  maxLength?: number;
  isWrappedInForm?: boolean;
  hasLocateAction?: boolean;
  showCounter?: boolean;
};

const initTextField = (page: Page, opts?: InitOptions): Promise<void> => {
  const {
    useSlottedLabel = false,
    useSlottedDescription = false,
    useSlottedMessage = false,
    state = 'none',
    type = 'text',
    hasLabel = false,
    hasUnit = false,
    maxLength,
    isWrappedInForm = false,
    hasLocateAction = false,
    showCounter,
  } = opts || {};

  const link = '<a href="#" onclick="return false;">link</a>';
  const slottedLabel = useSlottedLabel ? `<span slot="label">Label with a ${link}</span>` : '';
  const slottedDescription = useSlottedDescription ? `<span slot="description">Description with a ${link}</span>` : '';
  const slottedMessage = useSlottedMessage ? `<span slot="message">Message with a ${link}</span>` : '';

  const attrs = [
    `state="${state}"`,
    hasLabel && 'label="Some label"',
    hasUnit && 'unit="km/h"',
    hasLocateAction && 'action-icon="locate"',
    showCounter !== undefined && `show-counter="${showCounter}"`,
  ]
    .filter((x) => x)
    .join(' ');

  const textFieldWrapper = `<p-text-field-wrapper ${attrs}>
  ${slottedLabel}
  ${slottedDescription}
  <input type="${type}"${maxLength ? ` maxlength="${maxLength}"` : ''} />
  ${slottedMessage}
</p-text-field-wrapper>`;

  const content = isWrappedInForm ? `<form onsubmit="return false;">${textFieldWrapper}</form>` : textFieldWrapper;

  return setContentWithDesignSystem(page, content);
};

test.describe('input type="password"', () => {
  test.describe('Skip', () => {
    test.skip();
    test('should disable input when input is disabled programmatically', async ({ page }) => {
      await initTextField(page, { type: 'password', hasLabel: true });
      const input = getInput(page);

      const initialCursor = await getElementStyle(input, 'cursor');
      const initialBorderColor = await getElementStyle(input, 'borderColor');

      await setProperty(input, 'disabled', true);
      await waitForStencilLifecycle(page);

      expect(await getElementStyle(input, 'cursor'), 'disabled cursor').not.toBe(initialCursor);
      expect(await getElementStyle(input, 'borderColor'), 'disabled border').not.toBe(initialBorderColor);

      await setProperty(input, 'disabled', false);
      await waitForStencilLifecycle(page);

      expect(await getElementStyle(input, 'cursor'), 'not disabled cursor').toBe(initialCursor);
      expect(await getElementStyle(input, 'borderColor'), 'not disabled borderColor').toBe(initialBorderColor);
    });
  });

  test('should toggle icon when password visibility button is clicked', async ({ page }) => {
    await initTextField(page, { type: 'password', hasLabel: true });
    const button = getToggleOrClearButton(page);
    const buttonHost = getToggleOrClearButtonHost(page);

    expect(await getIconName(buttonHost)).toBe('view');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getIconName(buttonHost)).toBe('view-off');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getIconName(buttonHost)).toBe('view');
  });

  test('should toggle password visibility and focus input correctly', async ({ page }) => {
    await initTextField(page, { type: 'password', hasLabel: true });
    const button = getToggleOrClearButton(page);
    const input = getInput(page);

    await addEventListener(input, 'focus');

    expect(await getAttribute(input, 'type')).toBe('password');
    expect((await getEventSummary(input, 'focus')).counter).toBe(0);

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(input, 'type')).toBe('text');
    expect((await getEventSummary(input, 'focus')).counter).toBe(1);

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(input, 'type')).toBe('password');
    expect((await getEventSummary(input, 'focus')).counter).toBe(2);
  });
});

test.describe('input type="search"', () => {
  // verify wrapped input type="search" behaves the same as without in regards to clearing it and emitting events
  test.describe('events', () => {
    skipInBrowsers(['firefox', 'webkit'], () => {
      test('should emit input events for input without text-field-wrapper', async ({ page }) => {
        await setContentWithDesignSystem(page, '<input type="search" style="width: 100px; height: 50px">');
        const input = getInput(page);

        await addEventListener(input, 'input');
        await input.focus();

        await setProperty(input, 'value', 'value');
        await page.keyboard.press('Escape');
        expect(await getProperty(input, 'value')).toBe('');
        expect((await getEventSummary(input, 'input')).counter).toBe(1);

        await page.keyboard.press('Escape');
        expect((await getEventSummary(input, 'input')).counter).toBe(1);

        await setProperty(input, 'value', 'value');
        // in case positioning of clear button changes
        await page.mouse.click(90, 25);
        expect(await getProperty(input, 'value')).toBe('');
        expect((await getEventSummary(input, 'input')).counter).toBe(2);
      });
    });

    test('should emit input events for input with text-field-wrapper', async ({ page }) => {
      await initTextField(page, { type: 'search' });
      const input = getInput(page);

      await addEventListener(input, 'input');
      await input.focus();

      await setProperty(input, 'value', 'value');
      await page.keyboard.press('Escape');
      expect(await getProperty(input, 'value')).toBe('');
      expect((await getEventSummary(input, 'input')).counter).toBe(1);

      await page.keyboard.press('Escape');
      expect((await getEventSummary(input, 'input')).counter).toBe(1);

      await setProperty(input, 'value', 'value');
      const button = getToggleOrClearButton(page);
      await button.click();
      expect(await getProperty(input, 'value')).toBe('');
      expect((await getEventSummary(input, 'input')).counter).toBe(2);
    });

    test('should emit action event when action button is clicked', async ({ page }) => {
      await initTextField(page, { type: 'search', hasLocateAction: true });
      const host = getHost(page);
      const button = await getLocateActionButton(page);

      await addEventListener(host, 'action');

      await button.click();
      expect((await getEventSummary(host, 'action')).counter).toBe(1);
    });
  });

  test.describe('clear functionality', () => {
    const isClearButtonVisible = async (page: Page): Promise<boolean> => {
      const clearButton = getToggleOrClearButtonHost(page);
      return !(await getProperty(clearButton, 'hidden'));
    };

    test('should show clear button on keyboard typed input.value', async ({ page }) => {
      await initTextField(page, { type: 'search' });
      const input = getInput(page);

      await expect.poll(async () => await isClearButtonVisible(page)).toBe(false);

      await input.focus();
      await page.keyboard.type('search-term');
      await waitForStencilLifecycle(page);

      await expect.poll(async () => await isClearButtonVisible(page)).toBe(true);
    });

    test('should show clear button on programmatically set input.value', async ({ page }) => {
      await initTextField(page, { type: 'search' });
      const input = getInput(page);

      await expect.poll(async () => await isClearButtonVisible(page)).toBe(false);
      await setProperty(input, 'value', 'value');
      await waitForStencilLifecycle(page);

      await expect.poll(async () => await isClearButtonVisible(page)).toBe(true);
    });

    test('should reset input value on keydown Escape', async ({ page }) => {
      await initTextField(page, { type: 'search' });
      const input = getInput(page);
      await input.focus();
      await page.keyboard.type('search-term');
      await waitForStencilLifecycle(page);

      await expect.poll(async () => await isClearButtonVisible(page)).toBe(true);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getProperty(input, 'value')).toBe('');
      await expect.poll(async () => await isClearButtonVisible(page)).toBe(false);
    });

    test('should reset input value on clear-button click', async ({ page }) => {
      await initTextField(page, { type: 'search' });
      const input = getInput(page);
      const clearButton = getToggleOrClearButton(page);
      await input.focus();
      await page.keyboard.type('search-term');
      await waitForStencilLifecycle(page);

      await expect.poll(async () => await isClearButtonVisible(page)).toBe(true);

      await clearButton.click();
      await waitForStencilLifecycle(page);

      expect(await getProperty(input, 'value')).toBe('');
      await expect.poll(async () => await isClearButtonVisible(page)).toBe(false);
    });
  });

  test.describe('within form', () => {
    const isButtonDisabled = (locator: Locator) => getProperty(locator, 'disabled');

    test('should disable submit button when input is set to disabled programmatically', async ({ page }) => {
      await initTextField(page, { type: 'search', isWrappedInForm: true });
      const input = getInput(page);
      const buttonHost = getSubmitButtonHost(page);

      await expect.poll(async () => await isButtonDisabled(buttonHost)).toBe(false);

      await setProperty(input, 'disabled', true);
      await waitForStencilLifecycle(page);

      await expect.poll(async () => await isButtonDisabled(buttonHost)).toBe(true);

      await setProperty(input, 'disabled', false);
      await waitForStencilLifecycle(page);

      await expect.poll(async () => await isButtonDisabled(buttonHost)).toBe(false);
    });

    test('should disable submit button when input is set to readonly programmatically', async ({ page }) => {
      await initTextField(page, { type: 'search', isWrappedInForm: true });
      const input = getInput(page);
      const buttonHost = getSubmitButtonHost(page);

      await expect.poll(async () => await isButtonDisabled(buttonHost)).toBe(false);

      await setProperty(input, 'readOnly', true);
      await waitForStencilLifecycle(page);

      await expect.poll(async () => await isButtonDisabled(buttonHost)).toBe(true);

      await setProperty(input, 'readOnly', false);
      await waitForStencilLifecycle(page);

      await expect.poll(async () => await isButtonDisabled(buttonHost)).toBe(false);
    });

    test('should submit parent form on search button click', async ({ page }) => {
      await initTextField(page, { type: 'search', isWrappedInForm: true });
      const searchButton = getSubmitButton(page);

      const form = page.locator('form');
      await addEventListener(form, 'submit');

      await searchButton.click();
      await waitForImproveButtonHandlingForCustomElement(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });
  });

  skipInBrowsers(['firefox'], () => {
    test('should have "-webkit-appearance: none" on "::-webkit-search-decoration"', async ({ page }) => {
      await initTextField(page, { type: 'search' });
      const input = getInput(page);

      expect(await getElementStyle(input, 'webkitAppearance', { pseudo: '::-webkit-search-decoration' })).toBe('none');
    });
  });
});

test.describe('focus state', () => {
  test('should focus input when label text is clicked', async ({ page }) => {
    await initTextField(page, { hasLabel: true });
    const label = getLabel(page);
    const input = getInput(page);

    await addEventListener(input, 'focus');
    expect((await getEventSummary(input, 'focus')).counter).toBe(0);

    await label.click();
    expect((await getEventSummary(input, 'focus')).counter).toBe(1);
  });

  test('should focus input when unit element is clicked', async ({ page }) => {
    await initTextField(page, { type: 'number', hasUnit: true });
    const unitElement = getCounterOrUnit(page);
    const input = getInput(page);

    await addEventListener(input, 'focus');
    expect((await getEventSummary(input, 'focus')).counter).toBe(0);

    await clickElementPosition(page, unitElement);

    expect((await getEventSummary(input, 'focus')).counter).toBe(1);
  });

  test('should focus input when counter text is clicked', async ({ page }) => {
    await initTextField(page, { maxLength: 20 });
    const counter = getCounterOrUnit(page);
    const input = getInput(page);

    await addEventListener(input, 'focus');
    expect((await getEventSummary(input, 'focus')).counter).toBe(0);

    await clickElementPosition(page, counter);

    expect((await getEventSummary(input, 'focus')).counter).toBe(1);
  });
});

test.describe('hover state', () => {
  skipInBrowsers(['firefox', 'webkit']);
  const getBorderColor = (locator: Locator) => getElementStyle(locator, 'borderColor');
  const defaultBorderColor = 'rgb(107, 109, 112)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  test('should show hover state on input when label is hovered', async ({ page }) => {
    await initTextField(page, { hasLabel: true });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = getLabel(page);
    const input = getInput(page);

    expect(await getBorderColor(input)).toBe(defaultBorderColor);

    await input.hover();
    expect(await getBorderColor(input)).toBe(hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    expect(await getBorderColor(input)).toBe(defaultBorderColor);

    await label.hover();
    expect(await getBorderColor(input)).toBe(hoverBorderColor);
  });

  test('should show hover state on input when unit/counter is hovered', async ({ page }) => {
    await initTextField(page, { maxLength: 20 });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const counter = getCounterOrUnit(page);
    const input = getInput(page);

    expect(await getBorderColor(input)).toBe(defaultBorderColor);

    await input.hover();
    expect(await getBorderColor(input)).toBe(hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    expect(await getBorderColor(input)).toBe(defaultBorderColor);

    await hoverElementPosition(page, counter);
    expect(await getBorderColor(input)).toBe(hoverBorderColor);
  });
});

test.describe('showCounter', () => {
  test('should display correct counter when typing', async ({ page }) => {
    await initTextField(page, { maxLength: 20 });
    const counter = getCounterOrUnit(page);
    const input = getInput(page);

    expect(await getElementInnerText(counter)).toBe('0/20');
    await input.fill('h');
    expect(await getElementInnerText(counter)).toBe('1/20');
    await input.fill('hello');
    expect(await getElementInnerText(counter)).toBe('5/20');
    await input.press('Backspace');
    expect(await getElementInnerText(counter)).toBe('4/20');
    await input.press('Backspace');
    await input.press('Backspace');
    await input.press('Backspace');
    await input.press('Backspace');
    expect(await getElementInnerText(counter)).toBe('0/20');
  });

  test('should display correct counter when dynamically changing input value', async ({ page }) => {
    await initTextField(page, { maxLength: 20 });
    const counter = getCounterOrUnit(page);
    const input = getInput(page);
    const text1 = 'test string';
    const text2 = 'test test string';

    await setProperty(input, 'value', text1);
    await waitForStencilLifecycle(page);

    expect(await getElementInnerText(counter)).toBe(`${text1.length}/20`);

    await setProperty(input, 'value', text2);
    await waitForStencilLifecycle(page);

    expect(await getElementInnerText(counter)).toBe(`${text2.length}/20`);
  });

  test('should render counter when showCounter is dynamically changed', async ({ page }) => {
    await initTextField(page, { maxLength: 20 });
    const host = getHost(page);
    await expect(page.getByText('0/20')).toBeVisible();

    await setProperty(host, 'showCounter', false);
    await waitForStencilLifecycle(page);

    await expect(getCounterOrUnit(page)).toHaveCount(0);

    await setProperty(host, 'showCounter', true);
    await waitForStencilLifecycle(page);

    await expect(page.getByText('0/20')).toBeVisible();
  });

  test('should render counter when maxlength is changed dynamically', async ({ page }) => {
    await initTextField(page);
    const input = getInput(page);

    await expect(page.getByText('0/20')).toBeHidden();
    await expect(getLabelSrText(page)).toHaveCount(0);

    await setAttribute(input, 'maxlength', '20');

    await expect(page.getByText('0/20')).toBeVisible();
    expect(getLabelSrText(page)).toBeDefined();

    await removeAttribute(input, 'maxlength');

    await expect(page.getByText('0/20')).toBeHidden();
    await expect(getLabelSrText(page)).toHaveCount(0);
  });

  test('should not render counter when showCounter=false and maxlength is changed dynamically', async ({ page }) => {
    await initTextField(page, { showCounter: false });
    const input = getInput(page);

    await expect(page.getByText('0/20')).toBeHidden();
    await expect(getLabelSrText(page)).toHaveCount(0);

    await setAttribute(input, 'maxlength', '20');

    await expect(page.getByText('0/20')).toBeHidden();
    await expect(getLabelSrText(page)).toHaveCount(0);
  });

  skipInBrowsers(['webkit'], () => {
    test('should update css character length custom property correctly', async ({ page }) => {
      await initTextField(page, { showCounter: true });
      const input = getInput(page);
      await setAttribute(input, 'maxlength', '20');
      expect(await counterCharacterLengthCssVarValue(page)).toBe('4');

      await setProperty(input, 'value', 'some longer text');
      await waitForStencilLifecycle(page);

      expect(await counterCharacterLengthCssVarValue(page)).toBe('5');
    });
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initTextField(page, {
      useSlottedLabel: true,
      useSlottedDescription: true,
      useSlottedMessage: true,
      state: 'error',
      type: 'password',
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-text-field-wrapper'], 'componentDidLoad: p-text-field-wrapper').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
  });

  test('should work without unnecessary round trips after prop change', async ({ page }) => {
    await initTextField(page);
    const host = getHost(page);

    await setProperty(host, 'label', 'Some Label');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-text-field-wrapper'], 'componentDidUpdate: p-text-field-wrapper').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
  });
});
