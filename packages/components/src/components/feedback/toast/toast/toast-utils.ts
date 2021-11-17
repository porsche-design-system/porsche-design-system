import type { BreakpointCustomizable } from '../../../../utils';

export const TOAST_STATES = ['neutral', 'success'] as const;
export type ToastState = typeof TOAST_STATES[number];

export type ToastOffset = BreakpointCustomizable<number>;
export const defaultToastOffset: ToastOffset = { base: 56, s: 64 }; // aligned with banner's content-wrapper
