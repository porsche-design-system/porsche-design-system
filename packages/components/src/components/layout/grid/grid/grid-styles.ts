import type { JssStyle } from 'jss';
import type {
  GridDirection,
  GridDirectionType,
  GridGutter,
  GridGutterType,
  GridWrap,
  GridWrapType,
} from './grid-utils';
import type { GetJssStyleFunction } from '../../../../utils';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../../../utils';
import { addImportantToEachRule, pxToRemWithUnit } from '../../../../styles';

const getGutterJssStyle: GetJssStyleFunction = (gutter: GridGutterType): JssStyle => {
  const gutterRem = `-${pxToRemWithUnit(gutter / 2)}`;

  return {
    marginLeft: gutterRem,
    marginRight: gutterRem,
  };
};

export const getComponentCss = (direction: GridDirection, wrap: GridWrap, gutter: GridGutter): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'flex',
        flex: 'auto',
        width: 'auto',
        ...mergeDeep(
          buildResponsiveStyles(direction, (flexDirection: GridDirectionType) => ({ flexDirection })),
          buildResponsiveStyles(wrap, (flexWrap: GridWrapType) => ({ flexWrap })),
          buildResponsiveStyles(gutter, getGutterJssStyle)
        ),
      }),
    },
  });
};
