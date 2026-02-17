import styled from '@emotion/styled';
import {
  proseTextSmStyle,
  radiusLg,
  shadowLg,
  shadowMd,
  shadowSm,
  spacingFluidMd,
  spacingFluidSm,
  spacingStaticMd,
} from '@porsche-design-system/emotion';

const EmotionShadowWrapper = styled.div(({ theme }) => ({
  display: 'grid',
  gap: spacingFluidMd,
  padding: spacingStaticMd,
  ...proseTextSmStyle,
  color: theme.primary,
}));

const EmotionShadowLow = styled.div({
  boxShadow: shadowSm,
  borderRadius: radiusLg,
  padding: spacingFluidSm,
});

const EmotionShadowMedium = styled.div({
  boxShadow: shadowMd,
  borderRadius: radiusLg,
  padding: spacingFluidSm,
});

const EmotionShadowHigh = styled.div({
  boxShadow: shadowLg,
  borderRadius: radiusLg,
  padding: spacingFluidSm,
});

export const EmotionShadow = () => {
  return (
    <EmotionShadowWrapper>
      <EmotionShadowLow>Shadow Small</EmotionShadowLow>
      <EmotionShadowMedium>Shadow Medium</EmotionShadowMedium>
      <EmotionShadowHigh>Shadow Large</EmotionShadowHigh>
    </EmotionShadowWrapper>
  );
};
