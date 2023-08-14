import { Components } from '@porsche-design-system/components';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementIndex,
  getElementIndices,
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
import { expect } from '@playwright/test';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-multi-select');

const getInputContainer = () => selectNode(page, 'p-multi-select >>> .input-container');

const getInput = () => selectNode(page, 'p-multi-select >>> input');

const getInputValue = async () => getProperty(await getInput(), 'value');

const getInputPlaceholder = async () => getAttribute(await getInput(), 'placeholder');

const getDropdown = () => selectNode(page, 'p-multi-select >>> ul');
const getDropdownDisplay = async () => await getElementStyle(await getDropdown(), 'display');

const getShadowDropdownOption = (n: number) => selectNode(page, `p-multi-select >>> ul li:nth-child(${n})`);

const getMultiSelectOption = (n: number) =>
  selectNode(page, `p-multi-select p-multi-select-option:nth-child(${n + 1})`); // First one is native select

const getMultiSelectOptions = () => page.$$('p-multi-select p-multi-select-option');

const getAmountOfVisibleMultiSelectOptions = async () =>
  page.$$eval(
    'p-multi-select p-multi-select-option',
    (options) => options.filter((option: HTMLElement) => !option.hidden).length
  );

const getSelectedMultiSelectOptionValues = async () =>
  await page.evaluate(() => {
    const options = Array.from(document.querySelectorAll('p-multi-select-option'));
    return options.filter((option: any) => option.selected).map((option: any) => option.value);
  });

const getSelectedMultiSelectOptionProperty = async (property: string) =>
  await page.evaluate((property) => {
    const options = Array.from(document.querySelectorAll('p-multi-select-option'));
    return options.filter((option: any) => option.selected).map((option: any) => option[property]);
  }, property);

const getSelectedOptionIndices = async () => getElementIndices(await getDropdown(), '.option--selected');

const getHighlightedOptionIndex = async () => getElementIndex(await getDropdown(), '.option--highlighted');

const getNativeSelect = () => selectNode(page, 'p-multi-select select');

const getNativeSelectValue = async () => getProperty(await getNativeSelect(), 'value');

const getNativeSelectOptions = () => page.$$('p-multi-select select option');

const getSelectedNativeOptions = async () =>
  await page.evaluate((el: HTMLSelectElement) => el.selectedOptions, await getNativeSelect());

const getLabelText = () => selectNode(page, 'p-multi-select >>> .label__text');

const getResetButton = () => selectNode(page, 'p-multi-select >>> .reset-icon');

const labelSlotContent =
  '<span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>';
const descriptionSlotContent =
  '<span slot="description" id="some-description-id">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>';
const messageSlotContent =
  '<span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>';

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
    selectedIndex?: number;
    isWithinForm?: boolean;
    markupBefore?: string;
  };
};

