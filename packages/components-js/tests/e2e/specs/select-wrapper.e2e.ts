import {
  getAttributeFromHandle,
  getBoxShadow,
  getClassFromHandle,
  selectNode,
  setContentWithDesignSystem,
  waitForInnerHTMLChange,
  waitForSelector
} from '../helpers';
import { Page } from 'puppeteer';
import { getBrowser } from '../helpers/setup';

describe('select-wrapper', () => {
  let page: Page;
  beforeEach(async () => page = await getBrowser().newPage());
  afterEach(async () => await page.close());

  const getFakeSelect = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-select');
  const getSelectMessage = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__message');
  const getSelectLabel = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__label-text');

  it('should render', async () => {
    await setContentWithDesignSystem(page, `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);

    const el = await getFakeSelect();
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(page, `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode(page, 'p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(page, `
      <p-select-wrapper label="Some label" description="Some description">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode(page, 'p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(page, `
      <p-select-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode(page, 'p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(page, `
      <p-select-wrapper>
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

    const selectComponent = await selectNode(page, 'p-select-wrapper');
    const getLabelText = await getSelectLabel();

    expect(getLabelText).toBeNull();

    await page.evaluate(el => el.setAttribute('label', 'Some label'), selectComponent);
    expect(getLabelText).toBeDefined();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(page, `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

    const selectComponent = await selectNode(page, 'p-select-wrapper');
    const select = await selectNode(page, 'select');

    expect(await getSelectMessage()).toBeNull();

    await page.evaluate(el => el.setAttribute('state', 'error'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some error message'), selectComponent);
    await waitForInnerHTMLChange(page, selectComponent);

    expect(await getSelectMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getSelectMessage(), 'role')).toEqual('alert');
    expect(await getAttributeFromHandle(select, 'aria-label')).toEqual('Some label. Some error message');

    await page.evaluate(el => el.setAttribute('state', 'success'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some success message'), selectComponent);
    await waitForInnerHTMLChange(page, selectComponent);

    expect(await getSelectMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getSelectMessage(), 'role')).toBeNull();
    expect(await getAttributeFromHandle(select, 'aria-label')).toEqual('Some label. Some success message');

    await page.evaluate(el => el.setAttribute('state', 'none'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', ''), selectComponent);
    await waitForInnerHTMLChange(page, selectComponent);

    expect(await getSelectMessage()).toBeNull();
    expect(await getAttributeFromHandle(select, 'aria-label')).toEqual('Some label');
  });

  it('should focus select when label text is clicked', async () => {
    await setContentWithDesignSystem(page, `<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`);

    const labelText = await getSelectLabel();
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
    await setContentWithDesignSystem(page, `<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`);

    const fakeSelect = await getFakeSelect();
    const select = await selectNode(page, 'select');

    expect(await getClassFromHandle(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => el.disabled = true);
    await waitForSelector(page, fakeSelect, 'p-select-wrapper__fake-select--disabled');

    expect(await getClassFromHandle(fakeSelect)).toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => el.disabled = false);
    await waitForSelector(page, fakeSelect, 'p-select-wrapper__fake-select--disabled', {isGone: true});

    expect(await getClassFromHandle(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');
  });

  describe('hover state', () => {

    it('should change box-shadow color when fake select is hovered', async () => {
      await setContentWithDesignSystem(page, `<p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

      const fakeSelect = await getFakeSelect();
      const initialBoxShadow = await getBoxShadow(fakeSelect);

      await fakeSelect.hover();

      const updatedBoxShadow = await getBoxShadow(fakeSelect, {waitForTransition: true});

      expect(updatedBoxShadow).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake select when label text is hovered', async () => {
      await setContentWithDesignSystem(page, `
        <p-select-wrapper label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`);

      const fakeSelect = await getFakeSelect();
      const labelText = await getSelectLabel();
      const initialBoxShadow = await getBoxShadow(fakeSelect);

      await labelText.hover();

      expect(await getBoxShadow(fakeSelect, {waitForTransition: true})).not.toBe(initialBoxShadow);
    });
  });
});
