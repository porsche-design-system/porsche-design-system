import {
  addEventListener,
  expectedStyleOnFocus,
  getAttribute,
  getBrowser,
  getElementIndex,
  getElementStyle,
  getLifecycleStatus,
  getOutlineStyle,
  getProperty,
  getShadowRoot,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import { devices, Page } from 'puppeteer';

describe('select-wrapper filter', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-select-wrapper');
  const getSelect = () => selectNode(page, 'p-select-wrapper select');
  const getLabelText = () => selectNode(page, 'p-select-wrapper >>> .label__text');

  const dropdownSelector = 'p-select-wrapper >>> p-select-wrapper-dropdown';
  const filterSelector = 'p-select-wrapper >>> p-select-wrapper-filter';
  const highlightedClass = 'option--highlighted';
  const selectedClass = 'option--selected';
  const hiddenClass = 'option--hidden';

  const getDropdown = () => selectNode(page, dropdownSelector);
  const getDropdownShadowRoot = async () => getShadowRoot(await getDropdown());
  const getDropdownOption1 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(1)`);
  const getDropdownOption2 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(2)`);
  const getSelectedDropdownOption = () => selectNode(page, `${dropdownSelector} >>> .${selectedClass}`);
  const getFilterInput = () => selectNode(page, `${filterSelector} >>> input`);
  const getFilterInputValue = async () => getProperty(await getFilterInput(), 'value');
  const getFilterInputOverlay = () => selectNode(page, `${filterSelector} >>> input + span`);

  const getFilterPlaceholder = async () => getAttribute(await getFilterInput(), 'placeholder');
  const getFilterAriaActiveDescendant = async () => getAttribute(await getFilterInput(), 'aria-activedescendant');
  const getSelectedDropdownOptionId = async () => getAttribute(await getSelectedDropdownOption(), 'id');

  const getDropdownOpacity = async () => getElementStyle(await getDropdown(), 'opacity');
  const getSelectedDropdownOptionIndex = async () =>
    getElementIndex(await getDropdownShadowRoot(), `.${selectedClass}`);
  const getHighlightedDropdownOptionIndex = async () =>
    getElementIndex(await getDropdownShadowRoot(), `.${highlightedClass}`);
  const getAriaSelectedTrueDropdownOptionIndex = async () =>
    getElementIndex(await getDropdownShadowRoot(), '[aria-selected=true]');

  const getSelectValue = async () => getProperty(await getSelect(), 'value');
  const getSelectedIndex = async () => getProperty(await getSelect(), 'selectedIndex');
  const getSelectedOptionText = async () =>
    (await getSelect()).evaluate((el: HTMLSelectElement) => el.options[el.selectedIndex].textContent);
  const getFilterOverlayBoxShadow = async () =>
    getElementStyle(await getFilterInputOverlay(), 'boxShadow', { waitForTransition: true });

  const getAmountOfDropdownOptions = async () => (await getDropdownShadowRoot()).evaluate((el) => el.childElementCount);
  const getAmountOfHiddenDropdownOptions = async () =>
    (await getDropdownShadowRoot()).evaluate(
      (el, hiddenClass: string) => el.querySelectorAll(`.${hiddenClass}`).length,
      hiddenClass
    );

  type InitOptions = {
    amount?: 3 | 5;
    isNative?: boolean;
    markupBefore?: string;
    disabledIndex?: number;
    selectedIndex?: number;
  };

  const initSelect = (opts?: InitOptions): Promise<void> => {
    const { amount = 3, isNative = false, markupBefore = '', disabledIndex, selectedIndex } = opts ?? {};

    const options = [...'abc', ...(amount === 5 ? 'de' : '')].map((x, idx) => {
      const attrs = [disabledIndex === idx ? 'disabled' : '', selectedIndex === idx ? 'selected' : ''].join(' ');
      return `<option value="${x}" ${attrs}>Option ${x.toUpperCase()}</option>`;
    });

    return setContentWithDesignSystem(
      page,
      `${markupBefore}
      <p-select-wrapper label="Some label" filter="true" ${isNative ? 'native="true"' : ''}>
        <select>
          ${options}
        </select>
      </p-select-wrapper>`
    );
  };

  it('should render', async () => {
    await initSelect();

    const dropdown = await getDropdown();
    const activeDescendant = await getFilterAriaActiveDescendant();
    const selectedDescendantId = await getSelectedDropdownOptionId();
    const filterPlaceholder = await getFilterPlaceholder();

    expect(await getSelectedOptionText()).toEqual(filterPlaceholder);
    expect(dropdown).not.toBeNull();
    expect(await getFilterInput()).not.toBeNull();
    expect(activeDescendant).toEqual(selectedDescendantId);
  });

  it('should render dropdown if touch support is detected', async () => {
    await page.emulate(devices['iPhone X']);
    await initSelect();

    const dropdown = await getDropdown();
    expect(dropdown).not.toBeNull();
  });

  it('should render dropdown even if native prop is set to true', async () => {
    await initSelect({ isNative: true });

    const dropdown = await getDropdown();
    expect(dropdown).not.toBeNull();
  });

  it('should focus filter when label text is clicked', async () => {
    await initSelect();

    const labelText = await getLabelText();
    const filterInput = await getFilterInput();
    let focusCalls = 0;
    await addEventListener(filterInput, 'focus', () => focusCalls++);

    expect(focusCalls).toBe(0);

    await labelText.click();
    await waitForEventSerialization(page);

    expect(focusCalls).toBe(1);
  });

  it('should change box-shadow color when filter input is hovered', async () => {
    await initSelect();

    const filterInputOverlay = await getFilterInputOverlay();
    const initialBoxShadow = await getElementStyle(filterInputOverlay, 'boxShadow');
    await filterInputOverlay.hover();

    expect(await getFilterOverlayBoxShadow()).not.toBe(initialBoxShadow);
  });

  it('should change box-shadow color of filter input when label text is hovered', async () => {
    await initSelect();

    const filterInputOverlay = await getFilterInputOverlay();
    const label = await getLabelText();
    const initialBoxShadow = await getElementStyle(filterInputOverlay, 'boxShadow');
    await label.hover();

    expect(await getFilterOverlayBoxShadow()).not.toBe(initialBoxShadow);
  });

  it('should make dropdown visible if filter input is clicked and hidden via outside click', async () => {
    await initSelect({ markupBefore: '<p-text>Some text</p-text>' });

    const filterInput = await getFilterInput();
    const text = await selectNode(page, 'p-text');

    expect(await getDropdownOpacity())
      .withContext('initially')
      .toBe('0');

    await filterInput.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownOpacity())
      .withContext('after 1st input click')
      .toBe('1');

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownOpacity())
      .withContext('after 1st text click')
      .toBe('0');

    await filterInput.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownOpacity())
      .withContext('after 2nd input click')
      .toBe('1');

    await filterInput.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownOpacity())
      .withContext('after 3rd input click')
      .toBe('0');
  });

  it('should focus filter when tab key is pressed', async () => {
    await initSelect();

    const filterInput = await getFilterInput();
    let focusCalls = 0;
    await addEventListener(filterInput, 'focus', () => focusCalls++);

    expect(focusCalls).toBe(0);

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);

    expect(focusCalls).toBe(1);
  });

  it('should open dropdown, filter results to "B" if "b" is entered and select it on ArrowDown', async () => {
    await initSelect();

    const filterInput = await getFilterInput();
    await filterInput.type('b');
    await waitForStencilLifecycle(page);

    expect(await getDropdownOpacity())
      .withContext('opacity')
      .toBe('1');
    expect(await getAmountOfHiddenDropdownOptions())
      .withContext('amount of hidden options')
      .toBe(2);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    // await waitForStencilLifecycle(page); // 🙈
    // await waitForStencilLifecycle(page); // 🙈
    await filterInput.press('Enter');
    await waitForStencilLifecycle(page);
    // await waitForStencilLifecycle(page); // 🙈
    // await waitForStencilLifecycle(page); // 🙈
    const value = await getSelectValue();

    expect(value).toBe('b');
  });

  it('should show "---" if filter value has no match', async () => {
    await initSelect();

    const filterInput = await getFilterInput();
    await filterInput.type('d');
    await waitForStencilLifecycle(page);

    const dropdownOption1 = await getDropdownOption1();
    const dropdownOption1Value = await getProperty(dropdownOption1, 'textContent');

    expect(await getAmountOfHiddenDropdownOptions()).toBe(0);
    expect(dropdownOption1Value).toBe('---No results found');
  });

  it('should clear input value and reset dropdown on click outside', async () => {
    await initSelect({ markupBefore: '<p-text>Some text</p-text>' });

    const filterInput = await getFilterInput();
    const text = await selectNode(page, 'p-text');

    expect(await getAmountOfDropdownOptions()).toBe(3);

    await filterInput.type('x');
    await waitForStencilLifecycle(page);

    expect(await getFilterInputValue()).toBe('x');
    expect(await getAmountOfDropdownOptions()).toBe(1);

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getFilterInputValue()).toBe('');
    expect(await getAmountOfDropdownOptions()).toBe(3);
  });

  it('should add valid selection as placeholder on enter', async () => {
    await initSelect();

    const filterInput = await getFilterInput();

    await filterInput.type('B');
    await waitForStencilLifecycle(page);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    await filterInput.press('Enter');
    await waitForStencilLifecycle(page);

    const filterPlaceholder = await getFilterPlaceholder();

    expect(await getSelectedOptionText()).toBe('Option B');
    expect(await getSelectedOptionText()).toEqual(filterPlaceholder);
  });

  it('should add valid selection as placeholder on click', async () => {
    await initSelect();

    const filterInput = await getFilterInput();
    const dropdownOption2 = await getDropdownOption2();

    await filterInput.click();
    await dropdownOption2.click();
    await waitForStencilLifecycle(page);

    const filterPlaceholder = await getFilterPlaceholder();

    expect(await getSelectedOptionText()).toBe('Option B');
    expect(await getSelectedOptionText()).toEqual(filterPlaceholder);
  });

  describe('keyboard and click events', () => {
    it('should focus filter input on tab', async () => {
      await initSelect();

      const filterInput = await getFilterInput();
      let calls = 0;
      await addEventListener(filterInput, 'focus', () => calls++);

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);

      expect(calls).toBe(1);
    });

    it('should highlight first option on arrow down', async () => {
      await initSelect();
      const select = await getSelect();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option initially')
        .toBe(0);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option initially')
        .toBe(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity after arrow down')
        .toBe('1');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option after arrow down')
        .toBe(1);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(0);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity after enter')
        .toBe('0');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option after enter')
        .toBe(1);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option after enter')
        .toBe(1);
      expect(await getAriaSelectedTrueDropdownOptionIndex())
        .withContext('for aria selected index after enter')
        .toBe(1);
      expect(await getSelectedIndex())
        .withContext('for selected index after enter')
        .toBe(1);

      expect(calls).withContext('for calls').toBe(1);
      expect(await getFilterAriaActiveDescendant()).toEqual(`option-${await getSelectedDropdownOptionIndex()}`);
    });

    it('should skip disabled option on arrow down', async () => {
      await initSelect({ disabledIndex: 1 });

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(2);
    });

    it('should skip disabled option on arrow up', async () => {
      await initSelect({ disabledIndex: 1, selectedIndex: 2 });
      await waitForStencilLifecycle(page);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(0);
    });

    it('should highlight correct position on multiple key actions', async () => {
      await initSelect({ amount: 5, disabledIndex: 1 });
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(3);

      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(2);
    });

    it('should open dropdown with spacebar', async () => {
      await initSelect();
      const select = await getSelect();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('0');

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('1');
      expect(calls).withContext('for calls').toBe(0);
    });

    it('should not select highlighted option with spacebar an option list should stay open', async () => {
      await initSelect();

      const select = await getSelect();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('1');
      expect(calls).withContext('for calls').toBe(0);
    });

    it('should change selected option on ArrowLeft while dropdown is hidden', async () => {
      await initSelect();
      const select = await getSelect();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(2);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(2);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(2);
      expect(calls).withContext('for calls').toBe(1);
    });

    it('should change selected option on ArrowRight while dropdown is hidden', async () => {
      await initSelect();
      const select = await getSelect();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(1);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(1);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(1);
      expect(calls).withContext('for calls').toBe(1);
    });

    it('should change selected option on ArrowLeft while dropdown is open and should close dropdown', async () => {
      await initSelect();
      const select = await getSelect();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(2);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(2);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(2);
      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('0');
      expect(calls).withContext('for calls').toBe(1);
    });

    it('should change selected option on ArrowRight while dropdown is open and should close dropdown', async () => {
      await initSelect();
      const select = await getSelect();
      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(1);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(1);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(1);
      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('0');
      expect(calls).withContext('for calls').toBe(1);
    });

    it('should not select option on Escape', async () => {
      await initSelect();
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(1);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(0);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(0);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(0);
      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('0');
    });

    it('should not select option on PageDown while dropdown is hidden', async () => {
      await initSelect();
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(0);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(0);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(0);
    });

    it('should not select option on PageUp while dropdown is hidden', async () => {
      await initSelect();
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(0);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(0);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(0);
    });

    it('should highlight and select last option on PageDown while dropdown is visible', async () => {
      await initSelect();
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(2);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(0);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(0);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(2);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(2);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(2);
    });

    it('should highlight and select first option on PageUp while dropdown is visible', async () => {
      await initSelect({ selectedIndex: 2 });
      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(0);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(2);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(2);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(0);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(0);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(0);
    });

    it('should open/close dropdown on mouseclick', async () => {
      await initSelect();
      const filterInput = await getFilterInput();

      await filterInput.click();
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('1');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(0);

      await filterInput.click();
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('0');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(0);
    });

    it('should select second option on mouseclick', async () => {
      await initSelect();
      const filterInput = await getFilterInput();
      const dropdownOption2 = await getDropdownOption2();

      await filterInput.click();
      await dropdownOption2.click();
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('0');
      expect(await getHighlightedDropdownOptionIndex())
        .withContext('for highlighted option')
        .toBe(1);
      expect(await getSelectedDropdownOptionIndex())
        .withContext('for selected option')
        .toBe(1);
      expect(await getSelectedIndex())
        .withContext('for selected index')
        .toBe(1);
    });

    it('should close dropdown on Tab', async () => {
      await initSelect();

      const filterInput = await getFilterInput();
      let calls = 0;
      await addEventListener(filterInput, 'blur', () => calls++);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('1');

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity())
        .withContext('for opacity')
        .toBe('0');
      expect(calls).withContext('for calls').toBe(1);
    });
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation and on click for shadow <input> filter', async () => {
      await initSelect();

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
      await initSelect();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-select-wrapper']).withContext('componentDidLoad: p-select-wrapper').toBe(1);
      expect(status.componentDidLoad['p-select-wrapper-dropdown'])
        .withContext('componentDidLoad: p-select-wrapper-dropdown')
        .toBe(1);
      expect(status.componentDidLoad['p-select-wrapper-filter'])
        .withContext('componentDidLoad: p-select-wrapper-filter')
        .toBe(1);
      expect(status.componentDidLoad['p-icon']).withContext('componentDidLoad: p-icon').toBe(2); // arrow down and checkmark
      expect(status.componentDidLoad['p-text']).withContext('componentDidLoad: p-text').toBe(1); // for label

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(6);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on filter input change', async () => {
      await initSelect();
      const host = await getHost();

      await host.click();
      await waitForStencilLifecycle(page);

      const statusAfterClick = await getLifecycleStatus(page);
      expect(statusAfterClick.componentDidUpdate['p-select-wrapper'])
        .withContext('componentDidUpdate: p-select-wrapper')
        .toBe(1);
      expect(statusAfterClick.componentDidUpdate['p-select-wrapper-dropdown'])
        .withContext('componentDidUpdate: p-select-wrapper-dropdown')
        .toBe(1);
      expect(statusAfterClick.componentDidUpdate['p-select-wrapper-filter'])
        .withContext('componentDidUpdate: p-select-wrapper-filter')
        .toBe(1);
      expect(statusAfterClick.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(3);

      await page.keyboard.press('c');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);
      expect(status.componentDidUpdate['p-select-wrapper']).withContext('componentDidUpdate: p-select-wrapper').toBe(2);
      expect(status.componentDidUpdate['p-select-wrapper-dropdown'])
        .withContext('componentDidUpdate: p-select-wrapper-dropdown')
        .toBe(2);
      expect(status.componentDidUpdate['p-select-wrapper-filter'])
        .withContext('componentDidUpdate: p-select-wrapper-filter')
        .toBe(2);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(6);

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(6);
    });
  });
});
