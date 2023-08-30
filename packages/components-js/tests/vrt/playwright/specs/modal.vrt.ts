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

const component = 'modal';

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
          .playground[title]::before { font: revert; }
        </style>`;

      const getElementsMarkup: GetMarkup = () => `
        <p-modal open="true">
          <div slot="heading">
            Some slotted heading
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </div>
          Some content
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </p-modal>`;

      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-modal a');
      // due to custom hover state we need to set hover also on component itself
      await forceHoverState(page, '.hover p-modal >>> p-button-pure');
      await forceHoverState(page, '.hover p-modal >>> p-button-pure >>> button');
      await forceFocusState(page, '.focus p-modal a');
      await forceFocusState(page, '.focus p-modal >>> div');
      await forceFocusState(page, '.focus p-modal >>> p-button-pure >>> button');
      await forceFocusHoverState(page, '.focus-hover p-modal a');
      await forceFocusHoverState(page, '.focus-hover p-modal >>> div');
      // due to custom hover state we need to set hover also on component itself
      await forceFocusHoverState(page, '.focus-hover p-modal >>> p-button-pure');
      await forceFocusHoverState(page, '.focus-hover p-modal >>> p-button-pure >>> button');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
