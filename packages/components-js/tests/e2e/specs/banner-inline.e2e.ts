import {
  addEventListener,
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
import { BannerInlineState } from '@porsche-design-system/components/dist/types/bundle';
import { BANNER_INLINE_STATES } from '@porsche-design-system/components/src/components/feedback/banner-inline/banner-inline-utils';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  await initAddEventListener(page);
});
afterEach(async () => await page.close());

const initBanner = (opts?: {
  state?: BannerInlineState;
  persistent?: boolean;
  actionLabel?: string;
}): Promise<void> => {
  const { state, persistent, actionLabel } = opts ?? {};
  const attributes = [
    'heading="Some banner-inline heading."',
    'description="Some banner-inline description."',
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
    <p-banner-inline ${attributes}>
    </p-banner-inline>`
  );
};

const getHost = () => selectNode(page, 'p-banner-inline');
const getCloseButton = () => selectNode(page, 'p-banner-inline >>> p-button-pure.close');
const getActionButton = () => selectNode(page, 'p-banner-inline >>> p-button-pure.action');

it('should render close button with type of "button"', async () => {
  await initBanner();
  const closeBtnReal = await selectNode(page, 'p-banner-inline >>> p-button-pure >>> button');
  expect(await getAttribute(closeBtnReal, 'type')).toBe('button');
});

it('should render without button', async () => {
  await initBanner({ persistent: true });
  const el = await getCloseButton();
  expect(el).toBeNull();
});

describe('close button', () => {
  it('should emit custom event by click on close button', async () => {
    await initBanner();

    const host = await getHost();
    const closeButton = await getCloseButton();
    let calls = 0;
    await addEventListener(host, 'dismiss', () => calls++);

    await closeButton.click();
    await waitForEventSerialization(page);
    expect(calls).toBe(1);
  });

  it('should remove and re-attach event', async () => {
    await initBanner();

    const host = await getHost();
    const closeButton = await getCloseButton();
    let calls = 0;
    await addEventListener(host, 'dismiss', () => calls++);

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(page, 'p-banner-inline');

    await closeButton.click();
    await waitForEventSerialization(page);
    await waitForEventSerialization(page); // 🙈

    expect(calls).toBe(1);
  });
});

describe('action button', () => {
  it('should emit custom event by click on action button', async () => {
    await initBanner({ actionLabel: 'Retry' });

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
    await initBanner({ state: 'error' });

    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-banner-inline'], 'componentDidLoad: p-banner-inline').toBe(1);
    expect(status.componentDidLoad['p-headline'], 'componentDidLoad: p-headline').toBe(1);
    expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2); // one included in button-pure
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // one included in button-pure
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips after state change', async () => {
    await initBanner({ state: 'error' });
    const host = await getHost();

    await setProperty(host, 'state', 'warning');
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-banner-inline'], 'componentDidUpdate: p-banner-inline').toBe(1);
    expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });
});

describe('accessibility', () => {
  it.each<BannerInlineState>(BANNER_INLINE_STATES)(
    'should expose correct accessibility tree properties for state: %s',
    async (state) => {
      await initBanner({ state });
      const wrapper = await selectNode(page, 'p-banner-inline >>> .content');

      const snapshotWrapper = await page.accessibility.snapshot({
        root: wrapper,
        interestingOnly: false,
      });

      expect(snapshotWrapper).toMatchSnapshot();
      expect(await getAttribute(wrapper, 'aria-live')).toBe('polite');
    }
  );
});
