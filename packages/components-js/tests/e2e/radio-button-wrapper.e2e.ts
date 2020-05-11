import {
  getAttributeFromHandle,
  getBoxShadow,
  getClassFromHandle,
  selectNode,
  setContentWithDesignSystem, waitForInnerHTMLChange
} from './helpers';

describe('radio-button-wrapper', () => {
  it('should render', async () => {
    await setContentWithDesignSystem(`
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
    `);
    const el = await selectNode('p-radio-button-wrapper >>> .p-radio-button-wrapper__fake-radio-button');
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
    `);
    const input = await selectNode('p-radio-button-wrapper input');
    expect(await getAttributeFromHandle(input, 'aria-label')).toBe('Some label');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-radio-button-wrapper label="Some label" message="Some error message" state="error">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
    `);
    const input = await selectNode('p-radio-button-wrapper input');
    expect(await getAttributeFromHandle(input, 'aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-radio-button-wrapper>
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const radioButtonComponent = await selectNode('p-radio-button-wrapper');
    const getLabelText = () => selectNode('p-radio-button-wrapper >>> .p-radio-button-wrapper__label-text');
    expect(await getLabelText()).toBeNull();

    await radioButtonComponent.evaluate(el => el.setAttribute('label', 'Some label'));
    expect(await getLabelText()).not.toBeNull();
  });

  it('should add/remove message text and update aria-label attribute with message if state changes programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name"/>
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const radioComponent = await selectNode('p-radio-button-wrapper');
    const getMessage = () => selectNode('p-radio-button-wrapper >>> .p-radio-button-wrapper__message');
    const input = await selectNode('input');

    expect(await getMessage()).toBeNull();
    await radioComponent.evaluate(el => el.setAttribute('state', 'error'));
    await radioComponent.evaluate(el => el.setAttribute('message', 'Some error message'));
    await waitForInnerHTMLChange(radioComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toEqual('alert');
    expect(await getAttributeFromHandle(input, 'aria-label')).toEqual('Some label. Some error message');

    await radioComponent.evaluate(el => el.setAttribute('state', 'success'));
    await radioComponent.evaluate(el => el.setAttribute('message', 'Some success message'));
    await waitForInnerHTMLChange(radioComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toBeNull();
    expect(await getAttributeFromHandle(input, 'aria-label')).toEqual('Some label. Some success message');

    await radioComponent.evaluate(el => el.setAttribute('state', 'none'));
    await radioComponent.evaluate(el => el.setAttribute('message', ''));
    await waitForInnerHTMLChange(radioComponent);

    expect(await getMessage()).toBeNull();
    expect(await getAttributeFromHandle(input, 'aria-label')).toEqual('Some label');
  });

  it('should check radio-button when input is clicked', async () => {
    await setContentWithDesignSystem(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const radioComponent1Label = await selectNode('#radio-1 >>> .p-radio-button-wrapper__label');
    const fakeRadio1 = await selectNode('#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
    const fakeRadio2 = await selectNode('#radio-2 >>> .p-radio-button-wrapper__fake-radio-button');
    const input1 = await selectNode('#radio-1 > input[type="radio"]');
    const input2 = await selectNode('#radio-2 > input[type="radio"]');

    expect(await getClassFromHandle(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');

    await input1.click();
    await waitForInnerHTMLChange(radioComponent1Label);

    expect(await getClassFromHandle(fakeRadio1)).toContain('p-radio-button-wrapper__fake-radio-button--checked');

    await input2.click();
    await waitForInnerHTMLChange(radioComponent1Label);

    expect(await getClassFromHandle(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getClassFromHandle(fakeRadio2)).toContain('p-radio-button-wrapper__fake-radio-button--checked');
  });

  it('should check radio-button when label text is clicked', async () => {
    await setContentWithDesignSystem(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const radioComponent1Label = await selectNode('#radio-1 >>> .p-radio-button-wrapper__label');
    const fakeRadio1 = await selectNode('#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
    const fakeRadio2 = await selectNode('#radio-2 >>> .p-radio-button-wrapper__fake-radio-button');
    const labelText1 = await selectNode('#radio-1 >>> .p-radio-button-wrapper__label-text');
    const labelText2 = await selectNode('#radio-2 >>> .p-radio-button-wrapper__label-text');

    expect(await getClassFromHandle(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');

    await labelText1.click();
    await waitForInnerHTMLChange(radioComponent1Label);

    expect(await getClassFromHandle(fakeRadio1)).toContain('p-radio-button-wrapper__fake-radio-button--checked');

    await labelText2.click();
    await waitForInnerHTMLChange(radioComponent1Label);

    expect(await getClassFromHandle(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getClassFromHandle(fakeRadio2)).toContain('p-radio-button-wrapper__fake-radio-button--checked');
  });

  it('should check radio-button when radio-button is changed programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label" id="radio-2">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const radioComponent1Label = await selectNode('#radio-1 >>> .p-radio-button-wrapper__label');
    const fakeRadio1 = await selectNode('#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
    const fakeRadio1Input = await selectNode('#radio-1 > input');
    const fakeRadio2 = await selectNode('#radio-2 >>> .p-radio-button-wrapper__fake-radio-button');
    const fakeRadio2Input = await selectNode('#radio-2 > input');

    expect(await getClassFromHandle(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getClassFromHandle(fakeRadio2)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');

    await fakeRadio1Input.evaluate(el => el.setAttribute('checked', 'true'));
    await waitForInnerHTMLChange(radioComponent1Label);

    expect(await getClassFromHandle(fakeRadio1)).toContain('p-radio-button-wrapper__fake-radio-button--checked');

    await fakeRadio2Input.evaluate(el => el.setAttribute('checked', 'true'));
    await waitForInnerHTMLChange(radioComponent1Label);

    expect(await getClassFromHandle(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--checked');
    expect(await getClassFromHandle(fakeRadio2)).toContain('p-radio-button-wrapper__fake-radio-button--checked');
  });

  it('should disable radio-button when radio-button is set disabled programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

    const radioComponent1Label = await selectNode('#radio-1 >>> .p-radio-button-wrapper__label');
    const fakeRadio1 = await selectNode('#radio-1 >>> .p-radio-button-wrapper__fake-radio-button');
    const fakeRadio1Input = await selectNode('#radio-1 > input');

    expect(await getClassFromHandle(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--disabled');

    await fakeRadio1Input.evaluate((el: HTMLInputElement) => el.disabled = true);
    await waitForInnerHTMLChange(radioComponent1Label);

    expect(await getClassFromHandle(fakeRadio1)).toContain('p-radio-button-wrapper__fake-radio-button--disabled');

    await fakeRadio1Input.evaluate((el: HTMLInputElement) => el.disabled = false);
    await waitForInnerHTMLChange(radioComponent1Label);

    expect(await getClassFromHandle(fakeRadio1)).not.toContain('p-radio-button-wrapper__fake-radio-button--disabled');
  });

  describe('hover state', () => {

    const getFakeRadioButton = () => selectNode('p-radio-button-wrapper >>> .p-radio-button-wrapper__fake-radio-button');

    it('should change box-shadow color when fake radio button is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

      const fakeRadioButton = await getFakeRadioButton();
      const initialBoxShadow = await getBoxShadow(fakeRadioButton);

      await fakeRadioButton.hover();

      expect(await getBoxShadow(fakeRadioButton, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake radio button when label text is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`
      <p-radio-button-wrapper label="Some label" id="radio-1">
        <input type="radio" name="some-name"/>
      </p-radio-button-wrapper>`);

      const fakeRadioButton = await getFakeRadioButton();
      const labelText = await selectNode('p-radio-button-wrapper >>> .p-radio-button-wrapper__label-text');

      const initialBoxShadow = await getBoxShadow(fakeRadioButton);

      await labelText.hover();

      expect(await getBoxShadow(fakeRadioButton, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });
  });
});
