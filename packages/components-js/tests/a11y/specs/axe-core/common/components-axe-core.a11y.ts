import { type Page } from '@playwright/test';
import { test, expect } from '../../../helpers';
import { setupScenario } from '../../../../vrt/helpers';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { viewportWidthXXS, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import { getComponentMeta } from '@porsche-design-system/component-meta';

const components = (TAG_NAMES as unknown as TagName[])
  .filter((tagName) => {
    // TODO: should not needed to be maintained like this, e.g. find a logic here with matching names or use/extend getComponentMeta() accordingly
    return !/item$|-table-|-select-wrapper-|multi-select-option|select-option$/.test(tagName);
  })
  .filter((tagName) => {
    const { isDeprecated } = getComponentMeta(tagName);
    return !isDeprecated;
  })
  .map((tagName) => {
    return tagName.substring(2);
  });

// VRT pages making use of iFrames can't reliably ensure which iframe is loaded last
// and therefore can't be sure which autofocus gets triggered
const revertAutoFocus = async (page: Page, component: string): Promise<void> => {
  if (['flyout-navigation', 'flyout'].includes(component)) {
    await page.mouse.click(0, 0); // click top left corner of the page to remove focus
  }
};

test(`should have certain amount of components`, () => {
  expect(components.length).toBe(47);
});

components.forEach((component) => {
  // executed in Chrome only
  test.describe(component, async () => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    // Accessibility: AXE-Core tests basic
    // regular tests on 2 different viewports
    [viewportWidthXXS, viewportWidthM].forEach((viewportWidth) => {
      test(`should have no accessibility regression for viewport ${viewportWidth}`, async ({
        page,
        makeAxeBuilder,
      }, testInfo) => {
        await setupScenario(page, `/${component}`, viewportWidth);
        await revertAutoFocus(page, component);

        const accessibilityScanResults = await makeAxeBuilder().analyze();

        await testInfo.attach(`a11y-scan-results-${component}-${viewportWidth}`, {
          body: JSON.stringify(accessibilityScanResults.violations, null, 2),
          contentType: 'application/json',
        });

        expect(accessibilityScanResults.violations.length).toBe(0);
      });
    });
  });
});
