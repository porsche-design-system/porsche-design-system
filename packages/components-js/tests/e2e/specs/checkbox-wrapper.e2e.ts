import { expect, type Locator, test, type Page } from '@playwright/test';
import {
  addEventListener,
  getActiveElementTagName,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  hasFocus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForInputTransition,
  waitForStencilLifecycle,
} from '../helpers';
import type { CheckboxWrapperState } from '@porsche-design-system/components';

const getHost = (page: Page) => page.locator('p-checkbox-wrapper');
const getInput = (page: Page) => page.locator('p-checkbox-wrapper input[type="checkbox"]');
const getWrapper = (page: Page) => page.locator('p-checkbox-wrapper .wrapper');
const getLabel = (page: Page) => page.locator('p-checkbox-wrapper label');
const getMessage = (page: Page) => page.locator('p-checkbox-wrapper .message');

const setIndeterminate = async (locator: Locator, value: boolean) => {
  await setProperty(locator, 'indeterminate', value);
};

const setChecked = async (locator: Locator, value: boolean) => {
  await setProperty(locator, 'checked', value);
};

const getBackgroundImage = (input: Locator) => getElementStyle(input, 'backgroundImage');
const backgroundURL = 'url("data:image';

type InitOptions = {
  label?: string;
  useSlottedLabel?: boolean;
  useSlottedMessage?: boolean;
  state?: CheckboxWrapperState;
  loading?: boolean;
};

const initCheckbox = (page: Page, opts?: InitOptions): Promise<void> => {
  const {
    label = 'Some Label',
    useSlottedLabel = false,
    useSlottedMessage = false,
    state = 'none',
    loading = false,
  } = opts || {};

  const slottedLabel = useSlottedLabel
    ? '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';
  const slottedMessage = useSlottedMessage
    ? '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';

  const attrs = [!useSlottedLabel && `label="${label}"`, `state="${state}"`, loading && 'loading="true"']
    .filter(Boolean)
    .join(' ');

  return setContentWithDesignSystem(
    page,
    `
    <p-checkbox-wrapper ${attrs}>
      ${slottedLabel}
      <input type="checkbox" />
      ${slottedMessage}
    </p-checkbox-wrapper>`
  );
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
  const input = getInput(page);

  expect(await getBackgroundImage(input)).toBe('none');

  await input.click();

  const checkedImage = await getBackgroundImage(input);
  expect(checkedImage).toContain(backgroundURL);

  await input.click();
  expect(await getBackgroundImage(input)).toBe('none');

  // ensure that checked and indeterminate use different images
  await setIndeterminate(input, true);
  expect(checkedImage).not.toBe(await getBackgroundImage(input));
});

test('should not toggle checkbox on click in loading state', async ({ page }) => {
  await initCheckbox(page, { loading: true });
  const host = getHost(page);
  const input = getInput(page);
  await addEventListener(host, 'click');
  await addEventListener(input, 'change');

  await input.click({ force: true });
  const coords = await host.boundingBox();
  await page.mouse.click(coords.x + 1, coords.y + 1); // click the top left corner
  await page.mouse.click(coords.x + 1, coords.y + coords.height - 1); // click the bottom left corner
  await page.mouse.click(coords.x + coords.width - 1, coords.y + 1); // click the top right corner
  await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height - 1); // click the bottom right corner
  await page.mouse.click(coords.x + 1, coords.y + coords.height / 2); // click the left center
  await page.mouse.click(coords.x + coords.width - 1, coords.y + coords.height / 2); // click the right center
  await page.mouse.click(coords.x + coords.width / 2, coords.y + coords.height / 2); // click the center center

  expect((await getEventSummary(host, 'click')).counter).toBe(8);
  expect((await getEventSummary(input, 'change')).counter).toBe(0);

  await setProperty(host, 'loading', false);
  await waitForStencilLifecycle(page);

  await input.click();
  expect((await getEventSummary(host, 'click')).counter).toBe(9);
  expect((await getEventSummary(input, 'change')).counter).toBe(1);
});

test('should not toggle checkbox when pressed space in focus in loading state', async ({ page }) => {
  await initCheckbox(page, { loading: true });
  const host = getHost(page);
  const input = getInput(page);
  await addEventListener(input, 'change');

  await input.focus();
  expect(await getActiveElementTagName(page)).toBe('INPUT');

  await page.keyboard.press('Space');
  expect((await getEventSummary(input, 'change')).counter).toBe(0);

  await setProperty(host, 'loading', false);
  await waitForStencilLifecycle(page);

  await page.keyboard.press('Space');
  expect((await getEventSummary(input, 'change')).counter).toBe(1);
});

