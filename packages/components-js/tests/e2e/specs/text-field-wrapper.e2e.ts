import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getElementStyle,
  getLifecycleStatus,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
  getElementInnerText,
  setAttribute,
} from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
const CSS_TRANSITION_DURATION = 240;

beforeEach(async () => {
  page = await browser.newPage();
  await initAddEventListener(page);
});
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-text-field-wrapper');
const getInput = () => selectNode(page, 'input');
const getLabel = () => selectNode(page, 'p-text-field-wrapper >>> .label__text');
const getCounterOrUnit = () => selectNode(page, 'p-text-field-wrapper >>> .unit');
const getToggleOrClearButton = () => selectNode(page, 'p-text-field-wrapper >>> button[type=button]');
const getLocateActionButton = () =>
  selectNode(page, 'p-text-field-wrapper >>> button[type=button] + button[type=button]');
const getSubmitButton = () => selectNode(page, 'p-text-field-wrapper >>> button[type=submit]');
const getMessage = () => selectNode(page, 'p-text-field-wrapper >>> .message');
const getIcon = () => selectNode(page, 'p-text-field-wrapper >>> p-icon');
const getIconName = (icon: ElementHandle) => getProperty(icon, 'name');

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
};

const initTextField = (opts?: InitOptions): Promise<void> => {
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

it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
  await initTextField();
  const textFieldComponent = await getHost();
  expect(await getLabel()).toBeNull();

  await setProperty(textFieldComponent, 'label', 'Some label');
  await waitForStencilLifecycle(page);
  expect(await getLabel()).not.toBeNull();
});

describe('input type="password"', () => {
  it('should disable input when input is disabled programmatically', async () => {
    await initTextField({ type: 'password', hasLabel: true });
    const input = await getInput();

    const initialCursor = await getElementStyle(input, 'cursor');
    const initialBorderColor = await getElementStyle(input, 'borderColor');

    await setProperty(input, 'disabled', true);
    await waitForStencilLifecycle(page);
    await page.waitForTimeout(CSS_TRANSITION_DURATION);

    expect(await getElementStyle(input, 'cursor'), 'disabled cursor').not.toBe(initialCursor);
    expect(await getElementStyle(input, 'borderColor'), 'disabled border').not.toBe(initialBorderColor);

    await setProperty(input, 'disabled', false);
    await waitForStencilLifecycle(page);
    await page.waitForTimeout(CSS_TRANSITION_DURATION);

    expect(await getElementStyle(input, 'cursor'), 'not disabled cursor').toBe(initialCursor);
    expect(await getElementStyle(input, 'borderColor'), 'not disabled borderColor').toBe(initialBorderColor);
  });

  it('should toggle icon when password visibility button is clicked', async () => {
    await initTextField({ type: 'password', hasLabel: true });
    const button = await getToggleOrClearButton();

    const icon = await getIcon();
    expect(await getIconName(icon)).toBe('view');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getIconName(icon)).toBe('view-off');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getIconName(icon)).toBe('view');
  });

  it('should toggle password visibility and focus input correctly', async () => {
    await initTextField({ type: 'password', hasLabel: true });
    const button = await getToggleOrClearButton();
    const input = await getInput();

    let inputFocusCalls = 0;
    await addEventListener(input, 'focus', () => inputFocusCalls++);

    expect(await getAttribute(input, 'type')).toBe('password');
    expect(inputFocusCalls).toBe(0);

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(input, 'type')).toBe('text');
    expect(inputFocusCalls).toBe(1);

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(input, 'type')).toBe('password');
    expect(inputFocusCalls).toBe(2);
  });
});

