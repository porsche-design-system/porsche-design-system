import type { Properties } from 'csstype';

const SPACINGS = [4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80] as const;
export type Spacing = (typeof SPACINGS)[number];

type Spacings = Partial<{
  spacingTop: Spacing;
  spacingLeft: Spacing;
  spacingRight: Spacing;
  spacingBottom: Spacing;
}>;

export const getPaddingStyles = (spacings: Spacings): Properties => {
  return Object.entries(spacings).reduce((result, [key, value]) => {
    if (value) {
      // @ts-ignore
      result[key.replace('spacing', 'padding') as keyof Properties] = `${value}px`;
    }
    return result;
  }, {} as Properties);
};
