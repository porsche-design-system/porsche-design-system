import {
  expectA11yToMatchSnapshot,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import type { FormState } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-checkbox-wrapper');
const getRoot = () => selectNode(page, 'p-checkbox-wrapper >>> .root');
const getInput = () => selectNode(page, 'p-checkbox-wrapper input[type="checkbox"]');
const getMessage = () => selectNode(page, 'p-checkbox-wrapper >>> .message');

type InitOptions = {
  label?: string;
  useSlottedLabel?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
  loading?: boolean;
};

const initCheckbox = (opts?: InitOptions): Promise<void> => {
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

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initCheckbox();
    const input = await getInput();

    await expectA11yToMatchSnapshot(page, input);
  });

  it('should expose correct accessibility tree properties in error state', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label" message="Some error message." state="error">
        <input type="checkbox" name="some-name" />
      </p-checkbox-wrapper>`
    );
    const input = await getInput();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input' });
    await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
  });

  it('should add/remove accessibility tree properties if state changes programmatically', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-checkbox-wrapper label="Some label">
        <input type="checkbox" name="some-name" />
      </p-checkbox-wrapper>`
    );

    const host = await getHost();

    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message.');
    await waitForStencilLifecycle(page);

    const input = await getInput();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = error' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = error',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'success');
    await setProperty(host, 'message', 'Some success message.');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = success' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = success',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'none');
    await setProperty(host, 'message', '');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input when state = none' });
  });

  it('should expose correct accessibility tree when loading=true', async () => {
    await initCheckbox({ loading: true });
    const root = await getRoot();

    await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
  });
});
