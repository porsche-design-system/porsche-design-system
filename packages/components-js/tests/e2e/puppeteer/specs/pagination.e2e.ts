import type { Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getConsoleErrorsAmount,
  getEventSummary,
  getLifecycleStatus,
  initConsoleObserver,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-pagination');
const getNextButton = () => selectNode(page, 'p-pagination >>> li:last-child span');
const getNav = () => selectNode(page, 'p-pagination >>> nav');
const getPaginationItems = async () => (await (await getNav()).$$('span:not(.ellipsis)')).slice(1, -1); // without prev and next

const initPagination = (opts?: { activePage?: number }) => {
  const { activePage = 1 } = opts || {};

  return setContentWithDesignSystem(
    page,
    `<p-pagination total-items-count="500" items-per-page="25" active-page="${activePage}"></p-pagination>`
  );
};

it('should have no errors if disconnected before fully loaded', async () => {
  initConsoleObserver(page);

  await setContentWithDesignSystem(page, ``);
  await page.evaluate(() => {
    const el = document.createElement('p-pagination');
    document.body.append(el);

    setTimeout(() => el.remove(), 10);
  });

  await new Promise((resolve) => setTimeout(resolve, 10));
  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});

describe('events', () => {
  it('should emit both pageChange and update event', async () => {
    await initPagination();
    const host = await getHost();

    await addEventListener(host, 'pageChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'pageChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const [, secondPageItem] = await getPaginationItems();
    await secondPageItem.click();
    expect((await getEventSummary(host, 'pageChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initPagination();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-pagination'], 'componentDidLoad: p-pagination').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initPagination();
    const navigation = await getNav();

    await expectA11yToMatchSnapshot(page, navigation, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if disabled attribute on button next is toggled', async () => {
    await initPagination({ activePage: 20 });

    const host = await getHost();
    await expectA11yToMatchSnapshot(page, await getNextButton(), { message: 'If disabled' });

    await setProperty(host, 'activePage', 15);
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, await getNextButton(), { message: 'If not disabled' });
  });

  it('should have aria-current = page if selected', async () => {
    await initPagination();

    const host = await getHost();
    const [firstPageItem] = await getPaginationItems();

    expect(await getAttribute(firstPageItem, 'aria-current')).toBe('page');

    await setProperty(host, 'activePage', 2);
    await waitForStencilLifecycle(page);

    expect(await getAttribute(firstPageItem, 'aria-current')).toBeNull();

    await setProperty(host, 'activePage', 1);
    await waitForStencilLifecycle(page);

    expect(await getAttribute(firstPageItem, 'aria-current')).toBe('page');
  });
});
