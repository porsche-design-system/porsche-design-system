import { expect, test } from '@playwright/test';
import type { ToastMessage } from '@porsche-design-system/components';
import { TOAST_STATES } from '@porsche-design-system/components/src/components/toast/toast/toast-utils';
import type { Page } from 'playwright';
import {
  getAttribute,
  getElementStyle,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';

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
    document.querySelector('p-toast').addMessage(msg);
  }, msg);

  await waitForStencilLifecycle(page);
};

const waitForToastTimeout = async (page: Page): Promise<void> => {
  await sleep(TOAST_TIMEOUT_DURATION_OVERRIDE);

  await waitForAnimationFinish();
  await waitForStencilLifecycle(page);
};

const waitForAnimationFinish = () => sleep(ANIMATION_DURATION);

const getHost = (page: Page) => page.locator('p-toast');
const getToastItem = (page: Page) => page.locator('p-toast p-toast-item');
const getCloseButton = (page: Page) => page.locator('p-toast p-toast-item p-button');

for (const state of TOAST_STATES) {
  test(`should forward state: ${state} to p-toast-item`, async ({ page }) => {
    await initToastWithToastItem(page, { state });

    const toastItem = getToastItem(page);
    await expect(toastItem).toHaveJSProperty('state', state);
  });
}
test('should close toast-item via close button click', async ({ page }) => {
  await initToastWithToastItem(page);

  await expect(getToastItem(page)).toHaveCount(1);

  const closeButton = getCloseButton(page);
  await closeButton.click();
  await waitForAnimationFinish();
  await waitForStencilLifecycle(page);

  await expect(getToastItem(page)).toHaveCount(0);
});

test(`should automatically close toast-item after ${TOAST_TIMEOUT_DURATION_OVERRIDE} seconds`, async ({ page }) => {
  await initToastWithToastItem(page);

  await expect(getToastItem(page)).toHaveCount(1);

  await waitForToastTimeout(page);

  await expect(getToastItem(page)).toHaveCount(0);
});

test('should always show the latest toast message and clear queue immediately if a new message was added', async ({
  page,
}) => {
  await initToastWithToastItem(page, { text: '1' });
  await addMessage(page, { text: '2' });
  await waitForAnimationFinish();

  await expect(getToastItem(page)).toHaveJSProperty('text', '2');

  await addMessage(page, { text: '3' });
  await waitForAnimationFinish();
  await expect(getToastItem(page)).toHaveJSProperty('text', '3');
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initToast(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-toast'], 'componentDidLoad: p-toast').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
  });

  test('should work without unnecessary round trips with message', async ({ page }) => {
    await initToastWithToastItem(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-toast'], 'componentDidLoad: p-toast').toBe(1);
    expect(status.componentDidLoad['p-toast-item'], 'componentDidLoad: p-icon').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
  });

  test('should not update on theme prop change', async ({ page }) => {
    await initToast(page);

    const host = getHost(page);
    await setProperty(host, 'theme', 'dark');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-toast'], 'componentDidUpdate: p-toast').toBe(0);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
  });
});

test.describe('toast-item', () => {
  test('should render close button with type of "button"', async ({ page }) => {
    await initToastWithToastItem(page);
    const closeBtnReal = page.locator('p-toast p-toast-item p-button button');
    expect(await getAttribute(closeBtnReal, 'type')).toBe('button');
  });

  skipInBrowsers(['webkit', 'firefox'], () => {
    test('should have animation', async ({ page }) => {
      await initToastWithToastItem(page, {}, { withAnimation: true });
      await waitForAnimationFinish(); // 600ms
      const toastItem = getToastItem(page);
      const animationIn = await getElementStyle(toastItem, 'animation');

      expect(animationIn, 'for animationIn').toBe('0.6s cubic-bezier(0, 0, 0.2, 1) 0s 1 normal forwards running in');
      await expect(toastItem).toHaveCount(1);

      // toast stay open for a total of 1000ms, we need to hit the middle of closing animation
      await waitForAnimationFinish();
      const animationOut = await getElementStyle(toastItem, 'animation');

      expect(animationOut, 'for animationOut').toBe(
        '0.4s cubic-bezier(0.4, 0, 0.5, 1) 0s 1 normal forwards running out'
      );
      await expect(toastItem).toHaveCount(0);
    });
  });
});
