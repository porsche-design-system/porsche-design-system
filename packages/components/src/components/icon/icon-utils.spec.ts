import { buildIconUrl, isUrl } from './icon-utils';

const DEFAULT_ICON_URL =
  'https://cdn.ui.porsche.com/porsche-design-system/icons/arrow-right.min.8fb7b42d2d08d60f918602aa28475c0b.svg';

describe('buildIconUrl()', () => {
  it('should return cdn url for icon name', () => {
    const cdnIconUrl = buildIconUrl('arrow-right');
    expect(cdnIconUrl).toEqual(DEFAULT_ICON_URL);
  });

  it('should return source url of external source', () => {
    const source = 'https://some-icon-source.com/some-path/some-icon.svg';
    const cdnIconUrl = buildIconUrl(source);
    expect(cdnIconUrl).toEqual(source);
  });

  it('should return default icon-url if icon name is not in manifest', () => {
    const cdnIconUrl = buildIconUrl('arrow');
    expect(cdnIconUrl).toEqual(DEFAULT_ICON_URL);
  });
});

describe('isUrl()', () => {
  it('should return true if url is valid', () => {
    expect(isUrl('https://cdn.ui.porsche.com/some-path/some-icon.svg')).toBe(true);
    expect(isUrl('./assets/some_icon.svg')).toBe(true);
    expect(isUrl('/some_icon.svg')).toBe(true);
  });

  it('should return false if url is invalid', () => {
    expect(isUrl('some_icon.svg')).toBe(false);
  });
});
