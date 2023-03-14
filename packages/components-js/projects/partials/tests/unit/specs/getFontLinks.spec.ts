import { getFontLinks } from '../../../src';
import { render } from '@testing-library/react';

const hash = '[a-z0-9]{32}';
const baseHrefCom = 'https:\\/\\/cdn\\.ui\\.porsche.com\\/porsche-design-system\\/fonts';
const baseHrefCn = 'https:\\/\\/cdn\\.ui\\.porsche.cn\\/porsche-design-system\\/fonts';

jest.mock('../../../src/shared');

describe('validation', () => {
  it('should throw error on invalid font weights option', () => {
    let error;
    try {
      getFontLinks({ weights: ['some-invalid-weight'] as any[] });
    } catch (e) {
      error = e.message;
    }

    expect(error).toContain('The following supplied font weights are invalid:');
    expect(error).toContain('some-invalid-weight');
  });

  it('should throw error on invalid font subset option', () => {
    let error;
    try {
      getFontLinks({ subset: 'some-invalid-subset' as any });
    } catch (e) {
      error = e.message;
    }

    expect(error).toContain('The following supplied font subset is invalid:');
    expect(error).toContain('some-invalid-subset');
  });

  it('should throw error on invalid weight options', () => {
    expect(() => getFontLinks({ weight: ['latin'] } as any)).toThrowErrorMatchingInlineSnapshot(
      `"Option "weight" is not supported, please use "weights" instead"`
    );
  });
});

describe('format: html', () => {
  it('should return default link', () => {
    const result: string = getFontLinks();
    const regex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-la-regular\\.min\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin><link rel=preload href=${baseHrefCom}/porsche-next-w-la-semi-bold\\.min\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return default China CDN link', () => {
    const result: string = getFontLinks({ cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel=preload href=${baseHrefCn}/porsche-next-w-la-regular\\.min\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin><link rel=preload href=${baseHrefCn}/porsche-next-w-la-semi-bold\\.min\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  describe('subset latin', () => {
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-la-regular\\.min\\.[a-z0-9]{32}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-la-semi-bold\\.min\\.[a-z0-9]{32}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-la-bold\\.min\\.[a-z0-9]{32}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ weights: ['regular'] }, regularRegex],
      [{ weights: ['semi-bold'] }, semiBoldRegex],
      [{ weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result: string = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  describe('subset greek', () => {
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-gr-regular\\.min\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-gr-semi-bold\\.min\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-gr-bold\\.min\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ subset: 'greek', weights: ['regular'] }, regularRegex],
      [{ subset: 'greek', weights: ['semi-bold'] }, semiBoldRegex],
      [{ subset: 'greek', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result: string = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  describe('subset cyril', () => {
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-cy-regular\\.min\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-cy-semi-bold\\.min\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-cy-bold\\.min\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ subset: 'cyril', weights: ['regular'] }, regularRegex],
      [{ subset: 'cyril', weights: ['semi-bold'] }, semiBoldRegex],
      [{ subset: 'cyril', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result: string = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  it('should return multiple links', () => {
    const result: string = getFontLinks({ weights: ['regular', 'semi-bold'] });
    const regex = new RegExp(
      `^(<link rel=preload href=${baseHrefCom}/porsche-next-w-la-(regular|semi-bold)\\.min\\.${hash}\\.woff2 as=font type=font/woff2 crossorigin>){2}$`
    );
    expect(result).toMatch(regex);
  });
});

describe('format: jsx', () => {
  it('should return default link', () => {
    const result: JSX.Element = getFontLinks({ format: 'jsx' });
    const { container } = render(result);
    const regex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-regular\\.min\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""><link rel="preload" href="${baseHrefCom}/porsche-next-w-la-semi-bold\\.min\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin="">$`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  describe('subset latin', () => {
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-regular\\.min\\.[a-z0-9]{32}\\.woff2" as="font" type="font/woff2" crossorigin="">$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-semi-bold\\.min\\.[a-z0-9]{32}\\.woff2" as="font" type="font/woff2" crossorigin="">$`
    );
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-bold\\.min\\.[a-z0-9]{32}\\.woff2" as="font" type="font/woff2" crossorigin="">$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result: JSX.Element = getFontLinks(parameters) as unknown as JSX.Element;
      const { container } = render(result);
      expect(container.innerHTML).toMatch(regex);
    });
  });

  describe('subset greek', () => {
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-gr-regular\\.min\\.[a-z0-9]{32}\\.woff2" as="font" type="font/woff2" crossorigin="">$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-gr-semi-bold\\.min\\.[a-z0-9]{32}\\.woff2" as="font" type="font/woff2" crossorigin="">$`
    );
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-gr-bold\\.min\\.[a-z0-9]{32}\\.woff2" as="font" type="font/woff2" crossorigin="">$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', subset: 'greek', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', subset: 'greek', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', subset: 'greek', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result: JSX.Element = getFontLinks(parameters) as unknown as JSX.Element;
      const { container } = render(result);
      expect(container.innerHTML).toMatch(regex);
    });
  });

  describe('subset cyril', () => {
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-cy-regular\\.min\\.[a-z0-9]{32}\\.woff2" as="font" type="font/woff2" crossorigin="">$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-cy-semi-bold\\.min\\.[a-z0-9]{32}\\.woff2" as="font" type="font/woff2" crossorigin="">$`
    );
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-cy-bold\\.min\\.[a-z0-9]{32}\\.woff2" as="font" type="font/woff2" crossorigin="">$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', subset: 'cyril', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', subset: 'cyril', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', subset: 'cyril', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result: JSX.Element = getFontLinks(parameters) as unknown as JSX.Element;
      const { container } = render(result);
      expect(container.innerHTML).toMatch(regex);
    });
  });

  it('should return multiple links', () => {
    const result: JSX.Element = getFontLinks({ format: 'jsx', weights: ['regular', 'semi-bold'] });
    const { container } = render(result);
    const regex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-regular\\.min\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin=""><link rel="preload" href="${baseHrefCom}/porsche-next-w-la-semi-bold\\.min\\.${hash}\\.woff2" as="font" type="font/woff2" crossorigin="">$`
    );

    expect(container.innerHTML).toMatch(regex);
  });
});
