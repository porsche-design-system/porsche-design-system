// common type definitions
import type { IconName } from '@porsche-design-system/icons';
import type { BreakpointCustomizable } from './utils';

export type { TextSize } from './components/basic/typography/text/text-utils';
export type { HeadlineVariant, VariantType } from './components/basic/typography/headline/headline-utils';

export type TextWeight = 'thin' | 'regular' | 'semibold' | 'bold';

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
export type ThemeExtendedElectric = Theme | 'light-electric';
export type ThemeExtendedElectricDark = ThemeExtendedElectric | 'dark-electric';

export type { IconName } from '@porsche-design-system/icons';
export type IconSize = 'small' | 'medium' | 'large' | 'inherit';

export type LinkButtonPureIconName = IconName | 'none';
export type LinkButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type ButtonVariant = LinkButtonVariant;
export type ButtonType = 'button' | 'submit' | 'reset';

export type LinkVariant = LinkButtonVariant;
export type LinkTarget = '_self' | '_blank' | '_parent' | '_top' | string;

export type FormState = 'none' | 'error' | 'success';

// BreakpointCustomizable Types
export type { BreakpointKey, BreakpointValues, BreakpointCustomizable } from './utils/breakpoint-customizable';

// ROLLUP_REPLACE_IS_STAGING will be provided via webpack
declare global {
  const ROLLUP_REPLACE_IS_STAGING: string;
}

export type AlignLabelType = 'left' | 'right';
export type AlignLabel = BreakpointCustomizable<AlignLabelType>;

import type { AriaAttributes } from './aria-types';
export type { AriaAttributes } from './aria-types';

export type SelectedAriaAttributes<T extends keyof AriaAttributes> = Pick<AriaAttributes, T> | string;
