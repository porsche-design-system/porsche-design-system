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
import { Theme } from '@porsche-design-system/utilities-v2';
import { TAG_COLORS } from '@porsche-design-system/components/src/components/tag/tag-utils';

const component = 'text';

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
        <p-text theme="${theme}">
          Text
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </p-text>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-text a');
      await forceHoverState(page, '.hover p-text button');
      await forceFocusState(page, '.focus p-text a');
      await forceFocusState(page, '.focus p-text button');
      await forceFocusHoverState(page, '.focus-hover p-text a');
      await forceFocusHoverState(page, '.focus-hover p-text button');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
