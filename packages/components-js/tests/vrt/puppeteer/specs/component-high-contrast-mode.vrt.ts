import type { Page } from 'puppeteer';
import {
  getVisualRegressionStatesTester,
  openPopoversAndHighlightSpacer,
  vrtTest,
} from '@porsche-design-system/shared/testing';
import type { Component } from '../helpers';

const components: Component[] = [
  'accordion',
  'banner',
  'button',
  'button-group',
  'button-pure',
  'button-tile',
  'carousel',
  'checkbox-wrapper',
  'content-wrapper',
  'display',
  'divider',
  'fieldset',
  'fieldset-wrapper',
  'heading',
  'headline',
  'icon',
  'inline-notification',
  'link',
  'link-pure',
  'link-social',
  'link-tile',
  'modal',
  // 'overview',
  'pagination',
  'popover',
  'radio-button-wrapper',
  'scroller',
  'segmented-control',
  'select-wrapper',
  'spinner',
  'stepper-horizontal',
  'switch',
  'table',
  'tabs',
  'tabs-bar',
  'tag',
  'tag-dismissible',
  'text-field-wrapper',
  'text-list',
  'textarea-wrapper',
  'toast-basic',
];

const scenarioPopover = async (page: Page) => {
  await openPopoversAndHighlightSpacer(page);
};

const scenarioModalOrBanner = async (page: Page) => {
  await page.mouse.click(0, 0); // click top left corner of the page to remove focus on modal
};

it.each(components)('should have no visual regression for component in high-contrast light: %s', async (component) => {
  expect(
    await vrtTest(
      getVisualRegressionStatesTester(),
      `${component === 'fieldset-wrapper' ? 'fieldset' : `${component}`}-high-contrast-light`,
      `/#${component}`,
      {
        ...(component === 'popover' && { scenario: scenarioPopover }),
        ...(['modal', 'banner'].includes(component) && { scenario: scenarioModalOrBanner }),
        forcedColorsEnabled: true,
        prefersColorScheme: 'light',
      }
    )
  ).toBeFalsy();
});

it.each(components)('should have no visual regression for component in high-contrast dark: %s', async (component) => {
  expect(
    await vrtTest(
      getVisualRegressionStatesTester(),
      `${component === 'fieldset-wrapper' ? 'fieldset' : `${component}`}-high-contrast-dark`,
      `/#${component}`,
      {
        ...(component === 'popover' && { scenario: scenarioPopover }),
        ...(['modal', 'banner'].includes(component) && { scenario: scenarioModalOrBanner }),
        forcedColorsEnabled: true,
        prefersColorScheme: 'dark',
      }
    )
  ).toBeFalsy();
});