describe('input type="search"', () => {
  // verify wrapped input type="search" behaves the same as without in regards to clearing it and emitting events
  describe('events', () => {
    it('should emit input events for input without text-field-wrapper', async () => {
      await setContentWithDesignSystem(page, '<input type="search" style="width: 100px; height: 50px">');
      const input = await getInput();

      let inputEvents = 0;
      await addEventListener(input, 'input', () => inputEvents++);
      await input.focus();

      await setProperty(input, 'value', 'value');
      await page.keyboard.press('Escape');
      await waitForEventSerialization(page);
      expect(await getProperty(input, 'value')).toBe('');
      expect(inputEvents).toBe(1);

      await page.keyboard.press('Escape');
      await waitForEventSerialization(page);
      expect(inputEvents).toBe(1);

      await setProperty(input, 'value', 'value');
      await page.mouse.click(90, 25);
      await waitForEventSerialization(page);
      expect(await getProperty(input, 'value')).toBe('');
      expect(inputEvents).toBe(2);
    });

    it('should emit input events for input with text-field-wrapper', async () => {
      await initTextField({ type: 'search' });
      const input = await getInput();

      let inputEvents = 0;
      await addEventListener(input, 'input', () => inputEvents++);
      await input.focus();

      await setProperty(input, 'value', 'value');
      await page.keyboard.press('Escape');
      await waitForEventSerialization(page);
      expect(await getProperty(input, 'value')).toBe('');
      expect(inputEvents).toBe(1);

      await page.keyboard.press('Escape');
      await waitForEventSerialization(page);
      expect(inputEvents).toBe(1);

      await setProperty(input, 'value', 'value');
      const button = await getToggleOrClearButton();
      await button.click();
      await waitForEventSerialization(page);
      expect(await getProperty(input, 'value')).toBe('');
      expect(inputEvents).toBe(2);
    });

    it('should emit action event when action button is clicked', async () => {
      await initTextField({ type: 'search', hasLocateAction: true });
      const host = await getHost();
      const button = await getLocateActionButton();

      let actionEvents = 0;
      await addEventListener(host, 'action', () => actionEvents++);

      await button.click();
      await waitForEventSerialization(page);
      expect(actionEvents).toBe(1);
    });
  });

  describe('clear functionality', () => {
    const isClearButtonVisible = async (): Promise<boolean> => {
      const clearButton = await getToggleOrClearButton();
      return !(await getProperty(clearButton, 'hidden'));
    };

    it('should show clear button on keyboard typed input.value', async () => {
      await initTextField({ type: 'search' });
      const input = await getInput();

      expect(await isClearButtonVisible()).toBe(false);

      await input.focus();
      await page.keyboard.type('search-term');
      await waitForStencilLifecycle(page);

      expect(await isClearButtonVisible()).toBe(true);
    });

    it('should show clear button on programmatically set input.value', async () => {
      await initTextField({ type: 'search' });
      const input = await getInput();

      expect(await isClearButtonVisible()).toBe(false);
      await setProperty(input, 'value', 'value');
      await waitForStencilLifecycle(page);

      expect(await isClearButtonVisible()).toBe(true);
    });

    it('should reset input value on keydown Escape', async () => {
      await initTextField({ type: 'search' });
      const input = await getInput();
      await input.focus();
      await page.keyboard.type('search-term');
      await waitForStencilLifecycle(page);

      expect(await isClearButtonVisible()).toBe(true);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getProperty(input, 'value')).toBe('');
      expect(await isClearButtonVisible()).toBe(false);
    });

    it('should reset input value on clear-button click', async () => {
      await initTextField({ type: 'search' });
      const input = await getInput();
      const clearButton = await getToggleOrClearButton();
      await input.focus();
      await page.keyboard.type('search-term');
      await waitForStencilLifecycle(page);

      expect(await isClearButtonVisible()).toBe(true);

      await clearButton.click();
      await waitForStencilLifecycle(page);

      expect(await getProperty(input, 'value')).toBe('');
      expect(await isClearButtonVisible()).toBe(false);
    });
  });

  describe('without form', () => {
    it('should not have submit button', async () => {
      await initTextField({ type: 'search' });
      const button = await getSubmitButton();

      expect(button).toBe(null);
    });
  });

  describe('within form', () => {
    const isButtonDisabled = (handle: ElementHandle) => getProperty(handle, 'disabled');

    it('should disable submit button when input is set to disabled programmatically', async () => {
      await initTextField({ type: 'search', isWrappedInForm: true });
      const input = await getInput();
      const button = await getSubmitButton();

      expect(await isButtonDisabled(button)).toBe(false);
      expect(await getElementStyle(button, 'cursor'), 'initial cursor').toBe('pointer');

      await setProperty(input, 'disabled', true);
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      expect(await isButtonDisabled(button)).toBe(true);
      expect(await getElementStyle(button, 'cursor'), 'disabled cursor').toBe('not-allowed');

      await setProperty(input, 'disabled', false);
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      expect(await isButtonDisabled(button)).toBe(false);
      expect(await getElementStyle(button, 'cursor'), 'final cursor').toBe('pointer');
    });

    it('should disable submit button when input is set to readonly programmatically', async () => {
      await initTextField({ type: 'search', isWrappedInForm: true });
      const input = await getInput();
      const button = await getSubmitButton();

      expect(await isButtonDisabled(button)).toBe(false);
      expect(await getElementStyle(button, 'cursor'), 'initial cursor').toBe('pointer');

      await setProperty(input, 'readOnly', true);
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      expect(await isButtonDisabled(button)).toBe(true);
      expect(await getElementStyle(button, 'cursor'), 'disabled cursor').toBe('not-allowed');

      await setProperty(input, 'readOnly', false);
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      expect(await isButtonDisabled(button)).toBe(false);
      expect(await getElementStyle(button, 'cursor'), 'final cursor').toBe('pointer');
    });

    it('should submit parent form on search button click', async () => {
      await initTextField({ type: 'search', isWrappedInForm: true });
      const searchButton = await getSubmitButton();

      const form = await selectNode(page, 'form');

      let formFocusCalls = 0;
      await addEventListener(form, 'submit', () => formFocusCalls++);

      await searchButton.click();
      await waitForEventSerialization(page);
      await waitForEventSerialization(page); // 🙈
      await waitForEventSerialization(page); // 🙈
      await waitForEventSerialization(page); // 🙈
      await waitForEventSerialization(page); // 🙈
      await waitForEventSerialization(page); // 🙈
      await waitForEventSerialization(page); // 🙈
      await waitForEventSerialization(page); // 🙈

      expect(formFocusCalls).toBe(1);
    });
  });

  it('should have "-webkit-appearance: none" on "::-webkit-search-decoration"', async () => {
    await initTextField({ type: 'search' });
    const input = await getInput();

    expect(await getElementStyle(input, 'webkitAppearance', { pseudo: '::-webkit-search-decoration' })).toBe('none');
  });
});

