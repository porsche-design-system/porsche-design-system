import { addImportantToEachRule, buildHostStyles, getCss, getInset } from '../../../utils';
import { color } from '@porsche-design-system/utilities';

const transitionTimingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const getComponentCss = (open: boolean): string => {
  return getCss({
    ...buildHostStyles({
      ...addImportantToEachRule({
        position: 'fixed',
        ...getInset(),
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        transition: `opacity 0.2s ${transitionTimingFunction}`,
        opacity: 0,
        visibility: 'hidden',
        ...(open && {
          transition: `opacity 0.6s ${transitionTimingFunction}, visibility 0s linear`,
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
    root: addImportantToEachRule({
      transform: 'scale3d(1,1,1)',
    }),
  });
};
