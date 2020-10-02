import {
  getAttribute,
  getBrowser,
  getCssClasses,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';

describe('select-wrapper', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getSelectHost = () => selectNode(page, 'p-select-wrapper');
  const getSelectFakeInput = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-select');
  const getSelectRealInput = () => selectNode(page, 'p-select-wrapper select');
  const getSelectMessage = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__message');
  const getSelectLabel = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__label');

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `
    );

    const el = await getSelectFakeInput();
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `
    );
    const select = await getSelectRealInput();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label" description="Some description">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `
    );
    const select = await getSelectRealInput();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `
    );
    const select = await getSelectRealInput();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper>
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );

    const selectComponent = await getSelectHost();
    const getLabelText = await getSelectLabel();

    expect(getLabelText).toBeNull();

    await page.evaluate((el) => el.setAttribute('label', 'Some label'), selectComponent);
    expect(getLabelText).toBeDefined();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );

    const selectComponent = await getSelectHost();
    const select = await getSelectRealInput();

    expect(await getSelectMessage()).toBeNull();

    await page.evaluate((el) => el.setAttribute('state', 'error'), selectComponent);
    await page.evaluate((el) => el.setAttribute('message', 'Some error message'), selectComponent);
    await waitForStencilLifecycle(page);

    expect(await getSelectMessage()).toBeDefined();
    expect(await getAttribute(await getSelectMessage(), 'role')).toEqual('alert');
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label. Some error message');

    await page.evaluate((el) => el.setAttribute('state', 'success'), selectComponent);
    await page.evaluate((el) => el.setAttribute('message', 'Some success message'), selectComponent);
    await waitForStencilLifecycle(page);

    expect(await getSelectMessage()).toBeDefined();
    expect(await getAttribute(await getSelectMessage(), 'role')).toBeNull();
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label. Some success message');

    await page.evaluate((el) => el.setAttribute('state', 'none'), selectComponent);
    await page.evaluate((el) => el.setAttribute('message', ''), selectComponent);
    await waitForStencilLifecycle(page);

    expect(await getSelectMessage()).toBeNull();
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label');
  });

  it('should focus select when label text is clicked', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`
    );

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
    await setContentWithDesignSystem(
      page,
      `<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`
    );

    const fakeSelect = await getSelectFakeInput();
    const select = await getSelectRealInput();

    expect(await getCssClasses(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => (el.disabled = true));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeSelect)).toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => (el.disabled = false));
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');
  });
});
