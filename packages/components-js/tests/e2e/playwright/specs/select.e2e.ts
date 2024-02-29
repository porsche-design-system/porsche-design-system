import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import type { Components } from '@porsche-design-system/components/src/components';
import {
  addEventListener,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowser,
  waitForStencilLifecycle,
} from '../helpers';
import type { SelectOption } from '@porsche-design-system/components/src/components/select/select/select-utils';

const getHost = (page: Page) => page.$('p-select');
const getSelectValue = async (page: Page): Promise<string> => await getProperty(await getHost(page), 'value');
const getButton = (page: Page) => page.$('p-select button');
const getButtonText = async (page: Page): Promise<string> => getProperty(await getButton(page), 'textContent');
const getDropdown = (page: Page) => page.$('p-select .listbox');
const getDropdownDisplay = async (page: Page): Promise<string> =>
  await getElementStyle(await getDropdown(page), 'display');
const getSelectOption = (page: Page, n: number) => page.$(`p-select p-select-option:nth-child(${n + 1})`); // First one is native select
const getSelectedSelectOptionProperty = async <K extends keyof SelectOption>(
  page: Page,
  property: K
): Promise<SelectOption[K]> =>
  await page.$$eval(
    'p-select p-select-option',
    (options, property) =>
      ((options.find((option: SelectOption) => option.selected) as SelectOption)?.[property] as SelectOption[K]) ??
      undefined,
    property
  );

const getHighlightedSelectOptionProperty = async <K extends keyof SelectOption>(
  page: Page,
  property: K
): Promise<SelectOption[K] | undefined> =>
  await page.$$eval(
    'p-select p-select-option',
    (options, property) =>
      ((options.find((option: SelectOption) => option.highlighted) as SelectOption)?.[property] as SelectOption[K]) ??
      undefined,
    property
  );

const getSelectedOptionIndex = async (page: Page): Promise<number> =>
  await page.$$eval('p-select p-select-option', (options: SelectOption[]) =>
    options.indexOf(options.find((option: SelectOption) => option.selected))
  );
const getHighlightedOptionIndex = async (page: Page): Promise<number> =>
  await page.$$eval('p-select p-select-option', (options: SelectOption[]) =>
    options.filter((option) => !option.hidden).indexOf(options.find((option: SelectOption) => option.highlighted))
  );
const getNativeSelect = (page: Page) => page.$('p-select select');
const getNativeSelectValue = async (page: Page): Promise<string> =>
  await getProperty(await getNativeSelect(page), 'value');
const getNativeSelectInnerHTML = (page: Page) => page.$eval('p-select select', (el) => el.innerHTML);
const getLabel = (page: Page) => page.$('p-select label');

const setValue = async (page: Page, value: string) =>
  await page.evaluate(({ el, value }) => ((el as HTMLPSelectElement).value = value), {
    el: await getHost(page),
    value,
  });

