import { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
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

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree', async () => {
      await initPagination();
      const navigation = await getNav();

      await expectA11yToMatchSnapshot(page, navigation, { interestingOnly: false });
    });

    it('should expose correct accessibility tree if disabled attribute on button next is toggled', async () => {
      await initPagination({ activePage: 20 });

      const host = await getHost();
      const nextButtonDisabled = await getNextButton();

      await expectA11yToMatchSnapshot(page, nextButtonDisabled, { message: 'If disabled' });

      await setProperty(host, 'activePage', 15);
      await waitForStencilLifecycle(page);

      const nextButtonEnabled = await getNextButton();

      await expectA11yToMatchSnapshot(page, nextButtonEnabled, { message: 'If not disabled' });
    });

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
  });
});
