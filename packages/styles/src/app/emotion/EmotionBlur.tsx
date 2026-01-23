import styled from '@emotion/styled';
import {
  borderRadiusLarge,
  frostedGlassStyle,
  spacingFluidLarge,
  spacingFluidSmall,
  textSmallStyle,
} from '@porsche-design-system/emotion';

const EmotionBlurWrapper = styled.div({
  display: 'grid',
  ...textSmallStyle,
});

const EmotionBlurImage = styled.img({
  gridColumn: 1,
  gridRow: 1,
  width: '100%',
  height: '600px',
  objectFit: 'cover',
});

const EmotionBackdropBlurFrosted = styled.div(({ theme }) => ({
  ...frostedGlassStyle,
  backgroundColor: theme.frosted,
  borderRadius: borderRadiusLarge,
  margin: spacingFluidLarge,
  padding: spacingFluidSmall,
  display: 'grid',
  gridRow: 1,
  gridColumn: 1,
  placeItems: 'center',
}));

const EmotionBlurP = styled.p({
  color: 'white',
});

export const EmotionBlur = () => {
  return (
    <EmotionBlurWrapper>
      <EmotionBlurImage src="/lights.jpg" alt="" />
      <EmotionBackdropBlurFrosted>
        <EmotionBlurP>Blur</EmotionBlurP>
      </EmotionBackdropBlurFrosted>
    </EmotionBlurWrapper>
  );
};
