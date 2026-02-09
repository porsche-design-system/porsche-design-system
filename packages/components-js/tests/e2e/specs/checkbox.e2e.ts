import { expect, type Locator, type Page, test } from '@playwright/test';
import type { CheckboxState } from '@porsche-design-system/components';
import {
  addEventListener,
  getActiveElementTagName,
  getConsoleErrorsAmount,
  getElementStyle,
  getEventSummary,
  getFormDataValue,
  getLifecycleStatus,
  getProperty,
  hasFocus,
  initConsoleObserver,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-checkbox');
const getFieldset = (page: Page) => page.locator('fieldset');
const getInput = (page: Page) => page.locator('p-checkbox input[type="checkbox"]');
const getWrapper = (page: Page) => page.locator('p-checkbox .wrapper');
const getInputWrapper = (page: Page) => page.locator('p-checkbox .input-wrapper');
const getLabel = (page: Page) => page.locator('p-checkbox label');
const getMessage = (page: Page) => page.locator('p-checkbox .message');
const getForm = (page: Page) => page.locator('form');
const getOuterLabel = (page: Page) => page.locator('label');
const getOuterLabelChild = (page: Page) => page.locator('label > :first-child');

const setChecked = async (locator: Locator, value: boolean) => {
  await setProperty(locator, 'checked', value);
};

async function performBoundaryClicks(host: Locator, page: Page) {
  const coords = await host.boundingBox();

  await page.mouse.click(coords.x + 1, coords.y + 1); // Top left corner
  await page.mouse.click(coords.x + 1, coords.y + coords.height - 1); // Bottom left corner
  await page.mouse.click(coords.x + coords.width - 1, coords.y + 1); // Top right corner
  await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height - 1); // Bottom right corner
  await page.mouse.click(coords.x + 1, coords.y + coords.height / 2); // Left center
  await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height / 2); // Right center
  await page.mouse.click(coords.x + coords.width / 2, coords.y + coords.height / 2); // Center center
}

const getMaskImage = async (input: Locator): Promise<string> => {
  return input.evaluate((el) => getComputedStyle(el, '::before').mask);
};

const backgroundURL = 'url("data:image';

type InitOptions = {
  name?: string;
  form?: string;
  value?: string;
  label?: string | boolean;
  checked?: boolean;
  required?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  useSlottedLabel?: boolean;
  useSlottedMessage?: boolean;
  isWithinForm?: true;
  state?: CheckboxState;
  loading?: boolean;
  markupBefore?: string;
  markupAfter?: string;
};

