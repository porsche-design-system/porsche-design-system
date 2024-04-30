import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';
import type { FormState } from '@porsche-design-system/components/dist/types/bundle';

const getHost = (page: Page) => page.$('p-select-wrapper');
const getSelect = (page: Page) => page.$('p-select-wrapper select');
const getMessage = (page: Page) => page.$('p-select-wrapper .message');

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

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initSelect(page);
  const select = await getSelect(page);

  // await expectA11yToMatchSnapshot(page, select);
});

test.fixme('should update accessibility tree with message text if state changes programmatically', async ({ page }) => {
  await initSelect(page);
  const host = await getHost(page);

  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message.');
  await waitForStencilLifecycle(page);

  const select = await getSelect(page);
  const message = await getMessage(page);

  // await expectA11yToMatchSnapshot(page, select, { message: 'Of Select when state = error' });
  // await expectA11yToMatchSnapshot(page, message, {
  //   message: 'Of Message when state = error',
  //   interestingOnly: false,
  // });

  await setProperty(host, 'state', 'success');
  await setProperty(host, 'message', 'Some success message.');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, select, { message: 'Of Select when state = success' });
  // await expectA11yToMatchSnapshot(page, message, {
  //   message: 'Of Message when state = success',
  //   interestingOnly: false,
  // });

  await setProperty(host, 'state', 'none');
  await setProperty(host, 'message', '');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, select, { message: 'Of Select when state = none' });
});
