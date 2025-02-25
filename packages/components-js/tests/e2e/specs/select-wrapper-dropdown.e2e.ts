import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import {
  addEventListener,
  getAttribute,
  getCssClasses,
  getElementIndex,
  getElementPositions,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getPageThrownErrorsAmount,
  getProperty,
  initPageErrorObserver,
  reattachElement,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-select-wrapper');
const getSelect = (page: Page) => page.locator('p-select-wrapper select');
const getSelectIcon = (page: Page) => page.locator('p-select-wrapper .icon').first();

const dropdownSelector = 'p-select-wrapper p-select-wrapper-dropdown';
const highlightedClass = 'option--highlighted';
const selectedClass = 'option--selected';
const disabledClass = 'option--disabled';
const hiddenClass = 'option--hidden';
const disabledOptgroupClass = 'optgroup--disabled';

const getDropdown = (page: Page) => page.locator(dropdownSelector);
const getDropdownCombobox = (page: Page) => page.locator(`${dropdownSelector} [role="combobox"]`);
const getDropdownList = (page: Page) => page.locator(`${dropdownSelector} [popover]`);
const getDropdownOption1 = (page: Page) => page.locator(`${dropdownSelector} .option:nth-child(1)`);
const getDropdownOption2 = (page: Page) => page.locator(`${dropdownSelector} .option:nth-child(2)`);
const getDropdownOption4 = (page: Page) => page.locator(`${dropdownSelector} .option:nth-child(4)`);
const getDisabledDropdownOption = (page: Page) => page.locator(`${dropdownSelector} .${disabledClass}`);
const getDropdownOptgroup = (page: Page) => page.locator(`${dropdownSelector} .optgroup`);
const getDropdownCheckmarkIcon = (page: Page) => page.locator(`${dropdownSelector} .icon`);

const getComboboxAriaActiveDescendant = async (page: Page) =>
  getAttribute(getDropdownCombobox(page), 'aria-activedescendant');

const getDropdownOpacity = async (page: Page) => getElementStyle(getDropdownList(page), 'opacity');
const selectHasFocus = (page: Page) => page.evaluate(() => document.activeElement === document.querySelector('select'));
const getSelectedIndex = async (page: Page) => getProperty(getSelect(page), 'selectedIndex');
const getDisabledDropdownOptionIndex = async (page: Page) =>
  getElementIndex(getDropdownList(page), `.${disabledClass}`);
const getSelectedDropdownOptionIndex = async (page: Page) =>
  getElementIndex(getDropdownList(page), `.${selectedClass}`);
const getHiddenDropdownOptionIndex = async (page: Page) => getElementIndex(getDropdownList(page), `.${hiddenClass}`);
const getHighlightedDropdownOptionIndex = async (page: Page) =>
  getElementIndex(getDropdownList(page), `.${highlightedClass}`);
const getAriaSelectedTrueDropdownOptionIndex = async (page: Page) =>
  getElementIndex(getDropdownList(page), '[aria-selected=true]');
const getAriaDisabledTrueDropdownOptionIndex = async (page: Page) =>
  getElementIndex(getDropdownList(page), '[aria-disabled=true]');

const getAmountOfOptions = async (page: Page) => getSelect(page).evaluate((el) => el.childElementCount);
const getAmountOfDropdownOptions = async (page: Page) => getDropdownList(page).evaluate((el) => el.childElementCount);

const getAmountOfOptgroups = async (page: Page) =>
  getSelect(page).evaluate((el) => el.querySelectorAll('optgroup').length);
const getAmountOfDropdownOptgroups = async (page: Page) =>
  getDropdownList(page).evaluate((el) => el.querySelectorAll('.optgroup').length);

const openSelect = async (page: Page) => {
  const host = getHost(page);
  await host.click();
  await waitForStencilLifecycle(page);
};

type InitOptions = {
  amount?: 3 | 5;
  isNative?: boolean;
  dropdownDirection?: 'up' | 'down';
  markupBefore?: string;
  disabledIndex?: number;
  selectedIndex?: number;
  hiddenIndex?: number;
  beginUnique?: boolean;
  includeOptgroups?: boolean;
};

const initSelect = (page: Page, opts?: InitOptions): Promise<void> => {
  const {
    amount = 3,
    isNative = false,
    dropdownDirection,
    markupBefore = '',
    disabledIndex,
    selectedIndex,
    hiddenIndex,
    beginUnique,
    includeOptgroups = false,
  } = opts || {};

  const options = [...'abc', ...(amount === 5 ? 'de' : '')].map((x, idx) => {
    const attrs = [
      disabledIndex === idx ? 'disabled' : '',
      selectedIndex === idx ? 'selected' : '',
      hiddenIndex === idx ? 'hidden' : '',
    ].join(' ');

    const val = x.toUpperCase();
    const option = `<option value="${x}" ${attrs}>${beginUnique ? `${val} Option` : `Option ${val}`}</option>`;
    return includeOptgroups ? `<optgroup label="${x}">${option}</optgroup>` : option;
  });

  const attrs = [
    isNative !== undefined && `native="${isNative}"`,
    dropdownDirection && `dropdown-direction="${dropdownDirection}"`,
  ]
    .filter((x) => x)
    .join(' ');

  return setContentWithDesignSystem(
    page,
    `${markupBefore}
    <p-select-wrapper label="Some label" ${attrs}>
      <select>
        ${options}
      </select>
    </p-select-wrapper>`
  );
};

skipInBrowsers(['webkit']);

test('should render', async ({ page }) => {
  await initSelect(page, { disabledIndex: 1 });

  await openSelect(page);

  const disabledDropdownOption = await getDisabledDropdownOption(page);

  await expect(disabledDropdownOption).not.toHaveCount(0);
  expect(await getAriaSelectedTrueDropdownOptionIndex(page)).toBe(0);
  expect(await getAriaDisabledTrueDropdownOptionIndex(page)).toBe(1);
});

test('should render with optgroups', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
    <p-select-wrapper label="Some label">
      <select>
        <optgroup label="Some optgroup label 1">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </optgroup>
        <optgroup label="Some optgroup label 1">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </optgroup>
      </select>
    </p-select-wrapper>`
  );

  await openSelect(page);

  const dropdownList = getDropdownList(page);
  const dropdownOptgroup = getDropdownOptgroup(page);

  await expect(dropdownOptgroup).not.toHaveCount(0);
  expect(await getElementIndex(dropdownList, '[aria-selected=true]')).toBe(1);
  expect(await getAmountOfDropdownOptgroups(page)).toEqual(await getAmountOfOptgroups(page));
});

test('should render with a mix of options and optgroup', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
    <p-select-wrapper label="Some label">
      <select>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <optgroup label="Some optgroup label 2">
          <option value="c">Option C</option>
          <option value="d">Option D</option>
        </optgroup>
      </select>
    </p-select-wrapper>`
  );

  await openSelect(page);

  const dropdownOptgroup = getDropdownOptgroup(page);

  await expect(dropdownOptgroup).not.toHaveCount(0);
  expect(await getAmountOfDropdownOptgroups(page)).toEqual(await getAmountOfOptgroups(page));
});

