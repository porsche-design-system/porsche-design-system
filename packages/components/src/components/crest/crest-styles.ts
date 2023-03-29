import { getCss } from '../../utils';
import { addImportantToEachRule, getFocusJssStyle, getThemedColors, hostHiddenStyles } from '../../styles';

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          outline: 0,
          ...hostHiddenStyles,
        }),
      },
      a: {
        display: 'block',
        textDecoration: 'none',
        ...getFocusJssStyle({
          color: getThemedColors('light').primaryColor,
          offset: 0,
          pseudo: '::before',
        }),
      },
      picture: {
        display: 'block',
        width: '30px',
        height: '40px',
      },
      img: {
        display: 'block',
        width: '100%',
        height: 'auto',
      },
    },
  });
};
