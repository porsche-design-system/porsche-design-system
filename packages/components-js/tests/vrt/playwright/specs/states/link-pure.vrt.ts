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
} from '../../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'link-pure';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-link-pure href="#">Label default</p-link-pure>
    <p-link-pure><a href="#">Label slotted</a></p-link-pure>
    <p-link-pure align-label="left" href="#">Label align left</p-link-pure>
    <p-link-pure align-label="left"><a href="#">Label slotted align left</a></p-link-pure>
    <p-link-pure align-label="left" icon="logo-delicious" href="#">Label align left</p-link-pure>
    <p-link-pure hide-label="true" href="#">Without label</p-link-pure>
    <p-link-pure hide-label="true"><a href="#">Without label slotted</a></p-link-pure>
    <p-link-pure active="true" href="#">Label active</p-link-pure>
    <p-link-pure active="true"><a href="#">Label slotted active</a></p-link-pure>
    <p-link-pure icon="none" href="#">Label icon none</p-link-pure>
    <p-link-pure icon="none"><a href="#">Label slotted icon none</a></p-link-pure>
    <p-link-pure style="padding: 1rem" href="#">Label custom click-area</p-link-pure>
    <p-link-pure style="padding: 1rem" hide-label="true" href="#">Label custom click-area</p-link-pure>
    <p-link-pure style="padding: 1rem"><a href="#">Label slotted custom click-area</a></p-link-pure>
    <p-link-pure stretch="true" href="#">Label stretch</p-link-pure>
    <p-link-pure stretch="true"><a href="#">Label slotted stretch</a></p-link-pure>
    <p-link-pure align-label="left" stretch="true" href="#">Label stretch align left</p-link-pure>
    <p-link-pure align-label="left" stretch="true"><a href="#">Label slotted stretch align left</a></p-link-pure>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'inline' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-link-pure[href] >>> a');
  await forceHoverState(page, '.hover p-link-pure:not([href]) >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
  await forceHoverState(page, '.hover p-link-pure:not([href]) a'); // TODO: chrome hover bug. Remove when fixed.
  await forceFocusState(page, '.focus p-link-pure'); // native outline should not be visible
  await forceFocusState(page, '.focus p-link-pure[href] >>> a');
  await forceFocusState(page, '.focus:not([href]) p-link-pure a');
  await forceFocusHoverState(page, '.focus-hover p-link-pure[href] >>> a');
  await forceFocusState(page, '.focus-hover p-link-pure:not([href]) a');
  await forceHoverState(page, '.focus-hover p-link-pure:not([href]) a'); // TODO: chrome hover bug. Remove when fixed.
  await forceHoverState(page, '.focus-hover p-link-pure:not([href]) >>> span'); // with slotted <a>, the shadowed <span> is used for hover styling
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
