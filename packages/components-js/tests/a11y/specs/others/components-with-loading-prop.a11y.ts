import { type Page, type Locator, test, expect } from '@playwright/test';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { buildDefaultComponentMarkup, setContentWithDesignSystem } from '../../helpers';

const tagNamesWithLoadingProp: TagName[] = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).propsMeta?.loading);

for (const tagName of tagNamesWithLoadingProp) {
  test.fixme(`should expose correct initial accessibility tree properties "${tagName}"`, async ({ page }) => {
    const getLoadingStatus = async (): Promise<Locator> => {
      const [nestedComponentWithLoadingProp] = tagNamesWithLoadingProp.filter((tagNameWithLoadingProp) =>
        getComponentMeta(tagName).nestedComponents?.includes(tagNameWithLoadingProp)
      );

      return page.locator(
        nestedComponentWithLoadingProp
          ? `${tagName} ${nestedComponentWithLoadingProp} .loading` // e.g. for p-button-tile
          : `${tagName} .loading`
      );
    };
    const markup = buildDefaultComponentMarkup(tagName);
    await setContentWithDesignSystem(page, markup);
    const status = await getLoadingStatus();

    // await expectA11yToMatchSnapshot(page, status, { interestingOnly: false });
  });
}
