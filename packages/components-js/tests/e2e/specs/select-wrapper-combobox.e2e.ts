import {
  addEventListener,
  getAttribute,
  getBrowser,
  getCssClasses,
  getElementStyle,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';

fdescribe('select-wrapper combobox', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getSelectRealInput = () => selectNode(page, 'p-select-wrapper select');
  const getSelectLabel = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__label');
  const getSelectOptionList = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option-list');

  const getSelectedValue = async () => await page.evaluate(() => {
    const index = document.querySelector('select').selectedIndex;
    const options = document.querySelectorAll('option');
    return options[index].textContent;
  });

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
    <p-select-wrapper label="Some label" filter="true">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b" disabled>Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`
    );

    const fakeOptionList = await getSelectOptionList();
    const fakeOptionFilter = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');
    const fakeOptionSelected = await selectNode(
      page,
      'p-select-wrapper >>> .p-select-wrapper__fake-option--selected'
    );
    const activeDescendant = await getAttribute(fakeOptionFilter, 'aria-activedescendant');
    const selectedDescendantId = (await getProperty(fakeOptionSelected, 'id')) as string;

    expect(fakeOptionList).not.toBeNull();
    expect(fakeOptionFilter).not.toBeNull();
    expect(activeDescendant).toEqual(selectedDescendantId);
  });

  it('should focus filter when label text is clicked', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-select-wrapper label="Some label" filter="true">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );

    const labelText = await getSelectLabel();
    const filterInput = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');
    let afterFocusCalls = 0;
    await addEventListener(filterInput, 'focus', () => afterFocusCalls++);

    expect(afterFocusCalls).toBe(0);
    await labelText.click();
    await waitForStencilLifecycle(page);
    expect(afterFocusCalls).toBe(1);
  });

  it('should focus filter when tab key is pressed', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-select-wrapper label="Some label" filter="true">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );

    const filterInput = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');
    let afterFocusCalls = 0;
    await addEventListener(filterInput, 'focus', () => afterFocusCalls++);

    expect(afterFocusCalls).toBe(0);
    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(afterFocusCalls).toBe(1);
  });

  it('should open flyout, filter "B" if "b" is entered and select it', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-select-wrapper label="Some label" filter="true">
        <select name="some-name">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>
      </p-select-wrapper>`
    );

    const select = await getSelectRealInput();
    const filterInput = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');
    const getOpacity = async () => await getElementStyle(await getSelectOptionList(), 'opacity');

    await filterInput.type('b');
    await waitForStencilLifecycle(page);

    const hidden = await page.evaluate(() => {
      const root = document.querySelector('p-select-wrapper');
      return Array.from(root.shadowRoot.querySelectorAll('.p-select-wrapper__fake-option--hidden'));
    });

    const visibleElement = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option:not(.p-select-wrapper__fake-option--hidden)');
    const visibleElementClasses = await getCssClasses(visibleElement);

    expect(await getOpacity()).toBe('1');
    expect(hidden.length).toBe(2);
    expect(visibleElementClasses).not.toContain('p-select-wrapper__fake-option--hidden');

    await filterInput.press('Enter');
    const value = await getProperty(select, 'value');

    expect(value).toBe('b');
  });

  it('should show "---" if filter value has no match', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-select-wrapper label="Some label" filter="true">
        <select name="some-name">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>
      </p-select-wrapper>`
    );

    const filterInput = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');

    await filterInput.type('d');
    await waitForStencilLifecycle(page);

    const hidden = await page.evaluate(() => {
      const root = document.querySelector('p-select-wrapper');
      return Array.from(root.shadowRoot.querySelectorAll('.p-select-wrapper__fake-option--hidden'));
    });

    const errorOption = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option > span');
    const errorOptionValue = await errorOption.evaluate( (el) => el.textContent);

    expect(hidden.length).toBe(0);
    expect(errorOptionValue).toBe('---');
  });

  it('should add valid selection as placeholder on enter', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-select-wrapper label="Some label" filter="true">
        <select name="some-name">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>
      </p-select-wrapper>`
    );

    const filterInput = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');
    const fakeOptionInPosTwo = await selectNode(
      page,
      'p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(3)'
    );

    await filterInput.type('B');
    await filterInput.press('Enter');
    await waitForStencilLifecycle(page);

    const filterPlaceholder = await filterInput.evaluate((el) => {
      return el.getAttribute('placeholder');
    });

    expect(await getSelectedValue()).toBe('B');
    expect(await getSelectedValue()).toEqual(filterPlaceholder);

  });

  it('should add valid selection as placeholder on click', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-select-wrapper label="Some label" filter="true">
        <select name="some-name">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
        </select>
      </p-select-wrapper>`
    );

    const filterInput = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');
    const fakeOptionInPosTwo = await selectNode(
      page,
      'p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(2)'
    );

    await filterInput.click();
    await fakeOptionInPosTwo.click();
    await waitForStencilLifecycle(page);

    const filterPlaceholder = await filterInput.evaluate((el) => {
      return el.getAttribute('placeholder');
    });

    expect(await getSelectedValue()).toBe('B');
    expect(await getSelectedValue()).toEqual(filterPlaceholder);

  });
});
