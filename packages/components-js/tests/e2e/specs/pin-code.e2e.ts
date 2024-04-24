import type { Page } from 'playwright';
import { ElementHandle, expect, test } from '@playwright/test';
import {
  addEventListener,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';
import { Components } from '@porsche-design-system/components';

const getHost = (page: Page) => page.$('p-pin-code');
const getLabel = (page: Page) => page.$('p-pin-code label');
const getCurrentInput = (page: Page) => page.$('p-pin-code #current-input');
const getHiddenInput = (page: Page) => page.$('p-pin-code input[slot="internal-input"]');
const getInput = (page: Page, n: number) => page.$(`p-pin-code .wrapper input:nth-child(${n})`);
const getActiveElementsAriaLabelInShadowRoot = (page: Page, element: ElementHandle<HTMLElement>): Promise<string> => {
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

test.describe('label', () => {
  test('should focus input with id="current-input" when label text is clicked', async ({ page }) => {
    await initPinCode(page, { props: { label: 'Some label' } });
    const label = await getLabel(page);
    const input = await getCurrentInput(page);

    await addEventListener(input, 'focus');
    expect((await getEventSummary(input, 'focus')).counter).toBe(0);

    await label.click();

    expect((await getEventSummary(input, 'focus')).counter).toBe(1);
  });
});

test.describe('render', () => {
  for (const length of [1, 2, 3, 4, 5, 6] as (1 | 2 | 3 | 4 | 5 | 6)[]) {
    test(`should render correct amount of inputs with length=${length}`, async ({ page }) => {
      await initPinCode(page, { props: { length } });
      const host = await getHost(page);
      const amountOfInputs = await host.evaluate((el) => Array.from(el.shadowRoot.querySelectorAll('input')).length);
      expect(amountOfInputs).toBe(length);
    });
  }
});

test.describe('within form', () => {
  test.describe('hidden input', () => {
    test('should be rendered', async ({ page }) => {
      await initPinCode(page, { options: { isWithinForm: true } });
      const hiddenInput = await getHiddenInput(page);

      expect(hiddenInput).not.toBeNull();
    });

    test('should not be visible', async ({ page }) => {
      await initPinCode(page, { options: { isWithinForm: true } });
      const hiddenInput = await getHiddenInput(page);

      expect(await getElementStyle(hiddenInput, 'opacity')).toBe('0');
    });

    test('should sync with name, value, disabled and required props', async ({ page }) => {
      await initPinCode(page, { options: { isWithinForm: true } });
      const host = await getHost(page);
      const hiddenInput = await getHiddenInput(page);

      expect(await getProperty(hiddenInput, 'name')).toBe('name');
      expect(await getAttribute(hiddenInput, 'value')).toBe('');
      expect(await getProperty(hiddenInput, 'required')).toBeFalsy();
      expect(await getProperty(hiddenInput, 'disabled')).toBeFalsy();

      await setProperty(host, 'name', 'updatedName');
      await setProperty(host, 'value', '1234');
      await setProperty(host, 'disabled', true);
      await setProperty(host, 'required', true);
      await waitForStencilLifecycle(page);

      expect(await getProperty(hiddenInput, 'name')).toBe('updatedName');
      expect(await getProperty(hiddenInput, 'value')).toBe('1234');
      expect(await getProperty(hiddenInput, 'required')).toBeTruthy();
      expect(await getProperty(hiddenInput, 'disabled')).toBeTruthy();
    });
  });

  test('should submit on key Enter if form does not contain another input element and no button/input type=submit', async ({
    page,
  }) => {
    await initPinCode(page, { options: { isWithinForm: true } });
    const host = await getHost(page);
    const input = await getCurrentInput(page);
    const form = await page.$('form');
    await addEventListener(form, 'submit');
    await setProperty(host, 'value', '1234');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(
      await form.evaluate((form: HTMLFormElement) => Array.from(new FormData(form).values()).join()),
      'after Enter'
    ).toEqual('1234');
  });

  test('should submit on key Enter if form does contain another input type=hidden element and no input/button type=submit', async ({
    page,
  }) => {
    await initPinCode(page, { options: { isWithinForm: true, markupAfter: '<input type="hidden"/>' } });
    const host = await getHost(page);
    const input = await getCurrentInput(page);
    const form = await page.$('form');
    await addEventListener(form, 'submit');
    await setProperty(host, 'value', '1234');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(
      await form.evaluate((form: HTMLFormElement) => Array.from(new FormData(form).values()).join()),
      'after Enter'
    ).toEqual('1234');
  });

  test('should submit on key Enter if form does contain another input type=submit', async ({ page }) => {
    await initPinCode(page, { options: { isWithinForm: true, markupAfter: '<input type="submit"/>' } });
    const host = await getHost(page);
    const input = await getCurrentInput(page);
    const form = await page.$('form');
    await addEventListener(form, 'submit');
    await setProperty(host, 'value', '1234');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(
      await form.evaluate((form: HTMLFormElement) => Array.from(new FormData(form).values()).join()),
      'after Enter'
    ).toEqual('1234');
  });

  test('should submit on key Enter if form does contain another input element and a button type=submit', async ({
    page,
  }) => {
    await initPinCode(page, {
      options: { isWithinForm: true, markupAfter: '<input/><button type="submit">Some Button</button>' },
    });
    const host = await getHost(page);
    const input = await getCurrentInput(page);
    const form = await page.$('form');
    await addEventListener(form, 'submit');
    await setProperty(host, 'value', '1234');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(
      await form.evaluate((form: HTMLFormElement) => Array.from(new FormData(form).values()).join()),
      'after Enter'
    ).toEqual('1234');
  });

  test('should submit on key Enter if form does contain another input element and a input type=submit', async ({
    page,
  }) => {
    await initPinCode(page, {
      options: { isWithinForm: true, markupAfter: '<input/><input type="submit" />' },
    });
    const host = await getHost(page);
    const input = await getCurrentInput(page);
    const form = await page.$('form');
    await addEventListener(form, 'submit');
    await setProperty(host, 'value', '1234');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(
      await form.evaluate((form: HTMLFormElement) => Array.from(new FormData(form).values()).join()),
      'after Enter'
    ).toEqual('1234');
  });

  test('should submit on key Enter if form does contain another input element and a p-button type=submit', async ({
    page,
  }) => {
    await initPinCode(page, {
      options: {
        isWithinForm: true,
        markupAfter: '<input /><p-button type="submit">Some Button</p-button>',
      },
    });
    const host = await getHost(page);
    const input = await getCurrentInput(page);
    const form = await page.$('form');
    await addEventListener(form, 'submit');
    await setProperty(host, 'value', '1234');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(
      await form.evaluate((form: HTMLFormElement) => Array.from(new FormData(form).values()).join()),
      'after Enter'
    ).toEqual('1234');
  });

  test('should submit on key Enter if form does contain another input element and a p-button-pure type=submit', async ({
    page,
  }) => {
    await initPinCode(page, {
      options: {
        isWithinForm: true,
        markupAfter: '<input /><p-button-pure type="submit">Some Button</p-button-pure>',
      },
    });
    const host = await getHost(page);
    const input = await getCurrentInput(page);
    const form = await page.$('form');
    await addEventListener(form, 'submit');
    await setProperty(host, 'value', '1234');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(
      await form.evaluate((form: HTMLFormElement) => Array.from(new FormData(form).values()).join()),
      'after Enter'
    ).toEqual('1234');
  });

  test('should submit on key Enter if form does contain another input element, a p-button type=text and a p-button type=submit', async ({
    page,
  }) => {
    await initPinCode(page, {
      options: {
        isWithinForm: true,
        markupBefore: '<p-button">Some Button</p-button>',
        markupAfter: '<input /><p-button type="submit">Some submit Button</p-button>',
      },
    });
    const host = await getHost(page);
    const input = await getCurrentInput(page);
    const form = await page.$('form');
    await addEventListener(form, 'submit');
    await setProperty(host, 'value', '1234');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(1);
    expect(
      await form.evaluate((form: HTMLFormElement) => Array.from(new FormData(form).values()).join()),
      'after Enter'
    ).toEqual('1234');
  });

  test('should not submit on key Enter if form does contain another input element and no input/button type=submit', async ({
    page,
  }) => {
    await initPinCode(page, { options: { isWithinForm: true, markupAfter: '<input />' } });
    const host = await getHost(page);
    const input = await getCurrentInput(page);
    const form = await page.$('form');
    await addEventListener(form, 'submit');
    await setProperty(host, 'value', '1234');

    expect((await getEventSummary(form, 'submit')).counter, 'initial').toBe(0);

    await input.click();
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(form, 'submit')).counter, 'after Enter').toBe(0);
  });
});

