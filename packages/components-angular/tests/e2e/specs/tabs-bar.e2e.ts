import { ElementHandle, Page } from 'puppeteer';
import { CSS_ANIMATION_DURATION, getElementStyle, selectNode } from '@porsche-design-system/js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getBar = () => selectNode(page, 'p-tabs-bar >>> .bar');
const getBarWidth = async (bar: ElementHandle) => await getElementStyle(bar, 'width');

it('should have correct bar width after reattaching', async () => {
  await goto(page, 'tabs-bar-example-accessibility');
  await waitForComponentsReady(page);

  // @ts-ignore
  expect(await getBarWidth(await getBar()), 'before navigation').toBe('54px');

  await page.select('select', 'overview');
  await page.select('select', 'tabs-bar-example-accessibility');
  await page.waitForTimeout(CSS_ANIMATION_DURATION);

  // @ts-ignore
  expect(await getBarWidth(await getBar()), 'after navigation').toBe('54px');
});
