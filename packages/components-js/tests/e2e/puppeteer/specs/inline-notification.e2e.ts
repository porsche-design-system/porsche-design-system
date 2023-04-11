import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  reattachElementHandle,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import type { InlineNotificationState } from '@porsche-design-system/components/dist/types/bundle';
import { INLINE_NOTIFICATION_STATES } from '@porsche-design-system/components/src/components/inline-notification/inline-notification-utils';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const initInlineNotification = (opts?: {
  state?: InlineNotificationState;
  persistent?: boolean;
  dismissButton?: boolean;
  actionLabel?: string;
}): Promise<void> => {
  const { state, persistent, dismissButton = true, actionLabel } = opts || {};
  const attributes = [
    'heading="Some inline-notification heading."',
    'description="Some inline-notification description."',
    state && `state="${state}"`,
    persistent && 'persistent',
    `dismiss-button="${dismissButton}"`,
    actionLabel && `action-label="${actionLabel}"`,
  ]
    .filter((x) => x)
    .join(' ');

  // <span slot="description">Some notification description with an <a href="#" onclick="return false">anchor</a>.</span>
  return setContentWithDesignSystem(
    page,
    `
    <p-inline-notification ${attributes}>
    </p-inline-notification>`
  );
};

const getHost = () => selectNode(page, 'p-inline-notification');
const getCloseButton = () => selectNode(page, 'p-inline-notification >>> p-button-pure.close');
const getActionButton = () => selectNode(page, 'p-inline-notification >>> p-button-pure.action');

it('should render close button with type of "button"', async () => {
  await initInlineNotification();
  const closeBtnReal = await selectNode(page, 'p-inline-notification >>> p-button-pure >>> button');
  expect(await getAttribute(closeBtnReal, 'type')).toBe('button');
});

it('should render without button when persistent prop true', async () => {
  await initInlineNotification({ persistent: true });
  const el = await getCloseButton();
  expect(el).toBeNull();
});

it('should render without button when dismissButton prop false', async () => {
  await initInlineNotification({ dismissButton: false });
  console.log(await getProperty(await getHost(), 'dismissButton'));
  const el = await getCloseButton();
  expect(el).toBeNull();
});

describe('close button', () => {
  it('should emit custom event by click on close button', async () => {
    await initInlineNotification();

    const host = await getHost();
    const closeButton = await getCloseButton();
    await addEventListener(host, 'dismiss');

    await closeButton.click();
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  it('should remove and re-attach event', async () => {
    await initInlineNotification();

    const host = await getHost();
    const closeButton = await getCloseButton();
    await addEventListener(host, 'dismiss');

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElementHandle(host);

    await closeButton.click();
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });
});

describe('action button', () => {
  it('should emit custom event by click on action button', async () => {
    await initInlineNotification({ actionLabel: 'Retry' });

    const host = await getHost();
    const actionButton = await getActionButton();
    await addEventListener(host, 'action');

    await actionButton.click();
    expect((await getEventSummary(host, 'action')).counter).toBe(1);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initInlineNotification({ state: 'error' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-inline-notification'], 'componentDidLoad: p-inline-notification').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // one included in button-pure
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips after state change', async () => {
    await initInlineNotification({ state: 'error' });
    const host = await getHost();

    await setProperty(host, 'state', 'warning');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-inline-notification'], 'componentDidUpdate: p-inline-notification').toBe(1);
    expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });
});

describe('accessibility', () => {
  it.each<InlineNotificationState>(INLINE_NOTIFICATION_STATES)(
    'should expose correct accessibility tree properties for state: %s',
    async (state) => {
      await initInlineNotification({ state });
      const wrapper = await selectNode(page, 'p-inline-notification >>> .content');

      await expectA11yToMatchSnapshot(page, wrapper, { interestingOnly: false });
      expect(await getAttribute(wrapper, 'aria-live')).toBeDefined();
    }
  );
});
