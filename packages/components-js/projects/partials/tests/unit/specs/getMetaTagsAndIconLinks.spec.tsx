import { getMetaTagsAndIconLinks } from '../../../src';
import { render } from '@testing-library/react';
import { transformToRegex } from '../helpers/shared';

describe('getMetaTagsAndIconLinks()', () => {
  const convertToRegex = (link: string): RegExp => {
    return new RegExp(`^${link.replace(/(\/|\.)/g, '\\$1').replace(/\*/g, '[a-z0-9]+')}$`);
  };

  describe('validation', () => {
    it('should throw error on unprovided appTitle', () => {
      expect(() => getMetaTagsAndIconLinks()).toThrowErrorMatchingInlineSnapshot(
        '"Option \\"appTitle\\" is required to output \\"<meta name=\\"apple-mobile-web-app-title\\" content=\\"appTitle\\" />"'
      );
    });
  });

  it('should return default link', () => {
    const expectedResult = [
      '<meta name=theme-color content=#FFFFFF>',
      '<meta name=apple-mobile-web-app-capable content=yes>',
      '<meta name=apple-mobile-web-app-status-bar-style content=white>',
      '<meta name=apple-mobile-web-app-title content="Porsche UX">',
      '<meta name=msapplication-TileImage content=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/mstile-270x270.*.png>',
      '<meta name=msapplication-TileColor content=#FFFFFF>',
      '<link rel=icon type=image/png sizes=32x32 href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon-32x32.*.png>',
      '<link rel=apple-touch-icon href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/apple-touch-icon-180x180.*.png>',
      '<link rel=manifest href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/manifest.*.webmanifest>',
    ].join('');

    const result = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX' });
    expect(result).toMatch(convertToRegex(expectedResult));
  });

  it('should return default China CDN link', () => {
    const expectedResult = [
      '<meta name=theme-color content=#FFFFFF>',
      '<meta name=apple-mobile-web-app-capable content=yes>',
      '<meta name=apple-mobile-web-app-status-bar-style content=white>',
      '<meta name=apple-mobile-web-app-title content="Porsche UX">',
      '<meta name=msapplication-TileImage content=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/mstile-270x270.*.png>',
      '<meta name=msapplication-TileColor content=#FFFFFF>',
      '<link rel=icon type=image/png sizes=32x32 href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon-32x32.*.png>',
      '<link rel=apple-touch-icon href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/apple-touch-icon-180x180.*.png>',
      '<link rel=manifest href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/manifest.cn.*.webmanifest>',
    ].join('');

    const result = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX', cdn: 'cn' });
    expect(result).toMatch(convertToRegex(expectedResult));
  });

  it('should return valid jsx meta tags and icon links', () => {
    const expectedResult = [
      '<meta name="theme-color" content="#FFFFFF">',
      '<meta name="apple-mobile-web-app-capable" content="yes">',
      '<meta name="apple-mobile-web-app-status-bar-style" content="white">',
      '<meta name="apple-mobile-web-app-title" content="Porsche UX">',
      '<meta name="msapplication-TileImage" content="https://cdn.ui.porsche.com/porsche-design-system/meta-icons/mstile-270x270.*.png">',
      '<meta name="msapplication-TileColor" content="#FFFFFF">',
      '<link rel="icon" type="image/png" sizes="32x32" href="https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon-32x32.*.png">',
      '<link rel="apple-touch-icon" href="https://cdn.ui.porsche.com/porsche-design-system/meta-icons/apple-touch-icon-180x180.*.png">',
      '<link rel="manifest" href="https://cdn.ui.porsche.com/porsche-design-system/meta-icons/manifest.*.webmanifest">',
    ].join('');

    const { container } = render(<>{getMetaTagsAndIconLinks({ appTitle: 'Porsche UX', format: 'jsx' })}</>);
    const result = container.innerHTML;

    expect(result).toMatch(transformToRegex(expectedResult));
  });
});
