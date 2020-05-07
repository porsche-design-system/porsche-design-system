import { Components } from '../../src';
import PIcon = Components.PIcon;
import {
  addEventListener,
  getAttributeFromHandle, getBoxShadow,
  getClassFromHandle, initAddEventListener,
  selectNode,
  setContentWithDesignSystem
} from './helpers';

const getCustomInputButtonDisabledState = () => page.evaluate(() => {
  const toggleButton: HTMLButtonElement = document.querySelector('p-text-field-wrapper').shadowRoot.querySelector('.p-text-field-wrapper__button');
  return toggleButton.disabled;
});

const getToggleButtonIconName = () => page.evaluate(() => {
  const icon: PIcon = document.querySelector('p-text-field-wrapper').shadowRoot.querySelector('p-icon');
  return icon.name;
});


describe('Text Field Wrapper', () => {
  beforeAll(async () => {
    await initAddEventListener(); // needed for setup
  });

  it('should render', async () => {
    await setContentWithDesignSystem(`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const el = await selectNode('p-text-field-wrapper >>> label');
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const input = await selectNode('p-text-field-wrapper input');
    expect(await getAttributeFromHandle(input, 'aria-label')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-text-field-wrapper label="Some label" description="Some description">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const input = await selectNode('p-text-field-wrapper input');
    expect(await getAttributeFromHandle(input, 'aria-label')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-text-field-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const input = await selectNode('p-text-field-wrapper input');
    expect(await getAttributeFromHandle(input, 'aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-text-field-wrapper>
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>`);

    const textFieldComponent = await selectNode('p-text-field-wrapper');
    const getLabelText = () => selectNode('p-text-field-wrapper >>> .p-text-field-wrapper__label-text');

    expect(await getLabelText()).toBeNull();

    await textFieldComponent.evaluate(el => el.setAttribute('label', 'Some label'));

    expect(await getLabelText()).not.toBeNull();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>`);

    const textFieldComponent = await selectNode('p-text-field-wrapper');
    const getMessage = () => selectNode('p-text-field-wrapper >>> .p-text-field-wrapper__message');
    const getInput = () => textFieldComponent.$('input');

    expect(await getMessage()).toBeNull();

    await page.evaluate(el => el.setAttribute('state', 'error'), textFieldComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some error message'), textFieldComponent);
    await page.waitFor(50);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toEqual('alert');
    expect(await getAttributeFromHandle(await getInput(), 'aria-label')).toEqual('Some label. Some error message');

    await page.evaluate(el => el.setAttribute('state', 'success'), textFieldComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some success message'), textFieldComponent);
    await page.waitFor(50);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toBeNull();
    expect(await getAttributeFromHandle(await getInput(), 'aria-label')).toEqual('Some label. Some success message');

    await page.evaluate(el => el.removeAttribute('state'), textFieldComponent);
    await page.evaluate(el => el.setAttribute('message', ''), textFieldComponent);
    await page.waitFor(50);

    expect(await getMessage()).toBeNull();
    expect(await getAttributeFromHandle(await getInput(), 'aria-label')).toEqual('Some label');
  });

  it(`should focus input when label text is clicked`, async () => {
    await setContentWithDesignSystem(`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);

    const textFieldWrapper = await selectNode('p-text-field-wrapper');
    const labelText = await selectNode('p-text-field-wrapper >>> p-text');
    const input = await textFieldWrapper.$('input');

    let inputFocusSpyCalls = 0;
    await addEventListener(input, 'focus', () => inputFocusSpyCalls++);

    expect(inputFocusSpyCalls).toBe(0);
    await labelText.click();
    await page.waitFor(50);

    expect(inputFocusSpyCalls).toBe(1);
  });

  it('should disable fake input and toggle password button when input (type password) is set disabled programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `);

    const textFieldComponent = await selectNode('p-text-field-wrapper');
    const getFakeInput = () => selectNode('p-text-field-wrapper >>> .p-text-field-wrapper__fake-input');
    const input = () => textFieldComponent.$('input');

    expect(await getAttributeFromHandle(await getFakeInput(), 'class')).not.toContain('p-text-field-wrapper__fake-input--disabled');
    expect(await getCustomInputButtonDisabledState()).toBe(false);

    await page.evaluate(el => el.setAttribute('disabled', 'true'), await input());
    await page.waitFor(50);

    expect(await getClassFromHandle(await getFakeInput())).toContain('p-text-field-wrapper__fake-input--disabled');
    expect(await getCustomInputButtonDisabledState()).toBe(true);

    await page.evaluate(el => el.removeAttribute('disabled'), await input());
    await page.waitFor(50);

    expect(await getClassFromHandle(await getFakeInput())).not.toContain('p-text-field-wrapper__fake-input--disabled');
    expect(await getCustomInputButtonDisabledState()).toBe(false);
  });

  it('should toggle icon when password visibility button is clicked', async () => {
    await setContentWithDesignSystem(`
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `);

    const toggleButton = await selectNode('p-text-field-wrapper >>> .p-text-field-wrapper__button');

    expect((await getToggleButtonIconName())).toBe('view');

    await toggleButton.click();
    await page.waitFor(50);

    expect((await getToggleButtonIconName())).toBe('view-off');

    await toggleButton.click();
    await page.waitFor(50);

    expect((await getToggleButtonIconName())).toBe('view');
  });

  it(`should toggle password visibility and focus input correctly`, async () => {
    await setContentWithDesignSystem(`
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `);

    const textFieldComponent = await selectNode('p-text-field-wrapper');
    const button = await selectNode('p-text-field-wrapper >>> button.p-text-field-wrapper__button');
    const input = await textFieldComponent.$('input');

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

  it('should disable search button when input (type search) is set to disabled or readonly programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-text-field-wrapper label="Some label">
        <input type="search" name="some-name">
      </p-text-field-wrapper>
    `);

    const textFieldComponent = await selectNode('p-text-field-wrapper');
    const getFakeInput = () => selectNode('p-text-field-wrapper >>> .p-text-field-wrapper__fake-input');
    const getInput = () => textFieldComponent.$('input');

    expect(await getCustomInputButtonDisabledState()).toBe(false);

    await page.evaluate(el => el.setAttribute('disabled', 'true'), await getInput());
    await page.waitFor(50);

    expect(await getCustomInputButtonDisabledState()).toBe(true);

    await page.evaluate(el => el.removeAttribute('disabled'), await getInput());
    await page.waitFor(50);

    expect(await getCustomInputButtonDisabledState()).toBe(false);

    await page.evaluate(el => el.setAttribute('readOnly', 'true'), await getInput());
    await page.waitFor(50);

    expect(await getClassFromHandle(await getFakeInput())).toContain('p-text-field-wrapper__fake-input--readonly');
    expect(await getCustomInputButtonDisabledState()).toBe(true);

    await page.evaluate(el => el.removeAttribute('readOnly'), await getInput());
    await page.waitFor(50);

    expect(await getClassFromHandle(await getFakeInput())).not.toContain('p-text-field-wrapper__fake-input--readonly');
    expect(await getCustomInputButtonDisabledState()).toBe(false);
  });

  it(`submits outer forms on click on search button, if the input is search`, async () => {
    await setContentWithDesignSystem(`
      <form onsubmit="return false;">
        <p-text-field-wrapper label="Some label">
          <input type="search" name="some-name">
        </p-text-field-wrapper>
      </form>
    `);
    const searchButton = await selectNode('p-text-field-wrapper >>> button');
    const form = await selectNode('form');

    let formFocusCalls = 0;
    await addEventListener(form, 'submit', () => formFocusCalls++);

    await searchButton.click();
    await page.waitFor(50);
    expect(formFocusCalls).toBe(1);
  });

  describe('hover state', () => {

    const getFakeInput = () => selectNode('p-text-field-wrapper >>> .p-text-field-wrapper__fake-input');

    it('should change box-shadow color when fake input is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`
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
      await page.reload();
      await setContentWithDesignSystem(`
        <p-text-field-wrapper label="Some label">
          <input type="text" name="some-name">
        </p-text-field-wrapper>
      `);

      const fakeInput = await getFakeInput();
      const labelText = await selectNode('p-text-field-wrapper >>> .p-text-field-wrapper__label-text');
      const initialBoxShadow = await getBoxShadow(fakeInput);

      await labelText.hover();

      expect(await getBoxShadow(fakeInput, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });
  });
});

