import { Page } from 'puppeteer';
import {
  enableBrowserLogging,
  expectA11yToMatchSnapshot,
  getAttribute,
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

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const initToast = async (): Promise<void> => {
  await setContentWithDesignSystem(page, `<p-toast></p-toast>`, { enableLogging: true });
  await page.evaluate(async (toastTimeoutDuration: number) => {
    const toast = document.querySelector('p-toast');
    const manager = await (toast as any).getManager();
    manager.timeoutDuration = toastTimeoutDuration;
  }, TOAST_TIMEOUT_DURATION_OVERRIDE);
};

const addToast = async (message?: Partial<ToastMessage>): Promise<void> => {
  const msg: ToastMessage = {
    message: 'Some message',
    state: 'neutral',
    ...message,
  };

  await page.evaluate(async (msg: ToastMessage) => {
    const toast = document.querySelector('p-toast');
    const manager = await (toast as any).getManager();
    manager.addToast(msg);
  }, msg);

  await waitForStencilLifecycle(page);
};

const initToastWithToastItem = async (message?: Partial<ToastMessage>) => {
  await initToast();
  await addToast(message);
};

const waitForToastTimeout = async (): Promise<void> => {
  await page.waitForTimeout(TOAST_TIMEOUT_DURATION_OVERRIDE);
  await waitForStencilLifecycle(page);
};

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
  await initToastWithToastItem({ message: '1' });
  await addToast({ message: '2' });
  await addToast({ message: '3' });

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
  enableBrowserLogging(page);
  await initToastWithToastItem({ message: '1' });
  await addToast({ message: '2' });

  const closeButton = await getCloseButton();
  await closeButton.click();

  await waitForStencilLifecycle(page);
  await addToast({ message: '3' });

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

  it('should work without unnecessary round trips on prop change', async () => {
    await initToast();

    const host = await getHost();
    await setProperty(host, 'offset', { left: 20 });
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
});
