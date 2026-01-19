import styled from '@emotion/styled';
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
} from '@porsche-design-system/components-react/emotion';

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
const tileBaseStyle = {
  ...textSmallStyle,
  color: themeLightPrimary,
  background: themeLightBackgroundSurface,
  padding: spacingFluidMedium,
  borderRadius: borderRadiusLarge,
};

// Drop Shadow
const DropShadowLow = styled.div({
  ...tileBaseStyle,
  ...dropShadowLowStyle,
});

const DropShadowMedium = styled.div({
  ...tileBaseStyle,
  ...dropShadowMediumStyle,
});

const DropShadowHigh = styled.div({
  ...tileBaseStyle,
  ...dropShadowHighStyle,
});

export const StylesDropShadowExample = (): JSX.Element => {
  return (
    <Wrapper>
      <Heading>Drop Shadow</Heading>
      <DropShadowLow>Low</DropShadowLow>
      <DropShadowMedium>Medium</DropShadowMedium>
      <DropShadowHigh>High</DropShadowHigh>
    </Wrapper>
  );
};
