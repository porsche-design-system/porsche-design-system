import type { FlagName } from '../../types';
import { buildFlagUrl } from './flag-utils';

const DE_FLAG_URL = 'https://cdn.ui.porsche.com/porsche-design-system/flags/de.b575e11.svg';
const US_FLAG_URL = 'https://cdn.ui.porsche.com/porsche-design-system/flags/us.10d7b02.svg';
const UNKNOWN_FLAG_URL = 'https://cdn.ui.porsche.com/porsche-design-system/flags/xx.acc7ae8.svg';

describe('buildFlagUrl()', () => {
  it('should return cdn url for "us" flag name', () => {
    const cdnFlagUrl = buildFlagUrl('us');
    expect(cdnFlagUrl).toEqual(US_FLAG_URL);
  });

  it('should return cdn url for "de" flag name', () => {
    const cdnFlagUrl = buildFlagUrl('de');
    expect(cdnFlagUrl).toEqual(DE_FLAG_URL);
  });

  it('should return unknown flag url if flag name is not in manifest', () => {
    const cdnFlagUrl = buildFlagUrl('xyz' as FlagName);
    expect(cdnFlagUrl).toEqual(UNKNOWN_FLAG_URL);
  });
});
