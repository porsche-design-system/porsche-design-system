import { getCss } from '../../../../utils';
import { addImportantToRule } from '../../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      '::slotted(*:not(:last-child))': {
        marginRight: addImportantToRule('1em'),
      },
    },
    'item-wrapper': {
      display: 'flex',
    },
  });
};
