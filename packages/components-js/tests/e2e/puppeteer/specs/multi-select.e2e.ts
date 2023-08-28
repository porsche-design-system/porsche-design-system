import { Components } from '@porsche-design-system/components';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

import type { Page } from 'puppeteer';
import type { MultiSelectOption } from '@porsche-design-system/components/dist/types/components/multi-select/multi-select/multi-select-utils';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-multi-select');

const getMultiSelectValue = async (): Promise<(string | number)[]> => await getProperty(await getHost(), 'value');

const getInputContainer = () => selectNode(page, 'p-multi-select >>> .input-container');

const getInput = () => selectNode(page, 'p-multi-select >>> input');

const getInputValue = async (): Promise<string> => getProperty(await getInput(), 'value');

const getInputPlaceholder = async (): Promise<string> => getAttribute(await getInput(), 'placeholder');

const getDropdown = () => selectNode(page, 'p-multi-select >>> .listbox');
const getDropdownDisplay = async (): Promise<string> => await getElementStyle(await getDropdown(), 'display');

const getShadowDropdownOption = (n: number) => selectNode(page, `p-multi-select >>> .listbox div:nth-child(${n})`);

const getMultiSelectOption = (n: number) =>
  selectNode(page, `p-multi-select p-multi-select-option:nth-child(${n + 1})`); // First one is native select

const getMultiSelectOptions = () => page.$$('p-multi-select p-multi-select-option');

const getAmountOfVisibleMultiSelectOptions = async (): Promise<number> =>
  await page.$$eval(
    'p-multi-select p-multi-select-option',
    (options) => options.filter((option: HTMLElement) => !option.hidden).length
  );

const getSelectedMultiSelectOptionProperty = async <T extends keyof MultiSelectOption>(
  property: T
): Promise<MultiSelectOption[T]> =>
  await page.$$eval(
    'p-multi-select p-multi-select-option',
    (options, property) =>
      options
        .filter((option: MultiSelectOption) => option.selected)
        .map((option: MultiSelectOption) => option[property]),
    property
  );

const getHighlightedOptionIndex = async (): Promise<number> =>
  await page.$$eval('p-multi-select p-multi-select-option', (options: MultiSelectOption[]) =>
    options.filter((option) => !option.hidden).indexOf(options.find((option: MultiSelectOption) => option.highlighted))
  );

const getSelectedOptionIndicies = async (): Promise<number[]> =>
  await page.$$eval('p-multi-select p-multi-select-option', (options) =>
    options.filter((option: any) => option.selected).map((option) => options.indexOf(option))
  );

const getNativeSelect = () => selectNode(page, 'p-multi-select select');

const getNativeSelectValue = async (): Promise<string> => await getProperty(await getNativeSelect(), 'value');

const getNativeSelectOptions = () => page.$$('p-multi-select select option');

const getLabelText = () => selectNode(page, 'p-multi-select >>> .label__text');

const getResetButton = () => selectNode(page, 'p-multi-select >>> .reset-icon');

const getAssertiveText = async () => await selectNode(page, 'span[aria-live="assertive"]');

const labelSlotContent =
  '<span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>';
const descriptionSlotContent =
  '<span slot="description" id="some-description-id">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>';
const messageSlotContent =
  '<span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>';

const setValue = async (value: (string | number)[]) =>
  await page.evaluate((el: HTMLPMultiSelectElement, value) => (el.value = value), await getHost(), value);

const addOption = async (value: string | number, textContent?: string) => {
  await page.evaluate(
    (el: HTMLPMultiSelectElement, value, textContent) => {
      const option: any = document.createElement('p-multi-select-option');
      option.value = value;
      option.textContent = textContent;
      el.append(option);
    },
    await getHost(),
    value,
    textContent ? textContent : value
  );
};

