import type { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOpts = {
  withLabel?: boolean;
};

const initTagDismissible = (props?: InitOpts) => {
  const { withLabel = false } = props || {};
  const attributes = withLabel ? ' label="Some label"' : '';

  const content = `<p-tag-dismissible${attributes}>Some Tag</p-tag-dismissible>`;

  return setContentWithDesignSystem(page, content);
};

const getHost = () => selectNode(page, 'p-tag-dismissible');
const getButton = () => selectNode(page, 'p-tag-dismissible >>> button');

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initTagDismissible();
    await expectA11yToMatchSnapshot(page, await getButton(), { interestingOnly: false });
  });

  it('should expose correct accessibility tree with label', async () => {
    await initTagDismissible({ withLabel: true });
    await expectA11yToMatchSnapshot(page, await getButton(), { interestingOnly: false });
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initTagDismissible({ withLabel: true });
    const host = await getHost();
    await setProperty(host, 'aria', { 'aria-label': 'Some aria-label' });
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, await getButton(), { interestingOnly: false });
  });
});
