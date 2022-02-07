import { getMetaTagsAndIconLinks } from '../../../src';
import { render } from '@testing-library/react';

const hash = '[a-z0-9]{32}';
const baseHrefCom = 'https://cdn.ui.porsche.com/porsche-design-system/meta-icons';
const baseHrefCn = 'https://cdn.ui.porsche.cn/porsche-design-system/meta-icons';

describe('validation', () => {
  it('should throw error on unprovided appTitle', () => {
    expect(() => getMetaTagsAndIconLinks()).toThrowErrorMatchingInlineSnapshot(
      '"Option \\"appTitle\\" is required to output \\"<meta name=\\"apple-mobile-web-app-title\\" content=\\"appTitle\\" />"'
    );
  });
});

describe('format: html', () => {
  it('should return default meta tags and icon links', () => {
    const result = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX' });
    const regex = new RegExp(
      `^<meta name=theme-color content=#FFFFFF><meta name=apple-mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=white><meta name=apple-mobile-web-app-title content="Porsche UX"><meta name=msapplication-TileImage content=${baseHrefCom}/mstile-270x270.${hash}.png><meta name=msapplication-TileColor content=#FFFFFF><link rel=icon type=image/png sizes=32x32 href=${baseHrefCom}/favicon-32x32.${hash}.png><link rel=apple-touch-icon href=${baseHrefCom}/apple-touch-icon-180x180.${hash}.png><link rel=manifest href=${baseHrefCom}/manifest.${hash}.webmanifest>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return default meta tags and icon links for china cdn', () => {
    const result = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX', cdn: 'cn' });
    const regex = new RegExp(
      `^<meta name=theme-color content=#FFFFFF><meta name=apple-mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=white><meta name=apple-mobile-web-app-title content="Porsche UX"><meta name=msapplication-TileImage content=${baseHrefCn}/mstile-270x270.${hash}.png><meta name=msapplication-TileColor content=#FFFFFF><link rel=icon type=image/png sizes=32x32 href=${baseHrefCn}/favicon-32x32.${hash}.png><link rel=apple-touch-icon href=${baseHrefCn}/apple-touch-icon-180x180.${hash}.png><link rel=manifest href=${baseHrefCn}/manifest.cn.${hash}.webmanifest>$`
    );
    expect(result).toMatch(regex);
  });
});

describe('format: jsx', () => {
  it('should return valid jsx meta tags and icon links', () => {
    const { container } = render(getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'Porsche UX' }));
    const regex = new RegExp(
      `^<meta name="theme-color" content="#FFFFFF"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="white"><meta name="apple-mobile-web-app-title" content="Porsche UX"><meta name="msapplication-TileImage" content="${baseHrefCom}/mstile-270x270.${hash}.png"><meta name="msapplication-TileColor" content="#FFFFFF"><link rel="icon" type="image/png" sizes="32x32" href="${baseHrefCom}/favicon-32x32.${hash}.png"><link rel="apple-touch-icon" href="${baseHrefCom}/apple-touch-icon-180x180.${hash}.png"><link rel="manifest" href="${baseHrefCom}/manifest.${hash}.webmanifest">$`
    );
    const result = container.innerHTML;
    expect(result).toMatch(regex);
  });

  it('should return valid jsx meta tags and icon links for china cdn', () => {
    const { container } = render(getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'Porsche UX', cdn: 'cn' }));
    const regex = new RegExp(
      `^<meta name="theme-color" content="#FFFFFF"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="white"><meta name="apple-mobile-web-app-title" content="Porsche UX"><meta name="msapplication-TileImage" content="${baseHrefCn}/mstile-270x270.${hash}.png"><meta name="msapplication-TileColor" content="#FFFFFF"><link rel="icon" type="image/png" sizes="32x32" href="${baseHrefCn}/favicon-32x32.${hash}.png"><link rel="apple-touch-icon" href="${baseHrefCn}/apple-touch-icon-180x180.${hash}.png"><link rel="manifest" href="${baseHrefCn}/manifest.cn.${hash}.webmanifest">$`
    );
    const result = container.innerHTML;
    expect(result).toMatch(regex);
  });
});
