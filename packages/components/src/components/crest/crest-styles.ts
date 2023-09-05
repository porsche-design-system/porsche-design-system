import { getCss } from '../../utils';
import { crestSize } from './crest-utils';
import { addImportantToEachRule, colorSchemeStyles, focusPseudoJssStyle, hostHiddenStyles } from '../../styles';

const { width, height } = crestSize;
const getDimensionStyle = {
  maxWidth: `${width}px`,
  maxHeight: `${height}px`,
  width: 'inherit',
  height: 'inherit',
} as const;

export const getComponentCss = (): string => {
  return getCss({
    '@global': {
      ':host': {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          outline: 0,
          boxSizing: 'content-box', // needed for correct height calculation when padding is set on host (e.g. custom click area)
          ...getDimensionStyle,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      a: {
        display: 'block',
        textDecoration: 'none',
        ...getDimensionStyle,
        ...focusPseudoJssStyle,
      },
      picture: {
        display: 'block',
        width: `min(${width}px, 100%)`,
        height: `min(${height}px, 100%)`,
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
