import styled from 'styled-components';
import {
  borderRadiusLarge,
  gridGap,
  headingMediumStyle,
  motionDurationShort,
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

const Heading = styled.h3({
  ...headingMediumStyle,
  color: themeLightPrimary,
  textAlign: 'center',
  width: '100%',
  margin: 0,
});

// Tile
const MotionMoving = styled.div({
  color: themeLightPrimary,
  background: themeLightBackgroundSurface,
  borderRadius: borderRadiusLarge,
  cursor: 'pointer',
  width: '50px',
  height: '50px',
  transform: 'translateX(-200px)',
  transitionDuration: motionDurationShort,
  transitionTimingFunction: motionEasingBase,
});

export const StylesMotionMovingExample = (): JSX.Element => {
  return (
    <>
      <style>{`
        .active {
          transform: translateX(200px);
        }
      `}</style>
      <Wrapper>
        <Heading>Moving</Heading>
        <MotionMoving onClick={(e) => (e.target as HTMLDivElement).classList.toggle('active')}></MotionMoving>
      </Wrapper>
    </>
  );
};
