import { expect, type Page, test } from '@playwright/test';
import { typemThememgn-system/emotion';
import { scemotion viewportWidschemes, themes,}viewportWidthM '@porsche-design-system/shared/shared/testing';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'button';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-button variant="primary">Primary</p-button>
    <p-button variant="secondary">Secondary</p-button>
    <p-button variant="tertiary">Tertiary</p-button>
    <p-button variant="ghost">Ghost</p-button>
    <p-button variant="primary" icon="arrow-right">Primary with icon</p-button>
    <p-button variant="secondary" icon="arrow-right">Secondary with icon</p-button>
    <p-button variant="tertiary" icon="arrow-right">Tertiary with icon</p-button>
    <p-button variant="ghost" icon="arrow-right">Ghost with icon</p-button>
    <p-button variant="primary" hide-label="true" icon="arrow-right">Primary with icon only</p-button>
    <p-button variant="secondary" hide-label="true" icon="arrow-right">Secondary with icon only</p-button>
    <p-button variant="tertiary" hide-label="true" icon="arrow-right">Tertiary with icon only</p-button>
    <p-button variant="ghost" hide-label="true" icon="arrow-right">Ghost with icon only</p-button>
    <p-button variant="primary" loading>Loading Primary</p-button>
    <p-button variant="secondary" loading>Loading Secondary</p-button>
    <p-button variant="tertiary" loading>Loading Tertiary</p-button>
    <p-button variant="ghost" loading>Loading Ghost</p-button>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'inline' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-button >>> button');
  await forceFocusVisibleState(page, '.focus p-button'); // native outline should not be visible
  await forceFocusVisibleState(page, '.focus p-button >>> button');
  await forceFocusHoverState(page, '.focus-hover p-button >>> button');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  themes.forEach((theme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-${theme}.png`);
    });
  });

  schemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-${scheme}.png`); // fixture is aliased since result has to be equal
    });
  });
});
