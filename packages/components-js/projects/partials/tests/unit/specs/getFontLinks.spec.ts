import { renderToString } from 'react-dom/server';
import { getFontLinks } from '../../../src';
import { describe, it, expect } from 'vitest';

const hash = '[a-z0-9]{7}';
const baseHrefCom = 'https:\\/\\/cdn\\.ui\\.porsche.com\\/porsche-design-system\\/fonts';
const baseHrefCn = 'https:\\/\\/cdn\\.ui\\.porsche.cn\\/porsche-design-system\\/fonts';

describe('validation', () => {
  it('should throw error on invalid font weights option', () => {
    expect(() => getFontLinks({ weights: ['some-invalid-weight'] as any[] })).toThrowErrorMatchingInlineSnapshot(`
[Error: [Porsche Design System] The following supplied font weights are invalid:
  some-invalid-weight

Please use only valid font weights:
  regular, semi-bold, bold]
`);
  });

  it('should throw error on invalid font subset option', () => {
    expect(() => getFontLinks({ subset: 'some-invalid-subset' as any })).toThrowErrorMatchingInlineSnapshot(`
[Error: [Porsche Design System] The following supplied font subset is invalid:
  some-invalid-subset

Please use only valid font subset:
  latin, greek, cyril, thai, arabic, pashto, urdu]
`);
  });
});

describe('format: html', () => {
  it('should return default link', () => {
    const result = getFontLinks();
    const regex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-latin-regular\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin><link rel=preload href=${baseHrefCom}/porsche-next-latin-semi-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return default China CDN link', () => {
    const result = getFontLinks({ cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel=preload href=${baseHrefCn}/porsche-next-latin-regular\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin><link rel=preload href=${baseHrefCn}/porsche-next-latin-semi-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  describe('subset latin', () => {
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-latin-regular\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-latin-semi-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-latin-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ weights: ['regular'] }, regularRegex],
      [{ weights: ['semi-bold'] }, semiBoldRegex],
      [{ weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  describe('subset greek', () => {
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-greek-regular\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-greek-semi-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-greek-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ subset: 'greek', weights: ['regular'] }, regularRegex],
      [{ subset: 'greek', weights: ['semi-bold'] }, semiBoldRegex],
      [{ subset: 'greek', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  describe('subset cyril', () => {
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-cyril-regular\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-cyril-semi-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-cyril-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ subset: 'cyril', weights: ['regular'] }, regularRegex],
      [{ subset: 'cyril', weights: ['semi-bold'] }, semiBoldRegex],
      [{ subset: 'cyril', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  describe('subset arabic', () => {
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-arabic-regular\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(`^$`); // we only have regular and bold
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-arabic-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ subset: 'arabic', weights: ['regular'] }, regularRegex],
      [{ subset: 'arabic', weights: ['semi-bold'] }, semiBoldRegex],
      [{ subset: 'arabic', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  describe('subset thai', () => {
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-thai-regular\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-thai-semi-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-thai-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ subset: 'thai', weights: ['regular'] }, regularRegex],
      [{ subset: 'thai', weights: ['semi-bold'] }, semiBoldRegex],
      [{ subset: 'thai', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  describe('subset pashto', () => {
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-pashto-regular\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(`^$`); // we only have regular and bold
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-pashto-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ subset: 'pashto', weights: ['regular'] }, regularRegex],
      [{ subset: 'pashto', weights: ['semi-bold'] }, semiBoldRegex],
      [{ subset: 'pashto', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  describe('subset urdu', () => {
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-urdu-regular\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(`^$`); // we only have regular and bold
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-urdu-bold\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ subset: 'urdu', weights: ['regular'] }, regularRegex],
      [{ subset: 'urdu', weights: ['semi-bold'] }, semiBoldRegex],
      [{ subset: 'urdu', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  it('should return multiple links', () => {
    const result = getFontLinks({ weights: ['regular', 'semi-bold'] });
    const regex = new RegExp(
      `^(<link rel=preload href=${baseHrefCom}/porsche-next-latin-(regular|semi-bold)\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>){2}$`
    );
    expect(result).toMatch(regex);
  });
});

describe('format: jsx', () => {
  it('should return default link', () => {
    const result = getFontLinks({ format: 'jsx' });
    const regex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-latin-regular\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/><link rel="preload" href="${baseHrefCom}/porsche-next-latin-semi-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });

  describe('subset latin', () => {
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-latin-regular\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-latin-semi-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-latin-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters) as unknown as JSX.Element;
      expect(renderToString(result)).toMatch(regex);
    });
  });

  describe('subset greek', () => {
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-greek-regular\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-greek-semi-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-greek-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', subset: 'greek', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', subset: 'greek', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', subset: 'greek', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters) as unknown as JSX.Element;
      expect(renderToString(result)).toMatch(regex);
    });
  });

  describe('subset cyril', () => {
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-cyril-regular\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-cyril-semi-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-cyril-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', subset: 'cyril', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', subset: 'cyril', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', subset: 'cyril', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters) as unknown as JSX.Element;
      expect(renderToString(result)).toMatch(regex);
    });
  });

  describe('subset arabic', () => {
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-arabic-regular\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    const semiBoldRegex = new RegExp(`^$`); // we only have regular and bold
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-arabic-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', subset: 'arabic', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', subset: 'arabic', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', subset: 'arabic', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters) as unknown as JSX.Element;
      expect(renderToString(result)).toMatch(regex);
    });
  });

  describe('subset thai', () => {
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-thai-regular\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-thai-semi-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-thai-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', subset: 'thai', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', subset: 'thai', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', subset: 'thai', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters) as unknown as JSX.Element;
      expect(renderToString(result)).toMatch(regex);
    });
  });

  describe('subset pashto', () => {
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-pashto-regular\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    const semiBoldRegex = new RegExp(`^$`); // we only have regular and bold
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-pashto-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', subset: 'pashto', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', subset: 'pashto', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', subset: 'pashto', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters) as unknown as JSX.Element;
      expect(renderToString(result)).toMatch(regex);
    });
  });

  describe('subset urdu', () => {
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-urdu-regular\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );
    const semiBoldRegex = new RegExp(`^$`); // we only have regular and bold
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-urdu-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', subset: 'urdu', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', subset: 'urdu', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', subset: 'urdu', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters) as unknown as JSX.Element;
      expect(renderToString(result)).toMatch(regex);
    });
  });

  it('should return multiple links', () => {
    const result = getFontLinks({ format: 'jsx', weights: ['regular', 'semi-bold'] });
    const regex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-latin-regular\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/><link rel="preload" href="${baseHrefCom}/porsche-next-latin-semi-bold\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""/>$`
    );

    expect(renderToString(result)).toMatch(regex);
  });
});
