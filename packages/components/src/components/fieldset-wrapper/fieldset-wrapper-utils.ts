import type { FormState } from '../../utils/form/form-state';

export const FIELDSET_WRAPPER_LABEL_SIZES = ['small', 'medium'] as const;
export type FieldsetWrapperLabelSize = typeof FIELDSET_WRAPPER_LABEL_SIZES[number];

export type FieldsetWrapperState = FormState;
