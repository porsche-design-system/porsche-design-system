import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getCssClasses,
  getElementIndex,
  getElementPositions,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getPageThrownErrorsAmount,
  getProperty,
  getShadowRoot,
  initPageErrorObserver,
  reattachElementHandle,
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
const getSelectIcon = () => selectNode(page, 'p-select-wrapper >>> .icon');

const dropdownSelector = 'p-select-wrapper >>> p-select-wrapper-dropdown';
const highlightedClass = 'option--highlighted';
const selectedClass = 'option--selected';
const disabledClass = 'option--disabled';
const hiddenClass = 'option--hidden';

const getDropdown = () => selectNode(page, dropdownSelector);
const getDropdownCombobox = () => selectNode(page, `${dropdownSelector} >>> [role="combobox"]`);
const getDropdownList = () => selectNode(page, `${dropdownSelector} >>> [role="listbox"]`);
const getDropdownOption1 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(1)`);
const getDropdownOption2 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(2)`);
const getDropdownOption4 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(4)`);
const getDisabledDropdownOption = () => selectNode(page, `${dropdownSelector} >>> .${disabledClass}`);
const getSelectedDropdownOption = () => selectNode(page, `${dropdownSelector} >>> .${selectedClass}`);
const getDropdownOptgroup = () => selectNode(page, `${dropdownSelector} >>> .optgroup`);
const getDropdownCheckmarkIcon = () => selectNode(page, `${dropdownSelector} >>> .icon`);

const getComboboxAriaActiveDescendant = async () => getAttribute(await getDropdownCombobox(), 'aria-activedescendant');
const getSelectedDropdownOptionId = async () => getAttribute(await getSelectedDropdownOption(), 'id');

const getDropdownOpacity = async () => getElementStyle(await getDropdownList(), 'opacity');
const selectHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('select'));
const getSelectedIndex = async () => getProperty(await getSelect(), 'selectedIndex');
const getDisabledDropdownOptionIndex = async () => getElementIndex(await getDropdownList(), `.${disabledClass}`);
const getSelectedDropdownOptionIndex = async () => getElementIndex(await getDropdownList(), `.${selectedClass}`);
const getHiddenDropdownOptionIndex = async () => getElementIndex(await getDropdownList(), `.${hiddenClass}`);
const getHighlightedDropdownOptionIndex = async () => getElementIndex(await getDropdownList(), `.${highlightedClass}`);
const getAriaSelectedTrueDropdownOptionIndex = async () =>
  getElementIndex(await getDropdownList(), '[aria-selected=true]');
const getAriaDisabledTrueDropdownOptionIndex = async () =>
  getElementIndex(await getDropdownList(), '[aria-disabled=true]');

const getAmountOfOptions = async () => (await getSelect()).evaluate((el) => el.childElementCount);
const getAmountOfDropdownOptions = async () => (await getDropdownList()).evaluate((el) => el.childElementCount);

const getAmountOfOptgroups = async () => (await getSelect()).evaluate((el) => el.querySelectorAll('optgroup').length);
const getAmountOfDropdownOptgroups = async () =>
  (await getDropdownList()).evaluate((el) => el.querySelectorAll('.optgroup').length);

const openSelect = async () => {
  const host = await getHost();
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
};

const initSelect = (opts?: InitOptions): Promise<void> => {
  const {
    amount = 3,
    isNative = false,
    dropdownDirection,
    markupBefore = '',
    disabledIndex,
    selectedIndex,
    hiddenIndex,
    beginUnique,
  } = opts || {};

  const options = [...'abc', ...(amount === 5 ? 'de' : '')].map((x, idx) => {
    const attrs = [
      disabledIndex === idx ? 'disabled' : '',
      selectedIndex === idx ? 'selected' : '',
      hiddenIndex === idx ? 'hidden' : '',
    ].join(' ');

    const val = x.toUpperCase();
    return `<option value="${x}" ${attrs}>${beginUnique ? `${val} Option` : `Option ${val}`}</option>`;
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

it('should render', async () => {
  await initSelect({ disabledIndex: 1 });

  await openSelect();

  const disabledDropdownOption = await getDisabledDropdownOption();

  expect(disabledDropdownOption).not.toBeNull();
  expect(await getAriaSelectedTrueDropdownOptionIndex()).toBe(0);
  expect(await getAriaDisabledTrueDropdownOptionIndex()).toBe(1);
});

it('should render with optgroups', async () => {
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

  await openSelect();

  const dropdownList = await getDropdownList();
  const dropdownOptgroup = await getDropdownOptgroup();

  expect(dropdownOptgroup).not.toBeNull();
  expect(await getElementIndex(dropdownList, '[aria-selected=true]')).toBe(1);
  expect(await getAmountOfDropdownOptgroups()).toEqual(await getAmountOfOptgroups());
});

it('should render with a mix of options and optgroup', async () => {
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

  await openSelect();

  const dropdownOptgroup = await getDropdownOptgroup();

  expect(dropdownOptgroup).not.toBeNull();
  expect(await getAmountOfDropdownOptgroups()).toEqual(await getAmountOfOptgroups());
});

it('should not render dropdown if touch support is detected', async () => {
  await page.emulate(devices['iPhone X']);
  await initSelect();

  const dropdown = await getDropdown();
  expect(dropdown).toBeNull();
});

it('should not render dropdown if touch support is detected and native is set to false', async () => {
  await page.emulate(devices['iPhone X']);
  await initSelect({ isNative: false });

  const dropdown = await getDropdown();
  expect(dropdown).toBeNull();
});

it('should not render if native prop is set to true', async () => {
  await initSelect({ isNative: true });

  const dropdown = await getDropdown();
  expect(dropdown).toBeNull();
});

it('should disable select when disabled programmatically', async () => {
  await initSelect();
  const select = await getSelect();
  const getSelectCursorStyle = () => getElementStyle(select, 'cursor');

  expect(await getSelectCursorStyle(), 'initially').toBe('pointer');

  await setProperty(select, 'disabled', true);
  await waitForStencilLifecycle(page);

  expect(await getSelectCursorStyle(), 'when disabled = true').toBe('not-allowed');

  await setProperty(select, 'disabled', false);
  await waitForStencilLifecycle(page);

  expect(await getSelectCursorStyle(), 'when disabled = false').toBe('pointer');
});

it('should not render dropdown when select is disabled programmatically', async () => {
  await initSelect();
  const select = await getSelect();

  expect(await getDropdown(), 'initially').toBeTruthy();

  await setProperty(select, 'disabled', true);
  await waitForStencilLifecycle(page);

  expect(await getDropdown(), 'when disabled = true').toBeNull();

  await setProperty(select, 'disabled', false);
  await waitForStencilLifecycle(page);

  expect(await getDropdown(), 'when disabled = false').toBeTruthy();
});

it('should be visible if select is clicked and hidden again when clicked outside', async () => {
  await initSelect({ markupBefore: '<p-text>Some text</p-text>' });

  const host = await getHost();
  const text = await selectNode(page, 'p-text');

  expect(await getDropdownList()).toBeNull();

  await host.click();
  await waitForStencilLifecycle(page);
  expect(await getDropdownList()).toBeTruthy();

  await text.click();
  await waitForStencilLifecycle(page);
  expect(await getDropdownList()).toBeNull();

  await host.click();
  await waitForStencilLifecycle(page);
  expect(await getDropdownList()).toBeTruthy();

  await host.click();
  await waitForStencilLifecycle(page);
  expect(await getDropdownList()).toBeNull();
});

it('should add custom option if added to native select programmatically', async () => {
  await initSelect();
  const select = await getSelect();
  await openSelect();

  expect(await getAmountOfDropdownOptions()).toEqual(await getAmountOfOptions());

  await select.evaluate((el: HTMLSelectElement) => {
    const option = document.createElement('option');
    option.text = 'Test';
    el.add(option, 0);
  });
  await waitForStencilLifecycle(page);

  const dropdownOption1Text = await getProperty(await getDropdownOption1(), 'innerHTML');
  expect(dropdownOption1Text).toContain('Test');
  expect(await getAmountOfDropdownOptions()).toEqual(await getAmountOfOptions());
});

it('should observe selected property changes of native option if added programmatically', async () => {
  await initSelect();
  const select = await getSelect();
  await openSelect();

  await select.evaluate((el: HTMLSelectElement) => {
    const option = document.createElement('option');
    option.text = 'Test';
    el.add(option);
    el.options[3].selected = true;
  });
  await waitForStencilLifecycle(page);

  const dropdownOption4 = await getDropdownOption4();

  expect(await getCssClasses(dropdownOption4)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex()).toBe(3);
});

it('should add/remove disabled state to custom option item if added/removed property to native select programmatically', async () => {
  await initSelect({ disabledIndex: 1 });
  const select = await getSelect();
  await openSelect();
  const dropdownOption1 = await getDropdownOption1();
  const dropdownOption2 = await getDropdownOption2();

  expect(await getCssClasses(dropdownOption1)).not.toContain(disabledClass);
  expect(await getCssClasses(dropdownOption2)).toContain(disabledClass);
  expect(await getDisabledDropdownOptionIndex()).toBe(1);

  await select.evaluate((el: HTMLSelectElement) => (el.options[0].disabled = true));
  await select.evaluate((el: HTMLSelectElement) => (el.options[1].disabled = false));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).toContain(disabledClass);
  expect(await getCssClasses(dropdownOption2)).not.toContain(disabledClass);
  expect(await getDisabledDropdownOptionIndex()).toBe(0);
});

it('should add/remove disabled state to custom option item if added/removed attribute to native select programmatically', async () => {
  await initSelect({ disabledIndex: 1 });
  const select = await getSelect();
  await openSelect();
  const dropdownOption1 = await getDropdownOption1();
  const dropdownOption2 = await getDropdownOption2();

  expect(await getCssClasses(dropdownOption1)).not.toContain(disabledClass);
  expect(await getCssClasses(dropdownOption2)).toContain(disabledClass);
  expect(await getDisabledDropdownOptionIndex()).toBe(1);

  await select.evaluate((el: HTMLSelectElement) => el.options[0].setAttribute('disabled', 'disabled'));
  await select.evaluate((el: HTMLSelectElement) => el.options[1].removeAttribute('disabled'));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).toContain(disabledClass);
  expect(await getCssClasses(dropdownOption2)).not.toContain(disabledClass);
  expect(await getDisabledDropdownOptionIndex()).toBe(0);
});

it('should synchronize custom option and native select if selected property is set programmatically', async () => {
  await initSelect();
  const select = await getSelect();
  await openSelect();
  const dropdownOption1 = await getDropdownOption1();
  const dropdownOption2 = await getDropdownOption2();

  expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).not.toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex()).toBe(0);

  await select.evaluate((el: HTMLSelectElement) => (el.options[1].selected = true));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex()).toBe(1);
});

it('should synchronize custom option and native select if selected attribute is set programmatically', async () => {
  await initSelect();
  const select = await getSelect();
  await openSelect();
  const dropdownOption1 = await getDropdownOption1();
  const dropdownOption2 = await getDropdownOption2();

  expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).not.toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex()).toBe(0);

  await select.evaluate((el: HTMLSelectElement) => el.options[1].setAttribute('selected', 'selected'));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex()).toBe(1);
});

it('should synchronize custom option and native select if selected value property is changed programmatically', async () => {
  await initSelect();
  const select = await getSelect();
  await openSelect();
  const dropdownOption1 = await getDropdownOption1();
  const dropdownOption2 = await getDropdownOption2();

  expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex()).toBe(0);

  await setProperty(select, 'value', 'b');
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex()).toBe(1);
});

it('should synchronize custom option and native select if selectedIndex property is changed programmatically', async () => {
  await initSelect();
  const select = await getSelect();
  await openSelect();
  const dropdownOption1 = await getDropdownOption1();
  const dropdownOption2 = await getDropdownOption2();

  expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex()).toBe(0);

  await setProperty(select, 'selectedIndex', 1);
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex()).toBe(1);
});

it('should add selected state to custom option item if selected property of option is set', async () => {
  await initSelect();
  const select = await getSelect();
  await openSelect();
  const dropdownOption1 = await getDropdownOption1();
  const dropdownOption2 = await getDropdownOption2();

  expect(await getCssClasses(dropdownOption1)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex()).toBe(0);

  await select.evaluate((el: HTMLSelectElement) => (el.options[1].selected = true));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption1)).not.toContain(selectedClass);
  expect(await getCssClasses(dropdownOption2)).toContain(selectedClass);
  expect(await getSelectedDropdownOptionIndex()).toBe(1);
});

it('should hide/show custom option item if hidden attribute is added/removed to native select programmatically', async () => {
  await initSelect();
  const select = await getSelect();
  await openSelect();
  const dropdownOption2 = await getDropdownOption2();

  await select.evaluate((el: HTMLSelectElement) => (el.options[1].hidden = true));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption2)).toContain(hiddenClass);
  expect(await getHiddenDropdownOptionIndex()).toBe(1);

  await select.evaluate((el: HTMLSelectElement) => (el.options[1].hidden = false));
  await waitForStencilLifecycle(page);

  expect(await getCssClasses(dropdownOption2)).not.toContain(hiddenClass);
});

it('should not render initial hidden option fields', async () => {
  await initSelect({ hiddenIndex: 0 });
  await openSelect();
  const dropdownOption1 = await getDropdownOption1();
  expect(await getCssClasses(dropdownOption1)).toContain(hiddenClass);
});

it('should not throw error with long option list and the same item is selected and disabled', async () => {
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

  const dropdownCombobox = await getDropdownCombobox();
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

it('should not set checkmark icon if option is both selected and disabled', async () => {
  await initSelect({ disabledIndex: 0, selectedIndex: 0 });

  expect(await getDropdownCheckmarkIcon()).toBeNull();
});

// puppeteer ignores @media(hover: hover) styles, but playwright can handle it
xdescribe('hover state', () => {
  it('should change border-color when dropdown combobox is hovered', async () => {
    await initSelect();
    await page.mouse.move(0, 300); // avoid potential hover initially

    const dropdownCombobox = await getDropdownCombobox();
    const initialStyle = await getElementStyle(dropdownCombobox, 'borderColor');
    expect(initialStyle).toBe('rgb(107, 109, 112)');

    await dropdownCombobox.hover();
    const hoverStyle = await getElementStyle(dropdownCombobox, 'borderColor');
    expect(hoverStyle).toBe('rgb(1, 2, 5)');
  });
});

describe('dropdown position', () => {
  const expectedDropdownStyle = '1px solid rgb(107, 109, 112)';

  it('should set direction to up', async () => {
    await initSelect({ dropdownDirection: 'up' });

    const dropdownCombobox = await getDropdownCombobox();
    await dropdownCombobox.click();
    await waitForStencilLifecycle(page);

    const dropdownStyle = await getElementStyle(await getDropdownList(), 'borderBottom');
    expect(dropdownStyle).toBe(expectedDropdownStyle);
  });

  it('should set direction to down', async () => {
    await initSelect({ dropdownDirection: 'down' });

    const dropdownCombobox = await getDropdownCombobox();
    await dropdownCombobox.click();
    await waitForStencilLifecycle(page);

    const dropdownStyle = await getElementStyle(await getDropdownList(), 'borderTop');
    expect(dropdownStyle).toBe(expectedDropdownStyle);
  });

  it('should auto position to up if bottom space is less than dropdown height', async () => {
    await page.setViewport({
      width: 800,
      height: 650,
    });
    await initSelect({ amount: 5, markupBefore: '<div style="height: 550px;"></div>' });

    const dropdownCombobox = await getDropdownCombobox();
    await dropdownCombobox.click();
    await waitForStencilLifecycle(page);

    const dropdownStyle = await getElementStyle(await getDropdownList(), 'borderBottom');
    expect(dropdownStyle).toBe(expectedDropdownStyle);
  });
});

describe('keyboard and click events', () => {
  it('should highlight first position on arrow down', async () => {
    await initSelect();
    const select = await getSelect();
    const host = await getHost();

    await addEventListener(select, 'change');

    expect(await getDropdownList(), 'initially').toBeNull();

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'after ArrowDown').toBeTruthy();
    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option').toBe(1);
    expect(await getSelectedIndex(), 'for selected custom option').toBe(0);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'after Enter').toBeNull();
    expect(await getSelectedIndex(), 'for selected index').toBe(1);

    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(1);

    await host.click();
    await waitForStencilLifecycle(page);
    expect(await getComboboxAriaActiveDescendant(), 'for active descendant').toEqual(
      `option-${await getSelectedDropdownOptionIndex()}`
    );
  });

  it('should skip disabled option on arrow down', async () => {
    await initSelect({ disabledIndex: 1 });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedDropdownOptionIndex()).toBe(2);
  });

  it('should skip disabled option on arrow up', async () => {
    await initSelect({ disabledIndex: 1, selectedIndex: 2 });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp'); //this just opens the dropdown
    await waitForStencilLifecycle(page);

    expect(await getHighlightedDropdownOptionIndex()).toBe(0);
  });

  it('should highlight correct position on multiple key actions', async () => {
    await initSelect({ amount: 5, disabledIndex: 1 });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getDropdownOpacity(), 'for opacity').toBe('1');
    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option').toBe(3);

    await page.keyboard.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option').toBe(2);
  });

  it('should open select with space bar', async () => {
    await initSelect();
    const select = await getSelect();

    await addEventListener(select, 'change');

    await page.keyboard.press('Tab');
    expect(await getDropdownList(), 'for dropdown list after tab').toBeNull();

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    expect(await getDropdownList(), 'for dropdown list after space').toBeTruthy();
    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(0);
  });

  it('should select correct option with space bar', async () => {
    await initSelect();
    const select = await getSelect();

    await addEventListener(select, 'change');

    await page.keyboard.press('Tab');
    expect(await getDropdownList(), 'for dropdown list after tab').toBeNull();

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    expect(await getDropdownList(), 'for dropdown list after space').toBeTruthy();

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option').toBe(1);

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    expect(await getSelectedIndex(), 'for selected index').toBe(1);
    expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(1);
  });

  describe('when dropdown is not open', () => {
    it('should not highlight and select option on PageDown', async () => {
      await initSelect();

      await page.keyboard.press('Tab');
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownList(), 'for dropdown list after page down').toBeNull();
      expect(await getSelectedIndex(), 'for selected index').toBe(0);
    });

    it('should not highlight and select option on PageUp', async () => {
      await initSelect();

      await page.keyboard.press('Tab');
      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getDropdownList(), 'for dropdown list after page up').toBeNull();
      expect(await getSelectedIndex(), 'for selected index').toBe(0);
    });
  });

  describe('when dropdown is open', () => {
    it('should highlight and select last option on PageDown', async () => {
      await initSelect();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option').toBe(2);
      expect(await getSelectedDropdownOptionIndex(), 'for selected custom option').toBe(0);
      expect(await getSelectedIndex(), 'for selected index').toBe(0);

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getDropdownList(), 'for dropdown list after space').toBeNull();
      expect(await getSelectedIndex(), 'for selected index').toBe(2);
    });

    it('should highlight and select first option on PageUp', async () => {
      await initSelect({ selectedIndex: 2 });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option').toBe(0);
      expect(await getSelectedDropdownOptionIndex(), 'for selected custom option').toBe(2);
      expect(await getSelectedIndex(), 'for selected index').toBe(2);

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getDropdownList(), 'for dropdown list after space').toBeNull();
      expect(await getSelectedIndex(), 'for selected index').toBe(0);
    });

    it('should not select option on Escape and close dropdown', async () => {
      await initSelect();

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option').toBe(1);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getSelectedIndex(), 'for selected index').toBe(0);
      expect(await getDropdownList(), 'for dropdown list').toBeNull();
    });

    it('should highlight first matching option via keyboard search', async () => {
      await initSelect({ beginUnique: true });

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      await page.keyboard.press('c');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option').toBe(2);
      expect(await getSelectedDropdownOptionIndex(), 'for selected custom option').toBe(0);
      expect(await getSelectedIndex(), 'for selected index').toBe(0);
    });
  });

  it('should open/close select on mouseclick', async () => {
    await initSelect();

    const host = await getHost();
    await host.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'after 1st click').toBeTruthy();
    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option  after 1st click').toBe(0);

    await host.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'after 2nd click').toBeNull();
  });

  it('should open/close select on icon click', async () => {
    await initSelect();

    const icon = await getSelectIcon();
    const clickIcon = async () => {
      const { top, bottom, left, right } = await getElementPositions(page, icon);
      // click center of where icon is located
      await page.mouse.click(left + (right - left) / 2, top + (bottom - top) / 2);
      await waitForStencilLifecycle(page);
    };

    await clickIcon();

    expect(await getDropdownList(), 'after 1st click').toBeTruthy();
    expect(await getHighlightedDropdownOptionIndex(), 'for highlighted custom option after 1st click').toBe(0);

    await clickIcon();

    expect(await getDropdownList(), 'after 2nd click').toBeNull();
  });

  it('should select second option on mouseclick', async () => {
    await initSelect();
    const host = await getHost();

    await host.click();
    await waitForStencilLifecycle(page);
    expect(await getDropdownList(), 'after open').toBeTruthy();

    const dropdownOption2 = await getDropdownOption2();

    await dropdownOption2.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'after option click').toBeNull();
    expect(await getSelectedIndex(), 'for selected index').toBe(1);
  });

  it('should select second option on mouseclick when used in custom element', async () => {
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

    const host = await selectNode(page, `${customElementName} >>> p-select-wrapper`);
    await host.click();
    await waitForStencilLifecycle(page);

    const dropdownCombobox = await selectNode(
      page,
      `${customElementName} >>> p-select-wrapper >>> p-select-wrapper-dropdown >>> [role="combobox"]`
    );

    const nestedDropdownSelector = `${customElementName} >>> ${dropdownSelector}`;
    const dropdownOption2 = await selectNode(page, `${nestedDropdownSelector} >>> .option:nth-child(2)`);
    const dropdownOption2BoundingBox = await dropdownOption2.boundingBox();

    const dropdownInCustomElement = await getShadowRoot(await selectNode(page, nestedDropdownSelector));
    const getSelectedOptionInCustomElement = () => getElementIndex(dropdownInCustomElement, `.${selectedClass}`);

    expect(await getSelectedOptionInCustomElement(), 'initially').toBe(0);

    await waitForStencilLifecycle(page);
    await page.mouse.click(dropdownOption2BoundingBox.x + 2, dropdownOption2BoundingBox.y + 2);
    await waitForStencilLifecycle(page);

    expect(
      await getProperty(await selectNode(page, `${customElementName} >>> p-select-wrapper select`), 'selectedIndex'),
      'after click'
    ).toBe(1);
  });

  it('should close select on tab', async () => {
    await initSelect();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'after space').toBeTruthy();

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getDropdownList(), 'after tab').toBeNull();
    expect(await selectHasFocus()).toBe(false);
  });

  it('should remove and re-attach events', async () => {
    await initSelect();

    const host = await getHost();
    await host.click();
    await waitForStencilLifecycle(page);
    const dropdownCombobox = await getDropdownCombobox();
    const dropdownList = await getDropdownList();

    await addEventListener(dropdownCombobox, 'mousedown');
    await addEventListener(dropdownCombobox, 'keydown');
    await addEventListener(dropdownList, 'keydown');

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElementHandle(host);

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

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initSelect();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-select-wrapper'], 'componentDidLoad: p-select-wrapper').toBe(1);
    expect(status.componentDidLoad['p-select-wrapper-dropdown'], 'componentDidLoad: p-select-wrapper-dropdown').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await openSelect();

    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips if second option is clicked', async () => {
    await initSelect();
    await openSelect();

    const dropdownCombobox = await getDropdownCombobox();
    const dropdownOption2 = await getDropdownOption2();

    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-icon'], '1st componentDidLoad: p-icon').toBe(2);
    expect(status1.componentDidLoad.all, '1st componentDidLoad: all').toBe(4);

    expect(
      status1.componentDidUpdate['p-select-wrapper-dropdown'],
      '1st componentDidUpdate: p-select-wrapper-dropdown'
    ).toBe(1);
    expect(status1.componentDidUpdate.all, '1st componentDidUpdate: all').toBe(1);

    await dropdownOption2.click();
    await waitForStencilLifecycle(page);
    const status2 = await getLifecycleStatus(page);

    expect(status2.componentDidLoad['p-icon'], '2nd componentDidLoad: p-icon').toBe(2);
    expect(
      status2.componentDidUpdate['p-select-wrapper-dropdown'],
      '2nd componentDidUpdate: p-select-wrapper-dropdown'
    ).toBe(2);

    expect(status2.componentDidLoad.all, '2nd componentDidLoad: all').toBe(4);
    expect(status2.componentDidUpdate.all, '2nd componentDidUpdate: all').toBe(2);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initSelect();
    const dropdownCombobox = await getDropdownCombobox();
    const dropdown = await getDropdown();

    await expectA11yToMatchSnapshot(page, dropdownCombobox, { interestingOnly: false });
    await expectA11yToMatchSnapshot(page, dropdown, { interestingOnly: true });
  });

  it('should expose correct initial accessibility tree in open state', async () => {
    await initSelect({ disabledIndex: 1 });
    const host = await getHost();
    const dropdownCombobox = await getDropdownCombobox();
    const dropdown = await getDropdown();

    await host.click();
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, dropdownCombobox, { interestingOnly: false });
    await expectA11yToMatchSnapshot(page, dropdown, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if rendered with optgroups in open state', async () => {
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

    const host = await getHost();
    const dropdown = await getDropdown();

    await host.click();
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, dropdown, { interestingOnly: false });
    expect(await getComboboxAriaActiveDescendant()).toEqual(await getSelectedDropdownOptionId());
  });

  it('should expose correct accessibility tree if open/closed', async () => {
    await initSelect();

    const host = await getHost();
    const dropdownCombobox = await getDropdownCombobox();

    await expectA11yToMatchSnapshot(page, dropdownCombobox, { message: 'Initially' });

    await host.click();
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, dropdownCombobox, { message: 'After click' });
  });

  it('should expose correct accessibility tree on selected custom option on click in open state', async () => {
    await initSelect();

    const host = await getHost();
    await host.click();
    await waitForStencilLifecycle(page);

    const dropdownOption1 = await getDropdownOption1();
    const dropdownOption2 = await getDropdownOption2();
    await expectA11yToMatchSnapshot(page, dropdownOption1, { message: 'Initially option A', interestingOnly: false });
    await expectA11yToMatchSnapshot(page, dropdownOption2, { message: 'Initially option B', interestingOnly: false });

    await dropdownOption2.click();
    await waitForStencilLifecycle(page);
    await host.click();
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, await getDropdownOption1(), {
      message: 'Option A after click',
      interestingOnly: false,
    });
    await expectA11yToMatchSnapshot(page, await getDropdownOption2(), {
      message: 'Option B after click',
      interestingOnly: false,
    });
  });

  it('should expose correct accessibility tree if description is set', async () => {
    await initSelect();
    const host = await getHost();
    await setProperty(host, 'description', 'Some description');
    await host.click();
    await waitForStencilLifecycle(page);
    const dropdownCombobox = await getDropdownCombobox();

    await expectA11yToMatchSnapshot(page, dropdownCombobox);
  });

  it('should expose correct accessibility tree in error state', async () => {
    await initSelect();
    const host = await getHost();
    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message');
    await host.click();
    await waitForStencilLifecycle(page);
    const dropdownCombobox = await getDropdownCombobox();

    await expectA11yToMatchSnapshot(page, dropdownCombobox);
  });
});
