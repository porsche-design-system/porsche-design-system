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

const component = 'switch';

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
        p-switch:not(:last-child) { margin-right: 16px; margin-bottom: 1rem; }
      </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-switch theme="${theme}">Label</p-switch>
        <p-switch theme="${theme}" checked="true">Label</p-switch>
        <p-switch theme="${theme}" loading="true">Loading</p-switch>
        <p-switch theme="${theme}" loading="true" checked="true">Loading</p-switch>
        <p-switch theme="${theme}">
          Label
          <span>
            and some slotted, deeply nested <a href="#">anchor</a>.
          </span>
        </p-switch>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-switch >>> button');
      await forceHoverState(page, '.hover p-switch span a');
      await forceFocusState(page, '.focus p-switch'); // native outline should not be visible
      await forceFocusState(page, '.focus p-switch >>> button');
      await forceFocusState(page, '.focus p-switch span a');
      await forceFocusHoverState(page, '.focus-hover p-switch >>> button');
      await forceFocusHoverState(page, '.focus-hover p-switch span a');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
