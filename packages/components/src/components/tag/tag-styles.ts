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
  colorErrorFrosted,
  colorErrorFrostedSoft,
  colorErrorMedium,
  colorFrosted,
  colorFrostedStrong,
  colorInfo,
  colorInfoFrosted,
  colorInfoFrostedSoft,
  colorInfoMedium,
  colorPrimary,
  colorSuccess,
  colorSuccessFrosted,
  colorSuccessFrostedSoft,
  colorSuccessMedium,
  colorWarning,
  colorWarningFrosted,
  colorWarningFrostedSoft,
  colorWarningMedium,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  ref,
  spacingStatic2Xs,
  spacingStaticSm,
  typescaleXs,
} from '@porsche-design-system/stylesheets';
import { getCss } from '../../utils';
import type { TagVariant } from './tag-utils';

const colorTextMap: Record<TagVariant, string> = {
  primary: ref(colorCanvas),
  secondary: ref(colorPrimary),
  info: ref(colorCanvas),
  'info-frosted': ref(colorPrimary),
  success: ref(colorCanvas),
  'success-frosted': ref(colorPrimary),
  warning: ref(colorCanvas),
  'warning-frosted': ref(colorPrimary),
  error: ref(colorCanvas),
  'error-frosted': ref(colorPrimary),
};

const colorBackgroundMap: Record<TagVariant, string> = {
  primary: ref(colorPrimary),
  secondary: ref(colorFrostedStrong),
  info: ref(colorInfo),
  'info-frosted': ref(colorInfoFrosted),
  success: ref(colorSuccess),
  'success-frosted': ref(colorSuccessFrosted),
  warning: ref(colorWarning),
  'warning-frosted': ref(colorWarningFrosted),
  error: ref(colorError),
  'error-frosted': ref(colorErrorFrosted),
};

const colorBackgroundHoverMap: Record<TagVariant, string> = {
  primary: ref(colorContrastHigh),
  secondary: ref(colorFrosted),
  info: ref(colorInfoMedium),
  'info-frosted': ref(colorInfoFrostedSoft),
  success: ref(colorSuccessMedium),
  'success-frosted': ref(colorSuccessFrostedSoft),
  warning: ref(colorWarningMedium),
  'warning-frosted': ref(colorWarningFrostedSoft),
  error: ref(colorErrorMedium),
  'error-frosted': ref(colorErrorFrostedSoft),
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
        padding: compact
          ? `${ref(spacingStatic2Xs)} ${ref(spacingStaticSm)}`
          : `${spacingStaticXs} calc(12 * ${ref(spacingStatic2Xs)})`,
        borderRadius: `calc(${compact ? '1px' : spacingStaticXs} + (${ref(leadingNormal)} / 2))`, // ensures pill shape has a maximum border radius to support multiline.
        font: `${ref(fontWeightNormal)} ${ref(typescaleXs)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        ...((variant === 'secondary' ||
          variant === 'info-frosted' ||
          variant === 'success-frosted' ||
          variant === 'warning-frosted' ||
          variant === 'error-frosted') && {
          WebkitBackdropFilter: ref(blurFrosted),
          backdropFilter: ref(blurFrosted),
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
          borderRadius: ref(radiusFull),
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
