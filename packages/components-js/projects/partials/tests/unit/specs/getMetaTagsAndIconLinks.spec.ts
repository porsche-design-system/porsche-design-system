import { getMetaTagsAndIconLinks } from '../../../src';
import { render } from '@testing-library/react';

const hash = '[a-z0-9]{32}';
const baseHrefCom = 'https:\\/\\/cdn\\.ui\\.porsche\\.com\\/porsche-design-system\\/meta-icons';
const baseHrefCn = 'https:\\/\\/cdn\\.ui\\.porsche\\.cn\\/porsche-design-system\\/meta-icons';

jest.mock('../../../src/shared');

describe('validation', () => {
  it('should throw error on unprovided appTitle', () => {
    expect(() => getMetaTagsAndIconLinks()).toThrowErrorMatchingInlineSnapshot(
      `"Option "appTitle" is required to output "<meta name="apple-mobile-web-app-title" content="appTitle" />"`
    );
  });
});

describe('format: html', () => {
  it('should return meta tags and icon links', () => {
    const result: string = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX' });
    const regex = new RegExp(
      `<meta name=theme-color content=#FFF media=(prefers-color-scheme:light)><meta name=theme-color content=#0E1418 media=(prefers-color-scheme:dark)><meta name=apple-mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=white><meta name=apple-mobile-web-app-title content=\"Porsche UX\"><meta name=msapplication-TileImage content=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/mstile-270x270.f58081f8740873aef72dbb616e33077a.png><meta name=msapplication-TileColor content=#FFF><link rel=icon type=image/png sizes=any href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon.ecf28f86f704514d0f169e4de8c32e8d.ico><link rel=apple-touch-icon href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/apple-touch-icon-180x180.bdf11ccd797ba5199164090057919053.png><link rel=manifest href=https://cdn.ui.porsche.com/porsche-design-system/meta-icons/manifest.2bdf26ea31a4da66c7559db772445d32.webmanifest>`
    );
    expect(result).toMatch(regex);
  });

  it('should return meta tags and icon links for china cdn', () => {
    const result: string = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX', cdn: 'cn' });
    const regex = new RegExp(
      `<meta name=theme-color content=#FFF media=(prefers-color-scheme:light)><meta name=theme-color content=#0E1418 media=(prefers-color-scheme:dark)><meta name=apple-mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=white><meta name=apple-mobile-web-app-title content=\"Porsche UX\"><meta name=msapplication-TileImage content=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/mstile-270x270.f58081f8740873aef72dbb616e33077a.png><meta name=msapplication-TileColor content=#FFF><link rel=icon type=image/png sizes=any href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon.ecf28f86f704514d0f169e4de8c32e8d.ico><link rel=apple-touch-icon href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/apple-touch-icon-180x180.bdf11ccd797ba5199164090057919053.png><link rel=manifest href=https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/manifest.cn.7de567d4b65ef45bebd99dfc24aacd89.webmanifest>`
    );
    expect(result).toMatch(regex);
  });
});

describe('format: jsx', () => {
  it('should return meta tags and icon links', () => {
    const result: JSX.Element = getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'Porsche UX Platform' });
    const { container } = render(result);
    const regex = new RegExp(
      `<meta name=\"theme-color\" content=\"#FFF\" media=\"(prefers-color-scheme:light)\"><meta name=\"theme-color\" content=\"#0E1418\" media=\"(prefers-color-scheme:dark)\"><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"white\"><meta name=\"apple-mobile-web-app-title\" content=\"Porsche UX Platform\"><meta name=\"msapplication-TileImage\" content=\"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/mstile-270x270.f58081f8740873aef72dbb616e33077a.png\"><meta name=\"msapplication-TileColor\" content=\"#FFF\"><link rel=\"icon\" type=\"image/png\" sizes=\"any\" href=\"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/favicon.ecf28f86f704514d0f169e4de8c32e8d.ico\"><link rel=\"apple-touch-icon\" href=\"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/apple-touch-icon-180x180.bdf11ccd797ba5199164090057919053.png\"><link rel=\"manifest\" href=\"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/manifest.2bdf26ea31a4da66c7559db772445d32.webmanifest\">`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return meta tags and icon links for china cdn', () => {
    const result: JSX.Element = getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'Porsche UX Platform', cdn: 'cn' });
    const { container } = render(result);
    const regex = new RegExp(
      `<meta name=\\"theme-color\\" content=\\"#FFF\\" media=\\"(prefers-color-scheme:light)\\"><meta name=\\"theme-color\\" content=\\"#0E1418\\" media=\\"(prefers-color-scheme:dark)\\"><meta name=\\"apple-mobile-web-app-capable\\" content=\\"yes\\"><meta name=\\"apple-mobile-web-app-status-bar-style\\" content=\\"white\\"><meta name=\\"apple-mobile-web-app-title\\" content=\\"Porsche UX Platform\\"><meta name=\\"msapplication-TileImage\\" content=\\"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/mstile-270x270.f58081f8740873aef72dbb616e33077a.png\\"><meta name=\\"msapplication-TileColor\\" content=\\"#FFF\\"><link rel=\\"icon\\" type=\\"image/png\\" sizes=\\"any\\" href=\\"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/favicon.ecf28f86f704514d0f169e4de8c32e8d.ico\\"><link rel=\\"apple-touch-icon\\" href=\\"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/apple-touch-icon-180x180.bdf11ccd797ba5199164090057919053.png\\"><link rel=\\"manifest\\" href=\\"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/manifest.cn.7de567d4b65ef45bebd99dfc24aacd89.webmanifest\\">`
    );
    expect(container.innerHTML).toMatch(regex);
  });
});
