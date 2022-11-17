import type { ElementHandle, Page } from 'puppeteer';
import {
  CSS_ANIMATION_DURATION,
  getElementStyle,
  selectNode,
} from '../../../../components-js/tests/e2e/puppeteer/helpers';
import { goto } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getBar = () => selectNode(page, 'p-tabs-bar >>> .bar');
const getBarWidth = (bar: ElementHandle) => getElementStyle(bar, 'width');

it('should have correct bar width after reattaching', async () => {
  await goto(page, 'tabs-bar-example-accessibility');

  expect(await getBarWidth(await getBar()), 'before navigation').toBe('54px');

  await page.select('select', 'overview');
  await page.select('select', 'tabs-bar-example-accessibility');
  await new Promise((resolve) => setTimeout(resolve, CSS_ANIMATION_DURATION));

  expect(await getBarWidth(await getBar()), 'after navigation').toBe('54px');
});
