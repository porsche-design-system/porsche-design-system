import styled from 'styled-components';
import {
  borderRadiusLarge,
  gridGap,
  headingMediumStyle,
  motionDurationModerate,
  motionDurationShort,
  motionEasingIn,
  motionEasingOut,
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
const MotionEnterExit = styled.div({
  color: themeLightPrimary,
  background: themeLightBackgroundSurface,
  borderRadius: borderRadiusLarge,
  cursor: 'pointer',
  width: '200px',
  height: '100px',
  transform: 'translateY(0px)',
  transitionDuration: motionDurationModerate,
  transitionTimingFunction: motionEasingIn,
});

export const StylesMotionMovingExample = (): JSX.Element => {
  return (
    <>
      <style>{`
        .active {
          transition-duration: ${motionDurationShort};
          transition-timing-function: ${motionEasingOut};
          transform: translateY(40%);
          opacity: 0;
        }
      `}</style>
      <Wrapper>
        <Heading>Enter / Exit</Heading>
        <MotionEnterExit onClick={(e) => (e.target as HTMLDivElement).classList.toggle('active')}></MotionEnterExit>
      </Wrapper>
    </>
  );
};
