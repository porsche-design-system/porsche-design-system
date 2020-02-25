import { newE2EPage } from '@stencil/core/testing';

describe('checkbox-wrapper', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);
    const el = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__icon-wrapper');
    expect(el).not.toBeNull();
  });

  it('should check checkbox when input is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const iconWrapper = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__icon-wrapper');
    const input = await page.find('input[type="checkbox"]');

    expect(iconWrapper).not.toHaveClass('p-checkbox-wrapper__icon-wrapper--checked');

    await input.click();

    expect(iconWrapper).toHaveClass('p-checkbox-wrapper__icon-wrapper--checked');

    await input.click();

    expect(iconWrapper).not.toHaveClass('p-checkbox-wrapper__icon-wrapper--checked');
  });

  it('should check checkbox when label text is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const iconWrapper = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__icon-wrapper');
    const labelText = await page.find('p-checkbox-wrapper >>> .p-checkbox-wrapper__label-text');

    expect(iconWrapper).not.toHaveClass('p-checkbox-wrapper__icon-wrapper--checked');

    await labelText.click();

    expect(iconWrapper).toHaveClass('p-checkbox-wrapper__icon-wrapper--checked');

    await labelText.click();

    expect(iconWrapper).not.toHaveClass('p-checkbox-wrapper__icon-wrapper--checked');
  });

  it('should check checkbox when checkbox is changed programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const getIconWrapper = async () => {
      const checkboxWrapper = await page.find('p-checkbox-wrapper');
      return checkboxWrapper.shadowRoot.querySelector('.p-checkbox-wrapper__icon-wrapper');
    };

    const iconWrapperClasslist = async () => (await getIconWrapper()).classList;

    expect(await getIconWrapper()).not.toHaveClass('p-checkbox-wrapper__icon-wrapper--checked');

    await page.evaluate(() => {
      document.querySelector('input').checked = true;
    });

    // for some reason we've to requery the iconWrapper each time and .waitForSelector does not work
    while(!(await iconWrapperClasslist()).contains('p-checkbox-wrapper__icon-wrapper--checked')) {
      await page.waitFor(10);
    }

    expect(await getIconWrapper()).toHaveClass('p-checkbox-wrapper__icon-wrapper--checked');

    await page.evaluate(() => {
      document.querySelector('input').checked = false;
    });

    while((await iconWrapperClasslist()).contains('p-checkbox-wrapper__icon-wrapper--checked')) {
      await page.waitFor(10);
    }

    expect(await getIconWrapper()).not.toHaveClass('p-checkbox-wrapper__icon-wrapper--checked');
  });

  it('should disable checkbox when checkbox is set disabled programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name"/>
      </p-checkbox-wrapper>`);

    const getIconWrapper = async () => {
      const checkboxWrapper = await page.find('p-checkbox-wrapper');
      return checkboxWrapper.shadowRoot.querySelector('.p-checkbox-wrapper__icon-wrapper');
    };

    const iconWrapperClasslist = async () => (await getIconWrapper()).classList;

    expect(await getIconWrapper()).not.toHaveClass('p-checkbox-wrapper__icon-wrapper--disabled');

    await page.evaluate(() => {
      document.querySelector('input').disabled = true;
    });

    // for some reason we've to requery the iconWrapper each time and .waitForSelector does not work
    while(!(await iconWrapperClasslist()).contains('p-checkbox-wrapper__icon-wrapper--disabled')) {
      await page.waitFor(10);
    }

    expect(await getIconWrapper()).toHaveClass('p-checkbox-wrapper__icon-wrapper--disabled');

    await page.evaluate(() => {
      document.querySelector('input').disabled = false;
    });

    while((await iconWrapperClasslist()).contains('p-checkbox-wrapper__icon-wrapper--disabled')) {
      await page.waitFor(10);
    }

    expect(await getIconWrapper()).not.toHaveClass('p-checkbox-wrapper__icon-wrapper--disabled');
  });
});
