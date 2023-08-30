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

const component = 'display';

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

      const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-display size="medium" theme="${theme}">
            Display
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </p-display>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-display a');
      await forceHoverState(page, '.hover p-display button');
      await forceFocusState(page, '.focus p-display a');
      await forceFocusState(page, '.focus p-display button');
      await forceFocusHoverState(page, '.focus-hover p-display a');
      await forceFocusHoverState(page, '.focus-hover p-display button');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
