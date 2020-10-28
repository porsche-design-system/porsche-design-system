import {
  addEventListener,
  getAttribute,
  getBrowser,
  getCssClasses,
  getElementStyle,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';

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

  describe('hover state', () => {
    it('should change box-shadow color when fake input is hovered', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-text-field-wrapper label="Some label">
          <input type="text" name="some-name">
        </p-text-field-wrapper>
      `
      );

      const fakeInput = await getTextFieldFakeInput();
      const initialBoxShadow = await getElementStyle(fakeInput, 'boxShadow');

      await fakeInput.hover();
      await waitForStencilLifecycle(page);

      expect(await getElementStyle(fakeInput, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake input when label text is hovered', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-text-field-wrapper label="Some label">
          <input type="text" name="some-name">
        </p-text-field-wrapper>`
      );

      const fakeInput = await getTextFieldFakeInput();
      const labelText = await getTextFieldLabel();
      const initialBoxShadow = await getElementStyle(fakeInput, 'boxShadow');

      await labelText.hover();
      await waitForStencilLifecycle(page);

      expect(await getElementStyle(fakeInput, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });

    it('should change color of slotted <a> when it is hovered', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-text-field-wrapper state="error">
          <span slot="label">Some label with a <a href="#">link</a>.</span>
          <span slot="description">Some description with a <a href="#">link</a>.</span>
          <input type="text" name="some-name">
          <span slot="message">Some message with a <a href="#">link</a>.</span>
        </p-text-field-wrapper>`
      );

      const labelLink = await getTextFieldLabelLink();
      const labelLinkColorInitial = await getElementStyle(labelLink, 'color');
      const descriptionLink = await getTextFieldDescriptionLink();
      const descriptionLinkColorInitial = await getElementStyle(descriptionLink, 'color');
      const messageLink = await getTextFieldMessageLink();
      const messageLinkColorInitial = await getElementStyle(messageLink, 'color');

      await labelLink.hover();
      await waitForStencilLifecycle(page);
      const labelLinkColorOnHover = await getElementStyle(labelLink, 'color', { waitForTransition: true });

      expect(labelLinkColorOnHover).not.toBe(labelLinkColorInitial);

      await descriptionLink.hover();
      await waitForStencilLifecycle(page);
      const descriptionLinkColorOnHover = await getElementStyle(descriptionLink, 'color', { waitForTransition: true });

      expect(descriptionLinkColorOnHover).not.toBe(descriptionLinkColorInitial);

      await messageLink.hover();
      await waitForStencilLifecycle(page);
      const messageLinkColorOnHover = await getElementStyle(messageLink, 'color', { waitForTransition: true });

      expect(messageLinkColorOnHover).not.toBe(messageLinkColorInitial);
    });
  });

  describe('focus state', () => {
    it('should show outline of slotted <a> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-text-field-wrapper state="error">
          <span slot="label">Some label with a <a href="#">link</a>.</span>
          <span slot="description">Some description with a <a href="#">link</a>.</span>
          <input type="text" name="some-name">
          <span slot="message">Some message with a <a href="#">link</a>.</span>
        </p-text-field-wrapper>`
      );

      const labelLink = await getTextFieldLabelLink();
      const labelLinkOutlineInitial = await getElementStyle(labelLink, 'outline');
      const descriptionLink = await getTextFieldDescriptionLink();
      const descriptionLinkOutlineInitial = await getElementStyle(descriptionLink, 'outline');
      const messageLink = await getTextFieldMessageLink();
      const messageLinkOutlineInitial = await getElementStyle(messageLink, 'outline');

      await labelLink.focus();
      await waitForStencilLifecycle(page);
      const labelLinkOutlineOnFocus = await getElementStyle(labelLink, 'outline', { waitForTransition: true });

      expect(labelLinkOutlineOnFocus).not.toBe(labelLinkOutlineInitial);

      await descriptionLink.focus();
      await waitForStencilLifecycle(page);
      const descriptionLinkOutlineOnFocus = await getElementStyle(descriptionLink, 'color', { waitForTransition: true });

      expect(descriptionLinkOutlineOnFocus).not.toBe(descriptionLinkOutlineInitial);

      await messageLink.focus();
      await waitForStencilLifecycle(page);
      const messageLinkOutlineOnFocus = await getElementStyle(messageLink, 'color', { waitForTransition: true });

      expect(messageLinkOutlineOnFocus).not.toBe(messageLinkOutlineInitial);
    });
  });
});
