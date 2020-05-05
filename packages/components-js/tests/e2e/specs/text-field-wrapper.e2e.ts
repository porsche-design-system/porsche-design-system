import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { Components } from '../../../src';
import PIcon = Components.PIcon;

const getCustomInputButtonDisabledState = async (page: E2EPage) => {
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

  it('should add aria-label to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const input = await page.find('p-text-field-wrapper input');
    expect(input.getAttribute('aria-label')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper label="Some label" description="Some description">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const input = await page.find('p-text-field-wrapper input');
    expect(input.getAttribute('aria-label')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <input type="text" name="some-name">
      </p-text-field-wrapper>
    `);
    const input = await page.find('p-text-field-wrapper input');
    expect(input.getAttribute('aria-label')).toBe('Some label. Some error message');
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

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper label="Some label">
        <input type="text" name="some-name"/>
      </p-text-field-wrapper>`);

    const textFieldComponent = await page.find('p-text-field-wrapper');
    const getMessage = async () => {
      return textFieldComponent.shadowRoot.querySelector('.p-text-field-wrapper__message');
    };

    const getInput = async () => {
      return textFieldComponent.find('input');
    };

    expect(await getMessage()).toBeNull();

    textFieldComponent.setProperty('state', 'error');
    textFieldComponent.setProperty('message', 'Some error message');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).toEqualAttribute('role', 'alert');
    expect(await getInput()).toEqualAttribute('aria-label','Some label. Some error message');

    textFieldComponent.setProperty('state', 'success');
    textFieldComponent.setProperty('message', 'Some success message');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).not.toHaveAttribute('role');
    expect(await getInput()).toEqualAttribute('aria-label','Some label. Some success message');

    textFieldComponent.setProperty('state', 'none');
    textFieldComponent.setProperty('message', '');

    await page.waitForChanges();

    expect(await getMessage()).toBeNull();
    expect(await getInput()).toEqualAttribute('aria-label','Some label');

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
      const textFieldComponent = await page.find('p-text-field-wrapper');
      return textFieldComponent.shadowRoot.querySelector('.p-text-field-wrapper__fake-input');
    };

    expect((await getFakeInput())).not.toHaveClass('p-text-field-wrapper__fake-input--disabled');
    expect(await getCustomInputButtonDisabledState(page)).toBe(false);

    await page.evaluate(() => {
      document.querySelector('input').disabled = true;
    });

    await page.waitForChanges();

    expect((await getFakeInput())).toHaveClass('p-text-field-wrapper__fake-input--disabled');
    expect(await getCustomInputButtonDisabledState(page)).toBe(true);

    await page.evaluate(() => {
      document.querySelector('input').disabled = false;
    });

    await page.waitForChanges();

    expect((await getFakeInput())).not.toHaveClass('p-text-field-wrapper__fake-input--disabled');
    expect(await getCustomInputButtonDisabledState(page)).toBe(false);
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

  it('should disable search button when input (type search) is set to disabled or readonly programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-text-field-wrapper label="Some label">
        <input type="search" name="some-name">
      </p-text-field-wrapper>
    `);

    const getFakeInput = async () => {
      const textFieldComponent = await page.find('p-text-field-wrapper');
      return textFieldComponent.shadowRoot.querySelector('.p-text-field-wrapper__fake-input');
    };

    expect(await getCustomInputButtonDisabledState(page)).toBe(false);

    await page.evaluate(() => {
      document.querySelector('input').disabled = true;
    });

    await page.waitForChanges();

    expect(await getCustomInputButtonDisabledState(page)).toBe(true);

    await page.evaluate(() => {
      document.querySelector('input').disabled = false;
    });

    await page.waitForChanges();

    expect(await getCustomInputButtonDisabledState(page)).toBe(false);

    await page.evaluate(() => {
      document.querySelector('input').readOnly = true;
    });

    await page.waitForChanges();

    expect(await getFakeInput()).toHaveClass('p-text-field-wrapper__fake-input--readonly');
    expect(await getCustomInputButtonDisabledState(page)).toBe(true);

    await page.evaluate(() => {
      document.querySelector('input').readOnly = false;
    });

    await page.waitForChanges();

    expect(await getFakeInput()).not.toHaveClass('p-text-field-wrapper__fake-input--readonly');
    expect(await getCustomInputButtonDisabledState(page)).toBe(false);
  });

  it(`submits outer forms on click on search button, if the input is search`, async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <form onsubmit="return false;">
        <p-text-field-wrapper label="Some label">
          <input type="search" name="some-name">
        </p-text-field-wrapper>
      </form>
    `);
    const searchButton = await page.find('p-text-field-wrapper >>> button');
    const form = await page.find('form');
    const spy = await form.spyOnEvent('submit');
    await searchButton.click();
    expect(spy.length).toBe(1);
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

      const labelText = await page.find('p-text-field-wrapper >>> .p-text-field-wrapper__label-text');

      const initialBoxShadow = await getBoxShadow(page);

      await labelText.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);
    });
  });
});

