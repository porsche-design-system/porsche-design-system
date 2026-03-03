import styled from '@emotion/styled';
import {
  proseTextSmStyle,
  radius2Xl,
  radius3Xl,
  radius4Xl,
  radiusFull,
  radiusLg,
  radiusMd,
  radiusSm,
  radiusXl,
  radiusXs,
  spacingFluidMd,
  spacingStaticMd,
} from '@porsche-design-system/emotion';

const EmotionBorderWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacingFluidMd,
  padding: spacingStaticMd,
});

const EmotionBorderSection = styled.div(({ theme }) => ({
  display: 'grid',
  gap: spacingFluidMd,
  ...proseTextSmStyle,
  color: theme.primary,
}));

const EmotionBorderRadiusXs = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusXs,
  padding: spacingFluidMd,
});

const EmotionBorderRadiusSm = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusSm,
  padding: spacingFluidMd,
});

const EmotionBorderRadiusMd = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusMd,
  padding: spacingFluidMd,
});

const EmotionBorderRadiusLg = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusLg,
  padding: spacingFluidMd,
});

const EmotionBorderRadiusXl = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusXl,
  padding: spacingFluidMd,
});

const EmotionBorderRadius2Xl = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radius2Xl,
  padding: spacingFluidMd,
});

const EmotionBorderRadius3Xl = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radius3Xl,
  padding: spacingFluidMd,
});

const EmotionBorderRadius4Xl = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radius4Xl,
  padding: spacingFluidMd,
});

const EmotionBorderRadiusFull = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: radiusFull,
  padding: spacingFluidMd,
});

export const EmotionBorder = () => {
  return (
    <EmotionBorderWrapper>
      <EmotionBorderSection>
        <EmotionBorderRadiusXs>Border Radius X-Small</EmotionBorderRadiusXs>
        <EmotionBorderRadiusSm>Border Radius Small</EmotionBorderRadiusSm>
        <EmotionBorderRadiusMd>Border Radius Medium</EmotionBorderRadiusMd>
        <EmotionBorderRadiusLg>Border Radius Large</EmotionBorderRadiusLg>
        <EmotionBorderRadiusXl>Border Radius X-Large</EmotionBorderRadiusXl>
        <EmotionBorderRadius2Xl>Border Radius 2X-Large</EmotionBorderRadius2Xl>
        <EmotionBorderRadius3Xl>Border Radius 3X-Large</EmotionBorderRadius3Xl>
        <EmotionBorderRadius4Xl>Border Radius 4X-Large</EmotionBorderRadius4Xl>
        <EmotionBorderRadiusFull>Border Radius Full</EmotionBorderRadiusFull>
      </EmotionBorderSection>
    </EmotionBorderWrapper>
  );
};
