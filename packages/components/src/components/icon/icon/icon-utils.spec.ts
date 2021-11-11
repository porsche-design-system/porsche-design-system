import { ICONS_CDN_BASE_URL, ICONS_MANIFEST } from '@porsche-design-system/assets';
import { buildIconUrl, getSvgContent, ICON_ARIA_ATTRIBUTES, isUrl, patchAriaIntoSVG } from './icon-utils';
import { IconName } from '../../../types';
import { camelCase } from 'change-case';
import * as a11yUtils from '../../../utils/a11y';
import { parseAndGetAriaAttributes } from '../../../utils/a11y';

const DEFAULT_ICON_URL =
  'https://cdn.ui.porsche.com/porsche-design-system/icons/arrow-head-right.min.e628b114aa820496721ee35a21a0683b.svg';

describe('getSvgContent()', () => {
  const getIconUrl = (name: IconName) => `${ICONS_CDN_BASE_URL}/${ICONS_MANIFEST[camelCase(name)]}`;
  const emptyIconUrl = 'https://cdn.ui.porsche.com/some-path/some-icon.svg';

  it('should return previously fetched and cached icon', async () => {
    const iconUrl = getIconUrl('question');
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
    let error;
    try {
      await getSvgContent(undefined);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual('url is undefined');
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

describe('patchAccessibilityIntoSVG()', () => {
  const svgContent = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"></svg>';
  const rawAttributes = "{ aria-label: 'Some label' }";

  it('should call parseAndGetAccessibilityAttributes()', () => {
    const spy = jest.spyOn(a11yUtils, 'parseAndGetAriaAttributes');

    patchAriaIntoSVG('', rawAttributes);
    expect(spy).toHaveBeenCalledWith(rawAttributes, ICON_ARIA_ATTRIBUTES);
  });

  it.each(ICON_ARIA_ATTRIBUTES)('should return patched content for %s', (ariaAttribute) => {
    expect(patchAriaIntoSVG(svgContent, { [ariaAttribute]: 'Some value' })).toMatchSnapshot();
  });

  it.each<string>([undefined, ''])('should return unmodified content for %o', (rawAttributes) => {
    expect(patchAriaIntoSVG(svgContent, rawAttributes)).toEqual(svgContent);
  });
});
