import { expect, test } from '@playwright/test';
import { TAG_NAMES, TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import {
  expectToSkipFocusOnComponent,
  getActiveElementTagName,
  setContentWithDesignSystem,
  skipInBrowsers,
} from '../helpers';

skipInBrowsers(['webkit', 'firefox']);

// p-select-wrapper excluded since does not work without slotted select
// p-radio-group excluded since does not work without slotted p-radio-group-option and value prop
const tagNames: TagName[] = TAG_NAMES.filter(
  (tagName) => !['p-select-wrapper', 'p-radio-group'].includes(tagName)
).filter((tagName) => getComponentMeta(tagName).isDelegatingFocus);

for (const tagName of tagNames) {
  const href =
    tagName.includes('link') || tagName.includes('wordmark') || tagName.includes('marque') || tagName.includes('crest')
      ? ' href="#"'
      : '';
  const value = tagName.includes('segmented-control-item') ? ' value="some value"' : '';
  const state = tagName.includes('stepper-horizontal-item') ? ' state="complete"' : '';

  const wrapInRequiredParentIfNeeded = (child: string): string => {
    const { requiredParent } = getComponentMeta(tagName);
    return requiredParent ? `<${requiredParent}>${child}</${requiredParent}>` : child;
  };

  test(`should be removed from tab order for ${tagName}`, async ({ page }) => {
    const component = wrapInRequiredParentIfNeeded(`<${tagName}${href}${state} tabindex="-1">Some label</${tagName}>`);
    await setContentWithDesignSystem(
      page,
      `<a href="#" id="before">before</a>
${component}
<a href="#" id="after">after</a>`
    );

    const host = page.locator(tagName);
    const before = page.locator('#before');

    await expectToSkipFocusOnComponent(page, host, before);
  });

  test(`should delegate focus into shadow dom for ${tagName}`, async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      wrapInRequiredParentIfNeeded(`<${tagName}${href}${state}${value}>Some label</${tagName}>`)
    );

    const host = page.locator(tagName);
    const elTagName = await host.evaluate((el) => el.tagName);

    await page.keyboard.press('Tab');

    expect(await getActiveElementTagName(page)).toBe(elTagName);
    expect(await page.evaluate(() => document.activeElement.shadowRoot.activeElement.tagName)).not.toBeNull();
  });
}
