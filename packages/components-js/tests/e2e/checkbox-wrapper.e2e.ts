import {
  getAttributeFromHandle,
  getClassListFromHandle, getElementStyle, getPropertyFromHandle,
  selectNode,
  setContentWithDesignSystem, waitForInnerHTMLChange, waitForSelector
} from './helpers';
import { Components } from '../../src';
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

    const checkboxComponent = await selectNode('p-checkbox-wrapper');
    const getLabelText = () => selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__label-text')
    expect(await getLabelText()).toBeNull();

    await checkboxComponent.evaluate(el => el.setAttribute('label', 'Some label'));
    await waitForInnerHTMLChange(checkboxComponent);
    expect(await getLabelText()).not.toBeNull();
  });

  it('should add/remove message text and update aria-label attribute with message if state changes programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const checkboxComponent = await selectNode('p-checkbox-wrapper');
    const getMessage = () => selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__message');
    const input = await selectNode('input');
    expect(await getMessage()).toBeNull();

    await checkboxComponent.evaluate(el => el.setAttribute('state', 'error'));
    await checkboxComponent.evaluate(el => el.setAttribute('message', 'Some error message'));
    await waitForInnerHTMLChange(checkboxComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toEqual('alert');
    expect(await getAttributeFromHandle(input, 'aria-label')).toEqual('Some label. Some error message');

    await checkboxComponent.evaluate(el => el.setAttribute('state', 'success'));
    await checkboxComponent.evaluate(el => el.setAttribute('message', 'Some success message'));
    await waitForInnerHTMLChange(checkboxComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toBeNull();
    expect(await getAttributeFromHandle(input, 'aria-label')).toEqual('Some label. Some success message');

    await checkboxComponent.evaluate(el => el.setAttribute('state', 'none'));
    await checkboxComponent.evaluate(el => el.setAttribute('message', ''));
    await waitForInnerHTMLChange(checkboxComponent);

    expect(await getMessage()).toBeNull();
    expect(await getAttributeFromHandle(input, 'aria-label')).toEqual('Some label');
  });

  it('should toggle checkbox when input is clicked', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const fakeCheckbox = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const input = await selectNode('input[type="checkbox"]');

    expect(await getClassListFromHandle(fakeCheckbox)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await input.click();
    await waitForSelector(fakeCheckbox, 'p-checkbox-wrapper__fake-checkbox--checked');

    expect(await getClassListFromHandle(fakeCheckbox)).toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await input.click();
    await waitForSelector(fakeCheckbox, 'p-checkbox-wrapper__fake-checkbox--checked', {isGone: true});

    expect(await getClassListFromHandle(fakeCheckbox)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
  });

  it('should toggle checkbox when label text is clicked', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const fakeCheckbox = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const labelText = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__label-text');
    const input = await selectNode('input[type="checkbox"]');

    expect(await getClassListFromHandle(fakeCheckbox)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await getPropertyFromHandle(input, 'checked')).toBe(false);

    await labelText.click();
    await waitForSelector(fakeCheckbox, 'p-checkbox-wrapper__fake-checkbox--checked');

    expect(await getClassListFromHandle(fakeCheckbox)).toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await getPropertyFromHandle(input, 'checked')).toBe(true);

    await labelText.click();
    await waitForSelector(fakeCheckbox, 'p-checkbox-wrapper__fake-checkbox--checked', {isGone: true});

    expect(await getClassListFromHandle(fakeCheckbox)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await getPropertyFromHandle(input, 'checked')).toBe(false);
  });

  it('should check/uncheck checkbox when checkbox is changed programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const fakeCheckbox = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const input = await selectNode('input[type="checkbox"]');

    expect(await getClassListFromHandle(fakeCheckbox)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await input.evaluate((el: HTMLInputElement) => el.checked = true);
    await waitForSelector(fakeCheckbox, 'p-checkbox-wrapper__fake-checkbox--checked');

    expect(await getClassListFromHandle(fakeCheckbox)).toContain('p-checkbox-wrapper__fake-checkbox--checked');

    await input.evaluate((el: HTMLInputElement) => el.checked = false);
    await waitForSelector(fakeCheckbox, 'p-checkbox-wrapper__fake-checkbox--checked', {isGone: true});

    expect(await getClassListFromHandle(fakeCheckbox)).not.toContain('p-checkbox-wrapper__fake-checkbox--checked');
  });

  it('should disable checkbox when checkbox is set disabled programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const fakeCheckbox = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const input = await selectNode('input[type="checkbox"]');

    expect(await getClassListFromHandle(fakeCheckbox)).not.toContain('p-checkbox-wrapper__fake-checkbox--disabled');

    await input.evaluate((el: HTMLInputElement) => el.disabled = true);
    await waitForSelector(fakeCheckbox, 'p-checkbox-wrapper__fake-checkbox--disabled');

    expect(await getClassListFromHandle(fakeCheckbox)).toContain('p-checkbox-wrapper__fake-checkbox--disabled');

    await input.evaluate((el: HTMLInputElement) => el.disabled = false);
    await waitForSelector(fakeCheckbox, 'p-checkbox-wrapper__fake-checkbox--disabled', {isGone: true});

    expect(await getClassListFromHandle(fakeCheckbox)).not.toContain('p-checkbox-wrapper__fake-checkbox--disabled');
  });

  describe('indeterminate state', () => {
    const getIconName = () => page.evaluate(() => {
      const icon: PIcon = document.querySelector('p-checkbox-wrapper').shadowRoot.querySelector('p-icon');
      return icon.name;
    });

    const setIndeterminate = async (value: boolean) => {
      await page.evaluate((indeterminate: boolean) => {
        const input: HTMLInputElement = document.querySelector('input[type="checkbox"]');
        input.indeterminate = indeterminate;
      }, value);

      await waitForInnerHTMLChange(await selectNode('p-checkbox-wrapper >>> p-icon >>> i'));
    };

    const setChecked = async (value: boolean) => {
      const indeterminate = await page.evaluate((checked: boolean) => {
        const input: HTMLInputElement = document.querySelector('input[type="checkbox"]');
        input.checked = checked;
        return input.indeterminate;
      }, value);

      if (!indeterminate){
        await waitForSelector(await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox'), 'p-checkbox-wrapper__fake-checkbox--checked', {isGone: !value})
      }
    };

    // ToDo: Refactor computedStyle Helper
    const showsIcon = () => page.evaluate(async () => {
      const icon = document.querySelector('p-checkbox-wrapper').shadowRoot.querySelector('.p-checkbox-wrapper__icon');
      const style = getComputedStyle(icon);
      await new Promise((resolve) => setTimeout(resolve, parseFloat(style.transitionDuration) * 1000 + 10)); // transitionDuration is in sec, timeout needs ms
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
      expect(await showsIcon()).toBe(false);
      expect(await getIconName()).toBe('check');
    });

    it('should remove indeterminate state when checkbox value is changed by the user', async () => {
      await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

      const input = await selectNode('input[type="checkbox"]');
      const innerIcon = await selectNode('p-checkbox-wrapper >>> p-icon >>> i');

      await setIndeterminate(true);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await input.click();
      await waitForInnerHTMLChange(innerIcon);
      expect(await getIconName()).toBe('check');
      expect(await showsIcon()).toBe(true);

      await setIndeterminate(true);
      expect(await getIconName()).toBe('minus');
      expect(await showsIcon()).toBe(true);

      await input.click();
      await waitForInnerHTMLChange(innerIcon);
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
      const initialBoxShadow = await getElementStyle(fakeCheckbox, 'boxShadow');
      await fakeCheckbox.hover();

      expect(await getElementStyle(fakeCheckbox, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake checkbox when label text is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

      const fakeCheckbox = await getFakeCheckbox();
      const labelText = await selectNode('p-checkbox-wrapper >>> .p-checkbox-wrapper__label-text');
      const initialBoxShadow = await getElementStyle(fakeCheckbox, 'boxShadow');

      await labelText.hover();
      expect(await getElementStyle(fakeCheckbox, 'boxShadow', { waitForTransition: true })).not.toBe(initialBoxShadow);
    });
  });
});
