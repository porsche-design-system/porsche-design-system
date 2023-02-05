import React from 'react';
import styled from 'styled-components';
import {
  borderRadiusLarge,
  gradientToBottomStyle,
  gradientToLeftStyle,
  gradientToRightStyle,
  gradientToTopStyle,
  gridGap,
  spacingFluidMedium,
  textSmallStyle,
  themeDarkPrimary,
} from '@porsche-design-system/components-react/utilities/js';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: gridGap,
  padding: spacingFluidMedium,
  justifyContent: 'center',
  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
});

// Tile
const getTileStyle = {
  ...textSmallStyle,
  color: themeDarkPrimary,
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
};

// Gradient
const GradientToTop = styled.div({
  ...getTileStyle,
  ...gradientToTopStyle,
});

const GradientToBottom = styled.div({
  ...getTileStyle,
  ...gradientToBottomStyle,
});

const GradientToLeft = styled.div({
  ...getTileStyle,
  ...gradientToLeftStyle,
});

const GradientToRight = styled.div({
  ...getTileStyle,
  ...gradientToRightStyle,
});

export const DesignTokensGradientExample = (): JSX.Element => {
  return (
    <Wrapper>
      <GradientToTop>Gradient To Top</GradientToTop>
      <GradientToBottom>Gradient To Bottom</GradientToBottom>
      <GradientToLeft>Gradient To Left</GradientToLeft>
      <GradientToRight>Gradient To Right</GradientToRight>
    </Wrapper>
  );
};
