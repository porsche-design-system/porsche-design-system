import {
  borderRadiusLarge,
  borderRadiusSmall,
  displayLargeStyle,
  getMediaQueryMax,
  getMediaQueryMin,
  gridBasicColumnEnd,
  gridBasicColumnStart,
  gridBasicSpanOneHalf,
  gridBasicSpanOneThird,
  gridBasicSpanTwoThirds,
  gridExtendedColumnEnd,
  gridExtendedColumnStart,
  gridExtendedSpanOneHalf,
  gridFullColumnEnd,
  gridFullColumnStart,
  gridGap,
  gridNarrowColumnEnd,
  gridNarrowColumnStart,
  gridNarrowSpanOneHalf,
  gridStyle,
  gridWideColumnEnd,
  gridWideColumnStart,
  headingLargeStyle,
  headingXLargeStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXSmall,
  spacingStaticSmall,
  spacingStaticXSmall,
  textLargeStyle,
  textSmallStyle,
  textXSmallStyle,
  themeLightPrimary,
  themeLightStateHover,
} from '@porsche-design-system/components-vue/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const VisualizeGrid = style({
  ...gridStyle,
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
});

export const VisualizeGridColumns = style({
  background: 'rgba(0, 0, 255, 0.1)',
  selectors: {
    '&:first-child,&:last-child': {
      background: 'rgba(125, 0, 255, 0.1)',
    },
  },
  '@media': {
    [getMediaQueryMax('s')]: {
      selectors: {
        '&:nth-child(8)': {
          background: 'rgba(125, 0, 255, 0.1)',
        },
        '&:nth-child(n+9)': {
          display: 'none',
        },
      },
    },
  },
});

// Tile
type Color = 'blue' | 'green' | 'purple' | 'yellow' | 'orange';
const getTileStyle = (color: Color, padding: 'medium' | 'small' | false = 'medium', borderRadius: boolean = true) => {
  const opacity = 0.25;
  const colorMap: { [key in Color]: string } = {
    blue: `rgba(0, 0, 255, ${opacity})`,
    green: `rgba(0, 255, 0, ${opacity})`,
    purple: `rgba(255, 0, 255, ${opacity})`,
    yellow: `rgba(255, 255, 0, ${opacity})`,
    orange: `rgba(255, 125, 0, ${opacity})`,
  };
  return {
    padding: padding === 'medium' ? spacingFluidMedium : padding === 'small' ? spacingFluidSmall : 0,
    borderRadius: borderRadius ? borderRadiusLarge : 0,
    background: colorMap[color],
  } as const;
};

export const Info = style({
  ...textXSmallStyle,
  display: 'inline-block',
  verticalAlign: 'top',
  color: themeLightPrimary,
  borderRadius: borderRadiusSmall,
  marginBottom: spacingFluidSmall,
  padding: `${spacingStaticXSmall} ${spacingStaticSmall}`,
  background: themeLightStateHover,
});

export const Display = style({
  ...displayLargeStyle,
  color: themeLightPrimary,
  margin: 0,
});

export const Heading = style({
  ...headingLargeStyle,
  color: themeLightPrimary,
  margin: 0,
});

export const HeadingXLarge = style({
  ...headingXLargeStyle,
  color: themeLightPrimary,
  margin: 0,
});

export const Text = style({
  ...textSmallStyle,
  color: themeLightPrimary,
  margin: `${spacingFluidXSmall} 0 0`,
});

export const TextLarge = style({
  ...textLargeStyle,
  color: themeLightPrimary,
  margin: `${spacingFluidXSmall} 0 0`,
});

export const HeroGrid = style({
  ...gridStyle,
  alignItems: 'end',
});

export const HeroMedia = style({
  ...getTileStyle('blue', false, false),
  gridColumn: `${gridFullColumnStart} / ${gridFullColumnEnd}`,
  gridRow: 1,
  height: 'clamp(300px, 50vh, 500px)',
});

export const HeroHeader = style({
  ...getTileStyle('green', false, false),
  gridColumn: `${gridWideColumnStart} / ${gridWideColumnEnd}`,
  gridRow: 1,
  paddingBottom: spacingFluidMedium,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});

export const WideGrid = style({
  ...gridStyle,
  marginTop: spacingFluidLarge,
});

export const WideSidebar = style({
  ...getTileStyle('orange'),
  gridColumn: `${gridWideColumnStart} / ${gridWideColumnEnd}`,
  '@media': {
    [getMediaQueryMin('s')]: {
      gridColumn: `${gridWideColumnStart} / span 5`,
    },
  },
});

