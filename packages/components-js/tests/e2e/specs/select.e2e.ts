import { Locator, expect, test } from '@playwright/test';
import { Theme } from '@porsche-design-system/components';
import type { Components } from '@porsche-design-system/components/src/components';
import type { SelectOption } from '@porsche-design-system/components/src/components/select/select/select-utils';
import type { Page } from 'playwright';
import {
  addEventListener,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getElementStyle,
  getEventSummary,
  getFormDataValue,
  getFormDataValues,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-select');
const getFieldset = (page: Page) => page.locator('fieldset');
const getSelectValue = async (page: Page): Promise<string | number> => await getProperty(getHost(page), 'value');
const getButton = (page: Page) => page.locator('p-select button').first();
const getButtonImage = (page: Page) => page.locator('p-select button img').getAttribute('src');
const getButtonText = async (page: Page): Promise<string | number> => getProperty(getButton(page), 'textContent');
const getDropdown = (page: Page) => page.locator('p-select .listbox');
const getDropdownDisplay = async (page: Page): Promise<string> => await getElementStyle(getDropdown(page), 'display');
const getSelectOption = (page: Page, n: number) => page.locator(`p-select p-select-option:nth-child(${n})`);
const getSelectedSelectOptionProperty = async <K extends keyof SelectOption>(
  page: Page,
  property: K
): Promise<SelectOption[K]> =>
  await page
    .locator('p-select p-select-option')
    .evaluateAll(
      (options, property) =>
        ((options.find((option: SelectOption) => option.selected) as SelectOption)?.[property] as SelectOption[K]) ??
        undefined,
      property
    );

const getHighlightedSelectOptionProperty = async <K extends keyof SelectOption>(
  page: Page,
  property: K
): Promise<SelectOption[K] | undefined> =>
  await page
    .locator('p-select p-select-option')
    .evaluateAll(
      (options, property) =>
        ((options.find((option: SelectOption) => option.highlighted) as SelectOption)?.[property] as SelectOption[K]) ??
        undefined,
      property
    );

const getSelectedOptionIndex = async (page: Page): Promise<number> =>
  await page
    .locator('p-select p-select-option')
    .evaluateAll((options: SelectOption[]) => options.indexOf(options.find((option: SelectOption) => option.selected)));
const getHighlightedOptionIndex = async (page: Page): Promise<number> =>
  await page
    .locator('p-select p-select-option')
    .evaluateAll((options: SelectOption[]) =>
      options.filter((option) => !option.hidden).indexOf(options.find((option: SelectOption) => option.highlighted))
    );

const getLabel = (page: Page) => page.locator('p-select label');

const getForm = (page: Page) => page.locator('form');

const setValue = async (page: Page, value: string) => {
  const host: Locator = getHost(page);
  await host.evaluate((el, value) => {
    (el as HTMLPSelectElement).value = value;
  }, value);
};

// TODO: Test adding hidden, disabled option?
const addOption = async (page: Page, value: string, textContent?: string, image?: string) => {
  const host = getHost(page);
  await host.evaluate(
    (el, { value, textContent, image }) => {
      const option: any = document.createElement('p-select-option');
      option.value = value;
      option.textContent = textContent;
      if (image) {
        const img = document.createElement('img');
        img.src = image;
        option.appendChild(img);
      }
      el.append(option);
    },
    {
      value,
      textContent: textContent ? textContent : value,
      image,
    }
  );
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

type Option = {
  value: string;
  disabled?: boolean;
  image?: string;
};

type InitOptions = {
  props?: Components.PSelect;
  slots?: {
    label?: string;
    description?: string;
    message?: string;
  };
  options?: {
    values?: (Option | Option[])[];
    isWithinForm?: boolean;
    markupBefore?: string;
    markupAfter?: string;
    includeOptgroups?: boolean;
  };
};

const initSelect = (page: Page, opt?: InitOptions, withImage?: boolean): Promise<void> => {
  const { props = { name: 'options' }, slots, options } = opt || {};
  const {
    values = [
      { value: 'a', ...(withImage && { image: 'image-a.jpg' }) },
      { value: 'b', ...(withImage && { image: 'image-b.jpg' }) },
      { value: 'c', ...(withImage && { image: 'image-c.jpg' }) },
    ],
    isWithinForm = true,
    markupBefore = '',
    markupAfter = '',
    includeOptgroups = false,
  } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const getOption = (opt: Option) => {
    const attrs = [opt.disabled ? 'disabled' : ''].join(' ');
    return `<p-select-option ${opt.value ? `value="${opt.value}"` : ''} ${attrs}>${withImage ? `<img src="${opt.image}" alt="">` : ''}${opt.value}</p-select-option>`;
  };

  const getOptions = (options: Option | Option[]) =>
    !Array.isArray(options) ? getOption(options) : options.map((option) => getOption(option));

  const selectOptions = values
    .map((x, idx) => {
      const options = getOptions(x);
      const optionsHtml = Array.isArray(options) ? options.map((node) => node).join('') : options;
      return includeOptgroups ? `<p-optgroup label="${idx}">${optionsHtml}</p-optgroup>` : optionsHtml;
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
  const buttonElement = getButton(page);

  expect(await getDropdownDisplay(page)).toBe('none');

  await buttonElement.click();
  await waitForStencilLifecycle(page);

  expect(await getDropdownDisplay(page)).toBe('flex');
});

// TODO: Should the update event be emitted when slot changes? e.g. option with current set value is added
test.describe('Update Event', () => {
  test('should emit update event with correct details when option is selected by click', async ({ page }) => {
    await initSelect(page);
    const host = getHost(page);
    await addEventListener(host, 'update');

    const buttonElement = getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before option select').toBe(0);

    const option = getSelectOption(page, 1);
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

  skipInBrowsers(['webkit'], () => {
    test('should emit update event with correct details when option is selected by keyboard', async ({ page }) => {
      await initSelect(page);
      const host = getHost(page);
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

    const buttonElement = getButton(page);
    const text = page.locator('p-text');
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
  skipInBrowsers(['webkit']);
  test('should focus button when label text is clicked', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', label: 'Some Label' } });

    const labelText = getLabel(page);
    const buttonElement = getButton(page);
    await addEventListener(buttonElement, 'focus');

    expect((await getEventSummary(buttonElement, 'focus')).counter, 'before focus').toBe(0);

    await labelText.click();
    expect((await getEventSummary(buttonElement, 'focus')).counter, 'after focus').toBe(1);
  });

  test('should focus button when tab key is pressed', async ({ page }) => {
    await initSelect(page);

    const buttonElement = getButton(page);
    await addEventListener(buttonElement, 'focus');

    expect((await getEventSummary(buttonElement, 'focus')).counter).toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(buttonElement, 'focus')).counter).toBe(1);
  });

  test('should close dropdown on tab and focus next element', async ({ page }) => {
    await initSelect(page, { options: { markupAfter: '<p-button>Some button</p-button>' } });
    const button = page.locator('p-button');
    const comboboxEl = getButton(page);
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

  test('should receive focus when focus is set programmatically', async ({ page }) => {
    await initSelect(page);
    const host = await getHost(page);

    const buttonElement = getButton(page);
    await addEventListener(buttonElement, 'focus');

    expect((await getEventSummary(buttonElement, 'focus')).counter).toBe(0);
    await expect(buttonElement).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await host.focus();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(buttonElement, 'focus')).counter).toBe(1);
    await expect(buttonElement).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });
});

// TODO: Test keyboard behavior with multiple same textContent
// TODO: Test keyboard behavior scrolldown to selected option
// The keyboard behavior is aligned with the w3c suggestion https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
test.describe('keyboard behavior', () => {
  skipInBrowsers(['webkit']);
  test.describe('closed combobox', () => {
    let buttonElement;
    test.beforeEach(async ({ page }) => {
      await initSelect(page);
      buttonElement = getButton(page);
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
      expect(await getSelectValue(page)).toBeUndefined();
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
      await initSelect(page, {
        options: { values: testValues.map((x) => ({ value: x })), markupAfter: '<p-button>Button</p-button>' },
      });
      buttonAfter = page.locator('p-button');
      await addEventListener(buttonAfter, 'focus');
      buttonElement = getButton(page);
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
      expect(await getActiveElementTagNameInShadowRoot(getHost(page))).toBe('BUTTON');
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
      expect(await getActiveElementTagNameInShadowRoot(getHost(page))).toBe('BUTTON');
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
      expect(await getActiveElementTagNameInShadowRoot(getHost(page))).toBe('BUTTON');
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

      await sleep(500);

      // Wait for searchString timeout
      await buttonElement.press('B');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe(testValues[valueIndex + 1]);

      await sleep(500);

      // Wait for searchString timeout
      await buttonElement.press('B');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe(testValues[valueIndex + 2]);

      await sleep(500);

      // Wait for searchString timeout
      await buttonElement.press('D');
      await buttonElement.press('e');
      await buttonElement.press('n');

      expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe(
        testValues.find((val) => val.startsWith('Den'))
      );

      await sleep(500);

      // Wait for searchString timeout
      await buttonElement.press('A');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe(testValues[0]);
    });
  });
  test('should skip disabled option when pressing ArrowUp/ArrowDown', async ({ page }) => {
    await initSelect(page, {
      options: {
        values: [
          { value: 'a', disabled: true },
          { value: 'b', disabled: true },
          { value: 'c' },
          { value: 'd', disabled: true },
          { value: 'e' },
          { value: 'f', disabled: true },
        ],
      },
    });
    const buttonElement = getButton(page);

    expect(await getProperty<boolean>(getSelectOption(page, 2), 'disabled'), 'disabled option').toBe(true);

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

    const buttonElement = getButton(page);

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('b');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

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

    expect(await getSelectValue(page), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('c');
    expect(await getButtonText(page)).toBe('c');
  });

  test('should add valid selection on Space', async ({ page }) => {
    await initSelect(page);

    const buttonElement = getButton(page);

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('b');

    await buttonElement.press('Space');
    await waitForStencilLifecycle(page);

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

    expect(await getSelectValue(page), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('c');
    expect(await getButtonText(page)).toBe('c');
  });

  test('should add valid selection on Tab', async ({ page }) => {
    await initSelect(page);

    const buttonElement = getButton(page);

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('b');

    await buttonElement.press('Tab');
    await waitForStencilLifecycle(page);

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

    expect(await getSelectValue(page), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('c');
    expect(await getButtonText(page)).toBe('c');
  });

  test('should reset selection on enter empty selection', async ({ page }) => {
    await initSelect(page, { options: { values: [{ value: '' }, { value: 'a' }, { value: 'b' }, { value: 'c' }] } });

    const buttonElement = getButton(page);

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('b');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after first option selected').toBe('b');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('b');
    expect(await getButtonText(page)).toBe('b');

    await page.keyboard.press('Space'); // Open dropdown again
    await page.keyboard.press('PageUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after first option selected').toBeUndefined();
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toBeUndefined();
    expect(await getButtonText(page)).toBe('');
  });

  test('should add valid selection on Click', async ({ page }) => {
    await initSelect(page);
    const buttonElement = getButton(page);

    await buttonElement.click(); // Open dropdown
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page)).toBe(-1); // No option highlighted

    const option = getSelectOption(page, 1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after first option selected').toBe('a');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('a');
    expect(await getButtonText(page)).toBe('a');

    await buttonElement.click(); // Open dropdown again
    await waitForStencilLifecycle(page);

    // TODO: Do we want to set highlight on the option when selecting with click
    expect(await getHighlightedOptionIndex(page)).toBe(-1); // No option highlighted

    const option2 = getSelectOption(page, 3);
    await option2.click();
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('c');
    expect(await getButtonText(page)).toBe('c');
  });

  test('should add valid selection with slotted image on Click', async ({ page }) => {
    await initSelect(page, undefined, true);
    const buttonElement = getButton(page);

    await buttonElement.click(); // Open dropdown
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex(page)).toBe(-1); // No option highlighted

    const option = getSelectOption(page, 1);

    await option.click();
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after first option selected').toBe('a');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('a');
    expect(await getButtonText(page)).toBe('a');
    expect(await getButtonImage(page)).toBe('image-a.jpg');

    await buttonElement.click(); // Open dropdown again
    await waitForStencilLifecycle(page);

    // TODO: Do we want to set highlight on the option when selecting with click
    expect(await getHighlightedOptionIndex(page)).toBe(-1); // No option highlighted

    const option2 = getSelectOption(page, 3);
    await option2.click();
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toEqual('c');
    expect(await getButtonText(page)).toBe('c');
    expect(await getButtonImage(page)).toBe('image-c.jpg');
  });

  test('should not select disabled option on Click', async ({ page }) => {
    await initSelect(page, {
      options: { values: [{ value: 'a', disabled: true }, { value: 'b' }, { value: 'c' }] },
    });
    const buttonElement = getButton(page);

    await buttonElement.click(); // Open dropdown
    await waitForStencilLifecycle(page);

    const option = getSelectOption(page, 1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after first option selected').toBeUndefined();
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toBeUndefined();
    expect(await getButtonText(page)).toBe('');
  });

  test('should select empty option when setting value to undefined', async ({ page }) => {
    await initSelect(page, {
      props: { name: 'options', value: 'a' },
      options: { values: [{ value: '' }, { value: 'a' }, { value: 'b' }, { value: 'c' }] },
    });

    expect(await getSelectedOptionIndex(page)).toBe(1);
    expect(await getSelectValue(page), 'initial').toBe('a');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'initial').toEqual('a');
    await expect(getButton(page)).toHaveText('a');

    await setValue(page, undefined);

    expect(await getSelectedOptionIndex(page)).toBe(0);
    expect(await getSelectValue(page), 'initial').toBeUndefined();
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after setting value to undefined').toBeUndefined();
    await expect(getButton(page)).toHaveText('');
  });

  test('should reset selection to default when value is set to undefined and no empty option provided', async ({
    page,
  }) => {
    await initSelect(page, { props: { name: 'options', value: 'c' } });

    expect(await getSelectedOptionIndex(page)).toBe(2);
    expect(await getSelectValue(page), 'initial').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'initial').toEqual('c');
    expect(await getButtonText(page)).toBe('c');

    await setValue(page, undefined);

    expect(await getSelectedOptionIndex(page)).toBe(-1);
    expect(await getSelectValue(page), 'initial').toBeUndefined();
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after setting value to undefined').toBeUndefined();
    expect(await getButtonText(page)).toBe('');
  });

  test('should update selected when value is changed programmatically', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', value: 'c' } }, true);
    const select = getHost(page);

    expect(await getSelectValue(page)).toBe('c');
    expect(await getButtonText(page)).toBe('c');
    expect(await getButtonImage(page)).toBe('image-c.jpg');

    await setProperty(select, 'value', 'b');

    await waitForStencilLifecycle(page);
    expect(await getSelectValue(page)).toBe('b');
    expect(await getButtonText(page)).toBe('b');
    expect(await getButtonImage(page)).toBe('image-b.jpg');
  });
});

test.describe('click events', () => {
  test('should open dropdown on mouseclick and close dropdown on 2nd click', async ({ page }) => {
    await initSelect(page);
    const buttonElement = getButton(page);

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
      expect(await getElementStyle(getButton(page), 'cursor')).toBe('not-allowed');
    });

    skipInBrowsers(['webkit'], () => {
      test('should not be able to open or interact', async ({ page }) => {
        await initSelect(page, {
          props: { name: 'options', disabled: true },
          options: { markupAfter: '<p-button>Button</p-button>' },
        });
        const button = page.locator('p-button');

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
    await initSelect(page, undefined, true);
    expect(await getSelectValue(page)).toBeUndefined();

    await setValue(page, 'd');
    await waitForStencilLifecycle(page);
    expect(await getSelectValue(page)).toBe('d');

    await addOption(page, 'd', 'd', 'image-d.jpg');
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after option added').toBe('d');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after option added').toEqual('d');
    expect(await getButtonText(page)).toBe('d');
    expect(await getButtonImage(page)).toBe('image-d.jpg');
  });

  test('should update when selected option is removed', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', value: 'c' } });
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'initial').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'initial').toEqual('c');
    expect(await getButtonText(page)).toBe('c');

    const host: Locator = getHost(page);
    await host.evaluate((el) => {
      (el as HTMLPSelectElement).lastElementChild.remove();
    });

    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after option selected removed').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after option selected removed').toBeUndefined();
    expect(await getButtonText(page)).toBe('');
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initSelect(page);
    const buttonElement = getButton(page);
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
    const buttonElement = getButton(page);

    await buttonElement.click();
    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-select'], 'componentDidLoad: p-select').toBe(1);
    expect(status1.componentDidLoad['p-select-option'], 'componentDidLoad: p-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

    const option1 = getSelectOption(page, 1);
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
    const buttonElement = getButton(page);

    await buttonElement.click();
    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-select'], 'componentDidLoad: p-select').toBe(1);
    expect(status1.componentDidLoad['p-select-option'], 'componentDidLoad: p-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark icon

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(6);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

    const option1 = getSelectOption(page, 2);
    await option1.click();
    await waitForStencilLifecycle(page);

    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-select-option'], 'componentDidUpdate: p-select-option').toBe(2);
    expect(status2.componentDidUpdate['p-select'], 'componentDidUpdate: p-select').toBe(2);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(4);
  });

  skipInBrowsers(['webkit'], () => {
    test('should work without unnecessary round trips on selection change by keyboard', async ({ page }) => {
      await initSelect(page, { props: { name: 'options', value: 'a' } });
      const buttonElement = getButton(page);

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

test.describe('theme', () => {
  test('should sync theme for children', async ({ page }) => {
    await initSelect(page, { options: { includeOptgroups: true } });

    const select = getHost(page);

    const buttonElement = getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    const optgroups = await page.locator('p-optgroup').all();
    const options = await page.locator('p-select-option').all();

    for (const child of [...optgroups, ...options]) {
      expect(await getProperty<Theme>(child, 'theme')).toBe('light');
    }
    await setProperty(select, 'theme', 'dark');
    await waitForStencilLifecycle(page);

    for (const child of [...optgroups, ...options]) {
      expect(await getProperty<Theme>(child, 'theme')).toBe('dark');
    }
  });
});

test.describe('optgroups', () => {
  test('should persist disabled state for options inside optgroup', async ({ page }) => {
    const group = [{ value: 'b', disabled: true }, { value: 'c' }, { value: 'd', disabled: true }];
    await initSelect(page, {
      options: {
        includeOptgroups: true,
        values: [{ value: 'a' }, group, { value: 'e' }],
      },
    });

    const buttonElement = getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    const optgroup = page.locator('p-optgroup[label="1"]');
    expect(await getProperty<boolean>(optgroup, 'disabled')).toBeFalsy();
    const children = await optgroup.locator('p-select-option').all();

    for (const child of children) {
      const value = await getProperty<string>(child, 'value');
      const disabled = await getProperty<boolean>(child, 'disabled');
      const item = group.find((item) => item.value === value);
      expect(disabled).toEqual(!!item.disabled);

      expect(await getProperty<boolean>(child, 'disabledParent')).toBeFalsy();
    }
    expect(await setProperty(optgroup, 'disabled', true));
    await waitForStencilLifecycle(page);

    expect(await getProperty<boolean>(optgroup, 'disabled')).toBeTruthy();

    for (const child of children) {
      const value = await getProperty<string>(child, 'value');
      const disabled = await getProperty<boolean>(child, 'disabled');
      const item = group.find((item) => item.value === value);
      expect(disabled).toEqual(!!item.disabled);
      expect(await getProperty<boolean>(child, 'disabledParent')).toBeTruthy();
    }

    expect(await setProperty(optgroup, 'disabled', false));
    await waitForStencilLifecycle(page);

    for (const child of children) {
      const value = await getProperty<string>(child, 'value');
      const disabled = await getProperty<boolean>(child, 'disabled');
      const item = group.find((item) => item.value === value);
      expect(disabled).toEqual(!!item.disabled);
      expect(await getProperty<boolean>(child, 'disabledParent')).toBeFalsy();
    }
  });

  test('should disable all options inside disabled optgroup', async ({ page }) => {
    await initSelect(page, { options: { includeOptgroups: true } });

    const buttonElement = getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    const optgroup = page.locator('p-optgroup[label="1"]');
    expect(await getProperty<boolean>(optgroup, 'disabled')).toBeFalsy();
    const children = await optgroup.locator('p-select-option').all();

    for (const child of children) {
      expect(await getProperty<boolean>(child, 'disabled')).toBeFalsy();
    }
    expect(await setProperty(optgroup, 'disabled', true));
    await waitForStencilLifecycle(page);

    expect(await getProperty<boolean>(optgroup, 'disabled')).toBeTruthy();

    for (const child of children) {
      expect(await getProperty<boolean>(child, 'disabled')).toBeFalsy();
      expect(await getProperty<boolean>(child, 'disabledParent')).toBeTruthy();
    }
  });

  test('should hide all options inside hidden optgroup', async ({ page }) => {
    await initSelect(page, { options: { includeOptgroups: true } });

    const buttonElement = getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    const optgroup = page.locator('p-optgroup[label="1"]');
    await expect(optgroup).toBeVisible();
    const children = await optgroup.locator('p-select-option').all();

    for (const child of children) {
      await expect(child).toBeVisible();
    }
    expect(await setProperty(optgroup, 'hidden', true));
    await waitForStencilLifecycle(page);

    await expect(optgroup).not.toBeVisible();

    for (const child of children) {
      await expect(child).not.toBeVisible();
    }
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit if updated programmatically', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    await initSelect(page, {
      props: { name, value },
      options: { isWithinForm: true, markupAfter: '<button type="submit">Submit</button>' },
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should include name & value in FormData submit if updated using keyboard', async ({ page }) => {
    const name = 'options';
    const value = ['a'];
    await initSelect(page, {
      props: { name },
      options: {
        isWithinForm: true,
        markupBefore: '<p-text>Some Text</p-text>',
        markupAfter: '<button type="submit">Submit</button>',
      },
    });
    const form = getForm(page);
    const text = page.locator('p-text');
    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await text.click();
    await waitForStencilLifecycle(page);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValues(form, name)).toStrictEqual(value);
  });

  test('should include name & value in FormData submit if updated using mouse', async ({ page }) => {
    const name = 'options';
    const value = ['b'];
    await initSelect(page, {
      props: { name },
      options: {
        isWithinForm: true,
        markupBefore: '<p-text>Some Text</p-text>',
        markupAfter: '<button type="submit">Submit</button>',
      },
    });
    const buttonElement = getButton(page);
    const form = getForm(page);
    const text = page.locator('p-text');
    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    const dropdownOption = getSelectOption(page, 2);
    await dropdownOption.click();
    await text.click();
    await waitForStencilLifecycle(page);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValues(form, name)).toStrictEqual(value);
  });

  test('should include name & value in FormData submit if outside of form', async ({ page }) => {
    const name = 'name';
    const value = 'a';
    const formId = 'myForm';
    await initSelect(page, {
      props: { name, value, form: formId },
      options: {
        isWithinForm: false,
        markupBefore: `<form id="myForm" onsubmit="return false;"><button type="submit">Submit</button></form>`,
      },
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should reset select value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = 'b';
    const newValue = 'c';
    const host = getHost(page);
    const select = getHost(page);
    await initSelect(page, {
      props: { name, value },
      options: {
        isWithinForm: true,
        markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
      },
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await setProperty(select, 'value', newValue);

    await expect(host).toHaveJSProperty('value', newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable select if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    const host = getHost(page);
    await initSelect(page, {
      props: { name, value },
      options: {
        isWithinForm: true,
        markupBefore: `<fieldset disabled>`,
        markupAfter: `</fieldset>`,
      },
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initSelect(page, {
      options: {
        isWithinForm: true,
        markupBefore: `<fieldset disabled>`,
        markupAfter: `</fieldset>`,
      },
    });
    const host = getHost(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
  });
});