describe('focus state', () => {
  it('should focus input when label text is clicked', async () => {
    await initTextField({ hasLabel: true });
    const label = await getLabel();
    const input = await getInput();

    let inputFocusSpyCalls = 0;
    await addEventListener(input, 'focus', () => inputFocusSpyCalls++);

    expect(inputFocusSpyCalls).toBe(0);
    await label.click();
    await waitForEventSerialization(page);
    await waitForEventSerialization(page); // 🙈

    expect(inputFocusSpyCalls).toBe(1);
  });

  it('should focus input when unit element is clicked', async () => {
    await initTextField({ type: 'number', hasUnit: true });
    const unitElement = await getCounterOrUnit();
    const input = await getInput();

    let inputFocusSpyCalls = 0;
    await addEventListener(input, 'focus', () => inputFocusSpyCalls++);

    expect(inputFocusSpyCalls).toBe(0);
    await unitElement.click();
    await waitForEventSerialization(page);

    expect(inputFocusSpyCalls).toBe(1);
  });

  it('should focus input when counter text is clicked', async () => {
    await initTextField({ maxLength: 20 });
    const counter = await getCounterOrUnit();
    const input = await getInput();

    let inputFocusSpyCalls = 0;
    await addEventListener(input, 'focus', () => inputFocusSpyCalls++);

    expect(inputFocusSpyCalls).toBe(0);

    await counter.click();
    await waitForStencilLifecycle(page);

    expect(inputFocusSpyCalls).toBe(1);
  });
});

