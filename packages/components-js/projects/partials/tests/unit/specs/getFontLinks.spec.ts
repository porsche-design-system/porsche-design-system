import { getFontLinks } from '../../../src';
import { render } from '@testing-library/react';

const hash = '[a-z0-9]{32}';
const baseHrefCom = 'https://cdn.ui.porsche.com/porsche-design-system/fonts';
const baseHrefCn = 'https://cdn.ui.porsche.cn/porsche-design-system/fonts';

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
      '"Option \\"weight\\" is not supported, please use \\"weights\\" instead"'
    );
  });
});

describe('format: html', () => {
  it('should return default link', () => {
    const result = getFontLinks();
    const regex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-la-regular\.min\.${hash}\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return default China CDN link', () => {
    const result = getFontLinks({ cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel=preload href=${baseHrefCn}/porsche-next-w-la-regular\.min\.${hash}\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  describe('subset latin', () => {
    const thinRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-la-thin\.min\.[a-z0-9]{32}\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-la-regular\.min\.[a-z0-9]{32}\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-la-semi-bold\.min\.[a-z0-9]{32}\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-la-bold\.min\.[a-z0-9]{32}\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ weights: ['thin'] }, thinRegex],
      [{ weights: ['regular'] }, regularRegex],
      [{ weights: ['semi-bold'] }, semiBoldRegex],
      [{ weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  describe('subset greek', () => {
    const thinRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-gr-thin\.min\.${hash}\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-gr-regular\.min\.${hash}\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-gr-semi-bold\.min\.${hash}\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-gr-bold\.min\.${hash}\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ subset: 'greek', weights: ['thin'] }, thinRegex],
      [{ subset: 'greek', weights: ['regular'] }, regularRegex],
      [{ subset: 'greek', weights: ['semi-bold'] }, semiBoldRegex],
      [{ subset: 'greek', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  describe('subset cyril', () => {
    const thinRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-cy-thin\.min\.${hash}\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const regularRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-cy-regular\.min\.${hash}\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-cy-semi-bold\.min\.${hash}\.woff2 as=font type=font/woff2 crossorigin>$`
    );
    const boldRegex = new RegExp(
      `^<link rel=preload href=${baseHrefCom}/porsche-next-w-cy-bold\.min\.${hash}\.woff2 as=font type=font/woff2 crossorigin>$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ subset: 'cyril', weights: ['thin'] }, thinRegex],
      [{ subset: 'cyril', weights: ['regular'] }, regularRegex],
      [{ subset: 'cyril', weights: ['semi-bold'] }, semiBoldRegex],
      [{ subset: 'cyril', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const result = getFontLinks(parameters);
      expect(result).toMatch(regex);
    });
  });

  it('should return multiple links', () => {
    const result = getFontLinks({ weights: ['regular', 'semi-bold'] });
    const regex = new RegExp(
      `^(<link rel=preload href=${baseHrefCom}/porsche-next-w-la-(regular|semi-bold)\.min\.${hash}\.woff2 as=font type=font/woff2 crossorigin>){2}$`
    );
    expect(result).toMatch(regex);
  });
});

describe('withoutTags: true', () => {
  it('should return default url', () => {
    const result = getFontLinks({ withoutTags: true });
    const regex = new RegExp(`^${baseHrefCom}/porsche-next-w-la-regular\.min\.${hash}\.woff2$`);

    expect(result[0]).toMatch(regex);
    expect(result.length).toBe(1);
  });

  it('should return default China CDN url', () => {
    const result = getFontLinks({ withoutTags: true, cdn: 'cn' });
    const regex = new RegExp(`^${baseHrefCn}\/porsche-next-w-la-regular\.min\.${hash}\.woff2$`);

    expect(result[0]).toMatch(regex);
    expect(result.length).toBe(1);
  });

  it('should return multiple urls', () => {
    const result = getFontLinks({ withoutTags: true, weights: ['regular', 'semi-bold'] });
    const regexRegular = new RegExp(`^${baseHrefCom}/porsche-next-w-la-regular\.min\.${hash}\.woff2$`);
    const regexSemiBold = new RegExp(`^${baseHrefCom}/porsche-next-w-la-semi-bold\.min\.${hash}\.woff2$`);

    expect(result[0]).toMatch(regexRegular);
    expect(result[1]).toMatch(regexSemiBold);
    expect(result.length).toBe(2);
  });
});

describe('format: jsx', () => {
  const regex = new RegExp(
    `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-(?:thin|regular|semi-bold|bold)\.min\.${hash}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
  );

  it('should return default url', () => {
    const { container } = render(getFontLinks({ format: 'jsx' }));
    const regex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-regular\.min\.${hash}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );

    expect(container.innerHTML).toMatch(regex);
  });

  describe('subset latin', () => {
    const thinRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-thin\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-regular\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-semi-bold\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-bold\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', weights: ['thin'] }, thinRegex],
      [{ format: 'jsx', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const { container } = render(getFontLinks(parameters) as unknown as JSX.Element);
      expect(container.innerHTML).toMatch(regex);
    });
  });

  describe('subset greek', () => {
    const thinRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-gr-thin\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-gr-regular\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-gr-semi-bold\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-gr-bold\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', subset: 'greek', weights: ['thin'] }, thinRegex],
      [{ format: 'jsx', subset: 'greek', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', subset: 'greek', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', subset: 'greek', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const { container } = render(getFontLinks(parameters) as unknown as JSX.Element);
      expect(container.innerHTML).toMatch(regex);
    });
  });

  describe('subset cyril', () => {
    const thinRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-cy-thin\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );
    const regularRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-cy-regular\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );
    const semiBoldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-cy-semi-bold\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );
    const boldRegex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-cy-bold\.min\.[a-z0-9]{32}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );

    it.each<[Parameters<typeof getFontLinks>[0], RegExp]>([
      [{ format: 'jsx', subset: 'cyril', weights: ['thin'] }, thinRegex],
      [{ format: 'jsx', subset: 'cyril', weights: ['regular'] }, regularRegex],
      [{ format: 'jsx', subset: 'cyril', weights: ['semi-bold'] }, semiBoldRegex],
      [{ format: 'jsx', subset: 'cyril', weights: ['bold'] }, boldRegex],
    ])('should match regex for %j', (parameters, regex) => {
      const { container } = render(getFontLinks(parameters) as unknown as JSX.Element);
      expect(container.innerHTML).toMatch(regex);
    });
  });

  it('should return multiple urls', () => {
    const { container } = render(getFontLinks({ format: 'jsx', weights: ['regular', 'semi-bold'] }));
    const regex = new RegExp(
      `^<link rel="preload" href="${baseHrefCom}/porsche-next-w-la-regular\.min\.${hash}\.woff2" as="font" type="font/woff2" crossorigin="true"><link rel="preload" href="${baseHrefCom}/porsche-next-w-la-semi-bold\.min\.${hash}\.woff2" as="font" type="font/woff2" crossorigin="true">$`
    );

    expect(container.innerHTML).toMatch(regex);
  });
});
