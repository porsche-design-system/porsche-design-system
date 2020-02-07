import { newE2EPage } from '@stencil/core/testing';

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
});
