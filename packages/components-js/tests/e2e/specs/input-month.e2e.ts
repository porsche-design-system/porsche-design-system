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

const getHost = (page: Page) => page.locator('p-input-month');
const getFieldset = (page: Page) => page.locator('fieldset');
const getInputMonth = (page: Page) => page.locator('p-input-month input');
const getInputMonthShowPickerButton = (page: Page) => page.locator('p-input-month p-button-pure');
const getInputMonthWrapper = (page: Page) => page.locator('p-input-month .wrapper');
const getLabel = (page: Page) => page.locator('p-input-month label');
const getForm = (page: Page) => page.locator('form');

type InitOptions = {
  props?: Components.PInputMonth;
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  isWithinForm?: boolean;
  markupBefore?: string;
  markupAfter?: string;
};

const initInputMonth = (page: Page, opts?: InitOptions): Promise<void> => {
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

  const markup = `${markupBefore}<p-input-month ${getHTMLAttributes(props)}>
      ${slottedLabel}
      ${slottedDescription}
      ${slottedMessage}
    </p-input-month>${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('value', () => {
  test('should sync value with input value', async ({ page }) => {
    const testValue = '2025-05';
    await initInputMonth(page, { props: { name: 'some-name', value: testValue } });
    const host = getHost(page);
    const inputMonth = getInputMonth(page);

    await expect(host).toHaveJSProperty('value', testValue);
    await expect(inputMonth).toHaveJSProperty('value', testValue);
    await expect(inputMonth).toHaveValue(testValue);
  });

  test('should sync value with slotted content when typing', async ({ page }) => {
    await initInputMonth(page);
    const host = getHost(page);
    const inputMonth = getInputMonth(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputMonth).toHaveJSProperty('value', '');

    const testInput = '2025-05';

    await inputMonth.fill(testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputMonth).toHaveJSProperty('value', testInput);
  });

  test('should sync slotted content with value when changed programmatically', async ({ page }) => {
    await initInputMonth(page);
    const host = getHost(page);
    const inputMonth = getInputMonth(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputMonth).toHaveJSProperty('value', '');

    const testInput = '2025-05';

    await setProperty(host, 'value', testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputMonth).toHaveJSProperty('value', testInput);
    await expect(inputMonth).toHaveValue(testInput);
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = '2025-05';
    await initInputMonth(page, {
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
    const value = '2025-05';
    const formId = 'myForm';
    await initInputMonth(page, {
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
    await initInputMonth(page, {
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

  test('should submit form after dynamically setting `required` to false on an initially required, empty input', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initInputMonth(page, {
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
    const value = '2025-05';
    const required = true;
    await initInputMonth(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputMonth = getInputMonth(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputMonth.fill('');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  });

  test('should prevent form submission after reset if the input-month is required and was initially empty', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initInputMonth(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputMonth = getInputMonth(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputMonth.fill('2025-05');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should reset input-month value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = '2025-05';
    const newValue = '2025-10';
    const host = getHost(page);
    const inputMonth = getInputMonth(page);
    await initInputMonth(page, {
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

    await inputMonth.fill(newValue);
    await inputMonth.press('Tab');
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputMonth).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);
    await expect(inputMonth).toHaveValue(value);

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable input-month if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = '2025-05';
    const host = getHost(page);
    await initInputMonth(page, {
      props: { name, value },
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initInputMonth(page, {
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });
    const host = getHost(page);
    const inputMonth = getInputMonth(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);
    await expect(inputMonth).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
    await expect(inputMonth).toHaveJSProperty('disabled', false);
  });

  test.describe('implicit form submission on enter key', () => {
    test('should implicit submit form on enter when there is a p-button type submit', async ({ page }) => {
      await initInputMonth(page, {
        isWithinForm: true,
        markupAfter: `<p-button type="submit">Submit</p-button>`,
      });

      const inputMonth = getInputMonth(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputMonth.click();
      await expect(inputMonth).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is a native button type submit', async ({ page }) => {
      await initInputMonth(page, {
        isWithinForm: true,
        markupAfter: `<button type="submit">Submit</button>`,
      });

      const inputMonth = getInputMonth(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputMonth.click();
      await expect(inputMonth).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is no submit button and no blocking elements', async ({
      page,
    }) => {
      await initInputMonth(page, {
        isWithinForm: true,
      });

      const inputMonth = getInputMonth(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputMonth.click();
      await expect(inputMonth).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should not implicit submit form on enter when there is no submit button and a native input type text', async ({
      page,
    }) => {
      await initInputMonth(page, {
        isWithinForm: true,
        markupAfter: `<input name="some-input" type="text" />`,
      });

      const inputMonth = getInputMonth(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputMonth.click();
      await expect(inputMonth).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });

    test('should not implicit submit form on enter when there is no submit button and a p-input-text', async ({
      page,
    }) => {
      await initInputMonth(page, {
        isWithinForm: true,
        markupAfter: `<p-input-text name="some-input" />`,
      });

      const inputMonth = getInputMonth(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputMonth.click();
      await expect(inputMonth).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });
  });

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initInputMonth(page, {
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
    await initInputMonth(page, {
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

test.describe('focus state', () => {
  test('should focus input-month when label is clicked', async ({ page }) => {
    await initInputMonth(page, { props: { name: 'some-name', label: 'Some label' } });
    const label = getLabel(page);
    const inputMonth = getInputMonth(page);

    await addEventListener(inputMonth, 'focus');
    expect((await getEventSummary(inputMonth, 'focus')).counter).toBe(0);

    await label.click();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputMonth, 'focus')).counter).toBe(1);
  });

  test('should focus input-month when host is focused', async ({ page }) => {
    await initInputMonth(page);
    const host = getHost(page);
    const inputMonth = getInputMonth(page);
    const inputMonthWrapper = getInputMonthWrapper(page);

    await addEventListener(inputMonth, 'focus');
    expect((await getEventSummary(inputMonth, 'focus')).counter).toBe(0);
    await expect(inputMonthWrapper).toHaveCSS('border-color', 'rgba(79, 80, 89, 0.325)');

    await host.focus();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputMonth, 'focus')).counter).toBe(1);
    await expect(inputMonthWrapper).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });

  test('should keep focus when switching to loading state', async ({ page }) => {
    await initInputMonth(page, { props: { name: 'Some name', label: 'Some label' } });
    const host = getHost(page);
    const inputMonth = getInputMonth(page);

    await expect(host).not.toBeFocused();
    await expect(inputMonth).not.toBeFocused();

    await page.keyboard.press('Tab');

    await expect(host).toBeFocused();
    await expect(inputMonth).toBeFocused();

    await setProperty(host, 'loading', true);

    await expect(host).toBeFocused();
    await expect(inputMonth).toBeFocused();
  });
});

test.describe('Event', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger a change event when input-month value is modified and focus is lost', async ({ page }) => {
      await initInputMonth(page);
      const host = getHost(page);
      const inputMonth = getInputMonth(page);

      await addEventListener(host, 'change');
      expect((await getEventSummary(host, 'change')).counter).toBe(0);

      await inputMonth.fill('2025-05');
      await inputMonth.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter).toBe(1);
    });
    test('should trigger a blur event when the input-month loses focus', async ({ page }) => {
      await initInputMonth(page);
      const inputMonth = getInputMonth(page);
      const host = getHost(page);

      await addEventListener(host, 'blur');
      expect((await getEventSummary(host, 'blur')).counter).toBe(0);

      await inputMonth.click();

      // Press Tab three times to cycle through the three internal segments of the native date input:
      // day, month, and year — each is a separate tabbable field in most browsers.
      await inputMonth.press('Tab');
      await inputMonth.press('Tab');
      await inputMonth.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'blur')).counter).toBe(1);
    });
  });
  test('should trigger an input event each time the input-month value is changed', async ({ page }) => {
    await initInputMonth(page);
    const inputMonth = getInputMonth(page);
    const host = getHost(page);

    await addEventListener(host, 'input');
    expect((await getEventSummary(host, 'input')).counter).toBe(0);

    await inputMonth.fill('2025-05');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'input')).counter).toBe(1);
  });
});

test.describe('hover state', () => {
  skipInBrowsers(['firefox', 'webkit']);
  const defaultBorderColor = 'rgba(79, 80, 89, 0.325)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  test('should show hover state on input-month when label is hovered', async ({ page }) => {
    await initInputMonth(page, { props: { name: 'some-name', label: 'Some label' } });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = getLabel(page);
    const inputMonth = getInputMonth(page);
    const inputMonthWrapper = getInputMonthWrapper(page);

    await expect(inputMonthWrapper).toHaveCSS('border-color', defaultBorderColor);
    await inputMonth.hover();

    await expect(inputMonthWrapper).toHaveCSS('border-color', hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    await expect(inputMonthWrapper).toHaveCSS('border-color', defaultBorderColor);

    await label.hover();
    await expect(inputMonthWrapper).toHaveCSS('border-color', hoverBorderColor);
  });
});

test.describe('lifecycle', () => {
  skipInBrowsers(['firefox', 'webkit']);
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initInputMonth(page, {
      props: { name: 'some-name', state: 'error' },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-month'], 'componentDidLoad: p-input-month').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initInputMonth(page, {
      props: { name: 'some-name', state: 'error' },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const host = getHost(page);
    await setProperty(host, 'state', 'none');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-input-month'], 'componentDidUpdate: input-month').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after value change', async ({ page }) => {
    await initInputMonth(page, { props: { name: 'some-name', state: 'error' } });
    const host = getHost(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-month'], 'componentDidLoad: input-month').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);

    await setProperty(host, 'value', '2025-05');
    await waitForStencilLifecycle(page);
    const statusAfterChange = await getLifecycleStatus(page);

    expect(statusAfterChange.componentDidUpdate['p-input-month'], 'componentDidUpdate: input-month').toBe(1);
    expect(statusAfterChange.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('Picker', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test.beforeEach(async ({ page }) => {
      await initInputMonth(page, { props: { name: 'some-name' } });

      const inputMonth = getInputMonth(page);
      await inputMonth.waitFor();

      await inputMonth.evaluate((input: HTMLInputElement) => {
        (input as any).showPickerCalled = false;
        const original = input.showPicker;
        input.showPicker = function () {
          (input as any).showPickerCalled = true;
          if (original) original.call(input);
        };
      });
    });

    test('should call showPicker when calendar button is clicked', async ({ page }) => {
      const inputMonth = getInputMonth(page);
      const inputMonthShowPickerButton = getInputMonthShowPickerButton(page);

      await inputMonthShowPickerButton.click();

      const called = await inputMonth.evaluate((input: HTMLInputElement) => {
        return (input as any).showPickerCalled;
      });
      expect(called).toBe(true);
    });

    test('should call showPicker when calendar button is activated with keyboard', async ({ page }) => {
      const inputMonth = getInputMonth(page);
      const inputMonthShowPickerButton = getInputMonthShowPickerButton(page);
      await inputMonth.click();

      await inputMonth.press('Tab');
      await inputMonth.press('Tab');
      await expect(inputMonthShowPickerButton).toBeFocused();
      await page.keyboard.press('Enter');

      const called = await inputMonth.evaluate((input: HTMLInputElement) => {
        return (input as any).showPickerCalled;
      });
      expect(called).toBe(true);
    });
  });
});
