import { pxToRemWithUnit } from '../../../styles';
import { getMinifiedStyles } from '../../../../../shared/src/styles/getMinifiedStyles';
import type { Theme } from '@porsche-design-system/utilities-v2';

export const getButtonSkeletonStyles = (prefix?: string, theme?: Theme): string => {
  // const buttonProperties: (keyof Button)[] = ['hideLabel', 'theme'];

  return getMinifiedStyles({
    [`${prefix ? prefix : ''}p-button:not(hydrated)`]: {
      display: 'block',
      width: pxToRemWithUnit(300),
      background: theme === 'light' ? '#5e0202' : '#fff',
    },
  });
};
