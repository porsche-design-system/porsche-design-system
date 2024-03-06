import type { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  getAttribute,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';
import type { ToastMessage } from '@porsche-design-system/components/dist/types/bundle';
import { Components } from '@porsche-design-system/components/src/components';

const TOAST_TIMEOUT_DURATION_OVERRIDE = 1000;
const ANIMATION_DURATION = 600;

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitToastOptions = {
  withAnimation?: boolean;
};
const initToast = (opts?: InitToastOptions): Promise<void> => {
  const { withAnimation } = {
    withAnimation: false,
    ...opts,
  };

  const style = `<style>p-toast {
  --p-temporary-toast-timeout: ${TOAST_TIMEOUT_DURATION_OVERRIDE};
  --p-temporary-toast-skip-timeout: false;
  ${withAnimation ? `--p-animation-duration: ${ANIMATION_DURATION / 1000}s` : ''}
}</style>`;

  return setContentWithDesignSystem(page, `<p-toast></p-toast>`, {
    injectIntoHead: style,
  });
};

const initToastWithToastItem = async (message: Partial<ToastMessage> = {}, opts?: InitToastOptions) => {
  await initToast(opts);
  await addMessage(message);
};

const addMessage = async (message?: Partial<ToastMessage>): Promise<void> => {
  const msg: ToastMessage = {
    text: 'Some message',
    state: 'info',
    ...message,
  };

  await page.evaluate(async (msg: ToastMessage) => {
    await (document.querySelector('p-toast') as HTMLPToastElement).addMessage(msg);
  }, msg);

  await waitForStencilLifecycle(page);
};
const getToastItemMessage = () => selectNode(page, 'p-toast >>> p-toast-item >>> p');

describe('accessibility', () => {
  it('should expose correct accessibility tree properties', async () => {
    await initToastWithToastItem();
    const toastItemMessage = await getToastItemMessage();

    expect(await getAttribute(toastItemMessage, 'aria-live')).toBeDefined();
    await expectA11yToMatchSnapshot(page, toastItemMessage, {
      interestingOnly: false,
    });
  });
});
