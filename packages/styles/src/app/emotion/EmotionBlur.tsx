import styled from '@emotion/styled';
import {
  blurFrosted,
  proseTextSmStyle,
  radiusLg,
  spacingFluidLg,
  spacingFluidSm,
} from '@porsche-design-system/emotion';

const EmotionBlurWrapper = styled.div({
  display: 'grid',
  ...proseTextSmStyle,
});

const EmotionBlurImage = styled.img({
  gridColumn: 1,
  gridRow: 1,
  width: '100%',
  height: '600px',
  objectFit: 'cover',
});

const EmotionBackdropBlurFrosted = styled.div(({ theme }) => ({
  backdropFilter: blurFrosted,
  backgroundColor: theme.frosted,
  borderRadius: radiusLg,
  margin: spacingFluidLg,
  padding: spacingFluidSm,
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
