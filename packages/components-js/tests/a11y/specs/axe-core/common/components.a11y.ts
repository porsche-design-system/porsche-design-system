import type { Page } from '@playwright/test';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { themes, viewportWidthM, viewportWidthXXS } from '@porsche-design-system/shared/testing/playwright.vrt';
import { setupScenario } from '../../../../vrt/helpers';
import { expect, test } from '../../../helpers';

const components = (TAG_NAMES as unknown as TagName[])
  // Filter out non-chunked and not deprecated components
  .filter((tagName) => {
    const { isChunked, isDeprecated } = getComponentMeta(tagName);
    return isChunked && !isDeprecated;
  })
  .map((tagName) => {
    return tagName.substring(2);
  });

// VRT pages making use of iFrames can't reliably ensure which iframe is loaded last
// and therefore can't be sure which autofocus gets triggered
const revertAutoFocus = async (page: Page, component: string): Promise<void> => {
  if (['flyout-multilevel', 'flyout'].includes(component)) {
    await page.mouse.click(0, 0); // click top left corner of the page to remove focus
  }
};

const amountOfTestableComponents = 52;

test('should have certain amount of components', () => {
  expect(components.length).toBe(amountOfTestableComponents);
});

// TODO: remove filter once the height issue is fixed (issue/#3687)
for (const component of components.filter(
  (component) => !['button-tile', 'link-tile', 'link-tile-model-signature'].includes(component)
)) {
  const isComponentThemeable = (component: string): boolean =>
    getComponentMeta(`p-${component}` as TagName).isThemeable;

  // executed in Chrome only
  test.describe(component, async () => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    // Accessibility: AXE-Core tests basic
    // regular themed tests on 2 different viewports
    [viewportWidthXXS, viewportWidthM].forEach((viewportWidth) => {
      if (isComponentThemeable(component)) {
        themes.forEach((theme) => {
          test(`should have no accessibility regression for viewport ${viewportWidth} with theme ${theme}`, async ({
            page,
            makeAxeBuilder,
          }, testInfo) => {
            await setupScenario(page, `/${component}`, viewportWidth, { forceComponentTheme: theme });
            await revertAutoFocus(page, component);

            const accessibilityScanResults = await makeAxeBuilder().analyze();

            await testInfo.attach(`a11y-scan-results-${component}-${viewportWidth}-theme-${theme}`, {
              body: JSON.stringify(accessibilityScanResults.violations, null, 2),
              contentType: 'application/json',
            });

            expect(accessibilityScanResults.violations.length).toBe(0);
          });
        });
      } else {
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

          console.log(accessibilityScanResults.violations);

          expect(accessibilityScanResults.violations.length).toBe(0);
        });
      }
    });
  });
}
