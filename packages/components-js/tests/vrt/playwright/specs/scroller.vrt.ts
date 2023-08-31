import { expect, type Page, test } from '@playwright/test';
import {
  baseSchemes,
  baseThemes,
  baseViewportWidth,
  forceFocusState,
  forceHoverState,
  getBodyMarkup,
  type GetMarkup,
  type PrefersColorScheme,
  setContentWithDesignSystem,
} from '../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'scroller';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const getElementsMarkup: GetMarkup = () =>
    `<div style="max-width: 400px">
      <p-scroller style="white-space: nowrap; line-height: 1.5">
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
        <a href="#">Some anchor</a>
      </p-scroller>
    </div>`;

  await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  // Scroll a bit to ensure both arrows are visible
  await page.evaluate(() =>
    document
      .querySelectorAll('p-scroller')
      .forEach((scroller) => ((scroller as any).scrollToPosition = { scrollPosition: 100 }))
  );

  await forceHoverState(page, '.hover p-scroller >>> button'); // Scroll indicator hover
  await forceFocusState(page, '.focus p-scroller >>> .scroll-wrapper');
  await forceHoverState(page, '.focus-hover p-scroller >>> button');
  await forceFocusState(page, '.focus-hover p-scroller >>> .scroll-wrapper');
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
