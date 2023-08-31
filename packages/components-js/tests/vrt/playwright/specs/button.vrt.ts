import { expect, type Page, test } from '@playwright/test';
import {
  baseSchemes,
  baseThemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
  type GetMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'button';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const head = `
    <style>
      p-button:not(:last-child) { margin-right: 1rem; margin-bottom: 1rem; }
    </style>`;

  const getElementsMarkup: GetMarkup = () => `
    <p-button variant="primary">Primary</p-button>
    <p-button variant="secondary">Secondary</p-button>
    <p-button variant="tertiary">Tertiary</p-button>
    <p-button variant="primary" icon="arrow-right">Primary with icon</p-button>
    <p-button variant="secondary" icon="arrow-right">Secondary with icon</p-button>
    <p-button variant="tertiary" icon="arrow-right">Tertiary with icon</p-button>
    <p-button variant="secondary" icon="arrow-right">Secondary with icon</p-button>
    <p-button variant="tertiary" icon="arrow-right">Tertiary with icon</p-button>
    <p-button variant="primary" hide-label="true" icon="arrow-right">Primary with icon only</p-button>
    <p-button variant="secondary" hide-label="true" icon="arrow-right">Secondary with icon only</p-button>
    <p-button variant="tertiary" hide-label="true" icon="arrow-right">Tertiary with icon only</p-button>
    <p-button variant="primary" loading>Loading Primary</p-button>
    <p-button variant="secondary" loading>Loading Secondary</p-button>
    <p-button variant="tertiary" loading>Loading Tertiary</p-button>`;

  await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-button >>> button');
  await forceFocusState(page, '.focus p-button'); // native outline should not be visible
  await forceFocusState(page, '.focus p-button >>> button');
  await forceFocusHoverState(page, '.focus-hover p-button >>> button');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseThemes.forEach((theme) => {
    test(`should have no visual regression for :hover + :focus-visible with theme ${theme}`, async ({ page }) => {
      await scenario(page, theme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${theme}.png`
      );
    });
  });

  baseSchemes.forEach((scheme) => {
    test.skip(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${scheme}.png`
      ); // fixture is aliased since result has to be equal
    });
  });
});
