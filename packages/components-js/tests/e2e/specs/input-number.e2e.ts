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

const getHost = (page: Page) => page.locator('p-input-number');
const getFieldset = (page: Page) => page.locator('fieldset');
const getInputNumber = (page: Page) => page.locator('p-input-number input');
const getInputNumberDecrement = (page: Page) => page.locator('p-input-number p-button-pure').nth(0);
const getInputNumberIncrement = (page: Page) => page.locator('p-input-number p-button-pure').nth(1);
const getInputNumberWrapper = (page: Page) => page.locator('p-input-number .wrapper');
const getLabel = (page: Page) => page.locator('p-input-number label');
const getForm = (page: Page) => page.locator('form');

type InitOptions = {
  props?: Components.PInputNumber;
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  isWithinForm?: boolean;
  markupBefore?: string;
  markupAfter?: string;
};

const initInputNumber = (page: Page, opts?: InitOptions): Promise<void> => {
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

  const markup = `${markupBefore}<p-input-number ${getHTMLAttributes(props)}>
      ${slottedLabel}
      ${slottedDescription}
      ${slottedMessage}
    </p-input-number>${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('value', () => {
  test('should sync value with input value', async ({ page }) => {
    const testValue = '10';
    await initInputNumber(page, { props: { name: 'some-name', value: testValue } });
    const host = getHost(page);
    const inputNumber = getInputNumber(page);

    await expect(host).toHaveJSProperty('value', testValue);
    await expect(inputNumber).toHaveJSProperty('value', testValue);
    await expect(inputNumber).toHaveValue(testValue);
  });

  test('should sync value with slotted content when typing', async ({ page }) => {
    await initInputNumber(page);
    const host = getHost(page);
    const inputNumber = getInputNumber(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputNumber).toHaveJSProperty('value', '');

    const testInput = '10';

    await inputNumber.fill(testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputNumber).toHaveJSProperty('value', testInput);
  });

  test('should sync slotted content with value when changed programmatically', async ({ page }) => {
    await initInputNumber(page);
    const host = getHost(page);
    const inputNumber = getInputNumber(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputNumber).toHaveJSProperty('value', '');

    const testInput = '10';

    await setProperty(host, 'value', testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputNumber).toHaveJSProperty('value', testInput);
    await expect(inputNumber).toHaveValue(testInput);
  });

  test('should allow controlled input via programmatic value updates in input listener', async ({ page }) => {
    await initInputNumber(page, { props: { name: 'some-name' } });
    const host = getHost(page);
    const inputNumber = getInputNumber(page);

    await expect(host).toHaveJSProperty('value', '');
    await expect(inputNumber).toHaveValue('');

    // Add input event listener that always sets value to '1'
    await page.evaluate(() => {
      const hostElement = document.querySelector('p-input-number');
      hostElement.addEventListener('input', () => {
        hostElement.value = '1';
      });
    });

    await inputNumber.focus();
    await expect(inputNumber).toBeFocused();

    await page.keyboard.press('2');
    // Value is overwritten in the input event listener
    await expect(host).toHaveJSProperty('value', '1');
    await expect(inputNumber).toHaveValue('1');

    await page.keyboard.press('7');
    // Value is overwritten in the input event listener
    await expect(host).toHaveJSProperty('value', '1');
    await expect(inputNumber).toHaveValue('1');
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = '10';
    await initInputNumber(page, {
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
    const value = '10';
    const formId = 'myForm';
    await initInputNumber(page, {
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
    await initInputNumber(page, {
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
    await initInputNumber(page, {
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
    const value = '10';
    const required = true;
    await initInputNumber(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputNumber = getInputNumber(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputNumber.fill('');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  });

  test('should prevent form submission after reset if the input-number is required and was initially empty', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initInputNumber(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputNumber = getInputNumber(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputNumber.fill('20');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should reset input-number value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = '10';
    const newValue = '20';
    const host = getHost(page);
    const inputNumber = getInputNumber(page);
    await initInputNumber(page, {
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

    await inputNumber.fill(newValue);
    await inputNumber.press('Tab');
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputNumber).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);
    await expect(inputNumber).toHaveValue(value);

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable input-number if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = '10';
    const host = getHost(page);
    await initInputNumber(page, {
      props: { name, value },
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initInputNumber(page, {
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });
    const host = getHost(page);
    const inputNumber = getInputNumber(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);
    await expect(inputNumber).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
    await expect(inputNumber).toHaveJSProperty('disabled', false);
  });

  test('should update form value correctly when value is changed via controls (stepUp)', async ({ page }) => {
    const name = 'name';
    await initInputNumber(page, {
      props: { name, label: 'Some label', controls: true, step: 5 },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    await addEventListener(form, 'submit');
    const host = getHost(page);
    const inputNumber = getInputNumber(page);
    const inputNumberIncrement = getInputNumberIncrement(page);

    await expect(host).toHaveJSProperty('value', '');
    await expect(inputNumber).toHaveValue('');

    await inputNumberIncrement.click();

    await expect(host).toHaveJSProperty('value', '5');
    await expect(inputNumber).toHaveValue('5');

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe('5');
  });

  test('should update form value correctly when value is changed via controls (stepDown)', async ({ page }) => {
    const name = 'name';
    await initInputNumber(page, {
      props: { name, label: 'Some label', controls: true, step: 5 },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    await addEventListener(form, 'submit');
    const host = getHost(page);
    const inputNumber = getInputNumber(page);
    const inputNumberDecrement = getInputNumberDecrement(page);

    await expect(host).toHaveJSProperty('value', '');
    await expect(inputNumber).toHaveValue('');

    await inputNumberDecrement.click();

    await expect(host).toHaveJSProperty('value', '-5');
    await expect(inputNumber).toHaveValue('-5');

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe('-5');
  });

  test.describe('implicit form submission on enter key', () => {
    test('should implicit submit form on enter when there is a p-button type submit', async ({ page }) => {
      await initInputNumber(page, {
        isWithinForm: true,
        markupAfter: `<p-button type="submit">Submit</p-button>`,
      });

      const inputNumber = getInputNumber(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputNumber.click();
      await expect(inputNumber).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is a native button type submit', async ({ page }) => {
      await initInputNumber(page, {
        isWithinForm: true,
        markupAfter: `<button type="submit">Submit</button>`,
      });

      const inputNumber = getInputNumber(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputNumber.click();
      await expect(inputNumber).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is no submit button and no blocking elements', async ({
      page,
    }) => {
      await initInputNumber(page, {
        isWithinForm: true,
      });

      const inputNumber = getInputNumber(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputNumber.click();
      await expect(inputNumber).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should not implicit submit form on enter when there is no submit button and a native input type text', async ({
      page,
    }) => {
      await initInputNumber(page, {
        isWithinForm: true,
        markupAfter: `<input name="some-input" type="text" />`,
      });

      const inputNumber = getInputNumber(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputNumber.click();
      await expect(inputNumber).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });

    test('should not implicit submit form on enter when there is no submit button and a p-input-text', async ({
      page,
    }) => {
      await initInputNumber(page, {
        isWithinForm: true,
        markupAfter: `<p-input-text name="some-input" />`,
      });

      const inputNumber = getInputNumber(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputNumber.click();
      await expect(inputNumber).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });
  });

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initInputNumber(page, {
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
    await initInputNumber(page, {
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
  test('should focus input-number when label is clicked', async ({ page }) => {
    await initInputNumber(page, { props: { name: 'some-name', label: 'Some label' } });
    const label = getLabel(page);
    const inputNumber = getInputNumber(page);

    await expect(inputNumber).not.toBeFocused();

    await label.click();
    await expect(inputNumber).toBeFocused();
  });

  test('should focus input-number when host is focused', async ({ page }) => {
    await initInputNumber(page);
    const host = getHost(page);
    const inputNumber = getInputNumber(page);

    await expect(inputNumber).not.toBeFocused();
    // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
    // await expect(inputNumberWNapper).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await host.focus();
    await waitForStencilLifecycle(page);
    await expect(inputNumber).toBeFocused();
    // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
    // await expect(inputNumberWNapper).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });

  test('should keep focus when switching to loading state', async ({ page }) => {
    await initInputNumber(page, { props: { name: 'Some name', label: 'Some label' } });
    const host = getHost(page);
    const inputNumber = getInputNumber(page);

    await expect(host).not.toBeFocused();
    await expect(inputNumber).not.toBeFocused();

    await page.keyboard.press('Tab');

    await expect(host).toBeFocused();
    await expect(inputNumber).toBeFocused();

    await setProperty(host, 'loading', true);

    await expect(host).toBeFocused();
    await expect(inputNumber).toBeFocused();
  });
});

test.describe('Event', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger a change event when input-number value is modified and focus is lost', async ({ page }) => {
      await initInputNumber(page);
      const host = getHost(page);
      const inputNumber = getInputNumber(page);

      await addEventListener(host, 'change');
      expect((await getEventSummary(host, 'change')).counter).toBe(0);

      await inputNumber.fill('20');
      await inputNumber.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter).toBe(1);
    });
    test('should trigger a blur event when the input-number loses focus', async ({ page }) => {
      await initInputNumber(page);
      const inputNumber = getInputNumber(page);
      const host = getHost(page);

      await addEventListener(host, 'blur');
      expect((await getEventSummary(host, 'blur')).counter).toBe(0);

      await inputNumber.click();
      await inputNumber.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'blur')).counter).toBe(1);
    });
  });
  test('should trigger an input event each time the input-number value is changed', async ({ page }) => {
    await initInputNumber(page);
    const inputNumber = getInputNumber(page);
    const host = getHost(page);

    await addEventListener(host, 'input');
    expect((await getEventSummary(host, 'input')).counter).toBe(0);

    await inputNumber.fill('1');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'input')).counter).toBe(1);
  });
  test('should trigger an input and change event when the controls are clicked', async ({ page }) => {
    await initInputNumber(page, { props: { name: 'some-name', controls: true } });
    const inputNumber = getInputNumber(page);
    const host = getHost(page);
    const inputNumberIncrement = getInputNumberIncrement(page);
    const inputNumberDecrement = getInputNumberDecrement(page);

    await addEventListener(host, 'input');
    await addEventListener(host, 'change');
    expect((await getEventSummary(host, 'input')).counter).toBe(0);
    expect((await getEventSummary(host, 'change')).counter).toBe(0);

    await inputNumberIncrement.click();

    await expect(inputNumber).toHaveValue('1');
    expect((await getEventSummary(host, 'input')).counter).toBe(1);
    expect((await getEventSummary(host, 'change')).counter).toBe(1);

    await inputNumberDecrement.click();

    await expect(inputNumber).toHaveValue('0');
    expect((await getEventSummary(host, 'input')).counter).toBe(2);
    expect((await getEventSummary(host, 'change')).counter).toBe(2);
  });
});

// Test skipped because Playwright can only evaluate RGB colors, not RGBA.
test.skip('hover state', () => {
  skipInBrowsers(['firefox', 'webkit']);
  const defaultBorderColor = 'rgb(107, 109, 112)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  test('should show hover state on input-number when label is hovered', async ({ page }) => {
    await initInputNumber(page, { props: { name: 'some-name', label: 'Some label' } });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = getLabel(page);
    const inputNumber = getInputNumber(page);
    const inputNumberWrapper = getInputNumberWrapper(page);

    await expect(inputNumberWrapper).toHaveCSS('border-color', defaultBorderColor);
    await inputNumber.hover();

    await expect(inputNumberWrapper).toHaveCSS('border-color', hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    await expect(inputNumberWrapper).toHaveCSS('border-color', defaultBorderColor);

    await label.hover();
    await expect(inputNumberWrapper).toHaveCSS('border-color', hoverBorderColor);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initInputNumber(page, {
      props: { name: 'some-name', state: 'error', controls: true },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-number'], 'componentDidLoad: p-input-number').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(3);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(2);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(6);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initInputNumber(page, {
      props: { name: 'some-name', state: 'error', controls: true },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const host = getHost(page);
    await setProperty(host, 'state', 'none');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-input-number'], 'componentDidUpdate: input-number').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(6);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after value change', async ({ page }) => {
    await initInputNumber(page, { props: { name: 'some-name', state: 'error', controls: true } });
    const host = getHost(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-number'], 'componentDidLoad: input-number').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);

    await setProperty(host, 'value', 10);
    await waitForStencilLifecycle(page);
    const statusAfterChange = await getLifecycleStatus(page);

    expect(statusAfterChange.componentDidUpdate['p-input-number'], 'componentDidUpdate: input-number').toBe(1);
    expect(statusAfterChange.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('Controls', () => {
  test('should increment value by step', async ({ page }) => {
    await initInputNumber(page, { props: { name: 'some-name', label: 'Some label', controls: true, step: 5 } });
    const host = getHost(page);
    const inputNumber = getInputNumber(page);
    const inputNumberIncrement = getInputNumberIncrement(page);

    await setProperty(host, 'value', 10);
    await expect(inputNumber).toHaveValue('10');

    await inputNumberIncrement.click();

    await expect(inputNumber).toBeFocused();
    await expect(host).toHaveJSProperty('value', '15');
    await expect(inputNumber).toHaveValue('15');
  });

  test('should decrement value by step', async ({ page }) => {
    await initInputNumber(page, { props: { name: 'some-name', label: 'Some label', controls: true, step: 5 } });
    const host = getHost(page);
    const inputNumber = getInputNumber(page);
    const inputNumberDecrement = getInputNumberDecrement(page);

    await setProperty(host, 'value', 10);
    await expect(inputNumber).toHaveValue('10');

    await inputNumberDecrement.click();

    await expect(inputNumber).toBeFocused();
    await expect(host).toHaveJSProperty('value', '5');
    await expect(inputNumber).toHaveValue('5');
  });

  test('should not decrement value below min', async ({ page }) => {
    await initInputNumber(page, { props: { name: 'some-name', label: 'Some label', controls: true, step: 3, min: 2 } });
    const host = getHost(page);
    const inputNumber = getInputNumber(page);
    const inputNumberDecrement = getInputNumberDecrement(page);

    await setProperty(host, 'value', 6);
    await expect(inputNumber).toHaveValue('6');

    await inputNumberDecrement.click();

    await expect(inputNumber).toBeFocused();
    // stepDown from native input chooses next value starting from min + step
    await expect(host).toHaveJSProperty('value', '5');
    await expect(inputNumber).toHaveValue('5');

    await inputNumberDecrement.click();

    await expect(inputNumber).toBeFocused();
    await expect(host).toHaveJSProperty('value', '2');
    await expect(inputNumber).toHaveValue('2');

    await inputNumberDecrement.click();

    await expect(inputNumber).toBeFocused();
    await expect(host).toHaveJSProperty('value', '2');
    await expect(inputNumber).toHaveValue('2');
  });

  test('should not increment value above max', async ({ page }) => {
    await initInputNumber(page, { props: { name: 'some-name', label: 'Some label', controls: true, step: 3, max: 8 } });
    const host = getHost(page);
    const inputNumber = getInputNumber(page);
    const inputNumberIncrement = getInputNumberIncrement(page);

    await setProperty(host, 'value', 3);
    await expect(inputNumber).toHaveValue('3');

    await inputNumberIncrement.click();

    await expect(inputNumber).toBeFocused();
    await expect(host).toHaveJSProperty('value', '6');
    await expect(inputNumber).toHaveValue('6');

    await inputNumberIncrement.click();

    await expect(inputNumber).toBeFocused();
    await expect(host).toHaveJSProperty('value', '6');
    await expect(inputNumber).toHaveValue('6');
  });
});
