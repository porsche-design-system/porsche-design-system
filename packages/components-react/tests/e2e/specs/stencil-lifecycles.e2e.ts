import type { Page } from 'puppeteer';
import { getLifecycleStatus, goto, selectNode, trackLifecycleStatus, waitForComponentsReady } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should not trigger updates on non-default props', async () => {
  // Throttle cpu 6x
  const client = await page.target().createCDPSession();
  await client.send('Emulation.setCPUThrottlingRate', { rate: 6 });

  await goto(page, 'stencil-lifecycles');
  await trackLifecycleStatus(page);

  const button = await selectNode(page, 'button');
  const status = await getLifecycleStatus(page);

  expect(status.componentDidUpdate.all, 'initial componentDidUpdate: all').toBe(0);
  expect(status.componentDidLoad.all, 'initial componentDidLoad: all').toBe(0);

  // Renders PLinkPure on site
  await button.click();
  await waitForComponentsReady(page);

  const status1 = await getLifecycleStatus(page);

  expect(status1.componentDidUpdate['p-link-pure'], 'status after first render componentDidUpdate: p-link-pure').toBe(
    0
  );
  expect(status1.componentDidUpdate.all, 'status after first render componentDidUpdate: all').toBe(0);
  expect(status1.componentDidLoad.all, 'status after first render componentDidLoad: all').toBe(2);

  // Changes key attribute on PLinkPure
  await button.click();
  await waitForComponentsReady(page);

  const status2 = await getLifecycleStatus(page);

  expect(status2.componentDidUpdate['p-link-pure'], 'status after key change componentDidUpdate: p-link-pure').toBe(0);
  expect(status2.componentDidUpdate.all, 'status after key change componentDidUpdate: all').toBe(0);
  expect(status2.componentDidLoad.all, 'status after key change componentDidLoad: all').toBe(4);
});
