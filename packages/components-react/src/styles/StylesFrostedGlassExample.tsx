import styled from '@emotion/styled';
import {
  borderRadiusLarge,
  frostedGlassStyle,
  spacingFluidMedium,
  textSmallStyle,
  themeDarkPrimary,
  themeLightStateHover,
} from '@porsche-design-system/components-react/emotion';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  padding: spacingFluidMedium,
  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
});

// Frosted Glass
const FrostedGlass = styled.div({
  ...textSmallStyle,
  ...frostedGlassStyle,
  color: themeDarkPrimary,
  background: themeLightStateHover,
  borderRadius: borderRadiusLarge,
  padding: spacingFluidMedium,
});

export const StylesFrostedGlassExample = (): JSX.Element => {
  return (
    <Wrapper>
      <FrostedGlass>Frosted Glass</FrostedGlass>
    </Wrapper>
  );
};
