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
  setSortToAllTableHeadCell,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'table';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-table>
      <span slot="caption">Some caption <a href="#">with a link</a></span>
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell style="min-width: 2000px;">Some head cell</p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
      <p-table-body>
        <p-table-row>
          <p-table-cell>Some <a href="#">link</a></p-table-cell>
        </p-table-row>
        <p-table-row>
          <p-table-cell>Some cell</p-table-cell>
        </p-table-row>
        <p-table-row>
          <p-table-cell>Some cell</p-table-cell>
        </p-table-row>
      </p-table-body>
    </p-table>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await setSortToAllTableHeadCell(page);

  // TODO: scroll trigger :hover + :focus-visible test is missing due piercing selector only works for nested child
  // TODO: `await forceFocusedState(page, '.focus p-table >>> .scroll-area');`, no class is selectable after piercing selector

  await forceFocusState(page, '.focus p-table-cell a');
  await forceFocusState(page, '.focus [slot="caption"] a');
  await forceFocusState(page, '.focus p-table-head-cell >>> button');

  await forceFocusHoverState(page, '.focus-hover p-table-cell a');
  await forceFocusHoverState(page, '.focus-hover [slot="caption"] a');
  await forceFocusHoverState(page, '.focus-hover p-table-head-cell >>> button');

  await forceHoverState(page, '.hover p-table-cell a');
  await forceHoverState(page, '.hover [slot="caption"] a');
  await forceHoverState(page, '.hover p-table-row:nth-child(3)');
  await forceHoverState(page, '.hover p-table-head-cell >>> button');
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
    test(`should have no visual regression for :hover + :focus-visible with theme auto and prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      await scenario(page, 'auto', scheme);
      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-theme-${scheme}.png`
      ); // fixture is aliased since result has to be equal
    });
  });
});
