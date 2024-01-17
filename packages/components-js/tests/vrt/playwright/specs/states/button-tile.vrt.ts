import { expect, type Page, test } from '@playwright/test';
import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt.config';

const component = 'button-tile';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const image =
    '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=" alt="Some alt" />';

  const markup = () => `
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 16px;">
      <p-button-tile label="Some Label" description="Default">
       ${image}
      </p-button-tile>
      <p-button-tile label="Some Label" description="Compact" compact="true">
       ${image}
      </p-button-tile>
      <p-button-tile label="Some Label" description="Picture tag" compact="true">
        <picture>
         ${image}
        </picture>
      </p-button-tile>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-button-tile >>> .root');
  await forceHoverState(page, '.hover p-button-tile >>> p-button >>> .root');
  await forceHoverState(page, '.hover p-button-tile >>> p-button-pure >>> .root');
  await forceFocusState(page, '.focus p-button-tile >>> p-button >>> .root');
  await forceFocusState(page, '.focus p-button-tile >>> p-button-pure >>> .root');
  await forceFocusState(page, '.focus p-button-tile >>> button');
  await forceHoverState(page, '.focus-hover p-button-tile >>> p-button >>> .root');
  await forceHoverState(page, '.focus-hover p-button-tile >>> p-button-pure >>> .root');
  await forceHoverState(page, '.focus-hover p-button-tile >>> .root');
  await forceFocusHoverState(page, '.focus-hover p-button-tile >>> p-button >>> .root');
  await forceFocusHoverState(page, '.focus-hover p-button-tile >>> p-button-pure >>> .root');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression for :hover + :focus-visible with theme light`, async ({ page }) => {
    await scenario(page, undefined);
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-light.png`);
  });
});
