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

const getHost = (page: Page) => page.locator('p-input-password');
const getFieldset = (page: Page) => page.locator('fieldset');
const getInputPassword = (page: Page) => page.locator('p-input-password input');
const getInputPasswordToggle = (page: Page) => page.locator('p-input-password p-button-pure');
const getInputPasswordWrapper = (page: Page) => page.locator('p-input-password .wrapper');
const getLabel = (page: Page) => page.locator('p-input-password label');
const getForm = (page: Page) => page.locator('form');

type InitOptions = {
  props?: Components.PInputPassword;
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  isWithinForm?: boolean;
  markupBefore?: string;
  markupAfter?: string;
};

const initInputPassword = (page: Page, opts?: InitOptions): Promise<void> => {
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

  const markup = `${markupBefore}<p-input-password ${getHTMLAttributes(props)}>
      ${slottedLabel}
      ${slottedDescription}
      ${slottedMessage}
    </p-input-password>${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('value', () => {
  test('should sync value with input value', async ({ page }) => {
    const testValue = 'hello123';
    await initInputPassword(page, { props: { name: 'some-name', value: testValue } });
    const host = getHost(page);
    const inputPassword = getInputPassword(page);

    await expect(host).toHaveJSProperty('value', testValue);
    await expect(inputPassword).toHaveJSProperty('value', testValue);
    await expect(inputPassword).toHaveValue(testValue);
  });

  test('should sync value with slotted content when typing', async ({ page }) => {
    await initInputPassword(page);
    const host = getHost(page);
    const inputPassword = getInputPassword(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputPassword).toHaveJSProperty('value', '');

    const testInput = 'hello';

    await inputPassword.fill(testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputPassword).toHaveJSProperty('value', testInput);
  });

  test('should sync slotted content with value when changed programmatically', async ({ page }) => {
    await initInputPassword(page);
    const host = getHost(page);
    const inputPassword = getInputPassword(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputPassword).toHaveJSProperty('value', '');

    const testInput = 'hello';

    await setProperty(host, 'value', testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputPassword).toHaveJSProperty('value', testInput);
    await expect(inputPassword).toHaveValue(testInput);
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    await initInputPassword(page, {
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
    const value = 'Hallo';
    const formId = 'myForm';
    await initInputPassword(page, {
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
    await initInputPassword(page, {
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
    await initInputPassword(page, {
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
    const value = 'some-value';
    const required = true;
    await initInputPassword(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputPassword = getInputPassword(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputPassword.fill('');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  });

  test('should prevent form submission after reset if the input-password is required and was initially empty', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initInputPassword(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputPassword = getInputPassword(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputPassword.fill('some-value');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should reset input-password value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    const newValue = 'New value';
    const host = getHost(page);
    const inputPassword = getInputPassword(page);
    await initInputPassword(page, {
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

    await inputPassword.fill(newValue);
    await inputPassword.press('Tab');
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputPassword).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);
    await expect(inputPassword).toHaveValue(value);

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable input-password if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    const host = getHost(page);
    await initInputPassword(page, {
      props: { name, value },
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initInputPassword(page, {
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });
    const host = getHost(page);
    const inputPassword = getInputPassword(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);
    await expect(inputPassword).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
    await expect(inputPassword).toHaveJSProperty('disabled', false);
  });

  test.describe('implicit form submission on enter key', () => {
    test('should implicit submit form on enter when there is a p-button type submit', async ({ page }) => {
      await initInputPassword(page, {
        isWithinForm: true,
        markupAfter: `<p-button type="submit">Submit</p-button>`,
      });

      const inputPassword = getInputPassword(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputPassword.click();
      await expect(inputPassword).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is a native button type submit', async ({ page }) => {
      await initInputPassword(page, {
        isWithinForm: true,
        markupAfter: `<button type="submit">Submit</button>`,
      });

      const inputPassword = getInputPassword(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputPassword.click();
      await expect(inputPassword).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is no submit button and no blocking elements', async ({
      page,
    }) => {
      await initInputPassword(page, {
        isWithinForm: true,
      });

      const inputPassword = getInputPassword(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputPassword.click();
      await expect(inputPassword).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should not implicit submit form on enter when there is no submit button and a native input type text', async ({
      page,
    }) => {
      await initInputPassword(page, {
        isWithinForm: true,
        markupAfter: `<input name="some-input" type="text" />`,
      });

      const inputPassword = getInputPassword(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputPassword.click();
      await expect(inputPassword).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });

    test('should not implicit submit form on enter when there is no submit button and a p-input-text', async ({
      page,
    }) => {
      await initInputPassword(page, {
        isWithinForm: true,
        markupAfter: `<p-input-text name="some-input" />`,
      });

      const inputPassword = getInputPassword(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputPassword.click();
      await expect(inputPassword).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });
  });

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initInputPassword(page, {
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
    await initInputPassword(page, {
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
  test('should focus input-password when label is clicked', async ({ page }) => {
    await initInputPassword(page, { props: { name: 'some-name', label: 'Some label' } });
    const label = getLabel(page);
    const inputPassword = getInputPassword(page);

    await addEventListener(inputPassword, 'focus');
    expect((await getEventSummary(inputPassword, 'focus')).counter).toBe(0);

    await label.click();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputPassword, 'focus')).counter).toBe(1);
  });

  test('should focus input-password when host is focused', async ({ page }) => {
    await initInputPassword(page);
    const host = getHost(page);
    const inputPassword = getInputPassword(page);
    const inputPasswordWrapper = getInputPasswordWrapper(page);

    await addEventListener(inputPassword, 'focus');
    expect((await getEventSummary(inputPassword, 'focus')).counter).toBe(0);
    await expect(inputPasswordWrapper).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await host.focus();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputPassword, 'focus')).counter).toBe(1);
    await expect(inputPasswordWrapper).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });

  test('should keep focus when switching to loading state', async ({ page }) => {
    await initInputPassword(page, { props: { name: 'Some name', label: 'Some label' } });
    const host = getHost(page);
    const inputPassword = getInputPassword(page);

    await expect(host).not.toBeFocused();
    await expect(inputPassword).not.toBeFocused();

    await page.keyboard.press('Tab');

    await expect(host).toBeFocused();
    await expect(inputPassword).toBeFocused();

    await setProperty(host, 'loading', true);

    await expect(host).toBeFocused();
    await expect(inputPassword).toBeFocused();
  });
});

test.describe('Event', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger a change event when input-password value is modified and focus is lost', async ({ page }) => {
      await initInputPassword(page);
      const host = getHost(page);
      const inputPassword = getInputPassword(page);

      await addEventListener(host, 'change');
      expect((await getEventSummary(host, 'change')).counter).toBe(0);

      await inputPassword.fill('New value');
      await inputPassword.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter).toBe(1);
    });
    test('should trigger a blur event when the input-password loses focus', async ({ page }) => {
      await initInputPassword(page);
      const inputPassword = getInputPassword(page);
      const host = getHost(page);

      await addEventListener(host, 'blur');
      expect((await getEventSummary(host, 'blur')).counter).toBe(0);

      await inputPassword.click();
      await inputPassword.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'blur')).counter).toBe(1);
    });
  });
  test('should trigger an input event each time the input-password value is changed', async ({ page }) => {
    await initInputPassword(page);
    const inputPassword = getInputPassword(page);
    const host = getHost(page);

    await addEventListener(host, 'input');
    expect((await getEventSummary(host, 'input')).counter).toBe(0);

    await inputPassword.fill('x');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'input')).counter).toBe(1);
  });
});

test.describe('hover state', () => {
  skipInBrowsers(['firefox', 'webkit']);
  const defaultBorderColor = 'rgb(107, 109, 112)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  test('should show hover state on input-password when label is hovered', async ({ page }) => {
    await initInputPassword(page, { props: { name: 'some-name', label: 'Some label' } });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = getLabel(page);
    const inputPassword = getInputPassword(page);
    const inputPasswordWrapper = getInputPasswordWrapper(page);

    await expect(inputPasswordWrapper).toHaveCSS('border-color', defaultBorderColor);
    await inputPassword.hover();

    await expect(inputPasswordWrapper).toHaveCSS('border-color', hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    await expect(inputPasswordWrapper).toHaveCSS('border-color', defaultBorderColor);

    await label.hover();
    await expect(inputPasswordWrapper).toHaveCSS('border-color', hoverBorderColor);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initInputPassword(page, {
      props: { name: 'some-name', state: 'error', toggle: true },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-password'], 'componentDidLoad: p-input-password').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initInputPassword(page, {
      props: { name: 'some-name', state: 'error', toggle: true },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const host = getHost(page);
    await setProperty(host, 'state', 'none');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-input-password'], 'componentDidUpdate: input-password').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after value change', async ({ page }) => {
    await initInputPassword(page, { props: { name: 'some-name', state: 'error', toggle: true } });
    const host = getHost(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-password'], 'componentDidLoad: input-password').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);

    await setProperty(host, 'value', 'test');
    await waitForStencilLifecycle(page);
    const statusAfterChange = await getLifecycleStatus(page);

    expect(statusAfterChange.componentDidUpdate['p-input-password'], 'componentDidUpdate: input-password').toBe(1);
    expect(statusAfterChange.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('Password Visibility', () => {
  test('should change input type to `text` if password toggle is clicked', async ({ page }) => {
    await initInputPassword(page, { props: { name: 'some-name', label: 'Some label', toggle: true } });
    const host = getHost(page);
    const inputPassword = getInputPassword(page);
    const inputPasswordToggle = getInputPasswordToggle(page);

    await setProperty(host, 'value', 'test');
    await waitForStencilLifecycle(page);
    expect(await inputPassword.getAttribute('type')).toEqual('password');
    await inputPasswordToggle.click();
    await waitForStencilLifecycle(page);

    expect(await inputPassword.getAttribute('type')).toEqual('text');
  });

  test('should hide password toggle if `toggle` prop is `false`', async ({ page }) => {
    await initInputPassword(page);
    const host = getHost(page);
    const inputPassword = getInputPassword(page);
    const inputPasswordToggle = getInputPasswordToggle(page);

    await setProperty(host, 'value', 'test');
    await waitForStencilLifecycle(page);

    expect(await inputPasswordToggle.count()).toBe(0);
    expect(await inputPassword.getAttribute('type')).toEqual('password');
  });
});
