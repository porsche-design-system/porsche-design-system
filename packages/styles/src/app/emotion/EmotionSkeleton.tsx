import styled from '@emotion/styled';
import {
  getSkeletonStyle,
  proseTextSmStyle,
  spacingFluidSm,
  spacingStaticMd,
  type Theme,
} from '@porsche-design-system/emotion';
import { useTheme } from '../../hooks/useTheme.ts';

const EmotionSkeletonWrapper = styled.div(({ theme }) => ({
  display: 'grid',
  gap: spacingFluidSm,
  padding: spacingStaticMd,
  ...proseTextSmStyle,
  color: theme.primary,
}));

const EmotionSkeletonItem = styled.span<{ $themeMode: Theme }>(({ $themeMode }) => ({
  padding: spacingFluidSm,
  ...getSkeletonStyle({ theme: $themeMode }),
}));

export const EmotionSkeleton = () => {
  const { theme } = useTheme();
  return (
    <EmotionSkeletonWrapper>
      <EmotionSkeletonItem $themeMode={theme}>Skeleton</EmotionSkeletonItem>
    </EmotionSkeletonWrapper>
  );
};
