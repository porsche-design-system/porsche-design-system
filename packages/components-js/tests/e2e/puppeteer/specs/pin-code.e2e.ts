import type { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  type ExpectToMatchSnapshotOptions,
  getHTMLAttributes,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { Components } from '@porsche-design-system/components';

let page: Page;
beforeEach(async () => {
  page = await browser.newPage();
});
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-pin-code');
const getCurrentInput = () => selectNode(page, 'p-pin-code >>> #current-input');
const getMessage = () => selectNode(page, 'p-pin-code >>> .message');

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

const initPinCode = (opts?: InitOptions) => {
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

describe('accessibility', () => {
  const opts: ExpectToMatchSnapshotOptions = {
    skipWaitForFunction: true,
  };

  it('should expose correct initial accessibility tree', async () => {
    await initPinCode({ props: { label: 'Some label' } });
    const input = await getCurrentInput();

    await expectA11yToMatchSnapshot(page, input, opts);
  });

  it('should expose correct accessibility tree with description text', async () => {
    await initPinCode({ props: { label: 'Some label', description: 'Some description' } });
    const input = await getCurrentInput();

    await expectA11yToMatchSnapshot(page, input, opts);
  });

  it('should expose correct accessibility tree in error state', async () => {
    await initPinCode({
      props: { label: 'Some label', description: 'Some description', state: 'error', message: 'Some error message' },
    });
    const input = await getCurrentInput();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, input, { ...opts, message: 'Of Input' });
    await expectA11yToMatchSnapshot(page, message, { ...opts, message: 'Of Message', interestingOnly: false });
  });

  it('should expose correct accessibility tree in disabled state', async () => {
    await initPinCode({
      props: { label: 'Some label', description: 'Some description', disabled: true },
    });
    const input = await getCurrentInput();

    await expectA11yToMatchSnapshot(page, input, opts);
  });

  it('should expose correct accessibility tree in loading state', async () => {
    await initPinCode({
      props: { label: 'Some label', description: 'Some description', loading: true },
    });
    const input = await getCurrentInput();

    await expectA11yToMatchSnapshot(page, input, opts);
  });

  it('should expose correct accessibility tree in required state', async () => {
    await initPinCode({
      props: { label: 'Some label', description: 'Some description', required: true },
    });
    const input = await getCurrentInput();

    await expectA11yToMatchSnapshot(page, input, opts);
  });

  it('should add/remove accessibility tree if state changes programmatically', async () => {
    await initPinCode({ props: { label: 'Some label' } });
    const host = await getHost();

    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message.');
    await waitForStencilLifecycle(page);

    const input = await getCurrentInput();
    const message = await getMessage();

    await expectA11yToMatchSnapshot(page, input, { ...opts, message: 'Of Input when state = error' });
    await expectA11yToMatchSnapshot(page, message, {
      ...opts,
      message: 'Of Message when state = error',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'success');
    await setProperty(host, 'message', 'Some success message.');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, input, { ...opts, message: 'Of Input when state = success' });
    await expectA11yToMatchSnapshot(page, message, {
      ...opts,
      message: 'Of Message when state = success',
      interestingOnly: false,
    });

    await setProperty(host, 'state', 'none');
    await setProperty(host, 'message', '');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, input, { ...opts, message: 'Of Input when state = none' });
  });
});
