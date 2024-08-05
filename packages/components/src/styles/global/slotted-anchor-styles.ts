import type { TagName } from '@porsche-design-system/shared';
import { addImportantToEachRule, getFocusJssStyle } from '../common-styles';
import { getHoverStyle } from '@porsche-design-system/styles';
import type { Styles } from 'jss';

export const tagNamesWithSlottedAnchorArray: TagName[] = [
  'p-accordion',
  'p-banner',
  'p-carousel',
  'p-checkbox-wrapper',
  'p-display',
  'p-flyout',
  'p-heading',
  'p-headline',
  'p-inline-notification',
  'p-modal',
  'p-multi-select',
  'p-pin-code',
  'p-popover',
  'p-radio-button-wrapper',
  'p-select',
  'p-select-wrapper',
  'p-switch',
  'p-table',
  'p-tabs',
  'p-text',
  'p-text-field-wrapper',
  'p-text-list',
  'p-textarea-wrapper',
];

export const getSlottedAnchorStyles = (tagName: TagName): Styles => ({
  '@global': {
    // it's important to reset following styles again for components supporting ::slotted(a) like Link, Link-Pure, Tag and Tabs-Bar,…
    [`${tagName} a`]: addImportantToEachRule({
      textDecoration: 'underline',
      color: 'currentcolor',
      ...getHoverStyle(),
      // light and dark theme are using the same color atm.
      ...getFocusJssStyle('light', { offset: 0 }),
    }),
  },
});
