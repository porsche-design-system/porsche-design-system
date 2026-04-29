import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  colorContrastHigh,
  colorFrosted,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  legacyRadiusSmall,
  radiusFull,
  radiusLg,
  radiusXl,
  typescaleSm,
  typescaleXs,
} from '../../styles/css-variables';
import { getCss } from '../../utils';

export const cssVarInternalTagDismissibleScaling = '--_p-tag-dismissible-a';

export const getComponentCss = (hasLabel: boolean, isCompact: boolean): string => {
  const buttonPaddingBlock = hasLabel
    ? `calc(16.8px * (var(${cssVarInternalTagDismissibleScaling}) - 0.64285714))`
    : `calc(28px * (var(${cssVarInternalTagDismissibleScaling}) - 0.64285714) + 6px)`;
  const buttonPaddingInline = `calc(22.4px * (var(${cssVarInternalTagDismissibleScaling}) - 0.64285714) + 4px)`;
  const buttonGap = `calc(22.4px * (var(${cssVarInternalTagDismissibleScaling}) - 0.64285714) + 4px)`;
  const iconPadding = `calc(11.2px * (var(${cssVarInternalTagDismissibleScaling}) - 0.64285714))`;
  const iconMargin = `calc(-1 * ${iconPadding})`;

  return getCss({
    '@global': {
      ':host': {
        [`${cssVarInternalTagDismissibleScaling}`]: isCompact ? 0.64285714 : 1,
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      button: {
        all: 'unset',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        gap: buttonGap,
        padding: `${buttonPaddingBlock} ${buttonPaddingInline}`,
        borderRadius: `var(${legacyRadiusSmall}, ${isCompact ? radiusLg : radiusXl})`,
        cursor: 'pointer',
        background: colorFrosted,
        color: colorPrimary,
        textAlign: 'start',
        font: `${fontWeightNormal} ${typescaleSm} / ${leadingNormal} ${fontPorscheNext}`,
        ...hoverMediaQuery({
          '&:hover > .icon': {
            backgroundColor: colorFrosted,
          },
        }),
        ...forcedColorsMediaQuery({
          outline: '2px solid CanvasText',
          outlineOffset: '-2px',
        }),
        '&:focus-visible': getFocusBaseStyles(),
      },
    },
    ...(hasLabel && {
      label: {
        display: 'block',
        marginBottom: '-4px',
        color: colorContrastHigh,
        fontSize: typescaleXs,
      },
    }),
    icon: {
      padding: iconPadding,
      margin: iconMargin,
      transition: getTransition('background-color'),
      borderRadius: `var(${legacyRadiusSmall}, ${radiusFull})`,
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
