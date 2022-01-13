import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import {
  expectToSkipFocusOnComponent,
  getActiveElementTagName,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForEventSerialization,
} from '../helpers';
import { Page } from 'puppeteer';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  await initAddEventListener(page);
});
afterEach(async () => await page.close());

TAG_NAMES.filter((tagName) => getComponentMeta(tagName).isDelegatingFocus).forEach((tagName) => {
  const href = tagName.includes('link') || tagName.includes('marque') ? ' href="#"' : '';

  it(`should be removed from tab order for ${tagName}`, async () => {
    await setContentWithDesignSystem(
      page,
      `<a href="#" id="before">before</a>
<${tagName}${href} tabindex="-1">Some label</${tagName}>
<a href="#" id="after">after</a>`
    );

    const host = await selectNode(page, tagName);
    const before = await selectNode(page, '#before');
    const after = await selectNode(page, '#after');

    await expectToSkipFocusOnComponent(page, host, before, after);
  });

  it(`should delegate focus into shadow dom for ${tagName}`, async () => {
    await setContentWithDesignSystem(page, `<${tagName}${href}>Some label</${tagName}>`);

    const host = await selectNode(page, tagName);
    const elTagName = await host.evaluate((el) => el.tagName);

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);

    expect(await getActiveElementTagName(page)).toBe(elTagName);
    expect(await page.evaluate(() => document.activeElement.shadowRoot.activeElement.tagName)).not.toBeNull();
  });
});
