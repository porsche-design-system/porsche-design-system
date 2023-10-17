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
import { useState } from 'react';

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
const TileBase = styled.div({
  width: '200px',
  height: '100px',
  lineHeight: '100px',
  textAlign: 'center',
  color: themeLightPrimary,
  background: themeLightBackgroundSurface,
  borderRadius: borderRadiusLarge,
  cursor: 'pointer',
});

const MotionMoving = styled(TileBase)([], (props) => ({
  transform: 'translateX(-200px)',
  transition: `transform ${motionDurationShort} ${motionEasingBase}`,
  ...(props.active && {
    transform: 'translateX(200px)',
  }),
}));

const MotionEnterExit = styled(TileBase)([], (props) => ({
  transform: 'translateY(0px)',
  transitionProperty: 'opacity, transform',
  transitionDuration: motionDurationModerate,
  transitionTimingFunction: motionEasingIn,
  ...(props.active && {
    opacity: '0',
    transform: 'translateY(40%)',
    transitionProperty: 'opacity, transform',
    transitionDuration: motionDurationShort,
    transitionTimingFunction: motionEasingOut,
  }),
}));

const MotionShowHide = styled(TileBase)([], (props) => ({
  transition: `opacity ${motionDurationLong} ${motionEasingBase}`,
  ...(props.active && {
    opacity: '0',
  }),
}));

const MotionExpand = styled(TileBase)([], (props) => ({
  transition: `height ${motionDurationShort} ${motionEasingIn}`,
  ...(props.active && {
    height: '200px',
    transition: `height ${motionDurationModerate} ${motionEasingBase}`,
  }),
}));

export const StylesMotionExample = (): JSX.Element => {
  const [movingIsActive, setMovingIsActive] = useState(false);
  const [enterExitIsActive, setEnterExitIsActive] = useState(false);
  const [showHideIsActive, setShowHideIsActive] = useState(false);
  const [expandIsActive, setExpandIsActive] = useState(false);

  return (
    <>
      <Wrapper>
        <Heading>Moving</Heading>
        <MotionMoving active={movingIsActive} onClick={() => setMovingIsActive(!movingIsActive)}>
          play
        </MotionMoving>
        <Heading>Enter / Exit</Heading>
        <MotionEnterExit active={enterExitIsActive} onClick={() => setEnterExitIsActive(!enterExitIsActive)}>
          play
        </MotionEnterExit>
        <Heading>Show / Hide</Heading>
        <MotionShowHide active={showHideIsActive} onClick={() => setShowHideIsActive(!showHideIsActive)}>
          play
        </MotionShowHide>
        <Heading>Expand</Heading>
        <MotionExpand active={expandIsActive} onClick={() => setExpandIsActive(!expandIsActive)}>
          play
        </MotionExpand>
      </Wrapper>
    </>
  );
};
