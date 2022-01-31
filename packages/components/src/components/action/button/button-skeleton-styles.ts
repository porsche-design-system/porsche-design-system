import { getCss } from '../../../utils/jss';
import { pxToRemWithUnit } from '../../../styles';
export const getButtonSkeletonStyles = (): string => {
  // const buttonProperties: (keyof Button)[] = ['hideLabel', 'theme'];
  // TODO: prefixing

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
