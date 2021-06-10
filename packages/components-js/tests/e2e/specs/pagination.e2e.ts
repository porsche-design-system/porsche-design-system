import { ConsoleMessage, Page } from 'puppeteer';
import {
  getAttribute,
  getBrowser,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';

describe('pagination', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
  });
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

    await host.evaluate((el) => el.setAttribute('active-page', '5'));
    await waitForStencilLifecycle(page);

    expect(await getAttribute(prevButton, 'aria-disabled')).toBeNull();
  });

  it('should have correct aria disabled attribute on button next', async () => {
    await initPagination({ activePage: 20 });

    const host = await getHost();
    const nextButton = await getNextButton();

    expect(await getAttribute(nextButton, 'aria-disabled')).toBe('true');

    await host.evaluate((el) => el.setAttribute('active-page', '15'));
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

      await host.evaluate((el) => el.setAttribute('active-page', '2'));
      await waitForStencilLifecycle(page);

      expect(await getAttribute(firstPageItem, 'aria-current')).toBeNull();

      await host.evaluate((el) => el.setAttribute('active-page', '1'));
      await waitForStencilLifecycle(page);

      expect(await getAttribute(firstPageItem, 'aria-current')).toBe('page');
    });

    it('should have aria-disabled if selected', async () => {
      await initPagination();

      const host = await getHost();
      const paginationItems = await getPaginationItems();
      const firstPageItem = paginationItems[0];

      expect(await getAttribute(firstPageItem, 'aria-disabled')).toBe('true');

      await host.evaluate((el) => el.setAttribute('active-page', '2'));
      await waitForStencilLifecycle(page);

      expect(await getAttribute(firstPageItem, 'aria-disabled')).toBeNull();

      await host.evaluate((el) => el.setAttribute('active-page', '1'));
      await waitForStencilLifecycle(page);

      expect(await getAttribute(firstPageItem, 'aria-disabled')).toBe('true');
    });
  });

  it('should have no errors if disconnected before fully loaded', async () => {
    const getErrorsAmount = (messages: ConsoleMessage[]) => messages.filter((x) => x.type() === 'error').length;

    const consoleMessages: ConsoleMessage[] = [];
    page.on('console', (msg) => {
      consoleMessages.push(msg);
      if (msg.type() === 'error') {
        const { description } = msg.args()[0]['_remoteObject'];
        if (description) {
          console.log(description);
        }
      }
    });

    await setContentWithDesignSystem(page, ``);
    await page.evaluate(() => {
      const el = document.createElement('p-pagination');
      document.body.append(el);

      setTimeout(() => el.remove(), 10);
    });

    await page.waitForTimeout(10);

    expect(getErrorsAmount(consoleMessages)).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getErrorsAmount(consoleMessages)).toBe(1);
  });

  // TODO: Component has to be refactored. Test fails atm. because it updates on initial render.
  xdescribe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initPagination();
      const status = await getLifecycleStatus(page);

      console.log(status);

      expect(status.componentDidLoad['p-pagination']).toBe(1, 'componentDidLoad: p-pagination');
      expect(status.componentDidLoad['p-icon']).toBe(2, 'componentDidLoad: p-icon');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });
  });
});
