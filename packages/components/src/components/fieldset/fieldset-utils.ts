import type { FormState } from '../../utils/form/form-state';

export const FIELDSET_LABEL_SIZES = ['small', 'medium'] as const;
export type FieldsetLabelSize = (typeof FIELDSET_LABEL_SIZES)[number];

export type FieldsetState = FormState;
