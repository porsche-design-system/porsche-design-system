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
  'carousel',
  'checkbox-wrapper',
  'content-wrapper',
  'display',
  'divider',
  'fieldset-wrapper',
  'heading',
  'headline',
  'icon',
  'inline-notification',
  'link',
  'link-pure',
  'link-social',
  'modal-basic',
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
  'tabs',
  'tabs-bar',
  'tag',
  'tag-dismissible',
  'text-field-wrapper',
  'text-list',
  'textarea-wrapper',
  'toast-basic',
];

const scenario = async (page: Page) => {
  await openPopoversAndHighlightSpacer(page);
};

it.each(components)('should have no visual regression for component in high-contrast light: %s', async (component) => {
  expect(
    await vrtTest(getVisualRegressionStatesTester(), `${component}-high-contrast-light`, `/#${component}`, {
      ...(component === 'popover' && { scenario }),
      forcedColorsEnabled: true,
      prefersColorScheme: 'light',
    })
  ).toBeFalsy();
});

it.each(components)('should have no visual regression for component in high-contrast dark: %s', async (component) => {
  expect(
    await vrtTest(getVisualRegressionStatesTester(), `${component}-high-contrast-dark`, `/#${component}`, {
      ...(component === 'popover' && { scenario }),
      forcedColorsEnabled: true,
      prefersColorScheme: 'dark',
    })
  ).toBeFalsy();
});
