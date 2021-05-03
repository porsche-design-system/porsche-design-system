import { getMetaIcons } from '../../../src';

describe('getMetaIcons()', () => {
  const convertToRegex = (link: string): RegExp => {
    return new RegExp(`^${link.replace(/(\/|\.)/g, '\\$1').replace(/\*/g, '[a-z0-9]+')}$`);
  };

  describe('validation', () => {
    it('should throw error on unprovided appTitle', () => {
      let error;
      try {
        getMetaIcons();
      } catch (e) {
        error = e.message;
      }

      expect(error).toContain(
        'Option "appTitle" is required to output "<meta name="apple-mobile-web-app-title" content="appTitle" />'
      );
    });
  });

  describe('url with tag', () => {
    it('should return default link', () => {
      const metaIconsResult = [
        '<meta name=theme-color content=#FFFFFF>',
        '<meta name=apple-mobile-web-app-capable content=yes>',
        '<meta name=apple-mobile-web-app-status-bar-style content=white>',
        '<meta name=apple-mobile-web-app-title content="Porsche UX">',
        '<meta name=msapplication-TileImage content=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/mstile-270x270.*.png>',
        '<meta name=msapplication-TileColor content=#FFFFFF>',
        '<link rel=icon type=image/png sizes=16x16 href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon-16x16.*.png>',
        '<link rel=icon type=image/png sizes=32x32 href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon-32x32.*.png>',
        '<link rel=apple-touch-icon href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/apple-touch-icon-180x180.*.png>',
        '<link rel=mask-icon color=#FFFFFF href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/pinned-tab-icon.*.svg>',
      ].join('');

      const result = getMetaIcons({ appTitle: 'Porsche UX' });
      expect(result).toMatch(convertToRegex(metaIconsResult));
    });

    it('should return default China CDN link', () => {
      const metaIconsResultCN = [
        '<meta name=theme-color content=#FFFFFF>',
        '<meta name=apple-mobile-web-app-capable content=yes>',
        '<meta name=apple-mobile-web-app-status-bar-style content=white>',
        '<meta name=apple-mobile-web-app-title content="Porsche UX">',
        '<meta name=msapplication-TileImage content=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/mstile-270x270.*.png>',
        '<meta name=msapplication-TileColor content=#FFFFFF>',
        '<link rel=icon type=image/png sizes=16x16 href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon-16x16.*.png>',
        '<link rel=icon type=image/png sizes=32x32 href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon-32x32.*.png>',
        '<link rel=apple-touch-icon href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/apple-touch-icon-180x180.*.png>',
        '<link rel=mask-icon color=#FFFFFF href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/pinned-tab-icon.*.svg>',
      ].join('');

      const result = getMetaIcons({ appTitle: 'Porsche UX', cdn: 'cn' });
      expect(result).toMatch(convertToRegex(metaIconsResultCN));
    });
  });
  describe('url without tag', () => {
    it('should return default url', () => {
      const cndMetaIconUrls = [
        'https://cdn.ui.porsche.com/porsche-design-system/meta-icons/mstile-270x270.*.png',
        'https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon-16x16.*.png',
        'https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon-32x32.*.png',
        'https://cdn.ui.porsche.com/porsche-design-system/meta-icons/apple-touch-icon-180x180.*.png',
        'https://cdn.ui.porsche.com/porsche-design-system/meta-icons/pinned-tab-icon.*.svg',
      ];
      const result = getMetaIcons({ appTitle: 'Porsche UX', withoutTags: true });
      result.forEach((item, index) => {
        expect(item).toMatch(convertToRegex(cndMetaIconUrls[index]));
      });
    });

    it('should return default China CDN url', () => {
      const cndMetaIconUrlsCn = [
        'https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/mstile-270x270.*.png',
        'https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon-16x16.*.png',
        'https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon-32x32.*.png',
        'https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/apple-touch-icon-180x180.*.png',
        'https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/pinned-tab-icon.*.svg',
      ];
      const result = getMetaIcons({ appTitle: 'Porsche UX', withoutTags: true, cdn: 'cn' });
      result.forEach((item, index) => {
        expect(item).toMatch(convertToRegex(cndMetaIconUrlsCn[index]));
      });
    });
  });
});