// TODO: Test adding hidden, disabled option?
const addOption = async (page: Page, value: string, textContent?: string) => {
  await page.evaluate(
    ({ el, value, textContent }) => {
      const option: any = document.createElement('p-select-option');
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
    disabledIndices?: number[];
    isWithinForm?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initSelect = (page: Page, opt?: InitOptions): Promise<void> => {
  const { props = { name: 'options' }, slots, options } = opt || {};
  const {
    values = ['a', 'b', 'c'],
    disabledIndices = [],
    isWithinForm = true,
    markupBefore = '',
    markupAfter = '',
  } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const selectOptions = values
    .map((x, idx) => {
      const attrs = [disabledIndices.includes(idx) ? 'disabled' : ''].join(' ');
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

test('should render', async ({ page }) => {
  await initSelect(page);
  const buttonElement = await getButton(page);

  expect(await getDropdownDisplay(page)).toBe('none');

  await buttonElement.click();
  await waitForStencilLifecycle(page);

  expect(await getDropdownDisplay(page)).toBe('flex');
});

test.describe('native select', () => {
  test('should be rendered', async ({ page }) => {
    await initSelect(page);
    const nativeSelectElement = await getNativeSelect(page);
    expect(nativeSelectElement).not.toBeNull();
    expect(await nativeSelectElement.evaluate((el: HTMLSelectElement) => el.selectedOptions.length)).toBe(0);
  });

  test('should not be visible', async ({ page }) => {
    await initSelect(page);
    const nativeSelectElement = await getNativeSelect(page);
    expect(await getElementStyle(nativeSelectElement, 'opacity')).toBe('0');
  });

  test('props should be in sync', async ({ page }) => {
    await initSelect(page);
    const nativeSelectElement = await getNativeSelect(page);
    expect(await getAttribute(nativeSelectElement, 'name')).toBe('options');

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

  test('should be in sync with selected option when selecting option', async ({ page }) => {
    await initSelect(page);
    expect(await getNativeSelectValue(page), 'initial').toBe('');
    expect(await getNativeSelectInnerHTML(page), 'initial').toBe('');

    const buttonElement = await getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    await (await getSelectOption(page, 1)).click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('a');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe(
      '<option value="a" selected=""></option>'
    );

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    await (await getSelectOption(page, 2)).click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after second option selected').toBe('b');
    expect(await getNativeSelectInnerHTML(page), 'after second option selected').toBe(
      '<option value="b" selected=""></option>'
    );
  });

  test('should be in sync with selected option initial and when deselecting option', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', value: 'a' }, options: { values: ['', 'a'] } });
    expect(await getNativeSelectValue(page), 'initial').toBe('a');
    expect(await getNativeSelectInnerHTML(page), 'initial').toBe('<option value="a" selected=""></option>');

    const buttonElement = await getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    await (await getSelectOption(page, 1)).click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after deselection').toBe('');
    expect(await getNativeSelectInnerHTML(page), 'after deselection').toBe('');
  });

  test('should be in sync with selected options when setting value', async ({ page }) => {
    await initSelect(page);
    expect(await getNativeSelectValue(page), 'initial').toBe('');
    expect(await getNativeSelectInnerHTML(page), 'initial').toBe('');

    await setValue(page, 'a');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after setting value="a"').toBe('a');
    expect(await getNativeSelectInnerHTML(page), 'after setting value="a"').toBe(
      '<option value="a" selected=""></option>'
    );

    await setValue(page, undefined);
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after setting value undefined').toBe('');
    expect(await getNativeSelectInnerHTML(page), 'after setting value undefined').toBe('');
  });

  test('should be in sync with selected options when adding new selected option', async ({ page }) => {
    await initSelect(page);

    expect(await getNativeSelectValue(page), 'initial').toBe('');
    expect(await getNativeSelectInnerHTML(page), 'initial').toBe('');

    await setValue(page, 'test');
    await waitForStencilLifecycle(page);
    await addOption(page, 'test');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after adding matching option').toBe('test');
    expect(await getNativeSelectInnerHTML(page), 'after adding matching option').toBe(
      '<option value="test" selected=""></option>'
    );
  });

  test('should be in sync with selected options when removing selected option', async ({ page }) => {
    await initSelect(page);
    await setValue(page, 'c');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after adding matching option').toBe('c');
    expect(await getNativeSelectInnerHTML(page), 'after adding matching option').toBe(
      '<option value="c" selected=""></option>'
    );

    await removeLastOption(page);
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after removing option').toBe('');
    expect(await getNativeSelectInnerHTML(page), 'after removing option').toBe('');
  });

  test('should not be rendered when used without wrapping form', async ({ page }) => {
    await initSelect(page, {
      options: {
        isWithinForm: false,
      },
    });
    const nativeSelectElement = await getNativeSelect(page);
    expect(nativeSelectElement).toBeNull();
  });
});

// TODO: Should the update event be emitted when slot changes? e.g. option with current set value is added
test.describe('Update Event', () => {
  test('should emit update event with correct details when option is selected by click', async ({ page }) => {
    await initSelect(page);
    const host = await getHost(page);
    await addEventListener(host, 'update');

    const buttonElement = await getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before option select').toBe(0);

    const option = await getSelectOption(page, 1);
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

  skipInBrowser(['webkit'], () => {
    test('should emit update event with correct details when option is selected by keyboard', async ({ page }) => {
      await initSelect(page);
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
});

test.describe('outside click', () => {
  test('should show dropdown if input is clicked and hide via outside click', async ({ page }) => {
    await initSelect(page, { options: { markupBefore: '<p-text>Some Text</p-text>' } });

    const buttonElement = await getButton(page);
    const text = await page.$('p-text');
    expect(await getDropdownDisplay(page)).toBe('none');

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page)).toBe('flex');

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after 1st text click').toBe('none');

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after 2nd button click').toBe('flex');

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after 3nd button click').toBe('none');
  });
});

test.describe('focus', () => {
  skipInBrowser(['webkit']);
  test('should focus button when label text is clicked', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', label: 'Some Label' } });

    const labelText = await getLabel(page);
    const buttonElement = await getButton(page);
    await addEventListener(buttonElement, 'focus');

    expect((await getEventSummary(buttonElement, 'focus')).counter, 'before focus').toBe(0);

    await labelText.click();
    expect((await getEventSummary(buttonElement, 'focus')).counter, 'after focus').toBe(1);
  });

  test('should focus button when tab key is pressed', async ({ page }) => {
    await initSelect(page);

    const buttonElement = await getButton(page);
    await addEventListener(buttonElement, 'focus');

    expect((await getEventSummary(buttonElement, 'focus')).counter).toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(buttonElement, 'focus')).counter).toBe(1);
  });

  test('should close dropdown on tab and focus next element', async ({ page }) => {
    await initSelect(page, { options: { markupAfter: '<p-button>Some button</p-button>' } });
    const button = await page.$('p-button');
    const comboboxEl = await getButton(page);
    await addEventListener(comboboxEl, 'focus');
    await addEventListener(button, 'focus');

    expect((await getEventSummary(comboboxEl, 'focus')).counter, 'initial focus').toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(comboboxEl, 'focus')).counter, 'combobox focus after first tab').toBe(1);
    expect(await getDropdownDisplay(page), 'dropdown display after first tab').toBe('none');

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    expect(await getDropdownDisplay(page), 'dropdown display after Space').toBe('flex');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(await getDropdownDisplay(page), 'dropdown display after second tab').toBe('none');
    expect((await getEventSummary(comboboxEl, 'focus')).counter, 'combobox focus after second tab').toBe(1);

    // TODO: Tab should directly go to the next element instead of just closing and selecting an option
    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(button, 'focus')).counter, 'button focus after second tab').toBe(1);
  });
});

// TODO: Test keyboard behavior with multiple same textContent
// TODO: Test keyboard behavior scrolldown to selected option
// The keyboard behavior is aligned with the w3c suggestion https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
test.describe('keyboard behavior', () => {
  skipInBrowser(['webkit']);
  test.describe('closed combobox', () => {
    let buttonElement;
    test.beforeEach(async ({ page }) => {
      await initSelect(page);
      buttonElement = await getButton(page);
      await addEventListener(buttonElement, 'focus');

      expect((await getEventSummary(buttonElement, 'focus')).counter, 'initial focus').toBe(0);

      await page.keyboard.press('Tab');
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after first tab').toBe(1);
      expect(await getDropdownDisplay(page), 'initial').toBe('none');
    });

    // Opens the listbox if it is not already displayed without moving focus or changing selection.
    // DOM focus remains on the combobox.
    test('should open the listbox when pressing ArrowDown', async ({ page }) => {
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex(page)).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after ArrowDown').toBe(1);
    });
    // Opens the listbox if it is not already displayed without moving focus or changing selection.
    // DOM focus remains on the combobox.
    test('should open the listbox and highlight first option when pressing ArrowUp', async ({ page }) => {
      await buttonElement.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex(page)).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after ArrowUp').toBe(1);
    });
    // Opens the listbox without moving focus or changing selection.
    test('should open the listbox when pressing Enter', async ({ page }) => {
      await buttonElement.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex(page)).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after Enter').toBe(1);
    });
    // Opens the listbox without moving focus or changing selection.
    test('should open the listbox when pressing Space', async ({ page }) => {
      await buttonElement.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex(page)).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after Space').toBe(1);

      await buttonElement.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('none');
      expect(await getSelectValue(page)).toBeUndefined(); // No option got selected
    });
    // Opens the listbox and moves visual focus to the first option.
    test('should open the listbox and move highlight to first option when pressing Home', async ({ page }) => {
      await buttonElement.press('Home');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex(page)).toBe(0);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after Home').toBe(1);
    });
    // Opens the listbox and moves visual focus to the last option.
    test('should open the listbox when pressing End', async ({ page }) => {
      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex(page)).toBe(2);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after End').toBe(1);
    });
    // First opens the listbox if it is not already displayed and then moves visual focus to the first option that matches the typed character.
    // If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string.
    // If the same character is typed in succession, visual focus cycles among the options starting with that character.
    test('should open the listbox when pressing a printable character', async ({ page }) => {
      await buttonElement.press('B');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex(page)).toBe(1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing "B"').toBe(1);
    });
  });

  test.describe('within listbox', () => {
    let buttonElement;
    let buttonAfter;
    test.beforeEach(async ({ page }) => {
      await initSelect(page, { options: { values: testValues, markupAfter: '<p-button>Button</p-button>' } });
      buttonAfter = await page.$('p-button');
      await addEventListener(buttonAfter, 'focus');
      buttonElement = await getButton(page);
      await addEventListener(buttonElement, 'focus');

      expect((await getEventSummary(buttonElement, 'focus')).counter, 'initial focus').toBe(0);

      await page.keyboard.press('Tab');
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after first tab').toBe(1);
      expect(await getDropdownDisplay(page), 'initial').toBe('none');
      await buttonElement.press('ArrowDown'); // Open dropdown
      await waitForStencilLifecycle(page);
    });

    // Sets the value to the content of the focused option in the listbox.
    // Closes the listbox.
    // Sets visual focus on the combobox.
    test('should select the option and close the dropdown when pressing Enter on option', async ({ page }) => {
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex(page)).toBe(0);

      await buttonElement.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getSelectValue(page)).toBe(testValues[0]);
      expect(await getSelectedOptionIndex(page)).toBe(0);
      expect(await getDropdownDisplay(page), 'initial').toBe('none');
      expect(await getHighlightedOptionIndex(page)).toBe(0); // Highlighted options stays highlighted even after closing of the dropdown
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Enter').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-SELECT');
      expect(await getActiveElementTagNameInShadowRoot(await getHost(page))).toBe('BUTTON');
    });
    // Sets the value to the content of the focused option in the listbox.
    // Closes the listbox.
    // Sets visual focus on the combobox.
    test('should select the option and close the dropdown when pressing Space on option', async ({ page }) => {
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex(page)).toBe(0);

      await buttonElement.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getSelectValue(page)).toBe(testValues[0]);
      expect(await getSelectedOptionIndex(page)).toBe(0);
      expect(await getDropdownDisplay(page), 'initial').toBe('none');
      expect(await getHighlightedOptionIndex(page)).toBe(0); // Highlighted options stays highlighted even after closing of the dropdown
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Space').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-SELECT');
      expect(await getActiveElementTagNameInShadowRoot(await getHost(page))).toBe('BUTTON');
    });
    // Sets the value to the content of the focused option in the listbox.
    // Closes the listbox.
    // Performs the default action, moving focus to the next focusable element. Note: the native <select> element closes the listbox but does not move focus on tab. This pattern matches the behavior of the other comboboxes rather than the native element in this case.
    test('should select the option, close the dropdown and focus next element when pressing Tab on option', async ({
      page,
    }) => {
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex(page)).toBe(0);
      expect((await getEventSummary(buttonAfter, 'focus')).counter, 'before pressing Tab').toBe(0);

      await buttonElement.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getSelectValue(page)).toBe(testValues[0]);
      expect(await getSelectedOptionIndex(page)).toBe(0);
      expect(await getDropdownDisplay(page), 'initial').toBe('none');
      expect(await getHighlightedOptionIndex(page)).toBe(0); // Highlighted options stays highlighted even after closing of the dropdown
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Tab').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-SELECT');

      // TODO: Tab should directly go to the next element instead of just closing and selecting an option
      await buttonElement.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getActiveElementTagName(page)).toBe('P-BUTTON');
      expect((await getEventSummary(buttonAfter, 'focus')).counter, 'after pressing Tab').toBe(1);
    });
    // Closes the listbox.
    // Sets visual focus on the combobox.
    test('should close the dropdown when pressing Escape', async ({ page }) => {
      expect(await getDropdownDisplay(page), 'initial').toBe('flex');

      await buttonElement.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(page), 'initial').toBe('none');
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Tab').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-SELECT');
      expect(await getActiveElementTagNameInShadowRoot(await getHost(page))).toBe('BUTTON');
    });
    // Moves visual focus to the next option.
    // If visual focus is on the last option, visual focus does not move.
    test('should move highlight to the next option when pressing Down Arrow', async ({ page }) => {
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(0);

      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(1);

      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(testValues.length - 1);

      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(testValues.length - 1);
    });
    // Moves visual focus to the previous option.
    // If visual focus is on the first option, visual focus does not move.
    test('should move highlight to the next option when pressing ArrowUp', async ({ page }) => {
      await buttonElement.press('ArrowDown');
      await buttonElement.press('ArrowDown');
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(2);

      await buttonElement.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(1);

      await buttonElement.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(0);

      await buttonElement.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(0);
    });
    // Moves visual focus to the first option.
    test('should move highlight to the first option when pressing Home', async ({ page }) => {
      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(testValues.length - 1);

      await buttonElement.press('Home');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(0);
    });
    // Moves visual focus to the last option.
    test('should move highlight to the last option when pressing End', async ({ page }) => {
      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(testValues.length - 1);

      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(testValues.length - 1);
    });
    // Jumps visual focus up 10 options (or to first option).
    test('should move highlight up 10 options (or to first option) when pressing PageUp', async ({ page }) => {
      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(testValues.length - 1);

      await buttonElement.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(testValues.length - 11);
    });
    // Jumps visual focus down 10 options (or to last option).
    test('should move highlight down 10 options (or to last option) when pressing PageDown', async ({ page }) => {
      await buttonElement.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(9);

      await buttonElement.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(19);

      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(testValues.length - 1);

      await buttonElement.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(testValues.length - 11);

      await buttonElement.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex(page)).toBe(testValues.length - 1);
    });
    // First opens the listbox if it is not already displayed and then moves visual focus to the first option that matches the typed character.
    // If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string.
    // If the same character is typed in succession, visual focus cycles among the options starting with that character.
    test('should move highlight correctly when pressing printable characters', async ({ page }) => {
      await buttonElement.press('B');
      await buttonElement.press('e');
      await buttonElement.press('n');
      await waitForStencilLifecycle(page);

      const valueIndex = testValues.indexOf(testValues.find((val) => val.startsWith('Ben')));

      expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe(testValues[valueIndex]);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for searchString timeout
      await buttonElement.press('B');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe(testValues[valueIndex + 1]);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for searchString timeout
      await buttonElement.press('B');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe(testValues[valueIndex + 2]);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for searchString timeout
      await buttonElement.press('D');
      await buttonElement.press('e');
      await buttonElement.press('n');

      expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe(
        testValues.find((val) => val.startsWith('Den'))
      );

      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for searchString timeout
      await buttonElement.press('A');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe(testValues[0]);
    });
  });
  test('should skip disabled option when pressing ArrowUp/ArrowDown', async ({ page }) => {
    await initSelect(page, { options: { disabledIndices: [0, 1, 3, 5], values: ['a', 'b', 'c', 'd', 'e', 'f'] } });
    const buttonElement = await getButton(page);

    expect(await getProperty(await getSelectOption(page, 2), 'disabled'), 'disabled option').toBe(true);

    await buttonElement.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page)).toBe(-1);

    await buttonElement.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page)).toBe(2);

    await buttonElement.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page)).toBe(4);

    await buttonElement.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page)).toBe(4);

    await buttonElement.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page)).toBe(2);

    await buttonElement.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page)).toBe(2);
  });
});