const removeLastOption = async () => {
  await page.evaluate((el: HTMLPMultiSelectElement) => el.lastElementChild.remove(), await getHost());
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

const initMultiSelect = (opt?: InitOptions): Promise<void> => {
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

  return setContentWithDesignSystem(page, isWithinForm ? `<form>${markup}</form>` : markup);
};

it('should render', async () => {
  await initMultiSelect();
  const inputElement = await getInput();
  expect(inputElement).not.toBeNull();

  expect(await getDropdownDisplay()).toBe('none');

  await inputElement.click();
  await waitForStencilLifecycle(page);

  expect(await getDropdownDisplay()).toBe('flex');
});

describe('native select', () => {
  it('should be rendered', async () => {
    await initMultiSelect();
    const nativeSelectElement = await getNativeSelect();
    expect(nativeSelectElement).not.toBeNull();
    expect(await getProperty(nativeSelectElement, 'multiple')).toBeTruthy();
    expect(await nativeSelectElement.evaluate((el: HTMLSelectElement) => el.selectedOptions.length)).toBe(0);
  });

  it('should not be visible', async () => {
    await initMultiSelect();
    const nativeSelectElement = await getNativeSelect();
    expect(await getElementStyle(nativeSelectElement, 'opacity')).toBe('0');
  });

  it('props should be in sync', async () => {
    await initMultiSelect();
    const nativeSelectElement = await getNativeSelect();
    expect(await getAttribute(nativeSelectElement, 'name')).toBe('name');

    const host = await getHost();
    await setProperty(host, 'required', true);
    await setProperty(host, 'disabled', true);

    await waitForStencilLifecycle(page);

    expect(await getProperty(nativeSelectElement, 'required')).toBeTruthy();
    expect(await getProperty(nativeSelectElement, 'disabled')).toBeTruthy();
  });

  it('should be in sync with selected options when selecting option', async () => {
    await initMultiSelect();
    const nativeSelectOptions = await getNativeSelectOptions();
    expect(nativeSelectOptions.length, 'initial').toEqual(0);

    const inputElement = await getInput();
    await inputElement.click();
    await waitForStencilLifecycle(page);

    const option = await getMultiSelectOption(1);
    await option.click();
    await waitForStencilLifecycle(page);
    const nativeSelectOptions1 = await getNativeSelectOptions();

    expect(nativeSelectOptions1[0], 'after selected').not.toBeUndefined();
    expect(await getProperty(nativeSelectOptions1[0], 'value'), 'after selected').toEqual('a');

    await option.click();
    await waitForStencilLifecycle(page);
    const nativeSelectOptions2 = await getNativeSelectOptions();
    expect(nativeSelectOptions2[0], 'after unselected').toBeUndefined();
    expect(nativeSelectOptions2.length, 'after unselected').toEqual(0);
  });

  it('should be in sync with selected options when setting value', async () => {
    await initMultiSelect();
    const nativeSelectOptions = await getNativeSelectOptions();
    expect(nativeSelectOptions.length, 'initial').toEqual(0);

    await setValue(['a']);
    await waitForStencilLifecycle(page);
    const nativeSelectOptions1 = await getNativeSelectOptions();

    expect(nativeSelectOptions1[0], 'after selected').not.toBeUndefined();
    expect(await getProperty(nativeSelectOptions1[0], 'value'), 'after selected').toEqual('a');

    await setValue([]);
    await waitForStencilLifecycle(page);
    const nativeSelectOptions2 = await getNativeSelectOptions();
    expect(nativeSelectOptions2[0], 'after unselected').toBeUndefined();
    expect(nativeSelectOptions2.length, 'after unselected').toEqual(0);
  });

  it('should be in sync when resetting options', async () => {
    await initMultiSelect();
    await setValue(['a', 'b']);
    await waitForStencilLifecycle(page);

    const nativeSelectOptions = await getNativeSelectOptions();
    expect(nativeSelectOptions.length, 'initial').toEqual(2);
    expect(await getProperty(nativeSelectOptions[0], 'value')).toEqual('a');
    expect(await getProperty(nativeSelectOptions[1], 'value')).toEqual('b');

    const resetButton = await getResetButton();
    await resetButton.click();
    await waitForStencilLifecycle(page);

    const nativeSelectOptionsAfter = await getNativeSelectOptions();
    expect(nativeSelectOptionsAfter.length, 'after reset').toEqual(0);
    expect(nativeSelectOptionsAfter[0], 'after reset').toBeUndefined();
  });

  it('should be in sync with selected options when adding new selected option', async () => {
    await initMultiSelect();

    const nativeSelectOptions = await getNativeSelectOptions();
    expect(nativeSelectOptions.length, 'initial').toEqual(0);

    await setValue(['test']);
    await waitForStencilLifecycle(page);
    await addOption('test');
    await waitForStencilLifecycle(page);

    const nativeSelectOptionsAfter = await getNativeSelectOptions();

    expect(nativeSelectOptionsAfter[0]).not.toBeUndefined();
    expect(await getProperty(nativeSelectOptionsAfter[0], 'value')).toEqual('test');
  });

  it('should be in sync with selected options when removing selected option', async () => {
    await initMultiSelect();
    await setValue(['c']);
    await waitForStencilLifecycle(page);

    const nativeSelectOptions = await getNativeSelectOptions();
    expect(nativeSelectOptions.length, 'initial').toEqual(1);
    expect(await getProperty(nativeSelectOptions[0], 'value'), 'initial').toEqual('c');

    await removeLastOption();
    await waitForStencilLifecycle(page);

    const nativeSelectOptionsAfter = await getNativeSelectOptions();
    expect(nativeSelectOptionsAfter.length, 'initial').toEqual(0);
    expect(nativeSelectOptionsAfter[0]).toBeUndefined();
  });

  it('should not be rendered when used without wrapping form', async () => {
    await initMultiSelect({
      options: {
        isWithinForm: false,
      },
    });
    const nativeSelectElement = await getNativeSelect();
    expect(nativeSelectElement).toBeNull();
  });
});

describe('Update Event', () => {
  it('should emit update event with correct details when option is selected by click', async () => {
    await initMultiSelect({ props: { name: 'options' } });
    const host = await getHost();
    await addEventListener(host, 'update');

    const inputElement = await getInput();
    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before option select').toBe(0);

    const option = await getMultiSelectOption(1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after option select').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after option select').toEqual([
      {
        value: ['a'],
        name: 'options',
      },
    ]);
  });

  it('should emit update event with correct details when option is selected by keyboard', async () => {
    await initMultiSelect({ props: { name: 'options' } });
    const host = await getHost();
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
  });

  it('should emit update event with correct details when reset button is clicked', async () => {
    await initMultiSelect({ props: { name: 'options' } });
    await setValue(['a', 'b']);
    const host = await getHost();
    await addEventListener(host, 'update');

    expect((await getEventSummary(host, 'update')).counter, 'before option select').toBe(0);

    const resetButton = await getResetButton();
    await resetButton.click();

    expect((await getEventSummary(host, 'update')).counter, 'after option select').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after option select').toEqual([
      {
        value: [],
        name: 'options',
      },
    ]);
  });
});

