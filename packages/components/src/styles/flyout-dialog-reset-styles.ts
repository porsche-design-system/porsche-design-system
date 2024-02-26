import { JssStyle } from 'jss';

export const getFlyoutDialogResetJssStyle = (): JssStyle => {
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
