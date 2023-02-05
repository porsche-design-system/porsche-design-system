import React from 'react';
import styled from 'styled-components';
import {
  borderRadiusLarge,
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidthBase,
  borderWidthThin,
  gridGap,
  headingMediumStyle,
  spacingFluidMedium,
  textSmallStyle,
  textXSmallStyle,
  themeDarkBackgroundBase,
  themeDarkPrimary,
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
  color: themeDarkPrimary,
  background: themeDarkBackgroundBase,
  padding: spacingFluidMedium,
};

// Border Radius
const BorderRadiusSmall = styled.div({
  ...getTileStyle,
  borderRadius: borderRadiusSmall,
});

const BorderRadiusMedium = styled.div({
  ...getTileStyle,
  borderRadius: borderRadiusMedium,
});

const BorderRadiusLarge = styled.div({
  ...getTileStyle,
  borderRadius: borderRadiusLarge,
});

// Border Width
const BorderWidthBase = styled.div({
  width: '100%',
  borderBottom: `${borderWidthBase} solid ${themeLightPrimary}`,
  '&::before': {
    ...textXSmallStyle,
    content: '"Base"',
    color: themeLightPrimary,
  },
});

const BorderWidthThin = styled.div({
  width: '100%',
  borderBottom: `${borderWidthThin} solid ${themeLightPrimary}`,
  '&::before': {
    ...textXSmallStyle,
    content: '"Thin"',
    color: themeLightPrimary,
  },
});

export const DesignTokensBorderExample = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Heading>Border Radius</Heading>
        <BorderRadiusSmall>Small</BorderRadiusSmall>
        <BorderRadiusMedium>Medium</BorderRadiusMedium>
        <BorderRadiusLarge>Large</BorderRadiusLarge>
      </Wrapper>
      <Wrapper>
        <Heading>Border Width</Heading>
        <BorderWidthBase />
        <BorderWidthThin />
      </Wrapper>
    </>
  );
};
