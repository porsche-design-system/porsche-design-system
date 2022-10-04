// common type definitions
import type { IconName } from '@porsche-design-system/icons';

export type { ButtonAriaAttributes } from './utils';
export type { PropTypes, ValidatorFunction } from './utils/validation/validateProps';
export type { BreakpointCustomizable, BreakpointKey } from './utils/breakpoint-customizable';
export type { Theme, ThemeExtendedElectric, ThemeExtendedElectricDark } from './utils/theme';

export type { TextSize } from './components/text/text-size';
export type { TextAlign } from './components/text/text-align';
export type { TextColor } from './components/text/text-color';
export type { TextWeight } from './components/text/text-weight';
export type { HeadlineVariant, VariantType } from './components/headline/headline-utils';

export type { IconName } from '@porsche-design-system/icons';
export type { IconSize } from './components/icon/icon-size';

export type LinkButtonPureIconName = IconName | 'none';

import type { LinkButtonVariant } from './utils/link-button/link-button-variant';
export type { LinkButtonVariant } from './utils/link-button/link-button-variant';
export type ButtonVariant = LinkButtonVariant;
export type { ButtonType } from './utils/link-button/button-type';

export type LinkVariant = LinkButtonVariant;
export type { LinkTarget } from './utils/link-button/link-target';

export type { AlignLabel, AlignLabelType } from './utils/link-button/align-label';

// ROLLUP_REPLACE_IS_STAGING will be provided via webpack
declare global {
  const ROLLUP_REPLACE_IS_STAGING: string;
}

import type { AriaAttributes } from './aria-types';
export type { AriaAttributes } from './aria-types';

export type SelectedAriaAttributes<T extends keyof AriaAttributes> = Pick<AriaAttributes, T> | string;
