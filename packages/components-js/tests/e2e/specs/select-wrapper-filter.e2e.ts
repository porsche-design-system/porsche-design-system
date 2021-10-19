import {
  addEventListener,
  expectedStyleOnFocus,
  expectA11yToMatchSnapshot,
  getAttribute,
  getElementIndex,
  getElementStyle,
  getLifecycleStatus,
  getOutlineStyle,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import { devices, Page } from 'puppeteer';

describe('select-wrapper filter', () => {
  let page: Page;

  beforeEach(async () => {
    page = await browser.newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-select-wrapper');
  const getSelect = () => selectNode(page, 'p-select-wrapper select');
  const getLabelText = () => selectNode(page, 'p-select-wrapper >>> .label__text');

  const dropdownSelector = 'p-select-wrapper >>> p-select-wrapper-dropdown';
  const filterInputSelector = `${dropdownSelector} >>> input`;
  const highlightedClass = 'option--highlighted';
  const selectedClass = 'option--selected';
  const hiddenClass = 'option--hidden';

  const getDropdown = () => selectNode(page, dropdownSelector);
  const getDropdownList = () => selectNode(page, `${dropdownSelector} >>> [role="listbox"]`);
  const getDropdownOption1 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(1)`);
  const getDropdownOption2 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(2)`);
  const getSelectedDropdownOption = () => selectNode(page, `${dropdownSelector} >>> .${selectedClass}`);
  const getFilterInput = () => selectNode(page, filterInputSelector);
  const getFilterInputValue = async () => getProperty(await getFilterInput(), 'value');
  const getFilterInputOverlay = () => selectNode(page, `${filterInputSelector} + span`);

  const getFilterPlaceholder = async () => getAttribute(await getFilterInput(), 'placeholder');
  const getFilterAriaActiveDescendant = async () => getAttribute(await getFilterInput(), 'aria-activedescendant');
  const getSelectedDropdownOptionId = async () => getAttribute(await getSelectedDropdownOption(), 'id');

  const getDropdownOpacity = async () => getElementStyle(await getDropdownList(), 'opacity');
  const getSelectedDropdownOptionIndex = async () => getElementIndex(await getDropdownList(), `.${selectedClass}`);
  const getHighlightedDropdownOptionIndex = async () =>
    getElementIndex(await getDropdownList(), `.${highlightedClass}`);
  const getAriaSelectedTrueDropdownOptionIndex = async () =>
    getElementIndex(await getDropdownList(), '[aria-selected=true]');

  const getSelectValue = async () => getProperty(await getSelect(), 'value');
  const getSelectedIndex = async () => getProperty(await getSelect(), 'selectedIndex');
  const getSelectedOptionText = async () =>
    (await getSelect()).evaluate((el: HTMLSelectElement) => el.options[el.selectedIndex].textContent);
  const getFilterOverlayBoxShadow = async () => getElementStyle(await getFilterInputOverlay(), 'boxShadow');

  const getAmountOfDropdownOptions = async () => (await getDropdownList()).evaluate((el) => el.childElementCount);
  const getAmountOfHiddenDropdownOptions = async () =>
    (await getDropdownList()).evaluate(
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

    const filterInput = await getFilterInput();
    const selectedDescendantId = await getSelectedDropdownOptionId();
    const filterPlaceholder = await getFilterPlaceholder();

    expect(await getSelectedOptionText()).toEqual(filterPlaceholder);
    expect(await getDropdown()).not.toBeNull();
    expect(filterInput).not.toBeNull();

    await filterInput.click(); // open dropdown to retrieve aria-active-descendant
    await waitForStencilLifecycle(page);

    expect(await getFilterAriaActiveDescendant()).toEqual(selectedDescendantId);
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

  it('should make dropdown visible if filter input is clicked and hidden via outside click', async () => {
    await initSelect({ markupBefore: '<p-text>Some text</p-text>' });

    const filterInput = await getFilterInput();
    const text = await selectNode(page, 'p-text');

    expect(await getDropdownOpacity(), 'initially').toBe('0');

    await filterInput.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownOpacity(), 'after 1st input click').toBe('1');

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownOpacity(), 'after 1st text click').toBe('0');

    await filterInput.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownOpacity(), 'after 2nd input click').toBe('1');

    await filterInput.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownOpacity(), 'after 3rd input click').toBe('1'); // dropdown should stay open
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

    expect(await getDropdownOpacity(), 'opacity').toBe('1');
    expect(await getAmountOfHiddenDropdownOptions(), 'amount of hidden options').toBe(2);

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

      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option initially').toBe(0);
      expect(await getSelectedDropdownOptionIndex(), 'for selected option initially').toBe(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity(), 'for opacity after arrow down').toBe('1');
      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option after arrow down').toBe(1);
      expect(await getSelectedIndex(), 'for selected index').toBe(0);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity(), 'for opacity after enter').toBe('0');
      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option after enter').toBe(1);
      expect(await getSelectedDropdownOptionIndex(), 'for selected option after enter').toBe(1);
      expect(await getAriaSelectedTrueDropdownOptionIndex(), 'for aria selected index after enter').toBe(1);
      expect(await getSelectedIndex(), 'for selected index after enter').toBe(1);

      await page.keyboard.press('Space'); // open dropdown to retrieve aria-active-descendant
      await waitForStencilLifecycle(page);

      expect(calls, 'for calls').toBe(1);
      expect(await getFilterAriaActiveDescendant(), 'for aria-active-descendant').toEqual(
        `option-${await getSelectedDropdownOptionIndex()}`
      );
    });

    it('should skip disabled option on arrow down', async () => {
      await initSelect({ disabledIndex: 1 });

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(2);
    });

    it('should skip disabled option on arrow up', async () => {
      await initSelect({ disabledIndex: 1, selectedIndex: 2 });
      await waitForStencilLifecycle(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
    });

    it('should highlight correct position on multiple key actions', async () => {
      await initSelect({ amount: 5, disabledIndex: 1 });
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(3);

      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(2);
    });

    it('should open dropdown with spacebar', async () => {
      await initSelect();
      const select = await getSelect();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');

      expect(await getDropdownOpacity(), 'initially').toBe('0');

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity(), 'after space').toBe('1');
      expect(calls, 'for calls').toBe(0);
    });

    it('should not select highlighted option with spacebar and option list should stay open', async () => {
      await initSelect();

      const select = await getSelect();

      let calls = 0;
      await addEventListener(select, 'change', () => calls++);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity(), 'for opacity').toBe('1');
      expect(calls, 'for calls').toBe(0);
    });

    describe('when dropdown is not open', () => {
      it('should not select option on PageDown', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await page.keyboard.press('PageDown');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
        expect(await getSelectedDropdownOptionIndex(), 'for selected option').toBe(0);
        expect(await getSelectedIndex(), 'for selected index').toBe(0);
      });

      it('should not select option on PageUp', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await page.keyboard.press('PageUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
        expect(await getSelectedDropdownOptionIndex(), 'for selected option').toBe(0);
        expect(await getSelectedIndex(), 'for selected index').toBe(0);
      });
    });

    describe('when dropdown is open', () => {
      it('should not select option on Escape', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(1);

        await page.keyboard.press('Escape');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
        expect(await getSelectedDropdownOptionIndex(), 'for selected option').toBe(0);
        expect(await getSelectedIndex(), 'for selected index').toBe(0);
        expect(await getDropdownOpacity(), 'for opacity').toBe('0');
      });

      it('should highlight and select last option on PageDown', async () => {
        await initSelect();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageDown');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(2);
        expect(await getSelectedDropdownOptionIndex(), 'for selected option').toBe(0);
        expect(await getSelectedIndex(), 'for selected index').toBe(0);

        await page.keyboard.press('Enter');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(2);
        expect(await getSelectedDropdownOptionIndex(), 'for selected option').toBe(2);
        expect(await getSelectedIndex(), 'for selected index').toBe(2);
      });

      it('should highlight and select first option on PageUp', async () => {
        await initSelect({ selectedIndex: 2 });
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await waitForStencilLifecycle(page);
        await page.keyboard.press('PageUp');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
        expect(await getSelectedDropdownOptionIndex(), 'for selected option').toBe(2);
        expect(await getSelectedIndex(), 'for selected index').toBe(2);

        await page.keyboard.press('Enter');
        await waitForStencilLifecycle(page);

        expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
        expect(await getSelectedDropdownOptionIndex(), 'for selected option').toBe(0);
        expect(await getSelectedIndex(), 'for selected index').toBe(0);
      });
    });

    it('should open dropdown on mouseclick and stay open on 2nd click', async () => {
      await initSelect();
      const filterInput = await getFilterInput();

      await filterInput.click();
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity(), 'for opacity').toBe('1');
      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);

      await filterInput.click();
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity(), 'for opacity').toBe('1');
      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
    });

    it('should select second option on mouseclick', async () => {
      await initSelect();
      const filterInput = await getFilterInput();
      const dropdownOption2 = await getDropdownOption2();

      await filterInput.click();
      await dropdownOption2.click();
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity(), 'for opacity').toBe('0');
      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(1);
      expect(await getSelectedDropdownOptionIndex(), 'for selected option').toBe(1);
      expect(await getSelectedIndex(), 'for selected index').toBe(1);
    });

    it('should close dropdown on Tab', async () => {
      await initSelect();

      const filterInput = await getFilterInput();
      let calls = 0;
      await addEventListener(filterInput, 'blur', () => calls++);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity(), 'for opacity').toBe('1');

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getDropdownOpacity(), 'for opacity').toBe('0');
      expect(calls, 'for calls').toBe(1);
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

      expect(status.componentDidLoad['p-select-wrapper'], 'componentDidLoad: p-select-wrapper').toBe(1);
      expect(status.componentDidLoad['p-select-wrapper-dropdown'], 'componentDidLoad: p-select-wrapper-dropdown').toBe(
        1
      );
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(1); // for label

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on filter input change', async () => {
      await initSelect();
      const host = await getHost();

      await host.click();
      await waitForStencilLifecycle(page);

      const statusAfterClick = await getLifecycleStatus(page);
      expect(statusAfterClick.componentDidUpdate['p-select-wrapper'], '1st componentDidUpdate: p-select-wrapper').toBe(
        0
      );
      expect(
        statusAfterClick.componentDidUpdate['p-select-wrapper-dropdown'],
        '1st componentDidUpdate: p-select-wrapper-dropdown'
      ).toBe(1);
      expect(statusAfterClick.componentDidUpdate.all, '1st componentDidUpdate: all').toBe(1);

      await page.keyboard.press('c');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);
      expect(status.componentDidUpdate['p-select-wrapper'], '2nd componentDidUpdate: p-select-wrapper').toBe(0);
      expect(
        status.componentDidUpdate['p-select-wrapper-dropdown'],
        '2nd componentDidUpdate: p-select-wrapper-dropdown'
      ).toBe(2);
      expect(status.componentDidUpdate.all, '2nd componentDidUpdate: all').toBe(2);

      expect(status.componentDidLoad.all, '2nd componentDidLoad: all').toBe(5);
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree and aria properties of filter', async () => {
      await initSelect({ disabledIndex: 1 });
      const filter = await getFilterInput();

      await expectA11yToMatchSnapshot(page, filter, { interestingOnly: false });
    });

    it('should expose correct accessibility tree of option list if filter value has no match', async () => {
      await initSelect();
      const filterInput = await getFilterInput();
      await filterInput.type('d');
      await waitForStencilLifecycle(page);

      const dropDown = await getDropdownList();

      await expectA11yToMatchSnapshot(page, dropDown, { interestingOnly: false });
    });

    it('should expose correct accessibility tree if description is set', async () => {
      await initSelect();
      const host = await getHost();
      await setProperty(host, 'description', 'Some description');
      await waitForStencilLifecycle(page);
      const filterInput = await getFilterInput();

      await expectA11yToMatchSnapshot(page, filterInput);
    });

    it('should expose correct accessibility tree in error state', async () => {
      await initSelect();
      const host = await getHost();
      await setProperty(host, 'state', 'error');
      await setProperty(host, 'message', 'Some error message');
      await waitForStencilLifecycle(page);
      const filterInput = await getFilterInput();

      await expectA11yToMatchSnapshot(page, filterInput);
    });
  });
});
