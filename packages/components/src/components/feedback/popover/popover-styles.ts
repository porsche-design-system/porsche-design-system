import { addImportantToEachRule, buildHostStyles, getCss, mediaQuery, pxToRemWithUnit } from '../../../utils';
import type { PopoverDirection } from './popover-utils';
import type { JssStyle } from '../../../utils';

const getPopoverPosition = (direction: PopoverDirection): JssStyle => {
  switch (direction) {
    case 'top':
      return {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'right':
      return {
        top: '50%',
        left: '100%',
        transform: 'translateY(-50%)',
      };
    case 'bottom':
      return {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'left':
      return {
        top: '50%',
        right: '100%',
        transform: 'translateY(-50%)',
      };
  }
};

const getArrowPosition = (direction: PopoverDirection): JssStyle => {
  switch (direction) {
    case 'top':
      return {
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: 'solid .75rem transparent',
        borderRight: 'solid .75rem transparent',
        borderTop: 'solid .75rem white',
      };
    case 'right':
      return {
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: 'solid .75rem transparent',
        borderBottom: 'solid .75rem transparent',
        borderRight: 'solid .75rem white',
      };
    case 'bottom':
      return {
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: 'solid .75rem transparent',
        borderRight: 'solid .75rem transparent',
        borderBottom: 'solid .75rem white',
      };
    case 'left':
      return {
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: 'solid .75rem transparent',
        borderBottom: 'solid .75rem transparent',
        borderLeft: 'solid .75rem white',
      };
  }
};

const mediaQueryXS = mediaQuery('xs');
export const getComponentCss = (direction: PopoverDirection): string => {
  return getCss({
    ...buildHostStyles({
      verticalAlign: 'top',
      ...addImportantToEachRule({
        position: 'relative',
        display: 'inline-block',
      }),
    }),
    spacer: {
      position: 'absolute',
      top: '-1rem',
      left: '-1rem',
      right: '-1rem',
      bottom: '-1rem',
      filter: 'drop-shadow(0 0 1rem rgba(0,0,0,.3))',
      background: 'rgba(255,0,0,0.2)',
      pointerEvents: 'none',
      '&::before': {
        content: '""',
        width: 0,
        height: 0,
        position: 'absolute',
        ...getArrowPosition(direction),
      },
    },
    popover: {
      position: 'absolute',
      zIndex: 99999,
      maxWidth: '90vw',
      width: 'max-content',
      boxSizing: 'border-box',
      background: 'white',
      padding: '.5rem 1rem',
      pointerEvents: 'auto',
      ...getPopoverPosition(direction),
      [mediaQueryXS]: {
        maxWidth: pxToRemWithUnit(432),
      },
    },
  });
};
