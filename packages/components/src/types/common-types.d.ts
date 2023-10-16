// common type definitions
import type { IconName } from '@porsche-design-system/icons';

export type { ButtonAriaAttribute, LinkAriaAttribute } from '../utils';
export type { PropTypes, ValidatorFunction } from '../utils/validation/validateProps';
export type { BreakpointCustomizable } from '../utils/breakpoint-customizable';
export type { Theme } from '../utils/theme';

export type { TypographyAlign } from '../utils/typography/typography-align';
export type { TypographyAlignDeprecated } from '../utils/typography/typography-align';

// TODO: we shouldn't re-export component specific types
export type { TextSize } from '../components/text/text-size';
export type { TextColor } from '../components/text/text-color';
export type { TextWeight } from '../components/text/text-weight';

export type { IconName } from '@porsche-design-system/icons';

export type LinkButtonIconName = IconName | 'none';

import type { LinkButtonVariant } from '../utils/link-button/link-button-variant';
export type { LinkButtonVariant } from '../utils/link-button/link-button-variant';
export type ButtonVariant = LinkButtonVariant;
export type { ButtonType } from '../utils/link-button/button-type';

export type LinkVariant = LinkButtonVariant;
export type { LinkTarget } from '../utils/link-button/link-target';

export type { AlignLabelDeprecated } from '../utils/link-button/align-label';
export type { AlignLabel } from '../utils/link-button/align-label';

// ROLLUP_REPLACE_VARIABLES are replaced via rollup
declare global {
  const ROLLUP_REPLACE_IS_STAGING: string;
  const ROLLUP_REPLACE_VERSION: string;
  const ROLLUP_REPLACE_CDN_BASE_URL: string;
}

import type { AriaAttributes } from './aria-types';
export type SelectedAriaAttributes<T extends keyof AriaAttributes> = Pick<AriaAttributes, T> | string;
