import { buildIconUrl, getSvgContent } from '../../../src/components/icon/icon/icon-request';
import { cdn, svg } from '@porsche-design-system/icons';
import { IconName } from '../../../src/types';

describe('getSvgContent()', () => {

  const getIconUrl = (name: IconName) => `${cdn}/${svg[name]}`;
  const emptyIconUrl = 'https://cdn.ui.porsche.com/some-path/some-icon.svg';
  const undefinedUrl = undefined;

  it('should fetch valid svg icon from remote url', async () => {
    const result = await getSvgContent(getIconUrl('highway'));
    expect(result.startsWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" focusable="false">')).toBeTruthy();
  });

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
  });

  it('should return empty string for empty icon url', async () => {
    const result = await getSvgContent(emptyIconUrl);
    expect(result).toBe('');
  });

  it('should throw error if url is undefined', async () => {
    try {
      const result = getSvgContent(undefinedUrl);
      expect(true).toBe(false);
      // @ts-ignore
    } catch (e: Error) {
      expect(e.name).toEqual('Error')
    }
  });
});

describe('buildIconUrl()', () => {

  it('should return cdn url for icon name', () => {
    const cdnIconUrl = buildIconUrl('arrow-head-right');
    expect(cdnIconUrl).toEqual('https://cdn.ui.porsche.com/porsche-design-system/icons/arrow-head-right.min.490cb49eb241569ee5d537730ee9658f.svg');
  });

  it('should return source url of external source', () => {
    const source = 'https://some-icon-source.com/some-path/some-icon.svg';
    const cdnIconUrl = buildIconUrl(source);
    expect(cdnIconUrl).toEqual(source);
  });

  it('should return empty string if icon name is not in manifest', () => {
    const cdnIconUrl = buildIconUrl('arrow');
    expect(cdnIconUrl).toBe('');
  });

});

