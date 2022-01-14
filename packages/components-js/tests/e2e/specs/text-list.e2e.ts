import { expectA11yToMatchSnapshot, selectNode, setContentWithDesignSystem } from '../helpers';
import { Page } from 'puppeteer';

describe('text-list', () => {
  let page: Page;

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const initTextList = (): Promise<void> => {
    return setContentWithDesignSystem(
      page,
      `
        <p-text-list>
          <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          <p-text-list-item>The quick <a onclick="return false;" href="#">brown fox</a> jumps over the lazy dog</p-text-list-item>
          <p-text-list-item>
            The quick brown fox jumps over the lazy dog
            <p-text-list>
              <p-text-list-item>
                The quick brown fox jumps over the lazy dog
              </p-text-list-item>
            </p-text-list>
          </p-text-list-item>
        </p-text-list>`
    );
  };

  const getLink = () => selectNode(page, 'p-text-list a');

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree', async () => {
      await initTextList();
      const getList = () => selectNode(page, 'p-text-list >>> [role="list"]');

      await expectA11yToMatchSnapshot(page, await getList(), { interestingOnly: false });
    });
  });
});
