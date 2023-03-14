import { TAG_NAMES } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import {
  expectToSkipFocusOnComponent,
  getActiveElementTagName,
  selectNode,
  setContentWithDesignSystem,
} from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

TAG_NAMES.filter((tagName) => getComponentMeta(tagName).isDelegatingFocus).forEach((tagName) => {
  const href = tagName.includes('link') || tagName.includes('marque') ? ' href="#"' : '';
  const value = tagName.includes('segmented-control-item') ? ' value="some value"' : '';
  const state = tagName.includes('stepper-horizontal-item') ? ' state="complete"' : '';

  const wrapInRequiredParentIfNeeded = (child: string): string => {
    const { requiredParent } = getComponentMeta(tagName);
    return requiredParent ? `<${requiredParent}>${child}</${requiredParent}>` : child;
  };

  it(`should be removed from tab order for ${tagName}`, async () => {
    const component = wrapInRequiredParentIfNeeded(`<${tagName}${href}${state} tabindex="-1">Some label</${tagName}>`);
    await setContentWithDesignSystem(
      page,
      `<a href="#" id="before">before</a>
${component}
<a href="#" id="after">after</a>`
    );

    const host = await selectNode(page, tagName);
    const before = await selectNode(page, '#before');

    await expectToSkipFocusOnComponent(page, host, before);
  });

  it(`should delegate focus into shadow dom for ${tagName}`, async () => {
    await setContentWithDesignSystem(
      page,
      wrapInRequiredParentIfNeeded(`<${tagName}${href}${state}${value}>Some label</${tagName}>`)
    );

    const host = await selectNode(page, tagName);
    const elTagName = await host.evaluate((el) => el.tagName);

    await page.keyboard.press('Tab');

    expect(await getActiveElementTagName(page)).toBe(elTagName);
    expect(await page.evaluate(() => document.activeElement.shadowRoot.activeElement.tagName)).not.toBeNull();
  });
});
