import { expect, type Page, test } from '@playwright/test';
import { schemes, themes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { type Theme } from '@porsche-design-system/emotion';
import {
  forceFocusHoverState,
  forceFocusVisibleState,
  forceHoverState,
  type PrefersColorScheme,
  PSEUDO_STATES,
  setContentWithDesignSystem,
} from '../../helpers';

const component = 'drilldown';

const scenario = async (
  page: Page,
  theme: Theme,
  pseudoState: (typeof PSEUDO_STATES)[number],
  scheme?: PrefersColorScheme
): Promise<void> => {
  const markup = `
<div class="playground light ${pseudoState}" title="should render :${pseudoState}" style="height: 10rem;">
  <p-drilldown open="true" active-identifier="id-1-1">
    <p-drilldown-item identifier="id-1" label="Some Label">
      <p-drilldown-item identifier="id-1-1" label="Some Label">
        <p-drilldown-link href="#some-anchor">Some anchor</p-drilldown-link>
      </p-drilldown-item>
      <p-drilldown-item identifier="id-1-2" label="Some Label">
      </p-drilldown-item>
    </p-drilldown-item>
  </p-drilldown>
</div>`;

  await setContentWithDesignSystem(page, markup, {
    forceComponentTheme: theme,
    prefersColorScheme: scheme,
  });

  if (pseudoState === 'hover') {
    await forceHoverState(page, 'p-drilldown >>> p-button-pure >>> button'); // Dismiss button
    await forceHoverState(page, 'p-drilldown-item >>> p-button-pure >>> button'); // Back, Cascade button
    await forceHoverState(page, 'p-drilldown-link >>> a');
  } else if (pseudoState === 'focus') {
    await forceFocusVisibleState(page, 'p-drilldown >>> p-button-pure >>> button'); // Dismiss button
    await forceFocusVisibleState(page, 'p-drilldown-item >>> p-button-pure >>> button'); // Back, Cascade button
    await forceFocusVisibleState(page, 'p-drilldown-link >>> a');
  } else if (pseudoState === 'focus-hover') {
    await forceFocusHoverState(page, 'p-drilldown >>> p-button-pure >>> button'); // Dismiss button
    await forceFocusHoverState(page, 'p-drilldown-item >>> p-button-pure >>> button'); // Back, Cascade button
    await forceFocusHoverState(page, 'p-drilldown-link >>> a');
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
