import { expect, Locator, test } from '@playwright/test';
import { Theme } from '@porsche-design-system/components';
import type { Components } from '@porsche-design-system/components/src/components';
import type { SelectOption } from '@porsche-design-system/components/src/components/select/select/select-utils';
import type { Page } from 'playwright';
import {
  addEventListener,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getConsoleErrorsAmount,
  getElementStyle,
  getEventSummary,
  getFormDataValue,
  getFormDataValues,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  initConsoleObserver,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-select');
const getFieldset = (page: Page) => page.locator('fieldset');
const getSelectValue = async (page: Page): Promise<string | number> => await getProperty(getHost(page), 'value');
const getButton = (page: Page) => page.locator('p-select button[role="combobox"]');
const getButtonImage = (page: Page) => page.locator('p-select button img').first().getAttribute('src');
const getButtonImage2 = (page: Page) => page.locator('p-select button img').first();
const getDropdown = (page: Page) => page.locator('p-select [popover]');
const getDropdownDisplay = async (page: Page): Promise<string> => await getElementStyle(getDropdown(page), 'display');
const getFilter = (page: Page) => page.locator('p-select p-input-search');
const getFilterInput = (page: Page) => page.locator('p-select p-input-search input');
const getSelectOption = (page: Page, n: number) => page.locator(`p-select p-select-option:nth-child(${n})`);
const getSelectOptions = (page: Page) => page.locator('p-select p-select-option');
const getSelectOptgroups = (page: Page) => page.locator('p-select p-optgroup');
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

const removeOption = async (page: Page, value: string) => {
  const host = getHost(page);
  await host.evaluate((el, value) => {
    const optionToRemove = Array.from(el.children).find(
      (child) =>
        child.tagName.toLowerCase() === 'p-select-option' && (child as HTMLPSelectOptionElement).value === value
    );
    if (optionToRemove) {
      el.removeChild(optionToRemove);
    }
  }, value);
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
  hidden?: boolean;
  image?: string;
};

type InitOptions = {
  props?: Components.PSelect;
  slots?: {
    filter?: string;
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
  const { label = '', description = '', message = '', filter = '' } = slots || {};

  const getOption = (opt: Option) => {
    const attrs = [opt.disabled ? 'disabled' : '', opt.hidden ? 'hidden' : ''].join(' ');
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
        ${filter}
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

test.describe('Blur Event', () => {
  test('should emit blur event when button loses focus by outside click', async ({ page }) => {
    await initSelect(page);
    const host = getHost(page);
    const dropdown = getDropdown(page);
    await addEventListener(host, 'blur');

    const buttonElement = getButton(page);
    await buttonElement.click();
    await expect(dropdown).toBeVisible();

    expect((await getEventSummary(host, 'blur')).counter, 'before outside click').toBe(0);

    await page.mouse.click(0, 0);

    expect((await getEventSummary(host, 'blur')).counter, 'after outside click').toBe(1);
  });

  test('should emit blur event when button loses focus by keyboard', async ({ page }) => {
    await initSelect(page, { options: { markupAfter: '<button id="test-button">Some button</button>' } });
    const host = getHost(page);
    const button = getButton(page);
    const dropdown = getDropdown(page);
    const buttonAfter = page.locator('#test-button');
    await addEventListener(host, 'blur');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await expect(dropdown).toBeVisible();

    expect((await getEventSummary(host, 'blur')).counter, 'before focus next element by keyboard').toBe(0);

    await page.keyboard.press('Tab');
    await expect(dropdown).toBeHidden();
    await expect(button).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(buttonAfter).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after focus next element by keyboard').toBe(1);
  });

  test('should not emit blur event when filter input loses focus', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', filter: true } });
    const host = getHost(page);
    const dropdown = getDropdown(page);
    const filterInput = getFilterInput(page);
    await addEventListener(host, 'blur');

    const buttonElement = getButton(page);
    await buttonElement.click();
    await expect(dropdown).toBeVisible();
    await expect(filterInput).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'before outside click').toBe(0);

    await filterInput.fill('no options found');
    const noResults = page.getByRole('option', { name: 'No results found' });
    await expect(noResults).toBeVisible();
    await noResults.click();
    await expect(filterInput).not.toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after outside click').toBe(0);
  });
});

// TODO: Should the change event be emitted when slot changes? e.g. option with current set value is added
test.describe('Change Event', () => {
  test('should emit change event with correct details when option is selected by click', async ({ page }) => {
    await initSelect(page);
    const host = getHost(page);
    await addEventListener(host, 'change');

    const buttonElement = getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'before option select').toBe(0);

    const option = getSelectOption(page, 1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after option select').toBe(1);
    expect((await getEventSummary(host, 'change')).details, 'after option select').toEqual([
      {
        value: 'a',
        name: 'options',
      },
    ]);
    expect((await getEventSummary(host, 'change')).targets, 'after option select').toEqual([
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
    test('should emit change event with correct details when option is selected by keyboard', async ({ page }) => {
      await initSelect(page);
      const host = getHost(page);
      await addEventListener(host, 'change');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter, 'before option select').toBe(0);

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter, 'after option select').toBe(1);
      expect((await getEventSummary(host, 'change')).details, 'after option select').toEqual([
        {
          value: 'a',
          name: 'options',
        },
      ]);
      expect((await getEventSummary(host, 'change')).targets, 'after option select').toEqual([
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

  test('should not emit change event when filter input is changed', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', filter: true } });
    const host = getHost(page);
    const dropdown = getDropdown(page);
    const filterInput = getFilterInput(page);
    await addEventListener(host, 'change');

    const buttonElement = getButton(page);
    await buttonElement.click();
    await expect(dropdown).toBeVisible();
    await expect(filterInput).toBeFocused();

    expect((await getEventSummary(host, 'change')).counter, 'before input change').toBe(0);

    await filterInput.fill('no options found');
    const noResults = page.getByRole('option', { name: 'No results found' });
    await expect(noResults).toBeVisible();
    await noResults.click();
    await expect(filterInput).not.toBeFocused();

    expect((await getEventSummary(host, 'change')).counter, 'after outside click').toBe(0);
  });
});

test.describe('Toggle Event', () => {
  test('should emit toggle event with correct details when select is toggled by click', async ({ page }) => {
    await initSelect(page, { options: { markupBefore: '<button id="outside">Some element outside</button>' } });
    const host = getHost(page);
    const dropdown = getDropdown(page);
    const outsideElement = page.locator('#outside');
    await addEventListener(host, 'toggle');

    expect((await getEventSummary(host, 'toggle')).counter, 'before opening').toBe(0);

    const buttonElement = getButton(page);
    await buttonElement.click();
    await expect(dropdown).toBeVisible();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'toggle')).counter, 'after opening').toBe(1);
    expect((await getEventSummary(host, 'toggle')).details, 'after opening').toEqual([
      {
        open: true,
      },
    ]);

    await outsideElement.click();
    await expect(dropdown).toBeHidden();
    await expect(outsideElement).toBeFocused();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'toggle')).counter, 'after closing').toBe(2);
    expect((await getEventSummary(host, 'toggle')).details, 'after closing').toEqual([
      {
        open: true,
      },
      {
        open: false,
      },
    ]);
  });

  test('should emit toggle event with correct details when select is toggled by keyboard', async ({ page }) => {
    await initSelect(page, {
      options: {
        markupBefore: '<button id="focus">set focus</button>',
      },
    });

    const markupBeforeButton = page.locator('#focus');

    // Focus by click first to make sure tabbing order is correct in safari
    await markupBeforeButton.click();

    const host = getHost(page);
    const buttonElement = getButton(page);
    const dropdown = getDropdown(page);
    await addEventListener(host, 'toggle');

    expect((await getEventSummary(host, 'toggle')).counter, 'before opening').toBe(0);

    await page.keyboard.press('Tab');
    await expect(buttonElement).toBeFocused();
    await page.keyboard.press('Space');
    await expect(dropdown).toBeVisible();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'toggle')).counter, 'after opening').toBe(1);
    expect((await getEventSummary(host, 'toggle')).details, 'after opening').toEqual([
      {
        open: true,
      },
    ]);

    await page.keyboard.press('Tab');
    await expect(buttonElement).toBeFocused();
    await expect(dropdown).toBeHidden();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'toggle')).counter, 'after closing').toBe(2);
    expect((await getEventSummary(host, 'toggle')).details, 'after closing').toEqual([
      {
        open: true,
      },
      {
        open: false,
      },
    ]);
  });
});

