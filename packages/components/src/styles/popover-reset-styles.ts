import { JssStyle } from 'jss';

// Used for elements that must overflow `overflow:hidden` containers, are positioned absolute and wrapped within a native `popover` element.
export const getPopoverResetJssStyle = (): JssStyle => {
  return {
    position: 'absolute',
    border: 'none',
    background: 'none',
    pointerEvents: 'all',
    padding: 0,
    margin: 0,
    overflow: 'initial',
    '&:-internal-popover-in-top-layer::backdrop': {
      display: 'none',
    },
  };
};
