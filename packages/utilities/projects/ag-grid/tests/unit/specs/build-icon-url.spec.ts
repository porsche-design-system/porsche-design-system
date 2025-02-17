import { buildIconUrl } from '../../../src/utils';

const DEFAULT_ICON_URL = 'https://cdn.ui.porsche.com/porsche-design-system/icons/arrow-right.872716b.svg';

describe('buildIconUrl()', () => {
  it('should return cdn url for icon name', () => {
    const cdnIconUrl = buildIconUrl('arrow-right');
    expect(cdnIconUrl).toEqual(DEFAULT_ICON_URL);
  });
});