test.describe('outside click', () => {
  test('should show dropdown if input is clicked and hide via outside click', async ({ page }) => {
    await initSelect(page, { options: { markupBefore: '<p-text>Some Text</p-text>' } });

    const dropdown = getDropdown(page);
    const buttonElement = getButton(page);
    const text = page.locator('p-text');

    await expect(dropdown).toBeHidden();

    await buttonElement.click();
    await expect(dropdown).toBeVisible();

    await text.click();
    await expect(dropdown, 'after 1st text click').toBeHidden();

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    await expect(dropdown, 'after 2nd input click').toBeVisible();

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    await expect(dropdown, 'after 3nd input click').toBeHidden();
  });
});

// Test skipped because Playwright can only evaluate RGB colors, not RGBA.
test.skip('hover', () => {
  skipInBrowsers(['firefox', 'webkit']);
  test('should change border-color when input is hovered', async ({ page }) => {
    await initSelect(page);
    await page.mouse.move(0, 300); // avoid potential hover initially

    const buttonElement = getButton(page);

    await expect(buttonElement).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await buttonElement.hover();
    await expect(buttonElement).toHaveCSS('border-color', 'rgb(1, 2, 5)');
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

    await expect(buttonElement).not.toBeFocused();
    // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
    // await expect(buttonElement).toHaveCSS('outline-color', 'rgb(1, 2, 5)');

    await host.focus();
    await waitForStencilLifecycle(page);

    await expect(buttonElement).toBeFocused();
    // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
    // await expect(buttonElement).toHaveCSS('outline-color', 'rgb(26, 68, 234)');
  });
  test('should focus filter input after opening when filter is enabled', async ({ page }) => {
    await initSelect(page, { props: { name: 'Some name', filter: true } });
    const filter = getFilter(page);

    await expect(filter).toBeHidden();
    await expect(filter).not.toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await expect(filter).toBeVisible();
    await expect(filter).toBeFocused();
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
      expect(await getHighlightedOptionIndex(page)).toBe(-1); // Highlighted option is reset after closing of the dropdown
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
      expect(await getHighlightedOptionIndex(page)).toBe(-1); // Highlighted option is reset after closing of the dropdown
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
      expect(await getHighlightedOptionIndex(page)).toBe(-1); // Highlighted option is reset after closing of the dropdown
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

    test('should reset highlight on close when no option is selected', async ({ page }) => {
      await initSelect(page);
      const options = getSelectOptions(page);
      const dropdown = getDropdown(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await expect(dropdown).toBeVisible();
      await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

      await page.keyboard.press('ArrowDown');
      await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

      await page.keyboard.press('Escape');
      await expect(dropdown).toBeHidden();
      await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

      await page.keyboard.press('Space');
      await expect(dropdown).toBeVisible();
      await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);
    });

    test('should reset highlight on close and set highlight to last selected option on open', async ({ page }) => {
      await initSelect(page, { props: { name: 'selected', value: 'b' } });
      const host = getHost(page);
      const options = getSelectOptions(page);
      const dropdown = getDropdown(page);

      await expect(host).toHaveJSProperty('value', 'b');
      await expect(dropdown).toBeHidden();
      await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await expect(dropdown).toBeVisible();
      await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', true); // Restored highlight to last selected option
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

      await page.keyboard.press('ArrowDown');
      await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(2)).toHaveJSProperty('highlighted', true);

      await page.keyboard.press('Escape');
      await expect(dropdown).toBeHidden();
      await page.keyboard.press('Space');
      await expect(dropdown).toBeVisible();

      await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', true); // Restored highlight to last selected option
      await expect(options.nth(2)).toHaveJSProperty('highlighted', false);
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
    await expect(getButton(page)).toHaveText('b');

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
    await expect(getButton(page)).toHaveText('c');
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
    await expect(getButton(page)).toHaveText('b');

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
    await expect(getButton(page)).toHaveText('c');
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
    await expect(getButton(page)).toHaveText('b');

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
    await expect(getButton(page)).toHaveText('c');
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
    await expect(getButton(page)).toHaveText('b');

    await page.keyboard.press('Space'); // Open dropdown again
    await page.keyboard.press('PageUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty(page, 'textContent')).toBe('');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after first option selected').toBeUndefined();
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toBeUndefined();
    await expect(getButton(page)).toHaveText('');
  });

  test('should add valid selection on click', async ({ page }) => {
    await initSelect(page);
    const host = getHost(page);
    const buttonElement = getButton(page);
    const options = getSelectOptions(page);

    await buttonElement.click();

    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await options.nth(0).click();

    await expect(host).toHaveJSProperty('value', 'a');
    await expect(options.nth(0)).toHaveJSProperty('highlighted', false); // Highlight is reset after dropdown is closed
    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);
    await expect(buttonElement.locator('span').first()).toHaveText('a');

    await buttonElement.click(); // Open dropdown again
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true); // Highlight is restored to the selected option
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await options.nth(2).click();

    await expect(host).toHaveJSProperty('value', 'c');
    await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
    await expect(options.nth(0)).toHaveJSProperty('selected', false);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', false); // Highlight is reset after dropdown is closed
    await expect(options.nth(2)).toHaveJSProperty('selected', true);
    await expect(buttonElement.locator('span').first()).toHaveText('c');
  });

  test('should add valid selection with slotted image on Click', async ({ page }) => {
    await initSelect(page, undefined, true);
    const host = getHost(page);
    const buttonElement = getButton(page);
    const options = getSelectOptions(page);

    await buttonElement.click(); // Open dropdown

    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await options.nth(0).click();

    await expect(host).toHaveJSProperty('value', 'a');
    await expect(options.nth(0)).toHaveJSProperty('highlighted', false); // Highlight is reset after dropdown is closed
    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);
    await expect(buttonElement.locator('span').first()).toHaveText('a');
    await expect(getButtonImage2(page)).toHaveAttribute('src', 'http://localhost:8575/image-a.jpg');

    await buttonElement.click(); // Open dropdown again
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true); // Highlight is restored to the selected option
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await options.nth(2).click();

    await expect(host).toHaveJSProperty('value', 'c');
    await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
    await expect(options.nth(0)).toHaveJSProperty('selected', false);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', false); // Highlight is reset after dropdown is closed
    await expect(options.nth(2)).toHaveJSProperty('selected', true);
    await expect(buttonElement.locator('span').first()).toHaveText('c');
    await expect(getButtonImage2(page)).toHaveAttribute('src', 'http://localhost:8575/image-c.jpg');
  });

  test('should not select disabled option on Click', async ({ page }) => {
    await initSelect(page, {
      options: { values: [{ value: 'a', disabled: true }, { value: 'b' }, { value: 'c' }] },
    });
    const buttonElement = getButton(page);

    await buttonElement.click(); // Open dropdown
    await waitForStencilLifecycle(page);

    const option = getSelectOption(page, 1);
    await option.click({ force: true });
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after first option selected').toBeUndefined();
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after first option selected').toBeUndefined();
    await expect(getButton(page)).toHaveText('');
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
    await expect(getButton(page)).toHaveText('c');

    await setValue(page, undefined);

    expect(await getSelectedOptionIndex(page)).toBe(-1);
    expect(await getSelectValue(page), 'initial').toBeUndefined();
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after setting value to undefined').toBeUndefined();
    await expect(getButton(page)).toHaveText('');
  });

  test('should update selected when value is changed programmatically', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', value: 'c' } }, true);
    const select = getHost(page);

    expect(await getSelectValue(page)).toBe('c');
    await expect(getButton(page)).toHaveText('c');
    expect(await getButtonImage(page)).toBe('http://localhost:8575/image-c.jpg');

    await setProperty(select, 'value', 'b');

    await waitForStencilLifecycle(page);
    expect(await getSelectValue(page)).toBe('b');
    await expect(getButton(page)).toHaveText('b');
    expect(await getButtonImage(page)).toBe('http://localhost:8575/image-b.jpg');
  });
});

