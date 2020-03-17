import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { Components } from '../../src';
import PIcon = Components.PIcon;

const getToggleButtonDisabledState = async (page: E2EPage) => {
  return await page.evaluate(() => {
    const wrapper = document.querySelector('p-text-field-wrapper');
    const toggleButton =  wrapper.shadowRoot.querySelector('.p-text-field-wrapper__button') as HTMLButtonElement;
    return toggleButton.disabled;
  });
};

const getToggleButtonIconName = async (page: E2EPage) => {
  return await page.evaluate(() => {
    const wrapper = document.querySelector('p-text-field-wrapper');
    const icon =  wrapper.shadowRoot.querySelector('.p-text-field-wrapper__button p-icon') as PIcon;
    return icon.name;
  });
};

describe('Text Field Wrapper', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const el = await page.find('p-text-field-wrapper >>> label');
    expect(el).not.toBeNull();
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper>
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>`);

    const textFieldComponent = await page.find('p-text-field-wrapper');
    const getLabelText = async () => {
      return textFieldComponent.shadowRoot.querySelector('.p-text-field-wrapper__label-text');
    };

    expect(await getLabelText()).toBeNull();

    textFieldComponent.setProperty('label', 'Some label');

    await page.waitForChanges();

    expect(await getLabelText()).not.toBeNull();

  });

  it('should add/remove message text and add/remove aria attributes to message if state changes programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>`);

    const textFieldComponent = await page.find('p-text-field-wrapper');
    const getMessage = async () => {
      return textFieldComponent.shadowRoot.querySelector('.p-text-field-wrapper__message');
    };

    expect(await getMessage()).toBeNull();

    textFieldComponent.setProperty('state', 'error');
    textFieldComponent.setProperty('message', 'some message');

    await page.waitForChanges();

    const label = await page.find('p-text-field-wrapper >>> .p-text-field-wrapper__label');
    const labelId = label.getAttribute('id');

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).toEqualAttributes({ 'role': 'alert', 'aria-describedby': labelId });

    textFieldComponent.setProperty('state', 'success');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).not.toHaveAttribute('role');
    expect(await getMessage()).not.toHaveAttribute('aria-describedby');

    textFieldComponent.setProperty('state', 'none');

    await page.waitForChanges();

    expect(await getMessage()).toBeNull();

  });

  it(`should focus input when label text is clicked`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const labelText = await page.find('p-text-field-wrapper >>> label > p-text');
    const input = await page.find('input');
    const inputFocusSpy = await input.spyOnEvent('focus');

    expect(inputFocusSpy.length).toBe(0);

    await labelText.click();

    expect(inputFocusSpy.length).toBe(1);
  });

  it('should disable fake input and toggle password button when input (type password) is set disabled programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `);

    const getFakeInput = async () => {
      const selectWrapper = await page.find('p-text-field-wrapper');
      return selectWrapper.shadowRoot.querySelector('.p-text-field-wrapper__fake-input');
    };
    const fakeInputClassList = async () => (await getFakeInput()).classList;

    expect((await getFakeInput())).not.toHaveClass('p-text-field-wrapper__fake-input--disabled');
    expect(await getToggleButtonDisabledState(page)).toBe(false);

    await page.evaluate(() => {
      document.querySelector('input').disabled = true;
    });

    // for some reason we've to re-query the fakeSelect each time and .waitForSelector does not work
    while(!(await fakeInputClassList()).contains('p-text-field-wrapper__fake-input--disabled')) {
      await page.waitFor(10);
    }

    expect((await getFakeInput())).toHaveClass('p-text-field-wrapper__fake-input--disabled');
    expect(await getToggleButtonDisabledState(page)).toBe(true);

    await page.evaluate(() => {
      document.querySelector('input').disabled = false;
    });

    // for some reason we've to re-query the fakeSelect each time and .waitForSelector does not work
    while((await fakeInputClassList()).contains('p-text-field-wrapper__fake-input--disabled')) {
      await page.waitFor(10);
    }

    expect((await getFakeInput())).not.toHaveClass('p-text-field-wrapper__fake-input--disabled');
    expect(await getToggleButtonDisabledState(page)).toBe(false);
  });

  it('should toggle icon when password visibility button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `);

    const toggleButton = await page.find('p-text-field-wrapper >>> .p-text-field-wrapper__button');

    expect((await getToggleButtonIconName(page))).toBe('view');

    await toggleButton.click();

    expect((await getToggleButtonIconName(page))).toBe('view-off');

    await toggleButton.click();

    expect((await getToggleButtonIconName(page))).toBe('view');
  });

  it(`should toggle password visibility and focus input correctly`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper label="Some label">
        <input type="password" name="some-name">
      </p-text-field-wrapper>
    `);
    const button = await page.find('p-text-field-wrapper >>> button.p-text-field-wrapper__button');
    const input = await page.find('input');
    const inputFocusSpy = await input.spyOnEvent('focus');

    expect(input.getAttribute('type')).toBe('password');
    expect(inputFocusSpy.length).toBe(0);

    await button.click();

    expect(input.getAttribute('type')).toBe('text');
    expect(inputFocusSpy.length).toBe(1);

    await button.click();

    expect(input.getAttribute('type')).toBe('password');
    expect(inputFocusSpy.length).toBe(2);
  });

  describe('hover state', () => {
    const getBoxShadow = async (page: E2EPage) => {
      const fakeInput = await page.find('p-text-field-wrapper >>> .p-text-field-wrapper__fake-input');
      const styles = await fakeInput.getComputedStyle();
      return styles.boxShadow;
    };

    it('should change box-shadow color when fake input is hovered', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <p-text-field-wrapper label="Some label">
          <input type="text" name="some-name">
        </p-text-field-wrapper>
      `);

      const fakeInput = await page.find('p-text-field-wrapper >>> .p-text-field-wrapper__fake-input');

      const initialBoxShadow = await getBoxShadow(page);

      await fakeInput.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);

    });

    it('should change box-shadow color of fake input when label text is hovered', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <p-text-field-wrapper label="Some label">
          <input type="text" name="some-name">
        </p-text-field-wrapper>
      `);

      const fakeInput = await page.find('p-text-field-wrapper >>> .p-text-field-wrapper__label-text');

      const initialBoxShadow = await getBoxShadow(page);

      await fakeInput.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);

    });

  });
});

