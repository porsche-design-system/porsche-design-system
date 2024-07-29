import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';
import type { FormState } from '@porsche-design-system/components/dist/types/bundle';

const getHost = (page: Page) => page.locator('p-text-field-wrapper');
const getInput = (page: Page) => page.locator('input');
const getToggleOrClearButton = (page: Page) => page.locator('p-text-field-wrapper p-button-pure button');
const getMessage = (page: Page) => page.locator('p-text-field-wrapper .message');

type InitOptions = {
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
  type?: 'number' | 'text' | 'password' | 'search';
  hasLabel?: boolean;
  hasUnit?: boolean;
  maxLength?: number;
  isWrappedInForm?: boolean;
  hasLocateAction?: boolean;
};

const initTextField = (page: Page, opts?: InitOptions): Promise<void> => {
  const {
    useSlottedLabel = false,
    useSlottedDescription = false,
    useSlottedMessage = false,
    state = 'none',
    type = 'text',
    hasLabel = false,
    hasUnit = false,
    maxLength,
    isWrappedInForm = false,
    hasLocateAction = false,
  } = opts || {};

  const link = '<a href="#" onclick="return false;">link</a>';
  const slottedLabel = useSlottedLabel ? `<span slot="label">Label with a ${link}</span>` : '';
  const slottedDescription = useSlottedDescription ? `<span slot="description">Description with a ${link}</span>` : '';
  const slottedMessage = useSlottedMessage ? `<span slot="message">Message with a ${link}</span>` : '';

  const attrs = [
    `state="${state}"`,
    hasLabel && 'label="Some label"',
    hasUnit && 'unit="km/h"',
    hasLocateAction && 'action-icon="locate"',
  ]
    .filter((x) => x)
    .join(' ');

  const textFieldWrapper = `<p-text-field-wrapper ${attrs}>
  ${slottedLabel}
  ${slottedDescription}
  <input type="${type}"${maxLength ? ` maxlength="${maxLength}"` : ''} />
  ${slottedMessage}
</p-text-field-wrapper>`;

  const content = isWrappedInForm ? `<form onsubmit="return false;">${textFieldWrapper}</form>` : textFieldWrapper;

  return setContentWithDesignSystem(page, content);
};

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initTextField(page, { hasLabel: true });
  const input = await getInput(page);

  // await expectA11yToMatchSnapshot(page, input);
});

test.fixme('should expose correct accessibility tree with description text', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
      <p-text-field-wrapper label="Some label" description="Some description">
        <input type="text">
      </p-text-field-wrapper>`
  );
  const input = await getInput(page);

  // await expectA11yToMatchSnapshot(page, input);
});

test.fixme('should expose correct accessibility tree properties in error state', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
        <p-text-field-wrapper label="Some label" description="Some description" message="Some error message" state="error">
          <input type="text">
        </p-text-field-wrapper>`
  );
  const input = await getInput(page);
  const message = await getMessage(page);

  // await expectA11yToMatchSnapshot(page, input, { message: 'Of Input' });
  // await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
});

test.fixme('should add/remove accessibility tree properties if state changes programmatically', async ({ page }) => {
  await initTextField(page, { hasLabel: true });

  const host = getHost(page);

  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message.');
  await waitForStencilLifecycle(page);

  const input = await getInput(page);
  const message = await getMessage(page);

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

test.fixme('should expose correct accessibility tree when password visibility button is clicked', async ({ page }) => {
  await initTextField(page, { type: 'password', hasLabel: true });
  const button = await getToggleOrClearButton(page);

  // await expectA11yToMatchSnapshot(page, button, { message: 'Initially' });

  await button.click();
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, button, { message: 'Pressed' });

  await button.click();
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, button, { message: 'Pressed again' });
});

test.fixme('should expose correct accessibility tree for input type=search with value', async ({ page }) => {
  await initTextField(page, { type: 'search', hasLabel: true });
  const host = getHost(page);
  const input = await getInput(page);

  await setProperty(input, 'value', 'value');
  await waitForStencilLifecycle(page);

  const button = await getToggleOrClearButton(page);
  // await expectA11yToMatchSnapshot(page, host, { interestingOnly: false });
});
