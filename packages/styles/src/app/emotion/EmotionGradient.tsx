import styled from '@emotion/styled';
import {
  borderRadiusLarge,
  gradientToBottomStyle,
  gradientToLeftStyle,
  gradientToRightStyle,
  gradientToTopStyle,
  spacingFluidMedium,
  textSmallStyle,
} from '@porsche-design-system/emotion';

const EmotionGradientWrapper = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: spacingFluidMedium,
  padding: spacingFluidMedium,
  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
});

const EmotionGradientItemTop = styled.div({
  ...gradientToTopStyle,
  ...textSmallStyle,
  color: 'white',
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
});

const EmotionGradientItemBottom = styled.div({
  ...gradientToBottomStyle,
  ...textSmallStyle,
  color: 'white',
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
});

const EmotionGradientItemLeft = styled.div({
  ...gradientToLeftStyle,
  ...textSmallStyle,
  color: 'white',
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
});

const EmotionGradientItemRight = styled.div({
  ...gradientToRightStyle,
  ...textSmallStyle,
  color: 'white',
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
});

export const EmotionGradient = () => {
  return (
    <EmotionGradientWrapper>
      <EmotionGradientItemTop>Gradient To Top</EmotionGradientItemTop>
      <EmotionGradientItemBottom>Gradient To Bottom</EmotionGradientItemBottom>
      <EmotionGradientItemLeft>Gradient To Left</EmotionGradientItemLeft>
      <EmotionGradientItemRight>Gradient To Right</EmotionGradientItemRight>
    </EmotionGradientWrapper>
  );
};
