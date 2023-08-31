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
} from '../helpers';
import { type Theme } from '@porsche-design-system/utilities-v2';

const component = 'accordion';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const markup = () => `
    <p-accordion heading="Heading">
      Slotted content
    </p-accordion>
    <p-accordion heading="Heading" open="true">
      Slotted content
    </p-accordion>
    <p-accordion heading="Heading" open="true">
      Slotted content
      <span>
        and some slotted, deeply nested <a href="#">anchor</a>.
      </span>
    </p-accordion>
    <p-accordion heading="Heading (compact=true)" open="true" compact="true">
       Slotted content
    </p-accordion>
    <p-accordion heading="Heading (compact=true)" open="true" compact="true">
      <p-link-pure href="https://www.porsche.com">Some link</p-link-pure>
      <br />
      <p-link-pure href="https://www.porsche.com">Some link</p-link-pure>
    </p-accordion>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-accordion >>> button');
  await forceHoverState(page, '.hover p-accordion > p-link-pure >>> a');
  await forceHoverState(page, '.hover p-accordion a');

  await forceFocusState(page, '.focus p-accordion >>> button');
  await forceFocusState(page, '.focus p-accordion > p-link-pure >>> a');
  await forceFocusState(page, '.focus p-accordion a');

  await forceFocusHoverState(page, '.focus-hover p-accordion >>> button');
  await forceFocusHoverState(page, '.focus-hover p-accordion > p-link-pure >>> a');
  await forceFocusHoverState(page, '.focus-hover p-accordion a');
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
