import { type Page, test, expect } from '@playwright/test';
import {
  type ExpectToMatchSnapshotOptions,
  getHTMLAttributes,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../../helpers';
import { Components } from '@porsche-design-system/components';

const getHost = (page: Page) => page.locator('p-pin-code');
const getCurrentInput = (page: Page) => page.locator('p-pin-code #current-input');
const getMessage = (page: Page) => page.locator('p-pin-code .message');

type InitOptions = {
  props?: Components.PPinCode;
  slots?: {
    label?: string;
    description?: string;
    message?: string;
  };
  options?: {
    isWithinForm?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initPinCode = (page: Page, opts?: InitOptions) => {
  const { props = { name: 'name' }, slots, options } = opts || {};
  const { isWithinForm = false, markupBefore = '', markupAfter = '' } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const markup = `${markupBefore}
     <p-pin-code ${getHTMLAttributes(props)}>
       ${label}
       ${description}
       ${message}
     </p-pin-code>
     ${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

const opts: ExpectToMatchSnapshotOptions = {
  skipWaitForFunction: true,
};

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initPinCode(page, { props: { label: 'Some label' } });
  const input = await getCurrentInput(page);

  // await expectA11yToMatchSnapshot(page, input, opts);
});

test.fixme('should expose correct accessibility tree with description text', async ({ page }) => {
  await initPinCode(page, { props: { label: 'Some label', description: 'Some description' } });
  const input = await getCurrentInput(page);

  // await expectA11yToMatchSnapshot(page, input, opts);
});

test.fixme('should expose correct accessibility tree in error state', async ({ page }) => {
  await initPinCode(page, {
    props: { label: 'Some label', description: 'Some description', state: 'error', message: 'Some error message' },
  });
  const input = await getCurrentInput(page);
  const message = await getMessage(page);

  // await expectA11yToMatchSnapshot(page, input, { ...opts, message: 'Of Input' });
  // await expectA11yToMatchSnapshot(page, message, { ...opts, message: 'Of Message', interestingOnly: false });
});

test.fixme('should expose correct accessibility tree in disabled state', async ({ page }) => {
  await initPinCode(page, {
    props: { label: 'Some label', description: 'Some description', disabled: true },
  });
  const input = await getCurrentInput(page);

  // await expectA11yToMatchSnapshot(page, input, opts);
});

test.fixme('should expose correct accessibility tree in loading state', async ({ page }) => {
  await initPinCode(page, {
    props: { label: 'Some label', description: 'Some description', loading: true },
  });
  const input = await getCurrentInput(page);

  // await expectA11yToMatchSnapshot(page, input, opts);
});

test.fixme('should expose correct accessibility tree in required state', async ({ page }) => {
  await initPinCode(page, {
    props: { label: 'Some label', description: 'Some description', required: true },
  });
  const input = await getCurrentInput(page);

  // await expectA11yToMatchSnapshot(page, input, opts);
});

test.fixme('should add/remove accessibility tree if state changes programmatically', async ({ page }) => {
  await initPinCode(page, { props: { label: 'Some label' } });
  const host = getHost(page);

  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message.');
  await waitForStencilLifecycle(page);

  const input = await getCurrentInput(page);
  const message = await getMessage(page);

  // await expectA11yToMatchSnapshot(page, input, { ...opts, message: 'Of Input when state = error' });
  // await expectA11yToMatchSnapshot(page, message, {
  //   ...opts,
  //   message: 'Of Message when state = error',
  //   interestingOnly: false,
  // });

  await setProperty(host, 'state', 'success');
  await setProperty(host, 'message', 'Some success message.');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, input, { ...opts, message: 'Of Input when state = success' });
  // await expectA11yToMatchSnapshot(page, message, {
  //   ...opts,
  //   message: 'Of Message when state = success',
  //   interestingOnly: false,
  // });

  await setProperty(host, 'state', 'none');
  await setProperty(host, 'message', '');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, input, { ...opts, message: 'Of Input when state = none' });
});
