import { Page } from 'puppeteer';
import { getAttribute, getBrowser, selectNode, setContentWithDesignSystem, waitForStencilLifecycle } from '../helpers';

describe('pagination', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
  });
  afterEach(async () => await page.close());

  const getPagination = () => selectNode(page, 'p-pagination');
  const getPrevButton = () => selectNode(page, 'p-pagination >>> .p-pagination__prev');
  const getNextButton = () => selectNode(page, 'p-pagination >>> .p-pagination__next');
  const getNav = () => selectNode(page, 'p-pagination >>> nav');
  const getPaginationItems = async () => (await getNav()).$$('.p-pagination__goto');

  it('should have correct aria disabled attribute on button prev', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-pagination total-items-count="500" items-per-page="25" active-page="1"></p-pagination>`
    );

    const host = await getPagination();
    const prevButton = await getPrevButton();

    expect(await getAttribute(prevButton, 'aria-disabled')).toBe('true');
    
    await host.evaluate((el) => el.setAttribute('active-page', '5'));
    await waitForStencilLifecycle(page);

    expect(await getAttribute(prevButton, 'aria-disabled')).toBeNull();
  });

  it('should have correct aria disabled attribute on button next', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-pagination total-items-count="500" items-per-page="25" active-page="20"></p-pagination>`
    );

    const host = await getPagination();
    const nextButton = await getNextButton();

    expect(await getAttribute(nextButton, 'aria-disabled')).toBe('true');

    await host.evaluate((el) => el.setAttribute('active-page', '15'));
    await waitForStencilLifecycle(page);

    expect(await getAttribute(nextButton, 'aria-disabled')).toBeNull();
  });

  describe('page-item', () => {
    it('should have aria-current = page if selected', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-pagination total-items-count="500" items-per-page="25" active-page="1"></p-pagination>`
      );

      const host = await getPagination();
      const paginationItems = await getPaginationItems();

      expect(await getAttribute(paginationItems[0], 'aria-current')).toBe('page');

      await host.evaluate((el) => el.setAttribute('active-page', '2'));
      await waitForStencilLifecycle(page);

      expect(await getAttribute(paginationItems[0], 'aria-current')).toBeNull();

      await host.evaluate((el) => el.setAttribute('active-page', '1'));
      await waitForStencilLifecycle(page);

      expect(await getAttribute(paginationItems[0], 'aria-current')).toBe('page');
    });

    it('should have aria-disabled if selected', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-pagination total-items-count="500" items-per-page="25" active-page="1"></p-pagination>`
      );

      const host = await getPagination();
      const paginationItems = await getPaginationItems();

      expect(await getAttribute(paginationItems[0], 'aria-disabled')).toBe('true');

      await host.evaluate((el) => el.setAttribute('active-page', '2'));
      await waitForStencilLifecycle(page);

      expect(await getAttribute(paginationItems[0], 'aria-disabled')).toBeNull();

      await host.evaluate((el) => el.setAttribute('active-page', '1'));
      await waitForStencilLifecycle(page);

      expect(await getAttribute(paginationItems[0], 'aria-disabled')).toBe('true');
    });
  });
});
