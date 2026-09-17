export const FORM_FIELD_ARIA_ATTRIBUTES = ['aria-label', 'aria-description'] as const;
export type FormFieldAriaAttribute = (typeof FORM_FIELD_ARIA_ATTRIBUTES)[number];
