export const FORM_STATES = ['none', 'error', 'success'] as const;
export type FormState = typeof FORM_STATES[number];
