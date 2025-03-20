import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  getElementStyle,
  getLifecycleStatus,
  getProperty,
  hasFocus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';
import type { FormState } from '@porsche-design-system/components';

const getHost = (page: Page) => page.locator('p-select-wrapper');
const getSelect = (page: Page) => page.locator('p-select-wrapper select');
const getMessage = (page: Page) => page.locator('p-select-wrapper .message');
const getLabel = (page: Page) => page.locator('p-select-wrapper label');

type InitOptions = {
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
};

const initSelect = (page: Page, opts?: InitOptions): Promise<void> => {
  const {
    useSlottedLabel = false,
    useSlottedDescription = false,
    useSlottedMessage = false,
    state = 'none',
  } = opts || {};

  const label = !useSlottedLabel ? 'label="Some label"' : '';
  const description = !useSlottedDescription ? 'description="Some description"' : '';
  const message = !useSlottedMessage ? 'message="Some message"' : '';
  const slottedLabel = useSlottedLabel
    ? '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';
  const slottedDescription = useSlottedDescription
    ? '<span slot="description">Some description with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';
  const slottedMessage = useSlottedMessage
    ? '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';

  return setContentWithDesignSystem(
    page,
    `
    <p-select-wrapper state="${state}" native="true" ${label} ${description} ${message}>
      ${slottedLabel}
      ${slottedDescription}
      <select>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
      ${slottedMessage}
    </p-select-wrapper>`
  );
};

test('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async ({
  page,
}) => {
  await initSelect(page);
  const host = getHost(page);

  await expect(getMessage(page), 'initially').toHaveCount(1);
  await expect(getMessage(page), 'initially').toBeEmpty();

  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message');
  await waitForStencilLifecycle(page);

  expect(getMessage(page), 'when state = error').toBeDefined();
  await expect(getMessage(page), 'initially').toContainText('Some error message');

  await setProperty(host, 'state', 'success');
  await setProperty(host, 'message', 'Some success message');
  await waitForStencilLifecycle(page);

  expect(getMessage(page), 'when state = success').toBeDefined();
  await expect(getMessage(page), 'initially').toContainText('Some success message');

  await setProperty(host, 'state', 'none');
  await setProperty(host, 'message', '');
  await waitForStencilLifecycle(page);

  await expect(getMessage(page), 'when state = none').toHaveCount(1);
});

test('should disable select when select is disabled programmatically', async ({ page }) => {
  await initSelect(page);
  const select = getSelect(page);

  const getSelectCursorStyle = () => getElementStyle(select, 'cursor');

  expect(await getSelectCursorStyle(), 'initially').toBe('pointer');

  await setProperty(select, 'disabled', true);
  await waitForStencilLifecycle(page);

  expect(await getSelectCursorStyle(), 'when disabled = true').toBe('not-allowed');

  await setProperty(select, 'disabled', false);
  await waitForStencilLifecycle(page);

  expect(await getSelectCursorStyle(), 'when disabled = false').toBe('pointer');
});

test.describe('focus state', () => {
  test('should focus select when label text is clicked', async ({ page }) => {
    await initSelect(page);
    const select = getSelect(page);
    const hasSelectFocus = () => hasFocus(select);

    const labelText = getLabel(page);
    expect(await hasSelectFocus()).toBe(false);

    await labelText.click();
    expect(await hasSelectFocus()).toBe(true);
  });
});

test.describe('hover state', () => {
  skipInBrowsers(['firefox', 'webkit']);
  test('should change border-color of select when label text is hovered', async ({ page }) => {
    await initSelect(page);
    await page.mouse.move(0, 300); // avoid potential hover initially

    const select = getSelect(page);
    const label = getLabel(page);
    const initialStyle = await getElementStyle(select, 'borderColor');
    expect(initialStyle).toBe('rgb(107, 109, 112)');

    await label.hover();
    const hoverColor = await getElementStyle(select, 'borderColor');
    expect(hoverColor).toBe('rgb(1, 2, 5)');
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initSelect(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-select-wrapper'], 'componentDidLoad: p-select-wrapper').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips when opened', async ({ page }) => {
    await initSelect(page);
    const select = getSelect(page);
    const [, secondOption] = await select.locator('option').all();

    expect(await getProperty(select, 'value')).toBe('a');

    // Ensure no update on native select render
    await select.click();
    await setProperty(secondOption, 'selected', true);
    await waitForStencilLifecycle(page);

    expect(await getProperty(select, 'value')).toBe('b');

    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});
