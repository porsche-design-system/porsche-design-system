import { expect, test, type Page } from '@playwright/test';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { buildDefaultComponentMarkup, setContentWithDesignSystem, setProperty } from '../helpers';

const tagNamesWithHeadingTagProp: TagName[] = TAG_NAMES.filter(
  (tagName) => getComponentMeta(tagName).propsMeta?.headingTag
);

for (const tagName of tagNamesWithHeadingTagProp) {
  test.describe(tagName, () => {
    const getHeadingTagName = (page: Page): Promise<string> =>
      page.locator('h1,h2,h3,h4,h5,h6').evaluate((el) => el.tagName);
    const getHeadingCount = (page: Page): Promise<number> => page.locator('h1,h2,h3,h4,h5,h6').count();

    const host = (page: Page) => page.locator(tagName);

    test('should render correct heading tag when heading-tag property is set', async ({ page }) => {
      const markup = buildDefaultComponentMarkup(tagName).replace(/>/, ' heading="Some heading" heading-tag="h3">');
      await setContentWithDesignSystem(page, markup);

      expect(await getHeadingTagName(page)).toMatch(/H[1-6]/);

      await setProperty(host(page), 'heading-tag', 'h3');

      expect(await getHeadingTagName(page)).toBe('H3');
    });

    if (tagName !== 'p-accordion' && tagName !== 'p-link-tile-model-signature') {
      test('should not render multiple heading tags when slotted heading is set', async ({ page }) => {
        const markup = buildDefaultComponentMarkup(tagName).replace(/>/, ' ><h3 slot="heading">Some heading</h3>');
        await setContentWithDesignSystem(page, markup);
        expect(await getHeadingCount(page)).toEqual(1);
      });
    }
  });
}
