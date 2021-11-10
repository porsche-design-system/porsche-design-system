import { Page } from 'puppeteer';
import {
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { ToastMessage, ToastState } from '@porsche-design-system/components/dist/types/bundle';
import { TOAST_STATES } from '@porsche-design-system/components/dist/types/components/feedback/toast/toast/toast-utils';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const initToast = (): Promise<void> => {
  return setContentWithDesignSystem(page, `<p-toast></p-toast>`);
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

const getHost = () => selectNode(page, 'p-toast');
const getToastItem = () => selectNode(page, 'p-toast >>> p-toast-item');
const getCloseButton = () => selectNode(page, 'p-toast >>> p-button-pure');

it.each<ToastState>(TOAST_STATES)('should forward state: %s to p-toast-item', async (state) => {
  await initToast();
  await addToast({ state });

  const toastItem = await getToastItem();
  expect(await getProperty(toastItem, 'state')).toBe(state);
});

xit('should automatically close toast after 6 seconds', async () => {});

xit('should close toast via close button click', async () => {});

xit('should queue multiple toasts and show them in correct order', async () => {});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initToast();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-toast'], 'componentDidLoad: p-toast').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
  });

  it('should work without unnecessary round trips with message', async () => {
    await initToast();
    await addToast();
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

describe('accessibility', () => {
  xit('should expose correct initial accessibility tree and aria properties', async () => {
    await initToast();
    const closeButton = await getCloseButton();
  });
});
