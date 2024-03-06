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

const setContent = () => setContentWithDesignSystem(page, `<p-crest></p-crest>`);
const setContentWithLink = () =>
  setContentWithDesignSystem(
    page,
    `
    <div>
      <p-crest id="hostElement" href="about:blank#"></p-crest>
    </div>`
  );

const getHost = () => selectNode(page, 'p-crest');
const getLink = () => selectNode(page, 'p-crest >>> a');
const getImage = () => selectNode(page, 'p-crest >>> img');

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await setContent();
    const image = await getImage();

    await expectA11yToMatchSnapshot(page, image);
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await setContentWithLink();
    const host = await getHost();
    const link = await getLink();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
    });
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, link);
  });
});
