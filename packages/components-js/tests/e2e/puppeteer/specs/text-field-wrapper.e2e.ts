import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getElementInnerText,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  setProperty,
  waitForImproveButtonHandlingForCustomElement,
  waitForStencilLifecycle,
} from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';
import type { FormState } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-text-field-wrapper');
const getInput = () => selectNode(page, 'input');
const getLabel = () => selectNode(page, 'p-text-field-wrapper >>> label');
const getCounterOrUnit = () => selectNode(page, 'p-text-field-wrapper >>> .unit');
const getToggleOrClearButtonHost = () => selectNode(page, 'p-text-field-wrapper >>> p-button-pure');
const getToggleOrClearButton = () => selectNode(page, 'p-text-field-wrapper >>> p-button-pure >>> button');
const getLocateActionButton = () =>
  selectNode(page, 'p-text-field-wrapper >>> p-button-pure + p-button-pure >>> button');
const getSubmitButtonHost = () => selectNode(page, 'p-text-field-wrapper >>> p-button-pure');
const getSubmitButton = () => selectNode(page, 'p-text-field-wrapper >>> p-button-pure >>> button');
const getMessage = () => selectNode(page, 'p-text-field-wrapper >>> .message');
const getIconName = (icon: ElementHandle) => getProperty(icon, 'icon');

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

