import { expectA11yToMatchSnapshot, selectNode, setContentWithDesignSystem } from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const initModelSignature = (): Promise<void> => {
  return setContentWithDesignSystem(page, `<p-model-signature></p-model-signature>`);
};

const getHost = () => selectNode(page, 'p-model-signature');

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initModelSignature();
    await expectA11yToMatchSnapshot(page, await getHost(), { interestingOnly: false });
  });
});
