import styled from 'styled-components';
import {
  gridGap,
  headingMediumStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXXLarge,
  spacingFluidXLarge,
  spacingFluidXSmall,
  spacingStaticLarge,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXLarge,
  spacingStaticXSmall,
  spacingStaticXXLarge,
  textXSmallStyle,
  themeLightContrastLow,
  themeLightPrimary,
} from '@porsche-design-system/components-react/styles';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: gridGap,
  padding: spacingFluidMedium,
});

// Typography
const Heading = styled.h3({
  ...headingMediumStyle,
  color: themeLightPrimary,
  textAlign: 'center',
  width: '100%',
  margin: 0,
});

// Tile
const getTileStyle = {
  ...textXSmallStyle,
  background: themeLightContrastLow,
} as const;

// Spacing Fluid
const SpacingFluidXSmall = styled.div({
  ...getTileStyle,
  width: spacingFluidXSmall,
  height: spacingFluidXSmall,
});

const SpacingFluidSmall = styled.div({
  ...getTileStyle,
  width: spacingFluidSmall,
  height: spacingFluidSmall,
});

const SpacingFluidMedium = styled.div({
  ...getTileStyle,
  width: spacingFluidMedium,
  height: spacingFluidMedium,
});

const SpacingFluidLarge = styled.div({
  ...getTileStyle,
  width: spacingFluidLarge,
  height: spacingFluidLarge,
});

const SpacingFluidXLarge = styled.div({
  ...getTileStyle,
  width: spacingFluidXLarge,
  height: spacingFluidXLarge,
});

const SpacingFluidXXLarge = styled.div({
  ...getTileStyle,
  width: spacingFluidXXLarge,
  height: spacingFluidXXLarge,
});

// Spacing Static
const SpacingStaticXSmall = styled.div({
  ...getTileStyle,
  width: spacingStaticXSmall,
  height: spacingStaticXSmall,
});

const SpacingStaticSmall = styled.div({
  ...getTileStyle,
  width: spacingStaticSmall,
  height: spacingStaticSmall,
});

const SpacingStaticMedium = styled.div({
  ...getTileStyle,
  width: spacingStaticMedium,
  height: spacingStaticMedium,
});

const SpacingStaticLarge = styled.div({
  ...getTileStyle,
  width: spacingStaticLarge,
  height: spacingStaticLarge,
});

const SpacingStaticXLarge = styled.div({
  ...getTileStyle,
  width: spacingStaticXLarge,
  height: spacingStaticXLarge,
});

const SpacingStaticXXLarge = styled.div({
  ...getTileStyle,
  width: spacingStaticXXLarge,
  height: spacingStaticXXLarge,
});

export const StylesSpacingExample = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Heading>Spacing Fluid (XS - XXL)</Heading>
        <SpacingFluidXSmall></SpacingFluidXSmall>
        <SpacingFluidSmall></SpacingFluidSmall>
        <SpacingFluidMedium></SpacingFluidMedium>
        <SpacingFluidLarge></SpacingFluidLarge>
        <SpacingFluidXLarge></SpacingFluidXLarge>
        <SpacingFluidXXLarge></SpacingFluidXXLarge>
      </Wrapper>
      <Wrapper>
        <Heading>Spacing Static (XS - XXL)</Heading>
        <SpacingStaticXSmall></SpacingStaticXSmall>
        <SpacingStaticSmall></SpacingStaticSmall>
        <SpacingStaticMedium></SpacingStaticMedium>
        <SpacingStaticLarge></SpacingStaticLarge>
        <SpacingStaticXLarge></SpacingStaticXLarge>
        <SpacingStaticXXLarge></SpacingStaticXXLarge>
      </Wrapper>
    </>
  );
};
