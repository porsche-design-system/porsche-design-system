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

const component = 'flyout';

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
          .playground {
            height: 300px;
            transform: translate3d(0, 0, 0);
          }
        </style>`;

      const getElementsMarkup: GetMarkup = () => `
        <p-flyout open="true">
          <div slot="header">
            Some slotted heading
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </div>
          Some content
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </p-flyout>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-flyout a');
      // due to custom hover state we need to set hover also on component itself
      await forceHoverState(page, '.hover p-flyout >>> p-button-pure');
      await forceHoverState(page, '.hover p-flyout >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus p-flyout a');
      await forceFocusState(page, '.focus p-flyout >>> p-button-pure >>> button');
      await forceFocusHoverState(page, '.focus-hover p-flyout a');
      // due to custom hover state we need to set hover also on component itself
      await forceFocusHoverState(page, '.focus-hover p-flyout >>> p-button-pure');
      await forceFocusHoverState(page, '.focus-hover p-flyout >>> p-button-pure >>> button');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
