import type { CssStyle } from '../../../utils/css-serializer';
import {
  addImportantToEachRule,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import {
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusSm,
  ref,
  spacingFluidSm,
  typescaleMd,
} from '@porsche-design-system/stylesheets';
import { getCss } from '../../../utils';
import { cssVarColorPrimary } from '../drilldown/drilldown-styles';

const anchorHoverCssStyle: CssStyle = {
  textDecorationColor: 'inherit',
};

export const getComponentCss = (hasSlottedAnchor: boolean, isActive: boolean): string => {
  const anchorCssStyle: CssStyle = {
    all: 'unset',
    padding: `calc(${ref(spacingFluidSm)} + 2px) calc(${ref(spacingFluidSm)} + 4px)`, // aligned with link-pure
    margin: `-2px calc(${ref(spacingFluidSm)} * -1 - 4px)`, // aligned with link-pure
    borderRadius: ref(radiusSm), // needed for focus outline
    font: `${ref(fontWeightNormal)} ${ref(typescaleMd)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
    color: ref(cssVarColorPrimary),
    textDecoration: 'underline',
    textDecorationColor: isActive ? 'inherit' : 'transparent',
    cursor: isActive ? 'default' : 'pointer',
    transition: getTransition('text-decoration-color'),
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      ...(hasSlottedAnchor
        ? {
            '::slotted': addImportantToEachRule({
              '&(a)': anchorCssStyle,
              ...hoverMediaQuery({
                '&(a:hover)': anchorHoverCssStyle,
              }),
              '&(a:focus-visible)': getFocusBaseStyles(),
            }),
          }
        : {
            a: {
              ...anchorCssStyle,
              ...hoverMediaQuery({
                '&:hover': anchorHoverCssStyle,
              }),
              '&:focus-visible': getFocusBaseStyles(),
            },
          }),
    },
  });
};
