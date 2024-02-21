import type { Styles } from 'jss';

export const getFlyoutDialogResetStyles = (): Styles => {
  return {
    position: 'fixed',
    height: '100vh',
    maxHeight: '100vh',
    margin: '0',
    padding: '0',
    border: '0',
    visibility: 'inherit',
    outline: '0',
  };
};
