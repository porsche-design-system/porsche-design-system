import { addImportantToEachRule, colors, getFocusJssStyle, hostHiddenStyles } from '../../../styles';
import { getCss } from '../../../utils';

const { primaryColor } = colors;

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          color: primaryColor, // enables color inheritance for e.g. slotted anchor
          borderRadius: '2px',
          ...hostHiddenStyles,
          ...getFocusJssStyle({ slotted: true }),
        }),
      },
    },
  });
};
