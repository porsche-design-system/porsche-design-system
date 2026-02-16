import type { AriaAttributes, AriaRole } from '../../types';
import { parseAndGetAriaAttributes } from '../../utils';
import type { FormState } from '../../utils/form/form-state';

export const FIELDSET_LABEL_SIZES = ['small', 'medium'] as const;
export type FieldsetLabelSize = (typeof FIELDSET_LABEL_SIZES)[number];

export type FieldsetState = FormState;

export const FIELDSET_ARIA_ATTRIBUTES = ['role'] as const;
export type FieldsetAriaAttribute = (typeof FIELDSET_ARIA_ATTRIBUTES)[number];

export const getFieldsetAriaAttributes = (
  isRequired: boolean,
  isInvalid: boolean,
  aria?: { [key in FieldsetAriaAttribute]: Extract<AriaRole, 'radiogroup'> }
): AriaAttributes => {
  const ariaAttrs = parseAndGetAriaAttributes(aria);
  return {
    ...ariaAttrs,
    ...(isRequired && ariaAttrs?.role === 'radiogroup' && { 'aria-required': 'true' }),
    ...(isInvalid && { 'aria-invalid': 'true' }),
  };
};
