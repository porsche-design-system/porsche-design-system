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
          }
          if (['modal', 'banner'].includes(component)) {
            await page.mouse.click(0, 0); // click top left corner of the page to remove focus on modal
          }
        },
        scalePageFontSize: true,
      }
    )
  ).toBeFalsy();
});
