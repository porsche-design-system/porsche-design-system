import styled from '@emotion/styled';
import {
  getSkeletonStyle,
  spacingFluidSmall,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/emotion';
import { useTheme } from '../../hooks/useTheme.ts';

const EmotionSkeletonWrapper = styled.div(({ theme }) => ({
  display: 'grid',
  gap: spacingFluidSmall,
  padding: spacingStaticMedium,
  ...textSmallStyle,
  color: theme.primary,
}));

const EmotionSkeletonItem = styled.span<{ $themeMode: 'light' | 'dark' }>(({ $themeMode }) => ({
  padding: spacingFluidSmall,
  ...getSkeletonStyle({ theme: $themeMode }),
}));

export const EmotionSkeleton = () => {
  const { theme } = useTheme();
  const resolvedTheme =
    theme === 'auto' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
  return (
    <EmotionSkeletonWrapper>
      <EmotionSkeletonItem $themeMode={resolvedTheme}>Skeleton</EmotionSkeletonItem>
    </EmotionSkeletonWrapper>
  );
};
