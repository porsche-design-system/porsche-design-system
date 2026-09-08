import styled from '@emotion/styled';
import { proseTextSmStyle, radiusMd, spacingFluidMd, spacingStaticSm } from '@porsche-design-system/emotion';
import type { CustomTheme } from './emotionTheme.ts';

const EmotionColorWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: spacingFluidMd,
  padding: spacingFluidMd,
  ...proseTextSmStyle,
  color: theme.primary,
}));

const EmotionColorSwatches = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: spacingStaticSm,
});

const EmotionColorSwatchesItem = styled.div<{ bg: keyof CustomTheme }>(({ theme, bg }) => ({
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: radiusMd,
  border: `1px solid ${theme.contrastLow}`,
  backgroundColor: theme[bg],
}));

export const EmotionColor = () => {
  return (
    <EmotionColorWrapper>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="canvas" />
        <span>Canvas</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="surface" />
        <span>Surface</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="frosted" />
        <span>Frosted</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="frostedSoft" />
        <span>Frosted Soft</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="frostedStrong" />
        <span>Frosted Strong</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="backdrop" />
        <span>Backdrop</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="primary" />
        <span>Primary</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="contrastHigher" />
        <span>Contrast Higher</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="contrastHigh" />
        <span>Contrast High</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="contrastMedium" />
        <span>Contrast Medium</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="contrastLow" />
        <span>Contrast Low</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="contrastLower" />
        <span>Contrast Lower</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="info" />
        <span>Info</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="infoMedium" />
        <span>Info Medium</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="infoLow" />
        <span>Info Low</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="infoFrosted" />
        <span>Info Frosted</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="infoFrostedSoft" />
        <span>Info Frosted Soft</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="success" />
        <span>Success</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="successMedium" />
        <span>Success Medium</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="successLow" />
        <span>Success Low</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="successFrosted" />
        <span>Success Frosted</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="successFrostedSoft" />
        <span>Success Frosted Soft</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="warning" />
        <span>Warning</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="warningMedium" />
        <span>Warning Medium</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="warningLow" />
        <span>Warning Low</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="warningFrosted" />
        <span>Warning Frosted</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="warningFrostedSoft" />
        <span>Warning Frosted Soft</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="error" />
        <span>Error</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="errorMedium" />
        <span>Error Medium</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="errorLow" />
        <span>Error Low</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="errorFrosted" />
        <span>Error Frosted</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="errorFrostedSoft" />
        <span>Error Frosted Soft</span>
      </EmotionColorSwatches>
      <EmotionColorSwatches>
        <EmotionColorSwatchesItem bg="focus" />
        <span>Focus</span>
      </EmotionColorSwatches>
    </EmotionColorWrapper>
  );
};
