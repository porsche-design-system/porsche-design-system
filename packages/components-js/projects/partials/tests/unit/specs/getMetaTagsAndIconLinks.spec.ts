import { getMetaTagsAndIconLinks } from '../../../src';
import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';

const hash = '[a-z0-9]{7}';
const baseHrefCom = 'https:\\/\\/cdn\\.ui\\.porsche\\.com\\/porsche-design-system\\/meta-icons';
const baseHrefCn = 'https:\\/\\/cdn\\.ui\\.porsche\\.cn\\/porsche-design-system\\/meta-icons';

describe('validation', () => {
  it('should throw error on unprovided appTitle', () => {
    expect(() => getMetaTagsAndIconLinks()).toThrowErrorMatchingInlineSnapshot(
      `[Error: [Porsche Design System] Option "appTitle" is required to output "<meta name="apple-mobile-web-app-title" content="appTitle" />]`
    );
  });
});

describe('format: html', () => {
  it('should return meta tags and icon links', () => {
    const result = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX' });
    const regex = new RegExp(
      `^<meta property=og:title content="Porsche UX"><meta property=og:image content=${baseHrefCom}\/og-image\\.${hash}\\.png><meta name=twitter:title content="Porsche UX"><meta name=twitter:card content=summary_large_image><meta name=twitter:image content=${baseHrefCom}\/og-image\\.${hash}\\.png><meta name=theme-color content=#FFF media=\\(prefers-color-scheme:light\\)><meta name=theme-color content=#0E1418 media=\\(prefers-color-scheme:dark\\)><meta name=mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=default><meta name=apple-mobile-web-app-title content="Porsche UX"><meta name=msapplication-TileImage content=${baseHrefCom}\/mstile-270x270\\.${hash}\\.png><meta name=msapplication-TileColor content=#FFF><link rel=icon sizes=any href=${baseHrefCom}\/favicon\\.${hash}\\.ico><link rel=icon type=image\/png sizes=32x32 href=${baseHrefCom}\/favicon-32x32\\.${hash}\\.png><link rel=apple-touch-icon href=${baseHrefCom}\/apple-touch-icon-180x180\\.${hash}\\.png><link rel=manifest href=${baseHrefCom}\/manifest\\.${hash}\\.webmanifest>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return meta tags and icon links for china cdn', () => {
    const result = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX', cdn: 'cn' });
    const regex = new RegExp(
      `^<meta property=og:title content="Porsche UX"><meta property=og:image content=${baseHrefCn}\/og-image\\.${hash}\\.png><meta name=twitter:title content="Porsche UX"><meta name=twitter:card content=summary_large_image><meta name=twitter:image content=${baseHrefCn}\/og-image\\.${hash}\\.png><meta name=theme-color content=#FFF media=\\(prefers-color-scheme:light\\)><meta name=theme-color content=#0E1418 media=\\(prefers-color-scheme:dark\\)><meta name=mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=default><meta name=apple-mobile-web-app-title content="Porsche UX"><meta name=msapplication-TileImage content=${baseHrefCn}\/mstile-270x270\\.${hash}\\.png><meta name=msapplication-TileColor content=#FFF><link rel=icon sizes=any href=${baseHrefCn}\/favicon\\.${hash}\\.ico><link rel=icon type=image\/png sizes=32x32 href=${baseHrefCn}\/favicon-32x32\\.${hash}\\.png><link rel=apple-touch-icon href=${baseHrefCn}\/apple-touch-icon-180x180\\.${hash}\\.png><link rel=manifest href=${baseHrefCn}\/manifest\\.cn\\.${hash}\\.webmanifest>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return meta tags and icon links without og:image', () => {
    const result = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX', ogImage: false });
    const regex = new RegExp(
      `^<meta name=theme-color content=#FFF media=\\(prefers-color-scheme:light\\)><meta name=theme-color content=#0E1418 media=\\(prefers-color-scheme:dark\\)><meta name=mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=default><meta name=apple-mobile-web-app-title content="Porsche UX"><meta name=msapplication-TileImage content=${baseHrefCom}\/mstile-270x270\\.${hash}\\.png><meta name=msapplication-TileColor content=#FFF><link rel=icon sizes=any href=${baseHrefCom}\/favicon\\.${hash}\\.ico><link rel=icon type=image\/png sizes=32x32 href=${baseHrefCom}\/favicon-32x32\\.${hash}\\.png><link rel=apple-touch-icon href=${baseHrefCom}\/apple-touch-icon-180x180\\.${hash}\\.png><link rel=manifest href=${baseHrefCom}\/manifest\\.${hash}\\.webmanifest>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return meta tags and icon links for china cdn without og:image', () => {
    const result = getMetaTagsAndIconLinks({ appTitle: 'Porsche UX', cdn: 'cn', ogImage: false });
    const regex = new RegExp(
      `^<meta name=theme-color content=#FFF media=\\(prefers-color-scheme:light\\)><meta name=theme-color content=#0E1418 media=\\(prefers-color-scheme:dark\\)><meta name=mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=default><meta name=apple-mobile-web-app-title content="Porsche UX"><meta name=msapplication-TileImage content=${baseHrefCn}\/mstile-270x270\\.${hash}\\.png><meta name=msapplication-TileColor content=#FFF><link rel=icon sizes=any href=${baseHrefCn}\/favicon\\.${hash}\\.ico><link rel=icon type=image\/png sizes=32x32 href=${baseHrefCn}\/favicon-32x32\\.${hash}\\.png><link rel=apple-touch-icon href=${baseHrefCn}\/apple-touch-icon-180x180\\.${hash}\\.png><link rel=manifest href=${baseHrefCn}\/manifest\\.cn\\.${hash}\\.webmanifest>$`
    );
    expect(result).toMatch(regex);
  });
});

describe('format: jsx', () => {
  it('should return meta tags and icon links', () => {
    const result = getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'Porsche UX Platform' });
    const regex = new RegExp(
      `^<meta property="og:title" content="Porsche UX Platform"/><meta property="og:image" content="${baseHrefCom}\/og-image\\.${hash}\\.png"/><meta name="twitter:title" content="Porsche UX Platform"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:image" content="${baseHrefCom}\/og-image\\.${hash}\\.png"/><meta name="theme-color" content="#FFF" media="\\(prefers-color-scheme:light\\)"/><meta name="theme-color" content="#0E1418" media="\\(prefers-color-scheme:dark\\)"/><meta name="mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-status-bar-style" content="default"/><meta name="apple-mobile-web-app-title" content="Porsche UX Platform"/><meta name="msapplication-TileImage" content="${baseHrefCom}\/mstile-270x270\\.${hash}\\.png"/><meta name="msapplication-TileColor" content="#FFF"/><link rel="icon" sizes="any" href="${baseHrefCom}\/favicon\\.${hash}\\.ico"/><link rel="icon" type="image\/png" sizes="32x32" href="${baseHrefCom}\/favicon-32x32\\.${hash}\\.png"/><link rel="apple-touch-icon" href="${baseHrefCom}\/apple-touch-icon-180x180\\.${hash}\\.png"/><link rel="manifest" href="${baseHrefCom}\/manifest\\.${hash}\\.webmanifest"/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });

  it('should return meta tags and icon links for china cdn', () => {
    const result = getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'Porsche UX Platform', cdn: 'cn' });
    const regex = new RegExp(
      `^<meta property="og:title" content="Porsche UX Platform"/><meta property="og:image" content="${baseHrefCn}\/og-image\\.${hash}\\.png"/><meta name="twitter:title" content="Porsche UX Platform"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:image" content="${baseHrefCn}\/og-image\\.${hash}\\.png"/><meta name="theme-color" content="#FFF" media="\\(prefers-color-scheme:light\\)"/><meta name="theme-color" content="#0E1418" media="\\(prefers-color-scheme:dark\\)"/><meta name="mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-status-bar-style" content="default"/><meta name="apple-mobile-web-app-title" content="Porsche UX Platform"/><meta name="msapplication-TileImage" content="${baseHrefCn}\/mstile-270x270\\.${hash}\\.png"/><meta name="msapplication-TileColor" content="#FFF"/><link rel="icon" sizes="any" href="${baseHrefCn}\/favicon\\.${hash}\\.ico"/><link rel="icon" type="image\/png" sizes="32x32" href="${baseHrefCn}\/favicon-32x32\\.${hash}\\.png"/><link rel="apple-touch-icon" href="${baseHrefCn}\/apple-touch-icon-180x180\\.${hash}\\.png"/><link rel="manifest" href="${baseHrefCn}\/manifest\\.cn\\.${hash}\\.webmanifest"/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });

  it('should return meta tags and icon links without og:image', () => {
    const result = getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'Porsche UX Platform', ogImage: false });
    const regex = new RegExp(
      `^<meta name="theme-color" content="#FFF" media="\\(prefers-color-scheme:light\\)"/><meta name="theme-color" content="#0E1418" media="\\(prefers-color-scheme:dark\\)"/><meta name="mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-status-bar-style" content="default"/><meta name="apple-mobile-web-app-title" content="Porsche UX Platform"/><meta name="msapplication-TileImage" content="${baseHrefCom}\/mstile-270x270\\.${hash}\\.png"/><meta name="msapplication-TileColor" content="#FFF"/><link rel="icon" sizes="any" href="${baseHrefCom}\/favicon\\.${hash}\\.ico"/><link rel="icon" type="image\/png" sizes="32x32" href="${baseHrefCom}\/favicon-32x32\\.${hash}\\.png"/><link rel="apple-touch-icon" href="${baseHrefCom}\/apple-touch-icon-180x180\\.${hash}\\.png"/><link rel="manifest" href="${baseHrefCom}\/manifest\\.${hash}\\.webmanifest"/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });

  it('should return meta tags and icon links for china cdn without og:image', () => {
    const result = getMetaTagsAndIconLinks({
      format: 'jsx',
      appTitle: 'Porsche UX Platform',
      cdn: 'cn',
      ogImage: false,
    });
    const regex = new RegExp(
      `^<meta name="theme-color" content="#FFF" media="\\(prefers-color-scheme:light\\)"/><meta name="theme-color" content="#0E1418" media="\\(prefers-color-scheme:dark\\)"/><meta name="mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-status-bar-style" content="default"/><meta name="apple-mobile-web-app-title" content="Porsche UX Platform"/><meta name="msapplication-TileImage" content="${baseHrefCn}\/mstile-270x270\\.${hash}\\.png"/><meta name="msapplication-TileColor" content="#FFF"/><link rel="icon" sizes="any" href="${baseHrefCn}\/favicon\\.${hash}\\.ico"/><link rel="icon" type="image\/png" sizes="32x32" href="${baseHrefCn}\/favicon-32x32\\.${hash}\\.png"/><link rel="apple-touch-icon" href="${baseHrefCn}\/apple-touch-icon-180x180\\.${hash}\\.png"/><link rel="manifest" href="${baseHrefCn}\/manifest\\.cn\\.${hash}\\.webmanifest"/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });
});

describe('format: js', () => {
  it('should return meta tags and icon links', () => {
    const title = 'Porsche UX Platform';
    const result = getMetaTagsAndIconLinks({ format: 'js', appTitle: title });
    const expected = {
      themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#FFF' },
        { media: '(prefers-color-scheme: dark)', color: '#0E1418' },
      ],
      appleWebApp: {
        title: title,
        statusBarStyle: 'default',
      },
      icons: {
        icon: [
          {
            url: expect.stringMatching(`^${baseHrefCom}\/favicon\.${hash}\.ico$`),
            sizes: 'any',
          },
          {
            url: expect.stringMatching(`^${baseHrefCom}\/favicon-32x32\.${hash}\.png$`),
            sizes: '32x32',
            type: 'image/png',
          },
        ],
        apple: expect.stringMatching(`^${baseHrefCom}\/apple-touch-icon-180x180\.${hash}\.png$`),
      },
      manifest: expect.stringMatching(`^${baseHrefCom}\/manifest\.${hash}\.webmanifest$`),
      openGraph: {
        image: {
          url: expect.stringMatching(`^${baseHrefCom}\/og-image\.${hash}\.png$`),
        },
      },
    };
    expect(result).toEqual(expected);
  });

  it('should return meta tags and icon links for china cdn', () => {
    const title = 'Porsche UX Platform';
    const result = getMetaTagsAndIconLinks({ format: 'js', appTitle: title, cdn: 'cn' });
    const expected = {
      themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#FFF' },
        { media: '(prefers-color-scheme: dark)', color: '#0E1418' },
      ],
      appleWebApp: {
        title: title,
        statusBarStyle: 'default',
      },
      icons: {
        icon: [
          {
            url: expect.stringMatching(`^${baseHrefCn}\/favicon\.${hash}\.ico$`),
            sizes: 'any',
          },
          {
            url: expect.stringMatching(`^${baseHrefCn}\/favicon-32x32\.${hash}\.png$`),
            sizes: '32x32',
            type: 'image/png',
          },
        ],
        apple: expect.stringMatching(`^${baseHrefCn}\/apple-touch-icon-180x180\.${hash}\.png$`),
      },
      manifest: expect.stringMatching(`^${baseHrefCn}\/manifest\.cn\.${hash}\.webmanifest$`),
      openGraph: {
        image: {
          url: expect.stringMatching(`^${baseHrefCn}\/og-image\.${hash}\.png$`),
        },
      },
    };
    expect(result).toEqual(expected);
  });
});
