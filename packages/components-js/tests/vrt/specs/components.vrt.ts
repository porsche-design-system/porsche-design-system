import { expect, type Page, test } from '@playwright/test';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { schemes, viewportWidthM, viewportWidths } from '@porsche-design-system/shared/testing';
import * as globby from 'globby-legacy';
import * as path from 'path';
import { setupScenario } from '../helpers';

const sourceDirectory = path.resolve('src/pages');
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

const components = fileNames.filter(
  (name) => tagNames.filter((component) => name.match(new RegExp(`^${component}(-\\d+)?$`))).length > 0
);

// VRT pages making use of iFrames can't reliably ensure which iframe is loaded last
// and therefore can't be sure which autofocus gets triggered
const revertAutoFocus = async (page: Page, component: string): Promise<void> => {
  if (
    ['drilldown', 'flyout', 'modal', 'sheet', 'canvas', 'banner', 'select', 'multi-select', 'popover'].includes(
      component.replace(/-\d+/, '')
    )
  ) {
    await page.mouse.click(0, 0); // click top left corner of the page to remove focus
    // Some components like p-select and p-multi-select set focus after opening which we need to remove for every iframe
    await page.evaluate(
      () =>
        document.activeElement &&
        document.activeElement.tagName !== 'body' &&
        (document.activeElement as HTMLElement).blur()
    );
    const iframeElements = page.locator('iframe');
    for (let i = 0; i < (await iframeElements.count()); i++) {
      const frameLocator = iframeElements.nth(i).contentFrame();
      const isBodyFocused = await frameLocator.locator('body').evaluate((body) => body === document.activeElement);
      if (!isBodyFocused) {
        const focusedElements = frameLocator.locator(':focus'); // Fixes focus for p-input-search
        for (let j = 0; j < (await focusedElements.count()); j++) {
          const el = focusedElements.nth(j);
          try {
            await el.blur();
          } catch {}
        }
        await expect(frameLocator.locator('body')).toBeFocused();
      }
    }
  }
};

test('should have certain amount of components', () => {
  expect(components.length).toBe(59);
});

for (const component of components) {
  // executed in Chrome + Safari
  test.describe(component, () => {
    for (const scheme of schemes) {
      test(`color-scheme ${scheme}`, async ({ page }) => {
        await setupScenario(page, `/${component}?scheme=${scheme}`, viewportWidthM);
        await revertAutoFocus(page, component);
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-${scheme}.png`);
      });
    }
  });

  // executed in Chrome only
  test.describe(component, () => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    for (const viewportWidth of viewportWidths.filter((x) => x !== viewportWidthM)) {
      test(`viewport ${viewportWidth}`, async ({ page }) => {
        await setupScenario(page, `/${component}`, viewportWidth);
        await revertAutoFocus(page, component);
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidth}.png`);
      });
    }

    for (const scheme of schemes) {
      test(`prefers-color-scheme ${scheme}`, async ({ page }) => {
        await setupScenario(page, `/${component}?scheme=light-dark`, viewportWidthM, {
          prefersColorScheme: scheme,
        });
        await revertAutoFocus(page, component);
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-${scheme}.png`); // screenshot is aliased since result has to be equal
      });

      test.fixme(`hcm ${scheme}`, async ({ page }) => {
        // test.skip(component === 'select', 'This component is flaky in HC mode');

        await setupScenario(page, `/${component}`, viewportWidthM, {
          forcedColorsEnabled: true,
          prefersColorScheme: scheme,
        });
        await revertAutoFocus(page, component);
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-hcm-${scheme}.png`);
      });
    }

    test(`font-size 200%`, async ({ page }) => {
      await setupScenario(page, `/${component}`, viewportWidthM, {
        scalePageFontSize: true,
      });
      await revertAutoFocus(page, component);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-fs200.png`);
    });

    test(`rtl (right-to-left)`, async ({ page }) => {
      await setupScenario(page, `/${component}?dir=rtl`, viewportWidthM);
      await revertAutoFocus(page, component);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-rtl.png`);
    });

    // TODO: somehow the components run into a timeout here, needs investigation
    const skipPseudoStateTest = ['canvas', 'carousel', 'drilldown', 'pin-code', 'select', 'multi-select'].some((c) =>
      component.startsWith(c)
    );

    (skipPseudoStateTest ? test.fixme : test)(`focus state`, async ({ page }) => {
      await setupScenario(page, `/${component}`, viewportWidthM, {
        forcePseudoState: 'focus',
      });
      await revertAutoFocus(page, component);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-focus.png`);
    });

    (skipPseudoStateTest ? test.fixme : test)(`hover state`, async ({ page }) => {
      await setupScenario(page, `/${component}`, viewportWidthM, {
        forcePseudoState: 'hover',
      });
      await revertAutoFocus(page, component);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-hover.png`);
    });
  });
}
