import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import type { Components } from '@porsche-design-system/components/src/components';
import {
  addEventListener,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getConsoleErrorsAmount,
  getElementStyle,
  getEventSummary,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  initConsoleObserver,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowser,
  waitForStencilLifecycle,
} from '../helpers';
import type { MultiSelectOption } from '@porsche-design-system/components/dist/types/components/multi-select/multi-select/multi-select-utils';

const getHost = (page: Page) => page.$('p-multi-select');
const getMultiSelectValue = async (page: Page): Promise<string[]> => await getProperty(await getHost(page), 'value');
const getInputContainer = (page: Page) => page.$('p-multi-select .wrapper');
const getInput = (page: Page) => page.$('p-multi-select input');
const getInputValue = async (page: Page): Promise<string> => getProperty(await getInput(page), 'value');
const getInputPlaceholder = async (page: Page): Promise<string> => getAttribute(await getInput(page), 'placeholder');
const getDropdown = (page: Page) => page.$('p-multi-select .listbox');
const getDropdownDisplay = async (page: Page): Promise<string> =>
  await getElementStyle(await getDropdown(page), 'display');
const getShadowDropdownOption = (page: Page, n: number) => page.$(`p-multi-select .listbox div:nth-child(${n})`);
const getMultiSelectOption = (page: Page, n: number) =>
  page.$(`p-multi-select p-multi-select-option:nth-child(${n + 1})`); // First one is native select
const getMultiSelectOptions = (page: Page) => page.$$('p-multi-select p-multi-select-option');
const getAmountOfVisibleMultiSelectOptions = async (page: Page): Promise<number> =>
  await page.$$eval(
    'p-multi-select p-multi-select-option',
    (options) => options.filter((option: HTMLElement) => !option.hidden).length
  );
const getSelectedMultiSelectOptionProperty = async <K extends keyof MultiSelectOption>(
  page: Page,
  property: K
): Promise<MultiSelectOption[K][]> =>
  await page.$$eval(
    'p-multi-select p-multi-select-option',
    (options, property) =>
      options
        .filter((option: MultiSelectOption) => option.selected)
        .map((option: MultiSelectOption) => option[property]) as MultiSelectOption[K][],
    property
  );
const getHighlightedOptionIndex = async (page: Page): Promise<number> =>
  await page.$$eval('p-multi-select p-multi-select-option', (options: MultiSelectOption[]) =>
    options.filter((option) => !option.hidden).indexOf(options.find((option: MultiSelectOption) => option.highlighted))
  );
const getSelectedOptionIndicies = async (page: Page): Promise<number[]> =>
  await page.$$eval('p-multi-select p-multi-select-option', (options) =>
    options.filter((option: any) => option.selected).map((option) => options.indexOf(option))
  );
const getNativeSelect = (page: Page) => page.$('p-multi-select select');
const getNativeSelectValue = async (page: Page): Promise<string> =>
  await getProperty(await getNativeSelect(page), 'value');
const getNativeSelectOptions = (page: Page) => page.$$('p-multi-select select option');
const getLabel = (page: Page) => page.$('p-multi-select label');
const getResetButton = (page: Page) => page.$('p-multi-select .button');

const setValue = async (page: Page, value: string[]) =>
  await page.evaluate(({ el, value }) => ((el as HTMLPMultiSelectElement).value = value), {
    el: await getHost(page),
    value,
  });

const addOption = async (page: Page, value: string, textContent?: string) => {
  await page.evaluate(
    ({ el, value, textContent }) => {
      const option: any = document.createElement('p-multi-select-option');
      option.value = value;
      option.textContent = textContent;
      el.append(option);
    },
    {
      el: await getHost(page),
      value,
      textContent: textContent ? textContent : value,
    }
  );
};

const removeLastOption = async (page: Page) => {
  await page.evaluate((el) => el.lastElementChild.remove(), await getHost(page));
};

