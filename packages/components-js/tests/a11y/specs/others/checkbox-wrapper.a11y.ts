import { type Page, test, expect } from '@playwright/test';
import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import type { FormState } from '@porsche-design-system/components/dist/types/bundle';

const getHost = (page: Page) => page.locator('p-checkbox-wrapper');
const getRoot = (page: Page) => page.locator('p-checkbox-wrapper .root');
const getInput = (page: Page) => page.locator('p-checkbox-wrapper input[type="checkbox"]');
const getMessage = (page: Page) => page.locator('p-checkbox-wrapper .message');

type InitOptions = {
  label?: string;
  useSlottedLabel?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
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

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initCheckbox(page);
  const input = await getInput(page);

  // await expectA11yToMatchSnapshot(page, input);
});

test.fixme('should expose correct accessibility tree properties in error state', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
      <p-checkbox-wrapper label="Some label" message="Some error message." state="error">
        <input type="checkbox" name="some-name" />
      </p-checkbox-wrapper>`
  );
  const input = getInput(page);
  const message = getMessage(page);

  // await expectA11yToMatchSnapshot(page, input, { message: 'Of Input' });
  // await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
});

test.fixme('should add/remove accessibility tree properties if state changes programmatically', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name" />
      </p-checkbox-wrapper>`
  );

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

test.fixme('should expose correct accessibility tree when loading=true', async ({ page }) => {
  await initCheckbox(page, { loading: true });
  const root = getRoot(page);

  // await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
});
