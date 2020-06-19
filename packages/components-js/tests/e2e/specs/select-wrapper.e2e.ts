import {
  getAttribute,
  getCssClasses,
  getElementPosition,
  getElementStyle,
  getProperty,
  selectNode,
  setContentWithDesignSystem, waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';
import { getBrowser } from '../helpers/setup';
import { devices } from 'puppeteer';

describe('select-wrapper', () => {

  let page: Page;

  beforeEach(async () => page = await getBrowser().newPage());
  afterEach(async () => await page.close());

  const getSelectHost = () => selectNode(page, 'p-select-wrapper');
  const getSelectFakeInput = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-select');
  const getSelectRealInput = () => selectNode(page, 'p-select-wrapper select');
  const getSelectMessage = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__message');
  const getSelectLabel = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__label-text');
  const getSelectOptionList = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option-list');

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

    const el = await getSelectFakeInput();
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
    const select = await getSelectRealInput();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label');
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
    const select = await getSelectRealInput();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some description');
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
    const select = await getSelectRealInput();
    expect(await getProperty(select, 'ariaLabel')).toBe('Some label. Some error message');
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

    const selectComponent = await getSelectHost();
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

    const selectComponent = await getSelectHost();
    const select = await getSelectRealInput();

    expect(await getSelectMessage()).toBeNull();

    await page.evaluate(el => el.setAttribute('state', 'error'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some error message'), selectComponent);
    await waitForStencilLifecycle(page);

    expect(await getSelectMessage()).toBeDefined();
    expect(await getAttribute(await getSelectMessage(), 'role')).toEqual('alert');
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label. Some error message');

    await page.evaluate(el => el.setAttribute('state', 'success'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some success message'), selectComponent);
    await waitForStencilLifecycle(page);

    expect(await getSelectMessage()).toBeDefined();
    expect(await getAttribute(await getSelectMessage(), 'role')).toBeNull();
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label. Some success message');

    await page.evaluate(el => el.setAttribute('state', 'none'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', ''), selectComponent);
    await waitForStencilLifecycle(page);

    expect(await getSelectMessage()).toBeNull();
    expect(await getProperty(select, 'ariaLabel')).toEqual('Some label');
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

    const fakeSelect = await getSelectFakeInput();
    const select = await getSelectRealInput();

    expect(await getCssClasses(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => el.disabled = true);
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeSelect)).toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => el.disabled = false);
    await waitForStencilLifecycle(page);

    expect(await getCssClasses(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');
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

      const fakeSelect = await getSelectFakeInput();
      const initialBoxShadow = await getElementStyle(fakeSelect, 'boxShadow');

      await fakeSelect.hover();

      expect(await getElementStyle(fakeSelect, 'boxShadow', {waitForTransition: true})).not.toBe(initialBoxShadow);
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

      const fakeSelect = await getSelectFakeInput();
      const labelText = await getSelectLabel();
      const initialBoxShadow = await getElementStyle(fakeSelect, 'boxShadow');

      await labelText.hover();

      expect(await getElementStyle(fakeSelect, 'boxShadow', {waitForTransition: true})).not.toBe(initialBoxShadow);
    });
  });

  describe('fake drop down', () => {
    it('should render', async () => {
      await setContentWithDesignSystem(page, `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b" disabled>Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

      const fakeOptionList = await getSelectOptionList();
      const fakeOptionDisabled = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option--disabled');
      const fakeOptionSelected = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option--selected');
      const activeDescendant = await getAttribute(fakeOptionList, 'aria-activedescendant');
      const selectedDescendantId = await getProperty(fakeOptionSelected, 'id');

      expect(fakeOptionList).not.toBeNull();
      expect(fakeOptionDisabled).not.toBeNull();
      expect(await getElementPosition(fakeOptionList, '[aria-selected=true]')).toBe(0);
      expect(await getElementPosition(fakeOptionList, '[aria-disabled=true]')).toBe(1);
      expect(activeDescendant).toEqual(selectedDescendantId);
    });

    it('should not render if touch support is detected', async () => {
      await page.emulate(devices['iPhone X']);
      await setContentWithDesignSystem(page, `
        <p-select-wrapper label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>
      `);
      const fakeOptionList = await getSelectOptionList();
      expect(fakeOptionList).toBeNull();
    });

    it('should be visible if select is clicked and hidden if clicked outside', async () => {
      await setContentWithDesignSystem(page, `
      <p-text>Some text</p-text>
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
      const select = await getSelectRealInput();
      const text = await selectNode(page, 'p-text');
      const fakeOptionList = await getSelectOptionList();
      const getOpacity = () => getElementStyle(fakeOptionList, 'opacity');

      expect(await getOpacity()).toBe('0');

      await select.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1');

      await text.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');

      await select.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1');

      await select.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
    });

    it('should add fake option item if added to native select programmatically', async () => {
      await setContentWithDesignSystem(page, `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
      const select = await getSelectRealInput();
      const fakeOptionList = await getSelectOptionList();
      const numberOfOptions = await select.evaluate((el: HTMLElement) => {
        return el.childElementCount;
      });
      const numberOfFakeOptions = await fakeOptionList.evaluate((el: HTMLElement) => {
        return el.childElementCount;
      });
      expect(fakeOptionList).not.toBeNull();
      expect(numberOfFakeOptions).toEqual(numberOfOptions);

      await select.evaluate((el: HTMLSelectElement) => {
        const option = document.createElement('option');
        option.text = 'Test';
        el.add(option, 0);
      });
      const text = await getProperty(await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option:first-child'), 'innerHTML');
      expect(text).toContain('Test');
      expect(numberOfFakeOptions + 1).toEqual(numberOfOptions + 1);
    });

    it('should add/remove disabled state to fake option item if added/removed to native select programmatically', async () => {
      await setContentWithDesignSystem(page, `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
      const select = await getSelectRealInput();
      const fakeOptionList = async () => await getSelectOptionList();
      const fakeOption = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(2)');

      await select.evaluate((el: HTMLSelectElement) => (el.options[1].disabled = true));
      await waitForStencilLifecycle(page);

      expect(await getCssClasses(fakeOption)).toContain('p-select-wrapper__fake-option--disabled');
      expect(await getElementPosition(await fakeOptionList(), '.p-select-wrapper__fake-option--disabled')).toBe(1);
    });

    it('should handle keyboard and click events', async () => {
      await setContentWithDesignSystem(page, `
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">A Option</option>
          <option value="b">B Option</option>
          <option value="c" disabled>C Option</option>
          <option value="d">D Option</option>
          <option value="e">E Option</option>
        </select>
      </p-select-wrapper>
    `);

      const select = await getSelectRealInput();
      const fakeOptionInPosOne = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(2)');
      const activeDescendant = async () =>
        await getAttribute(await getSelectOptionList(), 'aria-activedescendant');
      const getOpacity = async () => await getElementStyle(await getSelectOptionList(), 'opacity');
      const selectHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('select'));
      const getSelectedIndex = () =>
        page.evaluate(() => {
          return document.querySelector('select').selectedIndex;
        });

      // initial status of highlight and selected fake option
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(0);

      // 1 x arrow down and enter
      await page.keyboard.press('Tab');
      await select.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1');
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(1);
      expect(await getSelectedIndex()).toBe(0);

      await select.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(1);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(1);
      expect(await getElementPosition(await getSelectOptionList(), '[aria-selected=true]')).toBe(1);
      expect(await getSelectedIndex()).toBe(1);
      expect(await activeDescendant()).toEqual(
        `option-${await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')}`
      );

      // 1 x arrow down and 1x arrow up should jump over disabled fake option
      await select.press('ArrowDown');
      await waitForStencilLifecycle(page);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(3);
      await select.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(1);

      // 2 x arrow up
      await select.press('ArrowUp');
      await waitForStencilLifecycle(page);
      await select.press('ArrowUp');
      await waitForStencilLifecycle(page);
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1');
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(4);

      // 1 x arrow down
      await select.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(0);

      // Space
      await select.press(' ');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(0);
      expect(await getSelectedIndex()).toBe(0);

      // 1 x arrow left while list is hidden
      await select.press('ArrowLeft');
      await waitForStencilLifecycle(page);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(4);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(4);
      expect(await getSelectedIndex()).toBe(4);

      // 1 x arrow right while list is hidden
      await select.press('ArrowRight');
      await waitForStencilLifecycle(page);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(0);
      expect(await getSelectedIndex()).toBe(0);

      // 1 x arrow left while list is visible
      await select.press(' ');
      await select.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(4);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(4);
      expect(await getSelectedIndex()).toBe(4);

      // 1 x arrow right while list is visible
      await select.press(' ');
      await select.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(0);
      expect(await getSelectedIndex()).toBe(0);

      // 1 x arrow down + ESC
      await select.press('ArrowDown');
      await waitForStencilLifecycle(page);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(1);
      await select.press('Escape');
      await waitForStencilLifecycle(page);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(0);
      expect(await getSelectedIndex()).toBe(0);
      expect(await getOpacity()).toBe('0');

      // PageDown while list is hidden
      await select.press('PageDown');
      await waitForStencilLifecycle(page);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(0);
      expect(await getSelectedIndex()).toBe(0);

      // PageDown while list is visible
      await select.press(' ');
      await waitForStencilLifecycle(page);
      await select.press('PageDown');
      await waitForStencilLifecycle(page);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(4);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(0);
      expect(await getSelectedIndex()).toBe(0);
      await select.press(' ');
      await waitForStencilLifecycle(page);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(4);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(4);
      expect(await getSelectedIndex()).toBe(4);
      await select.press('Escape');
      await waitForStencilLifecycle(page);

      // PageUp while list is hidden
      await select.press('PageUp');
      await waitForStencilLifecycle(page);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(4);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(4);
      expect(await getSelectedIndex()).toBe(4);

      // PageUp while list is visible
      await select.press(' ');
      await select.press('PageUp');
      await waitForStencilLifecycle(page);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(4);
      expect(await getSelectedIndex()).toBe(4);
      await select.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');

      // Search for string and select it
      await select.press('d');
      await page.waitFor(120);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(3);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(3);
      expect(await getSelectedIndex()).toBe(3);

      // Click on select while list is hidden
      await select.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1');

      // Click on select while list is visible
      await select.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');

      // Click on select and click on 2nd option
      await select.click();
      await fakeOptionInPosOne.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted')).toBe(1);
      expect(await getElementPosition(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected')).toBe(1);
      expect(await getSelectedIndex()).toBe(1);

      // Tab while list is visible
      await select.press(' ');
      await select.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
      expect(await selectHasFocus()).toBe(false);
    });
  });
});
