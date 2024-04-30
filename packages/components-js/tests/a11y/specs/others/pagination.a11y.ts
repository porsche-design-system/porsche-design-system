import { type Page, test, expect } from '@playwright/test';
import { getAttribute, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';

const getHost = (page: Page) => page.$('p-pagination');
const getNextButton = (page: Page) => page.$('p-pagination li:last-child span');
const getNav = (page: Page) => page.$('p-pagination nav');
const getPaginationItems = async (page: Page) => (await (await getNav(page)).$$('span:not(.ellipsis)')).slice(1, -1); // without prev and next

const initPagination = (page: Page, opts?: { activePage?: number }) => {
  const { activePage = 1 } = opts || {};

  return setContentWithDesignSystem(
    page,
    `<p-pagination total-items-count="500" items-per-page="25" active-page="${activePage}"></p-pagination>`
  );
};

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initPagination(page);
  const navigation = await getNav(page);

  // await expectA11yToMatchSnapshot(page, navigation, { interestingOnly: false });
});

test.fixme(
  'should expose correct accessibility tree if disabled attribute on button next is toggled',
  async ({ page }) => {
    await initPagination(page, { activePage: 20 });

    const host = await getHost(page);
    // await expectA11yToMatchSnapshot(page, await getNextButton(), { message: 'If disabled' });

    await setProperty(host, 'activePage', 15);
    await waitForStencilLifecycle(page);

    // await expectA11yToMatchSnapshot(page, await getNextButton(), { message: 'If not disabled' });
  }
);

test('should have aria-current = page if selected', async ({ page }) => {
  await initPagination(page);

  const host = await getHost(page);
  const [firstPageItem] = await getPaginationItems(page);

  expect(await getAttribute(firstPageItem, 'aria-current')).toBe('page');

  await setProperty(host, 'activePage', 2);
  await waitForStencilLifecycle(page);

  expect(await getAttribute(firstPageItem, 'aria-current')).toBeNull();

  await setProperty(host, 'activePage', 1);
  await waitForStencilLifecycle(page);

  expect(await getAttribute(firstPageItem, 'aria-current')).toBe('page');
});
