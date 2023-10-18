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

const MotionMoving = styled(TileBase)((props: { active: boolean }) => ({
  transform: props.active ? 'translateX(200px)' : 'translateX(-200px)',
  transition: `transform ${motionDurationShort} ${motionEasingBase}`,
}));

const MotionEnterExit = styled(TileBase)((props: { active: boolean }) => ({
  transform: props.active ? 'translateY(40%)' : 'translateY(0px)',
  transition: props.active
    ? `opacity ${motionDurationShort} ${motionEasingOut}, transform ${motionDurationShort} ${motionEasingOut}`
    : `opacity ${motionDurationModerate} ${motionEasingIn}, transform ${motionDurationModerate} ${motionEasingIn}`,
  ...(props.active && {
    opacity: '0',
  }),
}));

const MotionShowHide = styled(TileBase)((props: { active: boolean }) => ({
  transition: `opacity ${motionDurationLong} ${motionEasingBase}`,
  ...(props.active && {
    opacity: '0',
  }),
}));

const MotionExpand = styled(TileBase)((props: { active: boolean }) => ({
  transition: props.active
    ? `height ${motionDurationModerate} ${motionEasingBase}`
    : `height ${motionDurationShort} ${motionEasingIn}`,
  ...(props.active && {
    height: '200px',
  }),
}));

export const StylesMotionExample = (): JSX.Element => {
  const [isMovingActive, setIsMovingActive] = useState(false);
  const [isEnterExitActive, setIsEnterExitActive] = useState(false);
  const [isShowHideActive, setIsShowHideActive] = useState(false);
  const [isExpandActive, setIsExpandActive] = useState(false);

  return (
    <>
      <Wrapper>
        <Heading>Moving</Heading>
        <MotionMoving active={isMovingActive} onClick={() => setIsMovingActive((prev) => !prev)}>
          play
        </MotionMoving>
        <Heading>Enter / Exit</Heading>
        <MotionEnterExit active={isEnterExitActive} onClick={() => setIsEnterExitActive((prev) => !prev)}>
          play
        </MotionEnterExit>
        <Heading>Show / Hide</Heading>
        <MotionShowHide active={isShowHideActive} onClick={() => setIsShowHideActive((prev) => !prev)}>
          play
        </MotionShowHide>
        <Heading>Expand</Heading>
        <MotionExpand active={isExpandActive} onClick={() => setIsExpandActive((prev) => !prev)}>
          play
        </MotionExpand>
      </Wrapper>
    </>
  );
};
