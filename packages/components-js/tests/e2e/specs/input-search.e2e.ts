import { expect, type Page, test } from '@playwright/test';
import { Components } from '@porsche-design-system/components';
import {
  addEventListener,
  getConsoleErrorsAmount,
  getEventSummary,
  getFormDataValue,
  getHTMLAttributes,
  getLifecycleStatus,
  initConsoleObserver,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-input-search');
const getFieldset = (page: Page) => page.locator('fieldset');
const getInputSearch = (page: Page) => page.locator('p-input-search input');
const getInputSearchClearButton = (page: Page) => page.locator('p-input-search p-button-pure');
const getInputSearchWrapper = (page: Page) => page.locator('p-input-search .wrapper');
const getLabel = (page: Page) => page.locator('p-input-search label');
const getForm = (page: Page) => page.locator('form');

type InitOptions = {
  props?: Components.PInputSearch;
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  isWithinForm?: boolean;
  markupBefore?: string;
  markupAfter?: string;
};

const initInputSearch = (page: Page, opts?: InitOptions): Promise<void> => {
  const {
    props = {},
    useSlottedLabel = false,
    useSlottedDescription = false,
    useSlottedMessage = false,
    isWithinForm = false,
    markupBefore = '',
    markupAfter = '',
  } = opts || {};

  const link = '<a href="#" onclick="return false;">link</a>';
  const slottedLabel = useSlottedLabel ? `<span slot="label">Label with a ${link}</span>` : '';
  const slottedDescription = useSlottedDescription ? `<span slot="description">Description with a ${link}</span>` : '';
  const slottedMessage = useSlottedMessage ? `<span slot="message">Message with a ${link}</span>` : '';

  const markup = `${markupBefore}<p-input-search ${getHTMLAttributes(props)}>
      ${slottedLabel}
      ${slottedDescription}
      ${slottedMessage}
    </p-input-search>${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('value', () => {
  test('should have correct value when set initially', async ({ page }) => {
    const testValue = 'some value';
    await initInputSearch(page, { props: { name: 'Some name', value: testValue } });
    const host = getHost(page);
    const inputSearch = getInputSearch(page);

    await expect(host).toHaveJSProperty('value', testValue);
    await expect(inputSearch).toHaveJSProperty('value', testValue);
    await expect(inputSearch).toHaveValue(testValue);
  });

  test('should sync value when typing', async ({ page }) => {
    await initInputSearch(page);
    const host = getHost(page);
    const inputSearch = getInputSearch(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputSearch).toHaveJSProperty('value', '');

    const testInput = '10';

    await inputSearch.fill(testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputSearch).toHaveJSProperty('value', testInput);
  });

  test('should sync value when changed programmatically', async ({ page }) => {
    await initInputSearch(page);
    const host = getHost(page);
    const inputSearch = getInputSearch(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputSearch).toHaveJSProperty('value', '');

    const testInput = '10';

    await setProperty(host, 'value', testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputSearch).toHaveJSProperty('value', testInput);
    await expect(inputSearch).toHaveValue(testInput);
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = 'some value';
    await initInputSearch(page, {
      props: { name, value },
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should include name & value in FormData submit if outside of form', async ({ page }) => {
    const name = 'name';
    const value = 'some value';
    const formId = 'myForm';
    await initInputSearch(page, {
      props: { name, value, form: formId },
      markupBefore: `<form id="myForm" onsubmit="return false;"><button type="submit">Submit</button></form>`,
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should prevent form submission if the required field is empty', async ({ page }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initInputSearch(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should submit form after dynamically setting `required` to false on an initially required, empty input-search', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initInputSearch(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });
    const form = getForm(page);
    const host = getHost(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await setProperty(host, 'required', false);
    await waitForStencilLifecycle(page);

    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  });

  test('should submit form after reset if the required input was initially not empty', async ({ page }) => {
    const name = 'name';
    const value = 'some value';
    const required = true;
    await initInputSearch(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputSearch = getInputSearch(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputSearch.fill('');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  });

  test('should prevent form submission after reset if the input-search is required and was initially empty', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initInputSearch(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputSearch = getInputSearch(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputSearch.fill('20');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should reset input-search value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = 'some value';
    const newValue = '20';
    const host = getHost(page);
    const inputSearch = getInputSearch(page);
    await initInputSearch(page, {
      props: { name, value },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputSearch.fill(newValue);
    await inputSearch.press('Tab');
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputSearch).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);
    await expect(inputSearch).toHaveValue(value);

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable input-search if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = 'some value';
    const host = getHost(page);
    await initInputSearch(page, {
      props: { name, value },
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initInputSearch(page, {
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });
    const host = getHost(page);
    const inputSearch = getInputSearch(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);
    await expect(inputSearch).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
    await expect(inputSearch).toHaveJSProperty('disabled', false);
  });

  test('should update form value correctly when value is changed via clear button', async ({ page }) => {
    const name = 'name';
    const value = 'some value';
    await initInputSearch(page, {
      props: { name, label: 'Some label', clear: true, value },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    await addEventListener(form, 'submit');
    const host = getHost(page);
    const inputSearch = getInputSearch(page);
    const inputSearchClearButton = getInputSearchClearButton(page);

    await expect(host).toHaveJSProperty('value', value);
    await expect(inputSearch).toHaveValue(value);

    await inputSearchClearButton.click();

    await expect(host).toHaveJSProperty('value', '');
    await expect(inputSearch).toHaveValue('');

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe('');
  });

  test.describe('implicit form submission on enter key', () => {
    test('should implicit submit form on enter when there is a p-button type submit', async ({ page }) => {
      await initInputSearch(page, {
        isWithinForm: true,
        markupAfter: `<p-button type="submit">Submit</p-button>`,
      });

      const inputSearch = getInputSearch(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputSearch.click();
      await expect(inputSearch).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is a native button type submit', async ({ page }) => {
      await initInputSearch(page, {
        isWithinForm: true,
        markupAfter: `<button type="submit">Submit</button>`,
      });

      const inputSearch = getInputSearch(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputSearch.click();
      await expect(inputSearch).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is no submit button and no blocking elements', async ({
      page,
    }) => {
      await initInputSearch(page, {
        isWithinForm: true,
      });

      const inputSearch = getInputSearch(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputSearch.click();
      await expect(inputSearch).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should not implicit submit form on enter when there is no submit button and a native input type text', async ({
      page,
    }) => {
      await initInputSearch(page, {
        isWithinForm: true,
        markupAfter: `<input name="some-input" type="text" />`,
      });

      const inputSearch = getInputSearch(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputSearch.click();
      await expect(inputSearch).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });

    test('should not implicit submit form on enter when there is no submit button and a p-input-text', async ({
      page,
    }) => {
      await initInputSearch(page, {
        isWithinForm: true,
        markupAfter: `<p-input-text name="some-input" />`,
      });

      const inputSearch = getInputSearch(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputSearch.click();
      await expect(inputSearch).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });
  });

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initInputSearch(page, {
      isWithinForm: true,
      props: {
        name: 'some-name',
        required: true,
        disabled: true,
      },
    });

    await waitForStencilLifecycle(page);
    expect(getConsoleErrorsAmount()).toBe(0);
  });

  test('should not set validity when readonly and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initInputSearch(page, {
      isWithinForm: true,
      props: {
        name: 'some-name',
        required: true,
        readOnly: true,
      },
    });

    await waitForStencilLifecycle(page);
    expect(getConsoleErrorsAmount()).toBe(0);
  });
});

test.describe('clear button', () => {
  test('should not show clear button initially when no value is set', async ({ page }) => {
    await initInputSearch(page, { props: { name: 'Some name', label: 'Some label', clear: true } });
    const clearButton = getInputSearchClearButton(page);
    await expect(clearButton).toBeHidden();
  });

  test('should show clear button after input', async ({ page }) => {
    await initInputSearch(page, { props: { name: 'Some name', label: 'Some label', clear: true } });
    const inputSearch = getInputSearch(page);
    await expect(getInputSearchClearButton(page)).toBeHidden();

    await inputSearch.fill('test');

    await expect(getInputSearchClearButton(page)).toBeVisible();
  });

  test('should show clear button after programmatic value change', async ({ page }) => {
    await initInputSearch(page, { props: { name: 'Some name', label: 'Some label', clear: true } });
    const host = getHost(page);
    await expect(getInputSearchClearButton(page)).toBeHidden();

    await setProperty(host, 'value', 'test');

    await expect(getInputSearchClearButton(page)).toBeVisible();
  });

  test('should clear value after clear button is clicked', async ({ page }) => {
    await initInputSearch(page, { props: { name: 'Some name', label: 'Some label', clear: true, value: 'test' } });
    const host = getHost(page);
    const inputSearch = getInputSearch(page);
    const clearButton = getInputSearchClearButton(page);

    await expect(getInputSearchClearButton(page)).toBeVisible();
    await expect(host).toHaveJSProperty('value', 'test');
    await expect(inputSearch).toHaveValue('test');

    await clearButton.click();

    await expect(host).toHaveJSProperty('value', '');
    await expect(inputSearch).toHaveValue('');
    await expect(getInputSearchClearButton(page)).toBeHidden();
  });
});

test.describe('focus state', () => {
  test('should focus input-search when label is clicked', async ({ page }) => {
    await initInputSearch(page, { props: { name: 'Some name', label: 'Some label' } });
    const label = getLabel(page);
    const inputSearch = getInputSearch(page);

    await addEventListener(inputSearch, 'focus');
    expect((await getEventSummary(inputSearch, 'focus')).counter).toBe(0);

    await label.click();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputSearch, 'focus')).counter).toBe(1);
  });

  test('should focus input-search when host is focused', async ({ page }) => {
    await initInputSearch(page);
    const host = getHost(page);
    const inputSearch = getInputSearch(page);
    const inputSearchWrapper = getInputSearchWrapper(page);

    await addEventListener(inputSearch, 'focus');
    expect((await getEventSummary(inputSearch, 'focus')).counter).toBe(0);
    await expect(inputSearchWrapper).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await host.focus();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputSearch, 'focus')).counter).toBe(1);
    await expect(inputSearchWrapper).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });

  test('should focus input-search when clear is clicked', async ({ page }) => {
    await initInputSearch(page, { props: { name: 'Some name', label: 'Some label', clear: true, value: 'test' } });
    const inputSearch = getInputSearch(page);
    const clearButton = getInputSearchClearButton(page);

    await addEventListener(inputSearch, 'focus');
    expect((await getEventSummary(inputSearch, 'focus')).counter).toBe(0);

    await clearButton.click();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputSearch, 'focus')).counter).toBe(1);
  });

  test('should keep focus when switching to loading state', async ({ page }) => {
    await initInputSearch(page, { props: { name: 'Some name', label: 'Some label' } });
    const host = getHost(page);
    const inputSearch = getInputSearch(page);

    await expect(host).not.toBeFocused();
    await expect(inputSearch).not.toBeFocused();

    await page.keyboard.press('Tab');

    await expect(host).toBeFocused();
    await expect(inputSearch).toBeFocused();

    await setProperty(host, 'loading', true);

    await expect(host).toBeFocused();
    await expect(inputSearch).toBeFocused();
  });
});

test.describe('Event', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger a change event when input-search value is modified and focus is lost', async ({ page }) => {
      await initInputSearch(page);
      const host = getHost(page);
      const inputSearch = getInputSearch(page);

      await addEventListener(host, 'change');
      expect((await getEventSummary(host, 'change')).counter).toBe(0);

      await inputSearch.fill('20');
      await inputSearch.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter).toBe(1);
    });
    test('should trigger a blur event when the input-search loses focus', async ({ page }) => {
      await initInputSearch(page);
      const inputSearch = getInputSearch(page);
      const host = getHost(page);

      await addEventListener(host, 'blur');
      expect((await getEventSummary(host, 'blur')).counter).toBe(0);

      await inputSearch.click();
      await inputSearch.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'blur')).counter).toBe(1);
    });
  });
  test('should trigger an input event each time the input-search value is changed', async ({ page }) => {
    await initInputSearch(page);
    const inputSearch = getInputSearch(page);
    const host = getHost(page);

    await addEventListener(host, 'input');
    expect((await getEventSummary(host, 'input')).counter).toBe(0);

    await inputSearch.fill('1');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'input')).counter).toBe(1);
  });
  test('should trigger an input event when the clear button is clicked', async ({ page }) => {
    await initInputSearch(page, { props: { name: 'Some name', clear: true, value: 'some-value' } });
    const inputSearch = getInputSearch(page);
    const host = getHost(page);
    const inputSearchClearButton = getInputSearchClearButton(page);

    await addEventListener(host, 'input');
    await addEventListener(host, 'change');
    expect((await getEventSummary(host, 'input')).counter).toBe(0);

    await inputSearchClearButton.click();

    await expect(inputSearch).toHaveValue('');
    await expect(inputSearch).toBeFocused();
    expect((await getEventSummary(host, 'input')).counter).toBe(1);
  });
});

test.describe('hover state', () => {
  skipInBrowsers(['firefox', 'webkit']);
  const defaultBorderColor = 'rgb(107, 109, 112)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  test('should show hover state on input-search when label is hovered', async ({ page }) => {
    await initInputSearch(page, { props: { name: 'Some name', label: 'Some label' } });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = getLabel(page);
    const inputSearch = getInputSearch(page);
    const inputSearchWrapper = getInputSearchWrapper(page);

    await expect(inputSearchWrapper).toHaveCSS('border-color', defaultBorderColor);
    await inputSearch.hover();

    await expect(inputSearchWrapper).toHaveCSS('border-color', hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    await expect(inputSearchWrapper).toHaveCSS('border-color', defaultBorderColor);

    await label.hover();
    await expect(inputSearchWrapper).toHaveCSS('border-color', hoverBorderColor);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initInputSearch(page, {
      props: { name: 'Some name', state: 'error', clear: true, indicator: true },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-search'], 'componentDidLoad: p-input-search').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(3);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initInputSearch(page, {
      props: { name: 'Some name', state: 'error', clear: true, indicator: true },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const host = getHost(page);
    await setProperty(host, 'state', 'none');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-input-search'], 'componentDidUpdate: input-search').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after value change', async ({ page }) => {
    await initInputSearch(page, { props: { name: 'Some name', state: 'error', clear: true, indicator: true } });
    const host = getHost(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-search'], 'componentDidLoad: input-search').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);

    await setProperty(host, 'value', 10);
    await waitForStencilLifecycle(page);
    const statusAfterChange = await getLifecycleStatus(page);

    expect(statusAfterChange.componentDidUpdate['p-input-search'], 'componentDidUpdate: input-search').toBe(2);
    expect(statusAfterChange.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });
});
