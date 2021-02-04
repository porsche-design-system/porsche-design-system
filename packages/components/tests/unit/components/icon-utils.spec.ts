import { buildIconUrl, getSvgContent, isUrl } from '../../../src/components/icon/icon/icon-utils';
import { ICONS_CDN_BASE_URL, ICONS_MANIFEST } from '@porsche-design-system/assets';
import { IconName } from '../../../src/types';
import { camelCase } from 'change-case';

const DEFAULT_ICON_URL =
  'https://cdn.ui.porsche.com/porsche-design-system/icons/arrow-head-right.min.490cb49eb241569ee5d537730ee9658f.svg';

describe('getSvgContent()', () => {
  const getIconUrl = (name: IconName) => `${ICONS_CDN_BASE_URL}/${ICONS_MANIFEST[camelCase(name)]}`;
  const emptyIconUrl = 'https://cdn.ui.porsche.com/some-path/some-icon.svg';
  const undefinedUrl = undefined;

  /**
   * this can not be done with staging anymore, since while unit tests are running the assets are
   * not yet uploaded
   */
  // it('should fetch valid svg icon from remote url', async () => {
  //   const result = await getSvgContent(getIconUrl('highway'));
  //   expect(result.startsWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" focusable="false">')).toBeTruthy();
  // });

  it('should return previously fetched and cached icon', async () => {
    const iconUrl = getIconUrl('question');
    // @ts-ignore
    const spy = jest.spyOn(global, 'fetch');
    const result1 = await getSvgContent(iconUrl);
    expect(result1).not.toBe(undefined);
    expect(spy).toHaveBeenCalledTimes(1);

    const result2 = await getSvgContent(iconUrl);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result1).toEqual(result2);
    spy.mockRestore();
  });

  // make sure this test isn't the last of the describe block since the exception might break following tests
  it('should throw error if url is undefined', async () => {
    try {
      const result = getSvgContent(undefinedUrl);
      expect(true).toBe(false);
      // @ts-ignore
    } catch (e) {
      expect(e.name).toEqual('Error');
    }
  });

  it('should return empty string for empty icon url', async () => {
    const result = await getSvgContent(emptyIconUrl);
    expect(result).toBe('');
  });
});

describe('buildIconUrl()', () => {
  it('should return cdn url for icon name', () => {
    const cdnIconUrl = buildIconUrl('arrow-head-right');
    expect(cdnIconUrl).toEqual(DEFAULT_ICON_URL);
  });

  it('should return source url of external source', () => {
    const source = 'https://some-icon-source.com/some-path/some-icon.svg';
    const cdnIconUrl = buildIconUrl(source);
    expect(cdnIconUrl).toEqual(source);
  });

  it('should return default icon-url, if icon name is not in manifest', () => {
    const cdnIconUrl = buildIconUrl('arrow');
    expect(cdnIconUrl).toEqual(DEFAULT_ICON_URL);
  });
});

describe('isUrl', () => {
  it('should return true if url is valid', () => {
    expect(isUrl('https://cdn.ui.porsche.com/some-path/some-icon.svg')).toBe(true);
    expect(isUrl('./assets/some_icon.svg')).toBe(true);
    expect(isUrl('/some_icon.svg')).toBe(true);
  });

  it('should return false if url is invalid', () => {
    expect(isUrl('some_icon.svg')).toBe(false);
  });
});
