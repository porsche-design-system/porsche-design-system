import { addImportantToEachRule, attachCss, buildHostStyles, getCss } from '../../../utils';
import { color } from '@porsche-design-system/utilities';

const transitionTimingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const getComponentCss = (open: boolean): string => {
  return getCss({
    ...buildHostStyles({
      ...addImportantToEachRule({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: '99999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        background: `${color.darkTheme.background.default}e6`, // e6 = 0.9 alpha
        transition: `opacity 0.2s ${transitionTimingFunction}`,
        opacity: 0,
        visibility: 'hidden',
        ...(open && {
          transition: `opacity 0.6s ${transitionTimingFunction}, visibility 0s linear`,
          opacity: 1,
          visibility: 'inherit',
        }),
      }),
      overflowY: 'auto',
    }),
    ...(open && {
      root: addImportantToEachRule({
        transform: 'scale3d(1, 1, 1)',
      }),
    }),
  });
};

export const addComponentCss = (host: HTMLElement, open: boolean): void => {
  attachCss(host, getComponentCss(open));
};
