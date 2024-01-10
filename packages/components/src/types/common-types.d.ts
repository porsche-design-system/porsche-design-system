// common type definitions
import type { IconName } from '@porsche-design-system/icons';

export type { ButtonAriaAttribute, LinkAriaAttribute } from '../utils';
export type { PropTypes, ValidatorFunction } from '../utils/validation/validateProps';
export type { BreakpointCustomizable } from '../utils/breakpoint-customizable';
export type { Theme } from '../utils/theme';

export type { TypographyAlign, TypographyAlignDeprecated } from '../utils/typography/typography-align';

export type { TextSize } from '../utils/typography/text-size';
export type { TypographyTextColor, TypographyTextColorDeprecated } from '../utils/typography/typography-text-color';
export type { TypographyTextWeight, TypographyTextWeightDeprecated } from '../utils/typography/typography-text-weight';

export type { HeadingSize } from '../utils/typography/heading-size';

export type { IconName } from '@porsche-design-system/icons';

export type LinkButtonIconName = IconName | 'none';

import type { LinkButtonVariant } from '../utils/link-button/link-button-variant';
export type { LinkButtonVariant } from '../utils/link-button/link-button-variant';
export type ButtonVariant = LinkButtonVariant;
export type { ButtonType } from '../utils/link-button/button-type';

export type LinkVariant = LinkButtonVariant;
export type { LinkTarget } from '../utils/link-button/link-target';

export type { AlignLabel, AlignLabelDeprecated } from '../utils/link-button/align-label';

// TODO: Share type across repo
export type PorscheDesignSystem = {
  [key: `${number}.${number}.${number}${`-rc.${number}` | ''}`]: {
    prefixes: string[];
    isReady: () => Promise<void>;
    readyResolve: () => void;
  };
  cdn: {
    url: string;
    prefixes: string[]; // to not break older versions
  };
};

// ROLLUP_REPLACE_VARIABLES are replaced via rollup
declare global {
  const ROLLUP_REPLACE_IS_STAGING: string;
  const ROLLUP_REPLACE_VERSION: string;
  const ROLLUP_REPLACE_CDN_BASE_URL: string;
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    porscheDesignSystem: PorscheDesignSystem;
  }
}

import type { AriaAttributes } from './aria-types';
export type SelectedAriaAttributes<T extends keyof AriaAttributes> = Pick<AriaAttributes, T> | string;
