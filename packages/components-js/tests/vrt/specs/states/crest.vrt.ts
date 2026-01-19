import { expect, type Page, test } from '@playwright/test';
import { viewportWidthM } from '@porsche-design-system/shared/testing';
import { type Theme } from '@porsche-design-system/emotion';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  getPlaygroundPseudoStatesMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'crest';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-crest href="https://porsche.com"></p-crest>
    <p-crest href="https://porsche.com" style="padding: 1rem"></p-crest>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup, { autoLayout: 'inline' }), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceFocusVisibleState(page, '.focus p-crest'); // native outline should not be visible
  await forceFocusVisibleState(page, '.focus p-crest >>> a');
  await forceFocusHoverState(page, '.focus-hover p-crest >>> a');
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression for :hover + :focus-visible with theme light`, async ({ page }) => {
    await scenario(page, undefined);
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthM}-states-theme-light.png`);
  });
});
