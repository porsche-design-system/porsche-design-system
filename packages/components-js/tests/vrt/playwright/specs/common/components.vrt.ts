import { expect, test } from '@playwright/test';
import { baseSchemes, baseThemes, baseViewportWidth, baseViewportWidths, setupScenario } from '../../helpers';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { pdfToPng } from 'pdf-to-png-converter';

const components = (TAG_NAMES as unknown as TagName[])
  .filter((tagName) => {
    // TODO: should not needed to be maintained like this, e.g. find a logic here with matching names or use/extend getComponentMeta() accordingly
    return !/item$|-table-|-select-wrapper-|multi-select-option$/.test(tagName);
  })
  .map((tagName) => {
    return tagName.substring(2);
  })
  .filter((tagName) => {
    // TODO: how does this work? why slice it on every iteration?
    const argv = process.argv.slice(5);
    return !argv.length || argv.includes(tagName);
  });

const isComponentThemeable = (component: string): boolean => getComponentMeta(`p-${component}` as TagName).isThemeable;

test(`should have certain amount of components`, () => {
  expect(components.length).toBe(51);
});

components.forEach((component) => {
  // executed in Chrome + Safari
  test.describe(component, async () => {
    baseThemes.forEach((theme) => {
      test(`should have no visual regression for viewport ${baseViewportWidth} and theme ${theme}`, async ({
        page,
      }) => {
        test.skip(
          ((!isComponentThemeable(component) || component === 'toast') && theme === 'dark') ||
            component === 'stepper-horizontal',
          'This component has no theme support and stepper-horizontal is flaky'
        );

        await setupScenario(page, `/${component}`, baseViewportWidth, {
          forceComponentTheme: isComponentThemeable(component) ? theme : undefined,
        });
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${baseViewportWidth}-theme-${theme}.png`);
      });
    });
  });

  // executed in Chrome only
  test.describe(component, async () => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    // regular tests on different viewports
    baseViewportWidths.forEach((viewportWidth) => {
      test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
        await setupScenario(page, `/${component}`, viewportWidth);
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidth}.png`);
      });
    });

    // prefers-color-scheme: 'light' | 'dark' tests on 1000px viewport
    baseSchemes.forEach((scheme) => {
      // theme="auto"
      test(`should have no visual regression for viewport ${baseViewportWidth} and theme auto with prefers-color-scheme ${scheme}`, async ({
        page,
      }) => {
        test.skip(
          !isComponentThemeable(component) || component === 'toast' || component === 'stepper-horizontal',
          'This component has no theme support and stepper-horizontal is flaky'
        );

        await setupScenario(page, `/${component}`, baseViewportWidth, {
          forceComponentTheme: 'auto',
          prefersColorScheme: scheme,
        });
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${baseViewportWidth}-theme-${scheme}.png`); // fixture is aliased since result has to be equal
      });

      // high contrast mode
      test(`should have no visual regression for viewport ${baseViewportWidth} and high contrast mode with prefers-color-scheme ${scheme}`, async ({
        page,
      }) => {
        await setupScenario(page, `/${component}`, baseViewportWidth, {
          forcedColorsEnabled: true,
          prefersColorScheme: scheme,
        });
        await expect(page.locator('#app')).toHaveScreenshot(
          `${component}-${baseViewportWidth}-high-contrast-scheme-${scheme}.png`
        );
      });
    });

    // 200% font scaling
    test(`should have no visual regression for viewport ${baseViewportWidth} in scale mode`, async ({ page }) => {
      await setupScenario(page, `/${component}`, baseViewportWidth, {
        scalePageFontSize: true,
      });
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${baseViewportWidth}-scale-mode.png`);
    });

    // print view
    baseThemes.forEach((theme) => {
      test(`should have no visual regression for printed pdf with theme ${theme}`, async ({ page }) => {
        test.skip(
          component === 'toast' || component === 'stepper-horizontal',
          'Toast and stepper-horizontal are flaky'
        );

        await setupScenario(page, `/${component}`, baseViewportWidth, {
          // emulateMediaPrint: true, // no need to emulate when we actually print
          forceComponentTheme: isComponentThemeable(component) ? theme : undefined,
        });

        // get rid of header with selects
        await page.evaluate(() => document.body.querySelector('header').remove());

        const viewportHeight = await page.evaluate(() => document.body.clientHeight);

        const pdfBuffer = await page.pdf({
          width: baseViewportWidth, // 612 is the result by default, 1000 gets it to 750, looks like dpi conversion: https://github.com/microsoft/playwright/blob/b9509b3ec66a1789ef804a75b89726b76f45e119/packages/playwright-core/src/server/chromium/crPdf.ts#L44
          height: viewportHeight, // is wrong for pages like accordion, crest, fieldset, link-tile-model-signature and text-field-wrapper for unknown reasons, so end up with a 2nd page which is not screenshotted
          // path: `tests/vrt/playwright/results/${component}-print-theme-${theme}.pdf`, // optional to write it to file
        });

        // easiest would be to compare file buffers but those always differ, probably meta timestamps and such 🤷‍
        // next best approach is to open the PDF in browser like
        // await page.goto(`/assets/${component}.pdf#toolbar=0&navpanes=0&view=FitH`);
        // and then take a screenshot, but that does not work in headless chrome as described here
        // https://github.com/microsoft/playwright/issues/6342 and https://github.com/puppeteer/puppeteer/issues/1872#issuecomment-401523623
        // same goes with embedding the pdf file in an iframe or embed tag
        // as an alternative, pdf.js (also possible to self-host) is an option but why render the pdf in a website again?
        // https://mozilla.github.io/pdf.js/web/viewer.html?file=${baseURL}/assets/pdf/${component}.pdf
        // so for now we convert the pdf to png and compare it via toMatchSnapshot()

        const [img] = await pdfToPng(pdfBuffer);
        expect(img.content).toMatchSnapshot({ name: `${component}-print-theme-${theme}.png` });
      });
    });
  });
});
