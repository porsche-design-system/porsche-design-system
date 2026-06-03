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
  ref,
  typescaleSm,
  typescaleXs,
} from '@porsche-design-system/stylesheets';
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
import { getCss } from '../../utils';

export const cssVarInternalTagDismissibleScaling = '--_p-tag-dismissible-a';

export const getComponentCss = (hasLabel: boolean, isCompact: boolean): string => {
  const buttonPaddingBlock = hasLabel
    ? `calc(16.8px * (${ref(cssVarInternalTagDismissibleScaling)} - 0.64285714))`
    : `calc(28px * (${ref(cssVarInternalTagDismissibleScaling)} - 0.64285714) + 6px)`;
  const buttonPaddingInline = `calc(22.4px * (${ref(cssVarInternalTagDismissibleScaling)} - 0.64285714) + 4px)`;
  const buttonGap = `calc(22.4px * (${ref(cssVarInternalTagDismissibleScaling)} - 0.64285714) + 4px)`;
  const iconPadding = `calc(11.2px * (${ref(cssVarInternalTagDismissibleScaling)} - 0.64285714))`;
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
        borderRadius: ref(legacyRadiusSmall, isCompact ? ref(radiusLg) : ref(radiusXl)),
        cursor: 'pointer',
        background: ref(colorFrosted),
        color: ref(colorPrimary),
        textAlign: 'start',
        font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
        ...hoverMediaQuery({
          '&:hover > .icon': {
            backgroundColor: ref(colorFrosted),
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
        color: ref(colorContrastHigh),
        fontSize: ref(typescaleXs),
      },
    }),
    icon: {
      padding: iconPadding,
      margin: iconMargin,
      transition: getTransition('background-color'),
      borderRadius: ref(legacyRadiusSmall, ref(radiusFull)),
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
