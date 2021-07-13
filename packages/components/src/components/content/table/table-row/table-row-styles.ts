import {
  addImportantToEachRule,
  attachCss,
  buildHostStyles,
  getCss,
  transitionDuration,
  transitionTimingFunction,
} from '../../../../utils';
import { color } from '@porsche-design-system/utilities';

export const getComponentCss = (): string => {
  return getCss(
    buildHostStyles(
      addImportantToEachRule({
        display: 'table-row',
        transition: `background-color ${transitionDuration} ${transitionTimingFunction}`,
        '&(:hover)': {
          backgroundColor: color.background.surface,
        },
      })
    )
  );
};

export const addComponentCss = (host: HTMLElement): void => {
  attachCss(host, getComponentCss());
};
