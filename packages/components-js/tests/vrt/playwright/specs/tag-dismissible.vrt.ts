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

const component = 'tag-dismissible';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');
      const head = `<style>
        #app { display: grid; grid-template-columns: repeat(2, 50%); }
        p-tag-dismissible:not(:last-child) { margin-right: 0.5rem; }
      </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-tag-dismissible theme="${theme}">Some Text</p-tag-dismissible>
        <p-tag-dismissible theme="${theme}" label="Some Label" color="background-base">Some Text</p-tag-dismissible>
        <p-tag-dismissible theme="${theme}" label="Some Label" color="background-surface">Some Text</p-tag-dismissible>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-tag-dismissible >>> button');
      await forceFocusState(page, '.focus p-tag-dismissible'); // native outline should not be visible
      await forceFocusState(page, '.focus p-tag-dismissible >>> button');
      await forceFocusHoverState(page, '.focus-hover p-tag-dismissible >>> button');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
