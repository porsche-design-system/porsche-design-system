import { getIconLinks } from '../../../src';
import { ICON_NAMES, IconNameCamelCase } from '@porsche-design-system/icons';
import { paramCase } from 'change-case';
import { transformToRegex } from '../helpers/shared';
import { render } from '@testing-library/react';

describe('getIconLinks()', () => {
  const getUrl = (iconName: IconNameCamelCase, cdn: string): string => {
    const topLevelDomain = cdn === 'auto' ? 'com' : 'cn';
    return `https://cdn.ui.porsche.${topLevelDomain}/porsche-design-system/icons/${paramCase(iconName)}.min.*.svg`;
  };

  const getIconUrlRegEx = (iconName: IconNameCamelCase, cdn: string = 'auto'): RegExp => {
    return transformToRegex(getUrl(iconName, cdn));
  };

  const getIconLinkRegEx = (
    iconName: IconNameCamelCase,
    cdn: string = 'auto',
    format: 'html' | 'jsx' = 'html'
  ): RegExp => {
    const link = `<link rel=prefetch href=${getUrl(iconName, cdn)} as=image type=image/svg+xml crossorigin${
      format === 'jsx' ? '=true' : ''
    }>`;
    return new RegExp(`${link.replace(/(\/|\.|\+)/g, '\\$1').replace(/\*/g, '[a-z0-9]+')}`);
  };

  it('should throw error on invalid icons parameter', () => {
    let error;
    try {
      getIconLinks({ icons: ['some-invalid-icon'] as any[] });
    } catch (e) {
      error = e.message;
    }

    expect(error).toContain('The following supplied icon names are invalid:');
    expect(error).toContain('some-invalid-icon');
  });

  describe('url with tag', () => {
    it('should return "arrowHeadRight" link by default', () => {
      const result = getIconLinks();
      expect(result).toMatch(getIconLinkRegEx('arrowHeadRight'));
    });

    it('should return default "arrowHeadRight" China CDN link', () => {
      const result = getIconLinks({ cdn: 'cn' });
      expect(result).toMatch(getIconLinkRegEx('arrowHeadRight', 'cn'));
    });

    it('should return multiple links', () => {
      const result = getIconLinks({ icons: ['truck', 'volumeUp', 'mobile'] });
      expect(result).toMatch(getIconLinkRegEx('truck'));
      expect(result).toMatch(getIconLinkRegEx('volumeUp'));
      expect(result).toMatch(getIconLinkRegEx('mobile'));
    });

    ICON_NAMES.forEach((iconName: IconNameCamelCase) => {
      it(`should return icon link for ['${iconName}']`, () => {
        const result = getIconLinks({ icons: [iconName] });
        expect(result).toMatch(getIconLinkRegEx(iconName));
      });
    });
  });

  describe('format jsx', () => {
    const getRenderedInnerHtml = (opts?: { icons?: IconNameCamelCase[] }): string => {
      const { icons = ['arrowHeadRight'] } = opts || {};

      const { container } = render(<>{getIconLinks({ icons, format: 'jsx' })}</>);
      return container.innerHTML.replace(/"/g, '');
    };

    it('should return "arrowHeadRight" link by default', () => {
      const { container } = render(<>{getIconLinks({ format: 'jsx' })}</>);
      const result = container.innerHTML.replace(/"/g, '');
      expect(result).toMatch(getIconLinkRegEx('arrowHeadRight', 'auto', 'jsx'));
    });

    it('should return multiple links', () => {
      const result = getRenderedInnerHtml({ icons: ['truck', 'volumeUp', 'mobile'] });

      expect(result).toMatch(getIconLinkRegEx('truck', 'auto', 'jsx'));
      expect(result).toMatch(getIconLinkRegEx('volumeUp', 'auto', 'jsx'));
      expect(result).toMatch(getIconLinkRegEx('mobile', 'auto', 'jsx'));
    });

    ICON_NAMES.forEach((iconName: IconNameCamelCase) => {
      it(`should return icon link for ['${iconName}']`, () => {
        const result = getRenderedInnerHtml({ icons: [iconName] });
        expect(result).toMatch(getIconLinkRegEx(iconName, 'auto', 'jsx'));
      });
    });
  });

  describe('url without tag', () => {
    it('should return "arrowHeadRight" url by default', () => {
      const result = getIconLinks({ withoutTags: true });

      expect(result.length).toBe(1);
      expect(result[0]).toMatch(getIconUrlRegEx('arrowHeadRight'));
    });

    it('should return default "arrowHeadRight" China CDN url', () => {
      const result = getIconLinks({ withoutTags: true, cdn: 'cn' });

      expect(result.length).toBe(1);
      expect(result[0]).toMatch(getIconUrlRegEx('arrowHeadRight', 'cn'));
    });

    it('should return multiple urls', () => {
      const result = getIconLinks({ withoutTags: true, icons: ['truck', 'volumeUp', 'mobile', 'arrowDoubleUp'] });

      expect(result.length).toBe(4);
      expect(result[0]).toMatch(getIconUrlRegEx('truck'));
      expect(result[1]).toMatch(getIconUrlRegEx('volumeUp'));
      expect(result[2]).toMatch(getIconUrlRegEx('mobile'));
      expect(result[3]).toMatch(getIconUrlRegEx('arrowDoubleUp'));
    });

    ICON_NAMES.forEach((iconName: IconNameCamelCase) => {
      it(`should return icon url for ['${iconName}']`, () => {
        const result = getIconLinks({ withoutTags: true, icons: [iconName] });

        expect(result.length).toBe(1);
        expect(result[0]).toMatch(getIconUrlRegEx(iconName));
      });
    });
  });
});
