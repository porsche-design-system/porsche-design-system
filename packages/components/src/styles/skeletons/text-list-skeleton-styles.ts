import { pxToRemWithUnit } from '../common-styles';
import { getWrapperSkeletonJssStyle } from './fieldset-wrapper-skeleton-styles';
import { Styles } from 'jss';

export const getTextListSkeletonStyles = (): Styles<'@global'> => {
  return {
    '@global': {
      'p-text-list': {
        '&:not(.hydrated)': {
          ...getWrapperSkeletonJssStyle(),
          marginTop: pxToRemWithUnit(6),
        },
      },
    },
  };
};
