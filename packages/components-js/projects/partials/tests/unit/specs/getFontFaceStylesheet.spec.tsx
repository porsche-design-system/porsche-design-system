import { getFontFaceStylesheet } from '../../../src';
import { render } from '@testing-library/react';
import { getCdnBaseUrl, transformToRegex } from '../helpers/shared';

describe('getFontFaceStylesheet()', () => {
  const getUrl = (cdn: string = 'auto'): string => {
    const suffix = cdn === 'auto' ? '' : '.cn';
    return `${getCdnBaseUrl(cdn)}/porsche-design-system/styles/font-face.min${suffix}.*.css`;
  };

  const getExpectedPartialResultStringRegEx = (cdn: string = 'auto', format: string = 'html') => {
    return transformToRegex(
      `<link rel=preconnect href=${getCdnBaseUrl(cdn)} crossorigin${
        format === 'jsx' ? '=true' : ''
      }><link rel=dns-prefetch href=${getCdnBaseUrl(cdn)} crossorigin${
        format === 'jsx' ? '=true' : ''
      }><link rel=stylesheet href=${getUrl(cdn)} type=text/css crossorigin${format === 'jsx' ? '=true' : ''}>`
    );
  };

  it('should return links with preconnect, dns-prefetch and FONT_FACE_STYLE_CDN_URL', () => {
    const result = getFontFaceStylesheet();
    expect(result).toMatch(getExpectedPartialResultStringRegEx());
  });

  it('should return only href', () => {
    const result = getFontFaceStylesheet({ withoutTags: true });
    expect(result).toMatch(transformToRegex(getUrl()));
  });

  it('should be minified', () => {
    const result = getFontFaceStylesheet();
    expect(result).not.toContain('"');
    expect(result).not.toContain("'");
  });

  it('should return multiple jsx links', () => {
    const { container } = render(<>{getFontFaceStylesheet({ format: 'jsx' })}</>);
    const result = container.innerHTML.replace(/"/g, '');
    expect(result).toMatch(getExpectedPartialResultStringRegEx('auto', 'jsx'));
  });

  describe('option: { cdn: "cn" }', () => {
    const cdn = 'cn';

    it('should return links with preconnect, dns-prefetch and FONT_FACE_STYLE_CDN_URL for china cdn', () => {
      const result = getFontFaceStylesheet({ cdn });
      expect(result).toMatch(getExpectedPartialResultStringRegEx(cdn));
    });

    it('should return only href for china cdn', () => {
      const result = getFontFaceStylesheet({ withoutTags: true, cdn });
      expect(result).toMatch(transformToRegex(getUrl(cdn)));
    });

    it('should return multiple jsx links for china cdn', () => {
      const { container } = render(<>{getFontFaceStylesheet({ cdn, format: 'jsx' })}</>);
      const result = container.innerHTML.replace(/"/g, '');
      expect(result).toMatch(getExpectedPartialResultStringRegEx(cdn, 'jsx'));
    });
  });
});
