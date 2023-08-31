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
} from '../helpers';

const component = 'stepper-horizontal';

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

      const stepperHorizontalItems = `
        <p-stepper-horizontal-item state="warning">Warning</p-stepper-horizontal-item>
        <p-stepper-horizontal-item state="complete">Complete</p-stepper-horizontal-item>
        <p-stepper-horizontal-item state="warning" disabled>Warning Disabled</p-stepper-horizontal-item>
        <p-stepper-horizontal-item state="complete" disabled>Complete Disabled</p-stepper-horizontal-item>
        <p-stepper-horizontal-item state="current">Current</p-stepper-horizontal-item>
        <p-stepper-horizontal-item>Default</p-stepper-horizontal-item>`;

      const getElementsMarkup: GetThemedMarkup = (theme) =>
        `<p-stepper-horizontal theme="${theme}">
          ${stepperHorizontalItems}
        </p-stepper-horizontal>

        <p-stepper-horizontal theme="${theme}" size="medium">
          ${stepperHorizontalItems}
        </p-stepper-horizontal>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceHoverState(page, '.hover p-stepper-horizontal p-stepper-horizontal-item >>> button');
      await forceFocusState(page, '.focus p-stepper-horizontal p-stepper-horizontal-item >>> button');
      await forceFocusHoverState(page, '.focus-hover p-stepper-horizontal p-stepper-horizontal-item >>> button');

      await expect(page.locator('#app')).toHaveScreenshot(
        `${component}-${baseViewportWidth}-states-scheme-${scheme}.png`
      );
    });
  });
});
