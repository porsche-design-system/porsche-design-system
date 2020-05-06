import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { Components } from '../../../src';
import PIcon = Components.PIcon;
import { getAttributeFromHandle, getClassFromHandle, selectNode, setContentWithDesignSystem } from '../helpers';

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

    await page.$eval('p-checkbox-wrapper', el => el.setAttribute('state', 'error'));
    await page.$eval('p-checkbox-wrapper', el => el.setAttribute('message', 'Some error message'));
   /* await page.evaluate(el => el.setAttribute('state', 'error'), checkboxComponent);*/
    await page.evaluate(el => el.setAttribute('message', 'Some error message'), checkboxComponent);
    await page.waitFor(100);
    console.log('####getMessage',await getAttributeFromHandle(await getMessage(), 'role'));

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

    const iconWrapper = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const labelText = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__label-text');
    const input = await selectNode('input[type="checkbox"]');

    expect(await getClassFromHandle(iconWrapper)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await getAttributeFromHandle(input, 'checked')).toBeNull();

    await labelText.click();
    await page.waitFor(100);

    expect(await getClassFromHandle(iconWrapper)).toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await input.getProperty('checked')).not.toBeNull();

    await labelText.click();
    await page.waitFor(100);

    expect(await getClassFromHandle(iconWrapper)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await getAttributeFromHandle(input, 'checked')).toBeNull();
  });

  it('should check/uncheck checkbox when checkbox is changed programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const getIconWrapperShadowClass = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const input = await selectNode('input[type="checkbox"]');

    expect(await getClassFromHandle(getIconWrapperShadowClass)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await page.evaluate(el => el.setAttribute('checked', 'true'), input);
    await page.waitFor(100);

    expect(await getClassFromHandle(getIconWrapperShadowClass).toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await page.evaluate(el => el.removeAttribute('checked'), input);
    await page.waitFor(100);

    expect(await getClassFromHandle(getIconWrapperShadowClass) ).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
  });

  fit('should disable checkbox when checkbox is set disabled programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const getIconWrapperShadowClass = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const input = await selectNode('input[type="checkbox"]');

    expect(await getClassFromHandle(getIconWrapperShadowClass)).not.toContain('p-checkbox-wrapper__fake-checkbox--disabled');

    await page.evaluate(el => el.setAttribute('disabled', 'true'), input);
    await page.waitFor(100);

    expect(await getClassFromHandle(getIconWrapperShadowClass)).toContain('p-checkbox-wrapper__fake-checkbox--disabled');

    await page.evaluate(el => el.removeAttribute('disabled'), input);
    await page.waitFor(100);

    expect(await getClassFromHandle(getIconWrapperShadowClass)).not.toContain('p-checkbox-wrapper__fake-checkbox--disabled');
  });

  describe('indeterminate state', () => {
    const getIconName = async (page: E2EPage) => {
      return await page.evaluate(() => {
        const wrapper = document.querySelector('p-checkbox-wrapper');
        const icon =  wrapper.shadowRoot.querySelector('p-icon') as PIcon;
        return icon.name;
      });
    };

    const setIndeterminate = async (page: E2EPage, value: boolean) => {
      await page.evaluate((indeterminate: boolean) => {
        const input = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
        input.indeterminate = indeterminate;
      }, value);

      await page.waitForChanges();
    };

    const setChecked = async (page: E2EPage, value: boolean) => {
      await page.evaluate((checked: boolean) => {
        const input = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
        input.checked = checked;
      }, value);

      await page.waitForChanges();
    };

    const showsIcon = async (page: E2EPage) => {
      const icon = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__icon');
      const styles = await icon.getComputedStyle();
      await page.waitFor(parseFloat(styles.transitionDuration) * 1000);
      return await icon.isVisible();
    };

    it('should show indeterminate state when checkbox is set to indeterminate', async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

      expect(await getIconName(page)).toBe('check');
      expect(await showsIcon(page)).toBe(false);

      await setIndeterminate(page, true);
      expect(await getIconName(page)).toBe('minus');
      expect(await showsIcon(page)).toBe(true);

      await setIndeterminate(page, false);
      expect(await getIconName(page)).toBe('check');
      expect(await showsIcon(page)).toBe(false);
    });

    it('should remove indeterminate state when checkbox value is changed by the user', async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

      const input = await page.find('input[type="checkbox"]');

      await setIndeterminate(page, true);
      expect(await getIconName(page)).toBe('minus');
      expect(await showsIcon(page)).toBe(true);

      await input.click();
      expect(await getIconName(page)).toBe('check');
      expect(await showsIcon(page)).toBe(true);

      await setIndeterminate(page, true);
      expect(await getIconName(page)).toBe('minus');
      expect(await showsIcon(page)).toBe(true);

      await input.click();
      expect(await getIconName(page)).toBe('check');
      expect(await showsIcon(page)).toBe(false);
    });

    it('should keep indeterminate state when checkbox value is changed programmatically', async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

      await setIndeterminate(page, true);
      expect(await getIconName(page)).toBe('minus');
      expect(await showsIcon(page)).toBe(true);

      await setChecked(page, true);
      expect(await getIconName(page)).toBe('minus');
      expect(await showsIcon(page)).toBe(true);

      await setChecked(page, false);
      expect(await getIconName(page)).toBe('minus');
      expect(await showsIcon(page)).toBe(true);
    });
  });

  describe('hover state', () => {
    const getBoxShadow = async (page: E2EPage) => {
      const fakeCheckbox = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
      const styles = await fakeCheckbox.getComputedStyle();
      return styles.boxShadow;
    };

    it('should change box-shadow color when fake checkbox is hovered', async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

      const fakeCheckbox = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');

      const initialBoxShadow = await getBoxShadow(page);

      await fakeCheckbox.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake checkbox when label text is hovered', async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

      const labelText = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__label-text');

      const initialBoxShadow = await getBoxShadow(page);

      await labelText.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);
    });
  });
});
