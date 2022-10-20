import type { JssStyle, Styles } from 'jss';

export const getFieldsetWrapperSkeletonStyles = (): Styles<'@global'> => {
  return {
    '@global': {
      'p-fieldset-wrapper': {
        '&:not(.hydrated)': getWrapperSkeletonJssStyle(),
      },
    },
  };
};

export const getWrapperSkeletonJssStyle = (): JssStyle => ({
  visibility: 'visible',
});
