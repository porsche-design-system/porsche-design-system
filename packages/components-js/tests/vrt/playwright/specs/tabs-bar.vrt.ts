import { expect, test } from '@playwright/test';
import {
  type GetThemedMarkup,
  baseSchemes,
  baseViewportWidth,
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  setContentWithDesignSystem,
  getBodyMarkup,
  type GetMarkup,
} from '../helpers';
import { generateGUID } from '../../puppeteer/helpers';
import { Theme } from '@porsche-design-system/utilities-v2';

const component = 'tabs-bar';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');
      const head = `<style>
        #app { display: grid; grid-template-columns: repeat(2, 50%); }
      </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-tabs-bar theme="${theme}" active-tab-index="1">
          <button type="button">Button Tab One</button>
          <button type="button">Button Tab Two</button>
          <button type="button">Button Tab Three</button>
        </p-tabs-bar>
        <p-tabs-bar theme="${theme}" active-tab-index="1">
          <a href="#">Anchor Tab One</a>
          <a href="#">Anchor Tab Two</a>
          <a href="#">Anchor Tab Three</a>
        </p-tabs-bar>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-tabs-bar button');
      await forceHoverState(page, '.hover p-tabs-bar a');
      await forceFocusState(page, '.focus p-tabs-bar button');
      await forceFocusState(page, '.focus p-tabs-bar a');
      await forceFocusHoverState(page, '.focus-hover p-tabs-bar button');
      await forceFocusHoverState(page, '.focus-hover p-tabs-bar a');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
