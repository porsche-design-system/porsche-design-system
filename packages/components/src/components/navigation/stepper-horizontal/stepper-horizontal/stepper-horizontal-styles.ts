import { getCss } from '../../../../utils';
import { addImportantToEachRule } from '../../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        counterReset: 'count',
      }),
      '::slotted(*)': {
        padding: '0 .5em 0 .5em',
      },
      '::slotted(:last-child)': {
        padding: '0 0 0 .5em',
      },
      '::slotted(:first-child)': {
        padding: '0 .5em 0 0',
      },
    },
    'item-wrapper': {
      display: 'flex',
    },
  });
};
