import { getComponentChunkLinks } from '../../../src';
import { COMPONENT_CHUNK_NAMES, ComponentChunkName } from '../../../../components-wrapper';

describe('getComponentChunkLinks()', () => {
  const chunkBaseName = 'porsche-design-system';
  const cdnChunkUrlWithoutHash = `https://cdn.ui.porsche.com/porsche-design-system/components/${chunkBaseName}.`;
  const cdnChunkUrlCnWithoutHash = `https://cdn.ui.porsche.cn/porsche-design-system/components/${chunkBaseName}.`;

  it('should throw error on invalid components parameter', () => {
    let error;
    try {
      getComponentChunkLinks({ components: ['some-invalid-component'] as any[] });
    } catch (e) {
      error = e.message;
    }

    expect(error).toContain('The following supplied component chunk names are invalid:');
    expect(error).toContain('some-invalid-component');
  });

  describe('url with tag', () => {
    const linkStartsWith = '<link rel=preload href=';
    const linkEndsWithCore = 'as=script crossorigin>';
    const linkEndsWith = 'as=script>';

    it('should return core link by default', () => {
      const result = getComponentChunkLinks();
      expect(result.startsWith(linkStartsWith)).toBeTruthy();
      expect(result.endsWith(linkEndsWithCore)).toBeTruthy();
      expect(result).toContain(cdnChunkUrlWithoutHash + 'v');
    });

    it('should return default core China CDN link', () => {
      const result = getComponentChunkLinks({ cdn: 'cn' });
      expect(result.startsWith(linkStartsWith)).toBeTruthy();
      expect(result.endsWith(linkEndsWithCore)).toBeTruthy();
      expect(result).toContain(cdnChunkUrlCnWithoutHash + 'v');
    });

    it('should return multiple links', () => {
      const result = getComponentChunkLinks({ components: ['button', 'button-pure', 'marque'] });
      expect(result.includes(linkEndsWithCore)).toBeTruthy();
      expect(result.endsWith(linkEndsWith)).toBeTruthy();
      expect(result.match(/><link/g).length).toBe(3);
      expect(result).toContain(cdnChunkUrlWithoutHash + 'v');
    });

    COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
      it(`should return core and chunk link for ['${chunkName}']`, () => {
        const result = getComponentChunkLinks({ components: [chunkName] });
        expect(result.includes(linkEndsWithCore)).toBeTruthy();
        expect(result.endsWith(linkEndsWith)).toBeTruthy();
        expect(result.match(/><link/g).length).toBe(1);
        expect(result).toContain(cdnChunkUrlWithoutHash + 'v');
      });
    });
  });

  describe('url without tag', () => {
    const urlStartsWith = 'https://';
    const urlEndsWith = '.js';

    it('should return core url by default', () => {
      const result = getComponentChunkLinks({ withoutTags: true });
      expect(result.length).toBe(1);
      expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
      expect(result[0]).toContain(cdnChunkUrlWithoutHash + 'v');
    });

    it('should return default core China CDN url', () => {
      const result = getComponentChunkLinks({ withoutTags: true, cdn: 'cn' });
      expect(result.length).toBe(1);
      expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
      expect(result[0]).toContain(cdnChunkUrlCnWithoutHash + 'v');
    });

    it('should return multiple urls', () => {
      const result = getComponentChunkLinks({ withoutTags: true, components: ['button', 'button-pure', 'marque'] });
      expect(result.length).toBe(4);
      expect(result[0]).toContain(cdnChunkUrlWithoutHash + 'v');
      expect(result[0].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[0].endsWith(urlEndsWith)).toBeTruthy();
      expect(result[1].startsWith(urlStartsWith)).toBeTruthy();
      expect(result[1].endsWith(urlEndsWith)).toBeTruthy();
    });

    COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
      it(`should return core and chunk url for ['${chunkName}']`, () => {
        const result = getComponentChunkLinks({ withoutTags: true, components: [chunkName] });
        expect(result.length).toBe(2);
        expect(result[0]).toContain(cdnChunkUrlWithoutHash + 'v');
        expect(result[1].match(new RegExp(`${chunkBaseName}\\.${chunkName}\\.`)).length).toBe(1); // verify chunk number
      });
    });
  });
});
