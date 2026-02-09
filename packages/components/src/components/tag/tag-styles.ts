import { frostedGlassStyle, spacingStaticXSmall, textXSmallStyle } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  colorCanvas,
  colorContrastHigh,
  colorErrorFrosted,
  colorErrorFrostedSoft,
  colorFrosted,
  colorFrostedStrong,
  colorInfoFrosted,
  colorInfoFrostedSoft,
  colorPrimary,
  colorSuccessFrosted,
  colorSuccessFrostedSoft,
  colorWarningFrosted,
  colorWarningFrostedSoft,
  legacyRadiusSmall,
  radiusFull,
} from '../../styles/css-variables';
import { getCss } from '../../utils';
import type { TagVariant } from './tag-utils';

const colorTextMap: Record<TagVariant, string> = {
  primary: colorCanvas,
  secondary: colorPrimary,
  info: colorPrimary,
  success: colorPrimary,
  warning: colorPrimary,
  error: colorPrimary,
};

const colorBackgroundMap: Record<TagVariant, string> = {
  primary: colorPrimary,
  secondary: colorFrostedStrong,
  info: colorInfoFrosted,
  success: colorSuccessFrosted,
  warning: colorWarningFrosted,
  error: colorErrorFrosted,
};

const colorBackgroundHoverMap: Record<TagVariant, string> = {
  primary: colorContrastHigh,
  secondary: colorFrosted,
  info: colorInfoFrostedSoft,
  success: colorSuccessFrostedSoft,
  warning: colorWarningFrostedSoft,
  error: colorErrorFrostedSoft,
};

export const getColors = (
  variant: TagVariant
): {
  textColor: string;
  backgroundColor: string;
  backgroundHoverColor: string;
} => {
  return {
    textColor: colorTextMap[variant],
    backgroundColor: colorBackgroundMap[variant],
    backgroundHoverColor: colorBackgroundHoverMap[variant],
  };
};

export const getComponentCss = (
  variant: TagVariant,
  compact: boolean,
  isFocusable: boolean,
  hasIcon: boolean
): string => {
  const { textColor, backgroundColor, backgroundHoverColor } = getColors(variant);

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top', // TODO: should we set this CSS style at all?
        whiteSpace: 'nowrap', // TODO: should either be exposed by a controlled CSS variable or a component prop or whitelist as supported custom styles
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      span: {
        position: 'relative', // necessary as relative anchor to ensure click area of optional slotted focusable element is in sync
        display: 'flex',
        gap: '2px',
        padding: compact ? '1px 6px' : `${spacingStaticXSmall} 9px`,
        borderRadius: `var(${legacyRadiusSmall}, ${radiusFull})`,
        font: textXSmallStyle.font,
        ...frostedGlassStyle,
        color: textColor,
        background: backgroundColor,
        transition: `${getTransition('color')}, ${getTransition('background-color')}, ${getTransition('backdrop-filter')}`, // transition style should always be applied to have a smooth color change in case color prop gets updated during runtime
        ...(isFocusable &&
          hoverMediaQuery({
            '&:hover': {
              background: backgroundHoverColor,
            },
          })),
      },
      '::slotted': addImportantToEachRule({
        '&(a),&(button)': {
          all: 'unset', // resets any ua-style + custom style set in light dom
          textDecoration: 'underline',
          cursor: 'pointer',
          font: 'inherit',
          color: 'inherit',
        },
        '&(a)::before,&(button)::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: `var(${legacyRadiusSmall}, ${radiusFull})`,
        },
        '&(a:focus-visible)::before,&(button:focus-visible)::before': getFocusBaseStyles(),
        '&(br)': {
          display: 'none',
        },
      }),
    },
    ...(hasIcon && {
      icon: {
        marginInlineStart: '-2px', // compensate white space of svg icon and optimize visual alignment
      },
    }),
  });
};
