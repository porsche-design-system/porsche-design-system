import styled from '@emotion/styled';
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
} from '@porsche-design-system/components-react/styles';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: gridGap,
  padding: spacingFluidMedium,
  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
});

// Tile
const tileBaseStyle = {
  ...textSmallStyle,
  color: themeDarkPrimary,
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
};

// Gradient
const GradientToTop = styled.div({
  ...tileBaseStyle,
  ...gradientToTopStyle,
});

const GradientToBottom = styled.div({
  ...tileBaseStyle,
  ...gradientToBottomStyle,
});

const GradientToLeft = styled.div({
  ...tileBaseStyle,
  ...gradientToLeftStyle,
});

const GradientToRight = styled.div({
  ...tileBaseStyle,
  ...gradientToRightStyle,
});

export const StylesGradientExample = (): JSX.Element => {
  return (
    <Wrapper>
      <GradientToTop>Gradient To Top</GradientToTop>
      <GradientToBottom>Gradient To Bottom</GradientToBottom>
      <GradientToLeft>Gradient To Left</GradientToLeft>
      <GradientToRight>Gradient To Right</GradientToRight>
    </Wrapper>
  );
};
