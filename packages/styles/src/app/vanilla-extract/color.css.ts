import {
  borderRadiusMedium,
  spacingFluidMedium,
  spacingStaticSmall,
  textSmallStyle,
} from '@porsche-design-system/vanilla-extract';
import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const colorWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: spacingFluidMedium,
  padding: spacingFluidMedium,
  ...textSmallStyle,
  color: vars.primary,
});

export const colorSwatches = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacingStaticSmall,
});

const swatchBase = style({
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: borderRadiusMedium,
  border: `1px solid ${vars.contrastLow}`,
});

export const colorSwatchesItem = styleVariants({
  canvas: [swatchBase, { backgroundColor: vars.canvas }],
  surface: [swatchBase, { backgroundColor: vars.surface }],
  frosted: [swatchBase, { backgroundColor: vars.frosted }],
  frostedSoft: [swatchBase, { backgroundColor: vars.frostedSoft }],
  backdrop: [swatchBase, { backgroundColor: vars.backdrop }],
  primary: [swatchBase, { backgroundColor: vars.primary }],
  contrastHigher: [swatchBase, { backgroundColor: vars.contrastHigher }],
  contrastHigh: [swatchBase, { backgroundColor: vars.contrastHigh }],
  contrastMedium: [swatchBase, { backgroundColor: vars.contrastMedium }],
  contrastLow: [swatchBase, { backgroundColor: vars.contrastLow }],
  contrastLower: [swatchBase, { backgroundColor: vars.contrastLower }],
  info: [swatchBase, { backgroundColor: vars.info }],
  infoMedium: [swatchBase, { backgroundColor: vars.infoMedium }],
  infoLow: [swatchBase, { backgroundColor: vars.infoLow }],
  infoFrosted: [swatchBase, { backgroundColor: vars.infoFrosted }],
  infoFrostedSoft: [swatchBase, { backgroundColor: vars.infoFrostedSoft }],
  success: [swatchBase, { backgroundColor: vars.success }],
  successMedium: [swatchBase, { backgroundColor: vars.successMedium }],
  successLow: [swatchBase, { backgroundColor: vars.successLow }],
  successFrosted: [swatchBase, { backgroundColor: vars.successFrosted }],
  successFrostedSoft: [swatchBase, { backgroundColor: vars.successFrostedSoft }],
  warning: [swatchBase, { backgroundColor: vars.warning }],
  warningMedium: [swatchBase, { backgroundColor: vars.warningMedium }],
  warningLow: [swatchBase, { backgroundColor: vars.warningLow }],
  warningFrosted: [swatchBase, { backgroundColor: vars.warningFrosted }],
  warningFrostedSoft: [swatchBase, { backgroundColor: vars.warningFrostedSoft }],
  error: [swatchBase, { backgroundColor: vars.error }],
  errorMedium: [swatchBase, { backgroundColor: vars.errorMedium }],
  errorLow: [swatchBase, { backgroundColor: vars.errorLow }],
  errorFrosted: [swatchBase, { backgroundColor: vars.errorFrosted }],
  errorFrostedSoft: [swatchBase, { backgroundColor: vars.errorFrostedSoft }],
  focus: [swatchBase, { backgroundColor: vars.focus }],
});