test.describe('selection', () => {
  test('should add valid selection on Enter', async ({ page }) => {
    await initSelect(page);

    const buttonElement = await getButton(page);

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('b');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('b');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe(
      '<option value="b" selected=""></option>'
    );
    expect(await getSelectValue(page), 'after first option selected').toBe('b');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('b');
    expect(await getButtonText(page)).toBe('b');

    await page.keyboard.press('Space'); // Open dropdown again
    await waitForStencilLifecycle(page);
    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('b');

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('c');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('c');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe(
      '<option value="c" selected=""></option>'
    );
    expect(await getSelectValue(page), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('c');
    expect(await getButtonText(page)).toBe('c');
  });

  test('should add valid selection on Space', async ({ page }) => {
    await initSelect(page);

    const buttonElement = await getButton(page);

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('b');

    await buttonElement.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('b');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe(
      '<option value="b" selected=""></option>'
    );
    expect(await getSelectValue(page), 'after first option selected').toBe('b');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('b');
    expect(await getButtonText(page)).toBe('b');

    await page.keyboard.press('Space'); // Open dropdown again
    await waitForStencilLifecycle(page);
    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('b');

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('c');

    await buttonElement.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('c');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe(
      '<option value="c" selected=""></option>'
    );
    expect(await getSelectValue(page), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('c');
    expect(await getButtonText(page)).toBe('c');
  });

  test('should add valid selection on Tab', async ({ page }) => {
    await initSelect(page);

    const buttonElement = await getButton(page);

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('b');

    await buttonElement.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('b');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe(
      '<option value="b" selected=""></option>'
    );
    expect(await getSelectValue(page), 'after first option selected').toBe('b');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('b');
    expect(await getButtonText(page)).toBe('b');

    await page.keyboard.press('Space'); // Open dropdown again
    await waitForStencilLifecycle(page);
    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('b');

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('c');

    await buttonElement.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('c');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe(
      '<option value="c" selected=""></option>'
    );
    expect(await getSelectValue(page), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('c');
    expect(await getButtonText(page)).toBe('c');
  });

  test('should reset selection on enter empty selection', async ({ page }) => {
    await initSelect(page, { options: { values: ['', 'a', 'b', 'c'] } });

    const buttonElement = await getButton(page);

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('b');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('b');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe(
      '<option value="b" selected=""></option>'
    );
    expect(await getSelectValue(page), 'after first option selected').toBe('b');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('b');
    expect(await getButtonText(page)).toBe('b');

    await page.keyboard.press('Space'); // Open dropdown again
    await page.keyboard.press('PageUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe('');
    expect(await getSelectValue(page), 'after first option selected').toBeUndefined();
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toBeUndefined();
    expect(await getButtonText(page)).toBe('');
  });

  test('should add valid selection on Click', async ({ page }) => {
    await initSelect(page);
    const buttonElement = await getButton(page);

    await buttonElement.click(); // Open dropdown
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page)).toBe(-1); // No option highlighted

    const option = await getSelectOption(page, 1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('a');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe(
      '<option value="a" selected=""></option>'
    );
    expect(await getSelectValue(page), 'after first option selected').toBe('a');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('a');
    expect(await getButtonText(page)).toBe('a');

    await buttonElement.click(); // Open dropdown again
    await waitForStencilLifecycle(page);

    // TODO: Do we want to set highlight on the option when selecting with click
    expect(await getHighlightedOptionIndex(page)).toBe(-1); // No option highlighted

    const option2 = await getSelectOption(page, 3);
    await option2.click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('c');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe(
      '<option value="c" selected=""></option>'
    );
    expect(await getSelectValue(page), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('c');
    expect(await getButtonText(page)).toBe('c');
  });

  test('should not select disabled option on Click', async ({ page }) => {
    await initSelect(page, { options: { disabledIndices: [0] } });
    const buttonElement = await getButton(page);

    await buttonElement.click(); // Open dropdown
    await waitForStencilLifecycle(page);

    const option = await getSelectOption(page, 1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after first option selected').toBe('');
    expect(await getNativeSelectInnerHTML(page), 'after first option selected').toBe('');
    expect(await getSelectValue(page), 'after first option selected').toBeUndefined();
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toBeUndefined();
    expect(await getButtonText(page)).toBe('');
  });

  test('should select empty option when setting value to undefined', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', value: 'a' }, options: { values: ['', 'a', 'b', 'c'] } });

    expect(await getSelectedOptionIndex(page)).toBe(1);
    expect(await getNativeSelectValue(page), 'initial').toBe('a');
    expect(await getNativeSelectInnerHTML(page), 'initial').toBe('<option value="a" selected=""></option>');
    expect(await getSelectValue(page), 'initial').toBe('a');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'initial').toEqual('a');
    expect(await getButtonText(page)).toBe('a');

    await setValue(page, undefined);

    expect(await getSelectedOptionIndex(page)).toBe(0);
    expect(await getNativeSelectValue(page), 'after setting value to undefined').toBe('');
    expect(await getNativeSelectInnerHTML(page), 'after setting value to undefined').toBe('');
    expect(await getSelectValue(page), 'initial').toBeUndefined();
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after setting value to undefined').toBeUndefined();
    expect(await getButtonText(page)).toBe('');
  });

  test('should reset selection when value is set to undefined and no empty option provided', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', value: 'a' } });

    expect(await getSelectedOptionIndex(page)).toBe(0);
    expect(await getNativeSelectValue(page), 'initial').toBe('a');
    expect(await getNativeSelectInnerHTML(page), 'initial').toBe('<option value="a" selected=""></option>');
    expect(await getSelectValue(page), 'initial').toBe('a');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'initial').toEqual('a');
    expect(await getButtonText(page)).toBe('a');

    await setValue(page, undefined);

    expect(await getSelectedOptionIndex(page)).toBe(-1);
    expect(await getNativeSelectValue(page), 'after setting value to undefined').toBe('');
    expect(await getNativeSelectInnerHTML(page), 'after setting value to undefined').toBe('');
    expect(await getSelectValue(page), 'initial').toBeUndefined();
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after setting value to undefined').toBeUndefined();
    expect(await getButtonText(page)).toBe('');
  });
});

test.describe('click events', () => {
  test('should open dropdown on mouseclick and close dropdown on 2nd click', async ({ page }) => {
    await initSelect(page);
    const buttonElement = await getButton(page);

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after click').toBe('flex');
    expect(await getHighlightedOptionIndex(page), 'for highlighted option').toBe(-1);

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(page), 'after second click').toBe('none');
    expect(await getHighlightedOptionIndex(page), 'for highlighted option').toBe(-1);
  });

  test.describe('disabled', () => {
    test('should have not-allowed cursor', async ({ page }) => {
      await initSelect(page, { props: { name: 'options', disabled: true } });
      expect(await getElementStyle(await getButton(page), 'cursor')).toBe('not-allowed');
    });

    skipInBrowser(['webkit'], () => {
      test('should not be able to open or interact', async ({ page }) => {
        await initSelect(page, {
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
});

test.describe('slots', () => {
  test('should update when selected option is added', async ({ page }) => {
    await initSelect(page);
    expect(await getSelectValue(page)).toBeUndefined();

    await setValue(page, 'd');
    await waitForStencilLifecycle(page);
    expect(await getSelectValue(page)).toBe('d');
    expect(await getNativeSelectValue(page), 'after setting value').toBe('');

    await addOption(page, 'd', 'd');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after option added').toBe('d');
    expect(await getNativeSelectInnerHTML(page), 'after option added').toBe('<option value="d" selected=""></option>');
    expect(await getSelectValue(page), 'after option added').toBe('d');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after option added').toEqual('d');
    expect(await getButtonText(page)).toBe('d');
  });

  test('should update when selected option is removed', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', value: 'c' } });
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'initial').toBe('c');
    expect(await getNativeSelectInnerHTML(page), 'initial').toBe('<option value="c" selected=""></option>');
    expect(await getSelectValue(page), 'initial').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'initial').toEqual('c');
    expect(await getButtonText(page)).toBe('c');

    await page.evaluate(
      (el) => {
        el.lastElementChild.remove();
      },
      await getHost(page)
    );
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(page), 'after option selected removed').toBe('');
    expect(await getNativeSelectInnerHTML(page), 'after option selected removed').toBe('');
    expect(await getSelectValue(page), 'after option selected removed').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after option selected removed').toBeUndefined();
    expect(await getButtonText(page)).toBe('');
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initSelect(page);
    const buttonElement = await getButton(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-select'], 'componentDidLoad: p-select').toBe(1);
    expect(status1.componentDidLoad['p-select-option'], 'componentDidLoad: p-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await buttonElement.click();
    await waitForStencilLifecycle(page);
    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-select'], 'componentDidUpdate: p-select').toBe(1);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips when selecting option', async ({ page }) => {
    await initSelect(page);
    const buttonElement = await getButton(page);

    await buttonElement.click();
    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-select'], 'componentDidLoad: p-select').toBe(1);
    expect(status1.componentDidLoad['p-select-option'], 'componentDidLoad: p-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

    const option1 = await getSelectOption(page, 1);
    await option1.click();
    await waitForStencilLifecycle(page);

    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-select-option'], 'componentDidUpdate: p-select-option').toBe(1);
    expect(status2.componentDidUpdate['p-select'], 'componentDidUpdate: p-select').toBe(2);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // checkmark icon
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(3);
  });

  test('should work without unnecessary round trips on selection change by click', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', value: 'a' } });
    const buttonElement = await getButton(page);

    await buttonElement.click();
    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-select'], 'componentDidLoad: p-select').toBe(1);
    expect(status1.componentDidLoad['p-select-option'], 'componentDidLoad: p-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark icon

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(6);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

    const option1 = await getSelectOption(page, 2);
    await option1.click();
    await waitForStencilLifecycle(page);

    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-select-option'], 'componentDidUpdate: p-select-option').toBe(2);
    expect(status2.componentDidUpdate['p-select'], 'componentDidUpdate: p-select').toBe(2);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(4);
  });

  skipInBrowser(['webkit'], () => {
    test('should work without unnecessary round trips on selection change by keyboard', async ({ page }) => {
      await initSelect(page, { props: { name: 'options', value: 'a' } });
      const buttonElement = await getButton(page);

      await buttonElement.press('Space'); // Open dropdown
      await waitForStencilLifecycle(page);
      const status1 = await getLifecycleStatus(page);

      expect(status1.componentDidLoad['p-select'], 'componentDidLoad: p-select').toBe(1);
      expect(status1.componentDidLoad['p-select-option'], 'componentDidLoad: p-select-option').toBe(3);
      expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark icon

      expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(6);
      expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

      await buttonElement.press('ArrowDown');
      await buttonElement.press('Enter');
      await waitForStencilLifecycle(page);

      const status2 = await getLifecycleStatus(page);
      expect(status2.componentDidUpdate['p-select-option'], 'componentDidUpdate: p-select-option').toBe(2);
      expect(status2.componentDidUpdate['p-select'], 'componentDidUpdate: p-select').toBe(3); // Keyboard actions cause update in order to update sr highlighted option text
      expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(5);
    });
  });
});
