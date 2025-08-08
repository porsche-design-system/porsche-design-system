import { type Page, expect, test } from '@playwright/test';
import { Components } from '@porsche-design-system/components';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  getHTMLAttributes,
  getLifecycleStatus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-input-time');
const getFieldset = (page: Page) => page.locator('fieldset');
const getInputTime = (page: Page) => page.locator('p-input-time input');
const getInputTimeWrapper = (page: Page) => page.locator('p-input-time .wrapper');
const getLabel = (page: Page) => page.locator('p-input-time label');
const getForm = (page: Page) => page.locator('form');

type InitOptions = {
  props?: Components.PInputTime;
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  isWithinForm?: boolean;
  markupBefore?: string;
  markupAfter?: string;
};

const initInputTime = (page: Page, opts?: InitOptions): Promise<void> => {
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

  const markup = `${markupBefore}<p-input-time ${getHTMLAttributes(props)}>
      ${slottedLabel}
      ${slottedDescription}
      ${slottedMessage}
    </p-input-time>${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('value', () => {
  test('should sync value with input value', async ({ page }) => {
    const testValue = '13:30';
    await initInputTime(page, { props: { name: 'some-name', value: testValue } });
    const host = getHost(page);
    const inputTime = getInputTime(page);

    await expect(host).toHaveJSProperty('value', testValue);
    await expect(inputTime).toHaveJSProperty('value', testValue);
    await expect(inputTime).toHaveValue(testValue);
  });

  test('should sync value with slotted content when typing', async ({ page }) => {
    await initInputTime(page);
    const host = getHost(page);
    const inputTime = getInputTime(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputTime).toHaveJSProperty('value', '');

    const testInput = '13:30';

    await inputTime.fill(testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputTime).toHaveJSProperty('value', testInput);
  });

  test('should sync slotted content with value when changed programmatically', async ({ page }) => {
    await initInputTime(page);
    const host = getHost(page);
    const inputTime = getInputTime(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputTime).toHaveJSProperty('value', '');

    const testInput = '13:30';

    await setProperty(host, 'value', testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputTime).toHaveJSProperty('value', testInput);
    await expect(inputTime).toHaveValue(testInput);
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = '13:30';
    await initInputTime(page, {
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
    const value = '13:30';
    const formId = 'myForm';
    await initInputTime(page, {
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
    await initInputTime(page, {
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
    await initInputTime(page, {
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
    const value = '13:30';
    const required = true;
    await initInputTime(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputTime = getInputTime(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputTime.fill('');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  });

  test('should prevent form submission after reset if the input-time is required and was initially empty', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initInputTime(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputTime = getInputTime(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputTime.fill('13:30');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should reset input-time value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = '13:30';
    const newValue = '15:50';
    const host = getHost(page);
    const inputTime = getInputTime(page);
    await initInputTime(page, {
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

    await inputTime.fill(newValue);
    await inputTime.press('Tab');
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputTime).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);
    await expect(inputTime).toHaveValue(value);

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable input-time if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = '13:30';
    const host = getHost(page);
    await initInputTime(page, {
      props: { name, value },
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initInputTime(page, {
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });
    const host = getHost(page);
    const inputTime = getInputTime(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);
    await expect(inputTime).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
    await expect(inputTime).toHaveJSProperty('disabled', false);
  });
});

test.describe('focus state', () => {
  test('should focus input-time when label is clicked', async ({ page }) => {
    await initInputTime(page, { props: { name: 'some-name', label: 'Some label' } });
    const label = getLabel(page);
    const inputTime = getInputTime(page);

    await addEventListener(inputTime, 'focus');
    expect((await getEventSummary(inputTime, 'focus')).counter).toBe(0);

    await label.click();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputTime, 'focus')).counter).toBe(1);
  });

  test('should focus input-time when host is focused', async ({ page }) => {
    await initInputTime(page);
    const host = getHost(page);
    const inputTime = getInputTime(page);
    const inputTimeWrapper = getInputTimeWrapper(page);

    await addEventListener(inputTime, 'focus');
    expect((await getEventSummary(inputTime, 'focus')).counter).toBe(0);
    await expect(inputTimeWrapper).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await host.focus();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(inputTime, 'focus')).counter).toBe(1);
    await expect(inputTimeWrapper).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });

  test('should keep focus when switching to loading state', async ({ page }) => {
    await initInputTime(page, { props: { name: 'Some name', label: 'Some label' } });
    const host = getHost(page);
    const inputTime = getInputTime(page);

    await expect(host).not.toBeFocused();
    await expect(inputTime).not.toBeFocused();

    await page.keyboard.press('Tab');

    await expect(host).toBeFocused();
    await expect(inputTime).toBeFocused();

    await setProperty(host, 'loading', true);

    await expect(host).toBeFocused();
    await expect(inputTime).toBeFocused();
  });
});

test.describe('Event', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger a change event when input-time value is modified and focus is lost', async ({ page }) => {
      await initInputTime(page);
      const host = getHost(page);
      const inputTime = getInputTime(page);

      await addEventListener(host, 'change');
      expect((await getEventSummary(host, 'change')).counter).toBe(0);

      await inputTime.fill('13:30');
      await inputTime.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter).toBe(1);
    });
    test('should trigger a blur event when the input-time loses focus', async ({ page }) => {
      await initInputTime(page);
      const inputTime = getInputTime(page);
      const host = getHost(page);

      await addEventListener(host, 'blur');
      expect((await getEventSummary(host, 'blur')).counter).toBe(0);

      await inputTime.click();

      // Press Tab two times to cycle through the two internal segments of the native time input:
      await inputTime.press('Tab');
      await inputTime.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'blur')).counter).toBe(1);
    });
  });
  test('should trigger an input event each time the input-time value is changed', async ({ page }) => {
    await initInputTime(page);
    const inputTime = getInputTime(page);
    const host = getHost(page);

    await addEventListener(host, 'input');
    expect((await getEventSummary(host, 'input')).counter).toBe(0);

    await inputTime.fill('13:30');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'input')).counter).toBe(1);
  });
});

test.describe('hover state', () => {
  skipInBrowsers(['firefox', 'webkit']);
  const defaultBorderColor = 'rgb(107, 109, 112)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  test('should show hover state on input-time when label is hovered', async ({ page }) => {
    await initInputTime(page, { props: { name: 'some-name', label: 'Some label' } });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = getLabel(page);
    const inputTime = getInputTime(page);
    const inputTimeWrapper = getInputTimeWrapper(page);

    await expect(inputTimeWrapper).toHaveCSS('border-color', defaultBorderColor);
    await inputTime.hover();

    await expect(inputTimeWrapper).toHaveCSS('border-color', hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    await expect(inputTimeWrapper).toHaveCSS('border-color', defaultBorderColor);

    await label.hover();
    await expect(inputTimeWrapper).toHaveCSS('border-color', hoverBorderColor);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initInputTime(page, {
      props: { name: 'some-name', state: 'error' },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-time'], 'componentDidLoad: p-input-time').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initInputTime(page, {
      props: { name: 'some-name', state: 'error' },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const host = getHost(page);
    await setProperty(host, 'state', 'none');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-input-time'], 'componentDidUpdate: input-time').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after value change', async ({ page }) => {
    await initInputTime(page, { props: { name: 'some-name', state: 'error' } });
    const host = getHost(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-time'], 'componentDidLoad: input-time').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);

    await setProperty(host, 'value', '13:30');
    await waitForStencilLifecycle(page);
    const statusAfterChange = await getLifecycleStatus(page);

    expect(statusAfterChange.componentDidUpdate['p-input-time'], 'componentDidUpdate: input-time').toBe(1);
    expect(statusAfterChange.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
