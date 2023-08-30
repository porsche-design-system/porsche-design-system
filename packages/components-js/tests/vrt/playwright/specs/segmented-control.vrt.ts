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

const component = 'segmented-control';

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
        p-segmented-control:not(:last-child) { margin-bottom: 0.5rem; }
        .playground[title]::before { font: revert; }
      </style>`;

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-segmented-control value="2" theme="${theme}">
          <p-segmented-control-item value="1">Default</p-segmented-control-item>
          <p-segmented-control-item value="2">Selected</p-segmented-control-item>
          <p-segmented-control-item value="3" disabled>Disabled</p-segmented-control-item>
        </p-segmented-control>
        <p-segmented-control value="2" theme="${theme}">
          <p-segmented-control-item value="1" label="Some label">Default</p-segmented-control-item>
          <p-segmented-control-item value="2" label="Some label">Selected</p-segmented-control-item>
          <p-segmented-control-item value="3" label="Some label" disabled>Disabled</p-segmented-control-item>
        </p-segmented-control>
        <p-segmented-control value="2" theme="${theme}">
          <p-segmented-control-item value="1" icon="arrow-head-right">Default</p-segmented-control-item>
          <p-segmented-control-item value="2" icon="arrow-head-right">Selected</p-segmented-control-item>
          <p-segmented-control-item value="3" icon="arrow-head-right" disabled>Disabled</p-segmented-control-item>
        </p-segmented-control>
        <p-segmented-control value="2" theme="${theme}">
          <p-segmented-control-item value="1" label="Some label" icon="arrow-head-right">Default</p-segmented-control-item>
          <p-segmented-control-item value="2" label="Some label" icon="arrow-head-right">Selected</p-segmented-control-item>
          <p-segmented-control-item value="3" label="Some label" icon="arrow-head-right" disabled>Disabled</p-segmented-control-item>
        </p-segmented-control>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), {
        injectIntoHead: head,
      });

      await forceHoverState(page, '.hover p-segmented-control-item >>> button');
      await forceFocusState(page, '.focus p-segmented-control-item'); // native outline should not be visible
      await forceFocusState(page, '.focus p-segmented-control-item >>> button');
      await forceFocusHoverState(page, '.focus-hover p-segmented-control-item >>> button');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
