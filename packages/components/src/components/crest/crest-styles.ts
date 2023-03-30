import { getCss } from '../../utils';
import { addImportantToEachRule, focusPseudoJssStyle, hostHiddenStyles } from '../../styles';

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
        ...focusPseudoJssStyle,
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
