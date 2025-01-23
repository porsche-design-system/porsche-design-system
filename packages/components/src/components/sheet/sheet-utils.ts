export const SHEET_ARIA_ATTRIBUTES = ['aria-label', 'role'] as const;
export type SheetAriaAttribute = (typeof SHEET_ARIA_ATTRIBUTES)[number];

export type SheetMotionVisibleEndEventDetail = TransitionEvent;
export type SheetMotionHiddenEndEventDetail = TransitionEvent;
