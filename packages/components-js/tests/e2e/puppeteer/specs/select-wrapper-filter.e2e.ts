import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getElementIndex,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import { devices } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-select-wrapper');
const getSelect = () => selectNode(page, 'p-select-wrapper select');
const getLabel = () => selectNode(page, 'p-select-wrapper >>> label');

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
const getSelectedDropdownOptionIndex = async () => getElementIndex(await getDropdownList(), `.${selectedClass}`);
const getHighlightedDropdownOptionIndex = async () => getElementIndex(await getDropdownList(), `.${highlightedClass}`);
const getAriaSelectedTrueDropdownOptionIndex = async () =>
  getElementIndex(await getDropdownList(), '[aria-selected=true]');

const getSelectValue = async () => getProperty(await getSelect(), 'value');
const getSelectedIndex = async () => getProperty(await getSelect(), 'selectedIndex');
const getSelectedOptionText = async () =>
  (await getSelect()).evaluate((el: HTMLSelectElement) => el.options[el.selectedIndex].textContent);

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
  const { amount = 3, isNative = false, markupBefore = '', disabledIndex, selectedIndex } = opts || {};

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
  expect(filterInput).not.toBeNull();

  await filterInput.click(); // open dropdown to retrieve aria-active-descendant
  await waitForStencilLifecycle(page);

  const selectedDescendantId = await getSelectedDropdownOptionId();
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

describe('focus state', () => {
  it('should focus filter when label text is clicked', async () => {
    await initSelect();

    const label = await getLabel();
    const filterInput = await getFilterInput();
    await addEventListener(filterInput, 'focus');

    expect((await getEventSummary(filterInput, 'focus')).counter).toBe(0);

    await label.click();
    expect((await getEventSummary(filterInput, 'focus')).counter).toBe(1);
  });
});

// puppeteer ignores @media(hover: hover) styles, but playwright can handle it
xdescribe('hover state', () => {
  it('should change border-color when filter input is hovered', async () => {
    await initSelect();
    await page.mouse.move(0, 300); // avoid potential hover initially

    const filterInputOverlay = await getFilterInputOverlay();
    const initialStyle = await getElementStyle(filterInputOverlay, 'borderColor');
    expect(initialStyle).toBe('rgb(107, 109, 112)');

    await filterInputOverlay.hover();
    const hoverColor = await getElementStyle(filterInputOverlay, 'borderColor');
    expect(hoverColor).toBe('rgb(1, 2, 5)');
  });
});

it('should render dropdown list if filter input is clicked and remove via outside click', async () => {
  await initSelect({ markupBefore: '<p-text>Some text</p-text>' });

  const filterInput = await getFilterInput();
  const text = await selectNode(page, 'p-text');

  expect(await getDropdownList(), 'initially').toBeNull();

  await filterInput.click();
  await waitForStencilLifecycle(page);

  expect(await getDropdownList(), 'after 1st input click').toBeTruthy();

  await text.click();
  await waitForStencilLifecycle(page);

  expect(await getDropdownList(), 'after 1st text click').toBeNull();

  await filterInput.click();
  await waitForStencilLifecycle(page);

  expect(await getDropdownList(), 'after 2nd input click').toBeTruthy();

  await filterInput.click();
  await waitForStencilLifecycle(page);

  expect(await getDropdownList(), 'after 3rd input click').toBeTruthy(); // dropdown should stay open
});

it('should focus filter when tab key is pressed', async () => {
  await initSelect();

  const filterInput = await getFilterInput();
  await addEventListener(filterInput, 'focus');

  expect((await getEventSummary(filterInput, 'focus')).counter).toBe(0);

  await page.keyboard.press('Tab');
  expect((await getEventSummary(filterInput, 'focus')).counter).toBe(1);
});