test.describe('click handling', () => {
  test('should reset highlight on close when no option is selected', async ({ page }) => {
    await initSelect(page);
    const options = getSelectOptions(page);
    const dropdown = getDropdown(page);
    const buttonElement = getButton(page);

    await buttonElement.click();
    await expect(dropdown).toBeVisible();
    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await options.nth(0).hover();
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await buttonElement.click();
    await expect(dropdown).toBeHidden();
    await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await buttonElement.click();
    await expect(dropdown).toBeVisible();
    await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);
  });

  test('should reset highlight on close and set highlight to last selected option on open', async ({ page }) => {
    await initSelect(page, { props: { name: 'selected', value: 'b' } });
    const host = getHost(page);
    const options = getSelectOptions(page);
    const dropdown = getDropdown(page);
    const buttonElement = getButton(page);

    await expect(host).toHaveJSProperty('value', 'b');
    await expect(dropdown).toBeHidden();
    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await buttonElement.click();
    await expect(dropdown).toBeVisible();
    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', true); // Restored highlight to last selected option
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await options.nth(2).hover();
    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', false);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', true);

    await buttonElement.click();
    await expect(dropdown).toBeHidden();
    await buttonElement.click();
    await expect(dropdown).toBeVisible();

    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', true); // Restored highlight to last selected option
    await expect(options.nth(2)).toHaveJSProperty('highlighted', false);
  });
});

