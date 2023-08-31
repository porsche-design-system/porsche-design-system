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

const component = 'crest';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');
      const head = `<style>
  p-crest:not(:last-child) { margin-right: 0.5rem; }
</style>`;

      const getElementsMarkup: GetMarkup = () => `<p-crest href="https://www.porsche.com"></p-crest>
<p-crest href="https://www.porsche.com" style="padding: 1rem"></p-crest>`;
      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceFocusState(page, '.focus p-crest'); // native outline should not be visible
      await forceFocusState(page, '.focus p-crest >>> a');
      await forceFocusHoverState(page, '.focus-hover p-crest >>> a');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
