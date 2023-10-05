import styled from 'styled-components';
import {
  borderRadiusLarge,
  gridGap,
  headingMediumStyle,
  motionDurationLong,
  motionEasingBase,
  spacingFluidMedium,
  themeLightBackgroundSurface,
  themeLightPrimary,
} from '@porsche-design-system/components-react/styles';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  gap: gridGap,
  padding: spacingFluidMedium,
  flexWrap: 'wrap',
  justifyContent: 'center',
});

// Typography
const Heading = styled.h3({
  ...headingMediumStyle,
  color: themeLightPrimary,
  textAlign: 'center',
  width: '100%',
  margin: 0,
});

// Tile
const MotionShowHide = styled.div({
  color: themeLightPrimary,
  background: themeLightBackgroundSurface,
  borderRadius: borderRadiusLarge,
  cursor: 'pointer',
  width: '200px',
  height: '100px',
  transitionDuration: motionDurationLong,
  transitionTimingFunction: motionEasingBase,
});

export const StylesMotionShowHideExample = (): JSX.Element => {
  return (
    <>
      <style>{`
        .active {
          opacity: 0;
        }
      `}</style>
      <Wrapper>
        <Heading>Show / Hide</Heading>
        <MotionShowHide onClick={(e) => (e.target as HTMLDivElement).classList.toggle('active')}></MotionShowHide>
      </Wrapper>
    </>
  );
};
