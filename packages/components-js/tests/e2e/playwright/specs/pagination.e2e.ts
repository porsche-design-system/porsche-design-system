import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getConsoleErrorsAmount,
  getEventSummary,
  getLifecycleStatus,
  initConsoleObserver,
  selectNode,
  setContentWithDesignSystem,
} from '../helpers';

const getHost = (page: Page) => selectNode(page, 'p-pagination');
const getNav = (page: Page) => selectNode(page, 'p-pagination >>> nav');
const getPaginationItems = async (page: Page) => (await (await getNav(page)).$$('span:not(.ellipsis)')).slice(1, -1); // without prev and next

const initPagination = (page: Page, opts?: { activePage?: number }) => {
  const { activePage = 1 } = opts || {};

  return setContentWithDesignSystem(
    page,
    `<p-pagination total-items-count="500" items-per-page="25" active-page="${activePage}"></p-pagination>`
  );
};

test('should have no errors if disconnected before fully loaded', async ({ page }) => {
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

test.describe('events', () => {
  test('should emit both pageChange and update event', async ({ page }) => {
    await initPagination(page);
    const host = await getHost(page);

    await addEventListener(host, 'pageChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'pageChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const [, secondPageItem] = await getPaginationItems(page);
    await secondPageItem.click();
    expect((await getEventSummary(host, 'pageChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initPagination(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-pagination'], 'componentDidLoad: p-pagination').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});
