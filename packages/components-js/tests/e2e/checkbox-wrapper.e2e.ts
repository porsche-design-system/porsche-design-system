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
});
