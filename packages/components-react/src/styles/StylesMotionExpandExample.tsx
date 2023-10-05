import styled from 'styled-components';
import {
  borderRadiusLarge,
  gridGap,
  headingMediumStyle,
  motionDurationModerate,
  motionDurationShort,
  motionEasingBase,
  motionEasingIn,
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
const MotionExpand = styled.div({
  color: themeLightPrimary,
  background: themeLightBackgroundSurface,
  borderRadius: borderRadiusLarge,
  cursor: 'pointer',
  width: '200px',
  height: '40px',
  transition: 'height',
  transitionDuration: motionDurationShort,
  transitionTimingFunction: motionEasingIn,
});

export const StylesMotionExpandExample = (): JSX.Element => {
  return (
    <>
      <style>{`
        .active {
          height: 160px;
          transition: height;
          transition-duration: ${motionDurationModerate};
          transition-timing-function: ${motionEasingBase};
        }
      `}</style>
      <Wrapper>
        <Heading>Expand</Heading>
        <MotionExpand onClick={(e) => (e.target as HTMLDivElement).classList.toggle('active')}></MotionExpand>
      </Wrapper>
    </>
  );
};
