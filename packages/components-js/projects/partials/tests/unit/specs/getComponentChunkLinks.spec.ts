import { getComponentChunkLinks } from '../../../src';
import { COMPONENT_CHUNK_NAMES, ComponentChunkName } from '../../../../components-wrapper';
import { version } from '../../../../components-wrapper/environment';
import { render } from '@testing-library/react';

const hash = '[a-z0-9]{20}';
const baseHrefCom = 'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system';
const baseHrefCn = 'https://cdn.ui.porsche.cn/porsche-design-system/components/porsche-design-system';

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

describe('format: html', () => {
  const coreLinkCom = `<link rel=preload href=${baseHrefCom}.v${version}.${hash}.js as=script crossorigin>`;

  it('should return core link by default', () => {
    const result = getComponentChunkLinks();
    expect(result).toMatch(new RegExp(coreLinkCom));
  });

  it('should return default core China CDN link', () => {
    const result = getComponentChunkLinks({ cdn: 'cn' });
    const regex = new RegExp(`<link rel=preload href=${baseHrefCn}.v${version}.${hash}.js as=script crossorigin>`);
    expect(result).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result = getComponentChunkLinks({ components: ['button', 'button-pure', 'marque'] });
    const regex = new RegExp(
      `${coreLinkCom}<link rel=preload href=${baseHrefCom}.button.${hash}.js as=script><link rel=preload href=${baseHrefCom}.button-pure.${hash}.js as=script><link rel=preload href=${baseHrefCom}.marque.${hash}.js as=script>`
    );
    expect(result).toMatch(regex);
  });

  COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
    it(`should return core and chunk link for ['${chunkName}']`, () => {
      const result = getComponentChunkLinks({ components: [chunkName] });
      const regex = new RegExp(
        `${coreLinkCom}<link rel=preload href=${baseHrefCom}.${chunkName}.${hash}.js as=script>`
      );

      expect(result).toMatch(regex);
    });
  });
});

describe('format jsx', () => {
  const coreLinkCom = `<link rel="preload" href="${baseHrefCom}.v${version}.${hash}.js" as="script" crossorigin="true">`;

  it('should return core link markup by default', () => {
    const { container } = render(getComponentChunkLinks({ format: 'jsx' }));

    expect(container.innerHTML).toMatch(new RegExp(coreLinkCom));
  });

  it('should return core link markup for china cdn', () => {
    const { container } = render(getComponentChunkLinks({ format: 'jsx', cdn: 'cn' }));
    const regex = new RegExp(
      `<link rel="preload" href="${baseHrefCn}.v${version}.${hash}.js" as="script" crossorigin="true">`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return multiple jsx links', () => {
    const { container } = render(
      getComponentChunkLinks({ format: 'jsx', components: ['button', 'button-pure', 'marque'] })
    );
    const regex = new RegExp(
      `${coreLinkCom}<link rel="preload" href="${baseHrefCom}.button.${hash}.js" as="script"><link rel="preload" href="${baseHrefCom}.button-pure.${hash}.js" as="script"><link rel="preload" href="${baseHrefCom}.marque.${hash}.js" as="script">`
    );

    expect(container.innerHTML).toMatch(regex);
  });

  COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
    it(`should return core and chunk link for ['${chunkName}']`, () => {
      const { container } = render(getComponentChunkLinks({ format: 'jsx', components: [chunkName] }));
      const regex = new RegExp(
        `${coreLinkCom}<link rel="preload" href="${baseHrefCom}.${chunkName}.${hash}.js" as="script">`
      );

      expect(container.innerHTML).toMatch(regex);
    });
  });
});

describe('withoutTags: true', () => {
  const coreUrlRegexCom = new RegExp(`${baseHrefCom}.v${version}.${hash}.js`);

  it('should return core url by default', () => {
    const result = getComponentChunkLinks({ withoutTags: true });

    expect(result[0]).toMatch(coreUrlRegexCom);
    expect(result.length).toBe(1);
  });

  it('should return default core China CDN url', () => {
    const result = getComponentChunkLinks({ withoutTags: true, cdn: 'cn' });
    const regex = new RegExp(`${baseHrefCn}.v${version}.${hash}.js`);

    expect(result[0]).toMatch(regex);
    expect(result.length).toBe(1);
  });

  it('should return multiple urls', () => {
    const result = getComponentChunkLinks({ withoutTags: true, components: ['button', 'button-pure', 'marque'] });

    const buttonUrlRegex = new RegExp(`${baseHrefCom}.button.${hash}.js`);
    const buttonPureUrlRegex = new RegExp(`${baseHrefCom}.button-pure.${hash}.js`);
    const marqueUrlRegex = new RegExp(`${baseHrefCom}.marque.${hash}.js`);

    expect(result[0]).toMatch(coreUrlRegexCom);
    expect(result[1]).toMatch(buttonUrlRegex);
    expect(result[2]).toMatch(buttonPureUrlRegex);
    expect(result[3]).toMatch(marqueUrlRegex);
    expect(result.length).toBe(4);
  });

  COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
    it(`should return core and chunk url for ['${chunkName}']`, () => {
      const result = getComponentChunkLinks({ withoutTags: true, components: [chunkName] });
      const regex = new RegExp(`${baseHrefCom}.${chunkName}.${hash}.js`);

      expect(result[0]).toMatch(coreUrlRegexCom);
      expect(result[1]).toMatch(regex);
      expect(result.length).toBe(2);
    });
  });
});