const initMultiSelect = (opt?: InitOptions): Promise<void> => {
  const { props = { name: 'name' }, slots, options } = opt || {};
  const { amount = 3, disabledIndex, selectedIndex, isWithinForm = true, markupBefore = '' } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const selectOptions = [...'abc', ...(amount === 5 ? 'de' : '')]
    .map((x, idx) => {
      const attrs = [disabledIndex === idx ? 'disabled' : '', selectedIndex === idx ? 'selected' : ''].join(' ');
      return `<p-multi-select-option value="${x}" ${attrs}>Option ${x.toUpperCase()}</p-multi-select-option>`;
    })
    .join('\n');

  return setContentWithDesignSystem(
    page,
    `
    ${isWithinForm && '<form>'}
      ${markupBefore}
      <p-multi-select ${getHTMLAttributes(props)}>
        ${label}
        ${description}
        ${selectOptions}
        ${message}
      </p-multi-select>
    ${isWithinForm && '</form>'}`
  );
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

  it('should be in sync with selected options', async () => {
    await initMultiSelect();
    const nativeSelectOptions = await getNativeSelectOptions();
    expect(nativeSelectOptions.length, 'initial').toEqual(0);

    const host = await getHost();
    page.evaluate((el) => ((el as any).value = ['a']), host);
    // const options = await getMultiSelectOptions();
    // await setProperty(options[0], 'selected', true);

    await waitForStencilLifecycle(page);
    const nativeSelectOptionsAfter = await getNativeSelectOptions();

    expect(nativeSelectOptionsAfter[0], 'after selected').not.toBeUndefined();
    // expect(await getProperty(nativeSelectOptionsAfter[0], 'value'), 'after selected').toEqual(
    //   await getProperty(options[0], 'value')
    // );

    // await setProperty(options[0], 'selected', false);
    expect(nativeSelectOptions.length, 'after unselected').toEqual(0);
  });

  // it('should be in sync with selected options when adding new options', async () => {
  //   await initMultiSelect();
  //
  //   const nativeSelectOptions = await getNativeSelectOptions();
  //   expect(nativeSelectOptions.length, 'initial').toEqual(0);
  //
  //   const host = await getHost();
  //   await host.evaluate((el) => {
  //     const option: any = document.createElement('p-multi-select-option');
  //     option.selected = true;
  //     option.value = 'test';
  //     el.append(option);
  //   });
  //   await waitForStencilLifecycle(page);
  //
  //   const nativeSelectOptionsAfter = await getNativeSelectOptions();
  //
  //   expect(nativeSelectOptionsAfter[0]).not.toBeUndefined();
  //   expect(await getProperty(nativeSelectOptionsAfter[0], 'value')).toEqual('test');
  // });

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
    await initMultiSelect({ props: { label: 'Some Label' } });

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

  // it('should focus reset button', async () => {
  //   await initMultiSelect({ options: { selectedIndex: 1 } });
  //
  //   const inputElement = await getInput();
  //   const resetButton = await getResetButton();
  //   await addEventListener(inputElement, 'focus');
  //   await addEventListener(resetButton, 'focus');
  //
  //   await page.keyboard.press('Tab');
  //   expect((await getEventSummary(inputElement, 'focus')).counter).toBe(1);
  //
  //   await page.keyboard.press('Tab');
  //   expect((await getEventSummary(resetButton, 'focus')).counter).toBe(1);
  // });

  // it('should focus input after reset button click', async () => {
  //   await initMultiSelect({ options: { selectedIndex: 1 } });
  //
  //   const host = await getHost();
  //
  //   const inputElement = await getInput();
  //   const resetButton = await getResetButton();
  //   await addEventListener(inputElement, 'focus');
  //   await addEventListener(resetButton, 'focus');
  //
  //   await page.keyboard.press('Tab');
  //   expect((await getEventSummary(inputElement, 'focus')).counter).toBe(1);
  //   await page.keyboard.press('Tab');
  //   expect((await getEventSummary(resetButton, 'focus')).counter).toBe(1);
  //
  //   await page.keyboard.press('Enter');
  //   await waitForStencilLifecycle(page);
  //
  //   expect((await getEventSummary(inputElement, 'focus')).counter).toBe(2);
  //   expect(await getActiveElementTagNameInShadowRoot(host)).toBe('INPUT');
  // });
});

describe('filter', () => {
  // it('should open dropdown, filter results to "B" if "b" is entered and select it on ArrowDown', async () => {
  //   await initMultiSelect();
  //
  //   const inputElement = await getInput();
  //   await inputElement.type('b');
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getDropdownDisplay(), 'after typing').toBe('flex');
  //   expect(await getAmountOfVisibleMultiSelectOptions(), 'amount of shown options').toBe(1);
  //
  //   await page.keyboard.press('ArrowDown');
  //   await waitForStencilLifecycle(page);
  //
  //   await inputElement.press('Enter');
  //   await waitForStencilLifecycle(page);
  //
  //   // TODO: Check host value as well
  //   const value = await getNativeSelectValue();
  //   expect(value).toBe('b');
  // });

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
  // TODO: Test select value
  it('should add valid selection as placeholder on enter', async () => {
    await initMultiSelect();

    const inputElement = await getInput();

    await inputElement.type('B');
    await waitForStencilLifecycle(page);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    await inputElement.press('Enter');
    await waitForStencilLifecycle(page);

    const filterPlaceholder = await getInputPlaceholder();
    const selectedMultiSelectOptions = await getSelectedMultiSelectOptionProperty('textContent');

    expect(filterPlaceholder, 'after first option selected').toBe(selectedMultiSelectOptions.join(', '));

    await inputElement.press('Backspace');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    await inputElement.press('Enter');
    await waitForStencilLifecycle(page);

    const filterPlaceholderSecond = await getInputPlaceholder();
    const selectedMultiSelectOptionsSecond = await getSelectedMultiSelectOptionProperty('textContent');
    expect(filterPlaceholderSecond, 'after second option selected').toBe(selectedMultiSelectOptionsSecond.join(', '));
  });

  it('should add valid selection as placeholder on click', async () => {
    await initMultiSelect();

    const inputElement = await getInput();
    await inputElement.click();
    await waitForStencilLifecycle(page);

    const dropdownOption2 = await getMultiSelectOption(2);
    await dropdownOption2.click();
    await waitForStencilLifecycle(page);

    const filterPlaceholder = await getInputPlaceholder();
    const selectedMultiSelectOptions = await getSelectedMultiSelectOptionProperty('textContent');

    expect(filterPlaceholder, 'after first selection').toBe('Option B');
    expect(filterPlaceholder, 'after first selection').toEqual(selectedMultiSelectOptions.join(', '));

    const dropdownOption3 = await getMultiSelectOption(3);
    await dropdownOption3.click();
    await waitForStencilLifecycle(page);

    const filterPlaceholderSecond = await getInputPlaceholder();
    const selectedMultiSelectOptionsSecond = await getSelectedMultiSelectOptionProperty('textContent');

    expect(filterPlaceholderSecond, 'after second selection').toBe('Option B, Option C');
    expect(filterPlaceholderSecond, 'after second selection').toEqual(selectedMultiSelectOptionsSecond.join(', '));
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

    // TODO: Maybe test host value here as well
    expect(await getSelectedMultiSelectOptionValues()).toEqual(['a', 'b']);

    const resetButton = await getResetButton();
    await resetButton.click();
    await waitForStencilLifecycle(page);

    expect(await getSelectedMultiSelectOptionValues()).toEqual([]);
  });
});

