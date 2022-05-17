import { getCss } from '../../../../utils';
import { addImportantToEachRule } from '../../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        counterReset: 'count',
      }),
      '::slotted(*:not(:last-child))': {
        marginRight: '1em',
      },
    },
    scroller: {
      display: 'flex',
    },
  });
};
