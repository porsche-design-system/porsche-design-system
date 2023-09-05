import type { JssStyle } from 'jss';
import type { TextSize, Theme } from '../../types';
import type { HeadlineAlign, HeadlineColor, HeadlineVariant, HeadlineVariantType } from './headline-utils';
import { HEADLINE_TAGS, isValidVariantType } from './headline-utils';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../styles';
import {
  displayMediumStyle,
  fontSizeHeadingLarge,
  fontSizeHeadingMedium,
  fontSizeHeadingSmall,
  fontSizeHeadingXLarge,
  fontSizeHeadingXXLarge,
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
  fontSizeTextXXSmall,
  headingXXLargeStyle,
} from '@porsche-design-system/utilities-v2';
import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from '../../styles/typography-styles';

const headlineSizeMap: Record<Exclude<HeadlineVariantType, 'large-title'>, string> = {
  'headline-1': fontSizeHeadingXXLarge,
  'headline-2': fontSizeHeadingXLarge,
  'headline-3': fontSizeHeadingLarge,
  'headline-4': fontSizeHeadingMedium,
  'headline-5': fontSizeHeadingSmall,
};

const getHeadlineVariantJssStyle = (variant: HeadlineVariantType): JssStyle => {
  return {
    ...(variant === 'large-title'
      ? displayMediumStyle
      : {
          fontSize: headlineSizeMap[variant],
        }),
  };
};

const textSizeMap: { [key in Exclude<TextSize, 'inherit'>]: string } = {
  'xx-small': fontSizeTextXXSmall,
  'x-small': fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  'x-large': fontSizeTextXLarge,
};

const getTextSizeJssStyle = (textSize: TextSize): JssStyle => {
  return {
    fontSize: textSize === 'inherit' ? textSize : textSizeMap[textSize],
  };
};

export const getComponentCss = (
  variant: HeadlineVariant,
  align: HeadlineAlign,
  color: HeadlineColor,
  ellipsis: boolean,
  theme: Theme
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      '::slotted': {
        [HEADLINE_TAGS.map((i) => `&(${i})`).join()]: addImportantToEachRule(getTypographySlottedJssStyle()),
      },
    },
    root: getTypographyRootJssStyle(
      headingXXLargeStyle,
      isValidVariantType(variant)
        ? getHeadlineVariantJssStyle(variant as HeadlineVariantType)
        : buildResponsiveStyles(variant, getTextSizeJssStyle),
      align,
      color,
      ellipsis,
      theme
    ),
  });
};