describe('keyboard and click events', () => {
  // it('should highlight first option on arrow down', async () => {
  //   await initMultiSelect();
  //
  //   await page.keyboard.press('Tab');
  //   await page.keyboard.press('ArrowDown');
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(1);
  //   expect(await getSelectedOptionIndices(), 'for selected index').toEqual([]);
  //
  //   await page.keyboard.press('Enter');
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getSelectedOptionIndices(), 'for selected index after enter').toEqual([0]);
  //
  //   await page.keyboard.press('Space'); // open dropdown to retrieve aria-active-descendant
  //   await waitForStencilLifecycle(page);
  //
  //   expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(1);
  //   expect(await getFilterAriaActiveDescendant(), 'for aria-active-descendant').toEqual(
  //     `option-${await getSelectedDropdownOptionIndex()}`
  //   );
  // });
  //
  // it('should skip disabled option on arrow down', async () => {
  //   await initSelect({ disabledIndex: 1 });
  //
  //   await page.keyboard.press('Tab');
  //   await page.keyboard.press('ArrowDown');
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(2);
  // });
  //
  // it('should skip disabled option on arrow up', async () => {
  //   await initSelect({ disabledIndex: 1, selectedIndex: 2 });
  //   await waitForStencilLifecycle(page);
  //
  //   await page.keyboard.press('Tab');
  //   await page.keyboard.press('ArrowUp');
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
  // });
  //
  // it('should highlight correct position on multiple key actions', async () => {
  //   await initSelect({ amount: 5, disabledIndex: 1 });
  //   await page.keyboard.press('Tab');
  //   await page.keyboard.press('ArrowDown');
  //   await waitForStencilLifecycle(page);
  //   await page.keyboard.press('ArrowDown');
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(3);
  //
  //   await page.keyboard.press('ArrowUp');
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(2);
  // });
  //
  // it('should open dropdown with spacebar', async () => {
  //   await initSelect();
  //   const select = await getSelect();
  //   await addEventListener(select, 'change');
  //
  //   await page.keyboard.press('Tab');
  //
  //   expect(await getDropdownList(), 'initially').toBeNull();
  //
  //   await page.keyboard.press('Space');
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getDropdownList(), 'after space').toBeTruthy();
  //   expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(0);
  // });
  //
  // it('should not select highlighted option with spacebar and option list should stay open', async () => {
  //   await initSelect();
  //
  //   const select = await getSelect();
  //   await addEventListener(select, 'change');
  //
  //   await page.keyboard.press('Tab');
  //   await page.keyboard.press('Space');
  //   await page.keyboard.press('ArrowDown');
  //   await page.keyboard.press('Space');
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getDropdownList(), 'after space').toBeTruthy();
  //   expect((await getEventSummary(select, 'change')).counter, 'for calls').toBe(0);
  // });
  //
  // describe('when dropdown is not open', () => {
  //   it('should not select option on PageDown', async () => {
  //     await initSelect();
  //     await page.keyboard.press('Tab');
  //     await page.keyboard.press('PageDown');
  //     await waitForStencilLifecycle(page);
  //
  //     expect(await getDropdownList(), 'for dropdown list').toBeNull();
  //     expect(await getSelectedIndex(), 'for selected index').toBe(0);
  //   });
  //
  //   it('should not select option on PageUp', async () => {
  //     await initSelect();
  //     await page.keyboard.press('Tab');
  //     await page.keyboard.press('PageUp');
  //     await waitForStencilLifecycle(page);
  //
  //     expect(await getDropdownList(), 'for dropdown list').toBeNull();
  //     expect(await getSelectedIndex(), 'for selected index').toBe(0);
  //   });
  // });
  //
  // describe('when dropdown is open', () => {
  //   it('should not select option on Escape', async () => {
  //     await initSelect();
  //     await page.keyboard.press('Tab');
  //     await page.keyboard.press('ArrowDown');
  //     await waitForStencilLifecycle(page);
  //
  //     expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(1);
  //
  //     await page.keyboard.press('Escape');
  //     await waitForStencilLifecycle(page);
  //
  //     expect(await getSelectedIndex(), 'for selected index').toBe(0);
  //     expect(await getDropdownList(), 'for opacity').toBeNull();
  //   });
  //
  //   it('should highlight and select last option on PageDown', async () => {
  //     await initSelect();
  //     await page.keyboard.press('Tab');
  //     await page.keyboard.press('Space');
  //     await waitForStencilLifecycle(page);
  //     await page.keyboard.press('PageDown');
  //     await waitForStencilLifecycle(page);
  //
  //     expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(2);
  //     expect(await getSelectedDropdownOptionIndex(), 'for selected option').toBe(0);
  //     expect(await getSelectedIndex(), 'for selected index').toBe(0);
  //
  //     await page.keyboard.press('Enter');
  //     await waitForStencilLifecycle(page);
  //
  //     expect(await getSelectedIndex(), 'for selected index').toBe(2);
  //     expect(await getDropdownList(), 'for opacity').toBeNull();
  //   });
  //
  //   it('should highlight and select first option on PageUp', async () => {
  //     await initSelect({ selectedIndex: 2 });
  //     await page.keyboard.press('Tab');
  //     await page.keyboard.press('Space');
  //     await waitForStencilLifecycle(page);
  //     await page.keyboard.press('PageUp');
  //     await waitForStencilLifecycle(page);
  //
  //     expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
  //     expect(await getSelectedDropdownOptionIndex(), 'for selected option').toBe(2);
  //     expect(await getSelectedIndex(), 'for selected index').toBe(2);
  //
  //     await page.keyboard.press('Enter');
  //     await waitForStencilLifecycle(page);
  //
  //     expect(await getSelectedIndex(), 'for selected index').toBe(0);
  //     expect(await getDropdownList(), 'for opacity').toBeNull();
  //   });
  // });
  //
  // it('should open dropdown on mouseclick and stay open on 2nd click', async () => {
  //   await initSelect();
  //   const filterInput = await getFilterInput();
  //
  //   await filterInput.click();
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getDropdownList(), 'after click').toBeTruthy();
  //   expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
  //
  //   await filterInput.click();
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getDropdownList(), 'after second click').toBeTruthy();
  //   expect(await getHighlightedDropdownOptionIndex(), 'for highlighted option').toBe(0);
  // });
  //
  // it('should select second option on mouseclick', async () => {
  //   await initSelect();
  //   const filterInput = await getFilterInput();
  //
  //   await filterInput.click();
  //   await waitForStencilLifecycle(page);
  //
  //   const dropdownOption2 = await getDropdownOption2();
  //   await dropdownOption2.click();
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getDropdownList(), 'for opacity').toBeNull();
  //   expect(await getSelectedIndex(), 'for selected index').toBe(1);
  // });
  //
  // it('should close dropdown on Tab', async () => {
  //   await initSelect();
  //
  //   const filterInput = await getFilterInput();
  //   await addEventListener(filterInput, 'blur');
  //
  //   await page.keyboard.press('Tab');
  //   await page.keyboard.press('Space');
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getDropdownList(), 'for dropdown list').toBeTruthy();
  //
  //   await page.keyboard.press('Tab');
  //   await waitForStencilLifecycle(page);
  //
  //   expect(await getDropdownList(), 'for dropdown list').toBeNull();
  //   expect((await getEventSummary(filterInput, 'blur')).counter, 'for calls').toBe(1);
  // });
  //
  // describe('when select is disabled', () => {
  //   beforeEach(async () => {
  //     await initSelect();
  //     const select = await getSelect();
  //     await setProperty(select, 'disabled', true);
  //     await waitForStencilLifecycle(page);
  //   });
  //
  //   it('should have not-allowed cursor', async () => {
  //     expect(await getElementStyle(await getSelect(), 'cursor')).toBe('not-allowed');
  //   });
  //
  //   it('should not render dropdown', async () => {
  //     expect(await getDropdown()).toBeNull();
  //   });
  // });
});
//
// describe('lifecycle', () => {
//   it('should work without unnecessary round trips on init', async () => {
//     await initSelect();
//     const filterInput = await getFilterInput();
//     const status1 = await getLifecycleStatus(page);
//
//     expect(status1.componentDidLoad['p-select-wrapper'], 'componentDidLoad: p-select-wrapper').toBe(1);
//     expect(status1.componentDidLoad['p-select-wrapper-dropdown'], 'componentDidLoad: p-select-wrapper-dropdown').toBe(
//       1
//     );
//     expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down
//
//     expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
//     expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
//
//     await filterInput.click();
//     await waitForStencilLifecycle(page);
//     const status2 = await getLifecycleStatus(page);
//
//     expect(status2.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark
//
//     expect(status2.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
//     expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
//   });
//
//   it('should work without unnecessary round trips on filter input change', async () => {
//     await initSelect();
//     const host = await getHost();
//
//     await host.click();
//     await waitForStencilLifecycle(page);
//
//     const statusAfterClick = await getLifecycleStatus(page);
//     expect(statusAfterClick.componentDidUpdate['p-select-wrapper'], '1st componentDidUpdate: p-select-wrapper').toBe(0);
//     expect(
//       statusAfterClick.componentDidUpdate['p-select-wrapper-dropdown'],
//       '1st componentDidUpdate: p-select-wrapper-dropdown'
//     ).toBe(1);
//     expect(statusAfterClick.componentDidUpdate.all, '1st componentDidUpdate: all').toBe(1);
//
//     await page.keyboard.press('c');
//     await waitForStencilLifecycle(page);
//
//     const status = await getLifecycleStatus(page);
//     expect(status.componentDidUpdate['p-select-wrapper'], '2nd componentDidUpdate: p-select-wrapper').toBe(0);
//     expect(
//       status.componentDidUpdate['p-select-wrapper-dropdown'],
//       '2nd componentDidUpdate: p-select-wrapper-dropdown'
//     ).toBe(2);
//     expect(status.componentDidUpdate.all, '2nd componentDidUpdate: all').toBe(2);
//
//     expect(status.componentDidLoad.all, '2nd componentDidLoad: all').toBe(4);
//   });
// });
//
// describe('accessibility', () => {
//   it('should expose correct initial accessibility tree and aria properties of filter', async () => {
//     await initSelect({ disabledIndex: 1 });
//     const filter = await getFilterInput();
//
//     await expectA11yToMatchSnapshot(page, filter, { interestingOnly: false });
//   });
//
//   it('should expose correct accessibility tree of option list if filter value has no match', async () => {
//     await initSelect();
//     const filterInput = await getFilterInput();
//     await filterInput.type('d');
//     await waitForStencilLifecycle(page);
//
//     const dropDown = await getDropdownList();
//
//     await expectA11yToMatchSnapshot(page, dropDown, { interestingOnly: false });
//   });
//
//   it('should expose correct accessibility tree if description is set', async () => {
//     await initSelect();
//     const host = await getHost();
//     await setProperty(host, 'description', 'Some description');
//     await waitForStencilLifecycle(page);
//     const filterInput = await getFilterInput();
//
//     await expectA11yToMatchSnapshot(page, filterInput);
//   });
//
//   it('should expose correct accessibility tree in error state', async () => {
//     await initSelect();
//     const host = await getHost();
//     await setProperty(host, 'state', 'error');
//     await setProperty(host, 'message', 'Some error message');
//     await waitForStencilLifecycle(page);
//     const filterInput = await getFilterInput();
//
//     await expectA11yToMatchSnapshot(page, filterInput);
//   });
// });

// TODO: A11y
// TODO: Slots
