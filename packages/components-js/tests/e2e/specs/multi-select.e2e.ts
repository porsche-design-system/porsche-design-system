import { expect, type Locator, test } from '@playwright/test';
import type { Components } from '@porsche-design-system/components/src/components';
import type { Page } from 'playwright';
import {
  addEventListener,
  getConsoleErrorsAmount,
  getElementStyle,
  getEventSummary,
  getFormDataValues,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  initConsoleObserver,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-multi-select');
const getFieldset = (page: Page) => page.locator('fieldset');
const getButton = (page: Page) => page.locator('p-multi-select button[role="combobox"]');
const getDropdown = (page: Page) => page.locator('p-multi-select [popover]');
const getDropdownDisplay = async (page: Page): Promise<string> => await getElementStyle(getDropdown(page), 'display');

const getFilter = (page: Page) => page.locator('p-multi-select p-input-search');
const getFilterInput = (page: Page) => page.locator('p-multi-select p-input-search input');

const getMultiSelectOption = (page: Page, n: number) =>
  page.locator(`p-multi-select p-multi-select-option:nth-child(${n})`);
const getMultiSelectOptions = (page: Page): Locator => page.locator('p-multi-select p-multi-select-option');
const getMultiSelectOptgroups = (page: Page) => page.locator('p-multi-select p-optgroup');
const getLabel = (page: Page) => page.locator('p-multi-select label').first();
const getResetButton = (page: Page) => getHost(page).getByText('Reset selection');
const getForm = (page: Page) => page.locator('form');

const setValue = async (page: Page, value: string[]) => {
  const host: Locator = getHost(page);
  await host.evaluate((el, value) => {
    (el as HTMLPMultiSelectElement).value = value;
  }, value);
};

const addOption = async (page: Page, value: string, textContent?: string) => {
  const host = getHost(page);
  await host.evaluate(
    (el, { value, textContent }) => {
      const option: any = document.createElement('p-multi-select-option');
      option.value = value;
      option.textContent = textContent;
      el.append(option);
    },
    {
      value,
      textContent: textContent ? textContent : value,
    }
  );
};

const removeOption = async (page: Page, value: string) => {
  const host = getHost(page);
  await host.evaluate((el, value) => {
    const optionToRemove = Array.from(el.children).find(
      (child) =>
        child.tagName.toLowerCase() === 'p-multi-select-option' && (child as HTMLPSelectOptionElement).value === value
    );
    if (optionToRemove) {
      el.removeChild(optionToRemove);
    }
  }, value);
};

type Option = {
  value: string;
  disabled?: boolean;
  hidden?: boolean;
};

type InitOptions = {
  props?: Components.PMultiSelect;
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

const initMultiSelect = (page: Page, opt?: InitOptions): Promise<void> => {
  const { props = { name: 'name' }, slots, options } = opt || {};
  const {
    values = [{ value: 'a' }, { value: 'b' }, { value: 'c' }],
    isWithinForm = true,
    markupBefore = '',
    markupAfter = '',
    includeOptgroups = false,
  } = options || {};
  const { label = '', description = '', message = '', filter = '' } = slots || {};

  const getOption = (opt: Option) => {
    const attrs = [opt.disabled ? 'disabled' : '', opt.hidden ? 'hidden' : ''].join(' ');
    return `<p-multi-select-option value="${opt.value}" ${attrs}>Option ${opt.value.toUpperCase()}</p-multi-select-option>`;
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
      <p-multi-select ${getHTMLAttributes(props)}>
        ${label}
        ${description}
        ${filter}
        ${selectOptions}
        ${message}
      </p-multi-select>
      ${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test('should render', async ({ page }) => {
  await initMultiSelect(page);
  const inputElement = getButton(page);
  expect(inputElement).not.toBeNull();

  expect(await getDropdownDisplay(page)).toBe('none');

  await inputElement.click();
  await waitForStencilLifecycle(page);

  expect(await getDropdownDisplay(page)).toBe('flex');
});

test.describe('Blur Event', () => {
  test('should emit blur event when button loses focus by outside click', async ({ page }) => {
    await initMultiSelect(page);
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
    await initMultiSelect(page, { options: { markupAfter: '<button id="test-button">Some button</button>' } });
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
    await initMultiSelect(page, { props: { name: 'options' } });
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

  test('should not emit blur event when reset button is clicked', async ({ page }) => {
    await initMultiSelect(page, { props: { name: 'options' } });
    await setValue(page, ['a', 'b']);
    await waitForStencilLifecycle(page);

    const host = getHost(page);
    await addEventListener(host, 'blur');

    expect((await getEventSummary(host, 'blur')).counter, 'before option select').toBe(0);

    const resetButton = getResetButton(page);
    await resetButton.click();

    expect((await getEventSummary(host, 'blur')).counter, 'after option select').toBe(0);
  });
});

test.describe('Change Event', () => {
  test('should emit change event with correct details when option is selected by click', async ({ page }) => {
    await initMultiSelect(page, { props: { name: 'options' } });
    const host = getHost(page);
    await addEventListener(host, 'change');

    const buttonElement = getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'before option select').toBe(0);

    const option = getMultiSelectOption(page, 1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after option select').toBe(1);
    expect((await getEventSummary(host, 'change')).details, 'after option select').toEqual([
      {
        value: ['a'],
        name: 'options',
      },
    ]);
    expect((await getEventSummary(host, 'change')).targets, 'after option select').toEqual([
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

  skipInBrowsers(['webkit'], () => {
    test('should emit change event with correct details when option is selected by keyboard', async ({ page }) => {
      await initMultiSelect(page, { props: { name: 'options' } });
      const host = getHost(page);
      const dropdown = getDropdown(page);
      await addEventListener(host, 'change');

      await page.keyboard.press('Tab');
      await expect(host).toBeFocused();
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);
      await expect(dropdown).toBeVisible();

      expect((await getEventSummary(host, 'change')).counter, 'before option select').toBe(0);

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter, 'after option select').toBe(1);
      expect((await getEventSummary(host, 'change')).details, 'after option select').toEqual([
        {
          value: ['a'],
          name: 'options',
        },
      ]);
      expect((await getEventSummary(host, 'change')).targets, 'after option select').toEqual([
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

    test('should emit change event with correct details when reset button is clicked', async ({ page }) => {
      await initMultiSelect(page, { props: { name: 'options' } });
      await setValue(page, ['a', 'b']);
      await waitForStencilLifecycle(page);

      const host = getHost(page);
      await addEventListener(host, 'change');

      expect((await getEventSummary(host, 'change')).counter, 'before option select').toBe(0);

      const resetButton = getResetButton(page);
      await resetButton.click();

      expect((await getEventSummary(host, 'change')).counter, 'after option select').toBe(1);
      expect((await getEventSummary(host, 'change')).details, 'after option select').toEqual([
        {
          value: [],
          name: 'options',
        },
      ]);
      expect((await getEventSummary(host, 'change')).targets, 'after option select').toEqual([
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

    test('should not emit change event when filter input is changed', async ({ page }) => {
      await initMultiSelect(page, { props: { name: 'options' } });
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
});

test.describe('Toggle Event', () => {
  test('should emit toggle event with correct details when select is toggled by click', async ({ page }) => {
    await initMultiSelect(page, { options: { markupBefore: '<button id="outside">Some element outside</button>' } });
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
    await initMultiSelect(page, {
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
    await initMultiSelect(page, { options: { markupBefore: '<p-text>Some Text</p-text>' } });

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
    await initMultiSelect(page);
    await page.mouse.move(0, 300); // avoid potential hover initially

    const buttonElement = getButton(page);

    await expect(buttonElement).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await buttonElement.hover();
    await expect(buttonElement).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });
});

skipInBrowsers(['firefox', 'webkit'], () => {
  test.describe('focus', () => {
    test('should focus button when label text is clicked', async ({ page }) => {
      await initMultiSelect(page, { props: { name: 'options', label: 'Some Label' } });
      const labelText = getLabel(page);
      const buttonElement = getButton(page);

      await expect(buttonElement).not.toBeFocused();
      await labelText.click();
      await expect(buttonElement).toBeFocused();
    });

    test('should focus button when tab key is pressed', async ({ page }) => {
      await initMultiSelect(page);
      const buttonElement = getButton(page);

      await expect(buttonElement).not.toBeFocused();
      await page.keyboard.press('Tab');
      await expect(buttonElement).toBeFocused();
    });

    test('should focus correct elements when selection is made', async ({ page }) => {
      await initMultiSelect(page, { options: { markupAfter: '<p-button>Some button</p-button>' } });
      const buttonAfter = page.locator('p-button');

      await expect(getResetButton(page)).toHaveCount(0);
      await setValue(page, ['a']);

      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const resetButton = getResetButton(page);
      const dropdown = getDropdown(page);
      await expect(resetButton).toHaveCount(1);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);
      await expect(buttonElement).toBeFocused();
      await expect(dropdown).toBeHidden();

      await page.keyboard.press('Space');
      await expect(dropdown).toBeVisible();
      await expect(filterElement).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(dropdown).toBeHidden();
      await expect(buttonElement).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(resetButton).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(buttonAfter).toBeFocused();
    });

    test('should focus next element when dropdown is open and no selection is made', async ({ page }) => {
      await initMultiSelect(page, { options: { markupAfter: '<p-button>Some button</p-button>' } });
      const buttonAfter = page.locator('p-button');

      await expect(getResetButton(page), 'initial reset button').toHaveCount(0);

      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);

      await page.keyboard.press('Tab');
      await expect(buttonElement).toBeFocused();
      await expect(dropdown).toBeHidden();

      await page.keyboard.press('Space');
      await expect(dropdown).toBeVisible();

      await page.keyboard.press('Tab');
      await expect(buttonElement).toBeFocused();
      await expect(dropdown).toBeHidden();

      await page.keyboard.press('Tab');
      await expect(getResetButton(page), 'initial reset button').toHaveCount(0);
      await expect(buttonAfter).toBeFocused();
    });

    test('should focus button after reset button click', async ({ page }) => {
      await initMultiSelect(page);
      await setValue(page, ['a']);
      await waitForStencilLifecycle(page);

      const host = getHost(page);

      const buttonElement = getButton(page);
      const resetButton = getResetButton(page);

      await page.keyboard.press('Tab');
      await expect(buttonElement).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(resetButton).toBeFocused();

      await page.keyboard.press('Enter');
      await expect(getResetButton(page)).toHaveCount(0);
      await expect(buttonElement).toBeFocused();

      await expect(host).toHaveJSProperty('value', []);
    });

    test('should receive focus when focus is set programmatically', async ({ page }) => {
      await initMultiSelect(page);
      const host = getHost(page);

      const buttonElement = getButton(page);

      await expect(buttonElement).not.toBeFocused();
      // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
      // await expect(buttonElement).toHaveCSS('outline', 'rgb(1, 2, 5) none 0px');

      await host.focus();
      await waitForStencilLifecycle(page);

      await expect(buttonElement).toBeFocused();
      // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
      // await expect(buttonElement).toHaveCSS('outline', 'rgb(26, 68, 234) solid 2px');
    });
  });
});

// TODO: Check if we need some special cases for multiple select
test.describe('filter', () => {
  test.describe('input', () => {
    test('should show matching options when typing into filter', async ({ page }) => {
      await initMultiSelect(page, { props: { name: 'Some name' } });
      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getMultiSelectOptions(page);
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
      await expect(options.nth(1)).toHaveText('Option B');
      await expect(options.nth(2)).toBeHidden();

      await filterInputElement.fill('');

      await expect(options.nth(0)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toBeVisible();
    });

    test('should not show options which are initially hidden when typing into filter', async ({ page }) => {
      await initMultiSelect(page, {
        props: { name: 'Some name' },
        options: { values: [{ value: 'a', hidden: true }, { value: 'b' }, { value: 'c' }] },
      });
      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getMultiSelectOptions(page);
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
      await initMultiSelect(page, { props: { name: 'Some name' } });
      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getMultiSelectOptions(page);
      const dropdown = getDropdown(page);

      await buttonElement.click();

      await expect(dropdown).toBeVisible();
      await expect(filterElement).toBeFocused();
      await expect(filterInputElement).toHaveValue('');
      await filterInputElement.fill('b');

      await expect(options.nth(0)).toBeHidden();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(1)).toHaveText('Option B');
      await expect(options.nth(2)).toBeHidden();
      await expect(dropdown).toBeVisible();

      await filterElement.locator('p-button-pure').click();

      await expect(dropdown).toBeVisible();
      await expect(filterInputElement).toHaveValue('');
      await expect(options.nth(0)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toBeVisible();
    });

    skipInBrowsers(['webkit'], () => {
      test('should reset filter value and show all options again after filtering, selecting an option and closing dropdown by Escape press', async ({
        page,
      }) => {
        await initMultiSelect(page, { props: { name: 'Some name' } });
        const host = getHost(page);
        const buttonElement = getButton(page);
        const filterElement = getFilter(page);
        const filterInputElement = getFilterInput(page);
        const options = getMultiSelectOptions(page);
        const dropdown = getDropdown(page);

        await buttonElement.click();

        await expect(dropdown).toBeVisible();
        await expect(filterElement).toBeFocused();
        await expect(filterInputElement).toHaveValue('');
        await filterInputElement.fill('b');

        await expect(options.nth(0)).toBeHidden();
        await expect(options.nth(1)).toBeVisible();
        await expect(options.nth(1)).toHaveText('Option B');
        await expect(options.nth(2)).toBeHidden();

        await page.keyboard.press('ArrowDown');
        await expect(options.nth(1)).toHaveJSProperty('highlighted', true);
        await page.keyboard.press('Enter');
        await expect(host).toHaveJSProperty('value', ['b']);
        await expect(dropdown).toBeVisible();
        await page.keyboard.press('Escape');

        await expect(dropdown).toBeHidden();
        await expect(buttonElement).toBeFocused();

        await page.keyboard.press('Space');
        await expect(filterElement).toBeFocused();
        await expect(filterInputElement).toHaveValue('');

        await expect(options.nth(0)).toBeVisible();
        await expect(options.nth(1)).toBeVisible();
        await expect(options.nth(2)).toBeVisible();
      });
    });

    test('should reset filter value and show all options again after filtering, selecting an option and closing dropdown by outside click', async ({
      page,
    }) => {
      await initMultiSelect(page, { options: { markupBefore: '<p-text>Some text</p-text>' } });

      const text = page.locator('p-text');
      const host = getHost(page);
      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getMultiSelectOptions(page);
      const dropdown = getDropdown(page);

      await buttonElement.click();

      await expect(dropdown).toBeVisible();
      await expect(filterElement).toBeFocused();
      await expect(filterInputElement).toHaveValue('');
      await filterInputElement.fill('b');

      await expect(options.nth(0)).toBeHidden();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(1)).toHaveText('Option B');
      await expect(options.nth(2)).toBeHidden();

      await options.nth(1).click();
      await expect(host).toHaveJSProperty('value', ['b']);
      await expect(dropdown).toBeVisible();

      await text.click();

      await expect(dropdown).toBeHidden();

      await buttonElement.click();
      await expect(filterElement).toBeFocused();
      await expect(filterInputElement).toHaveValue('');

      await expect(options.nth(0)).toBeVisible();
      await expect(options.nth(1)).toBeVisible();
      await expect(options.nth(2)).toBeVisible();
    });

    skipInBrowsers(['webkit'], () => {
      test('should show indicator when no results are found', async ({ page }) => {
        await initMultiSelect(page, { props: { name: 'Some name' } });
        const buttonElement = getButton(page);
        const filterElement = getFilter(page);
        const filterInputElement = getFilterInput(page);
        const options = getMultiSelectOptions(page);
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
      await initMultiSelect(page, {
        props: {
          name: 'Some name',
        },
        options: {
          includeOptgroups: true,
          values: [[{ value: '1a' }], [{ value: '2a' }]],
        },
      });
      const buttonElement = getButton(page);
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getMultiSelectOptions(page);
      const optgroups = getMultiSelectOptgroups(page);
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
      await initMultiSelect(page, {
        props: {
          name: 'Some name',
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
      const options = getMultiSelectOptions(page);
      const optgroups = getMultiSelectOptgroups(page);
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
      await expect(host).toHaveJSProperty('value', ['2a']);

      await page.mouse.click(0, 0);
      await expect(dropdown).toBeHidden();

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
      await initMultiSelect(page, {
        props: {
          name: 'Some name',
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
      const options = getMultiSelectOptions(page);
      const optgroups = getMultiSelectOptgroups(page);
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
      await expect(host).toHaveJSProperty('value', []);
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
      await initMultiSelect(page, { props: { name: 'Some name' } });
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
      await initMultiSelect(page, { props: { name: 'Some name' } });
      const host = getHost(page);
      const filterElement = getFilter(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(filterElement).toBeFocused();
      await expect(host).toHaveJSProperty('value', []);
    });

    test('should focus filter input on Enter key', async ({ page }) => {
      await initMultiSelect(page, { props: { name: 'Some name' } });
      const host = getHost(page);
      const filterElement = getFilter(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await expect(filterElement).toBeFocused();
      await expect(host).toHaveJSProperty('value', []);
    });

    test('should focus filter input on ArrowDown key', async ({ page }) => {
      await initMultiSelect(page, { props: { name: 'Some name' } });
      const host = getHost(page);
      const filterElement = getFilter(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');

      await expect(filterElement).toBeFocused();
      await expect(host).toHaveJSProperty('value', []);
    });

    test('should cycle through options while having filter input focused', async ({ page }) => {
      await initMultiSelect(page, { props: { name: 'Some name' } });
      const host = getHost(page);
      const filterElement = getFilter(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(filterElement).toBeFocused();
      await filterElement.press('ArrowDown');

      await expect(page.locator('p-multi-select p-multi-select-option').first()).toHaveJSProperty('highlighted', true);

      await filterElement.press('Enter');

      await expect(host).toHaveJSProperty('value', ['a']);
    });

    test('should reset/keep highlighted option on filter input', async ({ page }) => {
      await initMultiSelect(page, { props: { name: 'Some name' } });
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const options = getMultiSelectOptions(page);

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
      await initMultiSelect(page, {
        props: { name: 'Some name' },
        options: { values: [{ value: 'option a' }, { value: 'option b' }, { value: 'option c' }] },
      });
      const filterElement = getFilter(page);
      const filterInputElement = getFilterInput(page);
      const dropdown = getDropdown(page);
      const options = getMultiSelectOptions(page);

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
      await initMultiSelect(page, {
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
      await initMultiSelect(page, {
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
      await initMultiSelect(page, {
        props: { name: 'Some name' },
        slots: {
          filter:
            '<p-input-search slot="filter" name="search" clear indicator compact autoComplete="off"></p-input-search>',
        },
      });

      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const options = getMultiSelectOptions(page);
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
      await initMultiSelect(page, {
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
      await initMultiSelect(page, {
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
      await initMultiSelect(page, {
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
      const options = getMultiSelectOptions(page);

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
      await expect(buttonElement.locator('span').first()).toHaveText('Option B');
      await expect(host).toHaveJSProperty('value', ['b']);

      await buttonElement.press('ArrowDown');
      await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(1)).toHaveJSProperty('highlighted', false);
      await expect(options.nth(2)).toHaveJSProperty('highlighted', true);

      await page.keyboard.press('Enter');
      await expect(buttonElement.locator('span').first()).toHaveText('Option B, Option C');
      await expect(host).toHaveJSProperty('value', ['b', 'c']);

      await page.keyboard.press('Escape');
      await expect(dropdown).toBeHidden();
      await expect(buttonElement).toBeFocused();
      await expect(buttonElement.locator('span').first()).toHaveText('Option B, Option C');
      await expect(host).toHaveJSProperty('value', ['b', 'c']);
    });
  });

  test.describe('dynamic option change', () => {
    test('should show selected option when option with value is slotted', async ({ page }) => {
      await initMultiSelect(page, {
        props: { name: 'Some name' },
        slots: {
          filter:
            '<p-input-search slot="filter" name="search" clear indicator compact autoComplete="off"></p-input-search>',
        },
      });

      const host = getHost(page);
      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const options = getMultiSelectOptions(page);
      const slottedFilter = page.locator('p-input-search[slot="filter"]');

      await setValue(page, ['d']);
      await expect(host).toHaveJSProperty('value', ['d']);
      await expect(buttonElement.locator('span').first()).toHaveText('');

      await buttonElement.click();
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();

      for (const option of await options.all()) {
        await expect(option).toBeVisible();
        await expect(option).toHaveJSProperty('selected', undefined);
      }

      await addOption(page, 'd', 'Option D');
      await expect(buttonElement.locator('span').first()).toHaveText('Option D');

      await expect(options.nth(3)).toHaveJSProperty('selected', true);
    });
    test('should not reset selected option when no option with selected value is slotted', async ({ page }) => {
      await initMultiSelect(page, {
        props: { name: 'Some name' },
        slots: {
          filter:
            '<p-input-search slot="filter" name="search" clear indicator compact autoComplete="off"></p-input-search>',
        },
      });

      const host = getHost(page);
      const buttonElement = getButton(page);
      const dropdown = getDropdown(page);
      const options = getMultiSelectOptions(page);
      const slottedFilter = page.locator('p-input-search[slot="filter"]');

      await setValue(page, ['c']);
      await expect(host).toHaveJSProperty('value', ['c']);
      await expect(buttonElement.locator('span').first()).toHaveText('Option C');

      await buttonElement.click();
      await expect(dropdown).toBeVisible();
      await expect(slottedFilter).toBeFocused();

      await expect(options).toHaveCount(3);
      await removeOption(page, 'c');
      const optionsAfterRemove = getMultiSelectOptions(page);
      await expect(optionsAfterRemove).toHaveCount(2);

      await expect(buttonElement.locator('span').first()).toHaveText('Option C'); // Shown selection stays visible

      await addOption(page, 'c');
      const optionsAfterAdd = getMultiSelectOptions(page);
      await expect(optionsAfterAdd).toHaveCount(3);
      await expect(optionsAfterAdd.nth(2)).toHaveJSProperty('selected', true);
      await expect(buttonElement.locator('span').first()).toHaveText('Option C');
      await expect(host).toHaveJSProperty('value', ['c']);

      await optionsAfterAdd.nth(2).click();
      await expect(optionsAfterAdd.nth(2)).toHaveJSProperty('selected', false);
      await expect(buttonElement.locator('span').first()).toHaveText('');
      await expect(host).toHaveJSProperty('value', []);
    });
  });
});

test.describe('selection', () => {
  test('should add valid selection on enter', async ({ page }) => {
    await initMultiSelect(page);
    const host = getHost(page);
    const buttonElement = getButton(page);
    const filterInputElement = getFilterInput(page);
    const options = getMultiSelectOptions(page);

    await buttonElement.click();
    await expect(filterInputElement).toBeFocused();

    await page.keyboard.press('B');
    await page.keyboard.press('ArrowDown');
    await expect(options.nth(1)).toHaveText('Option B');
    await expect(options.nth(1)).toHaveJSProperty('highlighted', true);

    await page.keyboard.press('Enter');
    await expect(host).toHaveJSProperty('value', ['b']);
    await expect(options.nth(1)).toHaveJSProperty('selected', true);
    await expect(buttonElement.locator('span').first()).toHaveText('Option B');

    await page.keyboard.press('Backspace');
    await page.keyboard.press('ArrowDown');
    await expect(options.nth(2)).toHaveText('Option C');
    await expect(options.nth(2)).toHaveJSProperty('highlighted', true);
    await page.keyboard.press('Enter');

    await expect(host).toHaveJSProperty('value', ['b', 'c']);
    await expect(options.nth(1)).toHaveJSProperty('selected', true);
    await expect(options.nth(2)).toHaveJSProperty('selected', true);
    await expect(buttonElement.locator('span').first()).toHaveText('Option B, Option C');
  });

  test('should add valid selection on click', async ({ page }) => {
    await initMultiSelect(page);
    const host = getHost(page);
    const buttonElement = getButton(page);
    const filterInputElement = getFilterInput(page);
    const options = getMultiSelectOptions(page);

    await buttonElement.click();
    await expect(filterInputElement).toBeFocused();

    await filterInputElement.fill('B');
    await expect(options.nth(1)).toBeVisible();
    await expect(options.nth(1)).toHaveText('Option B');
    await options.nth(1).click();

    await expect(host).toHaveJSProperty('value', ['b']);
    await expect(options.nth(1)).toHaveJSProperty('selected', true);
    await expect(buttonElement.locator('span').first()).toHaveText('Option B');

    await filterInputElement.fill('');
    await expect(options.nth(2)).toBeVisible();
    await expect(options.nth(2)).toHaveText('Option C');
    await options.nth(2).click();

    await expect(host).toHaveJSProperty('value', ['b', 'c']);
    await expect(options.nth(1)).toHaveJSProperty('selected', true);
    await expect(options.nth(2)).toHaveJSProperty('selected', true);
    await expect(buttonElement.locator('span').first()).toHaveText('Option B, Option C');
  });

  skipInBrowsers(['webkit'], () => {
    test('should reset selection on reset button enter', async ({ page }) => {
      await initMultiSelect(page);
      const host = getHost(page);
      const buttonElement = getButton(page);
      const options = getMultiSelectOptions(page);
      const dropdown = getDropdown(page);

      await page.keyboard.press('Tab');
      await expect(buttonElement).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(dropdown).toBeVisible();
      await page.keyboard.press('ArrowDown');
      await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
      await page.keyboard.press('Enter');

      await expect(host).toHaveJSProperty('value', ['a']);
      await expect(options.nth(0)).toHaveJSProperty('selected', true);
      await expect(options.nth(1)).toHaveJSProperty('selected', undefined);
      await expect(options.nth(2)).toHaveJSProperty('selected', undefined);

      await page.keyboard.press('Tab');
      await expect(dropdown).toBeHidden();
      await expect(buttonElement).toBeFocused();

      const resetButton = getResetButton(page);
      await addEventListener(resetButton, 'focus');

      await page.keyboard.press('Tab');
      await expect(resetButton).toBeFocused();

      await page.keyboard.press('Enter');

      await expect(dropdown).toBeHidden();
      await expect(host).toHaveJSProperty('value', []);
      await expect(buttonElement).toHaveText('');
      await expect(options.nth(0)).toHaveJSProperty('selected', false);
      await expect(options.nth(1)).toHaveJSProperty('selected', undefined);
      await expect(options.nth(2)).toHaveJSProperty('selected', undefined);
    });
  });

  test('should reset selection on reset button click', async ({ page }) => {
    await initMultiSelect(page);
    const host = getHost(page);
    const buttonElement = getButton(page);
    const dropdown = getDropdown(page);
    const options = getMultiSelectOptions(page);

    await buttonElement.click();
    await expect(dropdown).toBeVisible();

    const option1 = getMultiSelectOption(page, 1);
    const option2 = getMultiSelectOption(page, 2);
    await option1.click();
    await option2.click();

    await expect(host).toHaveJSProperty('value', ['a', 'b']);
    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('selected', true);
    await expect(options.nth(2)).toHaveJSProperty('selected', undefined);
    await expect(dropdown).toBeVisible();

    const resetButton = getResetButton(page);
    await resetButton.click();

    await expect(dropdown).toBeVisible();
    await expect(host).toHaveJSProperty('value', []);
    await expect(options.nth(0)).toHaveJSProperty('selected', false);
    await expect(options.nth(1)).toHaveJSProperty('selected', false);
    await expect(options.nth(2)).toHaveJSProperty('selected', undefined);
  });
});

test.describe('keyboard handling', () => {
  skipInBrowsers(['webkit']);
  test('should highlight first option on arrow down', async ({ page }) => {
    await initMultiSelect(page);

    const host = getHost(page);
    const options = getMultiSelectOptions(page);
    const dropdown = getDropdown(page);

    await expect(dropdown).toBeHidden();
    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await expect(dropdown).toBeVisible();

    await page.keyboard.press('ArrowDown');
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await page.keyboard.press('Enter');
    await expect(host).toHaveJSProperty('value', ['a']);
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await page.keyboard.press('ArrowDown');
    await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await page.keyboard.press('Enter');
    await expect(host).toHaveJSProperty('value', ['a', 'b']);
    await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);
  });

  test('should skip disabled option on arrow down', async ({ page }) => {
    await initMultiSelect(page, {
      options: { values: [{ value: 'a', disabled: true }, { value: 'b' }, { value: 'c' }] },
    });

    const options = getMultiSelectOptions(page);

    await expect(options.nth(0)).toBeDisabled();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');

    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', true);
  });

  test('should skip disabled option on arrow up', async ({ page }) => {
    await initMultiSelect(page, {
      options: { values: [{ value: 'a' }, { value: 'b', disabled: true }, { value: 'c' }] },
    });

    const options = getMultiSelectOptions(page);

    await expect(options.nth(1)).toBeDisabled();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', true);

    await page.keyboard.press('ArrowUp');
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', false);
  });

  test('should open dropdown with spacebar', async ({ page }) => {
    await initMultiSelect(page);
    const dropdown = getDropdown(page);
    const buttonElement = getButton(page);

    await page.keyboard.press('Tab');

    await expect(buttonElement).toBeFocused();
    await expect(dropdown).toBeHidden();

    await page.keyboard.press('Space');
    await expect(dropdown).toBeVisible();
  });

  test('should toggle selected with enter', async ({ page }) => {
    await initMultiSelect(page);
    const host = getHost(page);
    const options = getMultiSelectOptions(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(host).toHaveJSProperty('value', ['a']);
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await page.keyboard.press('Enter');
    await expect(host).toHaveJSProperty('value', []);
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(0)).toHaveJSProperty('selected', false);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await page.keyboard.press('Enter');

    await expect(host).toHaveJSProperty('value', ['a']);
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);
  });

  test('should not select option on Escape', async ({ page }) => {
    await initMultiSelect(page);
    const host = getHost(page);
    const dropdown = getDropdown(page);
    const options = getMultiSelectOptions(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');

    await expect(dropdown).toBeVisible();
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true);

    await page.keyboard.press('Escape');

    await expect(dropdown).toBeHidden();
    await expect(options.nth(0)).toHaveJSProperty('selected', undefined);
    await expect(host).toHaveJSProperty('value', []);
  });

  test('should highlight and select options on PageDown/PageUp', async ({ page }) => {
    await initMultiSelect(page);
    const host = getHost(page);
    const dropdown = getDropdown(page);
    const options = getMultiSelectOptions(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('PageDown');

    await expect(host).toHaveJSProperty('value', []);
    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', true);

    await page.keyboard.press('Enter');

    await expect(host).toHaveJSProperty('value', ['c']);
    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(2)).toHaveJSProperty('selected', true);

    await page.keyboard.press('PageUp');
    await page.keyboard.press('Enter');

    await expect(host).toHaveJSProperty('value', ['c', 'a']);
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', false);
    await expect(options.nth(2)).toHaveJSProperty('selected', true);
  });

  test('should close dropdown on Tab', async ({ page }) => {
    await initMultiSelect(page);
    const dropdown = getDropdown(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await expect(dropdown).toBeVisible();

    await page.keyboard.press('Tab');

    await expect(dropdown).toBeHidden();
  });

  test('should have correct reset button focus handling', async ({ page }) => {
    await initMultiSelect(page, {
      options: { markupAfter: '<p-button>Button</p-button>' },
    });
    const button = page.locator('p-button');
    const filterElement = getFilterInput(page);
    const buttonElement = getButton(page);
    const dropdown = getDropdown(page);

    await setValue(page, ['a']);

    const resetButton = getResetButton(page);
    await expect(resetButton).toBeVisible();
    await expect(resetButton).not.toBeFocused();
    await expect(button).not.toBeFocused();
    await expect(buttonElement).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(buttonElement).toBeFocused();

    await page.keyboard.press('Space');
    await expect(dropdown).toBeVisible();
    await expect(filterElement).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(dropdown).toBeHidden();
    await expect(buttonElement).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(resetButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
  });

  test('should be able to switch from keyboard to mouse', async ({ page }) => {
    await initMultiSelect(page);
    const options = getMultiSelectOptions(page);
    const dropdown = getDropdown(page);

    await expect(dropdown).toBeHidden();
    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await expect(dropdown).toBeVisible();

    await page.keyboard.press('ArrowDown');
    await expect(options.nth(0)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await options.nth(1).hover();
    await expect(options.nth(0)).toHaveJSProperty('highlighted', false);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);
  });

  test('should reset highlight on close when no option is selected', async ({ page }) => {
    await initMultiSelect(page);
    const options = getMultiSelectOptions(page);
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
    await initMultiSelect(page);
    await setValue(page, ['a', 'b']);
    const host = getHost(page);
    const options = getMultiSelectOptions(page);
    const dropdown = getDropdown(page);

    await expect(host).toHaveJSProperty('value', ['a', 'b']);
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

test.describe('click handling', () => {
  test('should open dropdown on mouseclick and close on 2nd click', async ({ page }) => {
    await initMultiSelect(page);
    const buttonElement = getButton(page);
    const dropdown = getDropdown(page);

    await buttonElement.click();
    await expect(dropdown).toBeVisible();

    await buttonElement.click();
    await expect(dropdown).toBeHidden();
  });

  test('should select second option on mouseclick', async ({ page }) => {
    await initMultiSelect(page);
    const host = getHost(page);
    const buttonElement = getButton(page);
    const options = getMultiSelectOptions(page);

    await buttonElement.click();
    await expect(options.nth(1)).toBeVisible();
    await options.nth(1).click();

    await expect(host).toHaveJSProperty('value', ['b']);
    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(1)).toHaveJSProperty('selected', true);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);
  });
  test('should be able to switch from mouse to keyboard', async ({ page }) => {
    await initMultiSelect(page);
    const buttonElement = getButton(page);
    const options = getMultiSelectOptions(page);

    await buttonElement.click();
    await expect(options.nth(1)).toBeVisible();
    await options.nth(1).hover();

    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', true);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', undefined);

    await page.keyboard.press('ArrowDown');

    await expect(options.nth(0)).toHaveJSProperty('highlighted', undefined);
    await expect(options.nth(1)).toHaveJSProperty('highlighted', false);
    await expect(options.nth(2)).toHaveJSProperty('highlighted', true);
  });

  test('should reset highlight on close when no option is selected', async ({ page }) => {
    await initMultiSelect(page);
    const options = getMultiSelectOptions(page);
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
    await initMultiSelect(page);
    await setValue(page, ['a', 'b']);
    const host = getHost(page);
    const options = getMultiSelectOptions(page);
    const dropdown = getDropdown(page);
    const buttonElement = getButton(page);

    await expect(host).toHaveJSProperty('value', ['a', 'b']);
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

test.describe('disabled', () => {
  test('should have not-allowed cursor', async ({ page }) => {
    await initMultiSelect(page, { props: { name: 'options', disabled: true } });
    const buttonElement = getButton(page);
    await expect(buttonElement).toHaveCSS('cursor', 'not-allowed');
  });

  skipInBrowsers(['webkit'], () => {
    test('should not be able to open or interact', async ({ page }) => {
      await initMultiSelect(page, {
        props: { name: 'options', disabled: true },
        options: { markupAfter: '<p-button>Button</p-button>' },
      });
      const host = getHost(page);
      const button = page.locator('p-button');

      await expect(host).not.toBeFocused();
      await expect(button).not.toBeFocused();

      await page.keyboard.press('Tab');
      await expect(host).not.toBeFocused();
      await expect(button).toBeFocused();
    });
  });
});

test.describe('slots', () => {
  test('should update when selected option is added', async ({ page }) => {
    await initMultiSelect(page);
    const host = getHost(page);
    const buttonElement = getButton(page);

    await expect(host).toHaveJSProperty('value', []);

    await setValue(page, ['d']);

    await expect(host).toHaveJSProperty('value', ['d']);
    await expect(buttonElement.locator('span').first()).toHaveText('');

    await addOption(page, 'd', 'Option D');

    await expect(host).toHaveJSProperty('value', ['d']);
    await expect(buttonElement.locator('span').first()).toHaveText('Option D');
  });

  test('should update when selected option is removed', async ({ page }) => {
    await initMultiSelect(page);
    await setValue(page, ['c']);
    const host = getHost(page);
    const buttonElement = getButton(page);

    await expect(host).toHaveJSProperty('value', ['c']);
    await expect(buttonElement.locator('span').first()).toHaveText('Option C');

    await host.evaluate((el) => {
      (el as HTMLPMultiSelectElement).lastElementChild.remove();
    });

    await expect(host).toHaveJSProperty('value', ['c']);
    await expect(buttonElement.locator('span').first()).toHaveText('Option C'); // Selection is kept for controlled async filtering to work
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initMultiSelect(page);
    const buttonElement = getButton(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-multi-select'], 'componentDidLoad: p-multi-select').toBe(1);
    expect(status1.componentDidLoad['p-multi-select-option'], 'componentDidLoad: p-multi-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(3); // arrow down, input-search indicator and clear icon
    expect(status1.componentDidLoad['p-input-search'], 'componentDidLoad: p-input-search').toBe(1);
    expect(status1.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(9);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await buttonElement.click();
    await waitForStencilLifecycle(page);
    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-multi-select'], 'componentDidUpdate: p-multi-select').toBe(1);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips when selecting option', async ({ page }) => {
    await initMultiSelect(page);
    const buttonElement = getButton(page);

    await buttonElement.click();
    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-multi-select'], 'componentDidLoad: p-multi-select').toBe(1);
    expect(status1.componentDidLoad['p-multi-select-option'], 'componentDidLoad: p-multi-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(3); // arrow down, input-search indicator and clear icon
    expect(status1.componentDidLoad['p-input-search'], 'componentDidLoad: p-input-search').toBe(1);
    expect(status1.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(9);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

    const options = getMultiSelectOptions(page);
    // Hover should not cause additional lifecycles in option
    await options.nth(0).hover();
    await options.nth(0).click();

    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidLoad['p-button-pure'], {
        message: 'componentDidLoad: p-button-pure',
      })
      .toBe(2); // reset button + input-search clear button
    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate['p-multi-select-option'], {
        message: 'componentDidUpdate: p-multi-select-option',
      })
      .toBe(1);
    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate['p-multi-select'], {
        message: 'componentDidUpdate: p-multi-select',
      })
      .toBe(2);
    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate.all, {
        message: 'componentDidUpdate: all',
      })
      .toBe(3);
  });

  test('should work without unnecessary round trips on filter input change', async ({ page }) => {
    await initMultiSelect(page);
    const buttonElement = getButton(page);
    const filterInputElement = getFilterInput(page);

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    const status1 = await getLifecycleStatus(page);
    expect(status1.componentDidLoad['p-multi-select'], 'componentDidLoad: p-multi-select').toBe(1);
    expect(status1.componentDidLoad['p-multi-select-option'], 'componentDidLoad: p-multi-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(3); // arrow down, input-search indicator and clear icon
    expect(status1.componentDidLoad['p-input-search'], 'componentDidLoad: p-input-search').toBe(1);
    expect(status1.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(9);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1); // slotchange forces second update

    await expect(filterInputElement).toBeFocused();
    await page.keyboard.press('c');
    await waitForStencilLifecycle(page);

    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate['p-multi-select-option'], {
        message: 'componentDidUpdate: p-multi-select-option',
      })
      .toBe(0);
    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate['p-multi-select'], {
        message: 'componentDidUpdate: p-multi-select',
      })
      .toBe(1);
    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate['p-input-search'], {
        message: 'componentDidUpdate: p-input-search',
      })
      .toBe(2);
    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate.all, {
        message: 'componentDidUpdate: all',
      })
      .toBe(3);
  });
});

test.describe('optgroups', () => {
  test('should persist disabled state for options inside optgroup', async ({ page }) => {
    const group = [{ value: 'b', disabled: true }, { value: 'c' }, { value: 'd', disabled: true }];

    await initMultiSelect(page, {
      options: { includeOptgroups: true, values: [{ value: 'a' }, group, { value: 'e' }] },
    });

    const buttonElement = getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    const optgroup = page.locator('p-optgroup[label="1"]');
    expect(await getProperty<boolean>(optgroup, 'disabled')).toBeFalsy();
    const children = await optgroup.locator('p-multi-select-option').all();

    for (const child of children) {
      const value = await getProperty<string>(child, 'value');
      const disabled = await getProperty<boolean>(child, 'disabled');
      const item = group.find((item) => item.value === value);
      expect(disabled).toEqual(!!item.disabled);
      expect(await getProperty<boolean>(child, 'disabledParent')).toBeFalsy();
    }
    await optgroup.evaluate((element) => ((element as HTMLPOptgroupElement).disabled = true));
    await waitForStencilLifecycle(page);

    expect(await getProperty<boolean>(optgroup, 'disabled')).toBeTruthy();

    for (const child of children) {
      await expect.poll(async () => await getProperty<boolean>(child, 'disabled')).toBeTruthy();
      await expect.poll(async () => await getProperty<boolean>(child, 'disabledParent')).toBeTruthy();
    }

    await optgroup.evaluate((element) => ((element as HTMLPOptgroupElement).disabled = false));
    await waitForStencilLifecycle(page);

    for (const child of children) {
      const value = await getProperty<string>(child, 'value');
      const disabled = await getProperty<boolean>(child, 'disabled');
      const item = group.find((item) => item.value === value);
      expect(disabled).toEqual(!!item.disabled);
      expect(await getProperty<boolean>(child, 'disabledParent')).toBeFalsy();
    }
  });

  test('should only display optgroups of filtered options', async ({ page }) => {
    await initMultiSelect(page, { options: { includeOptgroups: true } });
    const buttonElement = getButton(page);
    const filterInputElement = getFilterInput(page);
    const options = getMultiSelectOptgroups(page);
    const optgroups = getMultiSelectOptgroups(page);

    await buttonElement.click();
    await expect(optgroups.nth(0)).toBeVisible();
    await expect(options.nth(0)).toBeVisible();
    await expect(optgroups.nth(1)).toBeVisible();
    await expect(options.nth(1)).toBeVisible();
    await expect(optgroups.nth(2)).toBeVisible();
    await expect(options.nth(2)).toBeVisible();

    await filterInputElement.fill('b');

    await expect(optgroups.nth(0)).toBeHidden();
    await expect(options.nth(0)).toBeHidden();
    await expect(optgroups.nth(1)).toBeVisible();
    await expect(optgroups.nth(1)).toHaveText('Option B1');
    await expect(options.nth(1)).toBeVisible();
    await expect(options.nth(1)).toHaveText('Option B1');
    await expect(optgroups.nth(2)).toBeHidden();
    await expect(options.nth(2)).toBeHidden();

    await filterInputElement.fill('');

    await expect(optgroups.nth(0)).toBeVisible();
    await expect(options.nth(0)).toBeVisible();
    await expect(optgroups.nth(1)).toBeVisible();
    await expect(options.nth(1)).toBeVisible();
    await expect(optgroups.nth(2)).toBeVisible();
    await expect(options.nth(2)).toBeVisible();
  });

  test('should disable all options inside disabled optgroup', async ({ page }) => {
    await initMultiSelect(page, { options: { includeOptgroups: true } });

    const buttonElement = getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    const optgroup = page.locator('p-optgroup[label="1"]');
    expect(await getProperty<boolean>(optgroup, 'disabled')).toBeFalsy();
    const children = await optgroup.locator('p-multi-select-option').all();

    for (const child of children) {
      expect(await getProperty<boolean>(child, 'disabled')).toBeFalsy();
    }
    expect(await setProperty(optgroup, 'disabled', true));
    await waitForStencilLifecycle(page);

    expect(await getProperty<boolean>(optgroup, 'disabled')).toBeTruthy();

    for (const child of children) {
      await expect.poll(async () => await getProperty<boolean>(child, 'disabled')).toBeTruthy();
      await expect.poll(async () => await getProperty<boolean>(child, 'disabledParent')).toBeTruthy();
    }
  });

  test('should hide all options inside hidden optgroup', async ({ page }) => {
    await initMultiSelect(page, { options: { includeOptgroups: true } });

    const buttonElement = getButton(page);
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    const optgroup = page.locator('p-optgroup[label="1"]');
    await expect(optgroup).toBeVisible();
    const children = await optgroup.locator('p-multi-select-option').all();

    for (const child of children) {
      await expect(child).toBeVisible();
    }
    await optgroup.evaluate((element) => ((element as HTMLPOptgroupElement).hidden = true));
    await waitForStencilLifecycle(page);

    await expect(optgroup).toBeHidden();

    for (const child of children) {
      await expect(child).toBeHidden();
    }
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit if updated programmatically', async ({ page }) => {
    const name = 'name';
    const value = ['a', 'b'];
    await initMultiSelect(page, {
      props: { name },
      options: { isWithinForm: true, markupAfter: '<button type="submit">Submit</button>' },
    });
    const host = getHost(page);
    const form = getForm(page);
    await setProperty(host, 'value', value);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValues(form, name)).toStrictEqual(value);
  });

  skipInBrowsers(['webkit'], () => {
    test('should include name & value in FormData submit if updated using keyboard', async ({ page }) => {
      const name = 'options';
      const value = ['a'];
      await initMultiSelect(page, {
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
  });

  test('should include name & value in FormData submit if updated using mouse', async ({ page }) => {
    const name = 'options';
    const value = ['b'];
    await initMultiSelect(page, {
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

    const dropdownOption = getMultiSelectOption(page, 2);
    await dropdownOption.click();
    await text.click();
    await waitForStencilLifecycle(page);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValues(form, name)).toStrictEqual(value);
  });

  test('should include name & value in FormData submit if outside of form', async ({ page }) => {
    const name = 'name';
    const value = ['a', 'b'];
    const formId = 'myForm';
    await initMultiSelect(page, {
      props: { name, form: formId },
      options: {
        isWithinForm: false,
        markupBefore: `<form id="myForm" onsubmit="return false;"><button type="submit">Submit</button></form>`,
      },
    });
    const multiSelect = getHost(page);
    const form = getForm(page);
    await setProperty(multiSelect, 'value', value);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValues(form, name)).toStrictEqual(value);
  });

  test('should reset multi-select value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = ['c'];
    await initMultiSelect(page, {
      props: { name },
      options: {
        isWithinForm: true,
        markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
      },
    });
    const host = getHost(page);
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await setProperty(host, 'value', value);

    await page.locator('button[type="reset"]').click();

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    await expect(host).toHaveJSProperty('value', []);
    expect(await getFormDataValues(form, name)).toStrictEqual([]);
  });

  test('should disable select if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = ['Hallo'];
    const host = getHost(page);
    await initMultiSelect(page, {
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
    await initMultiSelect(page, {
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
    await initMultiSelect(page, {
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
