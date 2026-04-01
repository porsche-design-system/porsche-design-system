import { spacingStaticXs } from '@porsche-design-system/tokens';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  blurFrosted,
  colorCanvas,
  colorContrastHigh,
  colorError,
  colorErrorMedium,
  colorFrosted,
  colorFrostedStrong,
  colorInfo,
  colorInfoMedium,
  colorPrimary,
  colorSuccess,
  colorSuccessMedium,
  colorWarning,
  colorWarningMedium,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  legacyRadiusSmall,
  radiusFull,
  typescaleXs,
} from '../../styles/css-variables';
import { getCss } from '../../utils';
import type { TagVariant } from './tag-utils';

const colorTextMap: Record<TagVariant, string> = {
  primary: colorCanvas,
  secondary: colorPrimary,
  info: colorCanvas,
  success: colorCanvas,
  warning: colorCanvas,
  error: colorCanvas,
};

const colorBackgroundMap: Record<TagVariant, string> = {
  primary: colorPrimary,
  secondary: colorFrostedStrong,
  info: colorInfo,
  success: colorSuccess,
  warning: colorWarning,
  error: colorError,
};

const colorBackgroundHoverMap: Record<TagVariant, string> = {
  primary: colorContrastHigh,
  secondary: colorFrosted,
  info: colorInfoMedium,
  success: colorSuccessMedium,
  warning: colorWarningMedium,
  error: colorErrorMedium,
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
        padding: compact ? '1px 6px' : `${spacingStaticXs} 9px`,
        borderRadius: `var(${legacyRadiusSmall}, calc(${compact ? '1px' : spacingStaticXs} + (${leadingNormal} / 2)))`, // ensures pill shape has a maximum border radius to support multiline.
        font: `${fontWeightNormal} ${typescaleXs} / ${leadingNormal} ${fontPorscheNext}`,
        ...(variant === 'secondary' && {
          WebkitBackdropFilter: blurFrosted,
          backdropFilter: blurFrosted,
        }),
        color: textColor,
        background: backgroundColor,
        transition: `${getTransition('color')}, ${getTransition('background-color')}, ${getTransition('backdrop-filter')}`, // transition style should always be applied to have a smooth color change in case color prop gets updated during runtime
        ...(isFocusable &&
          hoverMediaQuery({
            '&:hover': {
              background: backgroundHoverColor,
            },
          })),
        ...forcedColorsMediaQuery({
          outline: '2px solid CanvasText',
          outlineOffset: '-2px',
          backgroundColor: 'Canvas',
          color: 'CanvasText',
        }),
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
