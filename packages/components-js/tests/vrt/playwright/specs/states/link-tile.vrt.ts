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

const component = 'link-tile';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const image =
    '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=" alt="Some alt" />';

  const markup = () => `
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 16px;">
      <p-link-tile href="#" label="Some Label" description="Default">
       ${image}
      </p-link-tile>
      <p-link-tile href="#" label="Some Label" description="Compact" compact="true">
       ${image}
      </p-link-tile>
      <p-link-tile href="#" label="Some Label" description="Picture tag" compact="true">
        <picture>
         ${image}
        </picture>
      </p-link-tile>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-link-tile >>> .root');
  await forceHoverState(page, '.hover p-link-tile >>> p-link >>> .root');
  await forceHoverState(page, '.hover p-link-tile >>> p-link-pure >>> .root');
  await forceFocusState(page, '.focus p-link-tile >>> p-link >>> .root');
  await forceFocusState(page, '.focus p-link-tile >>> p-link-pure >>> .root');
  await forceFocusState(page, '.focus p-link-tile >>> a');
  await forceHoverState(page, '.focus-hover p-link-tile >>> p-link >>> .root');
  await forceHoverState(page, '.focus-hover p-link-tile >>> p-link-pure >>> .root');
  await forceHoverState(page, '.focus-hover p-link-tile >>> .root');
  await forceFocusHoverState(page, '.focus-hover p-link-tile >>> p-link >>> .root');
  await forceFocusHoverState(page, '.focus-hover p-link-tile >>> p-link-pure >>> .root');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression for :hover + :focus-visible with theme light`, async ({ page }) => {
    await scenario(page, undefined);
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-light.png`);
  });
});
