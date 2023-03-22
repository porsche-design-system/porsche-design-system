import type { Page } from 'puppeteer';
import { getLifecycleStatus, goto, selectNode, trackLifecycleStatus, waitForComponentsReady } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should not cause new lifecycle when nothing on the component changes', async () => {
  await goto(page, 'carousel-example-events');
  expect(await waitForComponentsReady(page)).toBe(2); // p-carousel and p-text
  await trackLifecycleStatus(page);

  const initialStatus = await getLifecycleStatus(page);
  expect(initialStatus.componentDidUpdate.all, 'initial componentDidUpdate: all').toBe(0); // tracking was started after page was loaded
  expect(initialStatus.componentDidLoad.all, 'initial componentDidLoad: all').toBe(0); // tracking was started after page was loaded

  const nextButton = await selectNode(page, 'p-carousel >>> p-button-pure:last-of-type >>> button');
  await nextButton.click();
  await waitForComponentsReady(page);

  const finalStatus = await getLifecycleStatus(page);
  expect(finalStatus.componentDidUpdate.all, 'final componentDidUpdate: all').toBe(0);
  expect(finalStatus.componentDidLoad.all, 'final componentDidLoad: all').toBe(0);
});