export const WideContent = style({
  ...getTileStyle('orange'),
  gridColumn: `${gridWideColumnStart} / ${gridWideColumnEnd}`,
  '@media': {
    [getMediaQueryMin('s')]: {
      gridColumn: `span 11 / ${gridWideColumnEnd}`,
    },
  },
});

export const ExtendedContentGrid = style({
  ...gridStyle,
  marginTop: spacingFluidLarge,
});

export const ExtendedContentHalfLeft = style({
  ...getTileStyle('green'),
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedSpanOneHalf}`,
});

export const ExtendedContentHalfRight = style({
  ...getTileStyle('green'),
  gridColumn: `${gridExtendedSpanOneHalf} / ${gridExtendedColumnEnd}`,
});

export const MasonryGrid = style({
  ...gridStyle,
  marginTop: gridGap,
});

export const MasonryCustom1 = style({
  ...getTileStyle('green'),
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedColumnEnd}`,
  '@media': {
    [getMediaQueryMin('s')]: {
      gridColumn: `${gridExtendedColumnStart} / span 8`,
      gridRow: 'span 2',
    },
  },
});

export const MasonryCustom2 = style({
  ...getTileStyle('green'),
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedSpanOneHalf}`,
  '@media': {
    [getMediaQueryMin('s')]: {
      gridColumn: `span 6 / ${gridExtendedColumnEnd}`,
    },
  },
});

export const MasonryCustom3 = style({
  ...getTileStyle('green'),
  gridColumn: `${gridExtendedSpanOneHalf} / ${gridExtendedColumnEnd}`,
  '@media': {
    [getMediaQueryMin('s')]: {
      gridColumn: `span 5 / ${gridBasicColumnEnd}`,
    },
  },
});

export const TeaserGrid = style({
  ...gridStyle,
  marginTop: spacingFluidLarge,
});

export const TeaserMedia = style({
  ...getTileStyle('blue', false, false),
  gridColumn: `${gridFullColumnStart} / ${gridFullColumnEnd}`,
  gridRow: 1,
});

export const TeaserContent = style({
  ...getTileStyle('purple', false, false),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  gridRow: 1,
  margin: `${spacingFluidLarge} 0`,
});

// Basic Content
export const BasicContentGrid = style({
  ...gridStyle,
  marginTop: spacingFluidLarge,
});

export const BasicContent = style({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
});

export const BasicContentHalfLeft = style({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneHalf}`,
});

export const BasicContentHalfRight = style({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicSpanOneHalf} / ${gridBasicColumnEnd}`,
});

export const BasicContentOneThirdLeft = style({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  '@media': {
    [getMediaQueryMin('s')]: {
      gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneThird}`,
    },
  },
});

export const BasicContentOneThirdFollow = style({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  '@media': {
    [getMediaQueryMin('s')]: {
      gridColumn: `${gridBasicSpanOneThird}`,
    },
  },
});

export const BasicContentOneThirdRight = style({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  '@media': {
    [getMediaQueryMin('s')]: {
      gridColumn: `${gridBasicSpanOneThird} / ${gridBasicColumnEnd}`,
    },
  },
});

export const BasicContentTwoThirdsLeft = style({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  '@media': {
    [getMediaQueryMin('s')]: {
      gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanTwoThirds}`,
    },
  },
});

export const BasicContentCustomLeft = style({
  ...getTileStyle('purple'),
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  '@media': {
    [getMediaQueryMin('s')]: {
      gridColumn: `${gridBasicColumnStart} / span 5`,
    },
  },
});

export const BasicContentCustomRight = style({
  ...getTileStyle('purple'),
  gridColumn: `span 6 / ${gridBasicColumnEnd}`,
});

export const NarrowContentGrid = style({
  ...gridStyle,
  marginTop: spacingFluidLarge,
});

export const NarrowContent = style({
  ...getTileStyle('yellow', false),
  gridColumn: `${gridNarrowColumnStart} / ${gridNarrowColumnEnd}`,
});

export const NarrowContentHalfLeft = style({
  ...getTileStyle('yellow', 'small'),
  gridColumn: `${gridNarrowColumnStart} / ${gridNarrowSpanOneHalf}`,
});

export const NarrowContentHalfRight = style({
  ...getTileStyle('yellow', 'small'),
  gridColumn: `${gridNarrowSpanOneHalf} / ${gridNarrowColumnEnd}`,
});
