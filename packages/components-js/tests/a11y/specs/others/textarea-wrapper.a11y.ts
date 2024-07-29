import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';
import type { FormState } from '@porsche-design-system/components/dist/types/bundle';

const getHost = (page: Page) => page.locator('p-textarea-wrapper');
const getTextarea = (page: Page) => page.locator('p-textarea-wrapper textarea');
const getMessage = (page: Page) => page.locator('p-textarea-wrapper .message');

type InitOptions = {
  useSlottedLabel?: boolean;
  useSlottedDescription?: boolean;
  useSlottedMessage?: boolean;
  state?: FormState;
  hasLabel?: boolean;
  maxLength?: number;
};

const initTextarea = (page: Page, opts?: InitOptions): Promise<void> => {
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

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initTextarea(page, { hasLabel: true });
  const textarea = getTextarea(page);

  // await expectA11yToMatchSnapshot(page, textarea);
});

test.fixme('should expose correct accessibility tree with description text', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
        <p-textarea-wrapper label="Some label" description="Some description">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>`
  );
  const textarea = getTextarea(page);

  // await expectA11yToMatchSnapshot(page, textarea);
});

test.fixme('should expose correct accessibility tree properties in error state', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
        <p-textarea-wrapper label="Some label" description="Some description" message="Some error message" state="error">
          <textarea name="some-name"></textarea>
        </p-textarea-wrapper>\``
  );
  const textarea = getTextarea(page);
  const message = getMessage(page);

  // await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea' });
  // await expectA11yToMatchSnapshot(page, message, { message: 'Of Message', interestingOnly: false });
});

test.fixme('should add/remove accessibility tree properties if state changes programmatically', async ({ page }) => {
  await initTextarea(page, { hasLabel: true });

  const host = getHost(page);

  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message.');
  await waitForStencilLifecycle(page);

  const textarea = getTextarea(page);
  const message = getMessage(page);

  // await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea when state = error' });
  // await expectA11yToMatchSnapshot(page, message, {
  //   message: 'Of Message when state = error',
  //   interestingOnly: false,
  // });

  await setProperty(host, 'state', 'success');
  await setProperty(host, 'message', 'Some success message.');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea when state = success' });
  // await expectA11yToMatchSnapshot(page, message, {
  //   message: 'Of Message when state = success',
  //   interestingOnly: false,
  // });

  await setProperty(host, 'state', 'none');
  await setProperty(host, 'message', '');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, textarea, { message: 'Of Textarea when state = none' });
});
