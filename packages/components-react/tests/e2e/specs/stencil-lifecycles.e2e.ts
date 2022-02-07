import { Page } from 'puppeteer';
import { getLifecycleStatus, goto, selectNode, waitForComponentsReady } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should not trigger updates on non-default props', async () => {
  // Throttle cpu 6x
  const client = await page.target().createCDPSession();
  await client.send('Emulation.setCPUThrottlingRate', { rate: 6 });

  await goto(page, 'stencil-lifecycles');

  await page.evaluate(() => {
    const script = document.createElement('script');
    script.text = `
      const LIFECYCLE_STATUS_KEY = 'stencilLifecycleStatus';

      // initial status
      window[LIFECYCLE_STATUS_KEY] = {
        componentWillLoad: { all: 0 },
        componentDidLoad: { all: 0 },
        componentWillUpdate: { all: 0 },
        componentDidUpdate: { all: 0 },
      };

      const hooks = ['componentWillLoad', 'componentDidLoad', 'componentWillUpdate', 'componentDidUpdate'];
      for (let hook of hooks) {
        window.addEventListener(\`stencil_\${hook}\`, (e) => {
          const eventName = e.type.replace('stencil_', '');
          const tagName = e.composedPath()[0].tagName.toLowerCase();

          if (window[LIFECYCLE_STATUS_KEY][eventName][tagName] === undefined) {
            // to ensure the lifecycle hook is not undefined in our e2e test, we have to initialize it
            for (const hook of hooks) {
              window[LIFECYCLE_STATUS_KEY][hook][tagName] = 0;
            }
          }

          window[LIFECYCLE_STATUS_KEY][eventName][tagName]++;
          window[LIFECYCLE_STATUS_KEY][eventName].all++;

        });
      }`;
    document.body.appendChild(script);
  });

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
  expect(status1.componentDidLoad.all, 'status after first render componentDidLoad: all').toBe(3);

  // Changes key attribute on PLinkPure
  await button.click();
  await waitForComponentsReady(page);

  const status2 = await getLifecycleStatus(page);

  expect(status2.componentDidUpdate['p-link-pure'], 'status after key change componentDidUpdate: p-link-pure').toBe(0);
  expect(status2.componentDidUpdate.all, 'status after key change componentDidUpdate: all').toBe(0);
  expect(status2.componentDidLoad.all, 'status after key change componentDidLoad: all').toBe(6);
});