test('should not render if native prop is set to true', async ({ page }) => {
  await initSelect(page, { isNative: true });

  const dropdown = getDropdown(page);
  await expect(dropdown).toHaveCount(0);
});

test('should disable select when disabled programmatically', async ({ page }) => {
  await initSelect(page);
  const select = getSelect(page);
  const getSelectCursorStyle = () => getElementStyle(select, 'cursor');

  expect(await getSelectCursorStyle(), 'initially').toBe('pointer');

  await setProperty(select, 'disabled', true);
  await waitForStencilLifecycle(page);

  expect(await getSelectCursorStyle(), 'when disabled = true').toBe('not-allowed');

  await setProperty(select, 'disabled', false);
  await waitForStencilLifecycle(page);

  expect(await getSelectCursorStyle(), 'when disabled = false').toBe('pointer');
});

test('should not render dropdown when select is disabled programmatically', async ({ page }) => {
  await initSelect(page);
  const select = getSelect(page);

  expect(getDropdown(page), 'initially').toBeTruthy();

  await setProperty(select, 'disabled', true);
  await waitForStencilLifecycle(page);

  await expect(getDropdown(page), 'when disabled = true').toHaveCount(0);

  await setProperty(select, 'disabled', false);
  await waitForStencilLifecycle(page);

  expect(getDropdown(page), 'when disabled = false').toBeTruthy();
});

