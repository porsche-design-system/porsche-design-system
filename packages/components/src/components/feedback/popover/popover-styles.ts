import { addImportantToEachRule, buildHostStyles, getCss } from '../../../utils';
import type { Direction } from './popover-utils';
import type { JssStyle } from '../../../utils';

const getPopoverPosition = (direction: Direction): JssStyle => {
  switch (direction) {
    case 'top':
      return {
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'right':
      return {
        top: '50%',
        left: '2rem',
        transform: 'translateY(-50%)',
      };
    case 'bottom':
      return {
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'left':
      return {
        top: '50%',
        right: '2rem',
        transform: 'translateY(-50%)',
      };
  }
};

export const getComponentCss = (direction: Direction): string => {
  return getCss({
    ...buildHostStyles({
      verticalAlign: 'top',
      ...addImportantToEachRule({
        position: 'relative',
        display: 'inline-flex',
      }),
    }),
    popover: {
      position: 'absolute',
      zIndex: 99999,
      background: 'white',
      padding: '.5rem 1rem',
      boxShadow: '0 0 10px 0 rgba(0,0,0,1)',
      maxWidth: '90vw',
      ...getPopoverPosition(direction),
    },
  });
};
