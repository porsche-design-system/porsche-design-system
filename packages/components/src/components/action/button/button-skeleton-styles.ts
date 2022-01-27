import { getCss, pxToRemWithUnit } from '../../../utils';

export const getButtonSkeletonStyles = (): string => {
  // const buttonProperties: (keyof Button)[] = ['hideLabel', 'theme'];

  return getCss({
    'p-button:not(hydrated)': {
      display: 'block',
      width: pxToRemWithUnit(300),
      background: '#5e0202',
      '&[hide-label="true"]': {
        width: pxToRemWithUnit(200),
      },
      '&[theme="dark"]': {
        background: '#fff',
      },
    },
  });
};
