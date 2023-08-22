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
  'crest',
  'display',
  'divider',
  'fieldset',
  'fieldset-wrapper',
  'flex',
  'flyout',
  'grid',
  'heading',
  'headline',
  'icon',
  'inline-notification',
  'link',
  'link-pure',
  'link-social',
  'link-tile',
  'link-tile-model-signature',
  'marque',
  'modal',
  'model-signature',
  'multi-select',
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
  'text',
  'text-field-wrapper',
  'text-list',
  'textarea-wrapper',
  'toast-basic',
  'wordmark',
];

it.each(components)('should have no visual regression for scaled component %s', async (component) => {
  expect(
    await vrtTest(
      getVisualRegressionStatesTester(),
      `${component === 'fieldset-wrapper' ? 'fieldset' : `${component}`}-scaling`,
      `/#${component}`,
      {
        scenario: async (page) => {
          if (component === 'popover') {
            await openPopoversAndHighlightSpacer(page);
          } else if (['banner', 'flyout', 'modal'].includes(component)) {
            await page.mouse.click(0, 0); // click top left corner of the page to remove focus from close button
          } else if (component === 'select-wrapper') {
            await page.click('#open-options');
          }
        },
        scalePageFontSize: true,
      }
    )
  ).toBeFalsy();
});
