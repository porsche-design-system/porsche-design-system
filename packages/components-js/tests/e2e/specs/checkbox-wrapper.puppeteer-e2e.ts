import {
  getAttributeFromHandle, getBoxShadow,
  getClassFromHandle,
  selectNode,
  setContentWithDesignSystem
} from '../helpers';
import { Components } from '../../../src';
import PIcon = Components.PIcon;

describe('checkbox-wrapper', () => {
  it('should render', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>
    `);
    const el = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>
    `);
    const input = await selectNode('p-checkbox-wrapper input');
    expect(await getAttributeFromHandle(input, 'aria-label')).toBe('Some label');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label" message="Some error message" state="error">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>
    `);
    const input = await selectNode('p-checkbox-wrapper input');
    expect(await getAttributeFromHandle(input, 'aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper>
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const getLabelText = () => selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__label-text')
    expect(await getLabelText()).toBeNull();

    await page.$eval('p-checkbox-wrapper', el => el.setAttribute('label', 'Some label'));
    expect(await getLabelText()).not.toBeNull();
  });

  it('should add/remove message text and update aria-label attribute with message if state changes programmatically', async () => {

    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const checkboxComponent = await selectNode('p-checkbox-wrapper');
    const getMessage = () => selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__message');
    const getInput = () => checkboxComponent.$('input');

    expect(await getMessage()).toBeNull();

    await page.evaluate(el => el.setAttribute('state', 'error'), checkboxComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some error message'), checkboxComponent);
    await page.waitFor(100);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toEqual('alert');
    expect(await getAttributeFromHandle(await getInput(), 'aria-label')).toEqual('Some label. Some error message');

    await page.evaluate(el => el.setAttribute('state', 'success'), checkboxComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some success message'), checkboxComponent);
    await page.waitFor(100);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toBeNull();
    expect(await getAttributeFromHandle(await getInput(), 'aria-label')).toEqual('Some label. Some success message');

    await page.evaluate(el => el.setAttribute('state', 'none'), checkboxComponent);
    await page.evaluate(el => el.setAttribute('message', ''), checkboxComponent);
    await page.waitFor(100);

    expect(await getMessage()).toBeNull();
    expect(await getAttributeFromHandle(await getInput(), 'aria-label')).toEqual('Some label');
  });

  it('should toggle checkbox when input is clicked', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const checkBoxShadowSelector = 'p-checkbox-wrapper >>> p-checkbox-wrapper__fake-checkbox--checked';
    const input = await selectNode('input[type="checkbox"]');
    expect(await selectNode(checkBoxShadowSelector)).toBeNull();

    await input.click();
    expect(await selectNode(checkBoxShadowSelector)).toBeDefined();

    await input.click();
    expect(await selectNode(checkBoxShadowSelector)).toBeNull();
  });

  it('should toggle checkbox when label text is clicked', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const CheckBoxWrapper = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const labelText = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__label-text');
    const input = await selectNode('input[type="checkbox"]');

    expect(await getClassFromHandle(CheckBoxWrapper)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await getAttributeFromHandle(input, 'checked')).toBeNull();

    await labelText.click();
    await page.waitFor(100);

    expect(await getClassFromHandle(CheckBoxWrapper)).toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await input.getProperty('checked')).not.toBeNull();

    await labelText.click();
    await page.waitFor(100);

    expect(await getClassFromHandle(CheckBoxWrapper)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await getAttributeFromHandle(input, 'checked')).toBeNull();
  });

  it('should check/uncheck checkbox when checkbox is changed programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const getCheckBoxWrapperShadowClass = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const input = await selectNode('input[type="checkbox"]');

    expect(await getClassFromHandle(getCheckBoxWrapperShadowClass)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await page.evaluate(el => el.setAttribute('checked', 'true'), input);
    await page.waitFor(100);

    expect(await getClassFromHandle(getCheckBoxWrapperShadowClass)).toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await page.evaluate(el => el.removeAttribute('checked'), input);
    await page.waitFor(100);

    expect(await getClassFromHandle(getCheckBoxWrapperShadowClass)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
  });

  it('should disable checkbox when checkbox is set disabled programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const getCheckBoxWrapperShadowClass = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const input = await selectNode('input[type="checkbox"]');

    expect(await getClassFromHandle(getCheckBoxWrapperShadowClass)).not.toContain('p-checkbox-wrapper__fake-checkbox--disabled');

    await page.evaluate(el => el.setAttribute('disabled', 'true'), input);
    await page.waitFor(100);

    expect(await getClassFromHandle(getCheckBoxWrapperShadowClass)).toContain('p-checkbox-wrapper__fake-checkbox--disabled');

    await page.evaluate(el => el.removeAttribute('disabled'), input);
    await page.waitFor(100);

    expect(await getClassFromHandle(getCheckBoxWrapperShadowClass)).not.toContain('p-checkbox-wrapper__fake-checkbox--disabled');
  });

  describe('indeterminate state', () => {
    const getIconName = () => page.evaluate(() => {
      const icon: PIcon = document.querySelector('p-checkbox-wrapper').shadowRoot.querySelector('p-icon');
      return icon.name;
    });

    const setIndeterminate = async (value: boolean) => {
      await page.evaluate((indeterminate: boolean) => {
        const input = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
        input.indeterminate = indeterminate;
      }, value);

      await page.waitFor(100);
    };

    const setChecked = async (value: boolean) => {
      await page.evaluate((checked: boolean) => {
        const input = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
        input.checked = checked;
      }, value);

      await page.waitFor(100);
    };

    // ToDo: Refactor computedStyle Helper
    const showsIcon = () => page.evaluate(async () => {
      const icon = document.querySelector('p-checkbox-wrapper').shadowRoot.querySelector('.p-checkbox-wrapper__icon')
      const style = getComputedStyle(icon);
      await new Promise((resolve) => setTimeout(resolve, parseFloat(style.transitionDuration) * 1000)); // transitionDuration is in sec, timeout needs ms
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    });

    it('should show indeterminate state when checkbox is set to indeterminate', async () => {
      await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

      expect(await getIconName()).toBe('check');
      expect(await showsIcon()).toBe(false);

      await setIndeterminate(true);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await setIndeterminate(false);
      expect(await getIconName()).toBe('check');
      expect(await showsIcon()).toBe(false);
    });

    it('should remove indeterminate state when checkbox value is changed by the user', async () => {
      await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

      const input = await selectNode('input[type="checkbox"]');

      await setIndeterminate(true);
      await page.waitFor(100);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await input.click();
      await page.waitFor(100);
      expect(await getIconName()).toBe('check');
      expect(await showsIcon()).toBe(true);

      await setIndeterminate(true);
      await page.waitFor(100);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await input.click();
      await page.waitFor(100);
      expect(await getIconName()).toBe('check');
      expect(await showsIcon()).toBe(false);
    });

    it('should keep indeterminate state when checkbox value is changed programmatically', async () => {
      await setContentWithDesignSystem(`
          <p-checkbox-wrapper label="Some label">
            <input type="checkbox" name="some-name"/>
          </p-checkbox-wrapper>`);

      await setIndeterminate(true);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await setChecked(true);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await setChecked(false);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);
    });
  });

  describe('hover state', () => {

    const getFakeCheckbox = () => selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');

    it('should change box-shadow color when fake checkbox is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

      const fakeCheckbox = await getFakeCheckbox();
      const initialBoxShadow = await getBoxShadow(fakeCheckbox);
      await fakeCheckbox.hover();

      expect(await getBoxShadow(fakeCheckbox, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake checkbox when label text is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

      const fakeCheckbox = await getFakeCheckbox();
      const labelText = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__label-text');
      const initialBoxShadow = await getBoxShadow(fakeCheckbox);

      await labelText.hover();
      expect(await getBoxShadow(fakeCheckbox, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });
  });
});
