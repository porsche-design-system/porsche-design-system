import styled from '@emotion/styled';
import { gradientStopsFadeDark, proseTextSmStyle, radiusLg, spacingFluidMd } from '@porsche-design-system/emotion';

const EmotionGradientWrapper = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: spacingFluidMd,
  padding: spacingFluidMd,
  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
});

const EmotionGradientItemTop = styled.div({
  ...proseTextSmStyle,
  color: 'white',
  borderRadius: radiusLg,
  padding: spacingFluidMd,
  backgroundImage: `linear-gradient(to top, ${gradientStopsFadeDark})`,
});

const EmotionGradientItemBottom = styled.div({
  ...proseTextSmStyle,
  color: 'white',
  borderRadius: radiusLg,
  padding: spacingFluidMd,
  backgroundImage: `linear-gradient(to bottom, ${gradientStopsFadeDark})`,
});

const EmotionGradientItemLeft = styled.div({
  ...proseTextSmStyle,
  color: 'white',
  borderRadius: radiusLg,
  padding: spacingFluidMd,
  backgroundImage: `linear-gradient(to left, ${gradientStopsFadeDark})`,
});

const EmotionGradientItemRight = styled.div({
  ...proseTextSmStyle,
  color: 'white',
  borderRadius: radiusLg,
  padding: spacingFluidMd,
  backgroundImage: `linear-gradient(to right, ${gradientStopsFadeDark})`,
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
