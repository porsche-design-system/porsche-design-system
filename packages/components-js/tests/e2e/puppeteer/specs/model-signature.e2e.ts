import {
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const initModelSignature = (): Promise<void> => {
  return setContentWithDesignSystem(page, `<p-model-signature></p-model-signature>`);
};

const getHost = () => selectNode(page, 'p-model-signature');

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initModelSignature();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-model-signature'], 'componentDidLoad: p-model-signature').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initModelSignature();
    const host = await getHost();

    await setProperty(host, 'model', 'taycan');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-model-signature'], 'componentDidUpdate: p-model-signature').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initModelSignature();
    await expectA11yToMatchSnapshot(page, await getHost(), { interestingOnly: false });
  });
});
