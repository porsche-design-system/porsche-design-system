import styled from '@emotion/styled';
import {
  borderRadiusLarge,
  dropShadowHighStyle,
  dropShadowLowStyle,
  dropShadowMediumStyle,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/emotion';

const EmotionShadowWrapper = styled.div(({ theme }) => ({
  display: 'grid',
  gap: spacingFluidMedium,
  padding: spacingStaticMedium,
  ...textSmallStyle,
  color: theme.primary,
}));

const EmotionShadowLow = styled.div({
  ...dropShadowLowStyle,
  borderRadius: borderRadiusLarge,
  padding: spacingFluidSmall,
});

const EmotionShadowMedium = styled.div({
  ...dropShadowMediumStyle,
  borderRadius: borderRadiusLarge,
  padding: spacingFluidSmall,
});

const EmotionShadowHigh = styled.div({
  ...dropShadowHighStyle,
  borderRadius: borderRadiusLarge,
  padding: spacingFluidSmall,
});

export const EmotionShadow = () => {
  return (
    <EmotionShadowWrapper>
      <EmotionShadowLow>Shadow Low</EmotionShadowLow>
      <EmotionShadowMedium>Shadow Medium</EmotionShadowMedium>
      <EmotionShadowHigh>Shadow High</EmotionShadowHigh>
    </EmotionShadowWrapper>
  );
};
