import styled from '@emotion/styled';
import {
  borderRadiusLarge,
  motionDurationLong,
  motionDurationModerate,
  motionDurationShort,
  motionDurationVeryLong,
  motionEasingBase,
  motionEasingIn,
  motionEasingOut,
  spacingFluidMedium,
  spacingFluidSmall,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/emotion';

const EmotionMotionWrapper = styled.div(({ theme }) => ({
  display: 'grid',
  gap: spacingFluidMedium,
  padding: spacingStaticMedium,
  color: theme.primary,
  ...textSmallStyle,
}));

const baseItemStyle = ({ theme }: { theme: any }) => ({
  borderRadius: borderRadiusLarge,
  background: theme.surface,
  padding: spacingFluidSmall,
  transitionProperty: 'transform',
  willChange: 'transform',
  cursor: 'pointer',
});

const EmotionMotionShort = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: `${motionDurationShort}`,
  transitionTimingFunction: `${motionEasingBase}`,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionModerate = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: `${motionDurationModerate}`,
  transitionTimingFunction: `${motionEasingBase}`,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionLong = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: `${motionDurationLong}`,
  transitionTimingFunction: `${motionEasingBase}`,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionVeryLong = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: `${motionDurationVeryLong}`,
  transitionTimingFunction: `${motionEasingBase}`,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionEaseInOut = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: `${motionDurationVeryLong}`,
  transitionTimingFunction: `${motionEasingBase}`,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionEaseIn = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: `${motionDurationVeryLong}`,
  transitionTimingFunction: `${motionEasingIn}`,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionEaseOut = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: `${motionDurationVeryLong}`,
  transitionTimingFunction: `${motionEasingOut}`,
  '&:hover': { transform: 'scale(1.2)' },
}));

export const EmotionMotion = () => (
  <EmotionMotionWrapper>
    <EmotionMotionShort>Duration Short</EmotionMotionShort>
    <EmotionMotionModerate>Duration Moderate</EmotionMotionModerate>
    <EmotionMotionLong>Duration Long</EmotionMotionLong>
    <EmotionMotionVeryLong>Duration Very Long</EmotionMotionVeryLong>
    <EmotionMotionEaseInOut>Ease In Out</EmotionMotionEaseInOut>
    <EmotionMotionEaseIn>Ease In</EmotionMotionEaseIn>
    <EmotionMotionEaseOut>Ease Out</EmotionMotionEaseOut>
  </EmotionMotionWrapper>
);
