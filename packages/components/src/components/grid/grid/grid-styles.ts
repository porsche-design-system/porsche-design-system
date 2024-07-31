import type { GridDirection, GridWrap } from './grid-utils';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';
import { gridGap } from '@porsche-design-system/styles';

const gutter = `calc(${gridGap} / -2)`;

export const getComponentCss = (
  direction: BreakpointCustomizable<GridDirection>,
  wrap: BreakpointCustomizable<GridWrap>
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'flex',
        ...addImportantToEachRule({
          flex: 'auto',
          width: 'auto',
          marginLeft: gutter,
          marginRight: gutter,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
          ...mergeDeep(
            buildResponsiveStyles(direction, (flexDirection: GridDirection) => ({ flexDirection })),
            buildResponsiveStyles(wrap, (flexWrap: GridWrap) => ({ flexWrap }))
          ),
        }),
      },
    },
  });
};
