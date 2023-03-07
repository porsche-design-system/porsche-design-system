import type { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
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
describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initButtonTile();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-button-tile'], 'componentDidLoad: p-button-tile').toBe(1);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on init for compact="true"', async () => {
    await initButtonTile({ compact: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-button-tile'], 'componentDidLoad: p-button-tile').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on init for compact responsive', async () => {
    await setContentWithDesignSystem(
      page,
      `<p-button-tile label="Some label" description="Some description" compact="{ base: true, s: false, l: true }" >
  <img src="${imgSrc}" alt="Some image label"/>
</p-button-tile>`
    );
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-button-tile'], 'componentDidLoad: p-button-tile').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initButtonTile();
    const host = await getHost();

    await setProperty(host, 'compact', 'true');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1); // changes the rendered button when compact changes
    expect(status.componentDidUpdate['p-button-tile'], 'componentDidUpdate: p-button-tile').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

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
    });
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button);
  });
});
