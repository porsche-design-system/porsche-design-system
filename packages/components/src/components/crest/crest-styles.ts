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
          height: 'inherit', // width: 'inherit'; is not needed since host is an inline-block element
          ...hostHiddenStyles,
        }),
      },
      a: {
        display: 'block',
        height: 'inherit', // width: 'inherit'; is not needed since host is an inline-block element
        textDecoration: 'none',
        ...focusPseudoJssStyle,
      },
      picture: {
        display: 'block',
        width: 'min(30px, 100%)',
        height: 'min(40px, 100%)',
      },
      img: {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
      },
    },
  });
};
