import { expect, test } from '@playwright/test';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { viewportWidths } from '@porsche-design-system/shared/testing/playwright.vrt.config';

const components = (TAG_NAMES as unknown as TagName[])
  .filter((tagName) => {
    // TODO: should not needed to be maintained like this, e.g. find a logic here with matching names or use/extend getComponentMeta() accordingly
    return !/item$|-table-|-select-wrapper-|multi-select-option|select-option$/.test(tagName);
  })
  .map((tagName) => {
    return tagName.substring(2);
  });
// Use for local testing
// .filter((tagName) => {
//   // TODO: how does this work? why slice it on every iteration?
//   const argv = process.argv.slice(5);
//   return !argv.length || argv.includes(tagName);
// });

test(`should have certain amount of components`, () => {
  expect(components.length).toBe(53);
});

components.forEach((component) => {
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
});
