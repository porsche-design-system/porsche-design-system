import { expect, type Page, test } from '@playwright/test';
import {
  viewportWidthM,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'link-tile-model-signature';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const image =
    '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII=" alt="Some alt" />';

  const markup = () => `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); column-gap: 16px;">
      <p-link-tile-model-signature heading="Some heading">
        ${image}
        <p-link slot="primary" href="#">Some Label</p-link>
        <p-link slot="secondary" href="#">Some Label</p-link>
      </p-link-tile-model-signature>
      <p-link-tile-model-signature heading="Some heading" description="Some description">
        <picture>
          ${image}
        </picture>
        <p-link slot="primary" href="#">Some Label</p-link>
        <p-link slot="secondary" href="#">Some Label</p-link>
       </p-link-tile-model-signature>
    </div>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-link-tile-model-signature >>> .root');
  await forceHoverState(page, '.hover p-link-tile-model-signature p-link >>> .root');
  await forceHoverState(page, '.focus p-link-tile-model-signature >>> .root');
  await forceFocusState(page, '.focus p-link-tile-model-signature p-link >>> .root');
  await forceHoverState(page, '.focus-hover p-link-tile-model-signature >>> .root');
  await forceFocusHoverState(page, '.focus-hover p-link-tile-model-signature p-link >>> .root');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression for :hover + :focus-visible with theme light`, async ({ page }) => {
    await scenario(page, undefined);
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-light.png`);
  });
});
