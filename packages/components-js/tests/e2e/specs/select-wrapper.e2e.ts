import {
  getAttributeFromHandle,
  getBoxShadow,
  getClassFromHandle,
  selectNode,
  setContentWithDesignSystem
} from '../helpers';

describe('select-wrapper', () => {
  it('should render', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const el = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-select');
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode('p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label" description="Some description">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode('p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode('p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper>
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

    const getLabelText = await selectNode('p-select-wrapper >>> .p-select-wrapper__label-text');

    expect(getLabelText).toBeNull();

    await page.$eval('p-select-wrapper', el => el.setAttribute('label', 'Some label'));
    expect(getLabelText).toBeDefined();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

    const selectComponent = await selectNode('p-select-wrapper');
    const getMessage = () => selectNode('p-select-wrapper >>> .p-select-wrapper__message');
    const getSelect = () => selectComponent.$('select');

    expect(await getMessage()).toBeNull();

    await page.evaluate(el => el.setAttribute('state', 'error'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some error message'), selectComponent);
    await page.waitFor(50);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toEqual('alert');
    expect(await getAttributeFromHandle(await getSelect(), 'aria-label')).toEqual('Some label. Some error message');

    await page.evaluate(el => el.setAttribute('state', 'success'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some success message'), selectComponent);
    await page.waitFor(50);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toBeNull();
    expect(await getAttributeFromHandle(await getSelect(), 'aria-label')).toEqual('Some label. Some success message');

    await page.evaluate(el => el.setAttribute('state', 'none'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', ''), selectComponent);
    await page.waitFor(50);

    expect(await getMessage()).toBeNull();
    expect(await getAttributeFromHandle(await getSelect(), 'aria-label')).toEqual('Some label');
  });

  it('should focus select when label text is clicked', async () => {
    await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`);

    const labelText = await selectNode('p-select-wrapper >>> .p-select-wrapper__label-text');
    expect(labelText).toBeDefined();

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
    await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`);

    const getFakeSelect = () => selectNode('p-select-wrapper >>> .p-select-wrapper__fake-select');
    const getSelect = await selectNode('select');

    expect(await getClassFromHandle(await getFakeSelect())).not.toContain('p-select-wrapper__fake-select--disabled');

    await page.evaluate(el => el.setAttribute('disabled', 'true'), getSelect);
    await page.waitFor(50);

    expect(await getClassFromHandle(await getFakeSelect())).toContain('p-select-wrapper__fake-select--disabled');

    await page.evaluate(el => el.removeAttribute('disabled'), getSelect);
    await page.waitFor(50);

    expect(await getClassFromHandle(await getFakeSelect())).not.toContain('p-select-wrapper__fake-select--disabled');
  });

  describe('hover state', () => {

    const getFakeSelect = () => selectNode('p-select-wrapper >>> .p-select-wrapper__fake-select');

    it('should change box-shadow color when fake select is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

      const fakeSelect = await getFakeSelect();
      const initialBoxShadow = await getBoxShadow(fakeSelect);

      await fakeSelect.hover();

      expect(await getBoxShadow(fakeSelect, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake select when label text is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

      const fakeSelect = await getFakeSelect();
      const labelText = await selectNode('p-select-wrapper >>> .p-select-wrapper__label-text');
      const initialBoxShadow = await getBoxShadow(fakeSelect);

      await labelText.hover();

      expect(await getBoxShadow(fakeSelect, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });
  });
});
