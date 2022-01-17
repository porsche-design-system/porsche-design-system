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
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('text-field-wrapper', () => {
  let page: Page;
  const CSS_TRANSITION_DURATION = 240;

  beforeEach(async () => {
    page = await browser.newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-text-field-wrapper');
  const getInput = () => selectNode(page, 'p-text-field-wrapper input');
  const getLabelLink = () => selectNode(page, 'p-text-field-wrapper [slot="label"] a');
  const getDescriptionLink = () => selectNode(page, 'p-text-field-wrapper [slot="description"] a');
  const getMessageLink = () => selectNode(page, 'p-text-field-wrapper [slot="message"] a');
  const getLabel = () => selectNode(page, 'p-text-field-wrapper >>> .label__text');
  const getCounterOrUnit = () => selectNode(page, 'p-text-field-wrapper >>> .unit');
  const getButton = () => selectNode(page, 'p-text-field-wrapper >>> button');
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
    } = opts ?? {};

    const link = '<a href="#" onclick="return false;">link</a>';
    const slottedLabel = useSlottedLabel ? `<span slot="label">Label with a ${link}</span>` : '';
    const slottedDescription = useSlottedDescription
      ? `<span slot="description">Description with a ${link}</span>`
      : '';
    const slottedMessage = useSlottedMessage ? `<span slot="message">Message with a ${link}</span>` : '';

    const attrs = [`state="${state}"`, hasLabel && 'label="Some label"', hasUnit && 'unit="km/h"']
      .filter((x) => x)
      .join(' ');

    return setContentWithDesignSystem(
      page,
      `
      <p-text-field-wrapper ${attrs}>
        ${slottedLabel}
        ${slottedDescription}
        <input type="${type}"${maxLength ? ` maxlength="${maxLength}"` : ''} />
        ${slottedMessage}
      </p-text-field-wrapper>`
    );
  };

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await initTextField();
    const textFieldComponent = await getHost();
    expect(await getLabel()).toBeNull();

    await setProperty(textFieldComponent, 'label', 'Some label');
    await waitForStencilLifecycle(page);
    expect(await getLabel()).not.toBeNull();
  });

  describe('input type password', () => {
    it('should disable input and toggle password button when input is disabled programmatically', async () => {
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
      const toggleButton = await getButton();

      const icon = await getIcon();
      expect(await getIconName(icon)).toBe('view');

      await toggleButton.click();
      await waitForStencilLifecycle(page);

      expect(await getIconName(icon)).toBe('view-off');

      await toggleButton.click();
      await waitForStencilLifecycle(page);

      expect(await getIconName(icon)).toBe('view');
    });

    it('should have padding-right', async () => {
      await initTextField({ type: 'password', hasLabel: true });
      const input = await getInput();
      const toggleButton = await getButton();

      expect(await getElementStyle(input, 'paddingRight'), 'initially').toBe('48px');

      await toggleButton.click();
      await waitForStencilLifecycle(page);

      expect(await getElementStyle(input, 'paddingRight'), 'after toggleButton click').toBe('48px');
    });

    it('should toggle password visibility and focus input correctly', async () => {
      await initTextField({ type: 'password', hasLabel: true });
      const button = await getButton();
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

  describe('input type search', () => {
    it('should disable search button when input is set to disabled programmatically', async () => {
      await initTextField({ type: 'search', hasLabel: true });
      const input = await getInput();
      const button = await getButton();

      const initialCursor = await getElementStyle(input, 'cursor');
      const initialBorderColor = await getElementStyle(input, 'borderColor');

      const isButtonDisabled = () => getProperty(button, 'disabled');

      await setProperty(input, 'disabled', true);
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      expect(await getElementStyle(input, 'cursor'), 'disabled cursor').not.toBe(initialCursor);
      expect(await getElementStyle(input, 'borderColor'), 'disabled borderColor').not.toBe(initialBorderColor);
      expect(await isButtonDisabled()).toBe(true);

      await setProperty(input, 'disabled', false);
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      expect(await getElementStyle(input, 'cursor'), 'not disabled cursor').toBe(initialCursor);
      expect(await getElementStyle(input, 'borderColor'), 'not disabled borderColor').toBe(initialBorderColor);
      expect(await isButtonDisabled()).toBe(false);
    });

    it('should disable search button when input is set to readonly programmatically', async () => {
      await initTextField({ type: 'search', hasLabel: true });
      const input = await getInput();
      const button = await getButton();

      const initialColor = await getElementStyle(input, 'color');
      const initialBorderColor = await getElementStyle(input, 'borderColor');
      const initialBackgroundColor = await getElementStyle(input, 'backgroundColor');

      const isButtonDisabled = () => getProperty(button, 'disabled');

      await setProperty(input, 'readOnly', true);
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      expect(await getElementStyle(input, 'color'), 'readonly color').not.toBe(initialColor);
      expect(await getElementStyle(input, 'borderColor'), 'readonly border').not.toBe(initialBorderColor);
      expect(await getElementStyle(input, 'backgroundColor'), 'readonly backgroundColor').not.toBe(
        initialBackgroundColor
      );
      expect(await isButtonDisabled()).toBe(true);

      await setProperty(input, 'readOnly', false);
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      expect(await getElementStyle(input, 'color'), 'not readonly color').toBe(initialColor);
      expect(await getElementStyle(input, 'borderColor'), 'not readonly border').toBe(initialBorderColor);
      expect(await getElementStyle(input, 'backgroundColor'), 'not readonly backgroundColor').toBe(
        initialBackgroundColor
      );
      expect(await isButtonDisabled()).toBe(false);
    });

    it('should disable search button when input is set to disabled and readonly programmatically', async () => {
      await initTextField({ type: 'search', hasLabel: true });
      const input = await getInput();
      const button = await getButton();

      const isButtonDisabled = () => getProperty(button, 'disabled');

      await setProperty(input, 'disabled', true);
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      const disabledBorderColor = await getElementStyle(input, 'borderColor');
      const disabledBackgroundColor = await getElementStyle(input, 'backgroundColor');

      expect(await isButtonDisabled()).toBe(true);

      await setProperty(input, 'readOnly', true);
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      expect(await getElementStyle(input, 'borderColor'), 'readonly and disabled border').not.toBe(disabledBorderColor);
      expect(await getElementStyle(input, 'backgroundColor'), 'readonly and disabled backgroundColor').not.toBe(
        disabledBackgroundColor
      );
    });

    it('should submit parent form on search button click', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <form onsubmit="return false;">
          <p-text-field-wrapper label="Some label">
            <input type="search">
          </p-text-field-wrapper>
        </form>`
      );
      const searchButton = await getButton();
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

      expect(formFocusCalls).toBe(1);
    });

    it('should have padding-right', async () => {
      await initTextField({ type: 'search', hasLabel: true });
      const input = await getInput();
      expect(await getElementStyle(input, 'paddingRight')).toBe('48px');
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
      const toggleButton = await getButton();

      await expectA11yToMatchSnapshot(page, toggleButton, { message: 'Initially' });

      await toggleButton.click();
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, toggleButton, { message: 'Pressed' });

      await toggleButton.click();
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, toggleButton, { message: 'Pressed again' });
    });
  });
});
