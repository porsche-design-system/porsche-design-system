import { addImportantToEachRule, getFocusBaseStyles, hostHiddenStyles } from '../../../styles';
import { colorPrimary } from '../../../styles/css-variables';
import { getCss } from '../../../utils';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          color: colorPrimary, // enables color inheritance for e.g. slotted anchor
          borderRadius: '2px',
          ...hostHiddenStyles,
          '&(:focus-visible)': getFocusBaseStyles(),
        }),
      },
    },
  });
};
