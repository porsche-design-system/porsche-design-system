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
import { TAG_COLORS } from '@porsche-design-system/components/src/components/tag/tag-utils';

const component = 'tag';

const scenario = async (page: Page, theme: Theme, scheme?: PrefersColorScheme): Promise<void> => {
  const head = `
    <style>
      p-tag:not(:last-child) { margin-right: 0.5rem; }
      .row:not(:last-child) { margin-bottom: 0.5rem; }
    </style>`;

  const getColorVariations = (theme: Theme, child: string): string =>
    [TAG_COLORS[0], ...TAG_COLORS]
      .map((color, i) => `<p-tag color="${color}"${i === 0 ? 'icon="car"' : ''}>${child}</p-tag>`)
      .join('\n');

  const getElementsMarkup: GetMarkup = () => `
    <div class="row">
      ${getColorVariations(theme, 'Text')}
    </div>
    <div class="row">
      ${getColorVariations(theme, '<a href="#">Link</a>')}
    </div>
    <div class="row">
      ${getColorVariations(theme, '<button>Button</button>')}
    </div>`;

  await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), {
    injectIntoHead: head,
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  await forceHoverState(page, '.hover p-tag >>> span');
  await forceHoverState(page, '.hover p-tag a'); // TODO: chrome hover bug. Remove when fixed.
  await forceFocusState(page, '.focus p-tag a');
  await forceFocusState(page, '.focus p-tag button');
  await forceFocusState(page, '.focus-hover p-tag a');
  await forceFocusState(page, '.focus-hover p-tag button');
  await forceHoverState(page, '.focus-hover p-tag >>> span');
  await forceHoverState(page, '.focus-hover p-tag button');
  await forceHoverState(page, '.focus-hover p-tag a'); // TODO: chrome hover bug. Remove when fixed.
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
