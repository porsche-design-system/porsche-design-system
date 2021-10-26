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

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  await initAddEventListener(page);
});
afterEach(async () => await page.close());

const initBanner = (opts?: { state?: BannerInlineState; persistent?: boolean }): Promise<void> => {
  const { state, persistent } = opts ?? {};
  const attributes = [
    'heading="Some banner-inline heading."',
    'description="Some banner-inline description."',
    state && `state="${state}"`,
    persistent && 'persistent',
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
const getButton = () => selectNode(page, 'p-banner-inline >>> p-button-pure');
const getDescriptionLink = () => selectNode(page, 'p-banner-inline a');

it('should render close button with type of "button"', async () => {
  await initBanner();
  const closeBtnReal = await selectNode(page, 'p-banner-inline >>> p-button-pure >>> button');
  expect(await getAttribute(closeBtnReal, 'type')).toBe('button');
});

it('should render without button', async () => {
  await initBanner({ persistent: true });
  const el = await getButton();
  expect(el).toBeNull();
});

describe('close', () => {
  it('should emit custom event by click on close button', async () => {
    await initBanner();

    const host = await getHost();
    const button = await getButton();
    let calls = 0;
    await addEventListener(host, 'dismiss', () => calls++);

    await button.click();
    await waitForEventSerialization(page);
    expect(calls).toBe(1);
  });

  it('should remove and re-attach event', async () => {
    await initBanner();

    const host = await getHost();
    const button = await getButton();
    let calls = 0;
    await addEventListener(host, 'dismiss', () => calls++);

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(page, 'p-banner-inline');

    await button.click();
    await waitForEventSerialization(page);
    await waitForEventSerialization(page); // 🙈

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
  it('should expose correct initial accessibility tree properties', async () => {
    await initBanner({ state: 'neutral' });
    const getWrapper = () => selectNode(page, 'p-banner-inline >>> .content');

    const snapshotWrapper = await page.accessibility.snapshot({
      root: await getWrapper(),
      interestingOnly: false,
    });

    expect(snapshotWrapper).toMatchSnapshot();
  });
});