const initCheckbox = (page: Page, opts?: InitOptions): Promise<void> => {
  const {
    label = 'Some Label',
    name = 'some-name',
    value = '',
    form = '',
    checked = false,
    required = false,
    indeterminate = false,
    disabled = false,
    useSlottedLabel = false,
    useSlottedMessage = false,
    isWithinForm = false,
    state = 'none',
    loading = false,
    markupBefore = '',
    markupAfter = '',
  } = opts || {};

  const slottedLabel = useSlottedLabel
    ? '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';
  const slottedMessage = useSlottedMessage
    ? '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';

  const attrs = [
    !useSlottedLabel && label && `label="${label}"`,
    `state="${state}"`,
    `value="${value}"`,
    `name="${name}"`,
    form && `form="${form}"`,
    loading && 'loading="true"',
    checked && 'checked="true"',
    required && 'required="true"',
    disabled && 'disabled="true"',
    indeterminate && 'indeterminate="true"',
  ]
    .filter(Boolean)
    .join(' ');

  const markup = `${markupBefore}<p-checkbox ${attrs}>${slottedLabel}${slottedMessage}</p-checkbox>${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test('should add/remove message text with message if state changes programmatically', async ({ page }) => {
  await initCheckbox(page);
  const host = getHost(page);
  await expect(getMessage(page), 'initially').toHaveCount(1);
  await expect(getMessage(page), 'initially').toBeEmpty();

  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message');
  await waitForStencilLifecycle(page);

  expect(getMessage(page), 'when state = error').toBeDefined();
  await expect(getMessage(page), 'when state = error').toContainText('Some error message');

  await setProperty(host, 'state', 'success');
  await setProperty(host, 'message', 'Some success message');
  await waitForStencilLifecycle(page);

  expect(getMessage(page), 'when state = success').toBeDefined();
  await expect(getMessage(page), 'when state = success').toContainText('Some success message');

  await setProperty(host, 'state', 'none');
  await setProperty(host, 'message', '');
  await waitForStencilLifecycle(page);

  await expect(getMessage(page), 'when state = none').toHaveCount(1);
  await expect(getMessage(page), 'when state = none').toBeEmpty();
});

test('should toggle checkbox when input is clicked', async ({ page }) => {
  await initCheckbox(page);
  const host = getHost(page);
  const input = getInput(page);

  expect(await getMaskImage(input)).toBe('none');

  await input.click();

  const checkedImage = await getMaskImage(input);
  expect(checkedImage).toContain(backgroundURL);

  await input.click();
  expect(await getMaskImage(input)).toBe('none');

  // ensure that checked and indeterminate use different images
  await setProperty(host, 'indeterminate', true);
  expect(checkedImage).not.toBe(await getMaskImage(input));
});

test('should not toggle checkbox on click in loading state', async ({ page }) => {
  await initCheckbox(page, { loading: true });
  const host = getHost(page);
  const input = getInput(page);
  await addEventListener(host, 'change');

  await expect(host).toHaveJSProperty('checked', false);
  await input.click({ force: true });
  await expect(host).toHaveJSProperty('checked', false);

  await performBoundaryClicks(host, page);

  expect((await getEventSummary(host, 'change')).counter).toBe(0);

  await setProperty(host, 'loading', false);
  await waitForStencilLifecycle(page);

  await input.click();
  await expect(host).toHaveJSProperty('checked', true);

  expect((await getEventSummary(host, 'change')).counter).toBe(1);
});

test('should not toggle checkbox on click in disabled state', async ({ page }) => {
  await initCheckbox(page, { disabled: true });
  const host = getHost(page);
  const input = getInput(page);
  await addEventListener(host, 'change');

  await expect(host).toHaveJSProperty('checked', false);
  await input.click({ force: true });
  await expect(host).toHaveJSProperty('checked', false);

  await performBoundaryClicks(host, page);

  expect((await getEventSummary(host, 'change')).counter).toBe(0);

  await setProperty(host, 'disabled', false);
  await waitForStencilLifecycle(page);

  await input.click();
  await expect(host).toHaveJSProperty('checked', true);

  expect((await getEventSummary(host, 'change')).counter).toBe(1);
});

test.describe('focus', () => {
  test('should receive focus', async ({ page }) => {
    await initCheckbox(page);
    const input = getInput(page);

    await input.click();
    expect(await getActiveElementTagName(page)).toBe('P-CHECKBOX');
  });

  test('should receive focus in loading state', async ({ page }) => {
    await initCheckbox(page, { loading: true });
    const input = getInput(page);

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-CHECKBOX');
    await expect(input).toHaveCSS('outline', 'rgb(26, 68, 234) solid 2px');
    await expect(input).toHaveCSS('outline-offset', '2px');
  });

  test('should receive focus when focus is set programmatically', async ({ page }) => {
    await initCheckbox(page);
    const input = getInput(page);

    await input.focus();
    expect(await getActiveElementTagName(page)).toBe('P-CHECKBOX');
    await expect(input).toHaveCSS('outline', 'rgb(26, 68, 234) solid 2px');
    await expect(input).toHaveCSS('outline-offset', '2px');
  });

  test('should not toggle checkbox when pressed space in focus in loading state', async ({ page }) => {
    await initCheckbox(page, { loading: true });
    const host = getHost(page);
    const input = getInput(page);
    await addEventListener(host, 'change');

    await input.focus();
    expect(await getActiveElementTagName(page)).toBe('P-CHECKBOX');

    await page.keyboard.press('Space');
    expect((await getEventSummary(host, 'change')).counter).toBe(0);

    await setProperty(host, 'loading', false);
    await waitForStencilLifecycle(page);

    await page.keyboard.press('Space');
    expect((await getEventSummary(host, 'change')).counter).toBe(1);
  });

  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should keep focus if state switches to loading', async ({ page }) => {
      await initCheckbox(page);
      const host = getHost(page);

      expect(await hasFocus(host)).toBe(false);
      await page.keyboard.press('Tab');
      expect(await hasFocus(host), 'after Tab').toBe(true);

      await setProperty(host, 'loading', true);
      await waitForStencilLifecycle(page);

      expect(await hasFocus(host), 'focus when loading').toBe(true);

      await setProperty(host, 'loading', false);
      await waitForStencilLifecycle(page);

      expect(await hasFocus(host), 'final focus').toBe(true);
    });
  });
});

test('should toggle checkbox when label text is clicked and not set input as active element', async ({ page }) => {
  await initCheckbox(page);
  const label = getLabel(page);
  const input = getInput(page);
  const isInputChecked = (): Promise<boolean> => getProperty(input, 'checked');

  expect(await isInputChecked()).toBe(false);
  expect(await getActiveElementTagName(page)).not.toBe('INPUT');

  await label.click();
  await waitForStencilLifecycle(page);

  expect(await isInputChecked()).toBe(true);
  expect(await getActiveElementTagName(page)).toBe('P-CHECKBOX');

  await label.click();
  await waitForStencilLifecycle(page);

  expect(await isInputChecked()).toBe(false);
  expect(await getActiveElementTagName(page)).toBe('P-CHECKBOX');
});

test('should check/uncheck checkbox when checkbox property is changed programmatically', async ({ page }) => {
  await initCheckbox(page);
  const input = getInput(page);

  expect(await getMaskImage(input)).toBe('none');

  await setProperty(input, 'checked', true);
  expect(await getMaskImage(input)).toContain(backgroundURL);

  await setProperty(input, 'checked', false);
  expect(await getMaskImage(input)).toBe('none');
});

skipInBrowsers(['firefox', 'webkit'], () => {
  test('should disable checkbox when disabled property is set programmatically', async ({ page }) => {
    await initCheckbox(page);
    const host = getHost(page);
    const input = getInput(page);
    const wrapper = getInputWrapper(page);

    await expect(wrapper).toHaveCSS('cursor', 'pointer');
    await expect(input).toHaveCSS('pointer-events', 'auto');

    await setProperty(host, 'disabled', true);

    await expect(wrapper).toHaveCSS('cursor', 'not-allowed');
    await expect(input).toHaveCSS('cursor', 'not-allowed');
    await expect(input).toHaveCSS('pointer-events', 'none'); // prevents checkbox from being toggleable in disabled and especially loading state

    await setProperty(host, 'disabled', false);

    await expect(wrapper).toHaveCSS('cursor', 'pointer');
    await expect(input).toHaveCSS('cursor', 'pointer');

    await expect(input).toHaveCSS('pointer-events', 'auto');

    await setProperty(host, 'loading', true);

    await expect(wrapper).toHaveCSS('cursor', 'not-allowed');
    await expect(input).toHaveCSS('cursor', 'not-allowed');

    await expect(input).toHaveCSS('pointer-events', 'none'); // prevents checkbox from being toggleable in disabled and especially loading state
  });
});

test.describe('indeterminate state', () => {
  skipInBrowsers(['webkit']);

  test('should show indeterminate state when checkbox is set to indeterminate', async ({ page }) => {
    await initCheckbox(page);
    const host = getHost(page);
    const input = getInput(page);

    expect(await getMaskImage(input)).toBe('none');

    await setProperty(host, 'indeterminate', true);

    expect(await getMaskImage(input)).toContain(backgroundURL);

    await setProperty(host, 'indeterminate', false);
    expect(await getMaskImage(input)).toBe('none');
  });

  test('should remove indeterminate state when checkbox value is changed by the user', async ({ page }) => {
    await initCheckbox(page);
    const host = getHost(page);
    const input = getInput(page);

    await setProperty(host, 'indeterminate', true);
    const indeterminateImage = await getMaskImage(input);
    expect(indeterminateImage, 'first indeterminate set').toContain(backgroundURL);

    // checked Image is set
    await input.click();
    const checkedImage = await getMaskImage(input);
    expect(checkedImage, 'first click').toContain(backgroundURL);
    expect(indeterminateImage).not.toBe(checkedImage);

    await setProperty(host, 'indeterminate', true);
    expect(await getMaskImage(input), 'second indeterminate set').toContain(backgroundURL);

    await input.click();
    expect(await getMaskImage(input), 'second click').toBe('none');
  });

  test('should keep indeterminate state when checkbox value is changed programmatically', async ({ page }) => {
    await initCheckbox(page);
    const host = getHost(page);
    const input = getInput(page);

    await setProperty(host, 'indeterminate', true);
    expect(await getMaskImage(input)).toContain(backgroundURL);

    await setChecked(input, true);
    expect(await getMaskImage(input)).toContain(backgroundURL);

    await setChecked(input, false);
    expect(await getMaskImage(input)).toContain(backgroundURL);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initCheckbox(page, { useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-checkbox'], 'componentDidLoad: p-checkbox').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initCheckbox(page, { useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
    const input = getInput(page);

    await input.click();
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-checkbox'], 'componentDidUpdate: p-checkbox').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    await initCheckbox(page, {
      name,
      value,
      checked: true,
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

  test('should include name & value in FormData submit when checked in indeterminate state', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    await initCheckbox(page, {
      indeterminate: true,
      name,
      value,
      checked: true,
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

  test('should prevent form submission if the checkbox is required but not checked', async ({ page }) => {
    const name = 'name';
    const value = '';
    await initCheckbox(page, {
      required: true,
      name,
      value,
      checked: false,
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should submit form after dynamically setting `required` to false on an initially required, unchecked checkbox', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    await initCheckbox(page, {
      required: true,
      name,
      value,
      checked: false,
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

  test('should submit form after reset if the required checkbox was initially checked', async ({ page }) => {
    const name = 'name';
    const value = '';
    await initCheckbox(page, {
      required: true,
      name,
      value,
      checked: true,
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const host = getHost(page);
    const input = getInput(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await input.click();
    await expect(host).toHaveJSProperty('checked', false);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
  });

  test('should prevent form submission after reset if the checkbox is required and was initially unchecked', async ({
    page,
  }) => {
    const name = 'name';
    const value = '';
    await initCheckbox(page, {
      required: true,
      name,
      value,
      checked: false,
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const host = getHost(page);
    const input = getInput(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await input.click();
    await expect(host).toHaveJSProperty('checked', true);

    await page.locator('button[type="reset"]').click();
    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
  });

  test('should submit form when the checkbox is required and checked', async ({ page }) => {
    const name = 'name';
    const value = 'test';
    await initCheckbox(page, {
      required: true,
      name,
      value,
      checked: false,
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });
    const form = getForm(page);
    const host = getHost(page);
    const input = getInput(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await input.click();
    await expect(host).toHaveJSProperty('checked', true);

    await page.locator('button[type="submit"]').click();
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should not include name & value in FormData submit when disabled', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    await initCheckbox(page, {
      disabled: true,
      name,
      value,
      checked: true,
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(null);
  });

  test.fixme('should not include name & value in FormData submit when loading', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    await initCheckbox(page, {
      loading: true,
      name,
      value,
      checked: true,
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(null);
  });

  test('should only include name & value in FormData submit if checkbox is checked', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    await initCheckbox(page, {
      name,
      value,
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });
    const form = getForm(page);
    const input = getInput(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);
    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(null);

    await input.click();

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(2);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should include name & value in FormData submit if outside of form', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    const formId = 'myForm';
    await initCheckbox(page, {
      name,
      value,
      checked: true,
      form: formId,
      markupBefore: `<form id="myForm" onsubmit="return false;"><button type="submit">Submit</button></form>`,
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should reset checkbox state to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    const checked = true;
    const host = getHost(page);
    const input = getInput(page);
    await initCheckbox(page, {
      name,
      value,
      checked,
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await expect(host).toHaveJSProperty('value', value);
    await expect(input).toHaveValue(value);

    await input.click();
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('checked', false);
    await expect(input).toHaveJSProperty('checked', false);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);
    await expect(input).toHaveValue(value);
    await expect(host).toHaveJSProperty('checked', true);
    await expect(input).toHaveJSProperty('checked', true);

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable checkbox if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    const host = getHost(page);
    await initCheckbox(page, {
      name,
      value,
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initCheckbox(page, {
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });
    const host = getHost(page);
    const checkbox = getInput(page);
    const fieldset = getFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);
    await expect(checkbox).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
    await expect(checkbox).toHaveJSProperty('disabled', false);
  });

  test('should not set validity when disabled and throw no errors', async ({ page }) => {
    initConsoleObserver(page);
    await initCheckbox(page, {
      isWithinForm: true,
      required: true,
      disabled: true,
    });

    await waitForStencilLifecycle(page);
    expect(getConsoleErrorsAmount()).toBe(0);
  });
});

test.describe('Event', () => {
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger a change event when checkbox checked state has changed', async ({ page }) => {
      const value = 'some-value';
      await initCheckbox(page, { value });
      const host = getHost(page);
      const input = getInput(page);

      await addEventListener(host, 'change');
      expect((await getEventSummary(host, 'change')).counter).toBe(0);

      await input.click();
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'change')).counter).toBe(1);
      expect((await getEventSummary(host, 'change')).details).toEqual([{ isTrusted: true }]);
    });
    test('should trigger a blur event when the checkbox loses focus', async ({ page }) => {
      await initCheckbox(page);
      const host = getHost(page);
      const input = getInput(page);

      await addEventListener(host, 'blur');
      expect((await getEventSummary(host, 'blur')).counter).toBe(0);

      await input.click();
      await input.press('Tab');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'blur')).counter).toBe(1);
    });
  });
});

test.describe('Wrapped custom label', () => {
  test('should toggle checkbox when outer label is clicked', async ({ page }) => {
    await initCheckbox(page, {
      label: false,
      markupBefore: `<label>Some label text`,
      markupAfter: '</label>',
    });
    const label = getOuterLabel(page);
    const input = getInput(page);

    await expect(input).not.toBeChecked();

    await label.click();

    await expect(input).toBeChecked();
  });

  test('should not toggle disabled checkbox when outer label is clicked', async ({ page }) => {
    await initCheckbox(page, {
      label: false,
      disabled: true,
      markupBefore: `<label>Some label text`,
      markupAfter: '</label>',
    });
    const label = getOuterLabel(page);
    const input = getInput(page);

    await expect(input).not.toBeChecked();

    await label.click();

    await expect(input).not.toBeChecked();
  });

  test('should not toggle checkbox when outer label has link and is clicked', async ({ page }) => {
    await initCheckbox(page, {
      label: false,
      markupBefore: `<label>Some label text with a <a>link</a>.`,
      markupAfter: '</label>',
    });
    const labelChild = getOuterLabelChild(page);
    const input = getInput(page);

    await expect(input).not.toBeChecked();

    await labelChild.click();

    await expect(input).not.toBeChecked();
  });

  test('should not toggle checkbox when outer label has button and is clicked', async ({ page }) => {
    await initCheckbox(page, {
      label: false,
      markupBefore: `<label>Some label text with a <button>button</button>.`,
      markupAfter: '</label>',
    });
    const labelChild = getOuterLabelChild(page);
    const input = getInput(page);

    await expect(input).not.toBeChecked();

    await labelChild.click();

    await expect(input).not.toBeChecked();
  });
});
