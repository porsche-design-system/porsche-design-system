import { addImportantToEachRule, buildHostStyles, getCss } from '../../../utils';
import { HorizontalDirection, VerticalDirection } from './popover-utils';

const getFlyoutPosition = (x: HorizontalDirection, y: VerticalDirection) => {
  const direction = x + y;

  switch (direction) {
    case 'rightbottom':
      return {
        top: 0,
        left: '2rem',
      };
    case 'rightcenter':
      return {
        top: '50%',
        left: '2rem',
        transform: 'translateY(-50%)',
      };
    case 'righttop':
      return {
        bottom: 0,
        left: '2rem',
      };
    case 'centerbottom':
    case 'centercenter':
      return {
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'centertop':
      return {
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'leftbottom':
      return {
        top: 0,
        right: '2rem',
      };
    case 'leftcenter':
      return {
        top: '50%',
        right: '2rem',
        transform: 'translateY(-50%)',
      };
    case 'lefttop':
      return {
        bottom: 0,
        right: '2rem',
      };
  }
};

export const getComponentCss = (directionX, directionY): string => {
  return getCss({
    ...buildHostStyles(
      addImportantToEachRule({
        position: 'relative',
        display: 'inline-block',
        background: 'deepskyblue',
      })
    ),
    flyout: {
      position: 'absolute',
      padding: '.5rem 1rem',
      boxShadow: '0 0 10px 0 rgba(0,0,0,1)',
      ...getFlyoutPosition(directionX, directionY),
    },
  });
};
