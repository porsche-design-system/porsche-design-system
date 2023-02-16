export const MODEL_SIGNATURE_SIZES = ['small', 'inherit'] as const;
export type ModelSignatureSize = typeof MODEL_SIGNATURE_SIZES[number];

export const MODEL_SIGNATURE_MODELS = [
  '718',
  '911',
  'boxster',
  'cayenne',
  'cayman',
  'macan',
  'panamera',
  'taycan',
  'turbo',
  'turbo-s',
] as const;
export type ModelSignatureModel = typeof MODEL_SIGNATURE_MODELS[number];

export const MODEL_SIGNATURE_COLORS = [
  'primary',
  'contrast-low',
  'contrast-medium',
  'contrast-high',
  'inherit',
] as const;
export type ModelSignatureColor = typeof MODEL_SIGNATURE_COLORS[number];
