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

fdescribe('format: html', () => {
  it('should return meta tags and icon links', () => {
    const result: string = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX' });
    const regex = new RegExp(
      `^<meta name=theme-color content=#FFF media=\\(prefers-color-scheme:light\\)><meta name=theme-color content=#0E1418 media=\\(prefers-color-scheme:dark\\)><meta name=apple-mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=white><meta name=apple-mobile-web-app-title content="Porsche UX"><meta name=msapplication-TileImage content=${baseHrefCom}\/mstile-270x270\\.${hash}\\.png><meta name=msapplication-TileColor content=#FFF><link rel=icon type=image\/png sizes=any href=${baseHrefCom}\/favicon\\.${hash}\\.ico><link rel=apple-touch-icon href=${baseHrefCom}\/apple-touch-icon-180x180\\.${hash}\\.png><link rel=manifest href=${baseHrefCom}\/manifest\\.${hash}\\.webmanifest>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return meta tags and icon links for china cdn', () => {
    const result: string = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX', cdn: 'cn' });
    const regex = new RegExp(
      `^<meta name=theme-color content=#FFF media=\\(prefers-color-scheme:light\\)><meta name=theme-color content=#0E1418 media=\\(prefers-color-scheme:dark\\)><meta name=apple-mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=white><meta name=apple-mobile-web-app-title content="Porsche UX"><meta name=msapplication-TileImage content=${baseHrefCn}\/mstile-270x270\\.${hash}\\.png><meta name=msapplication-TileColor content=#FFF><link rel=icon type=image\/png sizes=any href=${baseHrefCn}\/favicon\\.${hash}\\.ico><link rel=apple-touch-icon href=${baseHrefCn}\/apple-touch-icon-180x180\\.${hash}\\.png><link rel=manifest href=${baseHrefCn}\/manifest\\.cn\\.${hash}\\.webmanifest>$`
    );
    expect(result).toMatch(regex);
  });
});

fdescribe('format: jsx', () => {
  it('should return meta tags and icon links', () => {
    const result: JSX.Element = getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'Porsche UX Platform' });
    const { container } = render(result);
    const regex = new RegExp(
      `^<meta name="theme-color" content="#FFF" media="\\(prefers-color-scheme:light\\)"><meta name="theme-color" content="#0E1418" media="\\(prefers-color-scheme:dark\\)"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="white"><meta name="apple-mobile-web-app-title" content="Porsche UX Platform"><meta name="msapplication-TileImage" content="${baseHrefCom}\/mstile-270x270\\.${hash}\\.png"><meta name="msapplication-TileColor" content="#FFF"><link rel="icon" type="image\/png" sizes="any" href="${baseHrefCom}\/favicon\\.${hash}\\.ico"><link rel="apple-touch-icon" href="${baseHrefCom}\/apple-touch-icon-180x180\\.${hash}\\.png"><link rel="manifest" href="${baseHrefCom}\/manifest\\.${hash}\\.webmanifest">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return meta tags and icon links for china cdn', () => {
    const result: JSX.Element = getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'Porsche UX Platform', cdn: 'cn' });
    const { container } = render(result);
    const regex = new RegExp(
      `^<meta name="theme-color" content="#FFF" media="\\(prefers-color-scheme:light\\)"><meta name="theme-color" content="#0E1418" media="\\(prefers-color-scheme:dark\\)"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="white"><meta name="apple-mobile-web-app-title" content="Porsche UX Platform"><meta name="msapplication-TileImage" content="${baseHrefCn}\/mstile-270x270\\.${hash}\\.png"><meta name="msapplication-TileColor" content="#FFF"><link rel="icon" type="image\/png" sizes="any" href="${baseHrefCn}\/favicon\\.${hash}\\.ico"><link rel="apple-touch-icon" href="${baseHrefCn}\/apple-touch-icon-180x180\\.${hash}\\.png"><link rel="manifest" href="${baseHrefCn}\/manifest\\.cn\\.${hash}\\.webmanifest">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });
});
