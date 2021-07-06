import type { JssStyle } from '../../../utils';
import {
  addImportantToEachRule,
  buildGlobalStyles,
  getCss,
  getFocusStyles,
  getHoverStyles,
  getTagName,
} from '../../../utils';

const slottedStyles: JssStyle = addImportantToEachRule({
  '& a': {
    color: 'inherit',
    textDecoration: 'underline',
    ...getFocusStyles({ offset: 1, color: 'currentColor' }),
    ...getHoverStyles(),
  },

  '& em, & i': {
    fontStyle: 'normal',
  },
});

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    buildGlobalStyles({
      [`${getTagName(host)} [slot="heading"]`]: slottedStyles,
    })
  );
};
