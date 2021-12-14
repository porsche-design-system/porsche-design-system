import {
  expectA11yToMatchSnapshot,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';

describe('spinner', () => {
  let page: Page;

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const initSpinner = (): Promise<void> => {
    return setContentWithDesignSystem(page, `<p-spinner></p-spinner>`);
  };

  const getHost = () => selectNode(page, 'p-spinner');
  const getSpinner = () => selectNode(page, 'p-spinner >>> .root');

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree', async () => {
      await initSpinner();
      const spinner = await getSpinner();

      await expectA11yToMatchSnapshot(page, spinner, { interestingOnly: false });
    });

    it('should expose correct accessibility tree if accessibility properties are set', async () => {
      await initSpinner();
      const host = await getHost();
      const spinner = await getSpinner();

      await setProperty(host, 'aria', {
        'aria-label': 'Loading page content',
      });
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, spinner, { interestingOnly: false });
    });
  });
});
