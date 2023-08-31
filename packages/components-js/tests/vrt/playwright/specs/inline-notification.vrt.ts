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

const component = 'inline-notification';

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
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-inline-notification theme="${theme}" action-label="Retry">
          <span slot="heading">
            Slotted heading
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </span>
          Slotted description
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </p-inline-notification>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-inline-notification a');
      await forceHoverState(page, '.hover p-inline-notification >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus p-inline-notification a');
      await forceFocusState(page, '.focus p-inline-notification >>> p-button-pure >>> button');
      await forceFocusHoverState(page, '.focus-hover p-inline-notification a');
      await forceFocusHoverState(page, '.focus-hover p-inline-notification >>> p-button-pure >>> button');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