test('should be visible if select is clicked and hidden again when clicked outside', async ({ page }) => {
  await initSelect(page, { markupBefore: '<p-text>Some text</p-text>' });

  const host = getHost(page);
  const text = page.locator('p-text');

  await expect(getDropdownList(page)).toHaveCSS('display', 'none');

  await host.click();
  await waitForStencilLifecycle(page);
  expect(getDropdownList(page)).toBeTruthy();

  await text.click();
  await waitForStencilLifecycle(page);
  await expect(getDropdownList(page)).toHaveCSS('display', 'none');

  await host.click();
  await waitForStencilLifecycle(page);
  expect(getDropdownList(page)).toBeTruthy();

  await host.click();
  await waitForStencilLifecycle(page);
  await expect(getDropdownList(page)).toHaveCSS('display', 'none');
});

test('should add custom option if added to native select programmatically', async ({ page }) => {
  await initSelect(page);
  const select = getSelect(page);
  await openSelect(page);

  expect(await getAmountOfDropdownOptions(page)).toEqual(await getAmountOfOptions(page));

  await select.evaluate((el: HTMLSelectElement) => {
    const option = document.createElement('option');
    option.text = 'Test';
    el.add(option, 0);
  });
  await waitForStencilLifecycle(page);

  const dropdownOption1Text = await getProperty(getDropdownOption1(page), 'innerHTML');
  expect(dropdownOption1Text).toContain('Test');
  expect(await getAmountOfDropdownOptions(page)).toEqual(await getAmountOfOptions(page));
});

test('should observe selected property changes of native option if added programmatically', async ({ page }) => {
  await initSelect(page);
  const select = getSelect(page);
  await openSelect(page);

  await select.evaluate((el: HTMLSelectElement) => {
    const option = document.createElement('option');
    option.text = 'Test';
    el.add(option);
    el.options[3].selected = true;
  });
  await waitForStencilLifecycle(page);

  const dropdownOption4 = await getDropdownOption4(page);

  expect(await getCssClasses(dropdownOption4)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex(page)).toBe(3);
});

test('should add/remove disabled state to custom option item if added/removed property to native select programmatically', async ({
  page,
}) => {
  await initSelect(page, { disabledIndex: 1 });
  const select = getSelect(page);
  await openSelect(page);
  const dropdownOption1 = getDropdownOption1(page);
  const dropdownOption2 = getDropdownOption2(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(disabledClass);
  expect(await getCssClasses(dropdownOption2)).toContain(disabledClass);
  expect(await getDisabledDropdownOptionIndex(page)).toBe(1);

  await select.evaluate((el: HTMLSelectElement) => (el.options[0].disabled = true));
  await select.evaluate((el: HTMLSelectElement) => (el.options[1].disabled = false));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).toContain(disabledClass);
  expect(await getCssClasses(dropdownOption2)).not.toContain(disabledClass);
  expect(await getDisabledDropdownOptionIndex(page)).toBe(0);
});

