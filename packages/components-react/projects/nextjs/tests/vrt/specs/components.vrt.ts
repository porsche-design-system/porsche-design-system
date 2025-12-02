import { expect, test } from '@playwright/test';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { viewportWidths } from '@porsche-design-system/shared/testing';
import * as globby from 'globby-legacy';
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

test('should have certain amount of components', () => {
  expect(components.length).toBe(72);
});

for (const component of components) {
  test.describe(component, async () => {
    viewportWidths.forEach((viewportWidth) => {
      test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
        await page.goto(`/${component}`);
        // Remove selects in iframes
        await page.evaluate(() => {
          document.querySelectorAll('iframe').forEach((iframe) => {
            iframe.contentDocument
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
    });
  });
}
