import { getSvgUrl, MODEL_SIGNATURE_MODELS } from './model-signature-utils';
import type { ModelSignatureModel } from './model-signature-utils';
import { MODEL_SIGNATURES_MANIFEST } from '@porsche-design-system/model-signatures';

describe('MODEL_SIGNATURE_MODELS', () => {
  it('should contain all keys of MODEL_SIGNATURES_MANIFEST', () => {
    expect(MODEL_SIGNATURE_MODELS).toEqual(Object.keys(MODEL_SIGNATURES_MANIFEST));
  });
});

const getUrlRegex = (model: ModelSignatureModel): RegExp =>
  new RegExp(
    `^https:\/\/cdn\\.ui\\.porsche\\.com\/porsche-design-system\/model-signatures\/${model}\\.min\\.[a-z0-9]{32}\\.svg$`
  );

describe('getSvgUrl()', () => {
  it.each<ModelSignatureModel>(MODEL_SIGNATURE_MODELS)('should return correct cdn url for model: %s', (model) => {
    expect(getSvgUrl(model)).toMatch(getUrlRegex(model));
  });
});
