import styled from '@emotion/styled';
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
} from '@porsche-design-system/components-react/emotion';
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
const TileBase = styled.div`
  width: 200px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: ${themeLightPrimary};
  background: ${themeLightBackgroundSurface};
  border-radius: ${borderRadiusLarge};
  cursor: pointer;
`;

const MotionMoving = styled(TileBase)<{ active: boolean }>`
  transform: ${(props) => (props.active ? 'translateX(200px)' : 'translateX(-200px)')};
  transition: transform ${motionDurationShort} ${motionEasingBase};
`;

const MotionEnterExit = styled(TileBase)<{ active: boolean }>`
  transform: ${(props) => (props.active ? 'translateY(40%)' : 'translateY(0px)')};
  transition: ${(props) =>
    props.active
      ? `opacity ${motionDurationShort} ${motionEasingOut}, transform ${motionDurationShort} ${motionEasingOut}`
      : `opacity ${motionDurationModerate} ${motionEasingIn}, transform ${motionDurationModerate} ${motionEasingIn}`};
  opacity: ${(props) => (props.active ? '0' : '1')};
`;

const MotionShowHide = styled(TileBase)<{ active: boolean }>`
  transition: opacity ${motionDurationLong} ${motionEasingBase};
  opacity: ${(props) => (props.active ? '0' : '1')};
`;

const MotionExpand = styled(TileBase)<{ active: boolean }>`
  transition: ${(props) =>
    props.active
      ? `height ${motionDurationModerate} ${motionEasingBase}`
      : `height ${motionDurationShort} ${motionEasingIn}`};
  height: ${(props) => (props.active ? '200px' : 'auto')};
`;

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
