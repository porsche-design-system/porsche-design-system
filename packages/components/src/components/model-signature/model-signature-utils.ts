import { MODEL_SIGNATURES_CDN_BASE_URL, MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/assets';

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

export const getSvgUrl = (model: ModelSignatureModel): string => {
  const cdnBaseUrl =
    ROLLUP_REPLACE_IS_STAGING === 'production'
      ? MODEL_SIGNATURES_CDN_BASE_URL
      : 'http://localhost:3001/model-signatures';
  return `${cdnBaseUrl}/${MODEL_SIGNATURES_MANIFEST[model]}`;
};
