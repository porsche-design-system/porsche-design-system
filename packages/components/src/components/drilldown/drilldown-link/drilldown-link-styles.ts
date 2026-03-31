import type { JssStyle } from 'jss';
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
  legacyRadiusSmall,
  radiusSm,
  spacingFluidSm,
  typescaleMd,
} from '../../../styles/css-variables';
import { getCss } from '../../../utils';
import { cssVarColorPrimary } from '../drilldown/drilldown-styles';

const anchorHoverJssStyle: JssStyle = {
  textDecorationColor: 'inherit',
};

export const getComponentCss = (hasSlottedAnchor: boolean, isActive: boolean): string => {
  const anchorJssStyle: JssStyle = {
    all: 'unset',
    padding: `calc(${spacingFluidSm} + 2px) calc(${spacingFluidSm} + 4px)`, // aligned with link-pure
    margin: `-2px calc(${spacingFluidSm} * -1 - 4px)`, // aligned with link-pure
    borderRadius: `var(${legacyRadiusSmall}, ${radiusSm})`, // needed for focus outline
    font: `${fontWeightNormal} ${typescaleMd} / ${leadingNormal} ${fontPorscheNext}`,
    color: `var(${cssVarColorPrimary})`,
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
              '&(a)': anchorJssStyle,
              ...hoverMediaQuery({
                '&(a:hover)': anchorHoverJssStyle,
              }),
              '&(a:focus-visible)': getFocusBaseStyles(),
            }),
          }
        : {
            a: {
              ...anchorJssStyle,
              ...hoverMediaQuery({
                '&:hover': anchorHoverJssStyle,
              }),
              '&:focus-visible': getFocusBaseStyles(),
            },
          }),
    },
  });
};
