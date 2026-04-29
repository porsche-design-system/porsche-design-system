import type { JssStyle } from 'jss';

export const getOptionsJssStyle = (scalingVarName: string): JssStyle => {
  const gap = `calc(11.2px * (var(${scalingVarName}) - 0.64285714) + 4px)`;

  return {
    display: 'flex',
    flexDirection: 'column',
    gap,
  };
};