describe('outside click', () => {
  it('should show dropdown if input is clicked and hide via outside click', async () => {
    await initMultiSelect({ options: { markupBefore: '<p-text>Some Text</p-text>' } });

    const inputElement = await getInput();
    const text = await selectNode(page, 'p-text');
    expect(await getDropdownDisplay()).toBe('none');

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay()).toBe('flex');

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after 1st text click').toBe('none');

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after 2nd input click').toBe('flex');

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after 3nd input click').toBe('flex'); // dropdown should stay open
  });

  it('should clear input value and reset dropdown on click outside', async () => {
    await initMultiSelect({ options: { markupBefore: '<p-text>Some text</p-text>' } });

    const inputElement = await getInput();
    const text = await selectNode(page, 'p-text');

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect((await getMultiSelectOptions()).length, 'initial').toBe(3);
    expect(await getAmountOfVisibleMultiSelectOptions()).toBe(3);

    await inputElement.type('A');
    await waitForStencilLifecycle(page);

    expect(await getInputValue()).toBe('A');
    expect(await getAmountOfVisibleMultiSelectOptions(), 'after input').toBe(1);

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getInputValue()).toBe('');

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect((await getMultiSelectOptions()).length, 'after outside click').toBe(3);
    expect(await getAmountOfVisibleMultiSelectOptions(), 'after outside click').toBe(3);
  });
});

