import {
  addEventListener,
  getAttribute,
  getBrowser,
  getCssClasses,
  getElementIndex,
  getElementStyle,
  getProperty, getStyleOnFocus,
  initAddEventListener,
  selectNode, setAttribute,
  setContentWithDesignSystem, expectedStyleOnFocus,
  waitForStencilLifecycle
} from '../helpers';
import { devices, Page } from 'puppeteer';

describe('select-wrapper combobox', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getSelectHost = () => selectNode(page, 'p-select-wrapper');
  const getSelectRealInput = () => selectNode(page, 'p-select-wrapper select');
  const selectFilter = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');
  const selectFilterOverlay = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input + span');
  const getSelectLabel = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__label');
  const getSelectOptionList = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option-list');
  const getSelectedText = async () => await page.evaluate(() => {
    const index = document.querySelector('select').selectedIndex;
    const options = document.querySelectorAll('option');
    return options[index].textContent;
  });
  const getChangedBoxShadow = async () => await getElementStyle(await selectFilterOverlay(), 'boxShadow', { waitForTransition: true })
  const getOpacity = async () => await getElementStyle(await getSelectOptionList(), 'opacity');
  const hidden = async () =>
    await page.evaluate(() => {
      const root = document.querySelector('p-select-wrapper');
      return Array.from(root.shadowRoot.querySelectorAll('.p-select-wrapper__fake-option--hidden')).length;
    });

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-select-wrapper label="Some label" filter="true">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b" disabled>Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );

    const fakeOptionList = await getSelectOptionList();
    const fakeOptionSelected = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option--selected');
    const activeDescendant = await getAttribute(await selectFilter(), 'aria-activedescendant');
    const selectedDescendantId = (await getProperty(fakeOptionSelected, 'id')) as string;

    const filterInput = await selectFilter();
    const filterPlaceholder = await filterInput.evaluate((el) => {
      return el.getAttribute('placeholder');
    });

    expect(await getSelectedText()).toEqual(filterPlaceholder);
    expect(fakeOptionList).not.toBeNull();
    expect(await selectFilter()).not.toBeNull();
    expect(activeDescendant).toEqual(selectedDescendantId);
  });

  it('should render custom dropdown if touch support is detected', async () => {
    await page.emulate(devices['iPhone X']);
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
    const fakeOptionList = await getSelectOptionList();
    expect(fakeOptionList).not.toBeNull();
  });

  it('should render custom dropdown even if native prop is set to true', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-select-wrapper label="Some label" filter="true" native="true">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );
    const fakeOptionList = await getSelectOptionList();
    expect(fakeOptionList).not.toBeNull();
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
    const filterInput = await selectFilter();
    let afterFocusCalls = 0;
    await addEventListener(filterInput, 'focus', () => afterFocusCalls++);

    expect(afterFocusCalls).toBe(0);
    await labelText.click();
    await waitForStencilLifecycle(page);
    expect(afterFocusCalls).toBe(1);
  });

  it('should change box-shadow color when filter input is hovered', async () => {
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

    const filterInputOverlay = await selectFilterOverlay();
    const initialBoxShadow = await getElementStyle(filterInputOverlay, 'boxShadow');

    await filterInputOverlay.hover();

    expect(await getChangedBoxShadow()).not.toBe(initialBoxShadow);
  });

  it('should change box-shadow color of filter input when label text is hovered', async () => {
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

    const filterInputOverlay = await selectFilterOverlay();
    const labelText = await getSelectLabel();
    const initialBoxShadow = await getElementStyle(filterInputOverlay, 'boxShadow');

    await labelText.hover();

    expect(await getChangedBoxShadow()).not.toBe(initialBoxShadow);
  });

  it('should make fake option list visible if filter input is clicked and hidden if clicked outside', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-text>Some text</p-text>
      <p-select-wrapper label="Some label" filter="true">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );
    const filterInput = await selectFilter();
    const text = await selectNode(page, 'p-text');

    expect(await getOpacity()).toBe('0');

    await filterInput.click();
    await waitForStencilLifecycle(page);

    expect(await getOpacity()).toBe('1');

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getOpacity()).toBe('0');

    await filterInput.click();
    await waitForStencilLifecycle(page);

    expect(await getOpacity()).toBe('1');

    await filterInput.click();
    await waitForStencilLifecycle(page);

    expect(await getOpacity()).toBe('0');
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

    const filterInput = await selectFilter();
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
    const filterInput = await selectFilter();

    await filterInput.type('b');
    await waitForStencilLifecycle(page);

    const visibleElement = await selectNode(
      page,
      'p-select-wrapper >>> .p-select-wrapper__fake-option:not(.p-select-wrapper__fake-option--hidden)'
    );
    const visibleElementClasses = await getCssClasses(visibleElement);

    expect(await getOpacity()).toBe('1');
    expect(await hidden()).toBe(2);
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

    const filterInput = await selectFilter();

    await filterInput.type('d');
    await waitForStencilLifecycle(page);

    const errorOption = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option > span');
    const errorOptionValue = await errorOption.evaluate((el) => el.textContent);

    expect(await hidden()).toBe(0);
    expect(errorOptionValue).toBe('---');
  });

  it('should clear input value on click outside', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-text>Some text</p-text>
      <p-select-wrapper label="Some label" filter="true">
        <select name="some-name" id="realSelect">
          <option value="a">A Option</option>
          <option value="b">B Option</option>
          <option value="c">C Option</option>
        </select>
      </p-select-wrapper>
    `
    );

    const filterInput = await selectFilter();
    const text = await selectNode(page, 'p-text');

    await filterInput.type('x');
    await waitForStencilLifecycle(page);

    const value = () => getProperty(filterInput, 'value');

    expect(await value()).toBe('x');

    await text.click();

    expect(await value()).toBe('');
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

    const filterInput = await selectFilter();

    await filterInput.type('B');
    await filterInput.press('Enter');
    await waitForStencilLifecycle(page);

    const filterPlaceholder = await filterInput.evaluate((el) => {
      return el.getAttribute('placeholder');
    });

    expect(await getSelectedText()).toBe('B');
    expect(await getSelectedText()).toEqual(filterPlaceholder);
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

    const filterInput = await selectFilter();
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

    expect(await getSelectedText()).toBe('B');
    expect(await getSelectedText()).toEqual(filterPlaceholder);
  });

  it('should set dropdown direction to up', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-select-wrapper label="Some label" filter="true" dropdown-direction="up">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b" disabled>Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`
    );

    const fakeOptionListDirectionUp = await selectNode(
      page,
      'p-select-wrapper >>> .p-select-wrapper__fake-option-list--direction-up'
    );

    expect(fakeOptionListDirectionUp).not.toBeNull();
  });

  it('should auto position dropdown to top if bottom space is less than dropdown height', async () => {
    await page.setViewport({
      width: 800,
      height: 600
    });
    await setContentWithDesignSystem(
      page,
      `<div style="height: 400px;"></div>
      <p-select-wrapper label="Some label" filter="true" dropdown-direction="auto">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b" disabled>Option B</option>
          <option value="c">Option C</option>
          <option value="d">Option D</option>
          <option value="e">Option E</option>
          <option value="f">Option F</option>
          <option value="g">Option G</option>
          <option value="h">Option H</option>
        </select>
      </p-select-wrapper>`
    );

    const filterInput = await selectFilter();
    await filterInput.click();
    await waitForStencilLifecycle(page);

    const fakeOptionListDirectionUp = await selectNode(
      page,
      'p-select-wrapper >>> .p-select-wrapper__fake-option-list--direction-up'
    );

    expect(fakeOptionListDirectionUp).not.toBeNull();
  });

  describe('keyboard and click events', () => {
    const getFakeOptionInPosOne = async () =>
      await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(2)');
    const getActiveDescendant = async () => await getAttribute(await selectFilter(), 'aria-activedescendant');
    const getSelectedIndex = () =>
      page.evaluate(() => {
        return document.querySelector('select').selectedIndex;
      });
    const getHighlightedFakeOption = async () =>
      await getElementIndex(await getSelectOptionList(), '.p-select-wrapper__fake-option--highlighted');
    const getSelectedFakeOption = async () =>
      await getElementIndex(await getSelectOptionList(), '.p-select-wrapper__fake-option--selected');

    it('should focus filter input on tab', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );

      const filterInput = await selectFilter();
      let afterFocusCalls = 0;
      await addEventListener(filterInput, 'focus', () => afterFocusCalls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(afterFocusCalls).toBe(1);
    });

    it('should highlight first position on arrow down', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      const select = await getSelectRealInput();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      expect(await getHighlightedFakeOption()).toBe(0);
      expect(await getSelectedFakeOption()).toBe(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1');
      expect(await getHighlightedFakeOption()).toBe(1);
      expect(await getSelectedIndex()).toBe(0);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
      expect(await getHighlightedFakeOption()).toBe(1);
      expect(await getSelectedFakeOption()).toBe(1);
      expect(await getElementIndex(await getSelectOptionList(), '[aria-selected=true]')).toBe(1);
      expect(await getSelectedIndex()).toBe(1);

      expect(calls).toBe(1);
      expect(await getActiveDescendant()).toEqual(`option-${await getSelectedFakeOption()}`);
    });

    it('should skip disabled option on arrow down', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name">
            <option value="a">A Option</option>
            <option value="b" disabled>B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(2);
    });

    it('should skip disabled option on arrow up', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b" disabled>B Option</option>
            <option value="c" selected>C Option</option>
          </select>
        </p-select-wrapper>`
      );
      await waitForStencilLifecycle(page);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(0);
    });

    it('should highlight correct position on multiple key actions', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b" disabled>B Option</option>
            <option value="c">C Option</option>
            <option value="d">D Option</option>
            <option value="e">E Option</option>
          </select>
        </p-select-wrapper>`
      );
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1');
      expect(await getHighlightedFakeOption()).toBe(3);

      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(2);
    });

    it('should open fake select with spacebar', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      const select = await getSelectRealInput();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      expect(await getOpacity()).toBe('0');

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      expect(await getOpacity()).toBe('1');
      expect(calls).toBe(0);
    });

    it('should not select highlighted option with spacebar an fake option list should stay open', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );

      const select = await getSelectRealInput();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      expect(await getOpacity()).toBe('1');
      expect(calls).toBe(0);
    });

    it('should change selected option on ArrowLeft while list is hidden', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      const select = await getSelectRealInput();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(2);
      expect(await getSelectedFakeOption()).toBe(2);
      expect(await getSelectedIndex()).toBe(2);
      expect(calls).toBe(1);
    });

    it('should change selected option on ArrowRight while list is hidden', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      const select = await getSelectRealInput();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(1);
      expect(await getSelectedFakeOption()).toBe(1);
      expect(await getSelectedIndex()).toBe(1);
      expect(calls).toBe(1);
    });

    it('should change selected option on ArrowLeft while list is open and should close the list', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      const select = await getSelectRealInput();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(2);
      expect(await getSelectedFakeOption()).toBe(2);
      expect(await getSelectedIndex()).toBe(2);
      expect(await getOpacity()).toBe('0');
      expect(calls).toBe(1);
    });

    it('should change selected option on ArrowRight while list is open and should close the list', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      const select = await getSelectRealInput();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(1);
      expect(await getSelectedFakeOption()).toBe(1);
      expect(await getSelectedIndex()).toBe(1);
      expect(await getOpacity()).toBe('0');
      expect(calls).toBe(1);
    });

    it('should not select option on Escape', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);
      expect(await getHighlightedFakeOption()).toBe(1);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(0);
      expect(await getSelectedFakeOption()).toBe(0);
      expect(await getSelectedIndex()).toBe(0);
      expect(await getOpacity()).toBe('0');
    });

    it('should not select option on PageDown while list is hidden', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(0);
      expect(await getSelectedFakeOption()).toBe(0);
      expect(await getSelectedIndex()).toBe(0);
    });

    it('should not select option on PageUp while list is hidden', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(0);
      expect(await getSelectedFakeOption()).toBe(0);
      expect(await getSelectedIndex()).toBe(0);
    });

    it('should highlight and select last option on PageDown while list is visible', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(2);
      expect(await getSelectedFakeOption()).toBe(0);
      expect(await getSelectedIndex()).toBe(0);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(2);
      expect(await getSelectedFakeOption()).toBe(2);
      expect(await getSelectedIndex()).toBe(2);
    });

    it('should highlight and select first option on PageUp while list is visible', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c" selected>C Option</option>
          </select>
        </p-select-wrapper>`
      );
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(0);
      expect(await getSelectedFakeOption()).toBe(2);
      expect(await getSelectedIndex()).toBe(2);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(0);
      expect(await getSelectedFakeOption()).toBe(0);
      expect(await getSelectedIndex()).toBe(0);
    });

    it('should open/close fake select on mouseclick', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      const filterInput = await selectFilter();

      await filterInput.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1');
      expect(await getHighlightedFakeOption()).toBe(0);

      await filterInput.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
      expect(await getHighlightedFakeOption()).toBe(0);
    });

    it('should select second option on mouseclick', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      const filterInput = await selectFilter();
      const fakeOptionInPosOne = await getFakeOptionInPosOne();

      await filterInput.click();
      await fakeOptionInPosOne.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
      expect(await getHighlightedFakeOption()).toBe(1);
      expect(await getSelectedFakeOption()).toBe(1);
      expect(await getSelectedIndex()).toBe(1);
    });

    it('should close fakeSelect on Tab', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-select-wrapper label="Some label" filter="true">
          <select name="some-name" id="realSelect">
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );

      const filterInput = await selectFilter();
      let afterBlurCalls = 0;
      await addEventListener(filterInput, 'blur', () => afterBlurCalls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1');

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0');
      expect(afterBlurCalls).toBe(1);
    });
  });

  describe('focus state', () => {
    it('should show outline of slotted <select> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-select-wrapper filter="true">
          <select>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>`
      );

      const host = await getSelectHost();
      const filterInput = await selectFilter();
      const filterInputOverlay = await selectFilterOverlay();

      await filterInput.focus();

      expect(await getStyleOnFocus(filterInputOverlay)).toBe(expectedStyleOnFocus({color: 'neutral', offset: '2px'}));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(filterInputOverlay)).toBe(expectedStyleOnFocus({color: 'success', offset: '2px'}));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(filterInputOverlay)).toBe(expectedStyleOnFocus({color: 'error', offset: '2px'}));

      await setAttribute(host, 'theme', 'dark');

      await setAttribute(host, 'state', 'none');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(filterInputOverlay)).toBe(expectedStyleOnFocus({color: 'neutral', theme: 'dark', offset: '2px'}));

      await setAttribute(host, 'state', 'success');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(filterInputOverlay)).toBe(expectedStyleOnFocus({color: 'success', theme: 'dark', offset: '2px'}));

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(filterInputOverlay)).toBe(expectedStyleOnFocus({color: 'error', theme: 'dark', offset: '2px'}));
    });
  });
});
