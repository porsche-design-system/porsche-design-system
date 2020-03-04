import { newE2EPage } from '@stencil/core/testing';

describe('select-wrapper', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`);
    const el = await page.find('p-select-wrapper >>> .p-select-wrapper__fake-select');
    expect(el).not.toBeNull();
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-select-wrapper>
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

    const selectComponent = await page.find('p-select-wrapper');
    const getLabelText = async () => {
      return selectComponent.shadowRoot.querySelector('.p-select-wrapper__label-text');
    };

    expect(await getLabelText()).toBeNull();

    selectComponent.setProperty('label', 'Some label');

    await page.waitForChanges();

    expect(await getLabelText()).not.toBeNull();

  });

  it('should focus select when label text is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`);

    const labelText = await page.find('p-select-wrapper >>> .p-select-wrapper__label-text');
    expect(labelText).not.toBeNull();

    async function hasSelectFocus() {
      return await page.evaluate(() => {
        const selectElement = document.querySelector('select');
        return document.activeElement === selectElement;
      });
    }

    expect(await hasSelectFocus()).toBe(false);

    await labelText.click();

    expect(await hasSelectFocus()).toBe(true);
  });

  it('should disable fake select when select is set disabled programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`);

    const getFakeSelect = async () => {
      const selectWrapper = await page.find('p-select-wrapper');
      return selectWrapper.shadowRoot.querySelector('.p-select-wrapper__fake-select');
    };
    const fakeSelectClassList = async () => (await getFakeSelect()).classList;

    expect((await getFakeSelect())).not.toHaveClass('p-select-wrapper__fake-select--disabled');

    await page.evaluate(() => {
      document.querySelector('select').disabled = true;
    });

    // for some reason we've to re-query the fakeSelect each time and .waitForSelector does not work
    while(!(await fakeSelectClassList()).contains('p-select-wrapper__fake-select--disabled')) {
      await page.waitFor(10);
    }

    expect((await getFakeSelect())).toHaveClass('p-select-wrapper__fake-select--disabled');

    await page.evaluate(() => {
      document.querySelector('select').disabled = false;
    });

    // for some reason we've to re-query the fakeSelect each time and .waitForSelector does not work
    while((await fakeSelectClassList()).contains('p-select-wrapper__fake-select--disabled')) {
      await page.waitFor(10);
    }

    expect((await getFakeSelect())).not.toHaveClass('p-select-wrapper__fake-select--disabled');
  });
});
