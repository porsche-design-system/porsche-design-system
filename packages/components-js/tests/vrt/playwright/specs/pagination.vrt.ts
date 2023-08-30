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
} from '../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'pagination';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');
      const head = `<style>
        p-pagination { margin-bottom: 1rem; }
        .playground[title]::before { font: revert; }
</style>`;

      const getElementsMarkup: GetThemedMarkup = (theme: Theme) => `
        <p-pagination total-items-count="500" items-per-page="25" active-page="1" theme="${theme}"></p-pagination>
        <p-pagination total-items-count="500" items-per-page="25" active-page="2" theme="${theme}"></p-pagination>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-pagination >>> span');
      await forceFocusState(page, '.focus p-pagination >>> span');
      await forceFocusHoverState(page, '.focus-hover p-pagination >>> span');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
