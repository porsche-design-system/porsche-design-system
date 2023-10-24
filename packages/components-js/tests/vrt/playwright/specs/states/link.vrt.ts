import { expect, type Page, test } from '@playwright/test';
import {
  baseSchemes,
  baseThemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
  thresholdConfig,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'link';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-link variant="primary" href="#">Primary</p-link>
    <p-link variant="primary">
      <a href="#">Slotted Primary</a>
    </p-link>
    <p-link variant="primary" href="#" icon="arrow-right">Primary with icon</p-link>
    <p-link variant="primary" icon="arrow-right">
      <a href="#">Slotted Primary with icon</a>
    </p-link>
    <p-link variant="primary" hide-label="true" icon="arrow-right" href="#">Primary</p-link>
    <p-link variant="primary" hide-label="true" icon="arrow-right">
      <a href="#">Slotted Primary</a>
    </p-link>
    <p-link variant="secondary" href="#">Secondary</p-link>
    <p-link variant="secondary">
      <a href="#">Slotted Secondary</a>
    </p-link>
    <p-link variant="secondary" href="#" icon="arrow-right">Secondary with icon</p-link>
    <p-link variant="secondary" icon="arrow-right">
      <a href="#">Slotted Secondary with icon</a>
    </p-link>
    <p-link variant="secondary" hide-label="true" icon="arrow-right" href="#">Secondary</p-link>
    <p-link variant="secondary" hide-label="true" icon="arrow-right">
      <a href="#">Slotted Secondary</a>
    </p-link>
    <p-link variant="tertiary" href="#">Tertiary</p-link>
    <p-link variant="tertiary">
      <a href="#">Slotted Tertiary</a>
    </p-link>
    <p-link variant="tertiary" href="#" icon="arrow-right">Tertiary with icon</p-link>
    <p-link variant="tertiary" icon="arrow-right">
      <a href="#">Slotted Tertiary with icon</a>
    </p-link>
    <p-link variant="tertiary" hide-label="true" icon="arrow-right" href="#">Tertiary</p-link>
    <p-link variant="tertiary" hide-label="true" icon="arrow-right">
      <a href="#">Slotted Tertiary</a>
    </p-link>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'inline' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-link >>> a');
  await forceHoverState(page, '.hover p-link >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
  await forceFocusState(page, '.focus p-link'); // native outline should not be visible
  await forceFocusState(page, '.focus p-link >>> a');
  await forceFocusState(page, '.focus p-link a');
  await forceFocusHoverState(page, '.focus-hover p-link >>> a');
  await forceHoverState(page, '.focus-hover p-link >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
  await forceFocusHoverState(page, '.focus-hover p-link a');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseThemes.forEach((theme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${theme}.png`,
        thresholdConfig
      );
    });
  });

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${scheme}.png`,
        thresholdConfig
      ); // fixture is aliased since result has to be equal
    });
  });
});
