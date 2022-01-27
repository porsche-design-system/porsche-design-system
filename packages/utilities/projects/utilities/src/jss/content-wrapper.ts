import type { JssStyle } from 'jss';
import { mediaQueryMin } from './media-query';

type ContentWrapperWidth = 'basic' | 'extended' | 'fluid';

const widthMap: { [key in ContentWrapperWidth]?: JssStyle } = {
  basic: {
    maxWidth: '96rem',
    padding: '0 7vw',
    [mediaQueryMin('xl')]: {
      padding: '0 10vw',
    },
    [mediaQueryMin('xxl')]: {
      padding: '0 12rem',
    },
  },
  extended: {
    maxWidth: '120rem',
  },
};

export const getContentWrapperJssStyle = (width: ContentWrapperWidth): JssStyle => {
  return {
    margin: '0 auto',
    width: '100%',
    minWidth: 0, // to handle automatic minimum size, in case it's used within flex mode
    ...widthMap[width],
  };
};
