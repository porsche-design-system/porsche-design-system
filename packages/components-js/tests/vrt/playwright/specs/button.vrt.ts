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

const component = 'button';

// executed in Chrome only
// TODO: use 1300 vw
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-button theme="${theme}" variant="primary">Primary</p-button>
        <p-button theme="${theme}" variant="secondary">Secondary</p-button>
        <p-button theme="${theme}" variant="primary" icon="arrow-right">Primary with icon</p-button>
        <p-button theme="${theme}" variant="secondary" icon="arrow-right">Secondary with icon</p-button>
        <p-button theme="${theme}" variant="secondary" icon="arrow-right">Secondary with icon</p-button>
        <p-button theme="${theme}" variant="primary" hide-label="true" icon="arrow-right">Primary with icon only</p-button>
        <p-button theme="${theme}" variant="secondary" hide-label="true" icon="arrow-right">Secondary with icon only</p-button>
        <p-button theme="${theme}" variant="primary" loading>Loading Primary</p-button>
        <p-button theme="${theme}" variant="secondary" loading>Loading Secondary</p-button>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup, { autoLayout: true }), {
        prefersColorScheme: scheme,
      });

      await forceHoverState(page, '.hover p-button >>> button');
      await forceFocusState(page, '.focus p-button'); // native outline should not be visible
      await forceFocusState(page, '.focus p-button >>> button');
      await forceFocusHoverState(page, '.focus-hover p-button >>> button');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
