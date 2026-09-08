import type { DialogDismissEventDetail } from '../../utils/dialog/dialog';
import type { Backdrop } from '../common/dialog-base/dialog-base-styles';

export const MODAL_ARIA_ATTRIBUTES = ['aria-label', 'role'] as const;
export type ModalAriaAttribute = (typeof MODAL_ARIA_ATTRIBUTES)[number];

export const MODAL_BACKGROUNDS = ['canvas', 'surface'] as const;
export type ModalBackground = (typeof MODAL_BACKGROUNDS)[number];

export type ModalBackdrop = Backdrop;

export type ModalMotionVisibleEndEventDetail = TransitionEvent;
export type ModalMotionHiddenEndEventDetail = TransitionEvent;
export type ModalDismissEventDetail = DialogDismissEventDetail;
