import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { type Theme } from '@porsche-design-system/emotion';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'link-tile-product';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const image =
    '<img src="http://localhost:3002/placeholder_800x900.svg" width="800" height="900" alt="Some alt text" />';
  const picture = `<picture>
      <source
        media="(min-width:960px)"
        srcset="http://localhost:3002/placeholder_800x900.svg"
      />
      <img src="http://localhost:3002/placeholder_800x900.svg" alt="Some alt text" />
    </picture>`;

  const link = '<a slot="anchor" href="https://porsche.com">Some label</a>';

  const markup = () => `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); column-gap: 16px; padding-bottom: 2rem">
      <p-link-tile-product heading="Product Tile (href, img)" price="1.911,00 €" href="https://porsche.com">
        ${image}
      </p-link-tile-product>
      <p-link-tile-product heading="Product Tile (href, picture)" price="1.911,00 €" href="https://porsche.com">
        ${picture}
      </p-link-tile-product>
    </div>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); column-gap: 16px;">
      <p-link-tile-product heading="Product Tile (slotted link, img)" price="1.911,00 €">
        ${image}
        ${link}
      </p-link-tile-product>
      <p-link-tile-product heading="Product Tile (slotted link, picture)" price="1.911,00 €">
        ${picture}
        ${link}
      </p-link-tile-product>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-link-tile-product >>> .root');
  await forceHoverState(page, '.hover p-link-tile-product >>> p-button-pure >>> .root');

  await forceFocusVisibleState(page, '.focus p-link-tile-product >>> p-button-pure >>> .root');
  await forceFocusVisibleState(page, '.focus p-link-tile-product a');
  await forceFocusVisibleState(page, '.focus p-link-tile-product >>> a');

  await forceHoverState(page, '.focus-hover p-link-tile-product >>> .root');
  await forceFocusHoverState(page, '.focus-hover p-link-tile-product >>> p-button-pure >>> .root');
  await forceFocusHoverState(page, '.focus-hover p-link-tile-product a');
  await forceFocusHoverState(page, '.focus-hover p-link-tile-product >>> a');
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
