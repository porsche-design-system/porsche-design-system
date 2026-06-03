import { colorPrimary, ref } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, getFocusBaseStyles, hostHiddenStyles } from '../../../styles';
import { getCss } from '../../../utils';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          color: ref(colorPrimary), // enables color inheritance for e.g. slotted anchor
          borderRadius: '2px',
          ...hostHiddenStyles,
          '&(:focus-visible)': getFocusBaseStyles(),
        }),
      },
    },
  });
};
