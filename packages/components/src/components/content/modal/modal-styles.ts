import { addImportantToEachRule, buildHostStyles, getCss, getInset } from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import { MODAL_Z_INDEX } from '../../../constants';

const transitionTimingFunction = 'cubic-bezier(.16,1,.3,1)';

export const getComponentCss = (open: boolean): string => {
  return getCss({
    ...buildHostStyles({
      ...addImportantToEachRule({
        position: 'fixed',
        ...getInset(),
        zIndex: MODAL_Z_INDEX,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        transition: `opacity .2s ${transitionTimingFunction}, visibility 0s linear .2s`,
        opacity: 0,
        visibility: 'hidden',
        ...(open && {
          transition: `opacity .6s ${transitionTimingFunction}`,
          opacity: 1,
          visibility: 'inherit',
        }),
      }),
      overflowY: 'auto', // overrideable
      // workaround via pseudo element to fix stacking (black) background in safari
      '&::before': addImportantToEachRule({
        content: '""',
        position: 'fixed',
        ...getInset(),
        background: `${color.darkTheme.background.default}e6`, // e6 = 0.9 alpha
      }),
    }),
    root: {
      position: 'relative',
      transition: `transform .6s ${transitionTimingFunction}`,
      transform: open ? 'scale3d(1,1,1)' : 'scale3d(.9,.9,1)',
    },
  });
};
