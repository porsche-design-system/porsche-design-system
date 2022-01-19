import type { JssStyle } from 'jss';

// Screen reader only styles to hide (text-)contents visually in the browser but grant access for screen readers
export const getScreenReaderOnlyJssStyle = (): JssStyle => {
  return {
    position: 'absolute',
    height: '1px',
    width: '1px',
    border: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(1px,1px,1px,1px)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  };
};
