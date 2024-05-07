import { TagName } from '@porsche-design-system/shared';
import { Styles } from 'jss';

// TODO: we can get rid of this fix, as soon as p-checkbox-wrapper and p-radio-button-wrapper have been deprecated and
//  replaced by encapsulated p-checkbox and p-radio-button component
// Workaround for Safari >= 16.4 rendering issues (see #3012 for reference).
// Checkbox/Radio-Button change is not rendered immediately if input or its label is still hovered.
// The same bug appears on keyboard navigation.
export const getCheckboxRadioButtonSafariRenderingFix = (tagName: TagName): Styles => ({
  [`${tagName} > input:checked`]: { transform: 'rotateZ(0)' },
});
