import type { CssStyle } from '../utils/css-serializer';

export const getBannerPopoverResetStyles = (): CssStyle => {
  return {
    position: 'fixed',
    margin: 0,
    padding: 0,
    inset: 'auto', // ua popover reset
    width: 'auto', // ua popover reset
    height: 'auto', // ua popover reset
    maxWidth: '100%', // If component is wrapped in container with maxWidth
    border: '0', // ua popover reset
    outline: '0', // ua popover reset
    overflow: 'visible', // ua popover reset
  };
};
