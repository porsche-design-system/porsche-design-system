import type { Page } from 'puppeteer';
import type { Components } from '@porsche-design-system/components';
import {
  addEventListener,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getHTMLAttributes,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { SelectOption } from '@porsche-design-system/components/src/components/select/select/select-utils';
import { SELECT_SEARCH_TIMEOUT } from '@porsche-design-system/components/src/utils';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-select');
const getSelectValue = async (): Promise<string> => await getProperty(await getHost(), 'value');
const getInputContainer = () => selectNode(page, 'p-select >>> .wrapper');
const getButton = () => selectNode(page, 'p-select >>> button');
const getButtonText = async (): Promise<string> => getProperty(await getButton(), 'textContent');
const getDropdown = () => selectNode(page, 'p-select >>> .listbox');
const getDropdownDisplay = async (): Promise<string> => await getElementStyle(await getDropdown(), 'display');
const getShadowDropdownOption = (n: number) => selectNode(page, `p-select >>> .listbox div:nth-child(${n})`);
const getSelectOption = (n: number) => selectNode(page, `p-select p-select-option:nth-child(${n + 1})`); // First one is native select
const getSelectOptions = () => page.$$('p-select p-select-option');
const getAmountOfVisibleSelectOptions = async (): Promise<number> =>
  await page.$$eval(
    'p-select p-select-option',
    (options) => options.filter((option: HTMLElement) => !option.hidden).length
  );
const getSelectedSelectOptionProperty = async <K extends keyof SelectOption>(property: K): Promise<SelectOption[K]> =>
  await page.$$eval(
    'p-select p-select-option',
    (options, property) =>
      (options.find((option: SelectOption) => option.selected) as SelectOption)[property] as SelectOption[K],
    property
  );

const getHighlightedSelectOptionProperty = async <K extends keyof SelectOption>(
  property: K
): Promise<SelectOption[K]> =>
  await page.$$eval(
    'p-select p-select-option',
    (options, property) =>
      (options.find((option: SelectOption) => option.highlighted) as SelectOption)[property] as SelectOption[K],
    property
  );

const getSelectedOptionIndex = async (): Promise<number> =>
  await page.$$eval('p-select p-select-option', (options: SelectOption[]) =>
    options.indexOf(options.find((option: SelectOption) => option.selected))
  );
const getHighlightedOptionIndex = async (): Promise<number> =>
  await page.$$eval('p-select p-select-option', (options: SelectOption[]) =>
    options.filter((option) => !option.hidden).indexOf(options.find((option: SelectOption) => option.highlighted))
  );
const getHighlightedOption = async (): Promise<SelectOption> =>
  await page.$$eval('p-select p-select-option', (options: SelectOption[]) =>
    options.find((option: SelectOption) => option.highlighted)
  );
const getNativeSelect = () => selectNode(page, 'p-select select');
const getNativeSelectValue = async (): Promise<string> => await getProperty(await getNativeSelect(), 'value');
const getNativeSelectOptions = () => page.$$('p-select select option');
const getNativeSelectInnerHTML = () => page.$eval('p-select select', (el) => el.innerHTML);
const getLabel = () => selectNode(page, 'p-select >>> label');

const labelSlotContent =
  '<span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>';
const descriptionSlotContent =
  '<span slot="description" id="some-description-id">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>';
const messageSlotContent =
  '<span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>';

const setValue = async (value: string) =>
  await page.evaluate((el: HTMLPSelectElement, value) => (el.value = value), await getHost(), value);

// TODO: Test adding hidden, disabled option?
const addOption = async (value: string, textContent?: string) => {
  await page.evaluate(
    (el: HTMLPSelectElement, value, textContent) => {
      const option: any = document.createElement('p-select-option');
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
  await page.evaluate((el: HTMLPSelectElement) => el.lastElementChild.remove(), await getHost());
};

const testValues = [
  'Afghanistan',
  'Åland Islands',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia, Plurinational State of',
  'Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo, the Democratic Republic of the',
  'Cook Islands',
  'Costa Rica',
  "Côte d'Ivoire",
  'Croatia',
  'Cuba',
  'Curaçao',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands (Malvinas)',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard Island and McDonald Islands',
  'Holy See (Vatican City State',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran, Islamic Republic of',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Korea, Democratic People's Republic of",
  'Korea, Republic of',
  'Kuwait',
  'Kyrgyzstan',
];

type InitOptions = {
  props?: Components.PSelect;
  slots?: {
    label?: string;
    description?: string;
    message?: string;
  };
  options?: {
    values?: string[];
    disabledIndex?: number;
    isWithinForm?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  };
};

// TODO: Test keyboard behavior with multiple same textContent
// TODO: When testing the option--selected, set value undefined with or without empty option and check that no option is selected or the empty option
const initSelect = (opt?: InitOptions): Promise<void> => {
  const { props = { name: 'options' }, slots, options } = opt || {};
  const {
    values = ['a', 'b', 'c'],
    disabledIndex,
    isWithinForm = true,
    markupBefore = '',
    markupAfter = '',
  } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const selectOptions = values
    .map((x, idx) => {
      const attrs = [disabledIndex === idx ? 'disabled' : ''].join(' ');
      return `<p-select-option ${x ? `value="${x}"` : ''} ${attrs}>${x}</p-select-option>`;
    })
    .join('\n');

  const markup = `${markupBefore}
      <p-select ${getHTMLAttributes(props)}>
        ${label}
        ${description}
        ${selectOptions}
        ${message}
      </p-select>
      ${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

it('should render', async () => {
  await initSelect();
  const buttonElement = await getButton();

  expect(await getDropdownDisplay()).toBe('none');

  await buttonElement.click();
  await waitForStencilLifecycle(page);

  expect(await getDropdownDisplay()).toBe('flex');
});

describe('native select', () => {
  it('should be rendered', async () => {
    await initSelect();
    const nativeSelectElement = await getNativeSelect();
    expect(nativeSelectElement).not.toBeNull();
    expect(await nativeSelectElement.evaluate((el: HTMLSelectElement) => el.selectedOptions.length)).toBe(0);
  });

  it('should not be visible', async () => {
    await initSelect();
    const nativeSelectElement = await getNativeSelect();
    expect(await getElementStyle(nativeSelectElement, 'opacity')).toBe('0');
  });

  it('props should be in sync', async () => {
    await initSelect();
    const nativeSelectElement = await getNativeSelect();
    expect(await getAttribute(nativeSelectElement, 'name')).toBe('options');

    const host = await getHost();
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

  it('should be in sync with selected option when selecting option', async () => {
    await initSelect();
    expect(await getNativeSelectValue(), 'initial').toBe('');
    expect(await getNativeSelectInnerHTML(), 'initial').toBe('');

    const buttonElement = await getButton();
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    await (await getSelectOption(1)).click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('a');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe(
      '<option value="a" selected=""></option>'
    );

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    await (await getSelectOption(2)).click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after second option selected').toBe('b');
    expect(await getNativeSelectInnerHTML(), 'after second option selected').toBe(
      '<option value="b" selected=""></option>'
    );
  });

  it('should be in sync with selected option initial and when deselecting option', async () => {
    await initSelect({ props: { name: 'options', value: 'a' }, options: { values: ['', 'a'] } });
    expect(await getNativeSelectValue(), 'initial').toBe('a');
    expect(await getNativeSelectInnerHTML(), 'initial').toBe('<option value="a" selected=""></option>');

    const buttonElement = await getButton();
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    await (await getSelectOption(1)).click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after deselection').toBe('');
    expect(await getNativeSelectInnerHTML(), 'after deselection').toBe('');
  });

  it('should be in sync with selected options when setting value', async () => {
    await initSelect();
    expect(await getNativeSelectValue(), 'initial').toBe('');
    expect(await getNativeSelectInnerHTML(), 'initial').toBe('');

    await setValue('a');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after setting value="a"').toBe('a');
    expect(await getNativeSelectInnerHTML(), 'after setting value="a"').toBe('<option value="a" selected=""></option>');

    await setValue(undefined);
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after setting value undefined').toBe('');
    expect(await getNativeSelectInnerHTML(), 'after setting value undefined').toBe('');
  });

  it('should be in sync with selected options when adding new selected option', async () => {
    await initSelect();

    expect(await getNativeSelectValue(), 'initial').toBe('');
    expect(await getNativeSelectInnerHTML(), 'initial').toBe('');

    await setValue('test');
    await waitForStencilLifecycle(page);
    await addOption('test');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after adding matching option').toBe('test');
    expect(await getNativeSelectInnerHTML(), 'after adding matching option').toBe(
      '<option value="test" selected=""></option>'
    );
  });

  it('should be in sync with selected options when removing selected option', async () => {
    await initSelect();
    await setValue('c');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after adding matching option').toBe('c');
    expect(await getNativeSelectInnerHTML(), 'after adding matching option').toBe(
      '<option value="c" selected=""></option>'
    );

    await removeLastOption();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after removing option').toBe('');
    expect(await getNativeSelectInnerHTML(), 'after removing option').toBe('');
  });

  it('should not be rendered when used without wrapping form', async () => {
    await initSelect({
      options: {
        isWithinForm: false,
      },
    });
    const nativeSelectElement = await getNativeSelect();
    expect(nativeSelectElement).toBeNull();
  });
});

// TODO: Should the update event be emitted when slot changes? e.g. option with current set value is added
describe('Update Event', () => {
  it('should emit update event with correct details when option is selected by click', async () => {
    await initSelect();
    const host = await getHost();
    await addEventListener(host, 'update');

    const buttonElement = await getButton();
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before option select').toBe(0);

    const option = await getSelectOption(1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after option select').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after option select').toEqual([
      {
        value: 'a',
        name: 'options',
      },
    ]);
    expect((await getEventSummary(host, 'update')).targets, 'after option select').toEqual([
      {
        nodeName: 'P-SELECT',
        nodeValue: null,
        nodeType: 1,
        tagName: 'P-SELECT',
        className: 'hydrated',
        id: '',
      },
    ]);
  });

  it('should emit update event with correct details when option is selected by keyboard', async () => {
    await initSelect();
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
        value: 'a',
        name: 'options',
      },
    ]);
    expect((await getEventSummary(host, 'update')).targets, 'after option select').toEqual([
      {
        nodeName: 'P-SELECT',
        nodeValue: null,
        nodeType: 1,
        tagName: 'P-SELECT',
        className: 'hydrated',
        id: '',
      },
    ]);
  });
});

describe('outside click', () => {
  it('should show dropdown if input is clicked and hide via outside click', async () => {
    await initSelect({ options: { markupBefore: '<p-text>Some Text</p-text>' } });

    const buttonElement = await getButton();
    const text = await selectNode(page, 'p-text');
    expect(await getDropdownDisplay()).toBe('none');

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay()).toBe('flex');

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after 1st text click').toBe('none');

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after 2nd button click').toBe('flex');

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after 3nd button click').toBe('none');
  });
});

// // puppeteer ignores @media(hover: hover) styles, but playwright can handle it
// xdescribe('hover', () => {
//   it('should change border-color when input is hovered', async () => {
//     await initMultiSelect();
//     await page.mouse.move(0, 300); // avoid potential hover initially
//
//     const inputContainer = await getInputContainer();
//     const initialStyle = await getElementStyle(inputContainer, 'borderColor');
//     expect(initialStyle, 'before hover').toBe('rgb(107, 109, 112)');
//
//     await inputContainer.hover();
//     const hoverColor = await getElementStyle(inputContainer, 'borderColor');
//     expect(hoverColor, 'after hover').toBe('rgb(1, 2, 5)');
//   });
// });

describe('focus', () => {
  it('should focus button when label text is clicked', async () => {
    await initSelect({ props: { name: 'options', label: 'Some Label' } });

    const labelText = await getLabel();
    const buttonElement = await getButton();
    await addEventListener(buttonElement, 'focus');

    expect((await getEventSummary(buttonElement, 'focus')).counter, 'before focus').toBe(0);

    await labelText.click();
    expect((await getEventSummary(buttonElement, 'focus')).counter, 'after focus').toBe(1);
  });

  it('should focus button when tab key is pressed', async () => {
    await initSelect();

    const buttonElement = await getButton();
    await addEventListener(buttonElement, 'focus');

    expect((await getEventSummary(buttonElement, 'focus')).counter).toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(buttonElement, 'focus')).counter).toBe(1);
  });

  it('should close dropdown on tab and focus next element', async () => {
    await initSelect({ options: { markupAfter: '<p-button>Some button</p-button>' } });
    const button = await selectNode(page, 'p-button');
    const comboboxEl = await getButton();
    await addEventListener(comboboxEl, 'focus');
    await addEventListener(button, 'focus');

    expect((await getEventSummary(comboboxEl, 'focus')).counter, 'initial focus').toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(comboboxEl, 'focus')).counter, 'combobox focus after first tab').toBe(1);
    expect(await getDropdownDisplay(), 'dropdown display after first tab').toBe('none');

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    expect(await getDropdownDisplay(), 'dropdown display after Space').toBe('flex');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(comboboxEl, 'focus')).counter, 'combobox focus after second tab').toBe(1);

    expect(await getDropdownDisplay(), 'dropdown display after second tab').toBe('none');
    expect((await getEventSummary(button, 'focus')).counter, 'button focus after second tab').toBe(1);
  });
});

// The keyboard behavior is aligned with the w3c suggestion https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
describe('keyboard behavior', () => {
  describe('closed combobox', () => {
    let buttonElement;
    beforeEach(async () => {
      await initSelect();
      buttonElement = await getButton();
      await addEventListener(buttonElement, 'focus');

      expect((await getEventSummary(buttonElement, 'focus')).counter, 'initial focus').toBe(0);

      await page.keyboard.press('Tab');
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after first tab').toBe(1);
      expect(await getDropdownDisplay(), 'initial').toBe('none');
    });

    // Opens the listbox if it is not already displayed without moving focus or changing selection.
    // DOM focus remains on the combobox.
    it('should open the listbox when pressing ArrowDown', async () => {
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after ArrowDown').toBe(1);
    });
    // Opens the listbox if it is not already displayed without moving focus or changing selection.
    // DOM focus remains on the combobox.
    it('should open the listbox and highlight first option when pressing ArrowUp', async () => {
      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after ArrowUp').toBe(1);
    });
    // Opens the listbox without moving focus or changing selection.
    it('should open the listbox when pressing Enter', async () => {
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after Enter').toBe(1);
    });
    // Opens the listbox without moving focus or changing selection.
    it('should open the listbox when pressing Space', async () => {
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after Space').toBe(1);
    });
    // Opens the listbox and moves visual focus to the first option.
    it('should open the listbox and move highlight to first option when pressing Home', async () => {
      await page.keyboard.press('Home');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(0);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after Home').toBe(1);
    });
    // Opens the listbox and moves visual focus to the last option.
    it('should open the listbox when pressing End', async () => {
      await page.keyboard.press('End');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(2);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after End').toBe(1);
    });
    // First opens the listbox if it is not already displayed and then moves visual focus to the first option that matches the typed character.
    // If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string.
    // If the same character is typed in succession, visual focus cycles among the options starting with that character.
    it('should open the listbox when pressing a printable character', async () => {
      await page.keyboard.press('B');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing "B"').toBe(1);
    });
  });

  describe('within listbox', () => {
    let buttonElement;
    let buttonAfter;
    beforeEach(async () => {
      await initSelect({ options: { values: testValues, markupAfter: '<p-button>Button</p-button>' } });
      buttonAfter = await selectNode(page, 'p-button');
      await addEventListener(buttonAfter, 'focus');
      buttonElement = await getButton();
      await addEventListener(buttonElement, 'focus');

      expect((await getEventSummary(buttonElement, 'focus')).counter, 'initial focus').toBe(0);

      await page.keyboard.press('Tab');
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after first tab').toBe(1);
      expect(await getDropdownDisplay(), 'initial').toBe('none');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);
    });

    // Sets the value to the content of the focused option in the listbox.
    // Closes the listbox.
    // Sets visual focus on the combobox.
    it('should select the option and close the dropdown when pressing Enter on option', async () => {
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(0);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getSelectValue()).toBe(testValues[0]);
      expect(await getSelectedOptionIndex()).toBe(0);
      expect(await getDropdownDisplay(), 'initial').toBe('none');
      expect(await getHighlightedOptionIndex()).toBe(0); // Highlighted options stays highlighted even after closing of the dropdown
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Enter').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-SELECT');
      expect(await getActiveElementTagNameInShadowRoot(await getHost())).toBe('BUTTON');
    });
    // Sets the value to the content of the focused option in the listbox.
    // Closes the listbox.
    // Sets visual focus on the combobox.
    it('should select the option and close the dropdown when pressing Space on option', async () => {
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(0);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getSelectValue()).toBe(testValues[0]);
      expect(await getSelectedOptionIndex()).toBe(0);
      expect(await getDropdownDisplay(), 'initial').toBe('none');
      expect(await getHighlightedOptionIndex()).toBe(0); // Highlighted options stays highlighted even after closing of the dropdown
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Space').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-SELECT');
      expect(await getActiveElementTagNameInShadowRoot(await getHost())).toBe('BUTTON');
    });
    // Sets the value to the content of the focused option in the listbox.
    // Closes the listbox.
    // Performs the default action, moving focus to the next focusable element. Note: the native <select> element closes the listbox but does not move focus on tab. This pattern matches the behavior of the other comboboxes rather than the native element in this case.
    it('should select the option, close the dropdown and focus next element when pressing Tab on option', async () => {
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(0);
      expect((await getEventSummary(buttonAfter, 'focus')).counter, 'before pressing Tab').toBe(0);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getSelectValue()).toBe(testValues[0]);
      expect(await getSelectedOptionIndex()).toBe(0);
      expect(await getDropdownDisplay(), 'initial').toBe('none');
      expect(await getHighlightedOptionIndex()).toBe(0); // Highlighted options stays highlighted even after closing of the dropdown
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Tab').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-BUTTON');
      expect((await getEventSummary(buttonAfter, 'focus')).counter, 'after pressing Tab').toBe(1);
    });
    // Closes the listbox.
    // Sets visual focus on the combobox.
    it('should close the dropdown when pressing Escape', async () => {
      expect(await getDropdownDisplay(), 'initial').toBe('flex');

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('none');
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Tab').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-SELECT');
      expect(await getActiveElementTagNameInShadowRoot(await getHost())).toBe('BUTTON');
    });
    // Moves visual focus to the next option.
    // If visual focus is on the last option, visual focus does not move.
    it('should move highlight to the next option when pressing Down Arrow', async () => {
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(0);

      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(1);

      await page.keyboard.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);

      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);
    });
    // Moves visual focus to the previous option.
    // If visual focus is on the first option, visual focus does not move.
    it('should move highlight to the next option when pressing ArrowUp', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(2);

      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(1);

      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(0);

      await page.keyboard.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(0);
    });
    // Moves visual focus to the first option.
    it('should move highlight to the first option when pressing Home', async () => {
      await page.keyboard.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);

      await page.keyboard.press('Home');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(0);
    });
    // Moves visual focus to the last option.
    it('should move highlight to the last option when pressing End', async () => {
      await page.keyboard.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);

      await page.keyboard.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);
    });
    // Jumps visual focus up 10 options (or to first option).
    it('should move highlight up 10 options (or to first option) when pressing PageUp', async () => {
      await page.keyboard.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);

      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 11);
    });
    // Jumps visual focus down 10 options (or to last option).
    it('should move highlight down 10 options (or to last option) when pressing PageDown', async () => {
      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(9);

      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(19);

      await page.keyboard.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);

      await page.keyboard.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 11);

      await page.keyboard.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);
    });
    // First opens the listbox if it is not already displayed and then moves visual focus to the first option that matches the typed character.
    // If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string.
    // If the same character is typed in succession, visual focus cycles among the options starting with that character.
    it('should move highlight correctly when pressing printable characters', async () => {
      await page.keyboard.press('B');
      await page.keyboard.press('e');
      await page.keyboard.press('n');
      await waitForStencilLifecycle(page);

      const valueIndex = testValues.indexOf(testValues.find((val) => val.startsWith('Ben')));

      expect(await getHighlightedSelectOptionProperty('textContent')).toBe(testValues[valueIndex]);

      await new Promise((resolve) => setTimeout(resolve, SELECT_SEARCH_TIMEOUT)); // Wait for searchString timeout
      await page.keyboard.press('B');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty('textContent')).toBe(testValues[valueIndex + 1]);

      await new Promise((resolve) => setTimeout(resolve, SELECT_SEARCH_TIMEOUT)); // Wait for searchString timeout
      await page.keyboard.press('B');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty('textContent')).toBe(testValues[valueIndex + 2]);

      await new Promise((resolve) => setTimeout(resolve, SELECT_SEARCH_TIMEOUT)); // Wait for searchString timeout
      await page.keyboard.press('D');
      await page.keyboard.press('e');
      await page.keyboard.press('n');

      expect(await getHighlightedSelectOptionProperty('textContent')).toBe(
        testValues.find((val) => val.startsWith('Den'))
      );

      await new Promise((resolve) => setTimeout(resolve, SELECT_SEARCH_TIMEOUT)); // Wait for searchString timeout
      await page.keyboard.press('A');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty('textContent')).toBe(testValues[0]);
    });
  });
});

// describe('selection', () => {
//   it('should add valid selection on enter', async () => {
//     await initMultiSelect();
//
//     const inputElement = await getInput();
//
//     await inputElement.type('B');
//     await waitForStencilLifecycle(page);
//
//     await page.keyboard.press('ArrowDown');
//     await waitForStencilLifecycle(page);
//
//     await inputElement.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     const value = await getMultiSelectValue();
//     const nativeSelectOptions = await getNativeSelectOptions();
//     const filterPlaceholder = await getInputPlaceholder();
//     const selectedMultiSelectOptions = await getSelectedMultiSelectOptionProperty('textContent');
//
//     expect(value).toStrictEqual(['b']);
//     expect(await getProperty(nativeSelectOptions[0], 'value'), 'after first option selected').toEqual('b');
//     expect(selectedMultiSelectOptions, 'after first option selected').toEqual(['Option B']);
//     expect(filterPlaceholder, 'after first option selected').toBe(selectedMultiSelectOptions.join(', '));
//
//     await inputElement.press('Backspace');
//     await page.keyboard.press('ArrowDown');
//     await waitForStencilLifecycle(page);
//     await inputElement.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     const valueAfter = await getMultiSelectValue();
//     const nativeSelectOptionsAfter = await getNativeSelectOptions();
//     const filterPlaceholderSecond = await getInputPlaceholder();
//     const selectedMultiSelectOptionsSecond = await getSelectedMultiSelectOptionProperty('textContent');
//
//     expect(valueAfter).toStrictEqual(['b', 'c']);
//     expect(await getProperty(nativeSelectOptionsAfter[0], 'value'), 'after second option selected').toEqual('b');
//     expect(await getProperty(nativeSelectOptionsAfter[1], 'value'), 'after second option selected').toEqual('c');
//     expect(selectedMultiSelectOptionsSecond, 'after second option selected').toEqual(['Option B', 'Option C']);
//     expect(filterPlaceholderSecond, 'after second option selected').toBe(selectedMultiSelectOptionsSecond.join(', '));
//   });
//
//   it('should add valid selection on click', async () => {
//     await initMultiSelect();
//
//     const inputElement = await getInput();
//     await inputElement.click();
//     await waitForStencilLifecycle(page);
//
//     const dropdownOption2 = await getMultiSelectOption(2);
//     await dropdownOption2.click();
//     await waitForStencilLifecycle(page);
//
//     const value = await getMultiSelectValue();
//     const nativeSelectOptions = await getNativeSelectOptions();
//     const filterPlaceholder = await getInputPlaceholder();
//     const selectedMultiSelectOptions = await getSelectedMultiSelectOptionProperty('textContent');
//
//     expect(value).toStrictEqual(['b']);
//     expect(await getProperty(nativeSelectOptions[0], 'value'), 'after first option selected').toEqual('b');
//     expect(filterPlaceholder, 'after first selection').toBe('Option B');
//     expect(filterPlaceholder, 'after first selection').toEqual(selectedMultiSelectOptions.join(', '));
//
//     const dropdownOption3 = await getMultiSelectOption(3);
//     await dropdownOption3.click();
//     await waitForStencilLifecycle(page);
//
//     const valueAfter = await getMultiSelectValue();
//     const nativeSelectOptionsAfter = await getNativeSelectOptions();
//     const filterPlaceholderSecond = await getInputPlaceholder();
//     const selectedMultiSelectOptionsSecond = await getSelectedMultiSelectOptionProperty('textContent');
//
//     expect(valueAfter).toStrictEqual(['b', 'c']);
//     expect(await getProperty(nativeSelectOptionsAfter[0], 'value'), 'after second option selected').toEqual('b');
//     expect(await getProperty(nativeSelectOptionsAfter[1], 'value'), 'after second option selected').toEqual('c');
//     expect(filterPlaceholderSecond, 'after second selection').toBe('Option B, Option C');
//     expect(filterPlaceholderSecond, 'after second selection').toEqual(selectedMultiSelectOptionsSecond.join(', '));
//   });
//
//   it('should reset selection on reset button enter', async () => {
//     await initMultiSelect();
//     const inputElement = await getInput();
//     await inputElement.press('Space');
//     await waitForStencilLifecycle(page);
//     await page.keyboard.press('ArrowDown');
//     await waitForStencilLifecycle(page);
//     await inputElement.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect(await getProperty((await getNativeSelectOptions())[0], 'value')).toEqual('a');
//     expect(await getMultiSelectValue()).toEqual(['a']);
//     expect(await getSelectedMultiSelectOptionProperty('value')).toEqual(['a']);
//
//     const resetButton = await getResetButton();
//     await addEventListener(resetButton, 'focus');
//
//     await inputElement.press('Tab');
//     await waitForStencilLifecycle(page);
//     expect((await getEventSummary(resetButton, 'focus')).counter).toBe(1);
//
//     await resetButton.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect(await getNativeSelectOptions()).toEqual([]);
//     expect(await getMultiSelectValue()).toEqual([]);
//     expect(await getSelectedMultiSelectOptionProperty('value')).toEqual([]);
//   });
//
//   it('should reset selection on reset button click', async () => {
//     await initMultiSelect();
//     const inputElement = await getInput();
//     await inputElement.click();
//     await waitForStencilLifecycle(page);
//
//     const option1 = await getMultiSelectOption(1);
//     const option2 = await getMultiSelectOption(2);
//     await option1.click();
//     await option2.click();
//     await waitForStencilLifecycle(page);
//
//     expect(await getProperty((await getNativeSelectOptions())[0], 'value')).toEqual('a');
//     expect(await getProperty((await getNativeSelectOptions())[1], 'value')).toEqual('b');
//     expect(await getMultiSelectValue()).toEqual(['a', 'b']);
//     expect(await getSelectedMultiSelectOptionProperty('value')).toEqual(['a', 'b']);
//
//     const resetButton = await getResetButton();
//     await resetButton.click();
//     await waitForStencilLifecycle(page);
//
//     expect(await getNativeSelectOptions()).toEqual([]);
//     expect(await getMultiSelectValue()).toEqual([]);
//     expect(await getSelectedMultiSelectOptionProperty('value')).toEqual([]);
//   });
// });
//
// describe('keyboard and click events', () => {
//   it('should highlight first option on arrow down', async () => {
//     await initMultiSelect();
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(-1);
//
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('ArrowDown');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
//     expect(await getSelectedOptionIndicies()).toStrictEqual([]);
//     expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual([]);
//
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
//     expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a']);
//     expect(await getSelectedOptionIndicies()).toStrictEqual([0]);
//
//     await page.keyboard.press('ArrowDown');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(1);
//     expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a']);
//     expect(await getSelectedOptionIndicies()).toStrictEqual([0]);
//
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(1);
//     expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a', 'b']);
//     expect(await getSelectedOptionIndicies()).toStrictEqual([0, 1]);
//   });
//
//   it('should skip disabled option on arrow down', async () => {
//     await initMultiSelect({ options: { disabledIndex: 0 } });
//
//     expect(await getProperty(await getMultiSelectOption(1), 'disabled'), 'disabled option').toBe(true);
//
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('ArrowDown');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option').toBe(1);
//   });
//
//   it('should skip disabled option on arrow up', async () => {
//     await initMultiSelect({ options: { disabledIndex: 1 } });
//
//     expect(await getProperty(await getMultiSelectOption(2), 'disabled'), 'disabled option').toBe(true);
//
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('ArrowDown');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(2);
//
//     await page.keyboard.press('ArrowUp');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
//   });
//
//   it('should open dropdown with spacebar', async () => {
//     await initMultiSelect();
//
//     await page.keyboard.press('Tab');
//
//     expect(await getDropdownDisplay()).toBe('none');
//
//     await page.keyboard.press('Space');
//     await waitForStencilLifecycle(page);
//
//     expect(await getDropdownDisplay()).toBe('flex');
//   });
//
//   it('should toggle selected with enter', async () => {
//     await initMultiSelect();
//
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Space');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
//     expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a']);
//     expect(await getSelectedOptionIndicies()).toStrictEqual([0]);
//
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
//     expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual([]);
//     expect(await getSelectedOptionIndicies()).toStrictEqual([]);
//
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
//     expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a']);
//     expect(await getSelectedOptionIndicies()).toStrictEqual([0]);
//   });
//
//   it('should not select option on Escape', async () => {
//     await initMultiSelect();
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('ArrowDown');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
//
//     await page.keyboard.press('Escape');
//     await waitForStencilLifecycle(page);
//
//     expect(await getSelectedOptionIndicies()).toStrictEqual([]);
//     expect(await getDropdownDisplay()).toBe('none');
//   });
//
//   it('should highlight and select options on PageDown/PageUp', async () => {
//     await initMultiSelect();
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Space');
//     await waitForStencilLifecycle(page);
//     await page.keyboard.press('PageDown');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(2);
//     expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual([]);
//     expect(await getSelectedOptionIndicies()).toStrictEqual([]);
//
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(2);
//     expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['c']);
//     expect(await getSelectedOptionIndicies()).toStrictEqual([2]);
//
//     await page.keyboard.press('PageUp');
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect(await getHighlightedOptionIndex(), 'for highlighted option after arrow down').toBe(0);
//     expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['a', 'c']);
//     expect(await getSelectedOptionIndicies()).toStrictEqual([0, 2]);
//   });
//
//   it('should open dropdown on mouseclick and stay open on 2nd click', async () => {
//     await initMultiSelect();
//     const inputElement = await getInput();
//
//     await inputElement.click();
//     await waitForStencilLifecycle(page);
//
//     expect(await getDropdownDisplay(), 'after click').toBe('flex');
//     expect(await getHighlightedOptionIndex(), 'for highlighted option').toBe(-1);
//
//     await inputElement.click();
//     await waitForStencilLifecycle(page);
//
//     expect(await getDropdownDisplay(), 'after second click').toBe('flex');
//     expect(await getHighlightedOptionIndex(), 'for highlighted option').toBe(-1);
//   });
//
//   it('should select second option on mouseclick', async () => {
//     await initMultiSelect();
//     const inputElement = await getInput();
//
//     await inputElement.click();
//     await waitForStencilLifecycle(page);
//
//     const dropdownOption = await getMultiSelectOption(2);
//     await dropdownOption.click();
//     await waitForStencilLifecycle(page);
//
//     expect(await getDropdownDisplay(), 'after click').toBe('flex');
//     expect(await getSelectedMultiSelectOptionProperty('value'), 'for selected index').toEqual(['b']);
//     expect(await getSelectedOptionIndicies()).toStrictEqual([1]);
//   });
//
//   it('should close dropdown on Tab', async () => {
//     await initMultiSelect();
//
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Space');
//     await waitForStencilLifecycle(page);
//
//     expect(await getDropdownDisplay(), 'after open').toBe('flex');
//
//     await page.keyboard.press('Tab');
//     await waitForStencilLifecycle(page);
//
//     expect(await getDropdownDisplay(), 'after tab').toBe('none');
//   });
//   it('should focus reset button and dropdown should stay open when there is a selection', async () => {
//     await initMultiSelect({
//       options: { markupAfter: '<p-button>Button</p-button>' },
//     });
//     const button = await selectNode(page, 'p-button');
//
//     await setValue(['a']);
//     const resetButton = await getResetButton();
//     const inputElement = await getInput();
//
//     await addEventListener(button, 'focus');
//     await addEventListener(resetButton, 'focus');
//     await addEventListener(inputElement, 'focus');
//     expect(resetButton).not.toBeNull();
//     expect((await getEventSummary(button, 'focus')).counter, 'initial').toBe(0);
//     expect((await getEventSummary(resetButton, 'focus')).counter, 'initial').toBe(0);
//     expect((await getEventSummary(inputElement, 'focus')).counter, 'initial').toBe(0);
//
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Space');
//     await waitForStencilLifecycle(page);
//
//     expect((await getEventSummary(button, 'focus')).counter, 'initial').toBe(0);
//     expect((await getEventSummary(resetButton, 'focus')).counter, 'initial').toBe(0);
//     expect((await getEventSummary(inputElement, 'focus')).counter, 'after open').toBe(1);
//     expect(await getDropdownDisplay(), 'after open').toBe('flex');
//
//     await page.keyboard.press('Tab');
//     await waitForStencilLifecycle(page);
//
//     expect((await getEventSummary(button, 'focus')).counter, 'initial').toBe(0);
//     expect((await getEventSummary(resetButton, 'focus')).counter, 'initial').toBe(1);
//     expect((await getEventSummary(inputElement, 'focus')).counter, 'after open').toBe(1);
//     expect(await getDropdownDisplay(), 'after tab').toBe('flex');
//
//     await page.keyboard.press('Tab');
//     await waitForStencilLifecycle(page);
//
//     expect((await getEventSummary(button, 'focus')).counter, 'initial').toBe(1);
//     expect((await getEventSummary(resetButton, 'focus')).counter, 'initial').toBe(1);
//     expect((await getEventSummary(inputElement, 'focus')).counter, 'after open').toBe(1);
//     expect(await getDropdownDisplay(), 'after tab').toBe('none');
//   });
//
//   it('should close dropdown on Esc', async () => {
//     await initMultiSelect();
//
//     const inputElement = await getInput();
//
//     await addEventListener(inputElement, 'focus');
//     expect((await getEventSummary(inputElement, 'focus')).counter, 'initial').toBe(0);
//
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Space');
//     await waitForStencilLifecycle(page);
//
//     expect((await getEventSummary(inputElement, 'focus')).counter, 'after open').toBe(1);
//     expect(await getDropdownDisplay(), 'after open').toBe('flex');
//
//     await page.keyboard.press('Escape');
//     await waitForStencilLifecycle(page);
//
//     expect(await getDropdownDisplay(), 'after Esc').toBe('none');
//     await setValue(['a']);
//
//     await page.keyboard.press('Space');
//     await waitForStencilLifecycle(page);
//
//     expect(await getDropdownDisplay(), 'after second open').toBe('flex');
//
//     await page.keyboard.press('Escape');
//     await waitForStencilLifecycle(page);
//
//     expect(await getDropdownDisplay(), 'after second Esc').toBe('none');
//   });
//
//   it('should submit form with correct values when is wrapped by form on Enter', async () => {
//     await initMultiSelect();
//     const form = await selectNode(page, 'form');
//     const inputElement = await getInput();
//
//     await addEventListener(form, 'submit');
//     await addEventListener(inputElement, 'focus');
//     expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);
//     expect((await getEventSummary(inputElement, 'focus')).counter, 'initial').toBe(0);
//
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Space');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);
//     expect(await getMultiSelectValue()).toEqual(['a']);
//
//     await page.keyboard.press('Escape');
//     expect((await getEventSummary(inputElement, 'focus')).counter, 'after escape').toBe(1);
//     expect(await getHighlightedOptionIndex(), 'after escape').toBe(-1);
//
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
//     expect(
//       await form.evaluate((form: HTMLFormElement) => Array.from(new FormData(form).values()).join(',')),
//       'after Enter'
//     ).toEqual('a');
//   });
//
//   it('should not submit form when is not wrapped by form on Enter', async () => {
//     initConsoleObserver(page);
//     await initMultiSelect({ options: { isWithinForm: false } });
//     expect(getConsoleErrorsAmount()).toBe(0);
//     const inputElement = await getInput();
//
//     await addEventListener(inputElement, 'focus');
//     expect((await getEventSummary(inputElement, 'focus')).counter, 'initial').toBe(0);
//
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Space');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect(await getMultiSelectValue()).toEqual(['a']);
//
//     await page.keyboard.press('Escape');
//     expect((await getEventSummary(inputElement, 'focus')).counter, 'after escape').toBe(1);
//     expect(await getHighlightedOptionIndex(), 'after escape').toBe(-1);
//
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     expect(getConsoleErrorsAmount()).toBe(0);
//   });
// });
//
// describe('disabled', () => {
//   it('should have not-allowed cursor', async () => {
//     await initMultiSelect({ props: { name: 'options', disabled: true } });
//     expect(await getElementStyle(await getInput(), 'cursor')).toBe('not-allowed');
//   });
//
//   it('should not be able to open or interact', async () => {
//     await initMultiSelect({
//       props: { name: 'options', disabled: true },
//       options: { markupAfter: '<p-button>Button</p-button>' },
//     });
//     const button = await selectNode(page, 'p-button');
//
//     await addEventListener(button, 'focus');
//     expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(0);
//
//     await page.keyboard.press('Tab');
//     expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(1);
//   });
// });
//
// describe('slots', () => {
//   it('should update when selected option is added', async () => {
//     await initMultiSelect();
//     expect(await getMultiSelectValue()).toStrictEqual([]);
//
//     await setValue(['d']);
//     await waitForStencilLifecycle(page);
//     expect(await getMultiSelectValue()).toStrictEqual(['d']);
//
//     await addOption('d', 'Option D');
//     await waitForStencilLifecycle(page);
//     const nativeOptions = await getNativeSelectOptions();
//     const filterPlaceholder = await getInputPlaceholder();
//     expect(await getProperty(nativeOptions[0], 'value'), 'after option was added').toStrictEqual('d');
//     expect(filterPlaceholder, 'after option was added').toBe('Option D');
//   });
//
//   it('should update when selected option is removed', async () => {
//     await initMultiSelect();
//     await setValue(['c']);
//     await waitForStencilLifecycle(page);
//     const nativeOptions = await getNativeSelectOptions();
//     const filterPlaceholder = await getInputPlaceholder();
//     expect(await getProperty(nativeOptions[0], 'value'), 'after option was added').toStrictEqual('c');
//     expect(await getMultiSelectValue()).toStrictEqual(['c']);
//     expect(filterPlaceholder, 'after option was added').toBe('Option C');
//
//     await page.evaluate(
//       (el) => {
//         el.lastElementChild.remove();
//       },
//       await getHost()
//     );
//     await waitForStencilLifecycle(page);
//
//     const nativeOptionsAfter = await getNativeSelectOptions();
//     const filterPlaceholderAfter = await getInputPlaceholder();
//
//     expect(nativeOptionsAfter, 'after selected option was removed').toStrictEqual([]);
//     expect(filterPlaceholderAfter, 'after option was added').toBeNull();
//   });
// });
//
// describe('lifecycle', () => {
//   it('should work without unnecessary round trips on init', async () => {
//     await initMultiSelect();
//     const inputElement = await getInput();
//     const status1 = await getLifecycleStatus(page);
//
//     expect(status1.componentDidLoad['p-multi-select'], 'componentDidLoad: p-multi-select').toBe(1);
//     expect(status1.componentDidLoad['p-multi-select-option'], 'componentDidLoad: p-multi-select-option').toBe(3);
//     expect(status1.componentDidLoad['p-checkbox-wrapper'], 'componentDidLoad: p-checkbox-wrapper').toBe(3);
//     expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down and reset icon
//
//     expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(8);
//     expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
//
//     await inputElement.click();
//     await waitForStencilLifecycle(page);
//     const status2 = await getLifecycleStatus(page);
//     expect(status2.componentDidUpdate['p-multi-select'], 'componentDidUpdate: p-multi-select').toBe(1);
//     expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
//   });
//
//   it('should work without unnecessary round trips when selecting option', async () => {
//     await initMultiSelect();
//     const inputElement = await getInput();
//
//     await inputElement.click();
//     await waitForStencilLifecycle(page);
//     const status1 = await getLifecycleStatus(page);
//
//     expect(status1.componentDidLoad['p-multi-select'], 'componentDidLoad: p-multi-select').toBe(1);
//     expect(status1.componentDidLoad['p-multi-select-option'], 'componentDidLoad: p-multi-select-option').toBe(3);
//     expect(status1.componentDidLoad['p-checkbox-wrapper'], 'componentDidLoad: p-checkbox-wrapper').toBe(3);
//     expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down and reset icon
//
//     expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(8);
//     expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
//
//     const option1 = await getMultiSelectOption(1);
//     await option1.click();
//     await waitForStencilLifecycle(page);
//
//     const status2 = await getLifecycleStatus(page);
//     expect(status2.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1); // reset button
//     expect(status2.componentDidUpdate['p-multi-select-option'], 'componentDidUpdate: p-multi-select-option').toBe(1);
//     expect(status2.componentDidUpdate['p-multi-select'], 'componentDidUpdate: p-multi-select').toBe(2);
//     expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(3);
//   });
//
//   it('should work without unnecessary round trips on filter input change', async () => {
//     await initMultiSelect();
//     const inputElement = await getInput();
//
//     await inputElement.click();
//     await waitForStencilLifecycle(page);
//
//     const status1 = await getLifecycleStatus(page);
//     expect(status1.componentDidLoad['p-multi-select'], 'componentDidLoad: p-multi-select').toBe(1);
//     expect(status1.componentDidLoad['p-multi-select-option'], 'componentDidLoad: p-multi-select-option').toBe(3);
//     expect(status1.componentDidLoad['p-checkbox-wrapper'], 'componentDidLoad: p-checkbox-wrapper').toBe(3);
//     expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down and reset icon
//
//     expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(8);
//     expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1); // slotchange forces second update
//
//     await page.keyboard.press('c');
//     await waitForStencilLifecycle(page);
//
//     const status2 = await getLifecycleStatus(page);
//     expect(status2.componentDidUpdate['p-multi-select-option'], 'componentDidUpdate: p-multi-select-option').toBe(0);
//     expect(status2.componentDidUpdate['p-multi-select'], 'componentDidUpdate: p-multi-select').toBe(1);
//     expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
//   });
// });
//
// describe('accessibility', () => {
//   it('should expose correct initial accessibility tree and aria properties of filter', async () => {
//     await initMultiSelect({ options: { disabledIndex: 1 } });
//     const inputElement = await getInput();
//
//     await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
//   });
//
//   it('should expose correct accessibility tree of option list if filter value has no match', async () => {
//     await initMultiSelect();
//     const inputElement = await getInput();
//     await inputElement.type('d');
//     await waitForStencilLifecycle(page);
//
//     const dropDown = await getDropdown();
//     const assertiveText = await getAssertiveText();
//
//     await expectA11yToMatchSnapshot(page, dropDown, { interestingOnly: false });
//   });
//
//   it('should expose correct accessibility tree if option is highlighted', async () => {
//     await initMultiSelect();
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Space');
//     await page.keyboard.press('ArrowDown');
//     await waitForStencilLifecycle(page);
//
//     const inputElement = await getInput();
//     const assertiveText = await getAssertiveText();
//
//     await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
//     await expectA11yToMatchSnapshot(page, assertiveText, { interestingOnly: false });
//   });
//
//   it('should expose correct accessibility tree if option is selected', async () => {
//     await initMultiSelect();
//     await page.keyboard.press('Tab');
//     await page.keyboard.press('Space');
//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.press('Enter');
//     await waitForStencilLifecycle(page);
//
//     const inputElement = await getInput();
//     const assertiveText = await getAssertiveText();
//
//     await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
//     await expectA11yToMatchSnapshot(page, assertiveText, { interestingOnly: false });
//   });
//
//   it('should expose correct accessibility tree if description is set', async () => {
//     await initMultiSelect();
//     const host = await getHost();
//     await setProperty(host, 'description', 'Some description');
//     await waitForStencilLifecycle(page);
//     const inputElement = await getInput();
//
//     await expectA11yToMatchSnapshot(page, inputElement);
//   });
//
//   it('should expose correct accessibility tree in error state', async () => {
//     await initMultiSelect();
//     const host = await getHost();
//     await setProperty(host, 'state', 'error');
//     await setProperty(host, 'message', 'Some error message');
//     await waitForStencilLifecycle(page);
//     const inputElement = await getInput();
//
//     await expectA11yToMatchSnapshot(page, inputElement);
//   });
// });
