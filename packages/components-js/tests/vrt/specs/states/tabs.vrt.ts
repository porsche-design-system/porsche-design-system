import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/styles';

const component = 'tabs';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-tabs active-tab-index="0">
      <p-tabs-item label="Tab One">
        Slotted content
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </p-tabs-item>
      <p-tabs-item label="Tab Two"></p-tabs-item>
      <p-tabs-item label="Tab Three"></p-tabs-item>
    </p-tabs>
    <p-tabs active-tab-index="2">
      <p-tabs-item label="Tab One"></p-tabs-item>
      <p-tabs-item label="Tab Two"></p-tabs-item>
      <p-tabs-item label="Tab Three">
        Slotted content
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </p-tabs-item>
    </p-tabs>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'block' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-tabs p-tabs-item a');
  await forceFocusVisibleState(page, '.focus p-tabs p-tabs-item');
  await forceFocusVisibleState(page, '.focus p-tabs p-tabs-item a');
  await forceFocusHoverState(page, '.focus-hover p-tabs p-tabs-item a');
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
