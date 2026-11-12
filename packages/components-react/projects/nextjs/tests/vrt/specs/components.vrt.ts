import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { viewportWidthL, viewportWidthXS } from '@porsche-design-system/testing';
import { expect, test } from '@porsche-design-system/testing/playwright';
import * as globby from 'fast-glob';
import path from 'path';

const sourceDirectory = path.resolve('../../../components-js/src/pages');
const fileNames = globby.sync(`${sourceDirectory}/*.html`).map((filePath) => path.basename(filePath, '.html'));

const tagNames = (TAG_NAMES as unknown as TagName[])
  // Filter out components which don't work on their own
  .filter((tagName) => {
    const { isChunked, requiredParent } = getComponentMeta(tagName);
    return isChunked && !requiredParent;
  })
  .map((tagName) => {
    return tagName.substring(2);
  });

const components = fileNames
  .filter((name) => tagNames.filter((component) => name.match(new RegExp(`^${component}(-\\d+)?$`))).length > 0)
  .filter((name) => {
    const argv = process.argv.slice(5);
    return !argv.length || argv.includes(name);
  });

// these harness pages set prose as value of a date, time or number input
const invalidInputValue = [
  /^The specified value "(?:Without label and description|Responsive label and description|Lorem ipsum dolor sit amet, consetetur sadipscing elitr,)" /,
];

// messages a page logs with JavaScript disabled, by component
const pageConsole: Record<string, RegExp[]> = {
  'input-date': invalidInputValue,
  'input-month': invalidInputValue,
  'input-number': invalidInputValue,
  'input-time': invalidInputValue,
  'input-week': invalidInputValue,
  // next/image rejects the relative src of the deliberately missing image
  'link-tile-product': [/status of 400 \(Bad Request\) http:\/\/localhost:3000\/_next\/image\?url=nonexistent\.png&/],
};

test('should have certain amount of components', () => {
  expect(components.length).toBe(60);
});

for (const component of components) {
  test.describe(component, async () => {
    test.use({
      expectedConsole: async ({ expectedConsole }, use) => use([...expectedConsole, ...(pageConsole[component] ?? [])]),
    });

    for (const viewportWidth of [viewportWidthXS, viewportWidthL]) {
      test(`viewport ${viewportWidth}`, async ({ page }) => {
        await page.goto(`/${component}`);
        await page.waitForLoadState('load');
        // Remove selects in iframes
        await page.evaluate(() => {
          document.querySelectorAll('iframe').forEach((iframe) => {
            const contentDocument = iframe.contentDocument;
            if (!contentDocument) throw new Error('iframe has no content document');
            contentDocument
              .querySelectorAll('select[name="route"], select[name="theme"]')
              .forEach((select) => select.remove());
          });
        });
        await page.setViewportSize({
          width: viewportWidth,
          height: await page.evaluate(() => document.body.clientHeight),
        });
        await page.mouse.click(0, 0); // click top left corner of the page to remove autofocus
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidth}.png`);
      });
    }
  });
}
