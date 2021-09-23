import { Page } from 'puppeteer';
import {
  getAttribute,
  getConsoleErrorsAmount,
  getLifecycleStatus,
  initConsoleObserver,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

describe('pagination', () => {
  let page: Page;

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-pagination');
  const getPrevButton = () => selectNode(page, 'p-pagination >>> .prev');
  const getNextButton = () => selectNode(page, 'p-pagination >>> .next');
  const getNav = () => selectNode(page, 'p-pagination >>> nav');
  const getPaginationItems = async () => (await getNav()).$$('.goto');

  const initPagination = (opts?: { activePage?: number }) => {
    const { activePage = 1 } = opts ?? {};

    return setContentWithDesignSystem(
      page,
      `<p-pagination total-items-count="500" items-per-page="25" active-page="${activePage}"></p-pagination>`
    );
  };

  it('should have correct aria disabled attribute on button prev', async () => {
    await initPagination();

    const host = await getHost();
    const prevButton = await getPrevButton();

    expect(await getAttribute(prevButton, 'aria-disabled')).toBe('true');

    await setProperty(host, 'activePage', 5);
    await waitForStencilLifecycle(page);

    expect(await getAttribute(prevButton, 'aria-disabled')).toBeNull();
  });

  it('should have correct aria disabled attribute on button next', async () => {
    await initPagination({ activePage: 20 });

    const host = await getHost();
    const nextButton = await getNextButton();

    expect(await getAttribute(nextButton, 'aria-disabled')).toBe('true');

    await setProperty(host, 'activePage', 15);
    await waitForStencilLifecycle(page);

    expect(await getAttribute(nextButton, 'aria-disabled')).toBeNull();
  });

  describe('page-item', () => {
    it('should have aria-current = page if selected', async () => {
      await initPagination();

      const host = await getHost();
      const paginationItems = await getPaginationItems();
      const firstPageItem = paginationItems[0];

      expect(await getAttribute(firstPageItem, 'aria-current')).toBe('page');

      await setProperty(host, 'activePage', 2);
      await waitForStencilLifecycle(page);

      expect(await getAttribute(firstPageItem, 'aria-current')).toBeNull();

      await setProperty(host, 'activePage', 1);
      await waitForStencilLifecycle(page);

      expect(await getAttribute(firstPageItem, 'aria-current')).toBe('page');
    });

    it('should have aria-disabled if selected', async () => {
      await initPagination();

      const host = await getHost();
      const paginationItems = await getPaginationItems();
      const firstPageItem = paginationItems[0];

      expect(await getAttribute(firstPageItem, 'aria-disabled')).toBe('true');

      await setProperty(host, 'activePage', 2);
      await waitForStencilLifecycle(page);

      expect(await getAttribute(firstPageItem, 'aria-disabled')).toBeNull();

      await setProperty(host, 'activePage', 1);
      await waitForStencilLifecycle(page);

      expect(await getAttribute(firstPageItem, 'aria-disabled')).toBe('true');
    });
  });

  it('should have no errors if disconnected before fully loaded', async () => {
    initConsoleObserver(page);

    await setContentWithDesignSystem(page, ``);
    await page.evaluate(() => {
      const el = document.createElement('p-pagination');
      document.body.append(el);

      setTimeout(() => el.remove(), 10);
    });

    await page.waitForTimeout(10);

    expect(getConsoleErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);
  });

  // TODO: Component has to be refactored. Test fails atm. because it updates on initial render.
  xdescribe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initPagination();
      const status = await getLifecycleStatus(page);

      console.log(status);

      expect(status.componentDidLoad['p-pagination'], 'componentDidLoad: p-pagination').toBe(1);
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });
  });
});
