import { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  getAttribute,
  getElementStyle,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { ToastMessage, ToastState } from '@porsche-design-system/components/dist/types/bundle';
import { TOAST_STATES } from '@porsche-design-system/components/src/components/feedback/toast/toast/toast-utils';

const TOAST_TIMEOUT_DURATION_OVERRIDE = 1000;
const ANIMATION_DURATION = 600;

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const initToast = async (): Promise<void> => {
  const toastTimeoutStyleOverrides = `<style>p-toast {
--p-toast-timeout-override: ${TOAST_TIMEOUT_DURATION_OVERRIDE};
--p-toast-skip-timeout: false;
}</style>`;
  await setContentWithDesignSystem(page, `<p-toast></p-toast>`, {
    injectIntoHead: toastTimeoutStyleOverrides,
  });
};

const addMessage = async (message?: Partial<ToastMessage>): Promise<void> => {
  const msg: ToastMessage = {
    text: 'Some message',
    state: 'neutral',
    ...message,
  };

  await page.evaluate(async (msg: ToastMessage) => {
    document.querySelector('p-toast').addMessage(msg);
  }, msg);

  await waitForStencilLifecycle(page);
};

const initToastWithToastItem = async (message?: Partial<ToastMessage>) => {
  await initToast();
  await addMessage(message);
};

const waitForToastTimeout = async (): Promise<void> => {
  await page.waitForTimeout(TOAST_TIMEOUT_DURATION_OVERRIDE);
  await waitForAnimationFinish();
  await waitForStencilLifecycle(page);
};
const waitForAnimationFinish = () => page.waitForTimeout(ANIMATION_DURATION);

const getHost = () => selectNode(page, 'p-toast');
const getToastItem = () => selectNode(page, 'p-toast >>> p-toast-item');
const getToastItemMessage = () => selectNode(page, 'p-toast >>> p-toast-item >>> #message');
const getCloseButton = () => selectNode(page, 'p-toast >>> p-toast-item >>> p-button-pure');

it.each<ToastState>(TOAST_STATES)('should forward state: %s to p-toast-item', async (state) => {
  await initToastWithToastItem({ state });

  const toastItem = await getToastItem();
  expect(await getProperty(toastItem, 'state')).toBe(state);
});

it('should close toast-item via close button click', async () => {
  await initToastWithToastItem();

  expect(await getToastItem()).toBeDefined();

  const closeButton = await getCloseButton();
  await closeButton.click();
  await waitForAnimationFinish();
  await waitForStencilLifecycle(page);

  expect(await getToastItem()).toBeNull();
});

it(`should automatically close toast-item after ${TOAST_TIMEOUT_DURATION_OVERRIDE} seconds`, async () => {
  await initToastWithToastItem();

  expect(await getToastItem()).toBeDefined();

  await waitForToastTimeout();

  expect(await getToastItem()).toBeNull();
});

it('should queue multiple toast-items and show them in correct order', async () => {
  await initToastWithToastItem({ text: '1' });
  await addMessage({ text: '2' });
  await addMessage({ text: '3' });

  expect(await getProperty(await getToastItem(), 'message')).toBe('1');

  await waitForToastTimeout();

  expect(await getProperty(await getToastItem(), 'message')).toBe('2');

  await waitForToastTimeout();

  expect(await getProperty(await getToastItem(), 'message')).toBe('3');
});

it(`should queue two toast-items, close the first, queue a third, display the second one,
after ${TOAST_TIMEOUT_DURATION_OVERRIDE} seconds display the third and finally after ${
  TOAST_TIMEOUT_DURATION_OVERRIDE * 2
} seconds display none`, async () => {
  await initToastWithToastItem({ text: '1' });
  await addMessage({ text: '2' });

  const closeButton = await getCloseButton();
  await closeButton.click();
  await waitForAnimationFinish();

  await waitForStencilLifecycle(page);
  await addMessage({ text: '3' });

  expect(await getProperty(await getToastItem(), 'message')).toBe('2');

  await waitForToastTimeout();

  expect(await getProperty(await getToastItem(), 'message')).toBe('3');

  await waitForToastTimeout();

  expect(await getToastItem()).toBeNull();
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initToast();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-toast'], 'componentDidLoad: p-toast').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
  });

  it('should work without unnecessary round trips with message', async () => {
    await initToastWithToastItem();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-toast'], 'componentDidLoad: p-toast').toBe(1);
    expect(status.componentDidLoad['p-toast-item'], 'componentDidLoad: p-icon').toBe(1);
    expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
  });

  it('should not update on offset prop change', async () => {
    await initToast();

    const host = await getHost();
    await setProperty(host, 'offset', { bottom: 20 });
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-toast'], 'componentDidUpdate: p-toast').toBe(0);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initToast();

    const host = await getHost();
    await setProperty(host, 'theme', 'dark');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-toast'], 'componentDidUpdate: p-toast').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
  });
});

describe('toast-item', () => {
  it('should render close button with type of "button"', async () => {
    await initToastWithToastItem();
    const closeBtnReal = await selectNode(page, 'p-toast >>> p-toast-item >>> p-button-pure >>> button');
    expect(await getAttribute(closeBtnReal, 'type')).toBe('button');
  });

  describe('accessibility', () => {
    it('should expose correct accessibility tree properties', async () => {
      await initToastWithToastItem();
      const toastItemMessage = await getToastItemMessage();

      await expectA11yToMatchSnapshot(page, toastItemMessage, {
        interestingOnly: false,
      });
      expect(await getAttribute(toastItemMessage, 'aria-live')).toBeDefined();
    });
  });

  it('should have animation', async () => {
    await initToastWithToastItem();
    const toastItem = await getToastItem();
    const animationIn = await getElementStyle(toastItem, 'animation');

    expect(animationIn).toMatchInlineSnapshot(
      '"0.6s cubic-bezier(0.45, 0, 0.55, 1) 0s 1 normal forwards running keyframes-animateMobileIn"'
    );

    await page.waitForTimeout(TOAST_TIMEOUT_DURATION_OVERRIDE);
    const animationOut = await getElementStyle(toastItem, 'animation');

    expect(animationOut).toMatchInlineSnapshot(
      '"0.6s cubic-bezier(0.5, 1, 0.89, 1) 0s 1 normal forwards running keyframes-animateMobileOut"'
    );

    await page.waitForTimeout(ANIMATION_DURATION);
    const animationClear = await getElementStyle(toastItem, 'animation');

    expect(animationClear).toMatchInlineSnapshot('""');
  });
});
