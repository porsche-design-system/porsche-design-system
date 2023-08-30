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

const component = 'tabs';

// executed in Chrome only
test.describe(component, async () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  baseSchemes.forEach((scheme) => {
    test(`should have no visual regression for :hover + :focus-visible with prefers-color-scheme ${scheme}`, async ({
      page,
    }) => {
      test.skip(scheme === 'dark');
      const head = `
        <style>
          #app { display: grid; grid-template-columns: repeat(2, 50%); }
          .playground[title]::before { font: revert; }
        </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-tabs active-tab-index="0" theme="${theme}">
          <p-tabs-item label="Tab One">
            Slotted content
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </p-tabs-item>
          <p-tabs-item label="Tab Two"></p-tabs-item>
          <p-tabs-item label="Tab Three"></p-tabs-item>
        </p-tabs>
        <p-tabs active-tab-index="2" theme="${theme}">
          <p-tabs-item label="Tab One"></p-tabs-item>
          <p-tabs-item label="Tab Two"></p-tabs-item>
          <p-tabs-item label="Tab Three">
            Slotted content
            <span>
              and some slotted, deeply nested <a href="#">anchor</a>.
            </span>
          </p-tabs-item>
        </p-tabs>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-tabs p-tabs-item a');
      await forceFocusState(page, '.focus p-tabs p-tabs-item');
      await forceFocusState(page, '.focus p-tabs p-tabs-item a');
      await forceFocusHoverState(page, '.focus-hover p-tabs p-tabs-item a');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
