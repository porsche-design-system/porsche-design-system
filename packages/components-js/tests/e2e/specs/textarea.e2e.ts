import { expect, type Page, test } from '@playwright/test';
import { Components } from '@porsche-design-system/components';
import {
  addEventListener,
  clickElementPosition,
  getConsoleErrorsAmount,
  getEventSummary,
  getFormDataValue,
  getHTMLAttributes,
  getLifecycleStatus,
  hoverElementPosition,
  initConsoleObserver,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-textarea');
const getFieldset = (page: Page) => page.locator('fieldset');
const getTextarea = (page: Page) => page.locator('p-textarea textarea');
const getLabel = (page: Page) => page.locator('p-textarea label');
const getCounter = (page: Page) => page.locator('p-textarea .counter');
const getCounterAria = (page: Page) => page.locator('p-textarea span.sr-only[aria-live="polite"]');
const getForm = (page: Page) => page.locator('form');

type InitOptions = {
  props?: Components.PTextarea;
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  isWithinForm?: boolean;
  markupBefore?: string;
  markupAfter?: string;
};

const initTextarea = (page: Page, opts?: InitOptions): Promise<void> => {
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

  const markup = `${markupBefore}<p-textarea ${getHTMLAttributes(props)}>
      ${slottedLabel}
      ${slottedDescription}
      ${slottedMessage}
    </p-textarea>${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('value', () => {
  test('should sync value with input value', async ({ page }) => {
    const testValue = 'hello \n\n 123\n';
    await initTextarea(page, { props: { name: 'some-name', value: testValue } });
    const host = getHost(page);
    const textarea = getTextarea(page);

    await expect(host).toHaveJSProperty('value', testValue);
    await expect(textarea).toHaveJSProperty('value', testValue);
    await expect(textarea).toHaveValue(testValue);
  });

  test('should sync value with slotted content when typing', async ({ page }) => {
    await initTextarea(page);
    const host = getHost(page);
    const textarea = getTextarea(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(textarea).toHaveJSProperty('value', '');

    const testInput = 'hello';

    await textarea.fill(testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(textarea).toHaveJSProperty('value', testInput);
  });

  test('should sync slotted content with value when changed programmatically', async ({ page }) => {
    await initTextarea(page);
    const host = getHost(page);
    const textarea = getTextarea(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(textarea).toHaveJSProperty('value', '');

    const testInput = 'hello';

    await setProperty(host, 'value', testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(textarea).toHaveJSProperty('value', testInput);
    await expect(textarea).toHaveValue(testInput);
  });

  test('should allow controlled input via programmatic value updates in input listener', async ({ page }) => {
    await initTextarea(page, { props: { name: 'some-name' } });
    const host = getHost(page);
    const textarea = getTextarea(page);

    await expect(host).toHaveJSProperty('value', '');
    await expect(textarea).toHaveValue('');

    // Add input event listener that always sets value to 'b'
    await page.evaluate(() => {
      const hostElement = document.querySelector('p-textarea');
      hostElement.addEventListener('input', () => {
        hostElement.value = 'b';
      });
    });

    await textarea.focus();
    await expect(textarea).toBeFocused();

    await page.keyboard.press('a');
    // Value is overwritten in the input event listener
    await expect(host).toHaveJSProperty('value', 'b');
    await expect(textarea).toHaveValue('b');

    await page.keyboard.press('c');
    // Value is overwritten in the input event listener
    await expect(host).toHaveJSProperty('value', 'b');
    await expect(textarea).toHaveValue('b');
  });
});

test.describe('counter', () => {
  test('should display correct counter when typing', async ({ page }) => {
    await initTextarea(page, { props: { name: 'some-name', maxLength: 160, counter: true } });
    const counter = getCounter(page);
    const host = getTextarea(page);

    await expect(counter).toHaveText('0/160');
    await host.fill('h');
    await expect(counter).toHaveText('1/160');
    await host.fill('hello');
    await expect(counter).toHaveText('5/160');
    await host.press('Backspace');
    await expect(counter).toHaveText('4/160');
    await host.press('Backspace');
    await host.press('Backspace');
    await host.press('Backspace');
    await host.press('Backspace');
    await expect(counter).toHaveText('0/160');
  });

  test('should display correct counter when value is set programmatically', async ({ page }) => {
    await initTextarea(page, { props: { name: 'some-name', maxLength: 160, counter: true } });
    const counter = getCounter(page);
    const host = getHost(page);

    await expect(counter).toHaveText('0/160');
    await setProperty(host, 'value', 'hello');
    await expect(counter).toHaveText('5/160');
  });

  test('should render counter when set to true', async ({ page }) => {
    await initTextarea(page, { props: { name: 'some-name', value: 'hello', maxLength: 160, counter: true } });
    const counter = getCounter(page);
    const counterAria = getCounterAria(page);
    await expect(counter).toHaveCount(1);
    await expect(counter).toHaveText('5/160');
    await expect(counterAria).toHaveText('You have 155 out of 160 characters left');
  });

  test('should render aria-live for counter correctly when typing', async ({ page }) => {
    await initTextarea(page, { props: { name: 'some-name', maxLength: 160, counter: true } });
    const counterAria = getCounterAria(page);
    const host = getTextarea(page);
    await expect(counterAria).toHaveText('You have 160 out of 160 characters left');

    await host.fill('hello');
    await sleep(800); // Aria text is debounced 800ms
    await expect(counterAria).toHaveText('You have 155 out of 160 characters left');
  });

  test('should render aria-live for counter correctly when value is set programmatically', async ({ page }) => {
    await initTextarea(page, { props: { name: 'some-name', maxLength: 160, counter: true } });
    const counterAria = getCounterAria(page);
    const host = getHost(page);
    await expect(counterAria).toHaveText('You have 160 out of 160 characters left');

    await setProperty(host, 'value', 'hello');
    await waitForStencilLifecycle(page);
    await sleep(800); // Aria text is debounced 800ms
    await expect(counterAria).toHaveText('You have 155 out of 160 characters left');
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    await initTextarea(page, {
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
    await initTextarea(page, {
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
    await initTextarea(page, {
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

  test('should submit form after dynamically setting `required` to false on an initially required, empty textarea', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initTextarea(page, {
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

  test('should submit form after reset if the required textarea was initially not empty', async ({ page }) => {
    const name = 'name';
    const value = 'some-value';
    const required = true;
    await initTextarea(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const textarea = getTextarea(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await textarea.fill('');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  });

  test('should prevent form submission after reset if the textarea is required and was initially empty', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initTextarea(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const textarea = getTextarea(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await textarea.fill('some-value');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should reset textarea value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    const newValue = 'New value';
    const host = getHost(page);
    const textarea = getTextarea(page);
    await initTextarea(page, {
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

    await textarea.fill(newValue);
    await textarea.press('Tab');
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(textarea).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);
    await expect(textarea).toHaveValue(value);

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable textarea if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    const host = getHost(page);
    await initTextarea(page, {
      props: { name, value },
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initTextarea(page, {
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });
    const host = getHost(page);
    const textarea = getTextarea(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);
    await expect(textarea).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
    await expect(textarea).toHaveJSProperty('disabled', false);
  });

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initTextarea(page, {
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
    await initTextarea(page, {
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
  test('should focus textarea when label is clicked', async ({ page }) => {
    await initTextarea(page, { props: { name: 'some-name', label: 'Some label' } });
    const label = getLabel(page);
    const textarea = getTextarea(page);

    await expect(textarea).not.toBeFocused();

    await label.click();
    await waitForStencilLifecycle(page);
    await expect(textarea).toBeFocused();
  });

  skipInBrowsers(['webkit'], () => {
    test('should focus textarea when counter text is clicked', async ({ page }) => {
      await initTextarea(page, { props: { name: 'some-name', maxLength: 160, counter: true } });
      const counter = getCounter(page);
      const textarea = getTextarea(page);

      await expect(textarea).not.toBeFocused();

      await clickElementPosition(page, counter);
      await waitForStencilLifecycle(page);
      await expect(textarea).toBeFocused();
    });
  });
  test('should focus textarea when host is focused', async ({ page }) => {
    await initTextarea(page);
    const host = getHost(page);
    const textarea = getTextarea(page);

    await expect(textarea).not.toBeFocused();
    // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
    // await expect(textarea).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await host.focus();
    await waitForStencilLifecycle(page);
    await expect(textarea).toBeFocused();
    // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
    // await expect(textarea).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });
});

test.describe('Event', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger a change event when textarea value is modified and focus is lost', async ({ page }) => {
      await initTextarea(page);
      const host = getHost(page);
      const textarea = getTextarea(page);

      await addEventListener(host, 'change');
      expect((await getEventSummary(host, 'change')).counter).toBe(0);

      await textarea.fill('New value');
      await textarea.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter).toBe(1);
    });
    test('should trigger a blur event when the textarea loses focus', async ({ page }) => {
      await initTextarea(page);
      const textarea = getTextarea(page);
      const host = getHost(page);

      await addEventListener(host, 'blur');
      expect((await getEventSummary(host, 'blur')).counter).toBe(0);

      await textarea.click();
      await textarea.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'blur')).counter).toBe(1);
    });
  });
  test('should trigger an input event each time the textarea value is changed', async ({ page }) => {
    await initTextarea(page);
    const textarea = getTextarea(page);
    const host = getHost(page);

    await addEventListener(host, 'input');
    expect((await getEventSummary(host, 'input')).counter).toBe(0);

    await textarea.fill('x');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'input')).counter).toBe(1);
  });
});

// Test skipped because Playwright can only evaluate RGB colors, not RGBA.
test.skip('hover state', () => {
  skipInBrowsers(['firefox', 'webkit']);
  const defaultBorderColor = 'rgb(107, 109, 112)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  test('should show hover state on textarea when label is hovered', async ({ page }) => {
    await initTextarea(page, { props: { name: 'some-name', label: 'Some label' } });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = getLabel(page);
    const textarea = getTextarea(page);

    await expect(textarea).toHaveCSS('border-color', defaultBorderColor);
    await textarea.hover();

    await expect(textarea).toHaveCSS('border-color', hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    await expect(textarea).toHaveCSS('border-color', defaultBorderColor);

    await label.hover();
    await expect(textarea).toHaveCSS('border-color', hoverBorderColor);
  });

  test('should show hover state on textarea when counter is hovered', async ({ page }) => {
    await initTextarea(page, { props: { name: 'some-name', maxLength: 160, counter: true } });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const counter = getCounter(page);
    const textarea = getTextarea(page);

    await expect(textarea).toHaveCSS('border-color', defaultBorderColor);
    await textarea.hover();
    await expect(textarea).toHaveCSS('border-color', hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    await expect(textarea).toHaveCSS('border-color', defaultBorderColor);

    await hoverElementPosition(page, counter);
    await expect(textarea).toHaveCSS('border-color', hoverBorderColor);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initTextarea(page, {
      props: { name: 'some-name', state: 'error' },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-textarea'], 'componentDidLoad: p-textarea').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initTextarea(page, {
      props: { name: 'some-name', state: 'error' },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const host = getHost(page);
    await setProperty(host, 'state', 'none');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-textarea'], 'componentDidUpdate: p-textarea').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after value change', async ({ page }) => {
    await initTextarea(page);
    const host = getHost(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-textarea'], 'componentDidLoad: p-textarea').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);

    await setProperty(host, 'value', 'test');
    await waitForStencilLifecycle(page);
    const statusAfterChange = await getLifecycleStatus(page);

    expect(statusAfterChange.componentDidUpdate['p-textarea'], 'componentDidUpdate: p-textarea').toBe(1);
    expect(statusAfterChange.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
