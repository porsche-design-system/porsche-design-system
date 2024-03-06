import type { Page } from 'puppeteer';
import { expectA11yToMatchSnapshot, selectNode, setContentWithDesignSystem } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOpts = {
  withIcon?: boolean;
};

const initTag = (props?: InitOpts) => {
  const { withIcon = false } = props || {};
  const attributes = withIcon ? ' icon="car"' : '';

  const content = `<p-tag${attributes}>Some Tag</p-tag>`;

  return setContentWithDesignSystem(page, content);
};
const getSpan = () => selectNode(page, 'p-tag >>> span');

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initTag();
    await expectA11yToMatchSnapshot(page, await getSpan(), { interestingOnly: false });
  });

  it('should expose correct accessibility tree with icon', async () => {
    await initTag({ withIcon: true });

    await expectA11yToMatchSnapshot(page, await getSpan(), { interestingOnly: false });
  });
});
