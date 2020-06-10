import { Components } from '../../../src';
import PIcon = Components.PIcon;
import {
  addEventListener,
  getAttributeFromHandle, getBoxShadow,
  getClassFromHandle, getClassListFromHandle, initAddEventListener,
  selectNode,
  setContentWithDesignSystem, waitForEventCallbacks, waitForInnerHTMLChange, waitForSelector
} from '../helpers';
import { Page } from 'puppeteer';
import { getBrowser } from '../helpers/setup';

describe('Text Field Wrapper', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getCustomInputButtonDisabledState = () => page.evaluate(() => {
    const toggleButton: HTMLButtonElement = document.querySelector('p-text-field-wrapper').shadowRoot.querySelector('.p-text-field-wrapper__button');
    return toggleButton.disabled;
  });

  const getToggleButtonIconName = () => page.evaluate(() => {
    const icon: PIcon = document.querySelector('p-text-field-wrapper').shadowRoot.querySelector('p-icon');
    return icon.name;
  });

  it(`should toggle password visibility and focus input correctly`, async () => {
    await setContentWithDesignSystem(page, `
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `);

    const button = await selectNode(page, 'p-text-field-wrapper >>> button.p-text-field-wrapper__button');
    const input = await selectNode(page, 'input');

    let inputFocusCalls = 0;
    await addEventListener(input, 'focus', () => inputFocusCalls++);


    expect(await getAttributeFromHandle(input, 'type')).toBe('password');
    expect(inputFocusCalls).toBe(0);

    await button.click();

    expect(await getAttributeFromHandle(input, 'type')).toBe('text');
    expect(inputFocusCalls).toBe(1);

    await button.click();

    expect(await getAttributeFromHandle(input, 'type')).toBe('password');
    expect(inputFocusCalls).toBe(2);
  });

  it(`submits outer forms on click on search button, if the input is search`, async () => {
    await setContentWithDesignSystem(page, `
      <form onsubmit="return false;">
        <p-text-field-wrapper label="Some label">
          <input type="search" name="some-name">
        </p-text-field-wrapper>
      </form>
    `);
    const searchButton = await selectNode(page, 'p-text-field-wrapper >>> button');
    const form = await selectNode(page, 'form');

    let formFocusCalls = 0;
    await addEventListener(form, 'submit', () => formFocusCalls++);

    await searchButton.click();
    await waitForEventCallbacks(page);
    expect(formFocusCalls).toBe(1);
  });

  it('should render', async () => {
    await setContentWithDesignSystem(page,`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const el = await selectNode(page,'p-text-field-wrapper >>> label');
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(page,`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const input = await selectNode(page,'p-text-field-wrapper input');
    expect(await getAttributeFromHandle(input, 'aria-label')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(page,`
      <p-text-field-wrapper label="Some label" description="Some description">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const input = await selectNode(page,'p-text-field-wrapper input');
    expect(await getAttributeFromHandle(input, 'aria-label')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(page,`
      <p-text-field-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const input = await selectNode(page,'p-text-field-wrapper input');
    expect(await getAttributeFromHandle(input, 'aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(page,`
      <p-text-field-wrapper>
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>`);

    const textFieldComponent = await selectNode(page,'p-text-field-wrapper');
    const getLabelText = () => selectNode(page,'p-text-field-wrapper >>> .p-text-field-wrapper__label-text');

    expect(await getLabelText()).toBeNull();

    await textFieldComponent.evaluate(el => el.setAttribute('label', 'Some label'));
    await waitForEventCallbacks(page);

    expect(await getLabelText()).not.toBeNull();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(page,`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>`);

    const textFieldComponent = await selectNode(page,'p-text-field-wrapper');
    const getMessage = () => selectNode(page,'p-text-field-wrapper >>> .p-text-field-wrapper__message'); // has to be a function because it only exists after first setAttribute
    const input = await selectNode(page,'input');

    expect(await getMessage()).toBeNull();

    await textFieldComponent.evaluate(el => el.setAttribute('state', 'error'));
    await textFieldComponent.evaluate(el => el.setAttribute('message', 'Some error message'));
    await waitForInnerHTMLChange(page, textFieldComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toEqual('alert');
    expect(await getAttributeFromHandle(input, 'aria-label')).toEqual('Some label. Some error message');

    await textFieldComponent.evaluate(el => el.setAttribute('state', 'success'));
    await textFieldComponent.evaluate(el => el.setAttribute('message', 'Some success message'));
    await waitForInnerHTMLChange(page, textFieldComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toBeNull();
    expect(await getAttributeFromHandle(input, 'aria-label')).toEqual('Some label. Some success message');

    await textFieldComponent.evaluate(el => el.setAttribute('state', 'null'));
    await textFieldComponent.evaluate(el => el.setAttribute('message', ''));
    await waitForInnerHTMLChange(page, textFieldComponent);

    expect(await getMessage()).toBeNull();
    expect(await getAttributeFromHandle(input, 'aria-label')).toEqual('Some label');
  });

  it(`should focus input when label text is clicked`, async () => {
    await setContentWithDesignSystem(page, `
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);

    const labelText = await selectNode(page,'p-text-field-wrapper >>> p-text');
    const input = await selectNode(page,'input');

    let inputFocusSpyCalls = 0;
    await addEventListener(input, 'focus', () => inputFocusSpyCalls++);

    expect(inputFocusSpyCalls).toBe(0);
    await labelText.click();
    await waitForEventCallbacks(page);

    expect(inputFocusSpyCalls).toBe(1);
  });

  it('should disable fake input and toggle password button when input (type password) is set disabled programmatically', async () => {
    await setContentWithDesignSystem(page,`
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `);

    const fakeInput = await selectNode(page,'p-text-field-wrapper >>> .p-text-field-wrapper__fake-input');
    const input = await selectNode(page,'input');

    expect(await getClassListFromHandle(fakeInput)).not.toContain('p-text-field-wrapper__fake-input--disabled');
    expect(await getCustomInputButtonDisabledState()).toBe(false);

    await input.evaluate((el: HTMLInputElement) => el.disabled = true);
    await waitForSelector(page, fakeInput, 'p-text-field-wrapper__fake-input--disabled');

    expect(await getClassFromHandle(fakeInput)).toContain('p-text-field-wrapper__fake-input--disabled');
    expect(await getCustomInputButtonDisabledState()).toBe(true);

    await input.evaluate((el: HTMLInputElement) => el.disabled = false);
    await waitForSelector(page, fakeInput, 'p-text-field-wrapper__fake-input--disabled', {isGone: true});

    expect(await getClassFromHandle(fakeInput)).not.toContain('p-text-field-wrapper__fake-input--disabled');
    expect(await getCustomInputButtonDisabledState()).toBe(false);
  });

  it('should toggle icon when password visibility button is clicked', async () => {
    await setContentWithDesignSystem(page, `
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `);

    const buttonIcon = await selectNode(page,'p-text-field-wrapper >>> p-icon >>> i');
    const toggleButton = await selectNode(page,'p-text-field-wrapper >>> .p-text-field-wrapper__button');

    expect(await getToggleButtonIconName()).toBe('view');

    await toggleButton.click();
    await waitForInnerHTMLChange(page, buttonIcon);

    expect(await getToggleButtonIconName()).toBe('view-off');

    await toggleButton.click();
    await waitForInnerHTMLChange(page, buttonIcon);

    expect(await getToggleButtonIconName()).toBe('view');
  });

  it('should disable search button when input (type search) is set to disabled or readonly programmatically', async () => {
    await setContentWithDesignSystem(page, `
      <p-text-field-wrapper label="Some label">
        <input type="search" name="some-name">
      </p-text-field-wrapper>
    `);

    const fakeInput = await selectNode(page, 'p-text-field-wrapper >>> .p-text-field-wrapper__fake-input');
    const input = await selectNode(page,'input');

    expect(await getCustomInputButtonDisabledState()).toBe(false);

    await input.evaluate((el: HTMLInputElement) => el.disabled = true);
    await waitForSelector(page, fakeInput, 'p-text-field-wrapper__fake-input--disabled');

    expect(await getCustomInputButtonDisabledState()).toBe(true);

    await input.evaluate((el: HTMLInputElement) => el.disabled = false);
    await waitForSelector(page, fakeInput, 'p-text-field-wrapper__fake-input--disabled', {isGone: true});

    expect(await getCustomInputButtonDisabledState()).toBe(false);

    await input.evaluate((el: HTMLInputElement) => el.readOnly = true);
    await waitForSelector(page, fakeInput, 'p-text-field-wrapper__fake-input--readonly');

    expect(await getClassFromHandle(fakeInput)).toContain('p-text-field-wrapper__fake-input--readonly');
    expect(await getCustomInputButtonDisabledState()).toBe(true);

    await input.evaluate((el: HTMLInputElement) => el.readOnly = false);
    await waitForSelector(page, fakeInput, 'p-text-field-wrapper__fake-input--readonly', {isGone: true});

    expect(await getClassFromHandle(fakeInput)).not.toContain('p-text-field-wrapper__fake-input--readonly');
    expect(await getCustomInputButtonDisabledState()).toBe(false);
  });

  describe('hover state', () => {

    const getFakeInput = () => selectNode(page, 'p-text-field-wrapper >>> .p-text-field-wrapper__fake-input');

    it('should change box-shadow color when fake input is hovered', async () => {
      await setContentWithDesignSystem(page, `
        <p-text-field-wrapper label="Some label">
          <input type="text" name="some-name">
        </p-text-field-wrapper>
      `);

      const fakeInput = await getFakeInput();
      const initialBoxShadow = await getBoxShadow(fakeInput);

      await fakeInput.hover();

      expect(await getBoxShadow(fakeInput, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake input when label text is hovered', async () => {
      await setContentWithDesignSystem(page, `
        <p-text-field-wrapper label="Some label">
          <input type="text" name="some-name">
        </p-text-field-wrapper>
      `);

      const fakeInput = await getFakeInput();
      const labelText = await selectNode(page, 'p-text-field-wrapper >>> .p-text-field-wrapper__label-text');
      const initialBoxShadow = await getBoxShadow(fakeInput);

      await labelText.hover();

      expect(await getBoxShadow(fakeInput, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });
  });
});

