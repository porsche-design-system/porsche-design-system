import type { Page } from 'puppeteer';
import { getLifecycleStatus, goto, selectNode, trackLifecycleStatus, waitForComponentsReady } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should not cause new lifecycle when nothing on the component changes', async () => {
  await goto(page, 'carousel-example-events');
  expect(await waitForComponentsReady(page)).toBe(2); // p-carousel and p-text

  const prevButton = await selectNode(page, 'p-carousel >>> p-button-pure:first-of-type >>> button');
  const nextButton = await selectNode(page, 'p-carousel >>> p-button-pure:last-of-type >>> button');

  await page.waitForFunction((el: HTMLElement) => el.getAttribute('aria-label') === 'Go to last slide', {}, prevButton);

  await trackLifecycleStatus(page);

  const initialStatus = await getLifecycleStatus(page);
  expect(initialStatus.componentDidUpdate.all, 'initial componentDidUpdate: all').toBe(0); // tracking was started after page was loaded
  expect(initialStatus.componentDidLoad.all, 'initial componentDidLoad: all').toBe(0); // tracking was started after page was loaded

  await nextButton.click();

  await page.waitForFunction((el: HTMLElement) => el.getAttribute('aria-label') === 'Previous slide', {}, prevButton);

  const finalStatus = await getLifecycleStatus(page);
  expect(finalStatus.componentDidUpdate['p-button-pure'], 'final componentDidUpdate: p-button-pure').toBe(1);
  expect(finalStatus.componentDidUpdate.all, 'final componentDidUpdate: all').toBe(1);
  expect(finalStatus.componentDidLoad.all, 'final componentDidLoad: all').toBe(0);
});
