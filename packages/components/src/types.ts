// common type definitions
import type { IconName } from '@porsche-design-system/icons';
import type { BreakpointCustomizable } from './utils';

export type { TextSize } from './components/basic/typography/text/text-utils';
export type { HeadlineVariant } from './components/basic/typography/headline/headline-utils';

export type TextWeight = 'thin' | 'regular' | 'semibold' | 'bold';

export type IconSize = 'small' | 'medium' | 'large' | 'inherit';

export type TextColor =
  | 'brand'
  | 'default'
  | 'neutral-contrast-high'
  | 'neutral-contrast-medium'
  | 'neutral-contrast-low'
  | 'notification-success'
  | 'notification-warning'
  | 'notification-error'
  | 'notification-neutral'
  | 'inherit';

export type TextAlign = 'left' | 'center' | 'right';

export type Theme = 'light' | 'dark';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type LinkVariant = ButtonVariant; // alias

export type LinkTarget = '_self' | '_blank' | '_parent' | '_top' | string;

export type FormState = 'none' | 'error' | 'success';

// Pagination Types
export type NumberOfPageLinks = 5 | 7;
export type PageChangeEvent = { page: number; previousPage: number };

// BreakpointCustomizable Types
export type { BreakpointKey, BreakpointValues, BreakpointCustomizable } from './utils/breakpoint-customizable';

// ROLLUP_REPLACE_IS_STAGING will be provided via webpack
declare global {
  const ROLLUP_REPLACE_IS_STAGING: string;
}

export type { IconName } from '@porsche-design-system/icons';

export type LinkButtonPureIconName = IconName | 'none';

export type AlignLabelType = 'left' | 'right';
export type AlignLabel = BreakpointCustomizable<AlignLabelType>;
