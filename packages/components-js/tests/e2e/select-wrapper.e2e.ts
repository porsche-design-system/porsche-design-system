import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('select-wrapper', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const el = await page.find('p-select-wrapper >>> .p-select-wrapper__fake-select');
    expect(el).not.toBeNull();
  });

  it('should add aria-label to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await page.find('p-select-wrapper select');
    expect(select.getAttribute('aria-label')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-select-wrapper label="Some label" description="Some description">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await page.find('p-select-wrapper select');
    expect(select.getAttribute('aria-label')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-select-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await page.find('p-select-wrapper select');
    expect(select.getAttribute('aria-label')).toBe('Some label. Some error message');
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

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

    const selectComponent = await page.find('p-select-wrapper');
    const getMessage = async () => {
      return selectComponent.shadowRoot.querySelector('.p-select-wrapper__message');
    };

    const getSelect = async () => {
      return selectComponent.find('select');
    };

    expect(await getMessage()).toBeNull();

    selectComponent.setProperty('state', 'error');
    selectComponent.setProperty('message', 'Some error message');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).toEqualAttribute('role', 'alert');
    expect(await getSelect()).toEqualAttribute('aria-label','Some label. Some error message');

    selectComponent.setProperty('state', 'success');
    selectComponent.setProperty('message', 'Some success message');

    await page.waitForChanges();

    expect(await getMessage()).not.toBeNull();
    expect(await getMessage()).not.toHaveAttribute('role');
    expect(await getSelect()).toEqualAttribute('aria-label','Some label. Some success message');

    selectComponent.setProperty('state', 'none');
    selectComponent.setProperty('message', '');

    await page.waitForChanges();

    expect(await getMessage()).toBeNull();
    expect(await getSelect()).toEqualAttribute('aria-label','Some label');

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

  describe('hover state', () => {
    const getBoxShadow = async (page: E2EPage) => {
      const fakeSelect = await page.find('p-select-wrapper >>> .p-select-wrapper__fake-select');
      const styles = await fakeSelect.getComputedStyle();
      return styles.boxShadow;
    };

    it('should change box-shadow color when fake select is hovered', async () => {
      const page = await newE2EPage();
      await page.setContent(`<p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

      const fakeSelect = await page.find('p-select-wrapper >>> .p-select-wrapper__fake-select');

      const initialBoxShadow = await getBoxShadow(page);

      await fakeSelect.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake select when label text is hovered', async () => {
      const page = await newE2EPage();
      await page.setContent(`<p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

      const labelText = await page.find('p-select-wrapper >>> .p-select-wrapper__label-text');

      const initialBoxShadow = await getBoxShadow(page);

      await labelText.hover();

      expect(await getBoxShadow(page)).not.toBe(initialBoxShadow);
    });
  });
});
