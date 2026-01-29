import styled from '@emotion/styled';
import {
  getMediaQueryMax,
  getMediaQueryMin,
  getMediaQueryMinMax,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/emotion';

const EmotionWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: spacingStaticMedium,
});

const EmotionMediaQueryMin = styled.p(({ theme }) => ({
  ...textSmallStyle,
  color: theme.primary,
  margin: 0,
  [getMediaQueryMin('xs')]: {
    '&::after': {
      content: '" xs"',
    },
  },
  [getMediaQueryMin('s')]: {
    '&::after': {
      content: '" sm"',
    },
  },
  [getMediaQueryMin('m')]: {
    '&::after': {
      content: '" md"',
    },
  },
  [getMediaQueryMin('l')]: {
    '&::after': {
      content: '" lg"',
    },
  },
  [getMediaQueryMin('xl')]: {
    '&::after': {
      content: '" xl"',
    },
  },
  [getMediaQueryMin('xxl')]: {
    '&::after': {
      content: '" 2xl"',
    },
  },
}));

const EmotionMediaQueryMax = styled.p(({ theme }) => ({
  ...textSmallStyle,
  color: theme.primary,
  margin: 0,
  [getMediaQueryMax('xxl')]: {
    '&::after': {
      content: '" 2xl"',
    },
  },
  [getMediaQueryMax('xl')]: {
    '&::after': {
      content: '" xl"',
    },
  },
  [getMediaQueryMax('l')]: {
    '&::after': {
      content: '" lg"',
    },
  },
  [getMediaQueryMax('m')]: {
    '&::after': {
      content: '" md"',
    },
  },
  [getMediaQueryMax('s')]: {
    '&::after': {
      content: '" sm"',
    },
  },
  [getMediaQueryMax('xs')]: {
    '&::after': {
      content: '" xs"',
    },
  },
}));

const EmotionMediaQueryMinMax = styled.p(({ theme }) => ({
  ...textSmallStyle,
  color: theme.primary,
  margin: 0,
  [getMediaQueryMinMax('xs', 's')]: {
    '&::after': {
      content: '" xs - sm"',
    },
  },
  [getMediaQueryMinMax('s', 'm')]: {
    '&::after': {
      content: '" sm - md"',
    },
  },
  [getMediaQueryMinMax('m', 'l')]: {
    '&::after': {
      content: '" md - lg"',
    },
  },
  [getMediaQueryMinMax('l', 'xl')]: {
    '&::after': {
      content: '" lg - xl"',
    },
  },
  [getMediaQueryMinMax('xl', 'xxl')]: {
    '&::after': {
      content: '" xl - 2xl"',
    },
  },
}));

export const EmotionMediaQuery = () => {
  return (
    <EmotionWrapper>
      <EmotionMediaQueryMin>Media Query Min:</EmotionMediaQueryMin>
      <EmotionMediaQueryMax>Media Query Max:</EmotionMediaQueryMax>
      <EmotionMediaQueryMinMax>Media Query Min Max:</EmotionMediaQueryMinMax>
    </EmotionWrapper>
  );
};
