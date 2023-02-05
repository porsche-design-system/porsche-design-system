import React from 'react';
import styled from 'styled-components';
import {
  borderRadiusLarge,
  dropShadowHighStyle,
  dropShadowLowStyle,
  dropShadowMediumStyle,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  textSmallStyle,
  themeLightBackgroundSurface,
  themeLightPrimary,
} from '@porsche-design-system/components-react/utilities/js';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
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
  ...textSmallStyle,
  color: themeLightPrimary,
  background: themeLightBackgroundSurface,
  padding: spacingFluidMedium,
  borderRadius: borderRadiusLarge,
};

// Drop Shadow
const DropShadowLow = styled.div({
  ...getTileStyle,
  ...dropShadowLowStyle,
});

const DropShadowMedium = styled.div({
  ...getTileStyle,
  ...dropShadowMediumStyle,
});

const DropShadowHigh = styled.div({
  ...getTileStyle,
  ...dropShadowHighStyle,
});

export const UtilitiesDropShadowExample = (): JSX.Element => {
  return (
    <Wrapper>
      <Heading>Drop Shadow</Heading>
      <DropShadowLow>Low</DropShadowLow>
      <DropShadowMedium>Medium</DropShadowMedium>
      <DropShadowHigh>High</DropShadowHigh>
    </Wrapper>
  );
};
