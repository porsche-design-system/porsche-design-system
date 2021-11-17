import { addImportantToEachRule, buildHostStyles, getCss, mediaQuery, pxToRemWithUnit } from '../../../utils';
import type { PopoverDirection } from './popover-utils';
import type { JssStyle } from '../../../utils';

const arrowSize = 1;
const boxShadow = '0 0 1rem 0 rgba(0,0,0,.2)';

const getPopoverPosition = (direction: PopoverDirection): JssStyle => {
  switch (direction) {
    case 'top':
      return {
        bottom: '2.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'right':
      return {
        top: '50%',
        left: '2.25rem',
        transform: 'translateY(-50%)',
      };
    case 'bottom':
      return {
        top: '2.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'left':
      return {
        top: '50%',
        right: '2.25rem',
        transform: 'translateY(-50%)',
      };
  }
};

const getArrowPosition = (direction: PopoverDirection): JssStyle => {
  const mainAxis = `-${arrowSize / 2}rem`;
  const crossAxis = `calc(50% - ${arrowSize / 2}rem)`;

  switch (direction) {
    case 'top':
      return {
        bottom: mainAxis,
        left: crossAxis,
      };
    case 'right':
      return {
        left: mainAxis,
        top: crossAxis,
      };
    case 'bottom':
      return {
        top: mainAxis,
        left: crossAxis,
      };
    case 'left':
      return {
        right: mainAxis,
        top: crossAxis,
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
    popover: {
      position: 'absolute',
      zIndex: 99999,
      boxShadow,
      maxWidth: '90vw',
      width: 'max-content',
      ...getPopoverPosition(direction),
      [mediaQueryXS]: {
        maxWidth: pxToRemWithUnit(432),
      },
    },
    arrow: {
      content: '""',
      width: `${arrowSize}rem`,
      height: `${arrowSize}rem`,
      position: 'absolute',
      background: 'white',
      transform: 'rotate(45deg)',
      boxShadow,
      ...getArrowPosition(direction),
    },
    content: {
      position: 'relative',
      background: 'white',
      padding: '.5rem 1rem',
    },
  });
};
