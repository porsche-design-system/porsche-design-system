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
import type { MouseEvent } from 'react';

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
  borderRadius: borderRadiusLarge,
  cursor: 'pointer',
  width: '200px',
  height: '100px',
};

const MotionMoving = styled.div({
  ...tileBaseStyle,
  transform: 'translateX(-200px)',
  transitionDuration: motionDurationShort,
  transitionTimingFunction: motionEasingBase,
});

const MotionEnterExit = styled.div({
  ...tileBaseStyle,
  transform: 'translateY(0px)',
  transitionDuration: motionDurationModerate,
  transitionTimingFunction: motionEasingIn,
});

const MotionShowHide = styled.div({
  ...tileBaseStyle,
  transitionDuration: motionDurationLong,
  transitionTimingFunction: motionEasingBase,
});

const MotionExpand = styled.div({
  ...tileBaseStyle,
  transition: 'height',
  transitionDuration: motionDurationShort,
  transitionTimingFunction: motionEasingIn,
});

export const StylesMotionExample = (): JSX.Element => {
  const onClick = (e: MouseEvent<HTMLDivElement>, className: string) =>
    (e.target as HTMLDivElement).classList.toggle(className);

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
          height: 200px;
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