describe('hover', () => {
  it('should change border-color when input is hovered', async () => {
    await initMultiSelect();
    await page.mouse.move(0, 300); // avoid potential hover initially

    const inputContainer = await getInputContainer();
    const initialStyle = await getElementStyle(inputContainer, 'borderColor');
    expect(initialStyle, 'before hover').toBe('rgb(107, 109, 112)');

    await inputContainer.hover();
    const hoverColor = await getElementStyle(inputContainer, 'borderColor');
    expect(hoverColor, 'after hover').toBe('rgb(1, 2, 5)');
  });
});

describe('focus', () => {
  it('should focus input when label text is clicked', async () => {
    await initMultiSelect({ props: { name: 'options', label: 'Some Label' } });

    const labelText = await getLabelText();
    const filterInput = await getInput();
    await addEventListener(filterInput, 'focus');

    expect((await getEventSummary(filterInput, 'focus')).counter, 'before focus').toBe(0);

    await labelText.click();
    expect((await getEventSummary(filterInput, 'focus')).counter, 'after focus').toBe(1);
  });

  it('should focus filter when tab key is pressed', async () => {
    await initMultiSelect();

    const inputElement = await getInput();
    await addEventListener(inputElement, 'focus');

    expect((await getEventSummary(inputElement, 'focus')).counter).toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(inputElement, 'focus')).counter).toBe(1);
  });

  it('should focus correct elements when selection is made', async () => {
    await initMultiSelect({ options: { markupAfter: '<p-button>Some button</p-button>' } });
    const button = await selectNode(page, 'p-button');
    await addEventListener(button, 'focus');

    expect(await getResetButton()).toBeNull();
    await setValue(['a']);
    await waitForStencilLifecycle(page);

    const inputElement = await getInput();
    const resetButton = await getResetButton();
    expect(resetButton).not.toBeNull();
    await addEventListener(inputElement, 'focus');
    await addEventListener(resetButton, 'focus');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputElement, 'focus')).counter).toBe(1);
    expect(await getDropdownDisplay(), 'dropdown display after first tab').toBe('none');

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    expect(await getDropdownDisplay(), 'dropdown display after Space').toBe('flex');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(resetButton, 'focus')).counter).toBe(1);
    expect(await getDropdownDisplay(), 'dropdown display after second tab').toBe('flex');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(await getDropdownDisplay(), 'dropdown display after third tab').toBe('none');
    expect((await getEventSummary(button, 'focus')).counter, 'button focus after second tab').toBe(1);
  });

  it('should focus next element when dropdown is open and no selection is made', async () => {
    await initMultiSelect({ options: { markupAfter: '<p-button>Some button</p-button>' } });
    const button = await selectNode(page, 'p-button');
    await addEventListener(button, 'focus');

    expect(await getResetButton(), 'initial reset button').toBeNull();

    const inputElement = await getInput();
    await addEventListener(inputElement, 'focus');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(inputElement, 'focus')).counter, 'input focus after first tab').toBe(1);
    expect(await getDropdownDisplay(), 'dropdown display after first tab').toBe('none');

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    expect(await getDropdownDisplay(), 'dropdown display after Space').toBe('flex');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputElement, 'focus')).counter, 'input focus after second tab').toBe(1);

    expect(await getDropdownDisplay(), 'dropdown display after second tab').toBe('none');
    expect((await getEventSummary(button, 'focus')).counter, 'button focus after second tab').toBe(1);
  });

  it('should focus input after reset button click', async () => {
    await initMultiSelect();
    await setValue(['a']);
    await waitForStencilLifecycle(page);

    const host = await getHost();

    const inputElement = await getInput();
    const resetButton = await getResetButton();
    await addEventListener(inputElement, 'focus');
    await addEventListener(resetButton, 'focus');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(inputElement, 'focus')).counter).toBe(1);
    await page.keyboard.press('Tab');
    expect((await getEventSummary(resetButton, 'focus')).counter).toBe(1);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getResetButton()).toBeNull();
    expect((await getEventSummary(inputElement, 'focus')).counter).toBe(2);
    expect(await getActiveElementTagNameInShadowRoot(host)).toBe('INPUT');
    expect(await getNativeSelectValue()).toStrictEqual('');
    expect(await getMultiSelectValue()).toStrictEqual([]);
  });
});

