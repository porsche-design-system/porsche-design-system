import { type Page, test, expect } from '@playwright/test';
import { getAttribute, setContentWithDesignSystem, waitForStencilLifecycle } from '../helpers';
import type { ToastMessage } from '@porsche-design-system/components/dist/types/bundle';

const TOAST_TIMEOUT_DURATION_OVERRIDE = 1000;
const ANIMATION_DURATION = 600;

type InitToastOptions = {
  withAnimation?: boolean;
};
const initToast = (page: Page, opts?: InitToastOptions): Promise<void> => {
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

const initToastWithToastItem = async (page: Page, message: Partial<ToastMessage> = {}, opts?: InitToastOptions) => {
  await initToast(page, opts);
  await addMessage(page, message);
};

const addMessage = async (page: Page, message?: Partial<ToastMessage>): Promise<void> => {
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
const getToastItemMessage = (page: Page) => page.$('p-toast p-toast-item p');

test('should expose correct accessibility tree properties', async ({ page }) => {
  await initToastWithToastItem(page);
  const toastItemMessage = await getToastItemMessage(page);

  expect(await getAttribute(toastItemMessage, 'aria-live')).toBeDefined();
  // await expectA11yToMatchSnapshot(page, toastItemMessage, {
  //   interestingOnly: false,
  // });
});
