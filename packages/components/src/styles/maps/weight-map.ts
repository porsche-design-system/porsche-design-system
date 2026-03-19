import { fontWeightBold, fontWeightNormal, fontWeightSemibold } from '../css-variables';

export const weightMap = {
  regular: fontWeightNormal, // deprecated
  'semi-bold': fontWeightSemibold, // deprecated
  normal: fontWeightNormal,
  semibold: fontWeightSemibold,
  bold: fontWeightBold,
} as const;
