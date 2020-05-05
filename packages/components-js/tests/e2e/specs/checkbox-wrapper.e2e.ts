import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { Components } from '../../../src';
import PIcon = Components.PIcon;

describe('checkbox-wrapper', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>
    `);
    const el = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    expect(el).not.toBeNull();
  });

  it('should add aria-label to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>
    `);
    const input = await page.find('p-checkbox-wrapper input');
    expect(input.getAttribute('aria-label')).toBe('Some label');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label" message="Some error message" state="error">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>
    `);
    const input = await page.find('p-checkbox-wrapper input');
    expect(input.getAttribute('aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper>
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const checkboxComponent = await page.find('p-checkbox-wrapper');
    const getLabelText = async () => {
      return checkboxComponent.shadowRoot.querySelector('.p-checkbox-wrapper__label-text');
    };

    expect(await getLabelText()).toBeNull();

    checkboxComponent.setProperty('label', 'Some label');

    await page.waitForChanges();

    expect(await getLabelText()).not.toBeNull();

  });

  it('should add/remove message text and update aria-label attribute with message if state changes programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const checkboxComponent = await page.find('p-checkbox-wrapper');
    const getMessage = async () => {
      return checkboxComponent.shadowRoot.querySelector('.p-checkbox-wrapper__message');
    };

    const getInput = async () => {
      return checkboxComponent.find('input');
    };

    expect(await getMessage()).toBeNull();

    checkboxComponent.setProperty('state', 'error');
    checkboxComponent.setProperty('message', 'Some error message');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).toEqualAttribute('role', 'alert');
    expect(await getInput()).toEqualAttribute('aria-label','Some label. Some error message');

    checkboxComponent.setProperty('state', 'success');
    checkboxComponent.setProperty('message', 'Some success message');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).not.toHaveAttribute('role');
    expect(await getInput()).toEqualAttribute('aria-label','Some label. Some success message');

    checkboxComponent.setProperty('state', 'none');
    checkboxComponent.setProperty('message', '');

    await page.waitForChanges();

    expect(await getMessage()).toBeNull();
    expect(await getInput()).toEqualAttribute('aria-label','Some label');
  });

  it('should toggle checkbox when input is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const iconWrapper = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const input = await page.find('input[type="checkbox"]');

    expect(iconWrapper).not.toHaveClass('p-checkbox-wrapper__fake-checkbox--checked');

    await input.click();

    expect(iconWrapper).toHaveClass('p-checkbox-wrapper__fake-checkbox--checked');

    await input.click();

    expect(iconWrapper).not.toHaveClass('p-checkbox-wrapper__fake-checkbox--checked');
  });

  it('should toggle checkbox when label text is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const iconWrapper = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__fake-checkbox');
    const labelText = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__label-text');
    const input = await page.find('input[type="checkbox"]');

    expect(iconWrapper).not.toHaveClass('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await input.getProperty('checked')).toBe(false);

    await labelText.click();

    expect(iconWrapper).toHaveClass('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await input.getProperty('checked')).toBe(true);

    await labelText.click();

    expect(iconWrapper).not.toHaveClass('p-checkbox-wrapper__fake-checkbox--checked');
    expect(await input.getProperty('checked')).toBe(false);
  });

  it('should check/uncheck checkbox when checkbox is changed programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const getIconWrapper = async () => {
      const checkboxWrapper = await page.find('p-checkbox-wrapper');
      return checkboxWrapper.shadowRoot.querySelector('.p-checkbox-wrapper__fake-checkbox');
    };

    const iconWrapperClasslist = async () => (await getIconWrapper()).classList;

    expect(await getIconWrapper()).not.toHaveClass('p-checkbox-wrapper__fake-checkbox--checked');

    await page.evaluate(() => {
      document.querySelector('input').checked = true;
    });

    // for some reason we've to requery the iconWrapper each time and .waitForSelector does not work
    while(!(await iconWrapperClasslist()).contains('p-checkbox-wrapper__fake-checkbox--checked')) {
      await page.waitFor(10);
    }

    expect(await getIconWrapper()).toHaveClass('p-checkbox-wrapper__fake-checkbox--checked');

    await page.evaluate(() => {
      document.querySelector('input').checked = false;
    });

    while((await iconWrapperClasslist()).contains('p-checkbox-wrapper__fake-checkbox--checked')) {
      await page.waitFor(10);
    }

    expect(await getIconWrapper()).not.toHaveClass('p-checkbox-wrapper__fake-checkbox--checked');
  });

  it('should disable checkbox when checkbox is set disabled programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const getIconWrapper = async () => {
      const checkboxWrapper = await page.find('p-checkbox-wrapper');
      return checkboxWrapper.shadowRoot.querySelector('.p-checkbox-wrapper__fake-checkbox');
    };

    const iconWrapperClasslist = async () => (await getIconWrapper()).classList;

    expect(await getIconWrapper()).not.toHaveClass('p-checkbox-wrapper__fake-checkbox--disabled');

    await page.evaluate(() => {
      document.querySelector('input').disabled = true;
    });

    // for some reason we've to requery the iconWrapper each time and .waitForSelector does not work
    while(!(await iconWrapperClasslist()).contains('p-checkbox-wrapper__fake-checkbox--disabled')) {
      await page.waitFor(10);
    }

    expect(await getIconWrapper()).toHaveClass('p-checkbox-wrapper__fake-checkbox--disabled');

    await page.evaluate(() => {
      document.querySelector('input').disabled = false;
    });

    while((await iconWrapperClasslist()).contains('p-checkbox-wrapper__fake-checkbox--disabled')) {
      await page.waitFor(10);
    }

    expect(await getIconWrapper()).not.toHaveClass('p-checkbox-wrapper__fake-checkbox--disabled');
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