describe('filter', () => {
  it('should open dropdown, filter results to "B" if "b" is entered and select it on ArrowDown', async () => {
    await initMultiSelect();

    const inputElement = await getInput();
    await inputElement.type('b');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after typing').toBe('flex');
    expect(await getAmountOfVisibleMultiSelectOptions(), 'amount of shown options').toBe(1);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    expect(await getHighlightedOptionIndex()).toBe(0);

    await inputElement.press('Enter');
    await waitForStencilLifecycle(page);

    const nativeOptions = await getNativeSelectOptions();

    expect(nativeOptions.length).toBe(1);
    expect(await getProperty(nativeOptions[0], 'value')).toBe('b');
    expect(await getNativeSelectValue()).toBe('b');
    expect(await getMultiSelectValue()).toStrictEqual(['b']);
  });

  it('should show "---" if filter value has no match', async () => {
    await initMultiSelect();

    const inputElement = await getInput();
    await inputElement.type('d');
    await waitForStencilLifecycle(page);

    const dropdownOption1 = await getShadowDropdownOption(1);
    const dropdownOption1Value = await getProperty(dropdownOption1, 'textContent');

    expect(await getAmountOfVisibleMultiSelectOptions()).toBe(0);
    expect(dropdownOption1Value).toBe('---No results found');
  });
});

describe('selection', () => {
  it('should add valid selection on enter', async () => {
    await initMultiSelect();

    const inputElement = await getInput();

    await inputElement.type('B');
    await waitForStencilLifecycle(page);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    await inputElement.press('Enter');
    await waitForStencilLifecycle(page);

    const value = await getMultiSelectValue();
    const nativeSelectOptions = await getNativeSelectOptions();
    const filterPlaceholder = await getInputPlaceholder();
    const selectedMultiSelectOptions = await getSelectedMultiSelectOptionProperty('textContent');

    expect(value).toStrictEqual(['b']);
    expect(await getProperty(nativeSelectOptions[0], 'value'), 'after first option selected').toEqual('b');
    expect(selectedMultiSelectOptions, 'after first option selected').toEqual(['Option B']);
    expect(filterPlaceholder, 'after first option selected').toBe(selectedMultiSelectOptions.join(', '));

    await inputElement.press('Backspace');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    await inputElement.press('Enter');
    await waitForStencilLifecycle(page);

    const valueAfter = await getMultiSelectValue();
    const nativeSelectOptionsAfter = await getNativeSelectOptions();
    const filterPlaceholderSecond = await getInputPlaceholder();
    const selectedMultiSelectOptionsSecond = await getSelectedMultiSelectOptionProperty('textContent');

    expect(valueAfter).toStrictEqual(['b', 'c']);
    expect(await getProperty(nativeSelectOptionsAfter[0], 'value'), 'after second option selected').toEqual('b');
    expect(await getProperty(nativeSelectOptionsAfter[1], 'value'), 'after second option selected').toEqual('c');
    expect(selectedMultiSelectOptionsSecond, 'after second option selected').toEqual(['Option B', 'Option C']);
    expect(filterPlaceholderSecond, 'after second option selected').toBe(selectedMultiSelectOptionsSecond.join(', '));
  });

  it('should add valid selection on click', async () => {
    await initMultiSelect();

    const inputElement = await getInput();
    await inputElement.click();
    await waitForStencilLifecycle(page);

    const dropdownOption2 = await getMultiSelectOption(2);
    await dropdownOption2.click();
    await waitForStencilLifecycle(page);

    const value = await getMultiSelectValue();
    const nativeSelectOptions = await getNativeSelectOptions();
    const filterPlaceholder = await getInputPlaceholder();
    const selectedMultiSelectOptions = await getSelectedMultiSelectOptionProperty('textContent');

    expect(value).toStrictEqual(['b']);
    expect(await getProperty(nativeSelectOptions[0], 'value'), 'after first option selected').toEqual('b');
    expect(filterPlaceholder, 'after first selection').toBe('Option B');
    expect(filterPlaceholder, 'after first selection').toEqual(selectedMultiSelectOptions.join(', '));

    const dropdownOption3 = await getMultiSelectOption(3);
    await dropdownOption3.click();
    await waitForStencilLifecycle(page);

    const valueAfter = await getMultiSelectValue();
    const nativeSelectOptionsAfter = await getNativeSelectOptions();
    const filterPlaceholderSecond = await getInputPlaceholder();
    const selectedMultiSelectOptionsSecond = await getSelectedMultiSelectOptionProperty('textContent');

    expect(valueAfter).toStrictEqual(['b', 'c']);
    expect(await getProperty(nativeSelectOptionsAfter[0], 'value'), 'after second option selected').toEqual('b');
    expect(await getProperty(nativeSelectOptionsAfter[1], 'value'), 'after second option selected').toEqual('c');
    expect(filterPlaceholderSecond, 'after second selection').toBe('Option B, Option C');
    expect(filterPlaceholderSecond, 'after second selection').toEqual(selectedMultiSelectOptionsSecond.join(', '));
  });

  it('should reset selection on reset button enter', async () => {
    await initMultiSelect();
    const inputElement = await getInput();
    await inputElement.press('Space');
    await waitForStencilLifecycle(page);
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    await inputElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getProperty((await getNativeSelectOptions())[0], 'value')).toEqual('a');
    expect(await getMultiSelectValue()).toEqual(['a']);
    expect(await getSelectedMultiSelectOptionProperty('value')).toEqual(['a']);

    const resetButton = await getResetButton();
    await addEventListener(resetButton, 'focus');

    await inputElement.press('Tab');
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(resetButton, 'focus')).counter).toBe(1);

    await resetButton.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectOptions()).toEqual([]);
    expect(await getMultiSelectValue()).toEqual([]);
    expect(await getSelectedMultiSelectOptionProperty('value')).toEqual([]);
  });

  it('should reset selection on reset button click', async () => {
    await initMultiSelect();
    const inputElement = await getInput();
    await inputElement.click();
    await waitForStencilLifecycle(page);

    const option1 = await getMultiSelectOption(1);
    const option2 = await getMultiSelectOption(2);
    await option1.click();
    await option2.click();
    await waitForStencilLifecycle(page);

    expect(await getProperty((await getNativeSelectOptions())[0], 'value')).toEqual('a');
    expect(await getProperty((await getNativeSelectOptions())[1], 'value')).toEqual('b');
    expect(await getMultiSelectValue()).toEqual(['a', 'b']);
    expect(await getSelectedMultiSelectOptionProperty('value')).toEqual(['a', 'b']);

    const resetButton = await getResetButton();
    await resetButton.click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectOptions()).toEqual([]);
    expect(await getMultiSelectValue()).toEqual([]);
    expect(await getSelectedMultiSelectOptionProperty('value')).toEqual([]);
  });
});

