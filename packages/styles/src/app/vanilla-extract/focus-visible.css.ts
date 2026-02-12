import {
  getFocusVisibleStyle,
  radiusMd,
  spacingStaticMd,
  spacingStaticSm,
} from '@porsche-design-system/vanilla-extract';
import { style } from '@vanilla-extract/css';

export const vanillaExtractFocusVisibleWrapper = style({
  padding: spacingStaticMd,
});

export const vanillaExtractFocusVisibleButton = style({
  ...getFocusVisibleStyle(),
  borderRadius: radiusMd,
  padding: spacingStaticSm,
});
