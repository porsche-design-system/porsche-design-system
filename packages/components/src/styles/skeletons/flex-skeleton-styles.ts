import { getMinifiedStyles } from '@porsche-design-system/shared-src/src/styles/getMinifiedStyles';

export const getFlexSkeletonStyles = (): string => {
  return getMinifiedStyles({
    '@global': {
      'p-flex': {
        '&:not(.hydrated)': {
          display: 'flex',
          flexWrap: 'nowrap',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          alignContent: 'stretch',
        },
      },
      'p-flex-item': {
        '&:not(.hydrated)': {
          boxSizing: 'border-box',
          width: 'auto',
          marginLeft: 0,
          alignSelf: 'auto',
          flexGrow: 0,
          flexShrink: 1,
          flex: 'initial',
        },
      },
    },
  });
};
