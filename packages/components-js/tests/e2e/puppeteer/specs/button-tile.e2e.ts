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

const getHost = () => selectNode(page, 'p-button-tile');
const getRoot = () => selectNode(page, 'p-button-tile >>> .root');
const getButton = () => selectNode(page, 'p-button-tile >>> p-button >>> button');

const imgSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=';

const initButtonTile = (opts?: { compact?: boolean }): Promise<void> => {
  const { compact = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `<p-button-tile label="Some label" description="Some description" compact="${compact}" >
  <img src="${imgSrc}" alt="Some image label"/>
</p-button-tile>`
  );
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initButtonTile();
    const root = await getRoot();

    await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initButtonTile();
    const host = await getHost();
    const button = await getButton();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
      'aria-expanded': true,
      'aria-haspopup': true,
    });

    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, button, { message: 'initial aria attributes' });

    await setProperty(host, 'aria', {
      'aria-pressed': true,
    });
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, button, { message: 'aria-pressed attribute' });
  });
});
