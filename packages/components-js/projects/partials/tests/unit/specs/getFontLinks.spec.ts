import { getFontLinks } from '../../../src';
import { render } from '@testing-library/react';
import { CDN_BASE_URL, CDN_BASE_URL_CN } from '../../../../../../../cdn.config';

describe('getFontLinks()', () => {
  const getFontLinksLatinRegex = (quantifier: number) =>
    new RegExp(
      `^(?:<link rel=preload href=https:\/\/cdn\.ui\.porsche\.(?:com|cn)\/porsche-design-system\/fonts\/porsche-next-w-la-(?:thin|regular|semi-bold|bold)\.min\.[a-z0-9]{32}\.woff2 as=font type=font\/woff2 crossorigin>){${quantifier}}$`
    );
  const fontLinksGreekRegex =
    /^(?:<link rel=preload href=https:\/\/cdn\.ui\.porsche\.(?:com|cn)\/porsche-design-system\/fonts\/porsche-next-w-gr-(?:thin|regular|semi-bold|bold)\.min\.[a-z0-9]{32}\.woff2 as=font type=font\/woff2 crossorigin>){1,4}$/;
  const fontLinksCyrilRegex =
    /^(?:<link rel=preload href=https:\/\/cdn\.ui\.porsche\.(?:com|cn)\/porsche-design-system\/fonts\/porsche-next-w-cy-(?:thin|regular|semi-bold|bold)\.min\.[a-z0-9]{32}\.woff2 as=font type=font\/woff2 crossorigin>){1,4}$/;

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

  describe('url with tag', () => {
    it('should return default link', () => {
      const result = getFontLinks();

      expect(result).toMatch(getFontLinksLatinRegex(1));
    });

    it('should return default China CDN link', () => {
      const result = getFontLinks({ cdn: 'cn' });
      expect(result).toMatch(getFontLinksLatinRegex(1));
      expect(result).toContain(CDN_BASE_URL_CN);
      expect(result).not.toContain(CDN_BASE_URL);
    });

    it.each([
      ['latin', 'thin'],
      ['latin', 'regular'],
      ['latin', 'semi-bold'],
      ['latin', 'bold'],
    ])(
      'should return %s subset and %s weight link',
      (subset: 'latin' | 'greek' | 'cyril', weight: 'thin' | 'regular' | 'semi-bold' | 'bold') => {
        const result = getFontLinks({ subset, weights: [weight] });

        expect(result).toMatch(getFontLinksLatinRegex(1));
        expect(result).toContain(`la-${weight}.min`);
      }
    );

    it.each([
      ['greek', 'thin'],
      ['greek', 'regular'],
      ['greek', 'semi-bold'],
      ['greek', 'bold'],
    ])(
      'should return %s subset and %s weight link',
      (subset: 'latin' | 'greek' | 'cyril', weight: 'thin' | 'regular' | 'semi-bold' | 'bold') => {
        const result = getFontLinks({ subset, weights: [weight] });

        expect(result).toMatch(fontLinksGreekRegex);
        expect(result).toContain(`gr-${weight}.min`);
      }
    );

    it.each([
      ['cyril', 'thin'],
      ['cyril', 'regular'],
      ['cyril', 'semi-bold'],
      ['cyril', 'bold'],
    ])(
      'should return %s subset and %s weight link',
      (subset: 'latin' | 'greek' | 'cyril', weight: 'thin' | 'regular' | 'semi-bold' | 'bold') => {
        const result = getFontLinks({ subset, weights: [weight] });

        expect(result).toMatch(fontLinksCyrilRegex);
        expect(result).toContain(`cy-${weight}.min`);
      }
    );

    it('should return multiple links', () => {
      const result = getFontLinks({ weights: ['regular', 'semi-bold'] });

      expect(result).toMatch(getFontLinksLatinRegex(2));
    });

    it('should be minified', () => {
      const result = getFontLinks();
      expect(result).not.toContain('"');
      expect(result).not.toContain("'");
    });
  });

  describe('url without tag', () => {
    const getLatinUrlRegex = (quantifier: number) =>
      new RegExp(
        `^(?:https:\/\/cdn\.ui\.porsche\.(?:com|cn)\/porsche-design-system\/fonts\/porsche-next-w-la-(?:thin|regular|semi-bold|bold)\.min\.[a-z0-9]{32}\.woff2){${quantifier}}$`
      );

    it('should return default url', () => {
      const result = getFontLinks({ withoutTags: true });

      expect(result.join()).toMatch(getLatinUrlRegex(1));
    });

    it('should return default China CDN url', () => {
      const result = getFontLinks({ withoutTags: true, cdn: 'cn' }).join();

      expect(result).toMatch(getLatinUrlRegex(1));
      expect(result).toContain(CDN_BASE_URL_CN);
      expect(result).not.toContain(CDN_BASE_URL);
    });

    it('should return multiple urls', () => {
      const result = getFontLinks({ withoutTags: true, weights: ['regular', 'semi-bold'] });

      expect(result.join('')).toMatch(getLatinUrlRegex(2));
    });
  });

  describe('format jsx', () => {
    const getFontLinksLatinRegexJsx = (quantifier: number) =>
      new RegExp(
        `^(?:<link rel="preload" href="https:\/\/cdn\.ui\.porsche\.(?:com|cn)\/porsche-design-system\/fonts\/porsche-next-w-la-(?:thin|regular|semi-bold|bold)\.min\.[a-z0-9]{32}\.woff2" as="font" type="font\/woff2" crossorigin="true">){${quantifier}}$`
      );

    it('should return default url', () => {
      const { container } = render(getFontLinks({ format: 'jsx' }));

      expect(container.innerHTML).toMatch(getFontLinksLatinRegexJsx(1));
    });

    it.each([
      ['latin', ['thin']],
      ['latin', ['regular']],
      ['latin', ['semi-bold']],
      ['latin', ['bold']],
    ])(
      'should return %s subset and %s weight url',
      (subset: 'latin' | 'cyril' | 'greek', weight: ('thin' | 'regular' | 'semi-bold' | 'bold')[]) => {
        const { container } = render(getFontLinks({ format: 'jsx', subset, weights: weight }));

        expect(container.innerHTML).toMatch(getFontLinksLatinRegexJsx(1));
      }
    );

    it('should return multiple urls', () => {
      const { container } = render(getFontLinks({ format: 'jsx', weights: ['regular', 'semi-bold'] }));

      expect(container.innerHTML).toMatch(getFontLinksLatinRegexJsx(2));
    });
  });
});
