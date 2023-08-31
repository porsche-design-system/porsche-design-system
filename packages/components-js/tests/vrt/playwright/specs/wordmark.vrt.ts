import { expect, test } from '@playwright/test';
import {
  type GetThemedMarkup,
  baseSchemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  getThemedBodyMarkup,
  setContentWithDesignSystem,
} from '../helpers';

const component = 'wordmark';

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
          p-wordmark:not(:last-child) { margin-right: 1rem; margin-bottom: 1rem;  }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-wordmark theme="${theme}" href="https://www.porsche.com"></p-wordmark>
        <p-wordmark theme="${theme}" href="https://www.porsche.com" style="padding: 1rem"></p-wordmark>`;
      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceFocusState(page, '.focus p-wordmark'); // native outline should not be visible
      await forceFocusState(page, '.focus p-wordmark >>> a');
      await forceFocusHoverState(page, '.focus-hover p-wordmark >>> a');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
