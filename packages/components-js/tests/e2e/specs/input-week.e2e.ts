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

const getHost = (page: Page) => page.locator('p-input-week');
const getFieldset = (page: Page) => page.locator('fieldset');
const getInputWeek = (page: Page) => page.locator('p-input-week input');
const getInputWeekShowPickerButton = (page: Page) => page.locator('p-input-week p-button-pure');
const getInputWeekWrapper = (page: Page) => page.locator('p-input-week .wrapper');
const getLabel = (page: Page) => page.locator('p-input-week label');
const getForm = (page: Page) => page.locator('form');

type InitOptions = {
  props?: Components.PInputWeek;
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  isWithinForm?: boolean;
  markupBefore?: string;
  markupAfter?: string;
};

const initInputWeek = (page: Page, opts?: InitOptions): Promise<void> => {
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

  const markup = `${markupBefore}<p-input-week ${getHTMLAttributes(props)}>
      ${slottedLabel}
      ${slottedDescription}
      ${slottedMessage}
    </p-input-week>${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('value', () => {
  test('should sync value with input value', async ({ page }) => {
    const testValue = '2025-W26';
    await initInputWeek(page, { props: { name: 'some-name', value: testValue } });
    const host = getHost(page);
    const inputWeek = getInputWeek(page);

    await expect(host).toHaveJSProperty('value', testValue);
    await expect(inputWeek).toHaveJSProperty('value', testValue);
    await expect(inputWeek).toHaveValue(testValue);
  });

  test('should sync value with slotted content when typing', async ({ page }) => {
    await initInputWeek(page);
    const host = getHost(page);
    const inputWeek = getInputWeek(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputWeek).toHaveJSProperty('value', '');

    const testInput = '2025-W26';

    await inputWeek.fill(testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputWeek).toHaveJSProperty('value', testInput);
  });

  test('should sync slotted content with value when changed programmatically', async ({ page }) => {
    await initInputWeek(page);
    const host = getHost(page);
    const inputWeek = getInputWeek(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputWeek).toHaveJSProperty('value', '');

    const testInput = '2025-W26';

    await setProperty(host, 'value', testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputWeek).toHaveJSProperty('value', testInput);
    await expect(inputWeek).toHaveValue(testInput);
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = '2025-W26';
    await initInputWeek(page, {
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
    const value = '2025-W26';
    const formId = 'myForm';
    await initInputWeek(page, {
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
    await initInputWeek(page, {
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
    await initInputWeek(page, {
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
    const value = '2025-W26';
    const required = true;
    await initInputWeek(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputWeek = getInputWeek(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputWeek.fill('');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  });

  test('should prevent form submission after reset if the input-week is required and was initially empty', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initInputWeek(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputWeek = getInputWeek(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputWeek.fill('2025-W26');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should reset input-week value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = '2025-W26';
    const newValue = '2025-W30';
    const host = getHost(page);
    const inputWeek = getInputWeek(page);
    await initInputWeek(page, {
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

    await inputWeek.fill(newValue);
    await inputWeek.press('Tab');
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputWeek).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);
    await expect(inputWeek).toHaveValue(value);

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable input-week if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = '2025-W26';
    const host = getHost(page);
    await initInputWeek(page, {
      props: { name, value },
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initInputWeek(page, {
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });
    const host = getHost(page);
    const inputWeek = getInputWeek(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);
    await expect(inputWeek).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
    await expect(inputWeek).toHaveJSProperty('disabled', false);
  });

  test.describe('implicit form submission on enter key', () => {
    test('should implicit submit form on enter when there is a p-button type submit', async ({ page }) => {
      await initInputWeek(page, {
        isWithinForm: true,
        markupAfter: `<p-button type="submit">Submit</p-button>`,
      });

      const inputWeek = getInputWeek(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputWeek.click();
      await expect(inputWeek).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is a native button type submit', async ({ page }) => {
      await initInputWeek(page, {
        isWithinForm: true,
        markupAfter: `<button type="submit">Submit</button>`,
      });

      const inputWeek = getInputWeek(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputWeek.click();
      await expect(inputWeek).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is no submit button and no blocking elements', async ({
      page,
    }) => {
      await initInputWeek(page, {
        isWithinForm: true,
      });

      const inputWeek = getInputWeek(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputWeek.click();
      await expect(inputWeek).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should not implicit submit form on enter when there is no submit button and a native input type text', async ({
      page,
    }) => {
      await initInputWeek(page, {
        isWithinForm: true,
        markupAfter: `<input name="some-input" type="text" />`,
      });

      const inputWeek = getInputWeek(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputWeek.click();
      await expect(inputWeek).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });

    test('should not implicit submit form on enter when there is no submit button and a p-input-text', async ({
      page,
    }) => {
      await initInputWeek(page, {
        isWithinForm: true,
        markupAfter: `<p-input-text name="some-input" />`,
      });

      const inputWeek = getInputWeek(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputWeek.click();
      await expect(inputWeek).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });
  });

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initInputWeek(page, {
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
    await initInputWeek(page, {
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
  test('should focus input-week when label is clicked', async ({ page }) => {
    await initInputWeek(page, { props: { name: 'some-name', label: 'Some label' } });
    const label = getLabel(page);
    const inputWeek = getInputWeek(page);

    await addEventListener(inputWeek, 'focus');
    expect((await getEventSummary(inputWeek, 'focus')).counter).toBe(0);

    await label.click();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputWeek, 'focus')).counter).toBe(1);
  });

  test('should focus input-week when host is focused', async ({ page }) => {
    await initInputWeek(page);
    const host = getHost(page);
    const inputWeek = getInputWeek(page);
    const inputWeekWrapper = getInputWeekWrapper(page);

    await addEventListener(inputWeek, 'focus');
    expect((await getEventSummary(inputWeek, 'focus')).counter).toBe(0);
    await expect(inputWeekWrapper).toHaveCSS('border-color', 'rgba(79, 80, 89, 0.325)');

    await host.focus();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputWeek, 'focus')).counter).toBe(1);
    await expect(inputWeekWrapper).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });

  test('should keep focus when switching to loading state', async ({ page }) => {
    await initInputWeek(page, { props: { name: 'Some name', label: 'Some label' } });
    const host = getHost(page);
    const inputWeek = getInputWeek(page);

    await expect(host).not.toBeFocused();
    await expect(inputWeek).not.toBeFocused();

    await page.keyboard.press('Tab');

    await expect(host).toBeFocused();
    await expect(inputWeek).toBeFocused();

    await setProperty(host, 'loading', true);

    await expect(host).toBeFocused();
    await expect(inputWeek).toBeFocused();
  });
});

test.describe('Event', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger a change event when input-week value is modified and focus is lost', async ({ page }) => {
      await initInputWeek(page);
      const host = getHost(page);
      const inputWeek = getInputWeek(page);

      await addEventListener(host, 'change');
      expect((await getEventSummary(host, 'change')).counter).toBe(0);

      await inputWeek.fill('2025-W26');
      await inputWeek.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter).toBe(1);
    });
    test('should trigger a blur event when the input-week loses focus', async ({ page }) => {
      await initInputWeek(page);
      const inputWeek = getInputWeek(page);
      const host = getHost(page);

      await addEventListener(host, 'blur');
      expect((await getEventSummary(host, 'blur')).counter).toBe(0);

      await inputWeek.click();

      // Press Tab three times to cycle through the three internal segments of the native date input:
      // day, month, and year — each is a separate tabbable field in most browsers.
      await inputWeek.press('Tab');
      await inputWeek.press('Tab');
      await inputWeek.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'blur')).counter).toBe(1);
    });
  });
  test('should trigger an input event each time the input-week value is changed', async ({ page }) => {
    await initInputWeek(page);
    const inputWeek = getInputWeek(page);
    const host = getHost(page);

    await addEventListener(host, 'input');
    expect((await getEventSummary(host, 'input')).counter).toBe(0);

    await inputWeek.fill('2025-W26');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'input')).counter).toBe(1);
  });
});

test.describe('hover state', () => {
  skipInBrowsers(['firefox', 'webkit']);
  const defaultBorderColor = 'rgba(79, 80, 89, 0.325)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  test('should show hover state on input-week when label is hovered', async ({ page }) => {
    await initInputWeek(page, { props: { name: 'some-name', label: 'Some label' } });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = getLabel(page);
    const inputWeek = getInputWeek(page);
    const inputWeekWrapper = getInputWeekWrapper(page);

    await expect(inputWeekWrapper).toHaveCSS('border-color', defaultBorderColor);
    await inputWeek.hover();

    await expect(inputWeekWrapper).toHaveCSS('border-color', hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    await expect(inputWeekWrapper).toHaveCSS('border-color', defaultBorderColor);

    await label.hover();
    await expect(inputWeekWrapper).toHaveCSS('border-color', hoverBorderColor);
  });
});

test.describe('lifecycle', () => {
  skipInBrowsers(['firefox', 'webkit']);
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initInputWeek(page, {
      props: { name: 'some-name', state: 'error' },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-week'], 'componentDidLoad: p-input-week').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initInputWeek(page, {
      props: { name: 'some-name', state: 'error' },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const host = getHost(page);
    await setProperty(host, 'state', 'none');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-input-week'], 'componentDidUpdate: input-week').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after value change', async ({ page }) => {
    await initInputWeek(page, { props: { name: 'some-name', state: 'error' } });
    const host = getHost(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-week'], 'componentDidLoad: input-week').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);

    await setProperty(host, 'value', '2025-W26');
    await waitForStencilLifecycle(page);
    const statusAfterChange = await getLifecycleStatus(page);

    expect(statusAfterChange.componentDidUpdate['p-input-week'], 'componentDidUpdate: input-week').toBe(1);
    expect(statusAfterChange.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('Picker', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test.beforeEach(async ({ page }) => {
      await initInputWeek(page, { props: { name: 'some-name' } });

      const inputWeek = getInputWeek(page);
      await inputWeek.waitFor();

      await inputWeek.evaluate((input: HTMLInputElement) => {
        (input as any).showPickerCalled = false;
        const original = input.showPicker;
        input.showPicker = function () {
          (input as any).showPickerCalled = true;
          if (original) original.call(input);
        };
      });
    });

    test('should call showPicker when calendar button is clicked', async ({ page }) => {
      const inputWeek = getInputWeek(page);
      const inputWeekShowPickerButton = getInputWeekShowPickerButton(page);

      await inputWeekShowPickerButton.click();

      const called = await inputWeek.evaluate((input: HTMLInputElement) => {
        return (input as any).showPickerCalled;
      });
      expect(called).toBe(true);
    });

    test('should call showPicker when calendar button is activated with keyboard', async ({ page }) => {
      const inputWeek = getInputWeek(page);
      const inputWeekShowPickerButton = getInputWeekShowPickerButton(page);
      await inputWeek.click();

      await inputWeek.press('Tab');
      await inputWeek.press('Tab');
      await expect(inputWeekShowPickerButton).toBeFocused();
      await page.keyboard.press('Enter');

      const called = await inputWeek.evaluate((input: HTMLInputElement) => {
        return (input as any).showPickerCalled;
      });
      expect(called).toBe(true);
    });
  });
});
