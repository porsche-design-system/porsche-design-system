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

const getHost = () => selectNode(page, 'p-textarea-wrapper');
const getTextarea = () => selectNode(page, 'p-textarea-wrapper textarea');
const getMessage = () => selectNode(page, 'p-textarea-wrapper >>> .message');

type InitOptions = {
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
  hasLabel?: boolean;
  maxLength?: number;
};

const initTextarea = (opts?: InitOptions): Promise<void> => {
  const {
    useSlottedLabel = false,
    useSlottedDescription = false,
    useSlottedMessage = false,
    state = 'none',
    hasLabel = false,
    maxLength,
  } = opts || {};

  const link = '<a href="#" onclick="return false;">link</a>';
  const slottedLabel = useSlottedLabel ? `<span slot="label">Label with a ${link}</span>` : '';
  const slottedDescription = useSlottedDescription ? `<span slot="description">Description with a ${link}</span>` : '';
  const slottedMessage = useSlottedMessage ? `<span slot="message">Message with a ${link}</span>` : '';

  const attrs = [`state="${state}"`, hasLabel && 'label="Some label"'].filter((x) => x).join(' ');

  return setContentWithDesignSystem(
    page,
    `
    <p-textarea-wrapper ${attrs}>
      ${slottedLabel}
      ${slottedDescription}
      <textarea${maxLength ? ` maxlength="${maxLength}"` : ''}></textarea>
      ${slottedMessage}
    </p-textarea-wrapper>`
  );
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initTextarea({ hasLabel: true });
    const textarea = await getTextarea();

    await expectA11yToMatchSnapshot(page, textarea);
  });

  it('should expose correct accessibility tree with description text', async () => {
    await setContentWithDesignSystem(
      page,
      `
        <p-textarea-wrapper label="Some label" description="Some description">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>`
    );
    const textarea = await getTextarea();

    await expectA11yToMatchSnapshot(page, textarea);
  });

  it('should expose correct accessibility tree properties in error state', async () => {
    await setContentWithDesignSystem(
      page,
      `
        <p-textarea-wrapper label="Some label" description="Some description" message="Some error message" state="error">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>\``
    );
    const textarea = await getTextarea();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea' });
    await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
  });

  it('should add/remove accessibility tree properties if state changes programmatically', async () => {
    await initTextarea({ hasLabel: true });

    const host = await getHost();

    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message.');
    await waitForStencilLifecycle(page);

    const textarea = await getTextarea();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea when state = error' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = error',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'success');
    await setProperty(host, 'message', 'Some success message.');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea when state = success' });
    await expectA11yToMatchSnapshot(page, message, {
      message: 'Of Message when state = success',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'none');
    await setProperty(host, 'message', '');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea when state = none' });
  });
});
