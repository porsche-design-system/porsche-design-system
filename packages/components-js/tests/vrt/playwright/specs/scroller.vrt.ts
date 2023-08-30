import { expect, test } from '@playwright/test';
import {
  type GetThemedMarkup,
  baseSchemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  setContentWithDesignSystem,
  getBodyMarkup,
  type GetMarkup,
} from '../helpers';
import { generateGUID } from '../../puppeteer/helpers';

const component = 'scroller';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');
      const head = `
        <style>
          #app { display: grid; grid-template-columns: repeat(2, 50%); }
          .playground[title]::before { font: revert; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) =>
        `<div style="max-width: 400px">
  <p-scroller theme="${theme}" style="white-space: nowrap; line-height: 1.5">
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
    <a href="#">Some anchor</a>
  </p-scroller>
</div>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      // Scroll a bit to ensure both arrows are visible
      await page.evaluate(() =>
        document
          .querySelectorAll('p-scroller')
          .forEach((scroller) => ((scroller as any).scrollToPosition = { scrollPosition: 100 }))
      );

      await forceHoverState(page, '.hover p-scroller >>> button'); // Scroll indicator hover
      await forceFocusState(page, '.focus p-scroller >>> .scroll-wrapper');
      await forceHoverState(page, '.focus-hover p-scroller >>> button');
      await forceFocusState(page, '.focus-hover p-scroller >>> .scroll-wrapper');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