describe('keyboard and click events', () => {
  it('should highlight first option on arrow down', async () => {
    await initMultiSelect();

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(-1);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedOptionIndicies()).toStrictEqual([]);
    expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual([]);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a']);
    expect(await getSelectedOptionIndicies()).toStrictEqual([0]);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(1);
    expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a']);
    expect(await getSelectedOptionIndicies()).toStrictEqual([0]);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(1);
    expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a', 'b']);
    expect(await getSelectedOptionIndicies()).toStrictEqual([0, 1]);
  });

  it('should skip disabled option on arrow down', async () => {
    await initMultiSelect({ options: { disabledIndex: 0 } });

    expect(await getProperty(await getMultiSelectOption(1), 'disabled'), 'disabled option').toBe(true);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option').toBe(1);
  });

  it('should skip disabled option on arrow up', async () => {
    await initMultiSelect({ options: { disabledIndex: 1 } });

    expect(await getProperty(await getMultiSelectOption(2), 'disabled'), 'disabled option').toBe(true);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(2);

    await page.keyboard.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
  });

  it('should open dropdown with spacebar', async () => {
    await initMultiSelect();

    await page.keyboard.press('Tab');

    expect(await getDropdownDisplay()).toBe('none');

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay()).toBe('flex');
  });

  it('should toggle selected with enter', async () => {
    await initMultiSelect();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a']);
    expect(await getSelectedOptionIndicies()).toStrictEqual([0]);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual([]);
    expect(await getSelectedOptionIndicies()).toStrictEqual([]);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a']);
    expect(await getSelectedOptionIndicies()).toStrictEqual([0]);
  });

  it('should not select option on Escape', async () => {
    await initMultiSelect();
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect(await getSelectedOptionIndicies()).toStrictEqual([]);
    expect(await getDropdownDisplay()).toBe('none');
  });

  it('should highlight and select options on PageDown/PageUp', async () => {
    await initMultiSelect();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    await page.keyboard.press('PageDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(2);
    expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual([]);
    expect(await getSelectedOptionIndicies()).toStrictEqual([]);

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(2);
    expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['c']);
    expect(await getSelectedOptionIndicies()).toStrictEqual([2]);

    await page.keyboard.press('PageUp');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
    expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a', 'c']);
    expect(await getSelectedOptionIndicies()).toStrictEqual([0, 2]);
  });

  it('should open dropdown on mouseclick and stay open on 2nd click', async () => {
    await initMultiSelect();
    const inputElement = await getInput();

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after click').toBe('flex');
    expect(await getHighlightedOptionIndex(), 'for highlighted option').toBe(-1);

    await inputElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after second click').toBe('flex');
    expect(await getHighlightedOptionIndex(), 'for highlighted option').toBe(-1);
  });

  it('should select second option on mouseclick', async () => {
    await initMultiSelect();
    const inputElement = await getInput();

    await inputElement.click();
    await waitForStencilLifecycle(page);

    const dropdownOption = await getMultiSelectOption(2);
    await dropdownOption.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after click').toBe('flex');
    expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['b']);
    expect(await getSelectedOptionIndicies()).toStrictEqual([1]);
  });

  it('should close dropdown on Tab', async () => {
    await initMultiSelect();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after open').toBe('flex');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after tab').toBe('none');
  });
  it('should focus reset button and dropdown should stay open when there is a selection', async () => {
    await initMultiSelect({
      options: { markupAfter: '<p-button>Button</p-button>' },
    });
    const button = await selectNode(page, 'p-button');

    await setValue(['a']);
    const resetButton = await getResetButton();
    const inputElement = await getInput();

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
    expect(await getDropdownDisplay(), 'after open').toBe('flex');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(button, 'focus')).counter, 'initial').toBe(0);
    expect((await getEventSummary(resetButton, 'focus')).counter, 'initial').toBe(1);
    expect((await getEventSummary(inputElement, 'focus')).counter, 'after open').toBe(1);
    expect(await getDropdownDisplay(), 'after tab').toBe('flex');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(button, 'focus')).counter, 'initial').toBe(1);
    expect((await getEventSummary(resetButton, 'focus')).counter, 'initial').toBe(1);
    expect((await getEventSummary(inputElement, 'focus')).counter, 'after open').toBe(1);
    expect(await getDropdownDisplay(), 'after tab').toBe('none');
  });

  it('should close dropdown on Esc', async () => {
    await initMultiSelect();

    const inputElement = await getInput();

    await addEventListener(inputElement, 'focus');
    expect((await getEventSummary(inputElement, 'focus')).counter, 'initial').toBe(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(inputElement, 'focus')).counter, 'after open').toBe(1);
    expect(await getDropdownDisplay(), 'after open').toBe('flex');

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after Esc').toBe('none');
    await setValue(['a']);

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after second open').toBe('flex');

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after second Esc').toBe('none');
  });
});

