import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import {
  addEventListener,
  getAttribute,
  getElementIndex,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-select-wrapper');
const getSelect = (page: Page) => page.locator('p-select-wrapper select');
const getLabel = (page: Page) => page.locator('p-select-wrapper label');

const dropdownSelector = 'p-select-wrapper p-select-wrapper-dropdown';
const filterInputSelector = `${dropdownSelector} input`;
const highlightedClass = 'option--highlighted';
const selectedClass = 'option--selected';
const hiddenClass = 'option--hidden';

const getDropdown = (page: Page) => page.locator(dropdownSelector);
const getDropdownList = (page: Page) => page.locator(`${dropdownSelector} [popover]`);
const getDropdownOption1 = (page: Page) => page.locator(`${dropdownSelector} .option:nth-child(1)`);
const getDropdownOption2 = (page: Page) => page.locator(`${dropdownSelector} .option:nth-child(2)`);
const getSelectedDropdownOption = (page: Page) => page.locator(`${dropdownSelector} .${selectedClass}`);
const getFilterInput = (page: Page) => page.locator(filterInputSelector);
const getFilterInputValue = async (page: Page) => getProperty(getFilterInput(page), 'value');
const getFilterInputOverlay = (page: Page) => page.locator(`${filterInputSelector} + span`);

const getFilterPlaceholder = async (page: Page) => getAttribute(getFilterInput(page), 'placeholder');
const getFilterAriaActiveDescendant = async (page: Page) => getAttribute(getFilterInput(page), 'aria-activedescendant');
const getSelectedDropdownOptionId = async (page: Page) => getAttribute(getSelectedDropdownOption(page), 'id');
const getSelectedDropdownOptionIndex = async (page: Page) =>
  getElementIndex(getDropdownList(page), `.${selectedClass}`);
const getHighlightedDropdownOptionIndex = async (page: Page) =>
  getElementIndex(getDropdownList(page), `.${highlightedClass}`);
const getAriaSelectedTrueDropdownOptionIndex = async (page: Page) =>
  getElementIndex(getDropdownList(page), '[aria-selected=true]');

const getSelectValue = async (page: Page) => getProperty(getSelect(page), 'value');
const getSelectedIndex = async (page: Page) => getProperty(getSelect(page), 'selectedIndex');
const getSelectedOptionText = async (page: Page) =>
  getSelect(page).evaluate((el: HTMLSelectElement) => el.options[el.selectedIndex].textContent);

const getAmountOfDropdownOptions = async (page: Page) => getDropdownList(page).evaluate((el) => el.childElementCount);
const getAmountOfHiddenDropdownOptions = async (page: Page) =>
  getDropdownList(page).evaluate(
    (el, hiddenClass: string) => el.querySelectorAll(`.${hiddenClass}`).length,
    hiddenClass
  );

const getAmountOfVisibleSelectOptgroups = async (page: Page): Promise<number> =>
  (
    await page
      .locator('span[role="presentation"]')
      .evaluateAll((elements) => elements.filter((element) => !element.hidden))
  ).length;

const getAmountOfVisibleSelectOptions = async (page: Page): Promise<number> =>
  (await page.getByRole('option').evaluateAll((elements) => elements.filter((element) => !element.hidden))).length;

type InitOptions = {
  amount?: 3 | 5;
  isNative?: boolean;
  markupBefore?: string;
  disabledIndex?: number;
  selectedIndex?: number;
  includeOptgroups?: boolean;
};

const initSelect = (page: Page, opts?: InitOptions): Promise<void> => {
  const {
    amount = 3,
    isNative = false,
    markupBefore = '',
    disabledIndex,
    selectedIndex,
    includeOptgroups = false,
  } = opts || {};

  const options = [...'abc', ...(amount === 5 ? 'de' : '')].map((x, idx) => {
    const attrs = [disabledIndex === idx ? 'disabled' : '', selectedIndex === idx ? 'selected' : ''].join(' ');
    const option = `<option value="${x}" ${attrs}>Option ${x.toUpperCase()}</option>`;
    return includeOptgroups ? `<optgroup label="${x}">${option}</optgroup>` : option;
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

skipInBrowsers(['webkit']);

test('should render', async ({ page }) => {
  await initSelect(page);

  const filterInput = getFilterInput(page);
  await expect(filterInput).not.toHaveCount(0);

  await filterInput.click(); // open dropdown to retrieve aria-active-descendant
  await waitForStencilLifecycle(page);

  const selectedDescendantId = await getSelectedDropdownOptionId(page);
  expect(await getFilterAriaActiveDescendant(page)).toEqual(selectedDescendantId);
});

test('should render dropdown even if native prop is set to true', async ({ page }) => {
  await initSelect(page, { isNative: true });

  const dropdown = getDropdown(page);
  await expect(dropdown).not.toHaveCount(0);
});

test.describe('focus state', () => {
  test('should focus filter when label text is clicked', async ({ page }) => {
    await initSelect(page);

    const label = getLabel(page);
    const filterInput = getFilterInput(page);
    await addEventListener(filterInput, 'focus');

    expect((await getEventSummary(filterInput, 'focus')).counter).toBe(0);

    await label.click();
    expect((await getEventSummary(filterInput, 'focus')).counter).toBe(1);
  });
  test('should focus filter when host is focused', async ({ page }) => {
    await initSelect(page);
    const host = getHost(page);
    const filterInput = getFilterInput(page);
    const filterInputOverlay = getFilterInputOverlay(page);
    await page.mouse.click(300, 300); // Remove focus

    await addEventListener(filterInput, 'focus');
    expect((await getEventSummary(filterInput, 'focus')).counter).toBe(0);
    await expect(filterInputOverlay).toHaveCSS('border-color', 'rgb(107, 109, 112)'); // Border is on overlay element

    await host.focus(); // Slotted select has to be focused
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(filterInput, 'focus')).counter).toBe(1);
    await expect(filterInputOverlay).toHaveCSS('border-color', 'rgb(1, 2, 5)'); // Border is on overlay element
  });
});

// TODO: Activate test
// hover media query "@media(hover: hover)" wasn't supported
// needs to be re-evaluated, maybe we can emulate it with Playwright
test.describe('hover state', () => {
  test.skip();
  test('should change border-color when filter input is hovered', async ({ page }) => {
    await initSelect(page);
    await page.mouse.move(0, 300); // avoid potential hover initially

    const filterInputOverlay = await getFilterInputOverlay(page);
    const initialStyle = await getElementStyle(filterInputOverlay, 'borderColor');
    expect(initialStyle).toBe('rgb(107, 109, 112)');

    await filterInputOverlay.hover();
    const hoverColor = await getElementStyle(filterInputOverlay, 'borderColor');
    expect(hoverColor).toBe('rgb(1, 2, 5)');
  });
});

test('should render dropdown list if filter input is clicked and remove via outside click', async ({ page }) => {
  await initSelect(page, { markupBefore: '<p-text>Some text</p-text>' });

  const filterInput = getFilterInput(page);
  const text = page.locator('p-text');

  await expect(getDropdownList(page), 'initially').toBeHidden();

  await filterInput.click();
  await waitForStencilLifecycle(page);

  await expect(getDropdownList(page), 'after 1st input click').toBeVisible();

  await text.click();
  await waitForStencilLifecycle(page);

  await expect(getDropdownList(page), 'after 1st text click').toBeHidden();

  await filterInput.click();
  await waitForStencilLifecycle(page);

  await expect(getDropdownList(page), 'after 2nd input click').toBeVisible();

  await filterInput.click();
  await waitForStencilLifecycle(page);

  await expect(getDropdownList(page), 'after 3rd input click').toBeVisible(); // dropdown should stay open
});

test('should focus filter when tab key is pressed', async ({ page }) => {
  await initSelect(page);

  const filterInput = getFilterInput(page);
  await addEventListener(filterInput, 'focus');

  expect((await getEventSummary(filterInput, 'focus')).counter).toBe(0);

  await page.keyboard.press('Tab');
  expect((await getEventSummary(filterInput, 'focus')).counter).toBe(1);
});

test('should open dropdown, filter results to "B" if "b" is entered and select it on ArrowDown', async ({ page }) => {
  await initSelect(page);

  const filterInput = getFilterInput(page);
  await filterInput.type('b');
  await waitForStencilLifecycle(page);

  await expect(getDropdownList(page), 'opacity').toBeVisible();
  expect(await getAmountOfHiddenDropdownOptions(page), 'amount of hidden options').toBe(2);

  await page.keyboard.press('ArrowDown');
  await waitForStencilLifecycle(page);
  // await waitForStencilLifecycle(page); // 🙈
  // await waitForStencilLifecycle(page); // 🙈
  await filterInput.press('Enter');
  await waitForStencilLifecycle(page);
  // await waitForStencilLifecycle(page); // 🙈
  // await waitForStencilLifecycle(page); // 🙈
  const value = await getSelectValue(page);

  expect(value).toBe('b');
});

test('should show "---" if filter value has no match', async ({ page }) => {
  await initSelect(page);

  const filterInput = getFilterInput(page);
  await filterInput.type('d');
  await waitForStencilLifecycle(page);

  expect(await getAmountOfHiddenDropdownOptions(page)).toBe(0);
  const noResults = page.getByRole('option', { name: 'No results found' });
  await expect(noResults).toBeVisible();
});

test('should clear input value and reset dropdown on click outside', async ({ page }) => {
  await initSelect(page, { markupBefore: '<p-text>Some text</p-text>' });

  const filterInput = getFilterInput(page);
  const text = page.locator('p-text');

  await filterInput.click();
  await waitForStencilLifecycle(page);

  expect(await getAmountOfDropdownOptions(page)).toBe(3);

  await filterInput.type('x');
  await waitForStencilLifecycle(page);

  expect(await getFilterInputValue(page)).toBe('x');
  expect(await getAmountOfDropdownOptions(page)).toBe(1);

  await text.click();
  await waitForStencilLifecycle(page);

  expect(await getFilterInputValue(page)).toBe('');

  await filterInput.click();
  await waitForStencilLifecycle(page);

  expect(await getAmountOfDropdownOptions(page)).toBe(3);
});

test('should add valid selection as placeholder on enter', async ({ page }) => {
  await initSelect(page);

  const filterInput = getFilterInput(page);

  await filterInput.type('B');
  await waitForStencilLifecycle(page);

  await page.keyboard.press('ArrowDown');
  await waitForStencilLifecycle(page);

  await filterInput.press('Enter');
  await waitForStencilLifecycle(page);

  const filterPlaceholder = await getFilterPlaceholder(page);

  expect(await getSelectedOptionText(page)).toBe('Option B');
  expect(await getSelectedOptionText(page)).toEqual(filterPlaceholder);
});

test('should add valid selection as placeholder on click', async ({ page }) => {
  await initSelect(page);

  const filterInput = getFilterInput(page);
  await filterInput.click();
  await waitForStencilLifecycle(page);

  const dropdownOption2 = await getDropdownOption2(page);
  await dropdownOption2.click();

  await waitForStencilLifecycle(page);

  const filterPlaceholder = await getFilterPlaceholder(page);

  expect(await getSelectedOptionText(page)).toBe('Option B');
  expect(await getSelectedOptionText(page)).toEqual(filterPlaceholder);
});

test.describe('keyboard and click events', () => {
  test('should focus filter input on tab', async ({ page }) => {
    await initSelect(page);

    const filterInput = getFilterInput(page);
    await addEventListener(filterInput, 'focus');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(filterInput, 'focus')).counter).toBe(1);
  });

  test('should highlight first option on initial arrow down', async ({ page }) => {
    await initSelect(page);
    const select = getSelect(page);

    await addEventListener(select, 'change');

    await expect(getDropdownList(page), 'initially').toBeHidden();

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown'); //this just opens the dropdown
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'for dropdown list after arrow down').toBeVisible();
    expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedIndex(page), 'for selected index').toBe(0);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'initially').toBeHidden();
    expect(await getSelectedIndex(page), 'for selected index after enter').toBe(0);

    await page.keyboard.press('Space'); // open dropdown to retrieve aria-active-descendant
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(0);
    expect(await getFilterAriaActiveDescendant(page), 'for aria-active-descendant').toEqual(
      `option-${await getSelectedDropdownOptionIndex(page)}`
    );
  });

  test('should skip disabled option on arrow down', async ({ page }) => {
    await initSelect(page, { disabledIndex: 1 });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown'); //this just opens the dropdown
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted option').toBe(2);
  });

  test('should skip disabled option on arrow up', async ({ page }) => {
    await initSelect(page, { disabledIndex: 1, selectedIndex: 2 });
    await waitForStencilLifecycle(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp'); //this just opens the dropdown
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted option').toBe(0);
  });

  test('should highlight correct position on multiple key actions and select the correct position', async ({
    page,
  }) => {
    await initSelect(page, { amount: 5, disabledIndex: 1 });
    const select = getSelect(page);
    await addEventListener(select, 'change');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown'); //this just opens the dropdown
    await waitForStencilLifecycle(page);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted custom option').toBe(3);

    await page.keyboard.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted custom option').toBe(2);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getSelectedIndex(page), 'for selected index').toBe(2);
    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(1);
  });

  test('should open dropdown with spacebar', async ({ page }) => {
    await initSelect(page);
    const select = getSelect(page);
    await addEventListener(select, 'change');

    await page.keyboard.press('Tab');

    await expect(getDropdownList(page), 'initially').toBeHidden();

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'after space').toBeVisible();
    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(0);
  });

  test('should not select highlighted option with spacebar and option list should stay open', async ({ page }) => {
    await initSelect(page);

    const select = getSelect(page);
    await addEventListener(select, 'change');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'after space').toBeVisible();
    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(0);
  });

  test.describe('when dropdown is not open', () => {
    test('should not select option on PageDown', async ({ page }) => {
      await initSelect(page);
      await page.keyboard.press('Tab');
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      await expect(getDropdownList(page), 'for dropdown list').toBeHidden();
      expect(await getSelectedIndex(page), 'for selected index').toBe(0);
    });

    test('should not select option on PageUp', async ({ page }) => {
      await initSelect(page);
      await page.keyboard.press('Tab');
      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      await expect(getDropdownList(page), 'for dropdown list').toBeHidden();
      expect(await getSelectedIndex(page), 'for selected index').toBe(0);
    });
  });

  test.describe('when dropdown is open', () => {
    test('should not select option on Escape', async ({ page }) => {
      await initSelect(page);
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown'); //this just opens the dropdown
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted option').toBe(1);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getSelectedIndex(page), 'for selected index').toBe(0);
      await expect(getDropdownList(page), 'for opacity').toBeHidden();
    });

    test('should highlight and select last option on PageDown', async ({ page }) => {
      await initSelect(page);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted option').toBe(2);
      expect(await getSelectedDropdownOptionIndex(page), 'for selected option').toBe(0);
      expect(await getSelectedIndex(page), 'for selected index').toBe(0);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getSelectedIndex(page), 'for selected index').toBe(2);
      await expect(getDropdownList(page), 'for opacity').toBeHidden();
    });

    test('should highlight and select first option on PageUp', async ({ page }) => {
      await initSelect(page, { selectedIndex: 2 });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted option').toBe(0);
      expect(await getSelectedDropdownOptionIndex(page), 'for selected option').toBe(2);
      expect(await getSelectedIndex(page), 'for selected index').toBe(2);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getSelectedIndex(page), 'for selected index').toBe(0);
      await expect(getDropdownList(page), 'for opacity').toBeHidden();
    });
  });

  test('should open dropdown on mouseclick and stay open on 2nd click', async ({ page }) => {
    await initSelect(page);
    const filterInput = getFilterInput(page);

    await filterInput.click();
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'after click').toBeVisible();
    expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted option').toBe(0);

    await filterInput.click();
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'after second click').toBeVisible();
    expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted option').toBe(0);
  });

  test('should select second option on mouseclick', async ({ page }) => {
    await initSelect(page);
    const filterInput = getFilterInput(page);

    await filterInput.click();
    await waitForStencilLifecycle(page);

    const dropdownOption2 = await getDropdownOption2(page);
    await dropdownOption2.click();
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'for opacity').toBeHidden();
    expect(await getSelectedIndex(page), 'for selected index').toBe(1);
  });

  skipInBrowsers(['firefox'], () => {
    test('should close dropdown on Tab', async ({ page }) => {
      await initSelect(page);

      const filterInput = getFilterInput(page);
      await addEventListener(filterInput, 'blur');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      await expect(getDropdownList(page), 'for dropdown list').toBeVisible();

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      await expect(getDropdownList(page), 'for dropdown list').toBeHidden();
      expect((await getEventSummary(filterInput, 'blur')).counter, 'for calls').toBe(1);
    });
  });

  test.describe('when select is disabled', () => {
    test.beforeEach(async ({ page }) => {
      await initSelect(page);
      const select = getSelect(page);
      await setProperty(select, 'disabled', true);
      await waitForStencilLifecycle(page);
    });

    test('should have not-allowed cursor', async ({ page }) => {
      expect(await getElementStyle(getSelect(page), 'cursor')).toBe('not-allowed');
    });

    test('should not render dropdown', async ({ page }) => {
      await expect(getDropdown(page)).toHaveCount(0);
    });
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initSelect(page);
    const filterInput = getFilterInput(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-select-wrapper'], 'componentDidLoad: p-select-wrapper').toBe(1);
    expect(status1.componentDidLoad['p-select-wrapper-dropdown'], 'componentDidLoad: p-select-wrapper-dropdown').toBe(
      1
    );
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark of selected option

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await filterInput.click();
    await waitForStencilLifecycle(page);
    const status2 = await getLifecycleStatus(page);

    expect(status2.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark

    expect(status2.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips on filter input change', async ({ page }) => {
    await initSelect(page);
    const host = getHost(page);

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

test.describe('optgroups', () => {
  test('should only display optgroups of filtered options', async ({ page }) => {
    await initSelect(page, { includeOptgroups: true });

    const filterInput = getFilterInput(page);
    await filterInput.click();
    await waitForStencilLifecycle(page);
    expect(await getAmountOfVisibleSelectOptgroups(page), 'amount of shown optgroups').toBe(3);

    await filterInput.type('b');
    await waitForStencilLifecycle(page);

    expect(await getAmountOfVisibleSelectOptgroups(page), 'amount of shown optgroups').toBe(1);
    expect(await getAmountOfVisibleSelectOptions(page), 'amount of shown options').toBe(1);

    const optgroup = page.locator('span[role="presentation"]').getByText('b');
    const child = await page.getByRole('option').getByText('b');
    await expect(child).toBeVisible();
    await expect(optgroup).toBeVisible();
  });
});
