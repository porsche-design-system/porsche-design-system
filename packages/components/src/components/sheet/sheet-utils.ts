import type { DialogDismissEventDetail } from '../../utils/dialog/dialog';

export const SHEET_ARIA_ATTRIBUTES = ['aria-label', 'role'] as const;
export type SheetAriaAttribute = (typeof SHEET_ARIA_ATTRIBUTES)[number];

export const SHEET_BACKGROUNDS = ['canvas', 'surface'] as const;
export type SheetBackground = (typeof SHEET_BACKGROUNDS)[number];

export type SheetMotionVisibleEndEventDetail = TransitionEvent;
export type SheetMotionHiddenEndEventDetail = TransitionEvent;
export type SheetDismissEventDetail = DialogDismissEventDetail;
