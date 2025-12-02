import { buildDefaultComponentMarkup, goto, waitForComponentsReady } from '../helpers';
import { test, expect, type Locator } from '@playwright/test';
import { INTERNAL_TAG_NAMES, TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { format } from 'prettier';

const expectShadowDomToMatchSnapshot = async (host: Locator, tagName: TagName): Promise<void> => {
  const html = await host.evaluate((el) => el.shadowRoot.innerHTML);
  const prettyHtml = await format(html.replace(/>/g, '>\n'), { parser: 'html' });

  expect(prettyHtml).not.toContain('[object Object]');
  expect(prettyHtml).toMatchSnapshot(`${tagName}.txt`);
};

for (const tagName of TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x))) {
  test(`should have no basic DOM regression for ${tagName}`, async ({ page, browserName }) => {
    test.fixme(browserName === 'firefox' && tagName === 'p-carousel');
    test.skip(
      ['firefox', 'webkit'].includes(browserName) &&
        ['p-input-date', 'p-input-month', 'p-input-week', 'p-input-time'].includes(tagName),
      'Skipping due to differing native date/time picker rendering in Firefox and Safari'
    );

    await goto(page, ''); // start page

    const markup = buildDefaultComponentMarkup(tagName);
    await page.evaluate((markup: string) => {
      document.getElementById('app').innerHTML = markup;
    }, markup);
    await waitForComponentsReady(page);

    const host = page.locator(tagName);
    await expectShadowDomToMatchSnapshot(host, tagName);
  });
}
