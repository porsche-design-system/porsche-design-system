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
});
