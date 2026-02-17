import styled from '@emotion/styled';
import {
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
  proseTextSmStyle,
  radiusLg,
  spacingFluidMd,
  spacingFluidSm,
  spacingStaticMd,
} from '@porsche-design-system/emotion';

const EmotionMotionWrapper = styled.div(({ theme }) => ({
  display: 'grid',
  gap: spacingFluidMd,
  padding: spacingStaticMd,
  color: theme.primary,
  ...proseTextSmStyle,
}));

const baseItemStyle = ({ theme }: { theme: any }) => ({
  borderRadius: radiusLg,
  background: theme.surface,
  padding: spacingFluidSm,
  transitionProperty: 'transform',
  willChange: 'transform',
  cursor: 'pointer',
});

const EmotionMotionShort = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: durationSm,
  transitionTimingFunction: easeInOut,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionModerate = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: durationMd,
  transitionTimingFunction: easeInOut,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionLong = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: durationLg,
  transitionTimingFunction: easeInOut,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionVeryLong = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: durationXl,
  transitionTimingFunction: easeInOut,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionEaseInOut = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: durationXl,
  transitionTimingFunction: easeInOut,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionEaseIn = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: durationXl,
  transitionTimingFunction: easeIn,
  '&:hover': { transform: 'scale(1.2)' },
}));

const EmotionMotionEaseOut = styled.div(({ theme }) => ({
  ...baseItemStyle({ theme }),
  transitionDuration: durationXl,
  transitionTimingFunction: easeOut,
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
