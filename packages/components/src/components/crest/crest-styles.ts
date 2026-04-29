import { addImportantToEachRule, getFocusBaseStyles, hostHiddenStyles } from '../../styles';
import { getCss } from '../../utils';
import { crestSize } from './crest-utils';

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
          boxSizing: 'content-box', // needed for correct height calculation when padding is set on host (e.g. custom click area)
          ...getDimensionStyle,
          ...hostHiddenStyles,
        }),
      },
      a: {
        all: 'unset',
        cursor: 'pointer',
        '&::before': {
          // needs to be defined always to have correct custom click area
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '1px',
        },
        '&:focus-visible::before': getFocusBaseStyles(),
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
