import {
  addImportantToEachRule,
  attachCss,
  buildHostStyles,
  getCachedComponentCss,
  getCss,
  getTransition,
} from '../../../../utils';
import { color } from '@porsche-design-system/utilities';

export const getComponentCss = (): string => {
  return getCss(
    buildHostStyles(
      addImportantToEachRule({
        display: 'table-row',
        transition: getTransition('background-color'),
        '&(:hover)': {
          backgroundColor: color.background.surface,
        },
      })
    )
  );
};

export const addComponentCss = (host: HTMLElement): void => {
  attachCss(host, getCachedComponentCss(host, getComponentCss));
};
