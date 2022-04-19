import { Properties } from 'csstype';

const SPACING = [4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80] as const;
export type Spacing = typeof SPACING[number];

type GetPaddingStylesOpts = {
  spacingTop: Spacing;
  spacingLeft: Spacing;
  spacingRight: Spacing;
  spacingBottom: Spacing;
};

export const getPaddingStyles = (spacings: GetPaddingStylesOpts): Properties => {
  return Object.entries(spacings).reduce((result, [key, value]) => {
    result[key.replace('spacing', 'padding')] = value && `${value}px`;
    return result;
  }, {} as Properties);
};
