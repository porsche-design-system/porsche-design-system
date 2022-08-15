import { getCss } from '../../../../utils';
import { addImportantToEachRule, addImportantToRule, pxToRemWithUnit } from '../../../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          height: pxToRemWithUnit(32),
        }),
      },
      '::slotted(*:not(:last-child))': {
        marginRight: addImportantToRule('1em'),
      },
    },
    'item-wrapper': {
      display: 'flex',
    },
  });
};
