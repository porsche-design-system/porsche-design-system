import { spacingStaticSmall } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';

export const getOptionsJssStyle = (scalingVar: string): JssStyle => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: `max(2px, ${scalingVar} * ${spacingStaticSmall})`,
  };
};
