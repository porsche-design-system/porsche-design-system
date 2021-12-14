import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getLifecycleStatus,
  initAddEventListener,
  reattachElement,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';
import { InlineNotificationState } from '@porsche-design-system/components/dist/types/bundle';
import { INLINE_NOTIFICATION_STATES } from '@porsche-design-system/components/src/components/feedback/inline-notification/inline-notification-utils';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  await initAddEventListener(page);
});
afterEach(async () => await page.close());

const initInlineNotification = (opts?: {
  state?: InlineNotificationState;
  persistent?: boolean;
  actionLabel?: string;
}): Promise<void> => {
  const { state, persistent, actionLabel } = opts ?? {};
  const attributes = [
    'heading="Some inline-notification heading."',
    'description="Some inline-notification description."',
    state && `state="${state}"`,
    persistent && 'persistent',
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

it('should render without button', async () => {
  await initInlineNotification({ persistent: true });
  const el = await getCloseButton();
  expect(el).toBeNull();
});

describe('close button', () => {
  it('should emit custom event by click on close button', async () => {
    await initInlineNotification();

    const host = await getHost();
    const closeButton = await getCloseButton();
    let calls = 0;
    await addEventListener(host, 'dismiss', () => calls++);

    await closeButton.click();
    await waitForEventSerialization(page);
    await waitForEventSerialization(page); // 🙈
    await waitForEventSerialization(page); // 🙈

    expect(calls).toBe(1);
  });

  it('should remove and re-attach event', async () => {
    await initInlineNotification();

    const host = await getHost();
    const closeButton = await getCloseButton();
    let calls = 0;
    await addEventListener(host, 'dismiss', () => calls++);

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(page, 'p-inline-notification');

    await closeButton.click();
    await waitForEventSerialization(page);
    await waitForEventSerialization(page); // 🙈

    expect(calls).toBe(1);
  });
});

describe('action button', () => {
  it('should emit custom event by click on action button', async () => {
    await initInlineNotification({ actionLabel: 'Retry' });

    const host = await getHost();
    const actionButton = await getActionButton();
    let calls = 0;
    await addEventListener(host, 'action', () => calls++);

    await actionButton.click();
    await waitForEventSerialization(page);
    expect(calls).toBe(1);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initInlineNotification({ state: 'error' });

    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-inline-notification'], 'componentDidLoad: p-inline-notification').toBe(1);
    expect(status.componentDidLoad['p-headline'], 'componentDidLoad: p-headline').toBe(1);
    expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2); // one included in button-pure
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // one included in button-pure
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
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

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
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