it('should open dropdown, filter results to "B" if "b" is entered and select it on ArrowDown', async () => {
  await initSelect();

  const filterInput = await getFilterInput();
  await filterInput.type('b');
  await waitForStencilLifecycle(page);

  expect(await getDropdownList(), 'opacity').toBeTruthy();
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

  await filterInput.click();
  await waitForStencilLifecycle(page);

  expect(await getAmountOfDropdownOptions()).toBe(3);

  await filterInput.type('x');
  await waitForStencilLifecycle(page);

  expect(await getFilterInputValue()).toBe('x');
  expect(await getAmountOfDropdownOptions()).toBe(1);

  await text.click();
  await waitForStencilLifecycle(page);

  expect(await getFilterInputValue()).toBe('');

  await filterInput.click();
  await waitForStencilLifecycle(page);

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
  await filterInput.click();
  await waitForStencilLifecycle(page);

  const dropdownOption2 = await getDropdownOption2();
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
    await addEventListener(filterInput, 'focus');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(filterInput, 'focus')).counter).toBe(1);
  });

  it('should highlight first option on initial arrow down', async () => {
    await initSelect();
    const select = await getSelect();

    await addEventListener(select, 'change');

    expect(await getDropdownList(), 'initially').toBeNull();

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown'); //this just opens the dropdown
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'for dropdown list after arrow down').toBeTruthy();
    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedIndex(), 'for selected index').toBe(0);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'initially').toBeNull();
    expect(await getSelectedIndex(), 'for selected index after enter').toBe(0);

    await page.keyboard.press('Space'); // open dropdown to retrieve aria-active-descendant
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(0);
    expect(await getFilterAriaActiveDescendant(), 'for aria-active-descendant').toEqual(
      `option-${await getSelectedDropdownOptionIndex()}`
    );
  });

  it('should skip disabled option on arrow down', async () => {
    await initSelect({ disabledIndex: 1 });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown'); //this just opens the dropdown
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(2);
  });

  it('should skip disabled option on arrow up', async () => {
    await initSelect({ disabledIndex: 1, selectedIndex: 2 });
    await waitForStencilLifecycle(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp'); //this just opens the dropdown
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
  });

  it('should highlight correct position on multiple key actions and select the correct position', async () => {
    await initSelect({ amount: 5, disabledIndex: 1 });
    const select = await getSelect();
    await addEventListener(select, 'change');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown'); //this just opens the dropdown
    await waitForStencilLifecycle(page);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option').toBe(3);

    await page.keyboard.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option').toBe(2);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getSelectedIndex(), 'for selected index').toBe(2);
    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(1);
  });

  it('should open dropdown with spacebar', async () => {
    await initSelect();
    const select = await getSelect();
    await addEventListener(select, 'change');

    await page.keyboard.press('Tab');

    expect(await getDropdownList(), 'initially').toBeNull();

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'after space').toBeTruthy();
    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(0);
  });

  it('should not select highlighted option with spacebar and option list should stay open', async () => {
    await initSelect();

    const select = await getSelect();
    await addEventListener(select, 'change');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'after space').toBeTruthy();
    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(0);
  });

  describe('when dropdown is not open', () => {
    it('should not select option on PageDown', async () => {
      await initSelect();
      await page.keyboard.press('Tab');
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownList(), 'for dropdown list').toBeNull();
      expect(await getSelectedIndex(), 'for selected index').toBe(0);
    });

    it('should not select option on PageUp', async () => {
      await initSelect();
      await page.keyboard.press('Tab');
      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getDropdownList(), 'for dropdown list').toBeNull();
      expect(await getSelectedIndex(), 'for selected index').toBe(0);
    });
  });

  describe('when dropdown is open', () => {
    it('should not select option on Escape', async () => {
      await initSelect();
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown'); //this just opens the dropdown
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(1);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getSelectedIndex(), 'for selected index').toBe(0);
      expect(await getDropdownList(), 'for opacity').toBeNull();
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

      expect(await getSelectedIndex(), 'for selected index').toBe(2);
      expect(await getDropdownList(), 'for opacity').toBeNull();
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

      expect(await getSelectedIndex(), 'for selected index').toBe(0);
      expect(await getDropdownList(), 'for opacity').toBeNull();
    });
  });

  it('should open dropdown on mouseclick and stay open on 2nd click', async () => {
    await initSelect();
    const filterInput = await getFilterInput();

    await filterInput.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'after click').toBeTruthy();
    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);

    await filterInput.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'after second click').toBeTruthy();
    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
  });

  it('should select second option on mouseclick', async () => {
    await initSelect();
    const filterInput = await getFilterInput();

    await filterInput.click();
    await waitForStencilLifecycle(page);

    const dropdownOption2 = await getDropdownOption2();
    await dropdownOption2.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'for opacity').toBeNull();
    expect(await getSelectedIndex(), 'for selected index').toBe(1);
  });

  it('should close dropdown on Tab', async () => {
    await initSelect();

    const filterInput = await getFilterInput();
    await addEventListener(filterInput, 'blur');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'for dropdown list').toBeTruthy();

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'for dropdown list').toBeNull();
    expect((await getEventSummary(filterInput, 'blur')).counter, 'for calls').toBe(1);
  });

  describe('when select is disabled', () => {
    beforeEach(async () => {
      await initSelect();
      const select = await getSelect();
      await setProperty(select, 'disabled', true);
      await waitForStencilLifecycle(page);
    });

    it('should have not-allowed cursor', async () => {
      expect(await getElementStyle(await getSelect(), 'cursor')).toBe('not-allowed');
    });

    it('should not render dropdown', async () => {
      expect(await getDropdown()).toBeNull();
    });
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initSelect();
    const filterInput = await getFilterInput();
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-select-wrapper'], 'componentDidLoad: p-select-wrapper').toBe(1);
    expect(status1.componentDidLoad['p-select-wrapper-dropdown'], 'componentDidLoad: p-select-wrapper-dropdown').toBe(
      1
    );
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await filterInput.click();
    await waitForStencilLifecycle(page);
    const status2 = await getLifecycleStatus(page);

    expect(status2.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark

    expect(status2.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  it('should work without unnecessary round trips on filter input change', async () => {
    await initSelect();
    const host = await getHost();

    await host.click();
    await waitForStencilLifecycle(page);

    const statusAfterClick = await getLifecycleStatus(page);
    expect(statusAfterClick.componentDidUpdate['p-select-wrapper'], '1st componentDidUpdate: p-select-wrapper').toBe(0);
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

    expect(status.componentDidLoad.all, '2nd componentDidLoad: all').toBe(4);
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