describe('input type="password"', () => {
  xit('should disable input when input is disabled programmatically', async () => {
    await initTextField({ type: 'password', hasLabel: true });
    const input = await getInput();

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

  it('should toggle icon when password visibility button is clicked', async () => {
    await initTextField({ type: 'password', hasLabel: true });
    const button = await getToggleOrClearButton();
    const buttonHost = await getToggleOrClearButtonHost();

    expect(await getIconName(buttonHost)).toBe('view');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getIconName(buttonHost)).toBe('view-off');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getIconName(buttonHost)).toBe('view');
  });

  it('should toggle password visibility and focus input correctly', async () => {
    await initTextField({ type: 'password', hasLabel: true });
    const button = await getToggleOrClearButton();
    const input = await getInput();

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

describe('input type="search"', () => {
  // verify wrapped input type="search" behaves the same as without in regards to clearing it and emitting events
  describe('events', () => {
    it('should emit input events for input without text-field-wrapper', async () => {
      await setContentWithDesignSystem(page, '<input type="search" style="width: 100px; height: 50px">');
      const input = await getInput();

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

    it('should emit input events for input with text-field-wrapper', async () => {
      await initTextField({ type: 'search' });
      const input = await getInput();

      await addEventListener(input, 'input');
      await input.focus();

      await setProperty(input, 'value', 'value');
      await page.keyboard.press('Escape');
      expect(await getProperty(input, 'value')).toBe('');
      expect((await getEventSummary(input, 'input')).counter).toBe(1);

      await page.keyboard.press('Escape');
      expect((await getEventSummary(input, 'input')).counter).toBe(1);

      await setProperty(input, 'value', 'value');
      const button = await getToggleOrClearButton();
      await button.click();
      expect(await getProperty(input, 'value')).toBe('');
      expect((await getEventSummary(input, 'input')).counter).toBe(2);
    });

    it('should emit action event when action button is clicked', async () => {
      await initTextField({ type: 'search', hasLocateAction: true });
      const host = await getHost();
      const button = await getLocateActionButton();

      await addEventListener(host, 'action');

      await button.click();
      expect((await getEventSummary(host, 'action')).counter).toBe(1);
    });
  });

  describe('clear functionality', () => {
    const isClearButtonVisible = async (): Promise<boolean> => {
      const clearButton = await getToggleOrClearButtonHost();
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

  describe('within form', () => {
    const isButtonDisabled = (handle: ElementHandle) => getProperty(handle, 'disabled');

    it('should disable submit button when input is set to disabled programmatically', async () => {
      await initTextField({ type: 'search', isWrappedInForm: true });
      const input = await getInput();
      const buttonHost = await getSubmitButtonHost();

      expect(await isButtonDisabled(buttonHost)).toBe(false);

      await setProperty(input, 'disabled', true);
      await waitForStencilLifecycle(page);

      expect(await isButtonDisabled(buttonHost)).toBe(true);

      await setProperty(input, 'disabled', false);
      await waitForStencilLifecycle(page);

      expect(await isButtonDisabled(buttonHost)).toBe(false);
    });

    it('should disable submit button when input is set to readonly programmatically', async () => {
      await initTextField({ type: 'search', isWrappedInForm: true });
      const input = await getInput();
      const buttonHost = await getSubmitButtonHost();

      expect(await isButtonDisabled(buttonHost)).toBe(false);

      await setProperty(input, 'readOnly', true);
      await waitForStencilLifecycle(page);

      expect(await isButtonDisabled(buttonHost)).toBe(true);

      await setProperty(input, 'readOnly', false);
      await waitForStencilLifecycle(page);

      expect(await isButtonDisabled(buttonHost)).toBe(false);
    });

    it('should submit parent form on search button click', async () => {
      await initTextField({ type: 'search', isWrappedInForm: true });
      const searchButton = await getSubmitButton();

      const form = await selectNode(page, 'form');
      await addEventListener(form, 'submit');

      await searchButton.click();
      await waitForImproveButtonHandlingForCustomElement(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
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

    await addEventListener(input, 'focus');
    expect((await getEventSummary(input, 'focus')).counter).toBe(0);

    await label.click();
    expect((await getEventSummary(input, 'focus')).counter).toBe(1);
  });

  it('should focus input when unit element is clicked', async () => {
    await initTextField({ type: 'number', hasUnit: true });
    const unitElement = await getCounterOrUnit();
    const input = await getInput();

    await addEventListener(input, 'focus');
    expect((await getEventSummary(input, 'focus')).counter).toBe(0);

    await unitElement.click();
    expect((await getEventSummary(input, 'focus')).counter).toBe(1);
  });

  it('should focus input when counter text is clicked', async () => {
    await initTextField({ maxLength: 20 });
    const counter = await getCounterOrUnit();
    const input = await getInput();

    await addEventListener(input, 'focus');
    expect((await getEventSummary(input, 'focus')).counter).toBe(0);

    await counter.click();
    expect((await getEventSummary(input, 'focus')).counter).toBe(1);
  });
});

// puppeteer ignores @media(hover: hover) styles, but playwright can handle it
xdescribe('hover state', () => {
  const getBorderColor = (element: ElementHandle) => getElementStyle(element, 'borderColor');
  const defaultBorderColor = 'rgb(107, 109, 112)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  it('should show hover state on input when label is hovered', async () => {
    await initTextField({ hasLabel: true });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = await getLabel();
    const input = await getInput();

    expect(await getBorderColor(input)).toBe(defaultBorderColor);

    await input.hover();
    expect(await getBorderColor(input)).toBe(hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    expect(await getBorderColor(input)).toBe(defaultBorderColor);

    await label.hover();
    expect(await getBorderColor(input)).toBe(hoverBorderColor);
  });

  it('should show hover state on input when unit/counter is hovered', async () => {
    await initTextField({ maxLength: 20 });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const counter = await getCounterOrUnit();
    const input = await getInput();

    expect(await getBorderColor(input)).toBe(defaultBorderColor);

    await input.hover();
    expect(await getBorderColor(input)).toBe(hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    expect(await getBorderColor(input)).toBe(defaultBorderColor);

    await counter.hover();
    expect(await getBorderColor(input)).toBe(hoverBorderColor);
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
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
  });

  it('should work without unnecessary round trips after prop change', async () => {
    await initTextField();
    const host = await getHost();

    await setProperty(host, 'label', 'Some Label');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-text-field-wrapper'], 'componentDidUpdate: p-text-field-wrapper').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
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

  it('should expose correct accessibility tree for input type=search with value', async () => {
    await initTextField({ type: 'search', hasLabel: true });
    const host = await getHost();
    const input = await getInput();

    await setProperty(input, 'value', 'value');
    await waitForStencilLifecycle(page);

    const button = await getToggleOrClearButton();
    await expectA11yToMatchSnapshot(page, host, { interestingOnly: false });
  });
});