test('should add/remove disabled state to custom option item if added/removed attribute to native select programmatically', async ({
  page,
}) => {
  await initSelect(page, { disabledIndex: 1 });
  const select = getSelect(page);
  await openSelect(page);
  const dropdownOption1 = getDropdownOption1(page);
  const dropdownOption2 = getDropdownOption2(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(disabledClass);
  expect(await getCssClasses(dropdownOption2)).toContain(disabledClass);
  expect(await getDisabledDropdownOptionIndex(page)).toBe(1);

  await select.evaluate((el: HTMLSelectElement) => el.options[0].setAttribute('disabled', 'disabled'));
  await select.evaluate((el: HTMLSelectElement) => el.options[1].removeAttribute('disabled'));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).toContain(disabledClass);
  expect(await getCssClasses(dropdownOption2)).not.toContain(disabledClass);
  expect(await getDisabledDropdownOptionIndex(page)).toBe(0);
});

test('should synchronize custom option and native select if selected property is set programmatically', async ({
  page,
}) => {
  await initSelect(page);
  const select = getSelect(page);
  await openSelect(page);
  const dropdownOption1 = getDropdownOption1(page);
  const dropdownOption2 = getDropdownOption2(page);

  expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).not.toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex(page)).toBe(0);

  await select.evaluate((el: HTMLSelectElement) => (el.options[1].selected = true));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex(page)).toBe(1);
});

test('should synchronize custom option and native select if selected attribute is set programmatically', async ({
  page,
}) => {
  await initSelect(page);
  const select = getSelect(page);
  await openSelect(page);
  const dropdownOption1 = getDropdownOption1(page);
  const dropdownOption2 = getDropdownOption2(page);

  expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).not.toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex(page)).toBe(0);

  await select.evaluate((el: HTMLSelectElement) => el.options[1].setAttribute('selected', 'selected'));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex(page)).toBe(1);
});

test('should synchronize custom option and native select if selected value property is changed programmatically', async ({
  page,
}) => {
  await initSelect(page);
  const select = getSelect(page);
  await openSelect(page);
  const dropdownOption1 = getDropdownOption1(page);
  const dropdownOption2 = getDropdownOption2(page);

  expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex(page)).toBe(0);

  await setProperty(select, 'value', 'b');
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex(page)).toBe(1);
});

test('should synchronize custom option and native select if selectedIndex property is changed programmatically', async ({
  page,
}) => {
  await initSelect(page);
  const select = getSelect(page);
  await openSelect(page);
  const dropdownOption1 = getDropdownOption1(page);
  const dropdownOption2 = getDropdownOption2(page);

  expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex(page)).toBe(0);

  await setProperty(select, 'selectedIndex', 1);
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex(page)).toBe(1);
});

test('should add selected state to custom option item if selected property of option is set', async ({ page }) => {
  await initSelect(page);
  const select = getSelect(page);
  await openSelect(page);
  const dropdownOption1 = getDropdownOption1(page);
  const dropdownOption2 = getDropdownOption2(page);

  expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex(page)).toBe(0);

  await select.evaluate((el: HTMLSelectElement) => (el.options[1].selected = true));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex(page)).toBe(1);
});

test('should hide/show custom option item if hidden attribute is added/removed to native select programmatically', async ({
  page,
}) => {
  await initSelect(page);
  const select = getSelect(page);
  await openSelect(page);
  const dropdownOption2 = getDropdownOption2(page);

  await select.evaluate((el: HTMLSelectElement) => (el.options[1].hidden = true));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption2)).toContain(hiddenClass);
  expect(await getHiddenDropdownOptionIndex(page)).toBe(1);

  await select.evaluate((el: HTMLSelectElement) => (el.options[1].hidden = false));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption2)).not.toContain(hiddenClass);
});

test('should not render initial hidden option fields', async ({ page }) => {
  await initSelect(page, { hiddenIndex: 0 });
  await openSelect(page);
  const dropdownOption1 = getDropdownOption1(page);
  expect(await getCssClasses(dropdownOption1)).toContain(hiddenClass);
});

