export const ACTION_SHEET_ARIA_ATTRIBUTES = ['aria-label', 'role'] as const;
export type ActionSheetAriaAttribute = (typeof ACTION_SHEET_ARIA_ATTRIBUTES)[number];

export type ActionSheetMotionVisibleEndEventDetail = TransitionEvent;
export type ActionSheetMotionHiddenEndEventDetail = TransitionEvent;