test.describe('update event', () => {
  test('should not render hidden input', async ({ page }) => {
    await initPinCode(page);
    const hiddenInput = await getHiddenInput(page);

    expect(hiddenInput).toBeNull();
  });

  test('should emit update event on valid input and focus next input if there is one', async ({ page }) => {
    await initPinCode(page);
    const host = await getHost(page);
    await addEventListener(host, 'update');
    const currentInput = await getCurrentInput(page);

    await currentInput.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before input').toBe(0);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('1-4');

    page.keyboard.press('1');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after input').toBe(1);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('2-4');
    expect((await getEventSummary(host, 'update')).details, 'after input').toEqual([
      {
        isComplete: false,
        value: '1   ',
      },
    ]);

    page.keyboard.press('2');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after input').toBe(2);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('3-4');
    expect((await getEventSummary(host, 'update')).details, 'after input').toEqual([
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

    expect((await getEventSummary(host, 'update')).counter, 'after input').toBe(3);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
    expect((await getEventSummary(host, 'update')).details, 'after input').toEqual([
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

    expect((await getEventSummary(host, 'update')).counter, 'after input').toBe(4);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
    expect((await getEventSummary(host, 'update')).details, 'after input').toEqual([
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
  test('should not emit update event on not valid input', async ({ page }) => {
    await initPinCode(page);
    const host = await getHost(page);
    await addEventListener(host, 'update');
    const input = await getCurrentInput(page);

    await input.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before input').toBe(0);

    page.keyboard.press('a');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after input').toBe(0);
    expect((await getEventSummary(host, 'update')).details, 'after input').toEqual([]);
    expect(await getProperty(input, 'value')).toBe('');

    page.keyboard.press('^');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after input').toBe(0);
    expect((await getEventSummary(host, 'update')).details, 'after input').toEqual([]);
    expect(await getProperty(input, 'value')).toBe('');
  });

  test('should emit update event on backspace and focus correct input element', async ({ page }) => {
    await initPinCode(page);
    const host = await getHost(page);
    await setProperty(host, 'value', '1234');
    await addEventListener(host, 'update');
    const input4 = await getInput(page, 4);

    await input4.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before backspace').toBe(0);

    page.keyboard.press('Backspace');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after backspace').toBe(1);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
    expect((await getEventSummary(host, 'update')).details, 'after backspace').toEqual([
      {
        isComplete: false,
        value: '123 ',
      },
    ]);

    page.keyboard.press('Backspace');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after backspace').toBe(2);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('3-4');
    expect((await getEventSummary(host, 'update')).details, 'after backspace').toEqual([
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

  test('should emit update event on delete and focus correct input element', async ({ page }) => {
    await initPinCode(page);
    const host = await getHost(page);
    await setProperty(host, 'value', '1234');
    await addEventListener(host, 'update');
    const input1 = await getInput(page, 1);

    await input1.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before delete').toBe(0);

    page.keyboard.press('Delete');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after delete').toBe(1);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('1-4');
    expect((await getEventSummary(host, 'update')).details, 'after delete').toEqual([
      {
        isComplete: false,
        value: ' 234',
      },
    ]);

    page.keyboard.press('Delete');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after delete').toBe(2);
    expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('2-4');
    expect((await getEventSummary(host, 'update')).details, 'after delete').toEqual([
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

test.describe('events', () => {
  test.describe('onKeyDown', () => {
    test('should type in value correctly', async ({ page }) => {
      await initPinCode(page);
      const host = await getHost(page);
      const input1 = await getInput(page, 1);
      const input2 = await getInput(page, 2);
      const input3 = await getInput(page, 3);
      const input4 = await getInput(page, 4);
      await addEventListener(input1, 'focus');
      await addEventListener(input4, 'focus');

      expect((await getEventSummary(input1, 'focus')).counter).toBe(0);
      expect((await getEventSummary(input4, 'focus')).counter).toBe(0);

      await page.keyboard.press('Tab');

      expect((await getEventSummary(input1, 'focus')).counter).toBe(1);

      await page.keyboard.press('1');
      await waitForStencilLifecycle(page);

      expect(await getProperty(input1, 'value')).toBe('1');
      expect(await getProperty(input2, 'value')).toBe('');
      expect(await getProperty(input3, 'value')).toBe('');
      expect(await getProperty(input4, 'value')).toBe('');
      expect(await getProperty(host, 'value')).toStrictEqual('1   ');
    });

    skipInBrowsers(['firefox', 'webkit'], () => {
      test('should type in value correctly with IME keyboard', async ({ page }) => {
        await initPinCode(page);
        const host = await getHost(page);
        const input1 = await getInput(page, 1);
        const input2 = await getInput(page, 2);
        const input3 = await getInput(page, 3);
        const input4 = await getInput(page, 4);
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

        expect(await getProperty(input1, 'value')).toBe('1');
        expect(await getProperty(input2, 'value')).toBe('');
        expect(await getProperty(input3, 'value')).toBe('');
        expect(await getProperty(input4, 'value')).toBe('');
        expect(await getProperty(host, 'value')).toStrictEqual('1   ');
      });
    });

    skipInBrowsers(['firefox', 'webkit'], () => {
      test('should type in multiple values correctly with IME keyboard', async ({ page }) => {
        await initPinCode(page);
        const host = await getHost(page);
        const input1 = await getInput(page, 1);
        const input2 = await getInput(page, 2);
        const input3 = await getInput(page, 3);
        const input4 = await getInput(page, 4);
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

        expect(await getProperty(input1, 'value')).toBe('1');
        expect(await getProperty(input2, 'value')).toBe('2');
        expect(await getProperty(input3, 'value')).toBe('3');
        expect(await getProperty(input4, 'value')).toBe('4');
        expect(await getProperty(host, 'value')).toStrictEqual('1234');
      });
    });
  });
  test.describe('onInput', () => {
    test('should spread value over input elements and focus last input element', async ({ page }) => {
      await initPinCode(page);
      const host = await getHost(page);
      const input1 = await getInput(page, 1);
      const input2 = await getInput(page, 2);
      const input3 = await getInput(page, 3);
      const input4 = await getInput(page, 4);
      await addEventListener(input4, 'focus');

      expect((await getEventSummary(input4, 'focus')).counter).toBe(0);

      await input1.type('1234');
      await waitForStencilLifecycle(page);

      expect(await getProperty(input1, 'value')).toBe('1');
      expect(await getProperty(input2, 'value')).toBe('2');
      expect(await getProperty(input3, 'value')).toBe('3');
      expect(await getProperty(input4, 'value')).toBe('4');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
      expect(await getProperty(host, 'value')).toStrictEqual('1234');
    });

    test('should spread value over input elements and focus last empty input element if value is too short', async ({
      page,
    }) => {
      await initPinCode(page);
      const host = await getHost(page);
      const input1 = await getInput(page, 1);
      const input2 = await getInput(page, 2);
      const input3 = await getInput(page, 3);
      const input4 = await getInput(page, 4);
      await addEventListener(input4, 'focus');

      expect((await getEventSummary(input4, 'focus')).counter).toBe(0);

      await input1.type('12');
      await waitForStencilLifecycle(page);

      expect(await getProperty(input1, 'value')).toBe('1');
      expect(await getProperty(input2, 'value')).toBe('2');
      expect(await getProperty(input3, 'value')).toBe('');
      expect(await getProperty(input4, 'value')).toBe('');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('3-4');
      expect(await getProperty(host, 'value')).toStrictEqual('12  ');
    });
  });

  skipInBrowsers(['firefox'], () => {
    test('onPaste', async ({ page }) => {
      await initPinCode(page);
      const host = await getHost(page);
      const input1 = await getInput(page, 1);
      const input2 = await getInput(page, 2);
      const input3 = await getInput(page, 3);
      const input4 = await getInput(page, 4);
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

      expect(await getProperty(input1, 'value')).toBe('1');
      expect(await getProperty(input2, 'value')).toBe('2');
      expect(await getProperty(input3, 'value')).toBe('3');
      expect(await getProperty(input4, 'value')).toBe('4');
      expect(await getActiveElementsAriaLabelInShadowRoot(page, host)).toBe('4-4');
      expect(await getProperty(host, 'value')).toStrictEqual('1234');
    });
  });
});

test.describe('disabled state', () => {
  test('should have not-allowed cursor', async ({ page }) => {
    await initPinCode(page, { props: { disabled: true } });
    const input = await getCurrentInput(page);

    expect(await getElementStyle(input, 'cursor')).toBe('not-allowed');
  });

  skipInBrowsers(['webkit'], () => {
    test('should not be focusable', async ({ page }) => {
      await initPinCode(page, {
        props: { disabled: true },
        options: { markupAfter: '<p-button>Some Button</p-button>' },
      });
      const button = await page.$('p-button');
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
    const input = await getCurrentInput(page);

    expect(await getElementStyle(input, 'cursor')).toBe('not-allowed');
  });

  test('should be focusable but input can not be changed', async ({ page }) => {
    await initPinCode(page, { props: { loading: true } });
    const input = await getCurrentInput(page);
    await addEventListener(input, 'focus');

    expect(await getProperty(input, 'value')).toBe('');
    expect((await getEventSummary(input, 'focus')).counter, 'before focus').toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(input, 'focus')).counter, 'before focus').toBe(1);

    await page.keyboard.press('1');
    expect(await getProperty(input, 'value')).toBe('');
  });

  skipInBrowsers(['webkit'], () => {
    test('should be possible to navigate through inputs by key=Tab/Shift+Tab', async ({ page }) => {
      await initPinCode(page, {
        props: { loading: true },
        options: { markupAfter: '<p-button>Some Button</p-button>' },
      });
      const host = await getHost(page);
      const button = await page.$('p-button');
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
    const host = await getHost(page);

    await setProperty(host, 'label', 'Some Label');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-pin-code'], 'componentDidUpdate: p-pin-code').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
