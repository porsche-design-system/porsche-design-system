import styled from '@emotion/styled';
import { getSkeletonStyle, proseTextSmStyle, spacingFluidSm, spacingStaticMd } from '@porsche-design-system/emotion';

const EmotionSkeletonWrapper = styled.div(({ theme }) => ({
  display: 'grid',
  gap: spacingFluidSm,
  padding: spacingStaticMd,
  ...proseTextSmStyle,
  color: theme.primary,
}));

const EmotionSkeletonItem = styled.span({
  padding: spacingFluidSm,
  ...getSkeletonStyle(),
});

export const EmotionSkeleton = () => {
  return (
    <EmotionSkeletonWrapper>
      <EmotionSkeletonItem>Skeleton</EmotionSkeletonItem>
    </EmotionSkeletonWrapper>
  );
};
