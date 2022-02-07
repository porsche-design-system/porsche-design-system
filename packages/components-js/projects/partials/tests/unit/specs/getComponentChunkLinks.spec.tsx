import { getComponentChunkLinks } from '../../../src';
import { COMPONENT_CHUNK_NAMES, ComponentChunkName } from '../../../../components-wrapper';
import { getCdnBaseUrl, transformToRegex } from '../helpers/shared';
import { version } from '../../../../components-wrapper/environment';
import { render } from '@testing-library/react';

describe('getComponentChunkLinks()', () => {
  const core = `v${version}`;

  const getUrl = (opts?: { cdn?: 'auto' | 'cn'; componentChunkName?: ComponentChunkName | string }): string => {
    const { cdn = 'auto', componentChunkName = core } = opts || {};
    return `${getCdnBaseUrl(cdn)}/porsche-design-system/components/porsche-design-system.${componentChunkName}.*.js`;
  };

  const getPartialResultRegExHtml = (opts?: {
    cdn?: 'auto' | 'cn';
    componentChunkNames?: ComponentChunkName[] | string[];
  }): string => {
    const { cdn = 'auto', componentChunkNames = [core] } = opts || {};

    const urls = componentChunkNames.map((name) => getUrl({ cdn, componentChunkName: name }));
    return urls
      .map((url, idx) => `<link rel=preload href=${url} as=script${idx === 0 ? ' crossorigin' : ''}>`)
      .join('');
  };

  const getPartialResultRegExJsx = (opts?: {
    cdn?: 'auto' | 'cn';
    componentChunkNames?: ComponentChunkName[] | string[];
  }): string => {
    const { cdn = 'auto', componentChunkNames = [core] } = opts || {};

    const urls = componentChunkNames.map((name) => getUrl({ cdn, componentChunkName: name }));
    return urls
      .map((url, idx) => `<link rel="preload" href="${url}" as="script"${idx === 0 ? ' crossorigin="true"' : ''}>`)
      .join('');
  };

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
    it('should return core link by default', () => {
      const result = getComponentChunkLinks();

      expect(result).toMatch(transformToRegex(getPartialResultRegExHtml()));
    });

    it('should return default core China CDN link', () => {
      const result = getComponentChunkLinks({ cdn: 'cn' });

      expect(result).toMatch(transformToRegex(getPartialResultRegExHtml({ cdn: 'cn' })));
    });

    it('should return multiple links', () => {
      const result = getComponentChunkLinks({ components: ['button', 'button-pure', 'marque'] });

      expect(result).toMatch(
        transformToRegex(getPartialResultRegExHtml({ componentChunkNames: [core, 'button', 'button-pure', 'marque'] }))
      );
    });

    COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
      it(`should return core and chunk link for ['${chunkName}']`, () => {
        const result = getComponentChunkLinks({ components: [chunkName] });

        expect(result).toMatch(transformToRegex(getPartialResultRegExHtml({ componentChunkNames: [core, chunkName] })));
      });
    });
  });

  describe('format jsx', () => {
    it('should return core link markup by default', () => {
      const { container } = render(<>{getComponentChunkLinks({ format: 'jsx' })}</>);

      expect(container.innerHTML).toMatch(transformToRegex(getPartialResultRegExJsx()));
    });

    it('should return multiple jsx links', () => {
      const { container } = render(
        <>{getComponentChunkLinks({ format: 'jsx', components: ['button', 'button-pure', 'marque'] })}</>
      );

      expect(container.innerHTML).toMatch(
        transformToRegex(getPartialResultRegExJsx({ componentChunkNames: [core, 'button', 'button-pure', 'marque'] }))
      );
    });

    COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
      it(`should return core and chunk link for ['${chunkName}']`, () => {
        const { container } = render(<>{getComponentChunkLinks({ format: 'jsx', components: [chunkName] })}</>);

        expect(container.innerHTML).toMatch(
          transformToRegex(getPartialResultRegExJsx({ componentChunkNames: [core, chunkName] }))
        );
      });
    });
  });

  describe('url without tag', () => {
    it('should return core url by default', () => {
      const result = getComponentChunkLinks({ withoutTags: true });

      expect(result.join()).toMatch(transformToRegex(getUrl()));
    });

    it('should return default core China CDN url', () => {
      const result = getComponentChunkLinks({ withoutTags: true, cdn: 'cn' });

      expect(result.join()).toMatch(transformToRegex(getUrl({ cdn: 'cn' })));
    });

    it('should return multiple urls', () => {
      const result = getComponentChunkLinks({ withoutTags: true, components: ['button', 'button-pure', 'marque'] });

      const urls = [core, 'button', 'button-pure', 'marque']
        .map((component) => getUrl({ componentChunkName: component }))
        .join();

      expect(result.length).toBe(4);
      expect(result.join()).toMatch(transformToRegex(urls));
    });

    COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
      it(`should return core and chunk url for ['${chunkName}']`, () => {
        const result = getComponentChunkLinks({ withoutTags: true, components: [chunkName] });

        const urls = [core, chunkName].map((component) => getUrl({ componentChunkName: component })).join();

        expect(result.length).toBe(2);
        expect(result.join()).toMatch(transformToRegex(urls));
      });
    });
  });
});
