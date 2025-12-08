// common type definitions
import type { IconName } from '@porsche-design-system/icons';

export type { FlagName } from '@porsche-design-system/flags';
export type { IconName } from '@porsche-design-system/icons';
export type { ButtonAriaAttribute, LinkAriaAttribute } from '../utils';
export type { BreakpointCustomizable } from '../utils/breakpoint-customizable';
export type { HeadingSize } from '../utils/typography/heading-size';
export type { HeadingTag } from '../utils/typography/heading-tag';
export type { TextSize } from '../utils/typography/text-size';
export type { TypographyAlign } from '../utils/typography/typography-align';
export type { TypographyTextColor } from '../utils/typography/typography-text-color';
export type { TypographyTextWeight } from '../utils/typography/typography-text-weight';
export type { PropTypes, ValidatorFunction } from '../utils/validation/validateProps';

export type LinkButtonIconName = IconName | 'none';

import type { LinkButtonVariant } from '../utils/link-button/link-button-variant';

export type { LinkButtonVariant } from '../utils/link-button/link-button-variant';
export type ButtonVariant = LinkButtonVariant;
export type { ButtonType } from '../utils/link-button/button-type';

export type LinkVariant = LinkButtonVariant;

export type { AlignLabel } from '../utils/link-button/align-label';
export type { LinkTarget } from '../utils/link-button/link-target';

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

import type { AriaAttributes, AriaRole } from './aria-types';
export type SelectedAriaAttributes<T extends keyof AriaAttributes> = Pick<AriaAttributes, T> | string;
export type SelectedAriaRole<T> = { role: Extract<AriaRole, T> };
