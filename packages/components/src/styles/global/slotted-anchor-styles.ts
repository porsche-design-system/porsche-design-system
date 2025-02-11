import type { TagName } from '@porsche-design-system/shared';
import { getHoverStyle } from '@porsche-design-system/styles';
import type { Styles } from 'jss';
import { addImportantToEachRule, getFocusJssStyle } from '../common-styles';

export const tagNamesWithSlottedAnchorArray: TagName[] = [
  'p-accordion',
  'p-banner',
  'p-carousel',
  'p-checkbox-wrapper',
  'p-display',
  'p-heading',
  'p-headline',
  'p-inline-notification',
  'p-multi-select',
  'p-pin-code',
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
