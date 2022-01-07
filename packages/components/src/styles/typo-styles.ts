import { JssStyle } from '../utils';

export const getDefaultSlottedTypoStyles = (): JssStyle => {
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

export const getDefaultEllipsisStyles = (): JssStyle => {
  return {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
};
