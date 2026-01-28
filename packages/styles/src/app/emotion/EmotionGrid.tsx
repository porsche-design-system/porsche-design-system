import styled from '@emotion/styled';
import {
  borderRadiusLarge,
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
  gridNarrowColumnEnd,
  gridNarrowColumnStart,
  gridNarrowSpanOneHalf,
  gridStyle,
  gridWideColumnEnd,
  gridWideColumnStart,
  spacingFluidMedium,
  spacingFluidSmall,
  textSmallStyle,
} from '@porsche-design-system/emotion';

const GridWrapper = styled.div(({ theme }) => ({
  ...gridStyle,
  ...textSmallStyle,
  color: theme.primary,
  textAlign: 'center',
}));

const Subgrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  rowGap: spacingFluidMedium,
});
const SubgridExtended = styled(Subgrid)({
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedColumnEnd}`,
});
const SubgridBasic = styled(Subgrid)({
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
});
const SubgridNarrow = styled(Subgrid)({
  gridColumn: `${gridNarrowColumnStart} / ${gridNarrowColumnEnd}`,
});

const PaddingSmall = {
  padding: spacingFluidSmall,
};

const BorderRadiusLarge = {
  borderRadius: borderRadiusLarge,
};

// Main columns
const Full = styled.div({
  gridColumn: `${gridFullColumnStart} / ${gridFullColumnEnd}`,
  background: 'rgba(0,0,255,.25)',
  ...PaddingSmall,
});
const Wide = styled.div({
  gridColumn: `${gridWideColumnStart} / ${gridWideColumnEnd}`,
  background: 'rgba(0,255,255,.25)',
  ...PaddingSmall,
});
const Extended = styled.div({
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedColumnEnd}`,
  background: 'rgba(0,255,0,.25)',
  ...PaddingSmall,
});
const Basic = styled.div({
  gridColumn: `${gridBasicColumnStart} / ${gridBasicColumnEnd}`,
  background: 'rgba(255,0,255,.25)',
  ...PaddingSmall,
});
const Narrow = styled.div({
  gridColumn: `${gridNarrowColumnStart} / ${gridNarrowColumnEnd}`,
  background: 'rgba(255,255,0,.25)',
  ...PaddingSmall,
});

// Extended subgrid
const ExtendedHalfStart = styled.div({
  gridColumn: `${gridExtendedColumnStart} / ${gridExtendedSpanOneHalf}`,
  background: 'rgba(0,255,0,.25)',
  ...BorderRadiusLarge,
  ...PaddingSmall,
});
const ExtendedHalfEnd = styled.div({
  gridColumn: `${gridExtendedSpanOneHalf} / ${gridExtendedColumnEnd}`,
  background: 'rgba(0,255,0,.25)',
  ...BorderRadiusLarge,
  ...PaddingSmall,
});

// Basic subgrid
const BasicHalfStart = styled.div({
  gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneHalf}`,
  background: 'rgba(255,0,255,.25)',
  ...BorderRadiusLarge,
  ...PaddingSmall,
});
const BasicHalfEnd = styled.div({
  gridColumn: `${gridBasicSpanOneHalf} / ${gridBasicColumnEnd}`,
  background: 'rgba(255,0,255,.25)',
  ...BorderRadiusLarge,
  ...PaddingSmall,
});
const BasicThirdStart = styled.div({
  gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanOneThird}`,
  background: 'rgba(255,0,255,.25)',
  ...BorderRadiusLarge,
  ...PaddingSmall,
});
const BasicThirdFollow = styled.div({
  gridColumn: `${gridBasicSpanOneThird}`,
  background: 'rgba(255,0,255,.25)',
  ...BorderRadiusLarge,
  ...PaddingSmall,
});
const BasicThirdEnd = styled.div({
  gridColumn: `${gridBasicSpanOneThird} / ${gridBasicColumnEnd}`,
  background: 'rgba(255,0,255,.25)',
  ...BorderRadiusLarge,
  ...PaddingSmall,
});
const BasicTwoThirdsStart = styled.div({
  gridColumn: `${gridBasicColumnStart} / ${gridBasicSpanTwoThirds}`,
  background: 'rgba(255,0,255,.25)',
  ...BorderRadiusLarge,
  ...PaddingSmall,
});
const BasicTwoThirdsEnd = styled.div({
  gridColumn: `${gridBasicSpanTwoThirds} / ${gridBasicColumnEnd}`,
  background: 'rgba(255,0,255,.25)',
  ...BorderRadiusLarge,
  ...PaddingSmall,
});

// Narrow subgrid
const NarrowHalfStart = styled.div({
  gridColumn: `${gridNarrowColumnStart} / ${gridNarrowSpanOneHalf}`,
  background: 'rgba(255,255,0,.25)',
  ...BorderRadiusLarge,
  ...PaddingSmall,
});
const NarrowHalfEnd = styled.div({
  gridColumn: `${gridNarrowSpanOneHalf} / ${gridNarrowColumnEnd}`,
  background: 'rgba(255,255,0,.25)',
  ...BorderRadiusLarge,
  ...PaddingSmall,
});

export const EmotionGrid = () => (
  <GridWrapper className="_pds-grid-visualization">
    <Full>Full</Full>
    <Wide>Wide</Wide>
    <Extended>Extended</Extended>
    <Basic>Basic</Basic>
    <Narrow>Narrow</Narrow>
    <SubgridExtended>
      <ExtendedHalfStart>One Half (Extended)</ExtendedHalfStart>
      <ExtendedHalfEnd>One Half (Extended)</ExtendedHalfEnd>
    </SubgridExtended>
    <SubgridBasic>
      <BasicHalfStart>One Half (Basic)</BasicHalfStart>
      <BasicHalfEnd>One Half (Basic)</BasicHalfEnd>
      <BasicThirdStart>One Third (Basic)</BasicThirdStart>
      <BasicThirdFollow>One Third (Basic)</BasicThirdFollow>
      <BasicThirdEnd>One Third (Basic)</BasicThirdEnd>
      <BasicTwoThirdsStart>Two Thirds (Basic)</BasicTwoThirdsStart>
      <BasicThirdEnd>One Third (Basic)</BasicThirdEnd>
      <BasicThirdStart>One Third (Basic)</BasicThirdStart>
      <BasicTwoThirdsEnd>Two Thirds (Basic)</BasicTwoThirdsEnd>
    </SubgridBasic>
    <SubgridNarrow>
      <NarrowHalfStart>One Half (Narrow)</NarrowHalfStart>
      <NarrowHalfEnd>One Half (Narrow)</NarrowHalfEnd>
    </SubgridNarrow>
  </GridWrapper>
);
