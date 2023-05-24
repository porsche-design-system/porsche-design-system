import { MODEL_SIGNATURES_CDN_BASE_URL, MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/assets';

export const MODEL_SIGNATURE_SIZES = ['small', 'inherit'] as const;
export type ModelSignatureSize = (typeof MODEL_SIGNATURE_SIZES)[number];

export const MODEL_SIGNATURE_MODELS = Object.keys(MODEL_SIGNATURES_MANIFEST) as ModelSignatureModel[];
export type ModelSignatureModel = keyof typeof MODEL_SIGNATURES_MANIFEST;

export const MODEL_SIGNATURE_COLORS = [
  'primary',
  'contrast-low',
  'contrast-medium',
  'contrast-high',
  'inherit',
] as const;
export type ModelSignatureColor = (typeof MODEL_SIGNATURE_COLORS)[number];

export const getSvgUrl = (model: ModelSignatureModel): string => {
  const cdnBaseUrl =
    ROLLUP_REPLACE_IS_STAGING === 'production'
      ? MODEL_SIGNATURES_CDN_BASE_URL
      : 'http://localhost:3001/model-signatures';
  return `${cdnBaseUrl}/${MODEL_SIGNATURES_MANIFEST[model]}`;
};

export const modelSignatureHeight = 36;
