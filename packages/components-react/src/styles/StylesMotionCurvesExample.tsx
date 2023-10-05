import styled from 'styled-components';
import {
  borderRadiusLarge,
  gridGap,
  headingMediumStyle,
  headingSmallStyle,
  motionDurationLong,
  motionDurationModerate,
  motionDurationVeryLong,
  motionEasingBase,
  motionEasingIn,
  motionEasingOut,
  spacingFluidMedium,
  textSmallStyle,
  textXSmallStyle,
  themeLightBackgroundSurface,
  themeLightPrimary,
} from '@porsche-design-system/components-react/styles';

// Wrapper
const Wrapper = styled.div({
  display: 'flex',
  gap: gridGap,
  flexDirection: 'column',
  padding: spacingFluidMedium,
});

const MotionExampleWrapper = styled.div({
  display: 'flex',
  gap: gridGap,
  flexWrap: 'wrap',
  justifyContent: 'center',
});

// Typography
const getTypographyStyle = {
  color: themeLightPrimary,
  textAlign: 'center',
  width: '100%',
  margin: 0,
} as const;

const Heading = styled.h3({
  ...headingMediumStyle,
  ...getTypographyStyle,
});

const HeadingSmall = styled.h4({
  ...headingSmallStyle,
  ...getTypographyStyle,
});

const Description = styled.p({
  ...textXSmallStyle,
  ...getTypographyStyle,
});

// Tile
const tileBaseStyle = {
  color: themeLightPrimary,
  background: themeLightBackgroundSurface,
  borderRadius: borderRadiusLarge,
  cursor: 'pointer',
  width: '50px',
  height: '50px',
  transform: 'translateX(-200px)',
};

// Motion
const MovingStandard = styled.div({
  ...tileBaseStyle,
  transitionDuration: motionDurationVeryLong,
  transitionTimingFunction: motionEasingBase,
});

const MovingIn = styled.div({
  ...tileBaseStyle,
  transitionDuration: motionDurationLong,
  transitionTimingFunction: motionEasingIn,
});

const MovingOut = styled.div({
  ...tileBaseStyle,
  transitionDuration: motionDurationModerate,
  transitionTimingFunction: motionEasingOut,
});

export const StylesMotionCurvesExample = (): JSX.Element => {
  return (
    <>
      <style>{`
        .active {
          transform: translateX(200px);
        }
      `}</style>
      <Wrapper>
        <Heading>Motion Curves</Heading>
        <MotionExampleWrapper>
          <HeadingSmall>Acceleration: 25%, Deceleration: 25%</HeadingSmall>
          <Description>
            This curve results in a smooth and gradual acceleration at the beginning, reaches its maximum speed in the
            middle, and then gently decelerates towards the end. It's a commonly used easing curve that provides a
            natural and visually pleasing animation transition.
          </Description>
          <MovingStandard onClick={(e) => (e.target as HTMLDivElement).classList.toggle('active')}></MovingStandard>
        </MotionExampleWrapper>
        <MotionExampleWrapper>
          <HeadingSmall>Acceleration: 0%, Deceleration: 80%</HeadingSmall>
          <Description>
            Objects rush onto the screen with maximum speed, then gradually ease into a gentle slowdown until they come
            to a stop.
          </Description>
          <MovingIn onClick={(e) => (e.target as HTMLDivElement).classList.toggle('active')}></MovingIn>
        </MotionExampleWrapper>
        <MotionExampleWrapper>
          <HeadingSmall>Acceleration: 40%, Deceleration:50%</HeadingSmall>
          <Description>
            This type of easing provides a relatively quick start followed by a more gradual deceleration.
          </Description>
          <MovingOut onClick={(e) => (e.target as HTMLDivElement).classList.toggle('active')}></MovingOut>
        </MotionExampleWrapper>
      </Wrapper>
    </>
  );
};
