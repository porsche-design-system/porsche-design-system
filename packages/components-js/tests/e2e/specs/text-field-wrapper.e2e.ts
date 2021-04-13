import {
  addEventListener,
  getAttribute,
  getBrowser,
  getCssClasses,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
  setAttribute,
  getStyleOnFocus,
  waitForInheritedCSSTransition,
  expectedStyleOnFocus,
  getOutlineStyle,
  getLifecycleStatus,
  getElementStyle,
  reattachElement,
  setProperty,
} from '../helpers';
import { Page } from 'puppeteer';
import { FormState } from '@porsche-design-system/components/src/types';

describe('text-field-wrapper', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-text-field-wrapper');
  const getFakeInput = () => selectNode(page, 'p-text-field-wrapper >>> .p-text-field-wrapper__fake-input');
  const getInput = () => selectNode(page, 'p-text-field-wrapper input');
  const getMessage = () => selectNode(page, 'p-text-field-wrapper >>> .p-text-field-wrapper__message');
  const getLabelLink = () => selectNode(page, 'p-text-field-wrapper [slot="label"] a');
  const getDescriptionLink = () => selectNode(page, 'p-text-field-wrapper [slot="description"] a');
  const getMessageLink = () => selectNode(page, 'p-text-field-wrapper [slot="message"] a');
  const getLabel = () => selectNode(page, 'p-text-field-wrapper >>> .p-text-field-wrapper__label-text');
  const getButton = () => selectNode(page, 'p-text-field-wrapper >>> button.p-text-field-wrapper__button');
  const getIcon = () => selectNode(page, 'p-text-field-wrapper >>> p-icon');

  const getIconName = async (): Promise<unknown> => getProperty(await getIcon(), 'name');

  const fakeInputDisabledClass = 'p-text-field-wrapper__fake-input--disabled';
  const fakeInputReadOnlyClass = 'p-text-field-wrapper__fake-input--readonly';

  type InitOptions = {
    useSlottedLabel?: boolean;
    useSlottedDescription?: boolean;
    useSlottedMessage?: boolean;
    state?: FormState;
    type?: 'text' | 'password';
  };

  const initTextField = (opts?: InitOptions): Promise<void> => {
    const {
      useSlottedLabel = false,
      useSlottedDescription = false,
      useSlottedMessage = false,
      state = 'none',
      type = 'text',
    } = opts ?? {};

    const slottedLabel = useSlottedLabel
      ? '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'
      : '';
    const slottedDescription = useSlottedDescription
      ? '<span slot="description">Some description with a <a href="#" onclick="return false;">link</a>.</span>'
      : '';
    const slottedMessage = useSlottedMessage
      ? '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'
      : '';

    return setContentWithDesignSystem(
      page,
      `
        <p-text-field-wrapper state="${state}">
          ${slottedLabel}
          ${slottedDescription}
          <input type="${type}" />
          ${slottedMessage}
        </p-text-field-wrapper>`
    );
  };

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>`
    );

    const el = await getLabel();
    expect(el).toBeDefined();
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-text-field-wrapper>
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>`
    );

    const textFieldComponent = await getHost();

    expect(await getLabel()).toBeNull();

    await textFieldComponent.evaluate((el) => el.setAttribute('label', 'Some label'));
    await waitForStencilLifecycle(page);

    expect(await getLabel()).not.toBeNull();
  });

  describe('accessibility', () => {
    it('should add aria-label to support screen readers properly', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `
      );

      const input = await getInput();
      expect(await getProperty(input, 'ariaLabel')).toBe('Some label');
    });

    it('should add aria-label with description text to support screen readers properly', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-text-field-wrapper label="Some label" description="Some description">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `
      );
      const input = await getInput();
      expect(await getProperty(input, 'ariaLabel')).toBe('Some label. Some description');
    });

    it('should add aria-label with message text to support screen readers properly', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-text-field-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `
      );
      const input = await getInput();
      expect(await getProperty(input, 'ariaLabel')).toBe('Some label. Some error message');
    });

    it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>`
      );

      const textFieldComponent = await getHost();
      const input = await getInput();

      expect(await getMessage()).toBeNull('initially');

      await textFieldComponent.evaluate((el) => {
        el.setAttribute('state', 'error');
        el.setAttribute('message', 'Some error message');
      });
      await waitForStencilLifecycle(page);

      expect(await getMessage()).toBeDefined('when state = error');
      expect(await getAttribute(await getMessage(), 'role')).toEqual('alert', 'when state = error');
      expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some error message', 'when state = error');

      await textFieldComponent.evaluate((el) => {
        el.setAttribute('state', 'success');
        el.setAttribute('message', 'Some success message');
      });
      await waitForStencilLifecycle(page);

      expect(await getMessage()).toBeDefined('when state = success');
      expect(await getAttribute(await getMessage(), 'role')).toBeNull('when state = success');
      expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some success message', 'when state = success');

      await textFieldComponent.evaluate((el) => {
        el.setAttribute('state', 'none');
        el.setAttribute('message', '');
      });
      await waitForStencilLifecycle(page);

      expect(await getMessage()).toBeNull('when state = none');
      expect(await getProperty(input, 'ariaLabel')).toEqual('Some label', 'when state = none');
    });
  });

  describe('input type password', () => {
    it('should disable fake input and toggle password button when input (type password) is set disabled programmatically', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>`
      );

      const input = await getInput();

      expect(await getCssClasses(await getFakeInput())).not.toContain(fakeInputDisabledClass);
      expect(await getProperty(await getInput(), 'disabled')).toBe(false);

      await setProperty(input, 'disabled', true);
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(await getFakeInput())).toContain(fakeInputDisabledClass);
      expect(await getProperty(await getInput(), 'disabled')).toBe(true);

      await setProperty(input, 'disabled', false);
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(await getFakeInput())).not.toContain(fakeInputDisabledClass);
      expect(await getProperty(await getInput(), 'disabled')).toBe(false);
    });

    it('should toggle icon when password visibility button is clicked', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `
      );

      const toggleButton = await getButton();

      expect(await getIconName()).toBe('view');

      await toggleButton.click();
      await waitForStencilLifecycle(page);

      expect(await getIconName()).toBe('view-off');

      await toggleButton.click();
      await waitForStencilLifecycle(page);

      expect(await getIconName()).toBe('view');
    });

    it('should have padding-right for input type password', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `
      );

      const input = await getInput();
      const toggleButton = await getButton();

      expect(await getElementStyle(input, 'paddingRight')).toBe('48px');

      await toggleButton.click();
      await waitForStencilLifecycle(page);

      expect(await getElementStyle(input, 'paddingRight')).toBe('48px');
    });

    it('should toggle password visibility and focus input correctly', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `
      );

      const button = await getButton();
      const input = await getInput();

      let inputFocusCalls = 0;
      await addEventListener(input, 'focus', () => inputFocusCalls++);

      expect(await getProperty(input, 'type')).toBe('password');
      expect(inputFocusCalls).toBe(0);

      await button.click();
      await waitForStencilLifecycle(page);

      expect(await getProperty(input, 'type')).toBe('text');
      expect(inputFocusCalls).toBe(1);

      await button.click();
      await waitForStencilLifecycle(page);

      expect(await getProperty(input, 'type')).toBe('password');
      expect(inputFocusCalls).toBe(2);
    });
  });

  describe('input type search', () => {
    it('should disable search button when input (type search) is set to disabled or readonly programmatically', async () => {
      await setContentWithDesignSystem(
        page,
        `
       <p-text-field-wrapper label="Some label">
         <input type="search" name="some-name">
       </p-text-field-wrapper>
     `
      );

      const fakeInputReadOnlyClass = 'p-text-field-wrapper__fake-input--readonly';
      const input = await getInput();
      const fakeInput = await getFakeInput();
      const button = await getButton();
      const isButtonDisabled = () => getProperty(button, 'disabled');

      expect(await isButtonDisabled()).toBe(false);

      await setProperty(input, 'disabled', true);
      await waitForStencilLifecycle(page);

      expect(await isButtonDisabled()).toBe(true);

      await setProperty(input, 'disabled', false);
      await waitForStencilLifecycle(page);

      expect(await isButtonDisabled()).toBe(false);

      await setProperty(input, 'readOnly', true);
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeInput)).toContain(fakeInputReadOnlyClass);
      expect(await isButtonDisabled()).toBe(true);

      await setProperty(input, 'readOnly', false);
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeInput)).not.toContain(fakeInputReadOnlyClass);
      expect(await isButtonDisabled()).toBe(false);
    });

    it('submits outer forms on click on search button, if the input is search', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <form onsubmit="return false;">
        <p-text-field-wrapper label="Some label">
          <input type="search" name="some-name">
        </p-text-field-wrapper>
      </form>
    `
      );
      const searchButton = await getButton();
      const form = await selectNode(page, 'form');

      let formFocusCalls = 0;
      await addEventListener(form, 'submit', () => formFocusCalls++);

      await searchButton.click();
      await waitForStencilLifecycle(page);

      expect(formFocusCalls).toBe(1);
    });

    it('should have padding-right for input type search', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-text-field-wrapper label="Some label">
        <input type="search" name="some-name">
      </p-text-field-wrapper>
    `
      );

      const input = await getInput();

      expect(await getElementStyle(input, 'paddingRight')).toBe('48px');
    });
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation and on click for slotted <input>', async () => {
      await initTextField();

      const input = await getInput();
      const hidden = expectedStyleOnFocus({ color: 'transparent' });
      const visible = expectedStyleOnFocus({ color: 'neutral' });

      expect(await getOutlineStyle(input)).toBe(hidden);

      await input.click();

      expect(await getOutlineStyle(input)).toBe(visible);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(input)).toBe(visible);
    });

    it('should be shown by keyboard navigation only for slotted <a>', async () => {
      await initTextField({
        useSlottedLabel: true,
        useSlottedDescription: true,
        useSlottedMessage: true,
        state: 'error',
      });

      const labelLink = await getLabelLink();
      const descriptionLink = await getDescriptionLink();
      const messageLink = await getMessageLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'hover', offset: '1px' });

      expect(await getOutlineStyle(labelLink)).toBe(hidden);
      expect(await getOutlineStyle(descriptionLink)).toBe(hidden);
      expect(await getOutlineStyle(messageLink)).toBe(hidden);

      await labelLink.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(labelLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');

      expect(await getOutlineStyle(labelLink)).toBe(visible);

      await descriptionLink.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(descriptionLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');

      expect(await getOutlineStyle(descriptionLink)).toBe(visible);

      await messageLink.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(messageLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(messageLink)).toBe(visible);
    });

    it('should show outline of slotted <input> when it is focused', async () => {
      await initTextField();

      const host = await getHost();
      const input = await getInput();

      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'neutral' }));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'success' }));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'error' }));

      await setAttribute(input, 'readonly', 'true');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({ color: 'transparent' }));
    });

    it('should show outline of password toggle button when it is focused', async () => {
      await initTextField({ type: 'password' });

      const host = await getHost();
      const toggle = await getButton();

      expect(await getStyleOnFocus(toggle)).toBe(expectedStyleOnFocus({ offset: '-4px' }));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(toggle)).toBe(expectedStyleOnFocus({ offset: '-5px' }));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(toggle)).toBe(expectedStyleOnFocus({ offset: '-5px' }));
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initTextField({
        useSlottedLabel: true,
        useSlottedDescription: true,
        useSlottedMessage: true,
        state: 'error',
      });

      const host = await getHost();
      const labelLink = await getLabelLink();
      const descriptionLink = await getDescriptionLink();
      const messageLink = await getMessageLink();

      expect(await getStyleOnFocus(labelLink)).toBe(expectedStyleOnFocus({ offset: '1px' }));
      expect(await getStyleOnFocus(descriptionLink)).toBe(expectedStyleOnFocus({ color: 'neutral', offset: '1px' }));
      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({ color: 'error', offset: '1px' }));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);

      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({ color: 'success', offset: '1px' }));
    });

    it('should focus input when label text is clicked', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `
      );

      const labelText = await getLabel();
      const input = await getInput();

      let inputFocusSpyCalls = 0;
      await addEventListener(input, 'focus', () => inputFocusSpyCalls++);

      expect(inputFocusSpyCalls).toBe(0);
      await labelText.click();
      await waitForStencilLifecycle(page);

      expect(inputFocusSpyCalls).toBe(1);
    });
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

      expect(status.componentDidLoad['p-text-field-wrapper']).toBe(1, 'componentDidLoad: p-text-field-wrapper');
      expect(status.componentDidLoad['p-text']).toBe(3, 'componentDidLoad: p-text');
      expect(status.componentDidLoad['p-icon']).toBe(1, 'componentDidLoad: p-icon');

      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
      expect(status.componentDidLoad.all).toBe(5, 'componentDidLoad: all');
    });

    it('should work without unnecessary round trips after prop change', async () => {
      await initTextField();
      const host = await getHost();

      await setAttribute(host, 'label', 'Some Label');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-text']).toBe(1, 'componentDidLoad: p-text');

      expect(status.componentDidUpdate['p-text-field-wrapper']).toBe(1, 'componentDidUpdate: p-text-field-wrapper');
      expect(status.componentDidUpdate['p-text']).toBe(0, 'componentDidUpdate: p-text');

      expect(status.componentDidUpdate.all).toBe(1, 'componentDidUpdate: all');
      expect(status.componentDidLoad.all).toBe(2, 'componentDidLoad: all');
    });
  });

  describe('MutationObserver', () => {
    it('should trigger disabled class change if component is reattached to dom', async () => {
      await initTextField();
      const input = await getInput();
      const fakeInput = await getFakeInput();

      expect(await getCssClasses(fakeInput)).not.toContain(fakeInputDisabledClass);

      await reattachElement(page, 'p-text-field-wrapper');
      await setProperty(input, 'disabled', true);
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeInput)).toContain(fakeInputDisabledClass);
    });

    it('should trigger readonly class change if component is reattached to dom', async () => {
      await initTextField();
      const input = await getInput();
      const fakeInput = await getFakeInput();

      expect(await getCssClasses(fakeInput)).not.toContain(fakeInputReadOnlyClass);

      await reattachElement(page, 'p-text-field-wrapper');
      await setProperty(input, 'readOnly', true);
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeInput)).toContain(fakeInputReadOnlyClass);
    });
  });
});
