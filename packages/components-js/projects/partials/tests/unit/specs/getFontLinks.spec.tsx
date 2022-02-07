import { getFontLinks } from '../../../src';
import { getCdnBaseUrl, transformToRegex } from '../helpers/shared';
import { render } from '@testing-library/react';

describe('getFontLinks()', () => {
  const getUrl = (opts?: { cdn?: string; subset?: string; weight?: string }): string => {
    const { cdn, subset, weight } = {
      subset: 'latin',
      weight: 'regular',
      cdn: 'auto',
      ...opts,
    };
    const subsetToShorthandMap = {
      latin: 'la',
      greek: 'gr',
      cyril: 'cy',
    };

    return `${getCdnBaseUrl(cdn)}/porsche-design-system/fonts/porsche-next-w-${
      subsetToShorthandMap[subset]
    }-${weight}.min.*.woff2`;
  };

  const getPartialResultRegEx = (opts?: { subset?: string; weights?: string[]; cdn?: string; format?: string }) => {
    const { subset, weights, cdn, format } = {
      subset: 'latin',
      weights: ['regular'],
      cdn: 'auto',
      format: 'html',
      ...opts,
    };

    const links = weights.map(
      (weight) =>
        `<link rel=preload href=${getUrl({ cdn, subset, weight })} as=font type=font/woff2 crossorigin${
          format === 'jsx' ? '=true' : ''
        }>`
    );

    return transformToRegex(links.join(''));
  };

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
      expect(result).toMatch(getPartialResultRegEx());
    });

    it('should return default China CDN link', () => {
      const result = getFontLinks({ cdn: 'cn' });
      expect(result).toMatch(getPartialResultRegEx({ cdn: 'cn' }));
    });

    it.each([
      ['latin', 'thin'],
      ['latin', 'regular'],
      ['latin', 'semi-bold'],
      ['latin', 'bold'],
      ['greek', 'thin'],
      ['greek', 'regular'],
      ['greek', 'semi-bold'],
      ['greek', 'bold'],
      ['cyril', 'thin'],
      ['cyril', 'regular'],
      ['cyril', 'semi-bold'],
      ['cyril', 'bold'],
    ])(
      'should return %s subset and %s weight link',
      (subset: 'latin' | 'greek' | 'cyril', weight: 'thin' | 'regular' | 'semi-bold' | 'bold') => {
        const result = getFontLinks({ subset, weights: [weight] });

        expect(result).toMatch(getPartialResultRegEx({ subset, weights: [weight] }));
      }
    );

    it('should return multiple links', () => {
      const result = getFontLinks({ weights: ['regular', 'semi-bold'] });

      expect(result).toMatch(getPartialResultRegEx({ weights: ['regular', 'semi-bold'] }));
    });

    it('should be minified', () => {
      const result = getFontLinks();
      expect(result).not.toContain('"');
      expect(result).not.toContain("'");
    });
  });

  describe('url without tag', () => {
    it('should return default url', () => {
      const result = getFontLinks({ withoutTags: true });

      expect(result.join()).toMatch(transformToRegex(getUrl({ cdn: 'auto' })));
    });

    it('should return default China CDN url', () => {
      const result = getFontLinks({ withoutTags: true, cdn: 'cn' });

      expect(result.length).toBe(1);
      expect(result.join()).toMatch(transformToRegex(getUrl({ cdn: 'cn' })));
    });

    it.each([
      ['latin', 'thin'],
      ['latin', 'regular'],
      ['latin', 'semi-bold'],
      ['latin', 'bold'],
      ['greek', 'thin'],
      ['greek', 'regular'],
      ['greek', 'semi-bold'],
      ['greek', 'bold'],
      ['cyril', 'thin'],
      ['cyril', 'regular'],
      ['cyril', 'semi-bold'],
      ['cyril', 'bold'],
    ])(
      'should return %s subset and %s weight url',
      (subset: 'latin' | 'cyril' | 'greek', weight: 'thin' | 'regular' | 'semi-bold' | 'bold') => {
        const result = getFontLinks({ withoutTags: true, subset, weights: [weight] });

        expect(result.join()).toMatch(transformToRegex(getUrl({ cdn: 'auto', subset, weight })));
      }
    );

    it('should return multiple urls', () => {
      const result = getFontLinks({ withoutTags: true, weights: ['regular', 'semi-bold'] });

      expect(result.length).toBe(2);

      const urls = ['regular', 'semi-bold'].map((weight) => getUrl({ cdn: 'auto', subset: 'latin', weight })).join(',');
      expect(result.join()).toMatch(transformToRegex(urls));
    });
  });

  describe('format jsx', () => {
    type FontWeight = 'regular' | 'thin' | 'semi-bold' | 'bold';

    const getRenderedInnerHtml = (opts?: { subset?: 'latin' | 'greek' | 'cyril'; weights?: FontWeight[] }): string => {
      const { subset = 'latin', weights = ['regular'] } = opts || {};

      const { container } = render(<>{getFontLinks({ subset, weights, format: 'jsx' })}</>);
      return container.innerHTML.replace(/"/g, '');
    };

    it('should return default url', () => {
      const { container } = render(<>{getFontLinks({ format: 'jsx' })}</>);
      const result = container.innerHTML.replace(/"/g, '');
      expect(result).toMatch(getPartialResultRegEx({ format: 'jsx' }));
    });

    it.each([
      ['latin', ['thin']],
      ['latin', ['regular']],
      ['latin', ['semi-bold']],
      ['latin', ['bold']],
      ['greek', ['thin']],
      ['greek', ['regular']],
      ['greek', ['semi-bold']],
      ['greek', ['bold']],
      ['cyril', ['thin']],
      ['cyril', ['regular']],
      ['cyril', ['semi-bold']],
      ['cyril', ['bold']],
    ])('should return %s subset and %s weight url', (subset: 'latin' | 'cyril' | 'greek', weight: FontWeight[]) => {
      const result = getRenderedInnerHtml({ subset, weights: weight });

      expect(result).toMatch(getPartialResultRegEx({ subset, weights: weight, format: 'jsx' }));
    });

    it('should return multiple urls', () => {
      const result = getRenderedInnerHtml({ weights: ['regular', 'semi-bold'] });

      expect(result).toMatch(getPartialResultRegEx({ weights: ['regular', 'semi-bold'], format: 'jsx' }));
    });
  });
});
