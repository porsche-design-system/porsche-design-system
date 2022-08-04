import { ElementHandle, Page } from 'puppeteer';
import { getElementStyle, selectNode } from '@porsche-design-system/js/tests/e2e/helpers';
import { goto } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getBar = () => selectNode(page, 'p-tabs-bar >>> .bar');
const getBarWidth = async (bar: ElementHandle) => await getElementStyle(bar, 'width');

it('should have correct bar width after reattaching', async () => {
  await goto(page, 'tabs-bar-example');

  expect(await getBarWidth(await getBar())).toBe('54px');

  await page.select('select', 'overview');
  await page.select('select', 'tabs-bar-example');

  expect(await getBarWidth(await getBar())).toBe('54px');
});