describe('disabled', () => {
  it('should have not-allowed cursor', async () => {
    await initMultiSelect({ props: { name: 'options', disabled: true } });
    expect(await getElementStyle(await getInput(), 'cursor')).toBe('not-allowed');
  });

  it('should not be able to open or interact', async () => {
    await initMultiSelect({
      props: { name: 'options', disabled: true },
      options: { markupAfter: '<p-button>Button</p-button>' },
    });
    const button = await selectNode(page, 'p-button');

    await addEventListener(button, 'focus');
    expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(1);
  });
});

describe('slots', () => {
  it('should update when selected option is added', async () => {
    await initMultiSelect();
    expect(await getMultiSelectValue()).toStrictEqual([]);

    await setValue(['d']);
    await waitForStencilLifecycle(page);
    expect(await getMultiSelectValue()).toStrictEqual(['d']);

    await addOption('d', 'Option D');
    await waitForStencilLifecycle(page);
    const nativeOptions = await getNativeSelectOptions();
    const filterPlaceholder = await getInputPlaceholder();
    expect(await getProperty(nativeOptions[0], 'value'), 'after option was added').toStrictEqual('d');
    expect(filterPlaceholder, 'after option was added').toBe('Option D');
  });

  it('should update when selected option is removed', async () => {
    await initMultiSelect();
    await setValue(['c']);
    await waitForStencilLifecycle(page);
    const nativeOptions = await getNativeSelectOptions();
    const filterPlaceholder = await getInputPlaceholder();
    expect(await getProperty(nativeOptions[0], 'value'), 'after option was added').toStrictEqual('c');
    expect(await getMultiSelectValue()).toStrictEqual(['c']);
    expect(filterPlaceholder, 'after option was added').toBe('Option C');

    await page.evaluate(
      (el) => {
        el.lastElementChild.remove();
      },
      await getHost()
    );
    await waitForStencilLifecycle(page);

    const nativeOptionsAfter = await getNativeSelectOptions();
    const filterPlaceholderAfter = await getInputPlaceholder();

    expect(nativeOptionsAfter, 'after selected option was removed').toStrictEqual([]);
    expect(filterPlaceholderAfter, 'after option was added').toBeNull();
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initMultiSelect();
    const inputElement = await getInput();
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

  it('should work without unnecessary round trips when selecting option', async () => {
    await initMultiSelect();
    const inputElement = await getInput();

    await inputElement.click();
    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-multi-select'], 'componentDidLoad: p-multi-select').toBe(1);
    expect(status1.componentDidLoad['p-multi-select-option'], 'componentDidLoad: p-multi-select-option').toBe(3);
    expect(status1.componentDidLoad['p-checkbox-wrapper'], 'componentDidLoad: p-checkbox-wrapper').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down and reset icon

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(8);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

    const option1 = await getMultiSelectOption(1);
    await option1.click();
    await waitForStencilLifecycle(page);

    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1); // reset button
    expect(status2.componentDidUpdate['p-multi-select-option'], 'componentDidUpdate: p-multi-select-option').toBe(1);
    expect(status2.componentDidUpdate['p-multi-select'], 'componentDidUpdate: p-multi-select').toBe(2);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(3);
  });

  it('should work without unnecessary round trips on filter input change', async () => {
    await initMultiSelect();
    const inputElement = await getInput();

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

describe('accessibility', () => {
  it('should expose correct initial accessibility tree and aria properties of filter', async () => {
    await initMultiSelect({ options: { disabledIndex: 1 } });
    const inputElement = await getInput();

    await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
  });

  it('should expose correct accessibility tree of option list if filter value has no match', async () => {
    await initMultiSelect();
    const inputElement = await getInput();
    await inputElement.type('d');
    await waitForStencilLifecycle(page);

    const dropDown = await getDropdown();
    const assertiveText = await getAssertiveText();

    await expectA11yToMatchSnapshot(page, dropDown, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if option is highlighted', async () => {
    await initMultiSelect();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    const inputElement = await getInput();
    const assertiveText = await getAssertiveText();

    await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
    await expectA11yToMatchSnapshot(page, assertiveText, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if option is selected', async () => {
    await initMultiSelect();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    const inputElement = await getInput();
    const assertiveText = await getAssertiveText();

    await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
    await expectA11yToMatchSnapshot(page, assertiveText, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if description is set', async () => {
    await initMultiSelect();
    const host = await getHost();
    await setProperty(host, 'description', 'Some description');
    await waitForStencilLifecycle(page);
    const inputElement = await getInput();

    await expectA11yToMatchSnapshot(page, inputElement);
  });

  it('should expose correct accessibility tree in error state', async () => {
    await initMultiSelect();
    const host = await getHost();
    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message');
    await waitForStencilLifecycle(page);
    const inputElement = await getInput();

    await expectA11yToMatchSnapshot(page, inputElement);
  });
});
