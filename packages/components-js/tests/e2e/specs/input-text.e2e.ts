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
  initConsoleObserver,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-input-text');
const getFieldset = (page: Page) => page.locator('fieldset');
const getInputText = (page: Page) => page.locator('p-input-text input');
const getInputTextWrapper = (page: Page) => page.locator('p-input-text .wrapper');
const getLabel = (page: Page) => page.locator('p-input-text label');
const getForm = (page: Page) => page.locator('form');
const getCounter = (page: Page) => page.locator('p-input-text .counter');
const getLabelSrText = (page: Page) => page.locator('p-input-text label .sr-only');

type InitOptions = {
  props?: Components.PInputText;
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  isWithinForm?: boolean;
  markupBefore?: string;
  markupAfter?: string;
};

const initInputText = (page: Page, opts?: InitOptions): Promise<void> => {
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

  const markup = `${markupBefore}<p-input-text ${getHTMLAttributes(props)}>
      ${slottedLabel}
      ${slottedDescription}
      ${slottedMessage}
    </p-input-text>${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('value', () => {
  test('should sync value with input value', async ({ page }) => {
    const testValue = '10';
    await initInputText(page, { props: { name: 'some-name', value: testValue } });
    const host = getHost(page);
    const inputText = getInputText(page);

    await expect(host).toHaveJSProperty('value', testValue);
    await expect(inputText).toHaveJSProperty('value', testValue);
  });

  test('should sync value with slotted content when typing', async ({ page }) => {
    await initInputText(page);
    const host = getHost(page);
    const inputText = getInputText(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputText).toHaveJSProperty('value', '');

    const testInput = '10';

    await inputText.fill(testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputText).toHaveJSProperty('value', testInput);
  });

  test('should sync slotted content with value when changed programmatically', async ({ page }) => {
    await initInputText(page);
    const host = getHost(page);
    const inputText = getInputText(page);
    await expect(host).toHaveJSProperty('value', '');
    await expect(inputText).toHaveJSProperty('value', '');

    const testInput = '10';

    await setProperty(host, 'value', testInput);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', testInput);
    await expect(inputText).toHaveJSProperty('value', testInput);
    await expect(inputText).toHaveValue(testInput);
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = '10';
    await initInputText(page, {
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
    await initInputText(page, {
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
    await initInputText(page, {
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
    await initInputText(page, {
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
    await initInputText(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputText = getInputText(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputText.fill('');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  });

  test('should prevent form submission after reset if the input-text is required and was initially empty', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    const required = true;
    await initInputText(page, {
      props: { name, value, required },
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const inputText = getInputText(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputText.fill('20');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should reset input-text value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = '10';
    const newValue = '20';
    const host = getHost(page);
    const inputText = getInputText(page);
    await initInputText(page, {
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

    await inputText.fill(newValue);
    await inputText.press('Tab');
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputText).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);
    await expect(inputText).toHaveValue(value);

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable input-text if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = '10';
    const host = getHost(page);
    await initInputText(page, {
      props: { name, value },
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initInputText(page, {
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });
    const host = getHost(page);
    const inputText = getInputText(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);
    await expect(inputText).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
    await expect(inputText).toHaveJSProperty('disabled', false);
  });

  test.describe('implicit form submission on enter key', () => {
    test('should implicit submit form on enter when there is a p-button type submit', async ({ page }) => {
      await initInputText(page, {
        isWithinForm: true,
        markupAfter: `<p-button type="submit">Submit</p-button>`,
      });

      const inputText = getInputText(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputText.click();
      await expect(inputText).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is a native button type submit', async ({ page }) => {
      await initInputText(page, {
        isWithinForm: true,
        markupAfter: `<button type="submit">Submit</button>`,
      });

      const inputText = getInputText(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputText.click();
      await expect(inputText).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should implicit submit form on enter when there is no submit button and no blocking elements', async ({
      page,
    }) => {
      await initInputText(page, {
        isWithinForm: true,
      });

      const inputText = getInputText(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputText.click();
      await expect(inputText).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    });

    test('should not implicit submit form on enter when there is no submit button and a native input type text', async ({
      page,
    }) => {
      await initInputText(page, {
        isWithinForm: true,
        markupAfter: `<input name="some-input" type="text" />`,
      });

      const inputText = getInputText(page);
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputText.click();
      await expect(inputText).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });

    test('should not implicit submit form on enter when there is no submit button and a p-input-text', async ({
      page,
    }) => {
      await initInputText(page, {
        isWithinForm: true,
        markupAfter: `<p-input-text name="some-input" />`,
      });

      const inputText = getInputText(page).first();
      const form = getForm(page);

      await addEventListener(form, 'submit');
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);

      await inputText.click();
      await expect(inputText).toBeFocused();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);
      expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    });
  });

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initInputText(page, {
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
    await initInputText(page, {
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
  test('should focus input-text when label is clicked', async ({ page }) => {
    await initInputText(page, { props: { name: 'some-name', label: 'Some label' } });
    const label = getLabel(page);
    const inputText = getInputText(page);

    await addEventListener(inputText, 'focus');
    await expect(inputText).not.toBeFocused();

    await label.click();
    await waitForStencilLifecycle(page);
    await expect(inputText).toBeFocused();
  });

  test('should focus input-text when host is focused', async ({ page }) => {
    await initInputText(page);
    const host = getHost(page);
    const inputText = getInputText(page);
    const inputTextWrapper = getInputTextWrapper(page);

    await addEventListener(inputText, 'focus');
    await expect(inputText).not.toBeFocused();
    await expect(inputTextWrapper).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await host.focus();
    await waitForStencilLifecycle(page);
    await expect(inputText).toBeFocused();
    await expect(inputTextWrapper).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });

  test('should keep focus when switching to loading state', async ({ page }) => {
    await initInputText(page, { props: { name: 'Some name', label: 'Some label' } });
    const host = getHost(page);
    const inputText = getInputText(page);

    await expect(host).not.toBeFocused();
    await expect(inputText).not.toBeFocused();

    await page.keyboard.press('Tab');

    await expect(host).toBeFocused();
    await expect(inputText).toBeFocused();

    await setProperty(host, 'loading', true);

    await expect(host).toBeFocused();
    await expect(inputText).toBeFocused();
  });
});

test.describe('Event', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger a change event when input-text value is modified and focus is lost', async ({ page }) => {
      await initInputText(page);
      const host = getHost(page);
      const inputText = getInputText(page);

      await addEventListener(host, 'change');
      expect((await getEventSummary(host, 'change')).counter).toBe(0);

      await inputText.fill('20');
      await inputText.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter).toBe(1);
    });
    test('should trigger a blur event when the input-text loses focus', async ({ page }) => {
      await initInputText(page);
      const inputText = getInputText(page);
      const host = getHost(page);

      await addEventListener(host, 'blur');
      expect((await getEventSummary(host, 'blur')).counter).toBe(0);

      await inputText.click();
      await inputText.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'blur')).counter).toBe(1);
    });
  });
  test('should trigger an input event each time the input-text value is changed', async ({ page }) => {
    await initInputText(page);
    const inputText = getInputText(page);
    const host = getHost(page);

    await addEventListener(host, 'input');
    expect((await getEventSummary(host, 'input')).counter).toBe(0);

    await inputText.fill('1');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'input')).counter).toBe(1);
  });
});

test.describe('hover state', () => {
  skipInBrowsers(['firefox', 'webkit']);
  const defaultBorderColor = 'rgb(107, 109, 112)';
  const hoverBorderColor = 'rgb(1, 2, 5)';

  test('should show hover state on input-text when label is hovered', async ({ page }) => {
    await initInputText(page, { props: { name: 'some-name', label: 'Some label' } });
    await page.mouse.move(0, 300); // avoid potential hover initially
    const label = getLabel(page);
    const inputText = getInputText(page);
    const inputTextWrapper = getInputTextWrapper(page);

    await expect(inputTextWrapper).toHaveCSS('border-color', defaultBorderColor);
    await inputText.hover();

    await expect(inputTextWrapper).toHaveCSS('border-color', hoverBorderColor);

    await page.mouse.move(0, 300); // undo hover
    await expect(inputTextWrapper).toHaveCSS('border-color', defaultBorderColor);

    await label.hover();
    await expect(inputTextWrapper).toHaveCSS('border-color', hoverBorderColor);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initInputText(page, {
      props: { name: 'some-name', state: 'error', counter: true },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-text'], 'componentDidLoad: p-input-text').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initInputText(page, {
      props: { name: 'some-name', state: 'error', counter: true },
      useSlottedLabel: true,
      useSlottedMessage: true,
      useSlottedDescription: true,
    });
    const host = getHost(page);
    await setProperty(host, 'state', 'none');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-input-text'], 'componentDidUpdate: input-text').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after value change', async ({ page }) => {
    await initInputText(page, { props: { name: 'some-name', state: 'error', counter: true } });
    const host = getHost(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-input-text'], 'componentDidLoad: input-text').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);

    await setProperty(host, 'value', 10);
    await waitForStencilLifecycle(page);
    const statusAfterChange = await getLifecycleStatus(page);

    expect(statusAfterChange.componentDidUpdate['p-input-text'], 'componentDidUpdate: input-text').toBe(1);
    expect(statusAfterChange.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('Counter', () => {
  test('should focus input when counter text is clicked', async ({ page }) => {
    await initInputText(page, { props: { name: 'some-name', counter: true, maxLength: 20 } });
    const counter = getCounter(page);
    const inputText = getInputText(page);

    await addEventListener(inputText, 'focus');
    await expect(inputText).not.toBeFocused();

    await clickElementPosition(page, counter);

    await expect(inputText).toBeFocused();
  });

  test('should display correct counter when typing', async ({ page }) => {
    await initInputText(page, { props: { name: 'some-name', counter: true, maxLength: 20 } });
    const counter = getCounter(page);
    const inputText = getInputText(page);

    expect(await counter.textContent()).toBe('0/20');
    await inputText.fill('h');
    await waitForStencilLifecycle(page);
    expect(await counter.textContent()).toBe('1/20');
    await inputText.fill('hello');
    await waitForStencilLifecycle(page);
    expect(await counter.textContent()).toBe('5/20');
    await inputText.press('Backspace');
    await waitForStencilLifecycle(page);
    expect(await counter.textContent()).toBe('4/20');
    await inputText.press('Backspace');
    await inputText.press('Backspace');
    await inputText.press('Backspace');
    await inputText.press('Backspace');
    await waitForStencilLifecycle(page);
    expect(await counter.textContent()).toBe('0/20');
  });

  test('should display correct counter when dynamically changing input value', async ({ page }) => {
    const maxLength = 20;
    await initInputText(page, { props: { name: 'some-name', counter: true, maxLength } });
    const counter = getCounter(page);
    const host = getHost(page);
    const text1 = 'test string';
    const text2 = 'test test string';

    await setProperty(host, 'value', text1);
    await waitForStencilLifecycle(page);

    expect(await counter.textContent()).toBe(`${text1.length}/${maxLength}`);

    await setProperty(host, 'value', text2);
    await waitForStencilLifecycle(page);

    expect(await counter.textContent()).toBe(`${text2.length}/${maxLength}`);
  });

  test('should render counter when counter is dynamically changed', async ({ page }) => {
    await initInputText(page, { props: { name: 'some-name', counter: true, maxLength: 20 } });
    const host = getHost(page);
    await expect(page.getByText('0/20')).toBeVisible();

    await setProperty(host, 'counter', false);
    await waitForStencilLifecycle(page);

    await expect(getCounter(page)).toHaveCount(0);

    await setProperty(host, 'counter', true);
    await waitForStencilLifecycle(page);

    await expect(page.getByText('0/20')).toBeVisible();
  });

  test('should update counter label when maxlength is changed dynamically', async ({ page }) => {
    await initInputText(page, { props: { name: 'some-name', counter: true, maxLength: 20 } });
    const host = getHost(page);

    await expect(page.getByText('0/20')).toBeVisible();
    expect(getLabelSrText(page)).toBeDefined();

    await setProperty(host, 'maxLength', '30');
    await waitForStencilLifecycle(page);

    await expect(page.getByText('0/30')).toBeVisible();
    expect(getLabelSrText(page)).toBeDefined();
  });
});
