import type { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  getAttribute,
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
