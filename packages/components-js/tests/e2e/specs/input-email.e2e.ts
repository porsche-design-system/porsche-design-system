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

const getHost = (page: Page) => page.locator('p-input-email');
const getFieldset = (page: Page) => page.locator('fieldset');
const getInputEmail = (page: Page) => page.locator('p-input-email input');
const getInputEmailWrapper = (page: Page) => page.locator('p-input-email .wrapper');
const getLabel = (page: Page) => page.locator('p-input-email label');
const getForm = (page: Page) => page.locator('form');

type InitOptions = {
  props?: Components.PInputEmail;
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  isWithinForm?: boolean;
  markupBefore?: string;
  markupAfter?: string;
};

const initInputEmail = (page: Page, opts?: InitOptions): Promise<void> => {
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

  const markup = `${markupBefore}<p-input-email ${getHTMLAttributes(props)}>
      ${slottedLabel}
      ${slottedDescription}
      ${slottedMessage}
    </p-input-email>${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('value', () => {
  test('should sync value with input value', async ({ page }) => {
    const testValue = '10';
    await initInputEmail(page, { props: { name: 'some-name', value: testValue } });
    const host = getHost(page);
    const inputEmail = getInputEmail(page);

    await expect(host).toHaveJSProperty('value', testValue);
    await expect(inputEmail).toHaveJSProperty('value', testValue);
  });

  test('should sync value with slotted content when typing', async ({ page }) => {
    await initInputEmail(page);
    const host = getHost(page);
    const inputEmail = getInputEmail(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputEmail).toHaveJSProperty('value', '');

    const testInput = 'example@porsche.de';

    await inputEmail.fill(testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputEmail).toHaveJSProperty('value', testInput);
  });

  test('should sync slotted content with value when changed programmatically', async ({ page }) => {
    await initInputEmail(page);
    const host = getHost(page);
    const inputEmail = getInputEmail(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputEmail).toHaveJSProperty('value', '');

    const testInput = 'example@porsche.de';

    await setProperty(host, 'value', testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputEmail).toHaveJSProperty('value', testInput);
    await expect(inputEmail).toHaveValue(testInput);
  });

  test('should allow controlled input via programmatic value updates in input listener', async ({ page }) => {
    await initInputEmail(page, { props: { name: 'some-name' } });
    const host = getHost(page);
    const inputEmail = getInputEmail(page);

    await expect(host).toHaveJSProperty('value', '');
    await expect(inputEmail).toHaveValue('');

    // Add input event listener that always sets value to 'b'
    await page.evaluate(() => {
      const hostElement = document.querySelector('p-input-email');
      hostElement.addEventListener('input', () => {
        hostElement.value = 'b';
      });
    });

    await inputEmail.focus();
    await expect(inputEmail).toBeFocused();

    await page.keyboard.press('a');
    // Value is overwritten in the input event listener
    await expect(host).toHaveJSProperty('value', 'b');
    await expect(inputEmail).toHaveValue('b');

    await page.keyboard.press('c');
    // Value is overwritten in the input event listener
    await expect(host).toHaveJSProperty('value', 'b');
    await expect(inputEmail).toHaveValue('b');
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = 'example@porsche.de';
    await initInputEmail(page, {
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
    const value = 'example@porsche.de';
    const formId = 'myForm';
    await initInputEmail(page, {
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
    await initInputEmail(page, {
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
    await initInputEmail(page, {
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
    const value = 'example@porsche.de';
    const required = true;
    await initInputEmail(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputEmail = getInputEmail(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputEmail.fill('');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  });

  test('should prevent form submission after reset if the input-email is required and was initially empty', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initInputEmail(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputEmail = getInputEmail(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputEmail.fill('example@porsche.de');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should reset input-email value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = 'example@porsche.de';
    const newValue = 'hello@porsche.de';
    const host = getHost(page);
    const inputEmail = getInputEmail(page);
    await initInputEmail(page, {
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

    await inputEmail.fill(newValue);
    await inputEmail.press('Tab');
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputEmail).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);
    await expect(inputEmail).toHaveValue(value);

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable input-email if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = 'example@porsche.de';
    const host = getHost(page);
    await initInputEmail(page, {
      props: { name, value },
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initInputEmail(page, {
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });
    const host = getHost(page);
    const inputEmail = getInputEmail(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);
    await expect(inputEmail).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
    await expect(inputEmail).toHaveJSProperty('disabled', false);
  });

  test.describe('implicit form submission on enter key', () => {
    test('should implicit submit form on enter when there is a p-button type submit', async ({ page }) => {
      await initInputEmail(page, {
        isWithinForm: true,
        markupAfter: `<p-button type="submit">Submit</p-button>`,
      });

      const inputEmail = getInputEmail(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputEmail.click();
      await expect(inputEmail).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is a native button type submit', async ({ page }) => {
      await initInputEmail(page, {
        isWithinForm: true,
        markupAfter: `<button type="submit">Submit</button>`,
      });

      const inputEmail = getInputEmail(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputEmail.click();
      await expect(inputEmail).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is no submit button and no blocking elements', async ({
      page,
    }) => {
      await initInputEmail(page, {
        isWithinForm: true,
      });

      const inputEmail = getInputEmail(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputEmail.click();
      await expect(inputEmail).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should not implicit submit form on enter when there is no submit button and a native input type text', async ({
      page,
    }) => {
      await initInputEmail(page, {
        isWithinForm: true,
        markupAfter: `<input name="some-input" type="text" />`,
      });

      const inputEmail = getInputEmail(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputEmail.click();
      await expect(inputEmail).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });

    test('should not implicit submit form on enter when there is no submit button and a p-input-text', async ({
      page,
    }) => {
      await initInputEmail(page, {
        isWithinForm: true,
        markupAfter: `<p-input-text name="some-input" />`,
      });

      const inputEmail = getInputEmail(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputEmail.click();
      await expect(inputEmail).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });
  });

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initInputEmail(page, {
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
    await initInputEmail(page, {
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
  test('should focus input-email when label is clicked', async ({ page }) => {
    await initInputEmail(page, { props: { name: 'some-name', label: 'Some label' } });
    const label = getLabel(page);
    const inputEmail = getInputEmail(page);

    await addEventListener(inputEmail, 'focus');
    await expect(inputEmail).not.toBeFocused();

    await label.click();
    await waitForStencilLifecycle(page);
    await expect(inputEmail).toBeFocused();
  });

  test('should focus input-email when host is focused', async ({ page }) => {
    await initInputEmail(page);
    const host = getHost(page);
    const inputEmail = getInputEmail(page);

    await expect(inputEmail).not.toBeFocused();
    // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
    // await expect(inputEmailWrapper).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await host.focus();
    await waitForStencilLifecycle(page);
    await expect(inputEmail).toBeFocused();
    // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
    // await expect(inputEmailWrapper).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });

  test('should keep focus when switching to loading state', async ({ page }) => {
    await initInputEmail(page, { props: { name: 'Some name', label: 'Some label' } });
    const host = getHost(page);
    const inputEmail = getInputEmail(page);

    await expect(host).not.toBeFocused();
    await expect(inputEmail).not.toBeFocused();

    await page.keyboard.press('Tab');

    await expect(host).toBeFocused();
    await expect(inputEmail).toBeFocused();

    await setProperty(host, 'loading', true);

    await expect(host).toBeFocused();
    await expect(inputEmail).toBeFocused();
  });
});

test.describe('Event', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger a change event when input-email value is modified and focus is lost', async ({ page }) => {
      await initInputEmail(page);
      const host = getHost(page);
      const inputEmail = getInputEmail(page);

      await addEventListener(host, 'change');
      expect((await getEventSummary(host, 'change')).counter).toBe(0);

      await inputEmail.fill('example@porsche.de');
      await inputEmail.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter).toBe(1);
    });
    test('should trigger a blur event when the input-email loses focus', async ({ page }) => {
      await initInputEmail(page);
      const inputEmail = getInputEmail(page);
      const host = getHost(page);

      await addEventListener(host, 'blur');
      expect((await getEventSummary(host, 'blur')).counter).toBe(0);

      await inputEmail.click();
      await inputEmail.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'blur')).counter).toBe(1);
    });
  });
  test('should trigger an input event each time the input-email value is changed', async ({ page }) => {
    await initInputEmail(page);
    const inputEmail = getInputEmail(page);
    const host = getHost(page);

    await addEventListener(host, 'input');
    expect((await getEventSummary(host, 'input')).counter).toBe(0);

    await inputEmail.fill('1');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'input')).counter).toBe(1);
  });
});

// Test skipped because Playwright can only evaluate RGB colors, not RGBA.
test.skip('hover state', () => {
  skipInBrowsers(['firefox', 'webkit']);
  const defaultBorderColor = 'rgb(107, 109, 112)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  test('should show hover state on input-email when label is hovered', async ({ page }) => {
    await initInputEmail(page, { props: { name: 'some-name', label: 'Some label' } });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = getLabel(page);
    const inputEmail = getInputEmail(page);
    const inputEmailWrapper = getInputEmailWrapper(page);

    await expect(inputEmailWrapper).toHaveCSS('border-color', defaultBorderColor);
    await inputEmail.hover();

    await expect(inputEmailWrapper).toHaveCSS('border-color', hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    await expect(inputEmailWrapper).toHaveCSS('border-color', defaultBorderColor);

    await label.hover();
    await expect(inputEmailWrapper).toHaveCSS('border-color', hoverBorderColor);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initInputEmail(page, {
      props: { name: 'some-name', state: 'error' },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-email'], 'componentDidLoad: p-input-email').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initInputEmail(page, {
      props: { name: 'some-name', state: 'error' },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const host = getHost(page);
    await setProperty(host, 'state', 'none');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-input-email'], 'componentDidUpdate: input-email').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after value change', async ({ page }) => {
    await initInputEmail(page, { props: { name: 'some-name', state: 'error' } });
    const host = getHost(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-email'], 'componentDidLoad: input-email').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);

    await setProperty(host, 'value', 'example@porsche.de');
    await waitForStencilLifecycle(page);
    const statusAfterChange = await getLifecycleStatus(page);

    expect(statusAfterChange.componentDidUpdate['p-input-email'], 'componentDidUpdate: input-email').toBe(1);
    expect(statusAfterChange.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('pattern', () => {
  test('should prevent form submission if pattern does not match', async ({ page }) => {
    const name = 'email';
    const pattern = '^[a-z]+@example\\.com$';
    const value = 'wrong@example.net';

    await initInputEmail(page, {
      props: { name, value, pattern },
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });

    const form = getForm(page);
    await addEventListener(form, 'submit');

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should allow form submission if pattern matches', async ({ page }) => {
    const name = 'email';
    const pattern = '^[a-z]+@example\\.com$';
    const value = 'test@example.com';

    await initInputEmail(page, {
      props: { name, value, pattern },
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });

    const form = getForm(page);
    await addEventListener(form, 'submit');

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });
});

test.describe('multiple', () => {
  test('should allow multiple valid email addresses when `multiple` is set', async ({ page }) => {
    const name = 'email';
    const value = 'test1@example.com, test2@example.com';

    await initInputEmail(page, {
      props: { name, value, multiple: true },
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });

    const form = getForm(page);
    await addEventListener(form, 'submit');

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should prevent submission with invalid email in multiple list', async ({ page }) => {
    const name = 'email';
    const value = 'test1@example.com, invalid-email';

    await initInputEmail(page, {
      props: { name, value, multiple: true },
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });

    const form = getForm(page);
    await addEventListener(form, 'submit');

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });
});
