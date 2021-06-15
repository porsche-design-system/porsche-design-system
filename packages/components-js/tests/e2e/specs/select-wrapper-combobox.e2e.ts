import {
  addEventListener,
  expectedStyleOnFocus,
  getAttribute,
  getBrowser,
  getCssClasses,
  getElementIndex,
  getElementStyle,
  getLifecycleStatus,
  getOutlineStyle,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';
import { devices, Page } from 'puppeteer';

describe('select-wrapper combobox', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-select-wrapper');
  const getSelect = () => selectNode(page, 'p-select-wrapper select');
  const getFilterInput = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input');
  const getFilterInputOverlay = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__filter-input + span');
  const getLabel = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__label');
  const getFakeOptionList = () => selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option-list');
  const getSelectedText = async () =>
    (await getSelect()).evaluate((el: HTMLSelectElement) => {
      const options = el.querySelectorAll('option');
      return options[el.selectedIndex].textContent;
    });
  const getChangedBoxShadow = async () =>
    getElementStyle(await getFilterInputOverlay(), 'boxShadow', { waitForTransition: true });
  const getOpacity = async () => getElementStyle(await getFakeOptionList(), 'opacity');
  const getHiddenOptionAmount = async () =>
    (await getHost()).evaluate((el) => {
      return Array.from(el.shadowRoot.querySelectorAll('.p-select-wrapper__fake-option--hidden')).length;
    });

  const initCombobox = (): Promise<void> => {
    return setContentWithDesignSystem(
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
  };

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

    const fakeOptionList = await getFakeOptionList();
    const fakeOptionSelected = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option--selected');
    const activeDescendant = await getAttribute(await getFilterInput(), 'aria-activedescendant');
    const selectedDescendantId = (await getProperty(fakeOptionSelected, 'id')) as string;

    const filterInput = await getFilterInput();
    const filterPlaceholder = await filterInput.evaluate((el) => {
      return el.getAttribute('placeholder');
    });

    expect(await getSelectedText()).toEqual(filterPlaceholder);
    expect(fakeOptionList).not.toBeNull();
    expect(await getFilterInput()).not.toBeNull();
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
    const fakeOptionList = await getFakeOptionList();
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
    const fakeOptionList = await getFakeOptionList();
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

    const labelText = await getLabel();
    const filterInput = await getFilterInput();
    let focusCalls = 0;
    await addEventListener(filterInput, 'focus', () => focusCalls++);

    expect(focusCalls).toBe(0);
    await labelText.click();
    await waitForStencilLifecycle(page);
    expect(focusCalls).toBe(1);
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

    const filterInputOverlay = await getFilterInputOverlay();
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

    const filterInputOverlay = await getFilterInputOverlay();
    const label = await getLabel();
    const initialBoxShadow = await getElementStyle(filterInputOverlay, 'boxShadow');

    await label.hover();

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
    const filterInput = await getFilterInput();
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

    const filterInput = await getFilterInput();
    let focusCalls = 0;
    await addEventListener(filterInput, 'focus', () => focusCalls++);

    expect(focusCalls).toBe(0);
    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(focusCalls).toBe(1);
  });

  it('should open flyout, filter results to "B" if "b" is entered and select it on ArrowDown', async () => {
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

    const select = await getSelect();
    const filterInput = await getFilterInput();

    await filterInput.type('b');
    await waitForStencilLifecycle(page);

    const visibleElement = await selectNode(
      page,
      'p-select-wrapper >>> .p-select-wrapper__fake-option:not(.p-select-wrapper__fake-option--hidden)'
    );
    const visibleElementClasses = await getCssClasses(visibleElement);

    expect(await getOpacity()).toBe('1');
    expect(await getHiddenOptionAmount()).toBe(2);
    expect(visibleElementClasses).not.toContain('p-select-wrapper__fake-option--hidden');

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    await waitForStencilLifecycle(page); // 🙈
    await filterInput.press('Enter');
    await waitForStencilLifecycle(page);
    await waitForStencilLifecycle(page); // 🙈
    const value = await select.evaluate((el: HTMLSelectElement) => el.value);

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

    const filterInput = await getFilterInput();

    await filterInput.type('d');
    await waitForStencilLifecycle(page);

    const errorOption = await selectNode(page, 'p-select-wrapper >>> .p-select-wrapper__fake-option > span');
    const errorOptionValue = await errorOption.evaluate((el) => el.textContent);

    expect(await getHiddenOptionAmount()).toBe(0);
    expect(errorOptionValue).toBe('---');
  });

  it('should clear input value and reset fake option list on click outside', async () => {
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

    const filterInput = await getFilterInput();
    const text = await selectNode(page, 'p-text');
    const fakeOptionList = await getFakeOptionList();
    const numberOfFakeOptions = () =>
      fakeOptionList.evaluate((el: HTMLElement) => {
        return el.querySelectorAll('.p-select-wrapper__fake-option').length;
      });

    expect(await numberOfFakeOptions()).toBe(3);

    await filterInput.type('x');
    await waitForStencilLifecycle(page);

    const getValue = () => getProperty(filterInput, 'value');

    expect(await getValue()).toBe('x');
    expect(await numberOfFakeOptions()).toBe(1);

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getValue()).toBe('');
    expect(await numberOfFakeOptions()).toBe(3);
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

    const filterInput = await getFilterInput();

    await filterInput.type('B');
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    await filterInput.press('Enter');
    await waitForStencilLifecycle(page);

    const filterPlaceholder = await getAttribute(filterInput, 'placeholder');

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

    const filterInput = await getFilterInput();
    const fakeOptionInPosTwo = await selectNode(
      page,
      'p-select-wrapper >>> .p-select-wrapper__fake-option:nth-child(2)'
    );

    await filterInput.click();
    await fakeOptionInPosTwo.click();
    await waitForStencilLifecycle(page);

    const filterPlaceholder = await getAttribute(filterInput, 'placeholder');

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
      height: 600,
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

    const filterInput = await getFilterInput();
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
    const getActiveDescendant = async () => await getAttribute(await getFilterInput(), 'aria-activedescendant');
    const getSelectedIndex = () =>
      page.evaluate(() => {
        return document.querySelector('select').selectedIndex;
      });
    const getHighlightedFakeOption = async () =>
      await getElementIndex(await getFakeOptionList(), '.p-select-wrapper__fake-option--highlighted');
    const getSelectedFakeOption = async () =>
      await getElementIndex(await getFakeOptionList(), '.p-select-wrapper__fake-option--selected');

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

      const filterInput = await getFilterInput();
      let focusCalls = 0;
      await addEventListener(filterInput, 'focus', () => focusCalls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(focusCalls).toBe(1, 'for focusCalls');
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
      const select = await getSelect();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1', 'for opacity');
      expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');
      expect(await getSelectedIndex()).toBe(0, 'for selected index');

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0', 'for opacity');
      expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(1, 'for selected fake option');
      expect(await getElementIndex(await getFakeOptionList(), '[aria-selected=true]')).toBe(1);
      expect(await getSelectedIndex()).toBe(1, 'for selected index');

      expect(calls).toBe(1, 'for calls');
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

      expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
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

      expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
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

      expect(await getOpacity()).toBe('1', 'for opacity');
      expect(await getHighlightedFakeOption()).toBe(3, 'for highlighted fake option');

      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
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
      const select = await getSelect();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      expect(await getOpacity()).toBe('0', 'for opacity');

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      expect(await getOpacity()).toBe('1', 'for opacity');
      expect(calls).toBe(0, 'for calls');
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

      const select = await getSelect();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      expect(await getOpacity()).toBe('1', 'for opacity');
      expect(calls).toBe(0, 'for calls');
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
      const select = await getSelect();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(2, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(2, 'for selected index');
      expect(calls).toBe(1, 'for calls');
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
      const select = await getSelect();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(1, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(1, 'for selected index');
      expect(calls).toBe(1, 'for calls');
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
      const select = await getSelect();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(2, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(2, 'for selected index');
      expect(await getOpacity()).toBe('0', 'for opacity');
      expect(calls).toBe(1, 'for calls');
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
      const select = await getSelect();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(1, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(1, 'for selected index');
      expect(await getOpacity()).toBe('0', 'for opacity');
      expect(calls).toBe(1, 'for calls');
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
      expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(0, 'for selected index');
      expect(await getOpacity()).toBe('0', 'for opacity');
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

      expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(0, 'for selected index');
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

      expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(0, 'for selected index');
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

      expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(0, 'for selected index');

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(2, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(2, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(2, 'for selected index');
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

      expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(2, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(2, 'for selected index');

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(0, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(0, 'for selected index');
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
      const filterInput = await getFilterInput();

      await filterInput.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1', 'for opacity');
      expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');

      await filterInput.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0', 'for opacity');
      expect(await getHighlightedFakeOption()).toBe(0, 'for highlighted fake option');
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
      const filterInput = await getFilterInput();
      const fakeOptionInPosOne = await getFakeOptionInPosOne();

      await filterInput.click();
      await fakeOptionInPosOne.click();
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0', 'for opacity');
      expect(await getHighlightedFakeOption()).toBe(1, 'for highlighted fake option');
      expect(await getSelectedFakeOption()).toBe(1, 'for selected fake option');
      expect(await getSelectedIndex()).toBe(1, 'for selected index');
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

      const filterInput = await getFilterInput();
      let blurCalls = 0;
      await addEventListener(filterInput, 'blur', () => blurCalls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('1', 'for opacity');

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getOpacity()).toBe('0', 'for opacity');
      expect(blurCalls).toBe(1, 'for blurCalls');
    });
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation and on click for shadow <input> filter', async () => {
      await initCombobox();

      const filterInput = await getFilterInput();
      const filterInputOverlay = await getFilterInputOverlay();
      const hidden = expectedStyleOnFocus({ color: 'transparent' });
      const visible = expectedStyleOnFocus({ color: 'neutral' });

      expect(await getOutlineStyle(filterInputOverlay)).toBe(hidden);

      await filterInput.click();

      expect(await getOutlineStyle(filterInputOverlay)).toBe(visible);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(filterInputOverlay)).toBe(visible);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initCombobox();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-select-wrapper']).toBe(1, 'componentDidLoad: p-select-wrapper');
      expect(status.componentDidLoad['p-icon']).toBe(2, 'componentDidLoad: p-icon'); // arrow down and checkmark

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips on filter input change', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-select-wrapper filter="true">
          <select>
            <option value="a">A Option</option>
            <option value="b">B Option</option>
            <option value="c">C Option</option>
          </select>
        </p-select-wrapper>`
      );
      const host = await getHost();

      await host.click();
      await waitForStencilLifecycle(page);

      await page.keyboard.press('c');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-select-wrapper']).toBe(2, 'componentDidUpdate: p-select-wrapper');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(2, 'componentDidUpdate: all');
    });
  });
});
