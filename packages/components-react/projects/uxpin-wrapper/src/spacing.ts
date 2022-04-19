export const SPACING = [4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80] as const;
export type Spacing = typeof SPACING[number];

type MapSpacingToPaddingOpts = {
  spacingTop?: Spacing;
  spacingLeft?: Spacing;
  spacingRight?: Spacing;
  spacingBottom?: Spacing;
};

export const mapSpacingToPadding = (
  props: MapSpacingToPaddingOpts
): { paddingTop: Spacing; paddingLeft: Spacing; paddingRight: Spacing; paddingBottom: Spacing } => {
  const { spacingTop, spacingLeft, spacingRight, spacingBottom } = props;

  return {
    paddingTop: spacingTop,
    paddingLeft: spacingLeft,
    paddingRight: spacingRight,
    paddingBottom: spacingBottom,
  };
};
