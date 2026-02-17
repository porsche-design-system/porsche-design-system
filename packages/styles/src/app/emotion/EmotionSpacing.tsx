import styled from '@emotion/styled';
import {
  proseTextSmStyle,
  spacingFluid2Xl,
  spacingFluidLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingFluidXl,
  spacingFluidXs,
  spacingStatic2Xl,
  spacingStaticLg,
  spacingStaticMd,
  spacingStaticSm,
  spacingStaticXl,
  spacingStaticXs,
} from '@porsche-design-system/emotion';

const EmotionSpacingWrapper = styled.div(({ theme }) => ({
  display: 'grid',
  gap: spacingFluidMd,
  ...proseTextSmStyle,
  color: theme.primary,
  padding: spacingStaticMd,
}));

const SpacingRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: spacingStaticMd,
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
        <FluidBox size={spacingFluidXs} />
        Fluid xs
      </SpacingRow>
      <SpacingRow>
        <FluidBox size={spacingFluidSm} />
        Fluid sm
      </SpacingRow>
      <SpacingRow>
        <FluidBox size={spacingFluidMd} />
        Fluid md
      </SpacingRow>
      <SpacingRow>
        <FluidBox size={spacingFluidLg} />
        Fluid lg
      </SpacingRow>
      <SpacingRow>
        <FluidBox size={spacingFluidXl} />
        Fluid xl
      </SpacingRow>
      <SpacingRow>
        <FluidBox size={spacingFluid2Xl} />
        Fluid 2xl
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStaticXs} />
        Static xs
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStaticSm} />
        Static sm
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStaticMd} />
        Static md
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStaticLg} />
        Static lg
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStaticXl} />
        Static xl
      </SpacingRow>
      <SpacingRow>
        <StaticBox size={spacingStatic2Xl} />
        Static 2xl
      </SpacingRow>
    </EmotionSpacingWrapper>
  );
};
