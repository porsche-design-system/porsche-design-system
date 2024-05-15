import { JssStyle } from 'jss';

export const getBannerPopoverResetStyles = (): JssStyle => {
  return {
    position: 'fixed',
    margin: 0,
    padding: 0,
    width: 'auto', // ua popover reset
    height: 'auto', // ua popover reset
    maxWidth: '100%', // If component is wrapped in container with maxWidth
    border: '0', // ua popover reset
    outline: '0', // ua popover reset
    overflow: 'visible', // ua popover reset
  };
};
