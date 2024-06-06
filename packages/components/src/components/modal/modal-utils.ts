import { type Backdrop } from '../../styles/dialog-styles';

export const MODAL_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type ModalAriaAttribute = (typeof MODAL_ARIA_ATTRIBUTES)[number];

export type ModalBackdrop = Backdrop;
