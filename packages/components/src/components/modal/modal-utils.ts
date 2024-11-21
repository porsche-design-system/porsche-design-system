import type { Backdrop } from '../../styles/dialog-styles';

export const MODAL_ARIA_ATTRIBUTES = ['aria-label', 'role'] as const;
export type ModalAriaAttribute = (typeof MODAL_ARIA_ATTRIBUTES)[number];

export type ModalBackdrop = Backdrop;

export type ModalMotionVisibleEndEventDetail = TransitionEvent;
export type ModalMotionHiddenEndEventDetail = TransitionEvent;
