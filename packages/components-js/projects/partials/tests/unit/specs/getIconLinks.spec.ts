import { getIconLinks } from '../../../src';
import { ICON_NAMES, IconNameCamelCase } from '@porsche-design-system/icons';
import { paramCase } from 'change-case';

describe('getIconLinks()', () => {
  const getUrl = (iconName: IconNameCamelCase, cdn: string): string => {
    const topLevelDomain = cdn === 'auto' ? 'com' : 'cn';
    return `https://cdn.ui.porsche.${topLevelDomain}/porsche-design-system/icons/${paramCase(iconName)}.min.*.svg`;
  };

  const getIconUrlRegEx = (iconName: IconNameCamelCase, cdn: string = 'auto'): RegExp => {
    return new RegExp(
      `${getUrl(iconName, cdn)
        .replace(/(\/|\.|\+)/g, '\\$1')
        .replace(/\*/g, '[a-z0-9]+')}`
    );
  };
  const getIconLinkRegEx = (iconName: IconNameCamelCase, cdn: string = 'auto'): RegExp => {
    const link = `<link rel=prefetch href=${getUrl(iconName, cdn)} as=image type=image/svg+xml crossorigin>`;
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
    it('should return "arrowHeadRight" link by default', () => {
      const result = getIconLinks();
      expect(result).toMatch(getIconLinkRegEx('arrowHeadRight'));
    });

    it('should return multiple links', () => {
      const result = getIconLinks({ format: 'jsx', icons: ['truck', 'volumeUp', 'mobile'] });
      result.forEach((element) => {
        // href is variable due to hash and cant be overwritten so we clone the element
        const link = { ...element, props: { ...element.props, href: getUrl('truck', 'auto') } };
        expect(link).toMatchSnapshot();
      });
    });

    ICON_NAMES.forEach((iconName: IconNameCamelCase) => {
      it(`should return icon link for ['${iconName}']`, () => {
        const result = getIconLinks({ format: 'jsx', icons: [iconName] });
        result.forEach((element) => {
          // href is variable due to hash and cant be overwritten so we clone the element
          const link = { ...element, props: { ...element.props, href: getUrl(iconName, 'auto') } };
          expect(link).toMatchSnapshot();
        });
      });
    });
  });

  describe('url without tag', () => {
    let consoleWarnSpy;

    beforeEach(() => (consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => {})));
    afterEach(() => jest.clearAllMocks());

    it('should return "arrowHeadRight" url by default', () => {
      const result = getIconLinks({ withoutTags: true });

      expect(consoleWarnSpy).toBeCalledWith(
        'The option "{ withoutTags: true }" of partial getIconLinks() is deprecated and will be removed in v3'
      );

      expect(result.length).toBe(1);
      expect(result[0]).toMatch(getIconUrlRegEx('arrowHeadRight'));
    });

    it('should return default "arrowHeadRight" China CDN url', () => {
      const result = getIconLinks({ withoutTags: true, cdn: 'cn' });

      expect(consoleWarnSpy).toBeCalledWith(
        'The option "{ withoutTags: true }" of partial getIconLinks() is deprecated and will be removed in v3'
      );

      expect(result.length).toBe(1);
      expect(result[0]).toMatch(getIconUrlRegEx('arrowHeadRight', 'cn'));
    });

    it('should return multiple urls', () => {
      const result = getIconLinks({ withoutTags: true, icons: ['truck', 'volumeUp', 'mobile', 'arrowDoubleUp'] });

      expect(consoleWarnSpy).toBeCalledWith(
        'The option "{ withoutTags: true }" of partial getIconLinks() is deprecated and will be removed in v3'
      );

      expect(result.length).toBe(4);
      expect(result[0]).toMatch(getIconUrlRegEx('truck'));
      expect(result[1]).toMatch(getIconUrlRegEx('volumeUp'));
      expect(result[2]).toMatch(getIconUrlRegEx('mobile'));
      expect(result[3]).toMatch(getIconUrlRegEx('arrowDoubleUp'));
    });

    ICON_NAMES.forEach((iconName: IconNameCamelCase) => {
      it(`should return icon url for ['${iconName}']`, () => {
        const result = getIconLinks({ withoutTags: true, icons: [iconName] });

        expect(consoleWarnSpy).toBeCalledWith(
          'The option "{ withoutTags: true }" of partial getIconLinks() is deprecated and will be removed in v3'
        );

        expect(result.length).toBe(1);
        expect(result[0]).toMatch(getIconUrlRegEx(iconName));
      });
    });
  });
});
