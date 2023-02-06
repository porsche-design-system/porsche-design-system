import React from 'react';
import styled from 'styled-components';
import {
  borderRadiusSmall,
  gridGap,
  headingMediumStyle,
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
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
} from '@porsche-design-system/components-react/utilities/js';

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
  borderRadius: borderRadiusSmall,
  padding: spacingFluidMedium,
} as const;

// Spacing Fluid
const SpacingFluidXSmall = styled.div({
  ...getTileStyle,
  padding: spacingFluidXSmall,
});

const SpacingFluidSmall = styled.div({
  ...getTileStyle,
  padding: spacingFluidSmall,
});

const SpacingFluidMedium = styled.div({
  ...getTileStyle,
  padding: spacingFluidMedium,
});

const SpacingFluidLarge = styled.div({
  ...getTileStyle,
  padding: spacingFluidLarge,
});

const SpacingFluidXLarge = styled.div({
  ...getTileStyle,
  padding: spacingFluidXLarge,
});

// Spacing Static
const SpacingStaticXSmall = styled.div({
  ...getTileStyle,
  padding: spacingStaticXSmall,
});

const SpacingStaticSmall = styled.div({
  ...getTileStyle,
  padding: spacingStaticSmall,
});

const SpacingStaticMedium = styled.div({
  ...getTileStyle,
  padding: spacingStaticMedium,
});

const SpacingStaticLarge = styled.div({
  ...getTileStyle,
  padding: spacingStaticLarge,
});

const SpacingStaticXLarge = styled.div({
  ...getTileStyle,
  padding: spacingStaticXLarge,
});

const SpacingStaticXXLarge = styled.div({
  ...getTileStyle,
  padding: spacingStaticXXLarge,
});

export const DesignTokensSpacingExample = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Heading>Spacing Fluid (XS - XL)</Heading>
        <SpacingFluidXSmall></SpacingFluidXSmall>
        <SpacingFluidSmall></SpacingFluidSmall>
        <SpacingFluidMedium></SpacingFluidMedium>
        <SpacingFluidLarge></SpacingFluidLarge>
        <SpacingFluidXLarge></SpacingFluidXLarge>
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
