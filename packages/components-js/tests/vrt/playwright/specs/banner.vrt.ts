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

const component = 'banner';

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
          .playground { transform: translate3d(0, 0, 0); height: 20rem; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-banner open="true" state="neutral" theme="${theme}">
          <span slot="title">
            Slotted title
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </span>
          <span slot="description">
            Slotted description
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </span>
        </p-banner>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-banner span a');
      // TODO: support for 3rd level of shadow DOM is missing
      // await forceHoveredState(page, '.hover p-banner >>> p-inline-notification >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus p-banner span a');
      // await forceFocusedState(page, '.focus p-banner >>> p-inline-notification >>> p-button-pure >>> button');
      await forceFocusHoverState(page, '.focus-hover p-banner span a');
      // await forceFocusedHoveredState(page, '.focus-hover p-banner >>> p-inline-notification >>> p-button-pure >>> button');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
