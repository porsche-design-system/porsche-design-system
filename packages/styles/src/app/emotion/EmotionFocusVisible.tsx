import styled from '@emotion/styled';
import { getFocusVisibleStyle, radiusMd, spacingStaticMd, spacingStaticSm } from '@porsche-design-system/emotion';

const EmotionFocusVisibleWrapper = styled.div({
  padding: spacingStaticMd,
});

const EmotionFocusVisibleButton = styled.button({
  ...getFocusVisibleStyle(),
  borderRadius: radiusMd,
  padding: spacingStaticSm,
});

export const EmotionFocusVisible = () => {
  return (
    <EmotionFocusVisibleWrapper>
      <EmotionFocusVisibleButton type="button">Focus Visible</EmotionFocusVisibleButton>
    </EmotionFocusVisibleWrapper>
  );
};
