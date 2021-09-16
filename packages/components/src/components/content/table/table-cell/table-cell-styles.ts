import {
  addImportantToEachRule,
  attachCss,
  buildHostStyles,
  getCachedComponentCss,
  getCss,
  pxToRemWithUnit,
} from '../../../../utils';
import { color } from '@porsche-design-system/utilities';

export const getComponentCss = (multiline: boolean): string => {
  return getCss(
    buildHostStyles(
      addImportantToEachRule({
        display: 'table-cell',
        padding: pxToRemWithUnit(12),
        margin: 0,
        verticalAlign: 'middle',
        borderBottom: `1px solid ${color.neutralContrast.low}`,
        whiteSpace: multiline ? 'normal' : 'nowrap',
      })
    )
  );
};

export const addComponentCss = (host: HTMLElement, multiline: boolean): void => {
  attachCss(host, getCachedComponentCss(host, getComponentCss, multiline));
};