test.describe('filter', () => {
  test.describe('input', () => {
    test('should show matching options when typing into filter', async ({ page }) => {
      await initSelect(page, { props: { name: 'Some name', filter: true } });
      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getSelectOptions(page);
      const dropdown = getDropdown(page);

      await buttonElement.click();

      await expect(dropdown).toBeVisible();
      await expect(filterElement).toBeFocused();
      await expect(filterInputElement).toHaveValue('');

      await expect(options).toHaveCount(3);
      await expect(options.nth(0)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toBeVisible();

      await filterInputElement.fill('b');

      await expect(options.nth(0)).toBeHidden();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(1)).toHaveText('b');
      await expect(options.nth(2)).toBeHidden();

      await filterInputElement.fill('');

      await expect(options.nth(0)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toBeVisible();
    });

    test('should not show options which are initially hidden when typing into filter', async ({ page }) => {
      await initSelect(page, {
        props: { name: 'Some name', filter: true },
        options: { values: [{ value: 'a', hidden: true }, { value: 'b' }, { value: 'c' }] },
      });
      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getSelectOptions(page);
      const dropdown = getDropdown(page);

      await buttonElement.click();

      await expect(dropdown).toBeVisible();
      await expect(filterElement).toBeFocused();
      await expect(filterInputElement).toHaveValue('');

      await expect(options).toHaveCount(3);
      await expect(options.nth(0)).toBeHidden();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toBeVisible();

      await filterInputElement.fill('a');

      await expect(options.nth(0)).toBeHidden();
      await expect(options.nth(1)).toBeHidden();
      await expect(options.nth(2)).toBeHidden();

      await filterInputElement.fill('');

      await expect(options.nth(0)).toBeHidden();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toBeVisible();
    });

    test('should reset filter when pressing clear button on filter input', async ({ page }) => {
      await initSelect(page, { props: { name: 'Some name', filter: true } });
      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getSelectOptions(page);
      const dropdown = getDropdown(page);

      await buttonElement.click();

      await expect(dropdown).toBeVisible();
      await expect(filterElement).toBeFocused();
      await expect(filterInputElement).toHaveValue('');
      await filterInputElement.fill('b');

      await expect(options.nth(0)).toBeHidden();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(1)).toHaveText('b');
      await expect(options.nth(2)).toBeHidden();

      await filterElement.locator('p-button-pure').click();
      await expect(filterInputElement).toHaveValue('');

      await expect(options.nth(0)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toBeVisible();
    });

    skipInBrowsers(['webkit'], () => {
      test('should reset filter value and show all options again after filtering and selecting an option', async ({
        page,
      }) => {
        await initSelect(page, { props: { name: 'Some name', filter: true } });
        const host = getHost(page);
        const buttonElement = getButton(page);
        const filterElement = getFilter(page);
        const filterInputElement = getFilterInput(page);
        const options = getSelectOptions(page);
        const dropdown = getDropdown(page);

        await buttonElement.click();

        await expect(dropdown).toBeVisible();
        await expect(filterElement).toBeFocused();
        await expect(filterInputElement).toHaveValue('');
        await filterInputElement.fill('b');

        await expect(options.nth(0)).toBeHidden();
        await expect(options.nth(1)).toBeVisible();
        await expect(options.nth(1)).toHaveText('b');
        await expect(options.nth(2)).toBeHidden();

        await page.keyboard.press('ArrowDown');
        await expect(options.nth(1)).toHaveJSProperty('highlighted', true);
        await page.keyboard.press('Enter');

        await expect(dropdown).toBeHidden();
        await expect(host).toHaveJSProperty('value', 'b');
        await expect(buttonElement).toBeFocused();

        await page.keyboard.press('Space');
        await expect(filterElement).toBeFocused();
        await expect(filterInputElement).toHaveValue('');

        await expect(options.nth(0)).toBeVisible();
        await expect(options.nth(1)).toBeVisible();
        await expect(options.nth(2)).toBeVisible();
      });
    });

    skipInBrowsers(['webkit', 'firefox'], () => {
      test('should reset filter value and show all options again after closing and reopening again by Escape Press', async ({
        page,
      }) => {
        await initSelect(page, { props: { name: 'Some name', filter: true } });
        const host = getHost(page);
        const buttonElement = getButton(page);
        const filterElement = getFilter(page);
        const filterInputElement = getFilterInput(page);
        const options = getSelectOptions(page);
        const dropdown = getDropdown(page);

        await buttonElement.click();

        await expect(dropdown).toBeVisible();
        await expect(filterElement).toBeFocused();
        await expect(filterInputElement).toHaveValue('');
        await filterInputElement.fill('b');

        await page.keyboard.press('Escape');
        await expect(dropdown).toBeHidden();
        await expect(host).toHaveJSProperty('value', undefined);
        await expect(buttonElement).toBeFocused();

        await waitForStencilLifecycle(page);
        await buttonElement.click();
        await expect(filterElement).toBeFocused();
        await expect(filterInputElement).toHaveValue('');

        await expect(options.nth(0)).toBeVisible();
        await expect(options.nth(1)).toBeVisible();
        await expect(options.nth(2)).toBeVisible();
      });

      test('should reset filter value and show all options again after closing and reopening again by outside click', async ({
        page,
      }) => {
        await initSelect(page, {
          props: { name: 'Some name', filter: true },
          options: { markupBefore: '<p-text>Some text</p-text>' },
        });

        const text = page.locator('p-text');
        const host = getHost(page);
        const buttonElement = getButton(page);
        const filterElement = getFilter(page);
        const filterInputElement = getFilterInput(page);
        const options = getSelectOptions(page);
        const dropdown = getDropdown(page);

        await buttonElement.click();

        await expect(dropdown).toBeVisible();
        await expect(filterElement).toBeFocused();
        await expect(filterInputElement).toHaveValue('');
        await filterInputElement.fill('b');

        await expect(options.nth(0)).toBeHidden();
        await expect(options.nth(1)).toBeVisible();
        await expect(options.nth(1)).toHaveText('b');
        await expect(options.nth(2)).toBeHidden();

        await text.click();
        await expect(dropdown).toBeHidden();
        await expect(host).toHaveJSProperty('value', undefined);

        await waitForStencilLifecycle(page);
        await buttonElement.click();
        await expect(filterElement).toBeFocused();
        await expect(filterInputElement).toHaveValue('');

        await expect(options.nth(0)).toBeVisible();
        await expect(options.nth(1)).toBeVisible();
        await expect(options.nth(2)).toBeVisible();
      });
    });

    skipInBrowsers(['webkit'], () => {
      test('should show indicator when no results are found', async ({ page }) => {
        await initSelect(page, { props: { name: 'Some name', filter: true } });
        const buttonElement = getButton(page);
        const filterElement = getFilter(page);
        const filterInputElement = getFilterInput(page);
        const options = getSelectOptions(page);
        const dropdown = getDropdown(page);

        await buttonElement.click();

        await expect(dropdown).toBeVisible();
        await expect(filterElement).toBeFocused();
        await expect(filterInputElement).toHaveValue('');
        await filterInputElement.fill('no results');

        for (const option of await options.all()) {
          await expect(option).toBeHidden();
        }

        const noResults = page.getByRole('option', { name: 'No results found' });
        await expect(noResults).toBeVisible();

        await page.keyboard.press('Escape');
        await expect(dropdown).toBeHidden();
        await expect(buttonElement).toBeFocused();

        await waitForStencilLifecycle(page);
        await buttonElement.click();
        await expect(filterElement).toBeFocused();
        await expect(filterInputElement).toHaveValue('');

        await expect(noResults).toBeHidden();
        await expect(options.nth(0)).toBeVisible();
        await expect(options.nth(1)).toBeVisible();
        await expect(options.nth(2)).toBeVisible();
      });
    });
  });

  test.describe('with optgroups', () => {
    test('should only show optgroups of matching options when filtering', async ({ page }) => {
      await initSelect(page, {
        props: {
          name: 'Some name',
          filter: true,
        },
        options: {
          includeOptgroups: true,
          values: [[{ value: '1a' }], [{ value: '2a' }]],
        },
      });
      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getSelectOptions(page);
      const optgroups = getSelectOptgroups(page);
      const dropdown = getDropdown(page);

      await buttonElement.click();

      await expect(dropdown).toBeVisible();
      await expect(filterElement).toBeFocused();
      await expect(filterInputElement).toHaveValue('');

      await expect(optgroups).toHaveCount(2);
      await expect(options).toHaveCount(2);
      await expect(optgroups.nth(0)).toBeVisible();
      await expect(options.nth(0)).toBeVisible();
      await expect(optgroups.nth(1)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();

      await filterInputElement.fill('2');

      await expect(optgroups).toHaveCount(2);
      await expect(options).toHaveCount(2);
      await expect(optgroups.nth(0)).toBeHidden();
      await expect(options.nth(0)).toBeHidden();
      await expect(optgroups.nth(1)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();

      await filterInputElement.fill('a');

      await expect(optgroups).toHaveCount(2);
      await expect(options).toHaveCount(2);
      await expect(optgroups.nth(0)).toBeVisible();
      await expect(options.nth(0)).toBeVisible();
      await expect(optgroups.nth(1)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();
    });

    test('should reset filter value and show all optgroups and options again after filtering and selecting an option', async ({
      page,
    }) => {
      await initSelect(page, {
        props: {
          name: 'Some name',
          filter: true,
        },
        options: {
          includeOptgroups: true,
          values: [[{ value: '1a' }], [{ value: '2a' }]],
        },
      });
      const host = getHost(page);
      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getSelectOptions(page);
      const optgroups = getSelectOptgroups(page);
      const dropdown = getDropdown(page);

      await buttonElement.click();

      await expect(dropdown).toBeVisible();
      await expect(filterElement).toBeFocused();
      await filterInputElement.fill('2');

      await expect(optgroups).toHaveCount(2);
      await expect(options).toHaveCount(2);
      await expect(optgroups.nth(0)).toBeHidden();
      await expect(options.nth(0)).toBeHidden();
      await expect(optgroups.nth(1)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();

      await options.nth(1).click();

      await expect(dropdown).toBeHidden();
      await expect(host).toHaveJSProperty('value', '2a');
      await expect(buttonElement).toBeFocused();

      await buttonElement.click();

      await expect(optgroups).toHaveCount(2);
      await expect(options).toHaveCount(2);
      await expect(optgroups.nth(0)).toBeVisible();
      await expect(options.nth(0)).toBeVisible();
      await expect(optgroups.nth(1)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();
    });

    test('should reset filter value and show all optgroups and options again after closing and reopening again', async ({
      page,
    }) => {
      await initSelect(page, {
        props: {
          name: 'Some name',
          filter: true,
        },
        options: {
          includeOptgroups: true,
          values: [[{ value: '1a' }], [{ value: '2a' }]],
        },
      });
      const host = getHost(page);
      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getSelectOptions(page);
      const optgroups = getSelectOptgroups(page);
      const dropdown = getDropdown(page);

      await buttonElement.click();

      await expect(dropdown).toBeVisible();
      await expect(filterElement).toBeFocused();
      await filterInputElement.fill('2');

      await expect(optgroups).toHaveCount(2);
      await expect(options).toHaveCount(2);
      await expect(optgroups.nth(0)).toBeHidden();
      await expect(options.nth(0)).toBeHidden();
      await expect(optgroups.nth(1)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(dropdown).toBeHidden();
      await expect(host).toHaveJSProperty('value', undefined);
      await expect(buttonElement).toBeFocused();

      await buttonElement.click();

      await expect(optgroups).toHaveCount(2);
      await expect(options).toHaveCount(2);
      await expect(optgroups.nth(0)).toBeVisible();
      await expect(options.nth(0)).toBeVisible();
      await expect(optgroups.nth(1)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();
    });
  });

  test.describe('click', () => {
    test('should not close dropdown if input is clicked', async ({ page }) => {
      await initSelect(page, { props: { name: 'Some name', filter: true } });
      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const filterElement = getFilter(page);

      await buttonElement.click();
      await expect(dropdown).toBeVisible();

      await filterElement.click();
      await expect(dropdown).toBeVisible();
    });
  });

  test.describe('keyboard behavior', () => {
    skipInBrowsers(['webkit']); // Safari focus management does not work correctly in Playwright

    test('should focus filter input on Space key', async ({ page }) => {
      await initSelect(page, { props: { name: 'Some name', filter: true } });
      const host = getHost(page);
      const filterElement = getFilter(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(filterElement).toBeFocused();
      await expect(host).toHaveJSProperty('value', undefined);
    });

    test('should focus filter input on Enter key', async ({ page }) => {
      await initSelect(page, { props: { name: 'Some name', filter: true } });
      const host = getHost(page);
      const filterElement = getFilter(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await expect(filterElement).toBeFocused();
      await expect(host).toHaveJSProperty('value', undefined);
    });

    test('should focus filter input on ArrowDown key', async ({ page }) => {
      await initSelect(page, { props: { name: 'Some name', filter: true } });
      const host = getHost(page);
      const filterElement = getFilter(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');

      await expect(filterElement).toBeFocused();
      await expect(host).toHaveJSProperty('value', undefined);
    });

    test('should cycle through options while having filter input focused', async ({ page }) => {
      await initSelect(page, { props: { name: 'Some name', filter: true } });
      const host = getHost(page);
      const filterElement = getFilter(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(filterElement).toBeFocused();
      await filterElement.press('ArrowDown');

      await expect(page.locator('p-select p-select-option').first()).toHaveJSProperty('highlighted', true);

      await filterElement.press('Enter');

      await expect(host).toHaveJSProperty('value', 'a');
    });

    test('should reset/keep highlighted option on filter input', async ({ page }) => {
      await initSelect(page, { props: { name: 'Some name', filter: true } });
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getSelectOptions(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(filterElement).toBeFocused();

      await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined); // undefined since never was highlighted
      await expect(options.nth(0)).toBeVisible();
      await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined); // undefined since never was highlighted
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined); // undefined since never was highlighted
      await expect(options.nth(2)).toBeVisible();

      await filterElement.press('ArrowDown');

      await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
      await expect(options.nth(0)).toBeVisible();
      await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined); // undefined since never was highlighted
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined); // undefined since never was highlighted
      await expect(options.nth(2)).toBeVisible();

      await filterInputElement.fill('b');

      await expect(options.nth(0)).toHaveJSProperty('highlighted', false); // Highlight needs to be reset since the option is not visible anymore
      await expect(options.nth(0)).toBeHidden();
      await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined); // undefined since never was highlighted
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined); // undefined since never was highlighted
      await expect(options.nth(2)).toBeHidden();

      await filterElement.press('ArrowDown');

      await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(0)).toBeHidden();
      await expect(options.nth(1)).toHaveJSProperty('highlighted', true); // undefined since never was highlighted
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined); // undefined since never was highlighted
      await expect(options.nth(2)).toBeHidden();

      await filterInputElement.fill('');

      await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(1)).toHaveJSProperty('highlighted', true);
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined); // undefined since never was highlighted
      await expect(options.nth(1)).toBeVisible();

      await filterElement.press('ArrowDown');

      await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(2)).toHaveJSProperty('highlighted', true);

      await filterInputElement.fill('c');

      await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(0)).toBeHidden();
      await expect(options.nth(1)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(1)).toBeHidden();
      await expect(options.nth(2)).toHaveJSProperty('highlighted', true);
      await expect(options.nth(2)).toBeVisible();
    });

    test('should not close select when Space character is typed into filter', async ({ page }) => {
      await initSelect(page, {
        props: { name: 'Some name', filter: true },
        options: { values: [{ value: 'option a' }, { value: 'option b' }, { value: 'option c' }] },
      });
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const dropdown = getDropdown(page);
      const options = getSelectOptions(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(dropdown).toBeVisible();
      await expect(filterElement).toBeFocused();
      await filterElement.pressSequentially('option');
      await filterInputElement.press('Space');
      await filterInputElement.press('a');

      // Dropdown should stay open
      await expect(dropdown).toBeVisible();
      await filterElement.press('ArrowDown');

      await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
      await expect(options.nth(0)).toBeVisible();
      await expect(options.nth(1)).toBeHidden();
      await expect(options.nth(2)).toBeHidden();
    });
  });
});

test.describe('slotted filter', () => {
  test.describe('focus', () => {
    test('should automatically focus slotted filter on click', async ({ page }) => {
      await initSelect(page, {
        props: { name: 'Some name' },
        slots: {
          filter:
            '<p-input-search slot="filter" name="search" clear indicator compact autoComplete="off"></p-input-search>',
        },
      });

      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const slottedFilter = page.locator('p-input-search[slot="filter"]');

      await buttonElement.click();
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();
    });
    test('should automatically focus slotted filter on key press', async ({ page }) => {
      await initSelect(page, {
        props: { name: 'Some name' },
        slots: {
          filter:
            '<p-input-search slot="filter" name="search" clear indicator compact autoComplete="off"></p-input-search>',
        },
        options: { markupBefore: '<button id="focus">set focus</button>' },
      });

      const markupBeforeButton = page.locator('#focus');
      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const slottedFilter = page.locator('p-input-search[slot="filter"]');

      // Focus by click first to make sure tabbing order is correct in safari
      await markupBeforeButton.click();

      await page.keyboard.press('Tab');
      await expect(buttonElement).toBeFocused();

      await page.keyboard.press('Space');
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();

      await page.keyboard.press('Escape');
      await expect(buttonElement).toBeFocused();
    });
  });
  test.describe('input', () => {
    test('should not automatically filter options', async ({ page }) => {
      await initSelect(page, {
        props: { name: 'Some name' },
        slots: {
          filter:
            '<p-input-search slot="filter" name="search" clear indicator compact autoComplete="off"></p-input-search>',
        },
      });

      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const options = getSelectOptions(page);
      const slottedFilter = page.locator('p-input-search[slot="filter"]');

      await buttonElement.click();
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();

      for (const option of await options.all()) {
        await expect(option).toBeVisible();
      }

      await slottedFilter.locator('input').fill('b');

      for (const option of await options.all()) {
        await expect(option).toBeVisible();
      }
    });
    test('should not close select when Space character is typed into filter', async ({ page }) => {
      await initSelect(page, {
        props: { name: 'Some name' },
        slots: {
          filter:
            '<p-input-search slot="filter" name="search" clear indicator compact autoComplete="off"></p-input-search>',
        },
      });

      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const slottedFilter = page.locator('p-input-search[slot="filter"]');

      await buttonElement.click();
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();

      await page.keyboard.press('Space');
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();
    });

    test('should not automatically reset filter on close', async ({ page }) => {
      await initSelect(page, {
        props: { name: 'Some name' },
        slots: {
          filter:
            '<p-input-search slot="filter" name="search" clear indicator compact autoComplete="off"></p-input-search>',
        },
      });

      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const slottedFilter = page.locator('p-input-search[slot="filter"]');
      const slottedFilterInput = slottedFilter.locator('input');

      await buttonElement.click();
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();

      await slottedFilterInput.fill('b');
      await page.keyboard.press('Escape');
      await expect(dropdown).toBeHidden();
      await expect(buttonElement).toBeFocused();

      await buttonElement.click();
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();
      await expect(slottedFilter).toHaveJSProperty('value', 'b');
    });
  });

  test.describe('keyboard behavior', () => {
    test('should have correct keyboard handling', async ({ page }) => {
      await initSelect(page, {
        props: { name: 'Some name' },
        slots: {
          filter:
            '<p-input-search slot="filter" name="search" clear indicator compact autoComplete="off"></p-input-search>',
        },
        options: { markupBefore: '<button id="focus">set focus</button>' },
      });

      const host = getHost(page);
      const markupBeforeButton = page.locator('#focus');
      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const slottedFilter = page.locator('p-input-search[slot="filter"]');
      const options = getSelectOptions(page);

      // Focus by click first to make sure tabbing order is correct in safari
      await markupBeforeButton.click();

      await page.keyboard.press('Tab');
      await expect(buttonElement).toBeFocused();

      await page.keyboard.press('Space');
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();

      for (const option of await options.all()) {
        await expect(option).toBeVisible();
        await expect(option).toHaveJSProperty('highlighted', undefined);
      }

      await page.keyboard.press('ArrowDown');
      await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
      await page.keyboard.press('ArrowDown');
      await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', true);

      await page.keyboard.press('Enter');
      await expect(dropdown).toBeHidden();
      await expect(buttonElement).toBeFocused();
      await expect(buttonElement).toHaveText('b');
      await expect(host).toHaveJSProperty('value', 'b');

      await buttonElement.press('ArrowDown');
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();

      await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', true);
      await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

      await buttonElement.press('ArrowDown');
      await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(2)).toHaveJSProperty('highlighted', true);

      await page.keyboard.press('Escape');
      await expect(dropdown).toBeHidden();
      await expect(buttonElement).toBeFocused();
      await expect(buttonElement).toHaveText('b');
      await expect(host).toHaveJSProperty('value', 'b');
    });
  });

  test.describe('dynamic option change', () => {
    test('should show selected option when option with value is slotted', async ({ page }) => {
      await initSelect(page, {
        props: { name: 'Some name', value: 'd' },
        slots: {
          filter:
            '<p-input-search slot="filter" name="search" clear indicator compact autoComplete="off"></p-input-search>',
        },
      });

      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const options = getSelectOptions(page);
      const slottedFilter = page.locator('p-input-search[slot="filter"]');

      await buttonElement.click();
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();

      for (const option of await options.all()) {
        await expect(option).toBeVisible();
        await expect(option).toHaveJSProperty('selected', undefined);
      }

      await addOption(page, 'd', 'd');
      await expect(buttonElement).toHaveText('d');

      await expect(options.nth(3)).toHaveJSProperty('selected', true);
    });
    test('should not reset selected option when no option with selected value is slotted', async ({ page }) => {
      await initSelect(page, {
        props: { name: 'Some name', value: 'c' },
        slots: {
          filter:
            '<p-input-search slot="filter" name="search" clear indicator compact autoComplete="off"></p-input-search>',
        },
      });

      const host = getHost(page);
      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const options = getSelectOptions(page);
      const slottedFilter = page.locator('p-input-search[slot="filter"]');

      await expect(buttonElement).toHaveText('c');
      await buttonElement.click();
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();

      await expect(options).toHaveCount(3);
      await removeOption(page, 'c');
      const optionsAfterRemove = getSelectOptions(page);
      await expect(optionsAfterRemove).toHaveCount(2);

      await expect(buttonElement).toHaveText('c'); // Shown selection stays visible

      await addOption(page, 'c');
      const optionsAfterAdd = getSelectOptions(page);
      await expect(optionsAfterAdd).toHaveCount(3);
      await expect(optionsAfterAdd.nth(2)).toHaveJSProperty('selected', true);
      await expect(buttonElement).toHaveText('c');
      await expect(host).toHaveJSProperty('value', 'c');

      await optionsAfterAdd.nth(1).click();
      await expect(optionsAfterAdd.nth(1)).toHaveJSProperty('selected', true);
      await expect(optionsAfterAdd.nth(2)).toHaveJSProperty('selected', false);
      await expect(buttonElement).toHaveText('b');
      await expect(host).toHaveJSProperty('value', 'b');
    });
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

    await addOption(page, 'd', 'd', 'http://localhost:8575/image-d.jpg');
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after option added').toBe('d');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after option added').toEqual('d');
    await expect(getButton(page)).toHaveText('d');
    expect(await getButtonImage(page)).toBe('http://localhost:8575/image-d.jpg');
  });

  test('should update when selected option is removed', async ({ page }) => {
    await initSelect(page, { props: { name: 'options', value: 'c' } });
    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'initial').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'initial').toEqual('c');
    await expect(getButton(page)).toHaveText('c');

    const host: Locator = getHost(page);
    await host.evaluate((el) => {
      (el as HTMLPSelectElement).lastElementChild.remove();
    });

    await waitForStencilLifecycle(page);

    expect(await getSelectValue(page), 'after option selected removed').toBe('c');
    expect(await getSelectedSelectOptionProperty(page, 'value'), 'after option selected removed').toBeUndefined();
    await expect(getButton(page)).toHaveText('c'); // Selection is kept for controlled async filtering to work
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

    const options = getSelectOptions(page);
    // Hover should not cause additional lifecycles in option
    await options.nth(0).hover();
    await options.nth(0).click();
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

    // Use polling to fix flakiness
    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-select-option'];
        },
        {
          message: 'componentDidUpdate: p-select-option',
        }
      )
      .toBe(2);
    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-select'];
        },
        {
          message: 'componentDidUpdate: p-select',
        }
      )
      .toBe(2);
    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate.all;
        },
        {
          message: 'componentDidUpdate: all',
        }
      )
      .toBe(4);
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
      expect(status2.componentDidUpdate['p-select'], 'componentDidUpdate: p-select').toBe(2); // Keyboard actions cause update in order to update sr highlighted option text
      expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(4);
    });
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

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initSelect(page, {
      options: {
        isWithinForm: true,
      },
      props: {
        name: 'some-name',
        required: true,
        disabled: true,
      },
    });

    await waitForStencilLifecycle(page);
    expect(getConsoleErrorsAmount()).toBe(0);
  });
});
