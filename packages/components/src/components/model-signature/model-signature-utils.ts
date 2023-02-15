export const MODEL_SIGNATURE_SIZES = ['small', 'medium', 'inherit'] as const;
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
] as const;
export type ModelSignatureModel = typeof MODEL_SIGNATURE_MODELS[number];
