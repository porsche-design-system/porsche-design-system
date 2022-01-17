import type { JssStyle } from '../utils';

export const getSlottedTypographyStyles = (): JssStyle => {
  return {
    margin: 'inherit',
    padding: 'inherit',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontStyle: 'normal',
    color: 'inherit',
    textAlign: 'inherit',
    overflowWrap: 'inherit',
    wordWrap: 'inherit',
    hyphens: 'inherit',
    whiteSpace: 'inherit',
  };
};

export const getEllipsisStyles = (): JssStyle => {
  return {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
};