skipInBrowsers(['firefox', 'webkit'], () => {
  test('should not throw error with long option list and the same item is selected and disabled', async ({ page }) => {
    await initPageErrorObserver(page);

    await setContentWithDesignSystem(
      page,
      `
    <p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="default" disabled selected>Bitte wählen Sie Ihr Land</option>
        <option value="AF">Afghanistan</option>
        <option value="AX">Åland Islands</option>
        <option value="AL">Albania</option>
        <option value="DZ">Algeria</option>
        <option value="AS">American Samoa</option>
        <option value="AD">Andorra</option>
        <option value="AO">Angola</option>
        <option value="AI">Anguilla</option>
        <option value="AQ">Antarctica</option>
        <option value="AG">Antigua and Barbuda</option>
        <option value="AR">Argentina</option>
        <option value="AM">Armenia</option>
        <option value="AW">Aruba</option>
        <option value="AU">Australia</option>
        <option value="AT">Austria</option
      </select>
    </p-select-wrapper>`
    );

    const dropdownCombobox = getDropdownCombobox(page);
    await dropdownCombobox.click();
    await waitForStencilLifecycle(page);

    expect(getPageThrownErrorsAmount(), 'get errorsAmount after click').toBe(0);

    await page.evaluate(() => {
      const script = document.createElement('script');
      script.innerText = "throw new Error('I am an error');";
      document.body.appendChild(script);
    });

    expect(getPageThrownErrorsAmount(), 'get errorsAmount after custom error').toBe(1);
  });
});

test('should not set checkmark icon if option is both selected and disabled', async ({ page }) => {
  await initSelect(page, { disabledIndex: 0, selectedIndex: 0 });

  await expect(getDropdownCheckmarkIcon(page)).toHaveCount(0);
});

test.describe('hover state', () => {
  test.skip();
  test('should change border-color when dropdown combobox is hovered', async ({ page }) => {
    await initSelect(page);
    await page.mouse.move(0, 300); // avoid potential hover initially

    const dropdownCombobox = getDropdownCombobox(page);
    const initialStyle = await getElementStyle(dropdownCombobox, 'borderColor');
    expect(initialStyle).toBe('rgb(107, 109, 112)');

    await dropdownCombobox.hover();
    const hoverStyle = await getElementStyle(dropdownCombobox, 'borderColor');
    expect(hoverStyle).toBe('rgb(1, 2, 5)');
  });
});

test.describe('dropdown position', () => {
  test('should set direction to up if there is enough space', async ({ page }) => {
    await initSelect(page, { dropdownDirection: 'up', markupBefore: '<div style="height: 10rem"></div>' });

    const dropdownCombobox = getDropdownCombobox(page);
    await dropdownCombobox.click();
    await waitForStencilLifecycle(page);

    expect((await getDropdownList(page).boundingBox()).y).toBeCloseTo(32, 0);
  });

  test('should set direction to down', async ({ page }) => {
    await initSelect(page, { dropdownDirection: 'down', markupBefore: '<div style="height: 10rem"></div>' });

    const dropdownCombobox = getDropdownCombobox(page);
    await dropdownCombobox.click();
    await waitForStencilLifecycle(page);

    expect((await getDropdownList(page).boundingBox()).y).toBeCloseTo(248, 0);
  });

  test('should auto position to up if bottom space is less than dropdown height', async ({ page }) => {
    await page.setViewportSize({
      width: 800,
      height: 650,
    });
    await initSelect(page, { amount: 5, markupBefore: '<div style="height: 550px;"></div>' });

    const dropdownCombobox = getDropdownCombobox(page);
    await dropdownCombobox.click();
    await waitForStencilLifecycle(page);

    expect((await getDropdownList(page).boundingBox()).y).toBeCloseTo(326, 0);
  });
});

