import styled from '@emotion/styled';
import {
  spacingFluidLarge,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingFluidXLarge,
  spacingFluidXSmall,
  spacingFluidXXLarge,
  spacingStaticLarge,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXLarge,
  spacingStaticXSmall,
  spacingStaticXXLarge,
  textSmallStyle,
} from '@porsche-design-system/emotion';

const EmotionSpacingWrapper = styled.div(({ theme }) => ({
  display: 'grid',
  gap: spacingFluidMedium,
  ...textSmallStyle,
  color: theme.primary,
  padding: spacingStaticMedium,
}));

const SpacingRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: spacingStaticMedium,
});

const FluidBox = styled.div<{ size: string }>((props) => ({
  width: props.size,
  height: props.size,
  backgroundColor: props.theme.info,
}));

const StaticBox = styled.div<{ size: string }>((props) => ({
  width: props.size,
  height: props.size,
  backgroundColor: props.theme.error,
}));

export const EmotionSpacing = () => {
  return (
    <EmotionSpacingWrapper>
      <SpacingRow>
        <FluidBox size={spacingFluidXSmall} />
        Fluid xs
      </SpacingRow>
      <SpacingRow>
        <FluidBox size={spacingFluidSmall} />
        Fluid sm
      </SpacingRow>
      <SpacingRow>
        <FluidBox size={spacingFluidMedium} />
        Fluid md
      </SpacingRow>
      <SpacingRow>
        <FluidBox size={spacingFluidLarge} />
        Fluid lg
      </SpacingRow>
      <SpacingRow>
        <FluidBox size={spacingFluidXLarge} />
        Fluid xl
      </SpacingRow>
      <SpacingRow>
        <FluidBox size={spacingFluidXXLarge} />
        Fluid 2xl
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStaticXSmall} />
        Static xs
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStaticSmall} />
        Static sm
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStaticMedium} />
        Static md
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStaticLarge} />
        Static lg
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStaticXLarge} />
        Static xl
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStaticXXLarge} />
        Static 2xl
      </SpacingRow>
    </EmotionSpacingWrapper>
  );
};
