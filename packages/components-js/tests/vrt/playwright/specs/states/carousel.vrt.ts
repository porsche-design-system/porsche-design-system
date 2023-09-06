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

const component = 'carousel';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const head = `
    <style>
      p-carousel div {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #00b0f4;
        height: 100px;
      }
    </style>`;

  const slides = Array.from(Array(6))
    .map((_, i) => `<div>Slide ${i + 1}</div>`)
    .join('');

  const markup = () => `
    <p-carousel skip-link-target="#target">
      <h2 slot="heading">
        Slotted heading
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </h2>
      <p slot="description">
        Slotted description
        <span>
          and some slotted, deeply nested <a href="#">anchor</a>.
        </span>
      </p>
      ${slides}
    </p-carousel>`;

  await setContentWithDesignSystem(page, getPlaygroundPseudoStatesMarkup(markup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-carousel >>> p-button-pure >>> button');
  await forceFocusState(page, '.hover p-carousel >>> p-link-pure'); // to make it appear via :focus
  await forceHoverState(page, '.hover p-carousel >>> p-link-pure >>> a');
  await forceHoverState(page, '.hover p-carousel span a');
  await forceFocusState(page, '.focus p-carousel >>> p-button-pure >>> button');
  await forceFocusState(page, '.focus p-carousel >>> p-link-pure'); // to make it appear via :focus
  await forceFocusState(page, '.focus p-carousel >>> p-link-pure >>> a');
  await forceFocusState(page, '.focus p-carousel span a');
  await forceFocusState(page, '.focus p-carousel >>> .splide__slide'); // TODO: make this work 🤷‍
  await forceFocusHoverState(page, '.focus-hover p-carousel >>> p-button-pure >>> button');
  await forceFocusState(page, '.focus-hover p-carousel >>> p-link-pure'); // to make it appear via :focus
  await forceFocusHoverState(page, '.focus-hover p-carousel >>> p-link-pure >>> a');
  await forceFocusHoverState(page, '.focus-hover p-carousel span a');
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