test.describe('keyboard and click events', () => {
  test('should highlight first position on initial arrow down', async ({ page }) => {
    await initSelect(page);
    const select = getSelect(page);
    const host = getHost(page);

    await addEventListener(select, 'change');

    await expect(getDropdownList(page), 'initially').toBeHidden();

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown'); //this just opens the dropdown
    await waitForStencilLifecycle(page);

    expect(getDropdownList(page), 'after ArrowDown').toBeVisible();
    expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted custom option').toBe(0);
    expect(await getSelectedIndex(page), 'for selected custom option').toBe(0);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'after Enter').toBeHidden();
    expect(await getSelectedIndex(page), 'for selected index').toBe(0);

    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(0);

    await host.click();
    await waitForStencilLifecycle(page);
    expect(await getComboboxAriaActiveDescendant(page), 'for active descendant').toEqual(
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

    expect(await getHighlightedDropdownOptionIndex(page)).toBe(2);
  });

  test('should skip disabled option on arrow up', async ({ page }) => {
    await initSelect(page, { disabledIndex: 1, selectedIndex: 2 });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp'); //this just opens the dropdown
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedDropdownOptionIndex(page)).toBe(0);
  });

  test('should highlight correct position on multiple key actions and select the correct position', async ({
    page,
  }) => {
    await initSelect(page, { amount: 5, disabledIndex: 1 });
    const select = getSelect(page);
    await addEventListener(select, 'change');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowDown'); //this just opens the dropdown
    await waitForStencilLifecycle(page);

    expect(await getDropdownOpacity(page), 'for opacity').toBe('1');

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

  test('should open select with space bar', async ({ page }) => {
    await initSelect(page);
    const select = getSelect(page);

    await addEventListener(select, 'change');

    await page.keyboard.press('Tab');
    await expect(getDropdownList(page), 'for dropdown list after tab').toBeHidden();

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    await expect(getDropdownList(page), 'for dropdown list after space').toBeVisible();
    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(0);
  });

  test('should select correct option with space bar', async ({ page }) => {
    await initSelect(page);
    const select = getSelect(page);

    await addEventListener(select, 'change');

    await page.keyboard.press('Tab');
    await expect(getDropdownList(page), 'for dropdown list after tab').toBeHidden();

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    await expect(getDropdownList(page), 'for dropdown list after space').toBeVisible();

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted custom option').toBe(1);

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    expect(await getSelectedIndex(page), 'for selected index').toBe(1);
    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(1);
  });

  test.describe('when dropdown is not open', () => {
    test('should not highlight and select option on PageDown', async ({ page }) => {
      await initSelect(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      await expect(getDropdownList(page), 'for dropdown list after page down').toBeHidden();
      expect(await getSelectedIndex(page), 'for selected index').toBe(0);
    });

    test('should not highlight and select option on PageUp', async ({ page }) => {
      await initSelect(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      await expect(getDropdownList(page), 'for dropdown list after page up').toBeHidden();
      expect(await getSelectedIndex(page), 'for selected index').toBe(0);
    });
  });

  test.describe('when dropdown is open', () => {
    test('should highlight and select last option on PageDown', async ({ page }) => {
      await initSelect(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted custom option').toBe(2);
      expect(await getSelectedDropdownOptionIndex(page), 'for selected custom option').toBe(0);
      expect(await getSelectedIndex(page), 'for selected index').toBe(0);

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      await expect(getDropdownList(page), 'for dropdown list after space').toBeHidden();
      expect(await getSelectedIndex(page), 'for selected index').toBe(2);
    });

    test('should highlight and select first option on PageUp', async ({ page }) => {
      await initSelect(page, { selectedIndex: 2 });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted custom option').toBe(0);
      expect(await getSelectedDropdownOptionIndex(page), 'for selected custom option').toBe(2);
      expect(await getSelectedIndex(page), 'for selected index').toBe(2);

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      await expect(getDropdownList(page), 'for dropdown list after space').toBeHidden();
      expect(await getSelectedIndex(page), 'for selected index').toBe(0);
    });

    test('should not select option on Escape and close dropdown', async ({ page }) => {
      await initSelect(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted custom option').toBe(1);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getSelectedIndex(page), 'for selected index').toBe(0);
      await expect(getDropdownList(page), 'for dropdown list').toBeHidden();
    });

    test('should highlight first matching option via keyboard search', async ({ page }) => {
      await initSelect(page, { beginUnique: true });

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      await page.keyboard.press('c');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted custom option').toBe(2);
      expect(await getSelectedDropdownOptionIndex(page), 'for selected custom option').toBe(0);
      expect(await getSelectedIndex(page), 'for selected index').toBe(0);
    });
  });

  test('should open/close select on mouseclick', async ({ page }) => {
    await initSelect(page);

    const host = getHost(page);
    await host.click();
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'after 1st click').toBeVisible();
    expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted custom option  after 1st click').toBe(0);

    await host.click();
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'after 2nd click').toBeHidden();
  });

  test('should open/close select on icon click', async ({ page }) => {
    await initSelect(page);

    const icon = getSelectIcon(page);
    const clickIcon = async () => {
      const { top, bottom, left, right } = await getElementPositions(page, icon);
      // click center of where icon is located
      await page.mouse.click(left + (right - left) / 2, top + (bottom - top) / 2);
      await waitForStencilLifecycle(page);
    };

    await clickIcon();

    await expect(getDropdownList(page), 'after 1st click').toBeVisible();
    expect(await getHighlightedDropdownOptionIndex(page), 'for highlighted custom option after 1st click').toBe(0);

    await clickIcon();

    await expect(getDropdownList(page), 'after 2nd click').toBeHidden();
  });

  test('should select second option on mouseclick', async ({ page }) => {
    await initSelect(page);
    const host = getHost(page);

    await host.click();
    await waitForStencilLifecycle(page);
    expect(getDropdownList(page), 'after open').toBeVisible();

    const dropdownOption2 = getDropdownOption2(page);

    await dropdownOption2.click();
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'after option click').toBeHidden();
    expect(await getSelectedIndex(page), 'for selected index').toBe(1);
  });

  test('should select second option on mouseclick when used in custom element', async ({ page }) => {
    const customElementName = 'my-custom-element';

    const initCustomElement = `
<script type="text/javascript">
  window.customElements.define(
    '${customElementName}',
    class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = \`
<p-select-wrapper>
  <select>
    <option value="a">Option A</option>
    <option value="b">Option B</option>
    <option value="c">Option C</option>
  </select>
</p-select-wrapper>
\`; }});
</script>`;

    await setContentWithDesignSystem(
      page,
      `
        ${initCustomElement}
        <${customElementName}></${customElementName}>`
    );

    const host = page.locator(`${customElementName} p-select-wrapper`);
    await host.click();
    await waitForStencilLifecycle(page);

    const nestedDropdownSelector = `${customElementName} ${dropdownSelector}`;
    const dropdownOption2 = page.locator(`${nestedDropdownSelector} .option:nth-child(2)`);
    const dropdownOption2BoundingBox = await dropdownOption2.boundingBox();

    const dropdownInCustomElement = page.locator(nestedDropdownSelector);
    const getSelectedOptionInCustomElement = () => getElementIndex(dropdownInCustomElement, `.${selectedClass}`);

    expect(await getSelectedOptionInCustomElement(), 'initially').toBe(0);

    await waitForStencilLifecycle(page);
    await page.mouse.click(dropdownOption2BoundingBox.x + 2, dropdownOption2BoundingBox.y + 2);
    await waitForStencilLifecycle(page);

    expect(
      await getProperty(page.locator(`${customElementName} p-select-wrapper select`), 'selectedIndex'),
      'after click'
    ).toBe(1);
  });

  test('should close select on tab', async ({ page }) => {
    await initSelect(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'after space').toBeVisible();

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    await expect(getDropdownList(page), 'after tab').toBeHidden();
    expect(await selectHasFocus(page)).toBe(false);
  });

  test('should remove and re-attach events', async ({ page }) => {
    await initSelect(page);

    const host = getHost(page);
    await host.click();
    await waitForStencilLifecycle(page);
    const dropdownCombobox = getDropdownCombobox(page);
    const dropdownList = getDropdownList(page);

    await addEventListener(dropdownCombobox, 'mousedown');
    await addEventListener(dropdownCombobox, 'keydown');
    await addEventListener(dropdownList, 'keydown');

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(host);

    await dropdownCombobox.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(dropdownCombobox, 'mousedown')).counter, 'after 1st click').toBe(1);

    await dropdownCombobox.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(dropdownCombobox, 'mousedown')).counter, 'after 2nd click').toBe(2);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(dropdownCombobox, 'keydown')).counter, 'after key presses for combobox').toBe(2);
    expect((await getEventSummary(dropdownList, 'keydown')).counter, 'after key presses for list').toBe(0);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initSelect(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-select-wrapper'], 'componentDidLoad: p-select-wrapper').toBe(1);
    expect(status.componentDidLoad['p-select-wrapper-dropdown'], 'componentDidLoad: p-select-wrapper-dropdown').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark of selected option

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await openSelect(page);

    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark of selected option
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips if second option is clicked', async ({ page }) => {
    await initSelect(page);
    await openSelect(page);

    const dropdownOption2 = getDropdownOption2(page);

    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-icon'], '1st componentDidLoad: p-icon').toBe(2); // arrow down and checkmark of selected option
    expect(status1.componentDidLoad.all, '1st componentDidLoad: all').toBe(4);

    expect(
      status1.componentDidUpdate['p-select-wrapper-dropdown'],
      '1st componentDidUpdate: p-select-wrapper-dropdown'
    ).toBe(1);
    expect(status1.componentDidUpdate.all, '1st componentDidUpdate: all').toBe(1);

    await dropdownOption2.click();
    await waitForStencilLifecycle(page);
    const status2 = await getLifecycleStatus(page);

    expect(status2.componentDidLoad['p-icon'], '2nd componentDidLoad: p-icon').toBe(3);
    expect(
      status2.componentDidUpdate['p-select-wrapper-dropdown'],
      '2nd componentDidUpdate: p-select-wrapper-dropdown'
    ).toBe(2);

    expect(status2.componentDidLoad.all, '2nd componentDidLoad: all').toBe(5);
    expect(status2.componentDidUpdate.all, '2nd componentDidUpdate: all').toBe(2);
  });
});