type InitOptions = {
  props?: Components.PMultiSelect;
  slots?: {
    label?: string;
    description?: string;
    message?: string;
  };
  options?: {
    amount?: 3 | 5;
    disabledIndex?: number;
    isWithinForm?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initMultiSelect = (page: Page, opt?: InitOptions): Promise<void> => {
  const { props = { name: 'name' }, slots, options } = opt || {};
  const { amount = 3, disabledIndex, isWithinForm = true, markupBefore = '', markupAfter = '' } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const selectOptions = [...'abc', ...(amount === 5 ? 'de' : '')]
    .map((x, idx) => {
      const attrs = [disabledIndex === idx ? 'disabled' : ''].join(' ');
      return `<p-multi-select-option value="${x}" ${attrs}>Option ${x.toUpperCase()}</p-multi-select-option>`;
    })
    .join('\n');

  const markup = `${markupBefore}
      <p-multi-select ${getHTMLAttributes(props)}>
        ${label}
        ${description}
        ${selectOptions}
        ${message}
      </p-multi-select>
      ${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test('should render', async ({ page }) => {
  await initMultiSelect(page);
  const inputElement = await getInput(page);
  expect(inputElement).not.toBeNull();

  expect(await getDropdownDisplay(page)).toBe('none');

  await inputElement.click();
  await waitForStencilLifecycle(page);

  expect(await getDropdownDisplay(page)).toBe('flex');
});

test.describe('native select', () => {
  test('should be rendered', async ({ page }) => {
    await initMultiSelect(page);
    const nativeSelectElement = await getNativeSelect(page);
    expect(nativeSelectElement).not.toBeNull();
    expect(await getProperty(nativeSelectElement, 'multiple')).toBeTruthy();
    expect(await nativeSelectElement.evaluate((el: HTMLSelectElement) => el.selectedOptions.length)).toBe(0);
  });

  test('should not be visible', async ({ page }) => {
    await initMultiSelect(page);
    const nativeSelectElement = await getNativeSelect(page);
    expect(await getElementStyle(nativeSelectElement, 'opacity')).toBe('0');
  });

  test('props should be in sync', async ({ page }) => {
    await initMultiSelect(page);
    const nativeSelectElement = await getNativeSelect(page);
    expect(await getAttribute(nativeSelectElement, 'name')).toBe('name');

    const host = await getHost(page);
    await setProperty(host, 'required', true);
    await setProperty(host, 'disabled', true);

    await waitForStencilLifecycle(page);

    expect(await getProperty(nativeSelectElement, 'required')).toBe(true);
    expect(await getProperty(nativeSelectElement, 'disabled')).toBe(true);

    await setProperty(host, 'required', false);
    await setProperty(host, 'disabled', false);

    await waitForStencilLifecycle(page);

    expect(await getProperty(nativeSelectElement, 'required')).toBe(false);
    expect(await getProperty(nativeSelectElement, 'disabled')).toBe(false);
  });

  test('should be in sync with selected options when selecting option', async ({ page }) => {
    await initMultiSelect(page);
    const nativeSelectOptions = await getNativeSelectOptions(page);
    expect(nativeSelectOptions.length, 'initial').toEqual(0);

    const inputElement = await getInput(page);
    await inputElement.click();
    await waitForStencilLifecycle(page);

    const option = await getMultiSelectOption(page, 1);
    await option.click();
    await waitForStencilLifecycle(page);
    const nativeSelectOptions1 = await getNativeSelectOptions(page);

    expect(nativeSelectOptions1[0], 'after selected').not.toBeUndefined();
    expect(await getProperty(nativeSelectOptions1[0], 'value'), 'after selected').toEqual('a');

    await option.click();
    await waitForStencilLifecycle(page);
    const nativeSelectOptions2 = await getNativeSelectOptions(page);
    expect(nativeSelectOptions2[0], 'after unselected').toBeUndefined();
    expect(nativeSelectOptions2.length, 'after unselected').toEqual(0);
  });

  test('should be in sync with selected options when setting value', async ({ page }) => {
    await initMultiSelect(page);
    const nativeSelectOptions = await getNativeSelectOptions(page);
    expect(nativeSelectOptions.length, 'initial').toEqual(0);

    await setValue(page, ['a']);
    await waitForStencilLifecycle(page);
    const nativeSelectOptions1 = await getNativeSelectOptions(page);

    expect(nativeSelectOptions1[0], 'after selected').not.toBeUndefined();
    expect(await getProperty(nativeSelectOptions1[0], 'value'), 'after selected').toEqual('a');

    await setValue(page, []);
    await waitForStencilLifecycle(page);
    const nativeSelectOptions2 = await getNativeSelectOptions(page);
    expect(nativeSelectOptions2[0], 'after unselected').toBeUndefined();
    expect(nativeSelectOptions2.length, 'after unselected').toEqual(0);
  });

  test('should be in sync when resetting options', async ({ page }) => {
    await initMultiSelect(page);
    await setValue(page, ['a', 'b']);
    await waitForStencilLifecycle(page);

    const nativeSelectOptions = await getNativeSelectOptions(page);
    expect(nativeSelectOptions.length, 'initial').toEqual(2);
    expect(await getProperty(nativeSelectOptions[0], 'value')).toEqual('a');
    expect(await getProperty(nativeSelectOptions[1], 'value')).toEqual('b');

    const resetButton = await getResetButton(page);
    await resetButton.click();
    await waitForStencilLifecycle(page);

    const nativeSelectOptionsAfter = await getNativeSelectOptions(page);
    expect(nativeSelectOptionsAfter.length, 'after reset').toEqual(0);
    expect(nativeSelectOptionsAfter[0], 'after reset').toBeUndefined();
  });

  test('should be in sync with selected options when adding new selected option', async ({ page }) => {
    await initMultiSelect(page);

    const nativeSelectOptions = await getNativeSelectOptions(page);
    expect(nativeSelectOptions.length, 'initial').toEqual(0);

    await setValue(page, ['test']);
    await waitForStencilLifecycle(page);
    await addOption(page, 'test');
    await waitForStencilLifecycle(page);

    const nativeSelectOptionsAfter = await getNativeSelectOptions(page);

    expect(nativeSelectOptionsAfter[0]).not.toBeUndefined();
    expect(await getProperty(nativeSelectOptionsAfter[0], 'value')).toEqual('test');
  });

  test('should be in sync with selected options when removing selected option', async ({ page }) => {
    await initMultiSelect(page);
    await setValue(page, ['c']);
    await waitForStencilLifecycle(page);

    const nativeSelectOptions = await getNativeSelectOptions(page);
    expect(nativeSelectOptions.length, 'initial').toEqual(1);
    expect(await getProperty(nativeSelectOptions[0], 'value'), 'initial').toEqual('c');

    await removeLastOption(page);
    await waitForStencilLifecycle(page);

    const nativeSelectOptionsAfter = await getNativeSelectOptions(page);
    expect(nativeSelectOptionsAfter.length, 'after removing option').toEqual(0);
    expect(nativeSelectOptionsAfter[0]).toBeUndefined();
  });

  test('should not be rendered when used without wrapping form', async ({ page }) => {
    await initMultiSelect(page, {
      options: {
        isWithinForm: false,
      },
    });
    const nativeSelectElement = await getNativeSelect(page);
    expect(nativeSelectElement).toBeNull();
  });
});

test.describe('Update Event', () => {
  test('should emit update event with correct details when option is selected by click', async ({ page }) => {
    await initMultiSelect(page, { props: { name: 'options' } });
    const host = await getHost(page);
    await addEventListener(host, 'update');

    const inputElement = await getInput(page);
    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before option select').toBe(0);

    const option = await getMultiSelectOption(page, 1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after option select').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after option select').toEqual([
      {
        value: ['a'],
        name: 'options',
      },
    ]);
    expect((await getEventSummary(host, 'update')).targets, 'after option select').toEqual([
      {
        nodeName: 'P-MULTI-SELECT',
        nodeValue: null,
        nodeType: 1,
        tagName: 'P-MULTI-SELECT',
        className: 'hydrated',
        id: '',
      },
    ]);
  });

  test('should emit update event with correct details when option is selected by keyboard', async ({ page }) => {
    await initMultiSelect(page, { props: { name: 'options' } });
    const host = await getHost(page);
    await addEventListener(host, 'update');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before option select').toBe(0);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after option select').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after option select').toEqual([
      {
        value: ['a'],
        name: 'options',
      },
    ]);
    expect((await getEventSummary(host, 'update')).targets, 'after option select').toEqual([
      {
        nodeName: 'P-MULTI-SELECT',
        nodeValue: null,
        nodeType: 1,
        tagName: 'P-MULTI-SELECT',
        className: 'hydrated',
        id: '',
      },
    ]);
  });

  skipInBrowser(['webkit'], () => {
    test('should emit update event with correct details when reset button is clicked', async ({ page }) => {
      await initMultiSelect(page, { props: { name: 'options' } });
      await setValue(page, ['a', 'b']);
      const host = await getHost(page);
      await addEventListener(host, 'update');

      expect((await getEventSummary(host, 'update')).counter, 'before option select').toBe(0);

      const resetButton = await getResetButton(page);
      await resetButton.click();

      expect((await getEventSummary(host, 'update')).counter, 'after option select').toBe(1);
      expect((await getEventSummary(host, 'update')).details, 'after option select').toEqual([
        {
          value: [],
          name: 'options',
        },
      ]);
      expect((await getEventSummary(host, 'update')).targets, 'after option select').toEqual([
        {
          nodeName: 'P-MULTI-SELECT',
          nodeValue: null,
          nodeType: 1,
          tagName: 'P-MULTI-SELECT',
          className: 'hydrated',
          id: '',
        },
      ]);
    });
  });
});

test.describe('outside click', () => {
  test('should show dropdown if input is clicked and hide via outside click', async ({ page }) => {
    await initMultiSelect(page, { options: { markupBefore: '<p-text>Some Text</p-text>' } });

    const inputElement = await getInput(page);
    const text = await page.$('p-text');
    expect(await getDropdownDisplay(page)).toBe('none');

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page)).toBe('flex');

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after 1st text click').toBe('none');

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after 2nd input click').toBe('flex');

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after 3nd input click').toBe('flex'); // dropdown should stay open
  });

  test('should clear input value and reset dropdown on click outside', async ({ page }) => {
    await initMultiSelect(page, { options: { markupBefore: '<p-text>Some text</p-text>' } });

    const inputElement = await getInput(page);
    const text = await page.$('p-text');

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect((await getMultiSelectOptions(page)).length, 'initial').toBe(3);
    expect(await getAmountOfVisibleMultiSelectOptions(page)).toBe(3);

    await inputElement.type('A');
    await waitForStencilLifecycle(page);

    expect(await getInputValue(page)).toBe('A');
    expect(await getAmountOfVisibleMultiSelectOptions(page), 'after input').toBe(1);

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getInputValue(page)).toBe('');

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect((await getMultiSelectOptions(page)).length, 'after outside click').toBe(3);
    expect(await getAmountOfVisibleMultiSelectOptions(page), 'after outside click').toBe(3);
  });
});

test.describe('hover', () => {
  test('should change border-color when input is hovered', async ({ page }) => {
    await initMultiSelect(page);
    await page.mouse.move(0, 300); // avoid potential hover initially

    const inputContainer = page.locator('p-multi-select input#filter');

    await expect(inputContainer).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await inputContainer.hover();
    await expect(inputContainer).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });
});

skipInBrowser(['webkit'], () => {
  test.describe('focus', () => {
    test('should focus input when label text is clicked', async ({ page }) => {
      await initMultiSelect(page, { props: { name: 'options', label: 'Some Label' } });

      const labelText = await getLabel(page);
      const filterInput = await getInput(page);
      await addEventListener(filterInput, 'focus');

      expect((await getEventSummary(filterInput, 'focus')).counter, 'before focus').toBe(0);

      await labelText.click();
      expect((await getEventSummary(filterInput, 'focus')).counter, 'after focus').toBe(1);
    });

    test('should focus filter when tab key is pressed', async ({ page }) => {
      await initMultiSelect(page);

      const inputElement = await getInput(page);
      await addEventListener(inputElement, 'focus');

      expect((await getEventSummary(inputElement, 'focus')).counter).toBe(0);

      await page.keyboard.press('Tab');
      expect((await getEventSummary(inputElement, 'focus')).counter).toBe(1);
    });

    test('should focus correct elements when selection is made', async ({ page }) => {
      await initMultiSelect(page, { options: { markupAfter: '<p-button>Some button</p-button>' } });
      const button = await page.$('p-button');
      await addEventListener(button, 'focus');

      expect(await getResetButton(page)).toBeNull();
      await setValue(page, ['a']);
      await waitForStencilLifecycle(page);

      const inputElement = await getInput(page);
      const resetButton = await getResetButton(page);
      expect(resetButton).not.toBeNull();
      await addEventListener(inputElement, 'focus');
      await addEventListener(resetButton, 'focus');

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(inputElement, 'focus')).counter).toBe(1);
      expect(await getDropdownDisplay(page), 'dropdown display after first tab').toBe('none');

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      expect(await getDropdownDisplay(page), 'dropdown display after Space').toBe('flex');

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(resetButton, 'focus')).counter).toBe(1);
      expect(await getDropdownDisplay(page), 'dropdown display after second tab').toBe('flex');

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      expect(await getDropdownDisplay(page), 'dropdown display after third tab').toBe('none');
      expect((await getEventSummary(button, 'focus')).counter, 'button focus after second tab').toBe(1);
    });

    test('should focus next element when dropdown is open and no selection is made', async ({ page }) => {
      await initMultiSelect(page, { options: { markupAfter: '<p-button>Some button</p-button>' } });
      const button = await page.$('p-button');
      await addEventListener(button, 'focus');

      expect(await getResetButton(page), 'initial reset button').toBeNull();

      const inputElement = await getInput(page);
      await addEventListener(inputElement, 'focus');

      await page.keyboard.press('Tab');
      expect((await getEventSummary(inputElement, 'focus')).counter, 'input focus after first tab').toBe(1);
      expect(await getDropdownDisplay(page), 'dropdown display after first tab').toBe('none');

      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      expect(await getDropdownDisplay(page), 'dropdown display after Space').toBe('flex');

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(inputElement, 'focus')).counter, 'input focus after second tab').toBe(1);

      expect(await getDropdownDisplay(page), 'dropdown display after second tab').toBe('none');
      expect((await getEventSummary(button, 'focus')).counter, 'button focus after second tab').toBe(1);
    });

    test('should focus input after reset button click', async ({ page }) => {
      await initMultiSelect(page);
      await setValue(page, ['a']);
      await waitForStencilLifecycle(page);

      const host = await getHost(page);

      const inputElement = await getInput(page);
      const resetButton = await getResetButton(page);
      await addEventListener(inputElement, 'focus');
      await addEventListener(resetButton, 'focus');

      await page.keyboard.press('Tab');
      expect((await getEventSummary(inputElement, 'focus')).counter).toBe(1);
      await page.keyboard.press('Tab');
      expect((await getEventSummary(resetButton, 'focus')).counter).toBe(1);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getResetButton(page)).toBeNull();
      expect((await getEventSummary(inputElement, 'focus')).counter).toBe(2);
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe('INPUT');
      expect(await getNativeSelectValue(page)).toStrictEqual('');
      expect(await getMultiSelectValue(page)).toStrictEqual([]);
    });
  });
});

test.describe('filter', () => {
  test('should open dropdown, filter results to "B" if "b" is entered and select it on ArrowDown', async ({ page }) => {
    await initMultiSelect(page);

    const inputElement = await getInput(page);
    await inputElement.type('b');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after typing').toBe('flex');
    expect(await getAmountOfVisibleMultiSelectOptions(page), 'amount of shown options').toBe(1);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    expect(await getHighlightedOptionIndex(page)).toBe(0);

    await inputElement.press('Enter');
    await waitForStencilLifecycle(page);

    const nativeOptions = await getNativeSelectOptions(page);

    expect(nativeOptions.length).toBe(1);
    expect(await getProperty(nativeOptions[0], 'value')).toBe('b');
    expect(await getNativeSelectValue(page)).toBe('b');
    expect(await getMultiSelectValue(page)).toStrictEqual(['b']);
  });

  test('should show "---" if filter value has no match', async ({ page }) => {
    await initMultiSelect(page);

    const inputElement = await getInput(page);
    await inputElement.type('d');
    await waitForStencilLifecycle(page);

    const dropdownOption1 = await getShadowDropdownOption(page, 1);
    const dropdownOption1Value = await getProperty(dropdownOption1, 'textContent');

    expect(await getAmountOfVisibleMultiSelectOptions(page)).toBe(0);
    expect(dropdownOption1Value).toBe('---No results found');
  });
});

test.describe('selection', () => {
  test('should add valid selection on enter', async ({ page }) => {
    await initMultiSelect(page);

    const inputElement = await getInput(page);

    await inputElement.type('B');
    await waitForStencilLifecycle(page);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    await inputElement.press('Enter');
    await waitForStencilLifecycle(page);

    const value = await getMultiSelectValue(page);
    const nativeSelectOptions = await getNativeSelectOptions(page);
    const filterPlaceholder = await getInputPlaceholder(page);
    const selectedMultiSelectOptions = await getSelectedMultiSelectOptionProperty(page, 'textContent');

    expect(value).toStrictEqual(['b']);
    expect(await getProperty(nativeSelectOptions[0], 'value'), 'after first option selected').toEqual('b');
    expect(selectedMultiSelectOptions, 'after first option selected').toEqual(['Option B']);
    expect(filterPlaceholder, 'after first option selected').toBe(selectedMultiSelectOptions.join(', '));

    await inputElement.press('Backspace');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    await inputElement.press('Enter');
    await waitForStencilLifecycle(page);

    const valueAfter = await getMultiSelectValue(page);
    const nativeSelectOptionsAfter = await getNativeSelectOptions(page);
    const filterPlaceholderSecond = await getInputPlaceholder(page);
    const selectedMultiSelectOptionsSecond = await getSelectedMultiSelectOptionProperty(page, 'textContent');

    expect(valueAfter).toStrictEqual(['b', 'c']);
    expect(await getProperty(nativeSelectOptionsAfter[0], 'value'), 'after second option selected').toEqual('b');
    expect(await getProperty(nativeSelectOptionsAfter[1], 'value'), 'after second option selected').toEqual('c');
    expect(selectedMultiSelectOptionsSecond, 'after second option selected').toEqual(['Option B', 'Option C']);
    expect(filterPlaceholderSecond, 'after second option selected').toBe(selectedMultiSelectOptionsSecond.join(', '));
  });

  test('should add valid selection on click', async ({ page }) => {
    await initMultiSelect(page);

    const inputElement = await getInput(page);
    await inputElement.click();
    await waitForStencilLifecycle(page);

    const dropdownOption2 = await getMultiSelectOption(page, 2);
    await dropdownOption2.click();
    await waitForStencilLifecycle(page);

    const value = await getMultiSelectValue(page);
    const nativeSelectOptions = await getNativeSelectOptions(page);
    const filterPlaceholder = await getInputPlaceholder(page);
    const selectedMultiSelectOptions = await getSelectedMultiSelectOptionProperty(page, 'textContent');

    expect(value).toStrictEqual(['b']);
    expect(await getProperty(nativeSelectOptions[0], 'value'), 'after first option selected').toEqual('b');
    expect(filterPlaceholder, 'after first selection').toBe('Option B');
    expect(filterPlaceholder, 'after first selection').toEqual(selectedMultiSelectOptions.join(', '));

    const dropdownOption3 = await getMultiSelectOption(page, 3);
    await dropdownOption3.click();
    await waitForStencilLifecycle(page);

    const valueAfter = await getMultiSelectValue(page);
    const nativeSelectOptionsAfter = await getNativeSelectOptions(page);
    const filterPlaceholderSecond = await getInputPlaceholder(page);
    const selectedMultiSelectOptionsSecond = await getSelectedMultiSelectOptionProperty(page, 'textContent');

    expect(valueAfter).toStrictEqual(['b', 'c']);
    expect(await getProperty(nativeSelectOptionsAfter[0], 'value'), 'after second option selected').toEqual('b');
    expect(await getProperty(nativeSelectOptionsAfter[1], 'value'), 'after second option selected').toEqual('c');
    expect(filterPlaceholderSecond, 'after second selection').toBe('Option B, Option C');
    expect(filterPlaceholderSecond, 'after second selection').toEqual(selectedMultiSelectOptionsSecond.join(', '));
  });

  skipInBrowser(['webkit'], () => {
    test('should reset selection on reset button enter', async ({ page }) => {
      await initMultiSelect(page);
      const inputElement = await getInput(page);
      await inputElement.press('Space');
      await waitForStencilLifecycle(page);
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);
      await inputElement.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getProperty((await getNativeSelectOptions(page))[0], 'value')).toEqual('a');
      expect(await getMultiSelectValue(page)).toEqual(['a']);
      expect(await getSelectedMultiSelectOptionProperty(page, 'value')).toEqual(['a']);

      const resetButton = await getResetButton(page);
      await addEventListener(resetButton, 'focus');

      await inputElement.press('Tab');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(resetButton, 'focus')).counter).toBe(1);

      await resetButton.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getNativeSelectOptions(page)).toEqual([]);
      expect(await getMultiSelectValue(page)).toEqual([]);
      expect(await getSelectedMultiSelectOptionProperty(page, 'value')).toEqual([]);
    });
  });

  test('should reset selection on reset button click', async ({ page }) => {
    await initMultiSelect(page);
    const inputElement = await getInput(page);
    await inputElement.click();
    await waitForStencilLifecycle(page);

    const option1 = await getMultiSelectOption(page, 1);
    const option2 = await getMultiSelectOption(page, 2);
    await option1.click();
    await option2.click();
    await waitForStencilLifecycle(page);

    expect(await getProperty((await getNativeSelectOptions(page))[0], 'value')).toEqual('a');
    expect(await getProperty((await getNativeSelectOptions(page))[1], 'value')).toEqual('b');
    expect(await getMultiSelectValue(page)).toEqual(['a', 'b']);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value')).toEqual(['a', 'b']);

    const resetButton = await getResetButton(page);
    await resetButton.click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectOptions(page)).toEqual([]);
    expect(await getMultiSelectValue(page)).toEqual([]);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value')).toEqual([]);
  });
});

test.describe('keyboard and click events', () => {
  test('should highlight first option on arrow down', async ({ page }) => {
    await initMultiSelect(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(-1);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedOptionIndicies(page)).toStrictEqual([]);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value'), 'for selected index').toEqual([]);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value'), 'for selected index').toEqual(['a']);
    expect(await getSelectedOptionIndicies(page)).toStrictEqual([0]);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(1);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value'), 'for selected index').toEqual(['a']);
    expect(await getSelectedOptionIndicies(page)).toStrictEqual([0]);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(1);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value'), 'for selected index').toEqual(['a', 'b']);
    expect(await getSelectedOptionIndicies(page)).toStrictEqual([0, 1]);
  });

  test('should skip disabled option on arrow down', async ({ page }) => {
    await initMultiSelect(page, { options: { disabledIndex: 0 } });

    expect(await getProperty(await getMultiSelectOption(page, 1), 'disabled'), 'disabled option').toBe(true);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option').toBe(1);
  });

  test('should skip disabled option on arrow up', async ({ page }) => {
    await initMultiSelect(page, { options: { disabledIndex: 1 } });

    expect(await getProperty(await getMultiSelectOption(page, 2), 'disabled'), 'disabled option').toBe(true);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(2);

    await page.keyboard.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(0);
  });

  test('should open dropdown with spacebar', async ({ page }) => {
    await initMultiSelect(page);

    await page.keyboard.press('Tab');

    expect(await getDropdownDisplay(page)).toBe('none');

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page)).toBe('flex');
  });

  test('should toggle selected with enter', async ({ page }) => {
    await initMultiSelect(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value'), 'for selected index').toEqual(['a']);
    expect(await getSelectedOptionIndicies(page)).toStrictEqual([0]);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value'), 'for selected index').toEqual([]);
    expect(await getSelectedOptionIndicies(page)).toStrictEqual([]);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value'), 'for selected index').toEqual(['a']);
    expect(await getSelectedOptionIndicies(page)).toStrictEqual([0]);
  });

  test('should not select option on Escape', async ({ page }) => {
    await initMultiSelect(page);
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(0);

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect(await getSelectedOptionIndicies(page)).toStrictEqual([]);
    expect(await getDropdownDisplay(page)).toBe('none');
  });

  test('should highlight and select options on PageDown/PageUp', async ({ page }) => {
    await initMultiSelect(page);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    await page.keyboard.press('PageDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(2);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value'), 'for selected index').toEqual([]);
    expect(await getSelectedOptionIndicies(page)).toStrictEqual([]);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(2);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value'), 'for selected index').toEqual(['c']);
    expect(await getSelectedOptionIndicies(page)).toStrictEqual([2]);

    await page.keyboard.press('PageUp');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedMultiSelectOptionProperty(page, 'value'), 'for selected index').toEqual(['a', 'c']);
    expect(await getSelectedOptionIndicies(page)).toStrictEqual([0, 2]);
  });

  test('should open dropdown on mouseclick and stay open on 2nd click', async ({ page }) => {
    await initMultiSelect(page);
    const inputElement = await getInput(page);

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after click').toBe('flex');
    expect(await getHighlightedOptionIndex(page), 'for highlighted option').toBe(-1);

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after second click').toBe('flex');
    expect(await getHighlightedOptionIndex(page), 'for highlighted option').toBe(-1);
  });

  test('should select second option on mouseclick', async ({ page }) => {
    await initMultiSelect(page);
    const inputElement = await getInput(page);

    await inputElement.click();
    await waitForStencilLifecycle(page);

    const dropdownOption = await getMultiSelectOption(page, 2);
    await dropdownOption.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after click').toBe('flex');
    expect(await getSelectedMultiSelectOptionProperty(page, 'value'), 'for selected index').toEqual(['b']);
    expect(await getSelectedOptionIndicies(page)).toStrictEqual([1]);
  });

  test('should close dropdown on Tab', async ({ page }) => {
    await initMultiSelect(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after open').toBe('flex');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after tab').toBe('none');
  });

  skipInBrowser(['webkit'], () => {
    test('should focus reset button and dropdown should stay open when there is a selection', async ({ page }) => {
      await initMultiSelect(page, {
        options: { markupAfter: '<p-button>Button</p-button>' },
      });
      const button = await page.$('p-button');

      await setValue(page, ['a']);
      const resetButton = await getResetButton(page);
      const inputElement = await getInput(page);

      await addEventListener(button, 'focus');
      await addEventListener(resetButton, 'focus');
      await addEventListener(inputElement, 'focus');
      expect(resetButton).not.toBeNull();
      expect((await getEventSummary(button, 'focus')).counter, 'initial').toBe(0);
      expect((await getEventSummary(resetButton, 'focus')).counter, 'initial').toBe(0);
      expect((await getEventSummary(inputElement, 'focus')).counter, 'initial').toBe(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(button, 'focus')).counter, 'initial').toBe(0);
      expect((await getEventSummary(resetButton, 'focus')).counter, 'initial').toBe(0);
      expect((await getEventSummary(inputElement, 'focus')).counter, 'after open').toBe(1);
      expect(await getDropdownDisplay(page), 'after open').toBe('flex');

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(button, 'focus')).counter, 'initial').toBe(0);
      expect((await getEventSummary(resetButton, 'focus')).counter, 'initial').toBe(1);
      expect((await getEventSummary(inputElement, 'focus')).counter, 'after open').toBe(1);
      expect(await getDropdownDisplay(page), 'after tab').toBe('flex');

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(button, 'focus')).counter, 'initial').toBe(1);
      expect((await getEventSummary(resetButton, 'focus')).counter, 'initial').toBe(1);
      expect((await getEventSummary(inputElement, 'focus')).counter, 'after open').toBe(1);
      expect(await getDropdownDisplay(page), 'after tab').toBe('none');
    });
  });

  test('should close dropdown on Esc', async ({ page }) => {
    await initMultiSelect(page);

    const inputElement = await getInput(page);

    await addEventListener(inputElement, 'focus');
    expect((await getEventSummary(inputElement, 'focus')).counter, 'initial').toBe(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(inputElement, 'focus')).counter, 'after open').toBe(1);
    expect(await getDropdownDisplay(page), 'after open').toBe('flex');

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after Esc').toBe('none');
    await setValue(page, ['a']);

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after second open').toBe('flex');

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after second Esc').toBe('none');
  });

  test('should submit form with correct values when is wrapped by form on Enter', async ({ page }) => {
    await initMultiSelect(page);
    const form = await page.$('form');
    const inputElement = await getInput(page);

    await addEventListener(form, 'submit');
    await addEventListener(inputElement, 'focus');
    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);
    expect((await getEventSummary(inputElement, 'focus')).counter, 'initial').toBe(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);
    expect(await getMultiSelectValue(page)).toEqual(['a']);

    await page.keyboard.press('Escape');
    expect((await getEventSummary(inputElement, 'focus')).counter, 'after escape').toBe(1);
    expect(await getHighlightedOptionIndex(page), 'after escape').toBe(-1);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(
      await form.evaluate((form: HTMLFormElement) => Array.from(new FormData(form).values()).join(',')),
      'after Enter'
    ).toEqual('a');
  });

  test('should not submit form when is not wrapped by form on Enter', async ({ page }) => {
    initConsoleObserver(page);
    await initMultiSelect(page, { options: { isWithinForm: false } });
    expect(getConsoleErrorsAmount()).toBe(0);
    const inputElement = await getInput(page);

    await addEventListener(inputElement, 'focus');
    expect((await getEventSummary(inputElement, 'focus')).counter, 'initial').toBe(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getMultiSelectValue(page)).toEqual(['a']);

    await page.keyboard.press('Escape');
    expect((await getEventSummary(inputElement, 'focus')).counter, 'after escape').toBe(1);
    expect(await getHighlightedOptionIndex(page), 'after escape').toBe(-1);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(getConsoleErrorsAmount()).toBe(0);
  });
});

test.describe('disabled', () => {
  test('should have not-allowed cursor', async ({ page }) => {
    await initMultiSelect(page, { props: { name: 'options', disabled: true } });
    expect(await getElementStyle(await getInput(page), 'cursor')).toBe('not-allowed');
  });

  skipInBrowser(['webkit'], () => {
    test('should not be able to open or interact', async ({ page }) => {
      await initMultiSelect(page, {
        props: { name: 'options', disabled: true },
        options: { markupAfter: '<p-button>Button</p-button>' },
      });
      const button = await page.$('p-button');

      await addEventListener(button, 'focus');
      expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(0);

      await page.keyboard.press('Tab');
      expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(1);
    });
  });
});

test.describe('slots', () => {
  test('should update when selected option is added', async ({ page }) => {
    await initMultiSelect(page);
    expect(await getMultiSelectValue(page)).toStrictEqual([]);

    await setValue(page, ['d']);
    await waitForStencilLifecycle(page);
    expect(await getMultiSelectValue(page)).toStrictEqual(['d']);

    await addOption(page, 'd', 'Option D');
    await waitForStencilLifecycle(page);
    const nativeOptions = await getNativeSelectOptions(page);
    const filterPlaceholder = await getInputPlaceholder(page);
    expect(await getProperty(nativeOptions[0], 'value'), 'after option was added').toStrictEqual('d');
    expect(filterPlaceholder, 'after option was added').toBe('Option D');
  });

  test('should update when selected option is removed', async ({ page }) => {
    await initMultiSelect(page);
    await setValue(page, ['c']);
    await waitForStencilLifecycle(page);
    const nativeOptions = await getNativeSelectOptions(page);
    const filterPlaceholder = await getInputPlaceholder(page);
    expect(await getProperty(nativeOptions[0], 'value'), 'after option was added').toStrictEqual('c');
    expect(await getMultiSelectValue(page)).toStrictEqual(['c']);
    expect(filterPlaceholder, 'after option was added').toBe('Option C');

    await page.evaluate(
      (el) => {
        el.lastElementChild.remove();
      },
      await getHost(page)
    );
    await waitForStencilLifecycle(page);

    const nativeOptionsAfter = await getNativeSelectOptions(page);
    const filterPlaceholderAfter = await getInputPlaceholder(page);

    expect(nativeOptionsAfter, 'after selected option was removed').toStrictEqual([]);
    expect(filterPlaceholderAfter, 'after option was added').toBeNull();
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initMultiSelect(page);
    const inputElement = await getInput(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-multi-select'], 'componentDidLoad: p-multi-select').toBe(1);
    expect(status1.componentDidLoad['p-multi-select-option'], 'componentDidLoad: p-multi-select-option').toBe(3);
    expect(status1.componentDidLoad['p-checkbox-wrapper'], 'componentDidLoad: p-checkbox-wrapper').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down and reset icon

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(8);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await inputElement.click();
    await waitForStencilLifecycle(page);
    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-multi-select'], 'componentDidUpdate: p-multi-select').toBe(1);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips when selecting option', async ({ page }) => {
    await initMultiSelect(page);
    const inputElement = await getInput(page);

    await inputElement.click();
    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-multi-select'], 'componentDidLoad: p-multi-select').toBe(1);
    expect(status1.componentDidLoad['p-multi-select-option'], 'componentDidLoad: p-multi-select-option').toBe(3);
    expect(status1.componentDidLoad['p-checkbox-wrapper'], 'componentDidLoad: p-checkbox-wrapper').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down and reset icon

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(8);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

    const option1 = await getMultiSelectOption(page, 1);
    await option1.click();
    await waitForStencilLifecycle(page);

    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1); // reset button
    expect(status2.componentDidUpdate['p-multi-select-option'], 'componentDidUpdate: p-multi-select-option').toBe(1);
    expect(status2.componentDidUpdate['p-multi-select'], 'componentDidUpdate: p-multi-select').toBe(2);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(3);
  });

  test('should work without unnecessary round trips on filter input change', async ({ page }) => {
    await initMultiSelect(page);
    const inputElement = await getInput(page);

    await inputElement.click();
    await waitForStencilLifecycle(page);

    const status1 = await getLifecycleStatus(page);
    expect(status1.componentDidLoad['p-multi-select'], 'componentDidLoad: p-multi-select').toBe(1);
    expect(status1.componentDidLoad['p-multi-select-option'], 'componentDidLoad: p-multi-select-option').toBe(3);
    expect(status1.componentDidLoad['p-checkbox-wrapper'], 'componentDidLoad: p-checkbox-wrapper').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down and reset icon

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(8);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1); // slotchange forces second update

    await page.keyboard.press('c');
    await waitForStencilLifecycle(page);

    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-multi-select-option'], 'componentDidUpdate: p-multi-select-option').toBe(0);
    expect(status2.componentDidUpdate['p-multi-select'], 'componentDidUpdate: p-multi-select').toBe(1);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
