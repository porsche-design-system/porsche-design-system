import { getComponentChunkLinks } from '../../../src';
import type { ComponentChunkName } from '../../../../components-wrapper';
import { COMPONENT_CHUNK_NAMES } from '../../../../components-wrapper';
import { render } from '@testing-library/react';

const { version } = require('../../../../components-wrapper/package.json');

const hash = '[a-z0-9]{20}';
const baseHrefCom = 'https:\\/\\/cdn\\.ui\\.porsche\\.com\\/porsche-design-system\\/components';
const baseHrefCn = 'https:\\/\\/cdn\\.ui\\.porsche\\.cn\\/porsche-design-system\\/components';

jest.mock('../../../src/shared');

describe('validation', () => {
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
});

describe('format: html', () => {
  const coreLinkCom = `<link rel=preload href=${baseHrefCom}/porsche-design-system.v${version}.${hash}.js as=script crossorigin>`;

  it('should return core link', () => {
    const result = getComponentChunkLinks();
    expect(result).toMatch(new RegExp(coreLinkCom));
  });

  it('should return core link for china cdn', () => {
    const result = getComponentChunkLinks({ cdn: 'cn' });
    const regex = new RegExp(
      `<link rel=preload href=${baseHrefCn}/porsche-design-system.v${version}.${hash}.js as=script crossorigin>`
    );
    expect(result).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result = getComponentChunkLinks({ components: ['button', 'button-pure', 'marque'] });
    const regex = new RegExp(
      `${coreLinkCom}<link rel=preload href=${baseHrefCom}/porsche-design-system.button.${hash}.js as=script><link rel=preload href=${baseHrefCom}/porsche-design-system.button-pure.${hash}.js as=script><link rel=preload href=${baseHrefCom}/porsche-design-system.marque.${hash}.js as=script>`
    );
    expect(result).toMatch(regex);
  });

  COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
    it(`should return core and chunk link for ['${chunkName}']`, () => {
      const result = getComponentChunkLinks({ components: [chunkName] });
      const regex = new RegExp(
        `${coreLinkCom}<link rel=preload href=${baseHrefCom}/porsche-design-system.${chunkName}.${hash}.js as=script>`
      );

      expect(result).toMatch(regex);
    });
  });
});

describe('format: jsx', () => {
  const coreLinkCom = `<link rel="preload" href="${baseHrefCom}/porsche-design-system.v${version}.${hash}.js" as="script" crossorigin="true">`;

  it('should return core link', () => {
    const { container } = render(getComponentChunkLinks({ format: 'jsx' }));

    expect(container.innerHTML).toMatch(new RegExp(coreLinkCom));
  });

  it('should return core link for china cdn', () => {
    const { container } = render(getComponentChunkLinks({ format: 'jsx', cdn: 'cn' }));
    const regex = new RegExp(
      `<link rel="preload" href="${baseHrefCn}/porsche-design-system.v${version}.${hash}.js" as="script" crossorigin="true">`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return multiple links', () => {
    const { container } = render(
      getComponentChunkLinks({ format: 'jsx', components: ['button', 'button-pure', 'marque'] })
    );
    const regex = new RegExp(
      `${coreLinkCom}<link rel="preload" href="${baseHrefCom}/porsche-design-system.button.${hash}.js" as="script"><link rel="preload" href="${baseHrefCom}/porsche-design-system.button-pure.${hash}.js" as="script"><link rel="preload" href="${baseHrefCom}/porsche-design-system.marque.${hash}.js" as="script">`
    );

    expect(container.innerHTML).toMatch(regex);
  });

  COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
    it(`should return core and chunk link for ['${chunkName}']`, () => {
      const { container } = render(getComponentChunkLinks({ format: 'jsx', components: [chunkName] }));
      const regex = new RegExp(
        `${coreLinkCom}<link rel="preload" href="${baseHrefCom}/porsche-design-system.${chunkName}.${hash}.js" as="script">`
      );

      expect(container.innerHTML).toMatch(regex);
    });
  });
});

describe('withoutTags: true', () => {
  const coreUrlRegexCom = new RegExp(`${baseHrefCom}/porsche-design-system.v${version}.${hash}.js`);

  it('should return core url', () => {
    const result = getComponentChunkLinks({ withoutTags: true });

    expect(result[0]).toMatch(coreUrlRegexCom);
    expect(result.length).toBe(1);
  });

  it('should return core China CDN url', () => {
    const result = getComponentChunkLinks({ withoutTags: true, cdn: 'cn' });
    const regex = new RegExp(`${baseHrefCn}/porsche-design-system.v${version}.${hash}.js`);

    expect(result[0]).toMatch(regex);
    expect(result.length).toBe(1);
  });

  it('should return multiple urls', () => {
    const result = getComponentChunkLinks({ withoutTags: true, components: ['button', 'button-pure', 'marque'] });

    const buttonUrlRegex = new RegExp(`${baseHrefCom}/porsche-design-system.button.${hash}.js`);
    const buttonPureUrlRegex = new RegExp(`${baseHrefCom}/porsche-design-system.button-pure.${hash}.js`);
    const marqueUrlRegex = new RegExp(`${baseHrefCom}/porsche-design-system.marque.${hash}.js`);

    expect(result[0]).toMatch(coreUrlRegexCom);
    expect(result[1]).toMatch(buttonUrlRegex);
    expect(result[2]).toMatch(buttonPureUrlRegex);
    expect(result[3]).toMatch(marqueUrlRegex);
    expect(result.length).toBe(4);
  });

  COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
    it(`should return core and chunk url for ['${chunkName}']`, () => {
      const result = getComponentChunkLinks({ withoutTags: true, components: [chunkName] });
      const regex = new RegExp(`${baseHrefCom}/porsche-design-system.${chunkName}.${hash}.js`);

      expect(result[0]).toMatch(coreUrlRegexCom);
      expect(result[1]).toMatch(regex);
      expect(result.length).toBe(2);
    });
  });
});
