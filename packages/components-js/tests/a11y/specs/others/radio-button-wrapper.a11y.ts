import { getActiveElementId, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';
import type { FormState } from '@porsche-design-system/components/dist/types/bundle';

const getHost = (page: Page) => page.locator('p-radio-button-wrapper');
const getRoot = (page: Page) => page.locator('p-radio-button-wrapper .root');
const getInput = (page: Page) => page.locator('p-radio-button-wrapper input');
const getMessage = (page: Page) => page.locator('p-radio-button-wrapper .message');

type InitOptions = {
  useSlottedLabel?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
  loading?: boolean;
};

const initRadioButton = (page: Page, opts?: InitOptions): Promise<void> => {
  const { useSlottedLabel = false, useSlottedMessage = false, state = 'none', loading = false } = opts || {};

  const slottedLabel = useSlottedLabel
    ? '<span slot="label">Some label with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';
  const slottedMessage = useSlottedMessage
    ? '<span slot="message">Some message with a <a href="#" onclick="return false;">link</a>.</span>'
    : '';

  const attrs = [!useSlottedLabel && 'label="Some label"', `state=${state}`, loading && 'loading="true"']
    .filter(Boolean)
    .join(' ');

  return setContentWithDesignSystem(
    page,
    `
    <p-radio-button-wrapper ${attrs}>
      ${slottedLabel}
      <input type="radio" />
      ${slottedMessage}
    </p-radio-button-wrapper>`
  );
};

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initRadioButton(page);
  const input = getInput(page);

  // await expectA11yToMatchSnapshot(page, input);
});

test.fixme('should expose correct accessibility tree properties in error state', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
      <p-radio-button-wrapper label="Some label" message="Some error message." state="error">
        <input type="radio" name="some-name" />
      </p-radio-button-wrapper>`
  );
  const input = getInput(page);
  const message = getMessage(page);

  // await expectA11yToMatchSnapshot(page, input, { message: 'Of Input' });
  // await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
});

test.fixme('should add/remove accessibility tree properties if state changes programmatically', async ({ page }) => {
  await initRadioButton(page);

  const host = getHost(page);

  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message.');
  await waitForStencilLifecycle(page);

  const input = getInput(page);
  const message = getMessage(page);

  // await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = error' });
  // await expectA11yToMatchSnapshot(page, message, {
  //   message: 'Of Message when state = error',
  //   interestingOnly: false,
  // });

  await setProperty(host, 'state', 'success');
  await setProperty(host, 'message', 'Some success message.');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = success' });
  // await expectA11yToMatchSnapshot(page, message, {
  //   message: 'Of Message when state = success',
  //   interestingOnly: false,
  // });

  await setProperty(host, 'state', 'none');
  await setProperty(host, 'message', '');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = none' });
});

test(`should keep focus on radio buttons when using keyboard navigation `, async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name" id="radio-1"/>
      </p-radio-button-wrapper>
      <p-radio-button-wrapper label="Some label">
        <input type="radio" name="some-name" id="radio-2"/>
      </p-radio-button-wrapper>
      <button id="lastPageEl"></button>`
  );

  await page.keyboard.press('Tab');
  expect(await getActiveElementId(page)).toBe('radio-1');

  await page.keyboard.press('ArrowDown');
  expect(await getActiveElementId(page)).toBe('radio-2');

  await page.keyboard.press('ArrowRight');
  expect(await getActiveElementId(page)).toBe('radio-1');

  await page.keyboard.press('ArrowUp');
  expect(await getActiveElementId(page)).toBe('radio-2');

  await page.keyboard.press('ArrowLeft');
  expect(await getActiveElementId(page)).toBe('radio-1');

  await page.keyboard.press('Tab');
  expect(await getActiveElementId(page)).toBe('lastPageEl');
});

test.fixme('should expose correct accessibility tree when loading=true', async ({ page }) => {
  await initRadioButton(page, { loading: true });
  const root = getRoot(page);

  // await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
});
