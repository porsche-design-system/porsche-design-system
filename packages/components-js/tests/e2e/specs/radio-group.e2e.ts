import { expect, Locator, test } from '@playwright/test';
import type { Components } from '@porsche-design-system/components/src/components';
import { RadioGroupOption } from '@porsche-design-system/components/src/components/radio-group/radio-group/radio-group-utils';
import type { Page } from 'playwright';
import {
  addEventListener,
  getConsoleErrorsAmount,
  getEventSummary,
  getFormDataValue,
  getFormDataValues,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  initConsoleObserver,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-radio-group');
const getFirstOptionHost = (page: Page) => page.locator('p-radio-group-option').first();
const getFieldset = (page: Page) => page.locator('fieldset').first();
const getRadioGroupValue = async (page: Page): Promise<string | number> => await getProperty(getHost(page), 'value');
const getRadioGroupOption = (page: Page, n: number) =>
  page.locator(`p-radio-group p-radio-group-option:nth-child(${n})`);
const getRadioGroupOptions = (page: Page) => page.locator('p-radio-group p-radio-group-option');
const getSelectedRadioGroupOptionProperty = async <K extends keyof RadioGroupOption>(
  page: Page,
  property: K
): Promise<RadioGroupOption[K]> =>
  await page
    .locator('p-radio-group p-radio-group-option')
    .evaluateAll(
      (options, property) =>
        ((options.find((option: RadioGroupOption) => option.selected) as RadioGroupOption)?.[
          property
        ] as RadioGroupOption[K]) ?? undefined,
      property
    );

const getSelectedOptionIndex = async (page: Page): Promise<number> =>
  await page
    .locator('p-radio-group p-radio-group-option')
    .evaluateAll((options: RadioGroupOption[]) =>
      options.filter((option) => !option.hidden).indexOf(options.find((option: RadioGroupOption) => option.selected))
    );

const getForm = (page: Page) => page.locator('form');

const setValue = async (page: Page, value: string) => {
  const host: Locator = getHost(page);
  await host.evaluate((el, value) => {
    (el as HTMLPRadioGroupElement).value = value;
  }, value);
};

const addOption = async (page: Page, value: string, textContent?: string) => {
  const host = getHost(page);
  await host.evaluate(
    (el, { value, textContent }) => {
      const option: any = document.createElement('p-radio-group-option');
      option.value = value;
      option.textContent = textContent;
      el.append(option);
    },
    {
      value,
      textContent: textContent ? textContent : value,
    }
  );
};

type Option = {
  value: string;
  disabled?: boolean;
  loading?: boolean;
  hidden?: boolean;
  image?: string;
};

type InitOptions = {
  props?: Components.PRadioGroup;
  slots?: {
    label?: string;
    description?: string;
    message?: string;
  };
  options?: {
    values?: (Option | Option[])[];
    isWithinForm?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initRadioGroup = (page: Page, opt?: InitOptions): Promise<void> => {
  const { props = { name: 'options' }, slots, options } = opt || {};
  const {
    values = [{ value: 'a' }, { value: 'b' }, { value: 'c' }],
    isWithinForm = true,
    markupBefore = '',
    markupAfter = '',
  } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const getOption = (opt: Option) => {
    const attrs = [opt.loading ? 'loading' : '', opt.disabled ? 'disabled' : '', opt.hidden ? 'hidden' : ''].join(' ');
    return `<p-radio-group-option name="${props.name}" label="Some Label ${opt.value.toUpperCase()}" ${opt.value ? `value="${opt.value}"` : ''} ${attrs}></p-radio-group-option>`;
  };

  const getOptions = (options: Option | Option[]) =>
    !Array.isArray(options) ? getOption(options) : options.map((option) => getOption(option));

  const radioGroupOptions = values
    .map((x, idx) => {
      const options = getOptions(x);
      return Array.isArray(options) ? options.map((node) => node).join('') : options;
    })
    .join('\n');

  const markup = `${markupBefore}
      <p-radio-group ${getHTMLAttributes(props)}>
        ${label}
        ${description}
        ${radioGroupOptions}
        ${message}
      </p-radio-group>
      ${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('Change Event', () => {
  test('should emit change event when option is selected by click', async ({ page }) => {
    await initRadioGroup(page);
    const host = getHost(page);
    await addEventListener(host, 'change');

    const option = getRadioGroupOption(page, 1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'change')).counter, 'after option select').toBe(1);
    expect((await getEventSummary(host, 'change')).details).toEqual([{ isTrusted: true }]);
  });

  skipInBrowsers(['webkit'], () => {
    test('should emit change event when option is selected by keyboard', async ({ page }) => {
      await initRadioGroup(page, { props: { value: 'a', name: 'options', label: 'Some Label' } });

      const host = getHost(page);
      await addEventListener(host, 'change');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter, 'before option select').toBe(0);

      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter, 'after option select').toBe(1);
      expect((await getEventSummary(host, 'change')).details).toEqual([{ isTrusted: true }]);
    });
  });
});

test.describe('Blur Event', () => {
  test('should emit blur event when focus of an option is lost by mouse click', async ({ page }) => {
    await initRadioGroup(page, { options: { markupAfter: '<button id="test-button">Some button</button>' } });
    const host = getHost(page);
    await addEventListener(host, 'blur');
    const option = getFirstOptionHost(page);
    const button = page.locator('#test-button');

    await option.click();
    await expect(option).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'before item lost focus').toBe(0);

    await button.click();
    await expect(button).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after input lost focus').toBe(1);
  });

  test('should emit blur event when focus is moved to next item by click', async ({ page }) => {
    await initRadioGroup(page, { options: { markupAfter: '<button id="test-button">Some button</button>' } });
    const host = getHost(page);
    await addEventListener(host, 'blur');
    const options = getRadioGroupOptions(page);
    const button = page.locator('#test-button');

    await options.nth(0).click();
    await expect(options.nth(0)).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 1st item got focus').toBe(0);

    await options.nth(1).click();
    await expect(options.nth(1)).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 2nd item got focus').toBe(1);

    await button.click();
    await expect(button).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 2nd item lost focus').toBe(2);
  });

  test('should emit blur event when focus of an input is lost by keyboard', async ({ page }) => {
    await initRadioGroup(page, {
      props: { value: 'a', name: 'options', label: 'Some Label' },
      options: { markupAfter: '<button id="test-button">Some button</button>' },
    });
    const host = getHost(page);
    await addEventListener(host, 'blur');
    const options = getRadioGroupOptions(page);
    const button = page.locator('#test-button');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    await expect(options.nth(0)).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 1st item got focus').toBe(0);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);
    await expect(options.nth(1)).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 2nd item got focus').toBe(1);

    await page.keyboard.press('Tab');
    // await expect(button).toBeFocused();
    expect((await getEventSummary(host, 'blur')).counter, 'after 2nd item lost focus').toBe(2);
  });
});

test.describe('keyboard behavior', () => {
  test('should focus 1st available element on tab', async ({ page }) => {
    await initRadioGroup(page, {
      props: { name: 'options', label: 'Some Label' },
      options: {
        values: [{ value: 'a' }, { value: 'b' }, { value: 'c' }],
      },
    });

    const options = getRadioGroupOptions(page);

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    await expect(options.nth(0)).toBeFocused();
  });

  test('should focus checked element on tab', async ({ page }) => {
    await initRadioGroup(page, {
      props: { value: 'b', name: 'options', label: 'Some Label' },
      options: {
        values: [{ value: 'a' }, { value: 'b' }, { value: 'c' }],
      },
    });

    const options = getRadioGroupOptions(page);

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    await expect(options.nth(1)).toBeFocused();
  });

  test('should skip disabled option and focus 1st available element on tab', async ({ page }) => {
    await initRadioGroup(page, {
      props: { name: 'options', label: 'Some Label' },
      options: {
        values: [{ value: 'a', disabled: true }, { value: 'b' }, { value: 'c' }],
      },
    });

    const options = getRadioGroupOptions(page);

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    await expect(options.nth(1)).toBeFocused();
  });

  test('should skip disabled option and focus checked element on tab', async ({ page }) => {
    await initRadioGroup(page, {
      props: { value: 'c', name: 'options', label: 'Some Label' },
      options: {
        values: [{ value: 'a', disabled: true }, { value: 'b' }, { value: 'c' }],
      },
    });

    const options = getRadioGroupOptions(page);

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    await expect(options.nth(2)).toBeFocused();
  });

  test('should skip checked disabled option and focus 1st available element on tab', async ({ page }) => {
    await initRadioGroup(page, {
      props: { value: 'a', name: 'options', label: 'Some Label' },
      options: {
        values: [{ value: 'a', disabled: true }, { value: 'b' }, { value: 'c' }],
      },
    });

    const options = getRadioGroupOptions(page);

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    await expect(options.nth(1)).toBeFocused();
  });

  test('should skip disabled and loading options when pressing ArrowUp/ArrowDown', async ({ page }) => {
    await initRadioGroup(page, {
      props: { value: 'a', name: 'options', label: 'Some Label' },
      options: {
        values: [
          { value: 'a' },
          { value: 'b', disabled: true },
          { value: 'c' },
          { value: 'd', loading: true },
          { value: 'e' },
          { value: 'f', disabled: true },
        ],
      },
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getProperty<boolean>(getRadioGroupOption(page, 2), 'disabled'), 'disabled option').toBe(true);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getSelectedOptionIndex(page)).toBe(2);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getSelectedOptionIndex(page)).toBe(4);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getSelectedOptionIndex(page)).toBe(0);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getSelectedOptionIndex(page)).toBe(2);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getSelectedOptionIndex(page)).toBe(4);

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getSelectedOptionIndex(page)).toBe(0);
  });
});

test.describe('click events', () => {
  test.describe('disabled', () => {
    skipInBrowsers(['webkit'], () => {
      test('should not be able to interact', async ({ page }) => {
        await initRadioGroup(page, { props: { name: 'options', disabled: true } });
        const host = getHost(page);
        await addEventListener(host, 'change');

        const option1 = getRadioGroupOption(page, 1);
        const option2 = getRadioGroupOption(page, 2);
        const option3 = getRadioGroupOption(page, 3);
        await option1.click();
        await option2.click();
        await option3.click();
        await waitForStencilLifecycle(page);

        expect((await getEventSummary(host, 'change')).counter, 'after option select').toBe(0);
      });
    });
  });

  test.describe('loading', () => {
    skipInBrowsers(['webkit'], () => {
      test('should not be able to interact', async ({ page }) => {
        await initRadioGroup(page, { props: { name: 'options', loading: true } });
        const host = getHost(page);
        await addEventListener(host, 'change');

        const option1 = getRadioGroupOption(page, 1);
        const option2 = getRadioGroupOption(page, 2);
        const option3 = getRadioGroupOption(page, 3);
        await option1.click();
        await option2.click();
        await option3.click();
        await waitForStencilLifecycle(page);

        expect((await getEventSummary(host, 'change')).counter, 'after option select').toBe(0);
      });
    });
  });
});

test.describe('slots', () => {
  test('should update when selected option is added', async ({ page }) => {
    await initRadioGroup(page, undefined);
    expect(await getRadioGroupValue(page)).toBe('');

    await setValue(page, 'c');
    await waitForStencilLifecycle(page);
    expect(await getRadioGroupValue(page)).toBe('c');

    await addOption(page, 'd', 'd');
    await waitForStencilLifecycle(page);

    await setValue(page, 'd');
    await waitForStencilLifecycle(page);
    expect(await getRadioGroupValue(page), 'after option added').toBe('d');
    expect(await getSelectedRadioGroupOptionProperty(page, 'value'), 'after option added').toEqual('d');
  });

  test('should update when selected option is removed', async ({ page }) => {
    await initRadioGroup(page, { props: { name: 'options', value: 'c' } });
    await waitForStencilLifecycle(page);

    expect(await getRadioGroupValue(page), 'initial').toBe('c');
    expect(await getSelectedRadioGroupOptionProperty(page, 'value'), 'initial').toEqual('c');

    const host: Locator = getHost(page);
    await host.evaluate((el) => {
      (el as HTMLPRadioGroupElement).lastElementChild.remove();
    });

    await waitForStencilLifecycle(page);

    expect(await getRadioGroupValue(page), 'after option selected removed').toBe('c');
    expect(await getSelectedRadioGroupOptionProperty(page, 'value'), 'after option selected removed').toBeUndefined();
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initRadioGroup(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-radio-group'], 'componentDidLoad: p-radio-group').toBe(1);
    expect(status1.componentDidLoad['p-radio-group-option'], 'componentDidLoad: p-radio-group-option').toBe(3);

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips when selecting option', async ({ page }) => {
    await initRadioGroup(page);

    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-radio-group'], 'componentDidLoad: p-radio-group').toBe(1);
    expect(status1.componentDidLoad['p-radio-group-option'], 'componentDidLoad: p-radio-group-option').toBe(3);

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    const options = getRadioGroupOptions(page);
    // Hover should not cause additional lifecycles in option
    await options.nth(0).hover();
    await options.nth(0).click();
    await waitForStencilLifecycle(page);

    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-radio-group-option'], 'componentDidUpdate: p-radio-group-option').toBe(4);
    expect(status2.componentDidUpdate['p-radio-group'], 'componentDidUpdate: p-radio-group').toBe(1);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(5);
  });

  test('should work without unnecessary round trips on selection change by click', async ({ page }) => {
    await initRadioGroup(page, { props: { name: 'options', value: 'a' } });
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-radio-group'], 'componentDidLoad: p-radio-group').toBe(1);
    expect(status1.componentDidLoad['p-radio-group-option'], 'componentDidLoad: p-radio-group-option').toBe(3);

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

    const option1 = getRadioGroupOption(page, 2);
    await option1.click();
    await waitForStencilLifecycle(page);

    // Use polling to fix flakiness
    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-radio-group-option'];
        },
        {
          message: 'componentDidUpdate: p-radio-group-option',
        }
      )
      .toBe(6);
    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-radio-group'];
        },
        {
          message: 'componentDidUpdate: p-radio-group',
        }
      )
      .toBe(1);
    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate.all;
        },
        {
          message: 'componentDidUpdate: all',
        }
      )
      .toBe(7);
  });

  skipInBrowsers(['webkit'], () => {
    test('should work without unnecessary round trips on selection change by keyboard', async ({ page }) => {
      await initRadioGroup(page, { props: { name: 'options', value: 'a' } });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      const status1 = await getLifecycleStatus(page);

      expect(status1.componentDidLoad['p-radio-group'], 'componentDidLoad: p-radio-group').toBe(1);
      expect(status1.componentDidLoad['p-radio-group-option'], 'componentDidLoad: p-radio-group-option').toBe(3);

      expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
      expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

      await page.keyboard.press('ArrowDown');
      await waitForStencilLifecycle(page);

      const status2 = await getLifecycleStatus(page);
      expect(status2.componentDidUpdate['p-radio-group-option'], 'componentDidUpdate: p-radio-group-option').toBe(6);
      expect(status2.componentDidUpdate['p-radio-group'], 'componentDidUpdate: p-radio-group').toBe(1);
      expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(7);
    });
  });
});

test.describe('Sync Props', () => {
  let options: Locator[] = [];
  test.beforeEach(async ({ page }) => {
    options = await page.locator('p-radio-group-option').all();
  });

  test('should sync `theme` prop for children', async ({ page }) => {
    await initRadioGroup(page);
    const radioGroup = getHost(page);

    for (const child of options) {
      await expect(child).toHaveJSProperty('theme', 'light');
    }
    await setProperty(radioGroup, 'theme', 'dark');
    await waitForStencilLifecycle(page);

    for (const child of options) {
      await expect(child).toHaveJSProperty('theme', 'dark');
    }
  });

  test('should sync `name` prop for children', async ({ page }) => {
    await initRadioGroup(page);
    const radioGroup = getHost(page);
    const newName = 'sync-test';
    for (const child of options) {
      await expect(child).toHaveJSProperty('name', 'options');
    }
    await setProperty(radioGroup, 'name', newName);
    await waitForStencilLifecycle(page);

    for (const child of options) {
      await expect(child).toHaveJSProperty('name', newName);
    }
  });

  test('should sync `disabled` prop for children', async ({ page }) => {
    await initRadioGroup(page);
    const radioGroup = getHost(page);
    for (const child of options) {
      await expect(child).toHaveJSProperty('disabled', false);
    }
    await setProperty(radioGroup, 'disabled', true);
    await waitForStencilLifecycle(page);

    for (const child of options) {
      await expect(child).toHaveJSProperty('disabled', true);
    }
  });

  test('should sync `loading` prop for children', async ({ page }) => {
    await initRadioGroup(page);
    const radioGroup = getHost(page);
    for (const child of options) {
      await expect(child).toHaveJSProperty('loading', false);
    }
    await setProperty(radioGroup, 'loading', true);
    await waitForStencilLifecycle(page);

    for (const child of options) {
      await expect(child).toHaveJSProperty('loading', true);
    }
  });

  test('should sync `state` prop for children', async ({ page }) => {
    await initRadioGroup(page);
    const radioGroup = getHost(page);
    for (const child of options) {
      await expect(child).toHaveJSProperty('state', 'none');
    }
    await setProperty(radioGroup, 'state', 'error');
    await waitForStencilLifecycle(page);

    for (const child of options) {
      await expect(child).toHaveJSProperty('state', 'error');
    }
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit if updated programmatically', async ({ page }) => {
    const name = 'name';
    const value = 'a';
    await initRadioGroup(page, {
      props: { name, value },
      options: { isWithinForm: true, markupAfter: '<button type="submit">Submit</button>' },
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should include name & value in FormData submit if updated using keyboard', async ({ page }) => {
    const value = 'a';
    const name = 'options';
    await initRadioGroup(page, {
      props: { name, value, label: 'Options' },
      options: {
        isWithinForm: true,
        markupBefore: '<p-text>Some Text</p-text>',
        markupAfter: '<button type="submit">Submit</button>',
      },
    });
    const form = getForm(page);
    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValues(form, name)).toStrictEqual(['b']);
  });

  test('should include name & value in FormData submit if updated using mouse', async ({ page }) => {
    const name = 'options';
    const value = ['b'];
    await initRadioGroup(page, {
      props: { name },
      options: {
        isWithinForm: true,
        markupBefore: '<p-text>Some Text</p-text>',
        markupAfter: '<button type="submit">Submit</button>',
      },
    });
    const form = getForm(page);
    const text = page.locator('p-text');
    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    const radioGroupOption = getRadioGroupOption(page, 2);
    await radioGroupOption.click();
    await waitForStencilLifecycle(page);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValues(form, name)).toStrictEqual(value);
  });

  test('should include name & value in FormData submit if outside of form', async ({ page }) => {
    const name = 'name';
    const value = 'a';
    const formId = 'myForm';
    await initRadioGroup(page, {
      props: { name, value, form: formId },
      options: {
        isWithinForm: false,
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

  test('should reset radio-group value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = 'b';
    const newValue = 'c';
    const host = getHost(page);
    const radioGroup = getHost(page);
    await initRadioGroup(page, {
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

    await setProperty(radioGroup, 'value', newValue);

    await expect(host).toHaveJSProperty('value', newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable radio-group if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    const host = getHost(page);
    await initRadioGroup(page, {
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
    await initRadioGroup(page, {
      options: {
        isWithinForm: true,
        markupBefore: `<fieldset disabled>`,
        markupAfter: `</fieldset>`,
      },
    });
    const host = getHost(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
  });

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initRadioGroup(page, {
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
