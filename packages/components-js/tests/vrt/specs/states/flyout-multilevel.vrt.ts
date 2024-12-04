import { type Page, expect, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import { type Theme } from '@porsche-design-system/styles';
import {
  PSEUDO_STATES,
  type PrefersColorScheme,
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'flyout-multilevel';

const scenario = async (
  page: Page,
  theme: Theme,
  pseudoState: (typeof PSEUDO_STATES)[number],
  scheme?: PrefersColorScheme
): Promise<void> => {
  const markup = `
<div class="playground light ${pseudoState}" title="should render :${pseudoState}" style="height: 10rem;">
  <p-flyout-multilevel open="true" active-identifier="id-1-1">
    <p-flyout-multilevel-item identifier="id-1" label="Some Label">
      <p-flyout-multilevel-item identifier="id-1-1" label="Some Label">
        <a href="#some-anchor">Some anchor</a>
      </p-flyout-multilevel-item>
      <p-flyout-multilevel-item identifier="id-1-2" label="Some Label"></p-flyout-multilevel-item>
    </p-flyout-multilevel-item>
  </p-flyout-multilevel>
</div>`;

  await setContentWithDesignSystem(page, markup, {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  if (pseudoState === 'hover') {
    await forceHoverState(page, 'p-flyout-multilevel >>> p-button-pure >>> button'); // Dismiss button
    await forceHoverState(page, 'p-flyout-multilevel-item >>> p-button-pure >>> button'); // Back, Selected, Sibling button
    await forceHoverState(page, 'p-flyout-multilevel-item a');
  } else if (pseudoState === 'focus') {
    await forceFocusVisibleState(page, 'p-flyout-multilevel >>> p-button-pure >>> button'); // Dismiss button
    await forceFocusVisibleState(page, 'p-flyout-multilevel-item >>> p-button-pure >>> button'); // Back, Selected, Sibling button
    await forceFocusVisibleState(page, 'p-flyout-multilevel-item a');
  } else if (pseudoState === 'focus-hover') {
    await forceFocusHoverState(page, 'p-flyout-multilevel >>> p-button-pure >>> button'); // Dismiss button
    await forceFocusHoverState(page, 'p-flyout-multilevel-item >>> p-button-pure >>> button'); // Back, Selected, Sibling button
    await forceFocusHoverState(page, 'p-flyout-multilevel-item a');
  }
};

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  themes.forEach((theme) => {
    PSEUDO_STATES.forEach((pseudoState) => {
      test(`should have no visual regression for :${pseudoState} with theme ${theme}`, async ({ page }) => {
        await scenario(page, theme, pseudoState);
        await page.mouse.click(0, 0); // click top left corner of the page to remove autofocus
        await expect(page.locator('#app')).toHaveScreenshot(
          `${component}-${viewportWidthM}-states-${pseudoState}-theme-${theme}.png`
        );
      });
    });
  });

  schemes.forEach((scheme) => {
    PSEUDO_STATES.forEach((pseudoState) => {
      test(`should have no visual regression for :${pseudoState} with theme auto and prefers-color-scheme ${scheme}`, async ({
        page,
      }) => {
        await scenario(page, 'auto', pseudoState, scheme);
        await page.mouse.click(0, 0); // click top left corner of the page to remove autofocus
        await expect(page.locator('#app')).toHaveScreenshot(
          `${component}-${viewportWidthM}-states-${pseudoState}-theme-${scheme}.png`
        ); // fixture is aliased since result has to be equal
      });
    });
  });
});
