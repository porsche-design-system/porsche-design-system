import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import { expectToSkipFocusOnComponent, initAddEventListener, selectNode, setContentWithDesignSystem } from '../helpers';
import { Page } from 'puppeteer';

describe('focus-behavior', () => {
  let page: Page;

  beforeEach(async () => {
    page = await browser.newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  it.each<TagName>(TAG_NAMES.filter((tagName) => getComponentMeta(tagName).delegatesFocus))(
    'should be removed from tab order for %s',
    async (tagName) => {
      await setContentWithDesignSystem(
        page,
        `
        <a href="#" id="before">before</a>
        <${tagName} tabindex="-1">Some label</${tagName}>
        <a href="#" id="after">after</a>
    `
      );

      const host = await selectNode(page, `${tagName}`);
      const before = await selectNode(page, '#before');
      const after = await selectNode(page, '#after');

      await expectToSkipFocusOnComponent(page, host, before, after);
    }
  );
});
