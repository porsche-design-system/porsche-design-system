import { MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/model-signatures'; // TODO: import from assets once it is treeshakable
import { getCDNBaseURL } from '../../utils';

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
  return `${getCDNBaseURL()}/model-signatures/${MODEL_SIGNATURES_MANIFEST[model]}`;
};

export const modelSignatureHeight = 36;
