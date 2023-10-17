import styled from 'styled-components';
import {
  borderRadiusLarge,
  gridGap,
  headingMediumStyle,
  motionDurationLong,
  motionDurationModerate,
  motionDurationShort,
  motionEasingBase,
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
});

// Tile
const tileBaseStyle = {
  color: themeLightPrimary,
  background: themeLightBackgroundSurface,
  border: 'none',
  borderRadius: borderRadiusLarge,
  cursor: 'pointer',
};

const MotionMoving = styled.button({
  ...tileBaseStyle,
  width: '70px',
  height: '70px',
  transform: 'translateX(-200px)',
  transitionDuration: motionDurationShort,
  transitionTimingFunction: motionEasingBase,
});

const MotionEnterExit = styled.button({
  ...tileBaseStyle,
  width: '200px',
  height: '100px',
  transform: 'translateY(0px)',
  transitionDuration: motionDurationModerate,
  transitionTimingFunction: motionEasingIn,
});

const MotionShowHide = styled.button({
  ...tileBaseStyle,
  width: '200px',
  height: '100px',
  transitionDuration: motionDurationLong,
  transitionTimingFunction: motionEasingBase,
});

const MotionExpand = styled.button({
  ...tileBaseStyle,
  width: '200px',
  height: '40px',
  transition: 'height',
  transitionDuration: motionDurationShort,
  transitionTimingFunction: motionEasingIn,
});

export const StylesMotionExample = (): JSX.Element => {
  const onClick = (e: MouseEvent, className: string) => {
    (e.target as HTMLButtonElement).classList.toggle(className);
  };

  return (
    <>
      <style>{`
        .tile-moving-active {
          transform: translateX(200px);
        }
        .tile-enter-exit-active {
          transition-duration: ${motionDurationShort};
          transition-timing-function: ${motionEasingOut};
          transform: translateY(40%);
          opacity: 0;
        }
        .tile-show-hide-active {
          opacity: 0;
        }
        .tile-expand-active {
          height: 160px;
          transition: height;
          transition-duration: ${motionDurationModerate};
          transition-timing-function: ${motionEasingBase}
      `}</style>
      <Wrapper>
        <Heading>Moving</Heading>
        <MotionMoving onClick={(e) => onClick(e, 'tile-moving-active')}>play</MotionMoving>
        <Heading>Enter / Exit</Heading>
        <MotionEnterExit onClick={(e) => onClick(e, 'tile-enter-exit-active')}>play</MotionEnterExit>
        <Heading>Show / Hide</Heading>
        <MotionShowHide onClick={(e) => onClick(e, 'tile-show-hide-active')}>play</MotionShowHide>
        <Heading>Expand</Heading>
        <MotionExpand onClick={(e) => onClick(e, 'tile-expand-active')}>play</MotionExpand>
      </Wrapper>
    </>
  );
};
