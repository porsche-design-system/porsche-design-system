import { getFontLinks, getMetaIcons } from '../../../src';

fdescribe('getMetaIcons()', () => {
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
        '<meta name=msapplication-TileImage content=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/mstile-270x270.6003b0be8d72c03282c5e43a94cf713c.png>',
        '<link rel=icon type=image/png sizes=16x16 href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon-16x16.f47c62d49906f99ab4408d691f03ece7.png>',
        '<link rel=icon type=image/png sizes=32x32 href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon-32x32.10be24507223bc4ef63effe0eb750e58.png>',
        '<link rel=apple-touch-icon href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/apple-touch-icon-180x180.bdeb42142de51637d67f7532ead2caab.png>',
        '<link rel=mask-icon color=#FFFFFF href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/pinned-tab-icon.e2eea3d0fb56b5faf6b84c590f19572b.svg>',
      ].join('');

      const result = getMetaIcons({ appTitle: 'Porsche UX' });
      expect(result).toBe(metaIconsResult);
    });

    it('should return default China CDN link', () => {
      const metaIconsResultCN = [
        '<meta name=theme-color content=#FFFFFF>',
        '<meta name=apple-mobile-web-app-capable content=yes>',
        '<meta name=apple-mobile-web-app-status-bar-style content=white>',
        '<meta name=apple-mobile-web-app-title content="Porsche UX">',
        '<meta name=msapplication-TileImage content=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/mstile-270x270.6003b0be8d72c03282c5e43a94cf713c.png>',
        '<link rel=icon type=image/png sizes=16x16 href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon-16x16.f47c62d49906f99ab4408d691f03ece7.png>',
        '<link rel=icon type=image/png sizes=32x32 href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon-32x32.10be24507223bc4ef63effe0eb750e58.png>',
        '<link rel=apple-touch-icon href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/apple-touch-icon-180x180.bdeb42142de51637d67f7532ead2caab.png>',
        '<link rel=mask-icon color=#FFFFFF href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/pinned-tab-icon.e2eea3d0fb56b5faf6b84c590f19572b.svg>',
      ].join('');

      const result = getMetaIcons({ appTitle: 'Porsche UX', cdn: 'cn' });
      expect(result).toBe(metaIconsResultCN);
    });
  });
});
