import { expect, type Locator, type Page, test } from '@playwright/test';
import { Components } from '@porsche-design-system/components';
import {
  addEventListener,
  getConsoleErrorsAmount,
  getElementStyle,
  getEventSummary,
  getFormDataValue,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  initConsoleObserver,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-pin-code');
const getFieldset = (page: Page) => page.locator('fieldset');
const getLabel = (page: Page) => page.locator('p-pin-code label');
const getCurrentInput = (page: Page) => page.locator('p-pin-code #current-input');
const getInput = (page: Page, n: number) => page.locator(`p-pin-code .wrapper input:nth-child(${n})`);
const getForm = (page: Page) => page.locator('form');
const getActiveElementsAriaLabelInShadowRoot = (page: Page, element: Locator): Promise<string> => {
  return element.evaluate((el) => el.shadowRoot.activeElement.ariaLabel);
};

type InitOptions = {
  props?: Components.PPinCode;
  slots?: {
    label?: string;
    description?: string;
    message?: string;
  };
  options?: {
    isWithinForm?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initPinCode = (page: Page, opts?: InitOptions) => {
  const { props = { name: 'name' }, slots, options } = opts || {};
  const { isWithinForm = false, markupBefore = '', markupAfter = '' } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const markup = `${markupBefore}
     <p-pin-code ${getHTMLAttributes(props)}>
       ${label}
       ${description}
       ${message}
     </p-pin-code>
     ${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('focus state', () => {
  test('should focus input with id="current-input" when label text is clicked', async ({ page }) => {
    await initPinCode(page, { props: { label: 'Some label' } });
    const label = getLabel(page);
    const input = getCurrentInput(page);

    await addEventListener(input, 'focus');
    expect((await getEventSummary(input, 'focus')).counter).toBe(0);

    await label.click();

    expect((await getEventSummary(input, 'focus')).counter).toBe(1);
  });
  test('should focus input with id="current-input" when host is focused', async ({ page }) => {
    await initPinCode(page);
    const host = getHost(page);
    const input = getCurrentInput(page);

    await expect(input).not.toBeFocused();
    // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
    // await expect(input).toHaveCSS('border-color', 'rgb(107, 109, 112)');

    await host.focus();
    await expect(input).toBeFocused();
    // Test skipped because Playwright can only evaluate RGB colors, not RGBA.
    // await expect(input).toHaveCSS('border-color', 'rgb(1, 2, 5)');
  });
});

test.describe('render', () => {
  for (const length of [1, 2, 3, 4, 5, 6] as (1 | 2 | 3 | 4 | 5 | 6)[]) {
    test(`should render correct amount of inputs with length=${length}`, async ({ page }) => {
      await initPinCode(page, { props: { length } });
      const host = getHost(page);
      const amountOfInputs = await host.evaluate((el) => Array.from(el.shadowRoot.querySelectorAll('input')).length);
      expect(amountOfInputs).toBe(length);
    });
  }
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = '1234';
    await initPinCode(page, {
      props: { name, value },
      options: {
        isWithinForm: true,
        markupAfter: '<button type="submit">Submit</button>',
      },
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
    const value = '1234';
    const formId = 'myForm';
    await initPinCode(page, {
      props: { name, value, form: formId },
      options: {
        markupBefore: `<form id="myForm" onsubmit="return false;"><button type="submit">Submit</button></form>`,
      },
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should reset pin-code value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = '1234';
    const host = getHost(page);
    const input1 = getInput(page, 1);
    const input2 = getInput(page, 2);
    const input3 = getInput(page, 3);
    const input4 = getInput(page, 4);
    await initPinCode(page, {
      props: { name, value },
      options: {
        isWithinForm: true,
        markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
      },
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await input4.focus();
    await input4.clear();
    await input4.fill('0');
    await waitForStencilLifecycle(page);

    await expect(input1).toHaveValue('1');
    await expect(input2).toHaveValue('2');
    await expect(input3).toHaveValue('3');
    await expect(input4).toHaveValue('0');

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);
    await expect(input1).toHaveValue('1');
    await expect(input2).toHaveValue('2');
    await expect(input3).toHaveValue('3');
    await expect(input4).toHaveValue('4');

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable pin-code if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = '1234';
    const host = getHost(page);
    await initPinCode(page, {
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
    await initPinCode(page, {
      options: {
        isWithinForm: true,
        markupBefore: `<fieldset id="fieldset" disabled>`,
        markupAfter: `</fieldset>`,
      },
    });
    const host = getHost(page);
    const input1 = getInput(page, 1);
    const input2 = getInput(page, 2);
    const input3 = getInput(page, 3);
    const input4 = getInput(page, 4);
    const fieldset = page.locator('#fieldset');

    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);
    await expect(input1).toHaveJSProperty('disabled', true);
    await expect(input2).toHaveJSProperty('disabled', true);
    await expect(input3).toHaveJSProperty('disabled', true);
    await expect(input4).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
    await expect(input1).toHaveJSProperty('disabled', false);
    await expect(input2).toHaveJSProperty('disabled', false);
    await expect(input3).toHaveJSProperty('disabled', false);
    await expect(input4).toHaveJSProperty('disabled', false);
  });

  test('should submit on key Enter if form does not contain another input element and no button/input type=submit', async ({
    page,
  }) => {
    const name = 'name';
    const value = '1234';
    await initPinCode(page, { props: { name, value }, options: { isWithinForm: true } });
    const input = getCurrentInput(page);
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should submit on key Enter if form does contain another input type=hidden element and no input/button type=submit', async ({
    page,
  }) => {
    const name = 'name';
    const value = '1234';
    await initPinCode(page, {
      props: { name, value },
      options: { isWithinForm: true, markupAfter: '<input type="hidden"/>' },
    });
    const input = getCurrentInput(page);
    const form = getForm(page);

    await addEventListener(form, 'submit');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should submit on key Enter if form does contain another input type=submit', async ({ page }) => {
    const name = 'name';
    const value = '1234';
    await initPinCode(page, {
      props: { name, value },
      options: { isWithinForm: true, markupAfter: '<input type="submit"/>' },
    });
    const input = getCurrentInput(page);
    const form = page.locator('form');
    await addEventListener(form, 'submit');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should submit on key Enter if form does contain another input element and a button type=submit', async ({
    page,
  }) => {
    const name = 'name';
    const value = '1234';
    await initPinCode(page, {
      props: { name, value },
      options: {
        isWithinForm: true,
        markupAfter: '<input/><button type="submit">Some Button</button>',
      },
    });
    const input = getCurrentInput(page);
    const form = page.locator('form');
    await addEventListener(form, 'submit');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should submit on key Enter if form does contain another input element and a input type=submit', async ({
    page,
  }) => {
    const name = 'name';
    const value = '1234';
    await initPinCode(page, {
      props: { name, value },
      options: { isWithinForm: true, markupAfter: '<input/><input type="submit" />' },
    });
    const input = getCurrentInput(page);
    const form = page.locator('form');
    await addEventListener(form, 'submit');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should submit on key Enter if form does contain another input element and a p-button type=submit', async ({
    page,
  }) => {
    const name = 'name';
    const value = '1234';
    await initPinCode(page, {
      props: { name, value },
      options: {
        isWithinForm: true,
        markupAfter: '<input /><p-button type="submit">Some Button</p-button>',
      },
    });
    const input = getCurrentInput(page);
    const form = page.locator('form');
    await addEventListener(form, 'submit');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should submit on key Enter if form does contain another input element and a p-button-pure type=submit', async ({
    page,
  }) => {
    const name = 'name';
    const value = '1234';
    await initPinCode(page, {
      props: { name, value },
      options: {
        isWithinForm: true,
        markupAfter: '<input /><p-button-pure type="submit">Some Button</p-button-pure>',
      },
    });
    const input = getCurrentInput(page);
    const form = page.locator('form');
    await addEventListener(form, 'submit');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should submit on key Enter if form does contain another input element, a p-button type=text and a p-button type=submit', async ({
    page,
  }) => {
    const name = 'name';
    const value = '1234';
    await initPinCode(page, {
      props: { name, value },
      options: {
        isWithinForm: true,
        markupBefore: '<p-button">Some Button</p-button>',
        markupAfter: '<input /><p-button type="submit">Some submit Button</p-button>',
      },
    });
    const input = getCurrentInput(page);
    const form = page.locator('form');
    await addEventListener(form, 'submit');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should not submit on key Enter if form does contain another input element and no input/button type=submit', async ({
    page,
  }) => {
    const name = 'name';
    const value = '1234';
    await initPinCode(page, { props: { name, value }, options: { isWithinForm: true, markupAfter: '<input />' } });
    const input = getCurrentInput(page);
    const form = page.locator('form');
    await addEventListener(form, 'submit');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(0);
  });

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initPinCode(page, {
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

test.describe('change event', () => {
  test('should emit change event on valid input and focus next input if there is one', async ({ page }) => {
    await initPinCode(page);
    const host = getHost(page);
    await addEventListener(host, 'change');
    const currentInput = getCurrentInput(page);

    await currentInput.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'before input').toBe(0);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('1-4');

    page.keyboard.press('1');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after input').toBe(1);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('2-4');
    expect((await getEventSummary(host, 'change')).details, 'after input').toEqual([
      {
        isComplete: false,
        value: '1   ',
      },
    ]);

    page.keyboard.press('2');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after input').toBe(2);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('3-4');
    expect((await getEventSummary(host, 'change')).details, 'after input').toEqual([
      {
        isComplete: false,
        value: '1   ',
      },
      {
        isComplete: false,
        value: '12  ',
      },
    ]);

    page.keyboard.press('3');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after input').toBe(3);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
    expect((await getEventSummary(host, 'change')).details, 'after input').toEqual([
      {
        isComplete: false,
        value: '1   ',
      },
      {
        isComplete: false,
        value: '12  ',
      },
      {
        isComplete: false,
        value: '123 ',
      },
    ]);

    page.keyboard.press('4');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after input').toBe(4);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
    expect((await getEventSummary(host, 'change')).details, 'after input').toEqual([
      {
        isComplete: false,
        value: '1   ',
      },
      {
        isComplete: false,
        value: '12  ',
      },
      {
        isComplete: false,
        value: '123 ',
      },
      {
        isComplete: true,
        value: '1234',
      },
    ]);
  });

  // (alphanumeric, "Dead" (e.g. ^¨), "Process" (e.g.^ in firefox)
  test('should not emit change event on not valid input', async ({ page }) => {
    await initPinCode(page);
    const host = getHost(page);
    await addEventListener(host, 'change');
    const input = getCurrentInput(page);

    await input.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'before input').toBe(0);

    page.keyboard.press('a');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after input').toBe(0);
    expect((await getEventSummary(host, 'change')).details, 'after input').toEqual([]);
    expect(await getProperty<string>(input, 'value')).toBe('');

    page.keyboard.press('^');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after input').toBe(0);
    expect((await getEventSummary(host, 'change')).details, 'after input').toEqual([]);
    expect(await getProperty<string>(input, 'value')).toBe('');
  });

  test('should emit change event on backspace and focus correct input element', async ({ page }) => {
    await initPinCode(page);
    const host = getHost(page);
    await setProperty(host, 'value', '1234');
    await addEventListener(host, 'change');
    const input4 = getInput(page, 4);

    await input4.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'before backspace').toBe(0);

    page.keyboard.press('Backspace');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after backspace').toBe(1);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
    expect((await getEventSummary(host, 'change')).details, 'after backspace').toEqual([
      {
        isComplete: false,
        value: '123 ',
      },
    ]);

    page.keyboard.press('Backspace');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after backspace').toBe(2);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('3-4');
    expect((await getEventSummary(host, 'change')).details, 'after backspace').toEqual([
      {
        isComplete: false,
        value: '123 ',
      },
      {
        isComplete: false,
        value: '12  ',
      },
    ]);
  });

  test('should emit change event on delete and focus correct input element', async ({ page }) => {
    await initPinCode(page);
    const host = getHost(page);
    await setProperty(host, 'value', '1234');
    await addEventListener(host, 'change');
    const input1 = getInput(page, 1);

    await input1.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'before delete').toBe(0);

    page.keyboard.press('Delete');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after delete').toBe(1);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('1-4');
    expect((await getEventSummary(host, 'change')).details, 'after delete').toEqual([
      {
        isComplete: false,
        value: ' 234',
      },
    ]);

    page.keyboard.press('Delete');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after delete').toBe(2);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('2-4');
    expect((await getEventSummary(host, 'change')).details, 'after delete').toEqual([
      {
        isComplete: false,
        value: ' 234',
      },
      {
        isComplete: false,
        value: '  34',
      },
    ]);
  });
});

test.describe('blur event', () => {
  test('should emit blur event when focus of an input is lost by mouse click', async ({ page }) => {
    await initPinCode(page, { options: { markupAfter: '<button>Some button</button>' } });
    const host = getHost(page);
    await addEventListener(host, 'blur');
    const input = getCurrentInput(page);
    const button = page.locator('button');

    await input.click();
    await expect(input).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'before input lost focus').toBe(0);

    await button.click();
    await expect(button).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after input lost focus').toBe(1);
  });

  test('should not emit blur event when focus is moved to next input by click', async ({ page }) => {
    await initPinCode(page, { options: { markupAfter: '<button>Some button</button>' } });
    const host = getHost(page);
    await addEventListener(host, 'blur');
    const input1 = getInput(page, 1);
    const input2 = getInput(page, 2);
    const button = page.locator('button');

    await input1.click();
    await expect(input1).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 1st input got focus').toBe(0);

    await input2.click();
    await expect(input2).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 2nd input got focus').toBe(0);

    await button.click();
    await expect(button).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 2nd input lost focus').toBe(1);
  });

  test('should emit blur event when focus of an input is lost by keyboard', async ({ page }) => {
    await initPinCode(page, { options: { markupAfter: '<button>Some button</button>' } });
    const host = getHost(page);
    await addEventListener(host, 'blur');
    const input1 = getInput(page, 1);
    const input2 = getInput(page, 2);
    const input3 = getInput(page, 3);
    const input4 = getInput(page, 4);
    const button = page.locator('button');

    await page.keyboard.press('Tab');
    await expect(input1).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 1st input got focus').toBe(0);

    await page.keyboard.press('Tab');
    await expect(input2).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 2nd input got focus').toBe(0);

    await page.keyboard.press('Tab');
    await expect(input3).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 3rd input got focus').toBe(0);

    await page.keyboard.press('Tab');
    await expect(input4).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 4th input got focus').toBe(0);

    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    expect((await getEventSummary(host, 'blur')).counter, 'after 4th input lost focus').toBe(1);
  });
});

test.describe('events', () => {
  // The code input1.type('1234') simulates the behavior of the iOS keyboard suggestion by generating multiple input events, each with a digit entered sequentially.
  test.describe('onInput', () => {
    test('should spread value over input elements and focus last input element', async ({ page }) => {
      await initPinCode(page);
      const host = getHost(page);
      const input1 = getInput(page, 1);
      const input2 = getInput(page, 2);
      const input3 = getInput(page, 3);
      const input4 = getInput(page, 4);
      await addEventListener(input4, 'focus');

      expect((await getEventSummary(input4, 'focus')).counter).toBe(0);

      await input1.type('1234');
      await waitForStencilLifecycle(page);

      expect(await getProperty<string>(input1, 'value')).toBe('1');
      expect(await getProperty<string>(input2, 'value')).toBe('2');
      expect(await getProperty<string>(input3, 'value')).toBe('3');
      expect(await getProperty<string>(input4, 'value')).toBe('4');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
      expect(await getProperty<string>(host, 'value')).toStrictEqual('1234');
    });

    test('should spread value over input elements and focus last input element when delaying input events', async ({
      page,
    }) => {
      await initPinCode(page);
      const host = getHost(page);
      const input1 = getInput(page, 1);
      const input2 = getInput(page, 2);
      const input3 = getInput(page, 3);
      const input4 = getInput(page, 4);
      await addEventListener(input4, 'focus');

      expect((await getEventSummary(input4, 'focus')).counter).toBe(0);

      await input1.type('1234', { delay: 50 });
      await waitForStencilLifecycle(page);

      expect(await getProperty<string>(input1, 'value')).toBe('1');
      expect(await getProperty<string>(input2, 'value')).toBe('2');
      expect(await getProperty<string>(input3, 'value')).toBe('3');
      expect(await getProperty<string>(input4, 'value')).toBe('4');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
      expect(await getProperty<string>(host, 'value')).toStrictEqual('1234');
    });

    test('should spread value over input elements and focus last empty input element if value is too short', async ({
      page,
    }) => {
      await initPinCode(page);
      const host = getHost(page);
      const input1 = getInput(page, 1);
      const input2 = getInput(page, 2);
      const input3 = getInput(page, 3);
      const input4 = getInput(page, 4);
      await addEventListener(input4, 'focus');

      expect((await getEventSummary(input4, 'focus')).counter).toBe(0);

      await input1.type('12');
      await waitForStencilLifecycle(page);

      expect(await getProperty<string>(input1, 'value')).toBe('1');
      expect(await getProperty<string>(input2, 'value')).toBe('2');
      expect(await getProperty<string>(input3, 'value')).toBe('');
      expect(await getProperty<string>(input4, 'value')).toBe('');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('3-4');
      expect(await getProperty<string>(host, 'value')).toStrictEqual('12  ');
    });

    test('should spread value over input elements and focus last empty input element if value is too short and inputs events are delayed', async ({
      page,
    }) => {
      await initPinCode(page);
      const host = getHost(page);
      const input1 = getInput(page, 1);
      const input2 = getInput(page, 2);
      const input3 = getInput(page, 3);
      const input4 = getInput(page, 4);
      await addEventListener(input4, 'focus');

      expect((await getEventSummary(input4, 'focus')).counter).toBe(0);

      await input1.type('12', { delay: 50 });
      await waitForStencilLifecycle(page);

      expect(await getProperty<string>(input1, 'value')).toBe('1');
      expect(await getProperty<string>(input2, 'value')).toBe('2');
      expect(await getProperty<string>(input3, 'value')).toBe('');
      expect(await getProperty<string>(input4, 'value')).toBe('');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('3-4');
      expect(await getProperty<string>(host, 'value')).toStrictEqual('12  ');
    });

    test('should spread value over input elements and focus last empty input element if value is too long', async ({
      page,
    }) => {
      await initPinCode(page);
      const host = getHost(page);
      const input1 = getInput(page, 1);
      const input2 = getInput(page, 2);
      const input3 = getInput(page, 3);
      const input4 = getInput(page, 4);
      await addEventListener(input4, 'focus');

      expect((await getEventSummary(input4, 'focus')).counter).toBe(0);

      await input1.type('12345');
      await waitForStencilLifecycle(page);

      expect(await getProperty<string>(input1, 'value')).toBe('1');
      expect(await getProperty<string>(input2, 'value')).toBe('2');
      expect(await getProperty<string>(input3, 'value')).toBe('3');
      expect(await getProperty<string>(input4, 'value')).toBe('4');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
      expect(await getProperty<string>(host, 'value')).toStrictEqual('1234');
    });

    test('should spread value over input elements and focus last empty input element if value is too long and inputs events are delayed', async ({
      page,
    }) => {
      await initPinCode(page);
      const host = getHost(page);
      const input1 = getInput(page, 1);
      const input2 = getInput(page, 2);
      const input3 = getInput(page, 3);
      const input4 = getInput(page, 4);
      await addEventListener(input4, 'focus');

      expect((await getEventSummary(input4, 'focus')).counter).toBe(0);

      await input1.type('12345', { delay: 50 });
      await waitForStencilLifecycle(page);

      expect(await getProperty<string>(input1, 'value')).toBe('1');
      expect(await getProperty<string>(input2, 'value')).toBe('2');
      expect(await getProperty<string>(input3, 'value')).toBe('3');
      expect(await getProperty<string>(input4, 'value')).toBe('4');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
      expect(await getProperty<string>(host, 'value')).toStrictEqual('1234');
    });

    skipInBrowsers(['firefox', 'webkit'], () => {
      test('should type in value correctly with IME keyboard', async ({ page }) => {
        await initPinCode(page);
        const host = getHost(page);
        const input1 = getInput(page, 1);
        const input2 = getInput(page, 2);
        const input3 = getInput(page, 3);
        const input4 = getInput(page, 4);
        await addEventListener(input1, 'focus');
        await addEventListener(input4, 'focus');

        expect((await getEventSummary(input1, 'focus')).counter).toBe(0);
        expect((await getEventSummary(input4, 'focus')).counter).toBe(0);

        await page.keyboard.press('Tab');

        expect((await getEventSummary(input1, 'focus')).counter).toBe(1);

        const client = await page.context().newCDPSession(page);

        // Simulate IME keyboard input
        await client.send('Input.insertText', { text: '1' });

        await waitForStencilLifecycle(page);

        expect(await getProperty<string>(input1, 'value')).toBe('1');
        expect(await getProperty<string>(input2, 'value')).toBe('');
        expect(await getProperty<string>(input3, 'value')).toBe('');
        expect(await getProperty<string>(input4, 'value')).toBe('');
        expect(await getProperty<string>(host, 'value')).toStrictEqual('1   ');
      });
    });

    skipInBrowsers(['firefox', 'webkit'], () => {
      // This simulates the Android keyboard suggestion behavior where all digits are input by a single input event
      test('should input multiple values correctly when input as one input event', async ({ page }) => {
        await initPinCode(page);
        const host = getHost(page);
        const input1 = getInput(page, 1);
        const input2 = getInput(page, 2);
        const input3 = getInput(page, 3);
        const input4 = getInput(page, 4);
        await addEventListener(input1, 'focus');
        await addEventListener(input4, 'focus');

        expect((await getEventSummary(input1, 'focus')).counter).toBe(0);
        expect((await getEventSummary(input4, 'focus')).counter).toBe(0);

        await page.keyboard.press('Tab');

        expect((await getEventSummary(input1, 'focus')).counter).toBe(1);

        const client = await page.context().newCDPSession(page);

        // Simulate IME keyboard input
        await client.send('Input.insertText', { text: '1234' });

        await waitForStencilLifecycle(page);

        expect(await getProperty<string>(input1, 'value')).toBe('1');
        expect(await getProperty<string>(input2, 'value')).toBe('2');
        expect(await getProperty<string>(input3, 'value')).toBe('3');
        expect(await getProperty<string>(input4, 'value')).toBe('4');
        expect(await getProperty<string>(host, 'value')).toStrictEqual('1234');
      });
    });
  });

  skipInBrowsers(['firefox'], () => {
    test('onPaste', async ({ page }) => {
      await initPinCode(page);
      const host = getHost(page);
      const input1 = getInput(page, 1);
      const input2 = getInput(page, 2);
      const input3 = getInput(page, 3);
      const input4 = getInput(page, 4);
      await addEventListener(input1, 'paste');

      await input1.focus();

      await input1.evaluate((el) => {
        const data = new DataTransfer();
        data.items.add('1234', 'text/plain');
        const evt = new ClipboardEvent('paste', { clipboardData: data, bubbles: true });
        el.dispatchEvent(evt);
      });
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(input1, 'paste')).counter).toBe(1);

      expect(await getProperty<string>(input1, 'value')).toBe('1');
      expect(await getProperty<string>(input2, 'value')).toBe('2');
      expect(await getProperty<string>(input3, 'value')).toBe('3');
      expect(await getProperty<string>(input4, 'value')).toBe('4');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
      expect(await getProperty<string>(host, 'value')).toStrictEqual('1234');
    });
  });
});

test.describe('disabled state', () => {
  test('should have not-allowed cursor', async ({ page }) => {
    await initPinCode(page, { props: { disabled: true } });
    const input = getCurrentInput(page);

    expect(await getElementStyle(input, 'cursor')).toBe('not-allowed');
  });

  skipInBrowsers(['webkit'], () => {
    test('should not be focusable', async ({ page }) => {
      await initPinCode(page, {
        props: { disabled: true },
        options: { markupAfter: '<p-button>Some Button</p-button>' },
      });
      const button = page.locator('p-button');
      await addEventListener(button, 'focus');

      expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(0);

      await page.keyboard.press('Tab');
      expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(1);
    });
  });
});

test.describe('loading state', () => {
  test('should have not-allowed cursor', async ({ page }) => {
    await initPinCode(page, { props: { loading: true } });
    const input = getCurrentInput(page);

    expect(await getElementStyle(input, 'cursor')).toBe('not-allowed');
  });

  test('should be focusable but input can not be changed', async ({ page }) => {
    await initPinCode(page, { props: { loading: true } });
    const input = getCurrentInput(page);
    await addEventListener(input, 'focus');

    expect(await getProperty<string>(input, 'value')).toBe('');
    expect((await getEventSummary(input, 'focus')).counter, 'before focus').toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(input, 'focus')).counter, 'before focus').toBe(1);

    await page.keyboard.press('1');
    expect(await getProperty<string>(input, 'value')).toBe('');
  });

  skipInBrowsers(['webkit'], () => {
    test('should be possible to navigate through inputs by key=Tab/Shift+Tab', async ({ page }) => {
      await initPinCode(page, {
        props: { loading: true },
        options: { markupAfter: '<p-button>Some Button</p-button>' },
      });
      const host = getHost(page);
      const button = page.locator('p-button');
      await addEventListener(button, 'focus');

      await page.keyboard.press('Tab');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('1-4');

      await page.keyboard.press('Tab');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('2-4');

      await page.keyboard.press('Tab');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('3-4');

      await page.keyboard.press('Tab');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');

      await page.keyboard.press('Tab');
      expect((await getEventSummary(button, 'focus')).counter, 'after focus').toBe(1);
    });
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initPinCode(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-pin-code'], 'componentDidLoad: p-pin-code').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after prop change', async ({ page }) => {
    await initPinCode(page);
    const host = getHost(page);

    await setProperty(host, 'label', 'Some Label');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-pin-code'], 'componentDidUpdate: p-pin-code').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