skipInBrowsers(['firefox', 'webkit'], () => {
  test('should keep focus if state switches to loading', async ({ page }) => {
    await initCheckbox(page);
    const input = getInput(page);
    const host = getHost(page);

    expect(await hasFocus(input)).toBe(false);
    await page.keyboard.press('Tab');
    expect(await hasFocus(input), 'after Tab').toBe(true);

    await setProperty(host, 'loading', true);
    await waitForStencilLifecycle(page);

    expect(await hasFocus(input), 'focus when loading').toBe(true);

    await setProperty(host, 'loading', false);
    await waitForStencilLifecycle(page);

    expect(await hasFocus(input), 'final focus').toBe(true);
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
  expect(await getActiveElementTagName(page)).toBe('BODY');

  await label.click();
  await waitForStencilLifecycle(page);

  expect(await isInputChecked()).toBe(false);
  expect(await getActiveElementTagName(page)).toBe('BODY');
});

test('should check/uncheck checkbox when checkbox attribute is changed programmatically', async ({ page }) => {
  await initCheckbox(page);
  const input = getInput(page);

  expect(await getBackgroundImage(input)).toBe('none');

  await setProperty(input, 'checked', true);
  expect(await getBackgroundImage(input)).toContain(backgroundURL);

  await setProperty(input, 'checked', false);
  expect(await getBackgroundImage(input)).toBe('none');
});

test('should check/uncheck checkbox when checkbox property is changed programmatically', async ({ page }) => {
  await initCheckbox(page);
  const input = getInput(page);

  expect(await getBackgroundImage(input)).toBe('none');

  await setProperty(input, 'checked', true);
  expect(await getBackgroundImage(input)).toContain(backgroundURL);

  await setProperty(input, 'checked', false);
  expect(await getBackgroundImage(input)).toBe('none');
});

skipInBrowsers(['firefox', 'webkit'], () => {
  test('should disable checkbox when disabled property is set programmatically', async ({ page }) => {
    await initCheckbox(page);
    const host = getHost(page);
    const input = getInput(page);
    const wrapper = getWrapper(page);

    const getWrapperCursor = () => getElementStyle(wrapper, 'cursor');
    const getInputCursor = () => getElementStyle(input, 'cursor');
    const getInputPointerEvents = () => getElementStyle(input, 'pointerEvents');

    expect(await getWrapperCursor()).toBe('auto');
    expect(await getInputCursor()).toBe('pointer');
    expect(await getInputPointerEvents()).toBe('auto');

    await setProperty(input, 'disabled', true);
    await waitForInputTransition(page);

    expect(await getWrapperCursor()).toBe('not-allowed');
    expect(await getInputCursor()).toBe('default');
    expect(await getInputPointerEvents()).toBe('none'); // prevents checkbox from being toggleable in disabled and especially loading state

    await setProperty(input, 'disabled', false);
    await waitForInputTransition(page);

    expect(await getWrapperCursor()).toBe('auto');
    expect(await getInputCursor()).toBe('pointer');
    expect(await getInputPointerEvents()).toBe('auto');

    await setProperty(host, 'loading', true);
    await waitForInputTransition(page);

    expect(await getWrapperCursor()).toBe('not-allowed');
    expect(await getInputCursor()).toBe('default');
    expect(await getInputPointerEvents()).toBe('none'); // prevents checkbox from being toggleable in disabled and especially loading state
  });
});

test.describe('indeterminate state', () => {
  skipInBrowsers(['webkit']);

  test('should show indeterminate state when checkbox is set to indeterminate', async ({ page }) => {
    await initCheckbox(page);
    const input = getInput(page);

    expect(await getBackgroundImage(input)).toBe('none');

    await setIndeterminate(input, true);
    expect(await getBackgroundImage(input)).toContain(backgroundURL);

    await setIndeterminate(input, false);
    expect(await getBackgroundImage(input)).toBe('none');
  });

  test('should remove indeterminate state when checkbox value is changed by the user', async ({ page }) => {
    await initCheckbox(page);
    const input = getInput(page);

    await setIndeterminate(input, true);
    const indeterminateImage = await getBackgroundImage(input);
    expect(indeterminateImage, 'first indeterminate set').toContain(backgroundURL);

    // checked Image is set
    await input.click();
    const checkedImage = await getBackgroundImage(input);
    expect(checkedImage, 'first click').toContain(backgroundURL);
    expect(indeterminateImage).not.toBe(checkedImage);

    await setIndeterminate(input, true);
    expect(await getBackgroundImage(input), 'second indeterminate set').toContain(backgroundURL);

    await input.click();
    expect(await getBackgroundImage(input), 'second click').toBe('none');
  });

  test('should keep indeterminate state when checkbox value is changed programmatically', async ({ page }) => {
    await initCheckbox(page);
    const input = getInput(page);

    await setIndeterminate(input, true);
    expect(await getBackgroundImage(input)).toContain(backgroundURL);

    await setChecked(input, true);
    expect(await getBackgroundImage(input)).toContain(backgroundURL);

    await setChecked(input, false);
    expect(await getBackgroundImage(input)).toContain(backgroundURL);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initCheckbox(page, { useSlottedMessage: true, useSlottedLabel: true, state: 'error' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-checkbox-wrapper'], 'componentDidLoad: p-checkbox-wrapper').toBe(1);
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

    expect(status.componentDidUpdate['p-checkbox-wrapper'], 'componentDidUpdate: p-checkbox-wrapper').toBe(0);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});
