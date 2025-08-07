import type { FormState } from '../../utils/form/form-state';
import { SelectedAriaAttributes } from "../../types";
import { AriaAttributes } from "react";
import { parseAndGetAriaAttributes } from "../../utils";

export const FIELDSET_LABEL_SIZES = ['small', 'medium'] as const;
export type FieldsetLabelSize = (typeof FIELDSET_LABEL_SIZES)[number];

export type FieldsetState = FormState;

export const FIELDSET_ARIA_ATTRIBUTES = ['role'] as const;
export type FieldsetAriaAttribute = (typeof FIELDSET_ARIA_ATTRIBUTES)[number];

export const getFieldsetAriaAttributes = (
  isRequired: boolean,
  isInvalid: boolean,
  aria: SelectedAriaAttributes<Extract<FieldsetAriaAttribute, 'radiogroup'>>
): AriaAttributes => {
  return {
    ...parseAndGetAriaAttributes(aria),
    ...(isRequired && parseAndGetAriaAttributes(aria)?.role === 'radiogroup') && { 'aria-required': 'true' },
    ...isInvalid && { 'aria-invalid': 'true' },
  };
};
