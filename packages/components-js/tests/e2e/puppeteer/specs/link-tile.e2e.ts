import {
  expectA11yToMatchSnapshot,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-link-tile');
const getRoot = () => selectNode(page, 'p-link-tile >>> .root');
const getLink = () => selectNode(page, 'p-link-tile >>> p-link >>> a');

const imgSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=';

const initLinkTile = (opts?: { compact?: boolean }): Promise<void> => {
  const { compact = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `<p-link-tile href="#" label="Some label" description="Some description" compact="${compact}" >
  <img src="${imgSrc}" alt="Some image label"/>
</p-link-tile>`
  );
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initLinkTile();
    const root = await getRoot();

    await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initLinkTile();
    const host = await getHost();
    const link = await getLink();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
    });
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, link);
  });
});
