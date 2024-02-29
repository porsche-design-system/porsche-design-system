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

const getHost = () => selectNode(page, 'p-text-field-wrapper');
const getInput = () => selectNode(page, 'input');
const getToggleOrClearButton = () => selectNode(page, 'p-text-field-wrapper >>> p-button-pure >>> button');
const getMessage = () => selectNode(page, 'p-text-field-wrapper >>> .message');

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

const initTextField = (opts?: InitOptions): Promise<void> => {
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

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initTextField({ hasLabel: true });
    const input = await getInput();

    await expectA11yToMatchSnapshot(page, input);
  });

  it('should expose correct accessibility tree with description text', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-text-field-wrapper label="Some label" description="Some description">
        <input type="text">
      </p-text-field-wrapper>`
    );
    const input = await getInput();

    await expectA11yToMatchSnapshot(page, input);
  });

  it('should expose correct accessibility tree properties in error state', async () => {
    await setContentWithDesignSystem(
      page,
      `
        <p-text-field-wrapper label="Some label" description="Some description" message="Some error message" state="error">
          <input type="text">
        </p-text-field-wrapper>`
    );
    const input = await getInput();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, input, { message: 'Of Input' });
    await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
  });

  it('should add/remove accessibility tree properties if state changes programmatically', async () => {
    await initTextField({ hasLabel: true });

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

  it('should expose correct accessibility tree when password visibility button is clicked', async () => {
    await initTextField({ type: 'password', hasLabel: true });
    const button = await getToggleOrClearButton();

    await expectA11yToMatchSnapshot(page, button, { message: 'Initially' });

    await button.click();
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Pressed' });

    await button.click();
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Pressed again' });
  });

  it('should expose correct accessibility tree for input type=search with value', async () => {
    await initTextField({ type: 'search', hasLabel: true });
    const host = await getHost();
    const input = await getInput();

    await setProperty(input, 'value', 'value');
    await waitForStencilLifecycle(page);

    const button = await getToggleOrClearButton();
    await expectA11yToMatchSnapshot(page, host, { interestingOnly: false });
  });
});
