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
  getOutlineStyle
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

  const getTextFieldHost = () => selectNode(page, 'p-text-field-wrapper');
  const getTextFieldFakeInput = () =>
    selectNode(page, 'p-text-field-wrapper >>> .p-text-field-wrapper__fake-input');
  const getTextFieldRealInput = () => selectNode(page, 'p-text-field-wrapper input');
  const getTextFieldMessage = () =>
    selectNode(page, 'p-text-field-wrapper >>> .p-text-field-wrapper__message');
  const getTextFieldLabelLink = () =>
    selectNode(page, 'p-text-field-wrapper [slot="label"] a');
  const getTextFieldDescriptionLink = () =>
    selectNode(page, 'p-text-field-wrapper [slot="description"] a');
  const getTextFieldMessageLink = () =>
    selectNode(page, 'p-text-field-wrapper [slot="message"] a');
  const getTextFieldLabel = () =>
    selectNode(page, 'p-text-field-wrapper >>> .p-text-field-wrapper__label-text');
  const getTextFieldButton = () =>
    selectNode(page, 'p-text-field-wrapper >>> button.p-text-field-wrapper__button');
  const getTextFieldIcon = () => selectNode(page, 'p-text-field-wrapper >>> p-icon');

  const getIconName = async (): Promise<unknown> => getProperty(await getTextFieldIcon(), 'name');

  const initTextField = ({ useSlottedLabel, useSlottedDescription, useSlottedMessage, state, type }: { useSlottedLabel?: boolean; useSlottedDescription?: boolean; useSlottedMessage?: boolean; state?: FormState; type?: 'text' | 'password'; } = { useSlottedLabel: false, useSlottedDescription: false, useSlottedMessage: false, state: 'none', type: 'text' }): Promise<void> => {
    return setContentWithDesignSystem(
      page,
      `
        <p-text-field-wrapper state="${state}">
          ${useSlottedLabel && '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'}
          ${useSlottedDescription && '<span slot="description">Some description with a <a href="#" onclick="return false;">link</a>.</span>'}
          <input type="${type}" />
          ${useSlottedMessage && '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'}
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

    const el = await getTextFieldLabel();
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `
    );

    const input = await getTextFieldRealInput();
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
    const input = await getTextFieldRealInput();
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
    const input = await getTextFieldRealInput();
    expect(await getProperty(input, 'ariaLabel')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-text-field-wrapper>
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>`
    );

    const textFieldComponent = await getTextFieldHost();

    expect(await getTextFieldLabel()).toBeNull();

    await textFieldComponent.evaluate((el) => el.setAttribute('label', 'Some label'));
    await waitForStencilLifecycle(page);

    expect(await getTextFieldLabel()).not.toBeNull();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>`
    );

    const textFieldComponent = await getTextFieldHost();
    const input = await getTextFieldRealInput();

    expect(await getTextFieldMessage()).toBeNull();

    await textFieldComponent.evaluate((el) => el.setAttribute('state', 'error'));
    await textFieldComponent.evaluate((el) => el.setAttribute('message', 'Some error message'));
    await waitForStencilLifecycle(page);

    expect(await getTextFieldMessage()).toBeDefined();
    expect(await getAttribute(await getTextFieldMessage(), 'role')).toEqual('alert');
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some error message');

    await textFieldComponent.evaluate((el) => el.setAttribute('state', 'success'));
    await textFieldComponent.evaluate((el) => el.setAttribute('message', 'Some success message'));
    await waitForStencilLifecycle(page);

    expect(await getTextFieldMessage()).toBeDefined();
    expect(await getAttribute(await getTextFieldMessage(), 'role')).toBeNull();
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label. Some success message');

    await textFieldComponent.evaluate((el) => el.setAttribute('state', 'null'));
    await textFieldComponent.evaluate((el) => el.setAttribute('message', ''));
    await waitForStencilLifecycle(page);

    expect(await getTextFieldMessage()).toBeNull();
    expect(await getProperty(input, 'ariaLabel')).toEqual('Some label');
  });

  it(`should focus input when label text is clicked`, async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `
    );

    const labelText = await getTextFieldLabel();
    const input = await getTextFieldRealInput();

    let inputFocusSpyCalls = 0;
    await addEventListener(input, 'focus', () => inputFocusSpyCalls++);

    expect(inputFocusSpyCalls).toBe(0);
    await labelText.click();
    await waitForStencilLifecycle(page);

    expect(inputFocusSpyCalls).toBe(1);
  });

  it('should disable fake input and toggle password button when input (type password) is set disabled programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>`
    );

    const input = await getTextFieldRealInput();

    expect(await getCssClasses(await getTextFieldFakeInput())).not.toContain(
      'p-text-field-wrapper__fake-input--disabled'
    );
    expect(await getProperty(await getTextFieldRealInput(), 'disabled')).toBe(false);

    await input.evaluate((el: HTMLInputElement) => (el.disabled = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(await getTextFieldFakeInput())).toContain('p-text-field-wrapper__fake-input--disabled');
    expect(await getProperty(await getTextFieldRealInput(), 'disabled')).toBe(true);

    await input.evaluate((el: HTMLInputElement) => (el.disabled = false));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(await getTextFieldFakeInput())).not.toContain(
      'p-text-field-wrapper__fake-input--disabled'
    );
    expect(await getProperty(await getTextFieldRealInput(), 'disabled')).toBe(false);
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

    const toggleButton = await getTextFieldButton();

    expect(await getIconName()).toBe('view');

    await toggleButton.click();
    await waitForStencilLifecycle(page);

    expect(await getIconName()).toBe('view-off');

    await toggleButton.click();
    await waitForStencilLifecycle(page);

    expect(await getIconName()).toBe('view');
  });

  it('should disable search button when input (type search) is set to disabled or readonly programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
       <p-text-field-wrapper label="Some label">
         <input type="search" name="some-name">
       </p-text-field-wrapper>
     `
    );

    const input = await getTextFieldRealInput();
    const fakeInput = await getTextFieldFakeInput();
    const button = await getTextFieldButton();

    expect(await getProperty(button, 'disabled')).toBe(false);

    await input.evaluate((el: HTMLInputElement) => (el.disabled = true));
    await waitForStencilLifecycle(page);

    expect(await getProperty(button, 'disabled')).toBe(true);

    await input.evaluate((el: HTMLInputElement) => (el.disabled = false));
    await waitForStencilLifecycle(page);

    expect(await getProperty(button, 'disabled')).toBe(false);

    await input.evaluate((el: HTMLInputElement) => (el.readOnly = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeInput)).toContain('p-text-field-wrapper__fake-input--readonly');
    expect(await getProperty(button, 'disabled')).toBe(true);

    await input.evaluate((el: HTMLInputElement) => (el.readOnly = false));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeInput)).not.toContain('p-text-field-wrapper__fake-input--readonly');
    expect(await getProperty(button, 'disabled')).toBe(false);
  });

  it(`should toggle password visibility and focus input correctly`, async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `
    );

    const button = await getTextFieldButton();
    const input = await getTextFieldRealInput();

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

  it(`submits outer forms on click on search button, if the input is search`, async () => {
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
    const searchButton = await getTextFieldButton();
    const form = await selectNode(page, 'form');

    let formFocusCalls = 0;
    await addEventListener(form, 'submit', () => formFocusCalls++);

    await searchButton.click();
    await waitForStencilLifecycle(page);

    expect(formFocusCalls).toBe(1);
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation and on click for slotted <input>', async () => {
      await initTextField();

      const input = await getTextFieldRealInput();
      const hidden = expectedStyleOnFocus({color: 'transparent', offset: '2px'});
      const visible = expectedStyleOnFocus({color: 'neutral', offset: '2px'});

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
      await initTextField({useSlottedLabel: true, useSlottedDescription: true, useSlottedMessage: true, state: 'error'});

      const labelLink = await getTextFieldLabelLink();
      const descriptionLink = await getTextFieldDescriptionLink();
      const messageLink = await getTextFieldMessageLink();
      const hidden = expectedStyleOnFocus({color: 'transparent'});
      const visible = expectedStyleOnFocus({color: 'hover'});

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

      const host = await getTextFieldHost();
      const input = await getTextFieldRealInput();

      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({color: 'neutral', offset: '2px'}));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({color: 'success', offset: '2px'}));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({color: 'error', offset: '2px'}));

      await setAttribute(input, 'readOnly', 'true');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(input)).toBe(expectedStyleOnFocus({color: 'transparent', offset: '2px'}));
    });

    it('should show outline of password toggle button when it is focused', async () => {
      await initTextField({type: 'password'});

      const host = await getTextFieldHost();
      const toggle = await getTextFieldButton();

      expect(await getStyleOnFocus(toggle)).toBe(expectedStyleOnFocus({offset: '-4px'}));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(toggle)).toBe(expectedStyleOnFocus({offset: '-5px'}));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(toggle)).toBe(expectedStyleOnFocus({offset: '-5px'}));
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initTextField({useSlottedLabel: true, useSlottedDescription: true, useSlottedMessage: true, state: 'error'});

      const host = await getTextFieldHost();
      const labelLink = await getTextFieldLabelLink();
      const descriptionLink = await getTextFieldDescriptionLink();
      const messageLink = await getTextFieldMessageLink();

      expect(await getStyleOnFocus(labelLink)).toBe(expectedStyleOnFocus());
      expect(await getStyleOnFocus(descriptionLink)).toBe(expectedStyleOnFocus({color: 'neutral'}));
      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({color: 'error'}));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);

      expect(await getStyleOnFocus(messageLink)).toBe(expectedStyleOnFocus({color: 'success'}));
    });
  });
});
