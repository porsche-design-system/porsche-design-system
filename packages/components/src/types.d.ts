// common type definitions
import type { IconName } from '@porsche-design-system/icons';

export type { ButtonAriaAttributes } from './utils';
export type { PropTypes, ValidatorFunction } from './utils/validation/validateProps';
export type { BreakpointCustomizable, BreakpointKey } from './utils/breakpoint-customizable';
export type { Theme, ThemeExtendedElectric, ThemeExtendedElectricDark } from './utils/theme';

export type { TextSize } from './components/basic/typography/text/text-size';
export type { TextAlign } from './components/basic/typography/text-align';
export type { TextColor } from './components/basic/typography/text-color';
export type { TextWeight } from './components/basic/typography/text-weight';
export type { HeadlineVariant, VariantType } from './components/basic/typography/headline/headline-utils';

export type { IconName } from '@porsche-design-system/icons';
export type { IconSize } from './components/icon/icon-size';

export type LinkButtonPureIconName = IconName | 'none';

import type { LinkButtonVariant } from './components/navigation/link-button-variant';
export type { LinkButtonVariant } from './components/navigation/link-button-variant';
export type ButtonVariant = LinkButtonVariant;
export type { ButtonType } from './components/action/button-type';

export type LinkVariant = LinkButtonVariant;
export type { LinkTarget } from './components/navigation/link-target';

export type { AlignLabel, AlignLabelType } from './components/action/align-label';

// ROLLUP_REPLACE_IS_STAGING will be provided via webpack
declare global {
  const ROLLUP_REPLACE_IS_STAGING: string;
}

import type { AriaAttributes } from './aria-types';
export type { AriaAttributes } from './aria-types';

export type SelectedAriaAttributes<T extends keyof AriaAttributes> = Pick<AriaAttributes, T> | string;
