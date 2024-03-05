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

const getHost = () => selectNode(page, 'p-select-wrapper');
const getSelect = () => selectNode(page, 'p-select-wrapper select');
const getMessage = () => selectNode(page, 'p-select-wrapper >>> .message');

type InitOptions = {
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
};

const initSelect = (opts?: InitOptions): Promise<void> => {
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

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initSelect();
    const select = await getSelect();

    await expectA11yToMatchSnapshot(page, select);
  });

  it('should update accessibility tree with message text if state changes programmatically', async () => {
    await initSelect();
    const host = await getHost();

    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message.');
    await waitForStencilLifecycle(page);

    const select = await getSelect();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, select, { message: 'Of Select when state = error' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = error',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'success');
    await setProperty(host, 'message', 'Some success message.');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, select, { message: 'Of Select when state = success' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = success',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'none');
    await setProperty(host, 'message', '');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, select, { message: 'Of Select when state = none' });
  });
});
