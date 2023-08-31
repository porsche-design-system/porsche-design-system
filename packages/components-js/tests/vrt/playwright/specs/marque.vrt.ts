import { expect, test } from '@playwright/test';
import {
  type GetMarkup,
  baseSchemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  setContentWithDesignSystem,
  getBodyMarkup,
} from '../helpers';

const component = 'marque';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');
      const head = `<style>
  p-marque:not(:last-child) { margin-right: 0.5rem; }
</style>`;

      const getElementsMarkup: GetMarkup = () => `<p-marque href="https://www.porsche.com"></p-marque>
<p-marque href="https://www.porsche.com" style="padding: 1rem"></p-marque>`;
      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceFocusState(page, '.focus p-marque'); // native outline should not be visible
      await forceFocusState(page, '.focus p-marque >>> a');
      await forceFocusHoverState(page, '.focus-hover p-marque >>> a');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
