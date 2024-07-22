import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  type PrefersColorScheme,
  PSEUDO_STATES,
  setContentWithDesignSystem,
} from '../../helpers';
import { type Theme } from '@porsche-design-system/styles';

const component = 'flyout';

const scenario = async (
  page: Page,
  theme: Theme,
  pseudoState: (typeof PSEUDO_STATES)[number],
  scheme?: PrefersColorScheme
): Promise<void> => {
  const markup = `
<div class="playground light ${pseudoState}" title="should render :${pseudoState}" style="height: 300px">
  <p-flyout open="true">
    <div slot="header">
      Some slotted heading
      <span>
        and some slotted, deeply nested <a href="#">anchor</a>.
      </span>
    </div>
    Some content
    <span>
      and some slotted, deeply nested <a href="#">anchor</a>.
    </span>
  </p-flyout>
</div>`;

  await setContentWithDesignSystem(page, markup, {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  if (pseudoState === 'hover') {
    await forceHoverState(page, '.hover p-flyout a');
    // due to custom hover state we need to set hover also on component itself
    await forceHoverState(page, '.hover p-flyout >>> p-button-pure');
    await forceHoverState(page, '.hover p-flyout >>> p-button-pure >>> button');
  } else if (pseudoState === 'focus') {
    await forceFocusVisibleState(page, '.focus p-flyout a');
    await forceFocusVisibleState(page, '.focus p-flyout >>> p-button-pure >>> button');
  } else if (pseudoState === 'focus-hover') {
    await forceFocusHoverState(page, '.focus-hover p-flyout a');
    // due to custom hover state we need to set hover also on component itself
    await forceFocusHoverState(page, '.focus-hover p-flyout >>> p-button-pure');
    await forceFocusHoverState(page, '.focus-hover p-flyout >>> p-button-pure >>> button');
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