describe('hover state', () => {
  const getBorderColor = (element: ElementHandle) => getElementStyle(element, 'borderColor');
  const defaultColor = 'rgb(98, 102, 105)';
  const hoverColor = 'rgb(0, 0, 0)';

  it('should show hover state on input when label is hovered', async () => {
    await initTextField({ hasLabel: true });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = await getLabel();
    const input = await getInput();

    const initialStyle = await getBorderColor(input);
    expect(initialStyle).toBe(defaultColor);
    await input.hover();
    const hoverStyle = await getBorderColor(input);
    expect(hoverStyle).toBe(hoverColor);

    await page.mouse.move(0, 300); // undo hover
    expect(await getBorderColor(input)).toBe(defaultColor);

    await label.hover();
    expect(await getBorderColor(input)).toBe(hoverColor);
  });

  it('should show hover state on input when unit/counter is hovered', async () => {
    await initTextField({ maxLength: 20 });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const counter = await getCounterOrUnit();
    const input = await getInput();

    const initialStyle = await getBorderColor(input);
    expect(initialStyle).toBe(defaultColor);
    await input.hover();
    const hoverStyle = await getBorderColor(input);
    expect(hoverStyle).toBe(hoverColor);

    await page.mouse.move(0, 300); // undo hover
    expect(await getBorderColor(input)).toBe(defaultColor);

    await counter.hover();
    expect(await getBorderColor(input)).toBe(hoverColor);
  });
});

it('should display correct counter when typing', async () => {
  await initTextField({ maxLength: 20 });
  const counter = await getCounterOrUnit();
  const input = await getInput();

  expect(await getElementInnerText(counter)).toBe('0/20');
  await input.type('h');
  expect(await getElementInnerText(counter)).toBe('1/20');
  await input.type('ello');
  expect(await getElementInnerText(counter)).toBe('5/20');
  await input.press('Backspace');
  expect(await getElementInnerText(counter)).toBe('4/20');
  await input.press('Backspace');
  await input.press('Backspace');
  await input.press('Backspace');
  await input.press('Backspace');
  expect(await getElementInnerText(counter)).toBe('0/20');
});

it('should render characterCountElement when maxlength is set', async () => {
  await initTextField();
  const input = await getInput();

  expect(await selectNode(page, 'p-text-field-wrapper >>> label .sr-only')).toBeNull();

  await setAttribute(input, 'maxlength', '20');

  expect(await selectNode(page, 'p-text-field-wrapper >>> label .sr-only')).toBeDefined();
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initTextField({
      useSlottedLabel: true,
      useSlottedDescription: true,
      useSlottedMessage: true,
      state: 'error',
      type: 'password',
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-text-field-wrapper'], 'componentDidLoad: p-text-field-wrapper').toBe(1);
    expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(3);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(6);
  });

  it('should work without unnecessary round trips after prop change', async () => {
    await initTextField();
    const host = await getHost();

    await setProperty(host, 'label', 'Some Label');
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(1);

    expect(status.componentDidUpdate['p-text-field-wrapper'], 'componentDidUpdate: p-text-field-wrapper').toBe(1);
    expect(status.componentDidUpdate['p-text'], 'componentDidUpdate: p-text').toBe(0);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initTextField({ hasLabel: true });
    const input = await getInput();

    await expectA11yToMatchSnapshot(page, input);
  });

  it('should expose correct accessibility tree with description text', async () => {
    await setContentWithDesignSystem(
      page,
      `
        <p-text-field-wrapper label="Some label" description="Some description">
          <input type="text">
        </p-text-field-wrapper>`
    );
    const input = await getInput();

    await expectA11yToMatchSnapshot(page, input);
  });

  it('should expose correct accessibility tree properties in error state', async () => {
    await setContentWithDesignSystem(
      page,
      `
        <p-text-field-wrapper label="Some label" description="Some description" message="Some error message" state="error">
          <input type="text">
        </p-text-field-wrapper>`
    );
    const input = await getInput();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input' });
    await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
  });

  it('should add/remove accessibility tree properties if state changes programmatically', async () => {
    await initTextField({ hasLabel: true });

    const host = await getHost();

    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message.');
    await waitForStencilLifecycle(page);

    const input = await getInput();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = error' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = error',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'success');
    await setProperty(host, 'message', 'Some success message.');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = success' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = success',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'none');
    await setProperty(host, 'message', '');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = none' });
  });

  it('should expose correct accessibility tree when password visibility button is clicked', async () => {
    await initTextField({ type: 'password', hasLabel: true });
    const button = await getToggleOrClearButton();

    await expectA11yToMatchSnapshot(page, button, { message: 'Initially' });

    await button.click();
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Pressed' });

    await button.click();
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Pressed again' });
  });
});
