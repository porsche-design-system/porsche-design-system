import { expect, type Page, test } from '@playwright/test';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { schemes, themes, viewportWidthM, viewportWidths } from '@porsche-design-system/shared/testing';
import * as globby from 'globby-legacy';
import * as path from 'path';
import { setupScenario } from '../../helpers';

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
// .filter((name) => {
//   // TODO: how does this work? why slice it on every iteration?
//   const argv = process.argv.slice(5);
//   return !argv.length || argv.includes(name);
// });

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

for (const component of components.filter((c) =>
  [
    // 'accordion',
    // 'banner',
    // 'button',
    // 'button-pure',
    // 'button-tile',
    // 'canvas',
    // 'carousel',
    // 'checkbox',
    // 'crest',
    // 'display',
    // 'divider',
    // 'drilldown',
    // 'fieldset',
    // 'flag',
    // 'flyout-1',
    // 'flyout-2',
    // 'flyout-3',
    // 'heading',
    // 'icon',
    // 'inline-notification',
    // 'input-password',
    // 'input-number',
    // 'input-date',
    // 'input-week',
    // 'input-month',
    // 'input-time',
    // 'input-text',
    // 'input-email',
    // 'input-tel',
    // 'input-url',
    // 'input-search',
    // 'link',
    // 'link-pure',
    // 'link-tile',
    // 'link-tile-product',
    // 'modal',
    // 'model-signature',
    // 'multi-select',
    // 'pagination',
    // 'pin-code',
    // 'popover',
    // 'radio-group',
    // 'scroller',
    // 'segmented-control',
    // 'select',
    // 'spinner',
    'stepper-horizontal',
  ].includes(c)
)) {
  // executed in Chrome + Safari
  test.describe(component, () => {
    for (const theme of themes) {
      test(`should have no visual regression for viewport ${viewportWidthM} and theme ${theme}`, async ({ page }) => {
        await setupScenario(page, `/${component}`, viewportWidthM, {
          forceComponentTheme: theme,
        });
        await revertAutoFocus(page, component);
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-theme-${theme}.png`);
      });
    }
  });

  // executed in Chrome only
  test.describe(component, () => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    // regular tests on different viewports
    for (const viewportWidth of viewportWidths.filter((x) => x !== viewportWidthM)) {
      test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
        await setupScenario(page, `/${component}`, viewportWidth);
        await revertAutoFocus(page, component);
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidth}.png`);
      });
    }

    // prefers-color-scheme: 'light' | 'dark' tests on 1000px viewport
    for (const scheme of schemes) {
      // theme="auto"
      test(`should have no visual regression for viewport ${viewportWidthM} and theme auto with prefers-color-scheme ${scheme}`, async ({
        page,
      }) => {
        await setupScenario(page, `/${component}`, viewportWidthM, {
          forceComponentTheme: 'auto',
          prefersColorScheme: scheme,
        });
        await revertAutoFocus(page, component);
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-theme-${scheme}.png`); // fixture is aliased since result has to be equal
      });

      // high contrast mode
      test.fixme(
        `should have no visual regression for viewport ${viewportWidthM} and high contrast mode with prefers-color-scheme ${scheme}`,
        async ({ page }) => {
          // test.skip(component === 'select', 'This component is flaky in HC mode');

          await setupScenario(page, `/${component}`, viewportWidthM, {
            forcedColorsEnabled: true,
            prefersColorScheme: scheme,
          });
          await revertAutoFocus(page, component);
          await expect(page.locator('#app')).toHaveScreenshot(
            `${component}-${viewportWidthM}-high-contrast-scheme-${scheme}.png`
          );
        }
      );
    }

    // 200% font scaling
    test(`should have no visual regression for viewport ${viewportWidthM} in scale mode`, async ({ page }) => {
      await setupScenario(page, `/${component}`, viewportWidthM, {
        scalePageFontSize: true,
      });
      await revertAutoFocus(page, component);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-scale-mode.png`);
    });

    // rtl mode
    test(`should have no visual regression for viewport ${viewportWidthM} in rtl (right-to-left) mode`, async ({
      page,
    }) => {
      await setupScenario(page, `/${component}`, viewportWidthM, {
        forceDirMode: 'rtl',
      });
      await revertAutoFocus(page, component);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-rtl-mode.png`);
    });

    // print view
    /*
      themes.forEach((theme) => {
        test(`should have no visual regression for printed pdf with theme ${theme}`, async ({ page }) => {
          const flakyPrintComponents = [
            'scroller',
            'stepper-horizontal',
            'tabs',
            'tabs-bar',
            'text-field-wrapper',
            'textarea-wrapper',
            'modal',
            'toast',
            'flyout',
            'drilldown',
          ];
          test.skip(flakyPrintComponents.includes(component), `${component} is flaky`);

          await setupScenario(page, `/${component}`, viewportWidthM, {
            forceComponentTheme: isComponentThemeable(component) ? theme : undefined,
          });
          await revertAutoFocus(page, component);

          // get rid of header with selects
          await page.evaluate(() => document.body.querySelector('header').remove());

          const viewportHeight = await page.evaluate(() => document.body.clientHeight);

          const pdfBuffer = await page.pdf({
            width: viewportWidthM, // 612 is the result by default, 1000 gets it to 750, looks like dpi conversion: https://github.com/microsoft/playwright/blob/b9509b3ec66a1789ef804a75b89726b76f45e119/packages/playwright-core/src/server/chromium/crPdf.ts#L44
            height: viewportHeight, // is wrong for pages like accordion, crest, fieldset, link-tile-model-signature and text-field-wrapper for unknown reasons, so end up with a 2nd page which is not screenshotted
            // path: `tests/vrt/results/${component}-print-theme-${theme}.pdf`, // optional to write it to file
          });

          // easiest would be to compare file buffers but those always differ, probably meta timestamps and such 🤷
          // next best approach is to open the PDF in browser like
          // await page.goto(`/assets/${component}.pdf#toolbar=0&navpanes=0&view=FitH`);
          // and then take a screenshot, but that does not work in headless chrome as described here
          // https://github.com/microsoft/playwright/issues/6342
          // same goes with embedding the pdf file in an iframe or embed tag
          // as an alternative, pdf.js (also possible to self-host) is an option but why render the pdf in a website again?
          // https://mozilla.github.io/pdf.js/web/viewer.html?file=${baseURL}/assets/pdf/${component}.pdf
          // so for now we convert the pdf to png and compare it via toMatchSnapshot()

          // TODO: don't use `pdfToPng` provided by `pdf-to-png-converter` since it relies on `canvas` which can cause
          //  issues executing jsdom tests in parallel. In addition, `pdf-to-png-converter` is not a very commonly used
          //  npm package. Maybe we should re-think our testing strategy for print view.
          const [img] = await pdfToPng(pdfBuffer);
          expect(img.content).toMatchSnapshot(`${component}-print-theme-${theme}.png`);
        });
      });
      */
  });
}