test.describe('optgroups', () => {
  test('should disable all options inside disabled optgroup', async ({ page }) => {
    await initSelect(page, { includeOptgroups: true });

    await openSelect(page);
    await waitForStencilLifecycle(page);

    const disabledOptgroupClassRegex = new RegExp(disabledOptgroupClass);
    const disabledClassRegex = new RegExp(disabledClass);

    const optgroup = page.locator('span[role="presentation"]').getByText('b');
    await expect(optgroup).not.toHaveClass(disabledOptgroupClassRegex);
    const child = page.getByRole('option').getByText('b');

    await expect(child).not.toHaveClass(disabledClassRegex);

    page.locator('optgroup[label="b"]').evaluate((element) => (element.disabled = true));
    await waitForStencilLifecycle(page);

    await expect(optgroup).toHaveClass(disabledOptgroupClassRegex);
    await expect(child).toHaveClass(disabledClassRegex);
  });

  test('should hide all options inside hidden optgroup', async ({ page }) => {
    await initSelect(page, { includeOptgroups: true });

    await openSelect(page);
    await waitForStencilLifecycle(page);

    const optgroup = page.locator('span[role="presentation"]').getByText('b');
    await expect(optgroup).toBeVisible();
    const child = page.getByRole('option').getByText('b');

    await expect(child).toBeVisible();

    page.locator('optgroup[label="b"]').evaluate((element) => (element.hidden = true));
    await waitForStencilLifecycle(page);

    await expect(optgroup).toBeHidden();
    await expect(child).toBeHidden();
  });
});
