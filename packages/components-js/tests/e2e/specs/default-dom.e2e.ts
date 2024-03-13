import { buildDefaultComponentMarkup, goto, waitForComponentsReady } from '../helpers';
import { test, expect, type ElementHandle } from '@playwright/test';
import { INTERNAL_TAG_NAMES, TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { format } from 'prettier';

const expectShadowDomToMatchSnapshot = async (
  host: ElementHandle<HTMLElement | SVGElement>,
  tagName: TagName
): Promise<void> => {
  const html = await host.evaluate((el) => el.shadowRoot.innerHTML);
  const prettyHtml = await format(html.replace(/>/g, '>\n'), { parser: 'html' });

  expect(prettyHtml).not.toContain('[object Object]');
  // TODO: toMatchSnapshot() is deprecated, see https://playwright.dev/docs/api/class-snapshotassertions
  expect(prettyHtml).toMatchSnapshot(`${tagName}.txt`);
};

for (const tagName of TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x))) {
  test(`should have no basic DOM regression for ${tagName}`, async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium');

    await goto(page, ''); // start page

    const markup = buildDefaultComponentMarkup(tagName);
    await page.evaluate((markup: string) => {
      document.getElementById('app').innerHTML = markup;
    }, markup);
    await waitForComponentsReady(page);

    const host = await page.$(tagName);
    await expectShadowDomToMatchSnapshot(host, tagName);
  });
}
