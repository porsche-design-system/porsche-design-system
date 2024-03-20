import { JssStyle } from 'jss';

export const getFlyoutDialogResetJssStyle = (): JssStyle => {
  return {
    position: 'fixed',
    height: '100dvh',
    maxHeight: '100dvh',
    margin: '0',
    padding: '0',
    border: '0',
    visibility: 'inherit',
    outline: '0',
  };
};
