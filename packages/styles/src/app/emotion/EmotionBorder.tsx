import styled from '@emotion/styled';
import {
  borderRadiusLarge,
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidthBase,
  borderWidthThin,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/emotion';

const EmotionBorderWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacingFluidMedium,
  padding: spacingStaticMedium,
});

const EmotionBorderSection = styled.div(({ theme }) => ({
  display: 'grid',
  gap: spacingFluidMedium,
  ...textSmallStyle,
  color: theme.primary,
}));

const EmotionBorderRadiusSmall = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: borderRadiusSmall,
  padding: spacingFluidSmall,
});

const EmotionBorderRadiusMedium = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: borderRadiusMedium,
  padding: spacingFluidSmall,
});

const EmotionBorderRadiusLarge = styled.div({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: borderRadiusLarge,
  padding: spacingFluidSmall,
});

const EmotionBorderWidthThin = styled.div({
  borderWidth: borderWidthThin,
  borderStyle: 'solid',
  padding: spacingFluidSmall,
});

const EmotionBorderWidthRegular = styled.div({
  borderWidth: borderWidthBase,
  borderStyle: 'solid',
  padding: spacingFluidSmall,
});

export const EmotionBorder = () => {
  return (
    <EmotionBorderWrapper>
      <EmotionBorderSection>
        <EmotionBorderRadiusSmall>Border Radius Small</EmotionBorderRadiusSmall>
        <EmotionBorderRadiusMedium>Border Radius Medium</EmotionBorderRadiusMedium>
        <EmotionBorderRadiusLarge>Border Radius Large</EmotionBorderRadiusLarge>
      </EmotionBorderSection>
      <EmotionBorderSection>
        <EmotionBorderWidthThin>Border Width Thin</EmotionBorderWidthThin>
        <EmotionBorderWidthRegular>Border Width Regular</EmotionBorderWidthRegular>
      </EmotionBorderSection>
    </EmotionBorderWrapper>
  );
};
