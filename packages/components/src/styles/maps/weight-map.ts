import { fontWeightBold, fontWeightNormal, fontWeightSemibold, ref } from '@porsche-design-system/stylesheets';

export const weightMap = {
  regular: ref(fontWeightNormal), // deprecated
  'semi-bold': ref(fontWeightSemibold), // deprecated
  normal: ref(fontWeightNormal),
  semibold: ref(fontWeightSemibold),
  bold: ref(fontWeightBold),
} as const;
