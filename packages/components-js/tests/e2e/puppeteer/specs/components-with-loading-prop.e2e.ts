import type { ElementHandle, Page } from 'puppeteer';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import {
  buildDefaultComponentMarkup,
  expectA11yToMatchSnapshot,
  selectNode,
  setContentWithDesignSystem,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const tagNamesWithLoadingProp: TagName[] = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).propsMeta?.loading);

describe.each<TagName>(tagNamesWithLoadingProp)('%s', (tagName) => {
  const getLoadingStatus = async (): Promise<ElementHandle> => {
    const [nestedComponentWithLoadingProp] = tagNamesWithLoadingProp.filter((tagNameWithLoadingProp) =>
      getComponentMeta(tagName).nestedComponents?.includes(tagNameWithLoadingProp)
    );

    return await selectNode(
      page,
      nestedComponentWithLoadingProp
        ? `${tagName} >>> ${nestedComponentWithLoadingProp} >>> .loading` // e.g. for p-button-tile
        : `${tagName} >>> .loading`
    );
  };

  describe('accessibility', () => {
    const markup = buildDefaultComponentMarkup(tagName);

    it('should expose correct initial accessibility tree properties', async () => {
      await setContentWithDesignSystem(page, markup);
      const status = await getLoadingStatus();

      await expectA11yToMatchSnapshot(page, status, { interestingOnly: false });
    });
  });
});
