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
    let errorMessage = '';
    try {
      getComponentChunkLinks({ components: ['some-invalid-component'] as any[] });
    } catch (e) {
      errorMessage = (e as Error).message;
    }

    expect(errorMessage).toContain('The following supplied component chunk names are invalid:');
    expect(errorMessage).toContain('some-invalid-component');
  });
});

describe('format: html', () => {
  const coreLinkCom = `<link rel=preload href=${baseHrefCom}/porsche-design-system.v${version}.${hash}.js as=script crossorigin>`;

  it('should return core link', () => {
    const result: string = getComponentChunkLinks();
    expect(result).toMatch(new RegExp(coreLinkCom));
  });

  it('should return core link for china cdn', () => {
    const result: string = getComponentChunkLinks({ cdn: 'cn' });
    const regex = new RegExp(
      `<link rel=preload href=${baseHrefCn}/porsche-design-system.v${version}.${hash}.js as=script crossorigin>`
    );
    expect(result).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result: string = getComponentChunkLinks({ components: ['button', 'button-pure', 'marque'] });
    const regex = new RegExp(
      `${coreLinkCom}<link rel=preload href=${baseHrefCom}/porsche-design-system.button.${hash}.js as=script><link rel=preload href=${baseHrefCom}/porsche-design-system.button-pure.${hash}.js as=script><link rel=preload href=${baseHrefCom}/porsche-design-system.marque.${hash}.js as=script>`
    );
    expect(result).toMatch(regex);
  });

  COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
    it(`should return core and chunk link for ['${chunkName}']`, () => {
      const result: string = getComponentChunkLinks({ components: [chunkName] });
      const regex = new RegExp(
        `${coreLinkCom}<link rel=preload href=${baseHrefCom}/porsche-design-system.${chunkName}.${hash}.js as=script>`
      );

      expect(result).toMatch(regex);
    });
  });
});

describe('format: jsx', () => {
  const coreLinkCom = `<link rel="preload" href="${baseHrefCom}/porsche-design-system.v${version}.${hash}.js" as="script" crossorigin="">`;

  it('should return core link', () => {
    const result: JSX.Element = getComponentChunkLinks({ format: 'jsx' });
    const { container } = render(result);

    expect(container.innerHTML).toMatch(new RegExp(coreLinkCom));
  });

  it('should return core link for china cdn', () => {
    const result: JSX.Element = getComponentChunkLinks({ format: 'jsx', cdn: 'cn' });
    const { container } = render(result);
    const regex = new RegExp(
      `<link rel="preload" href="${baseHrefCn}/porsche-design-system.v${version}.${hash}.js" as="script" crossorigin="">`
    );
    expect(container.innerHTML).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result: JSX.Element = getComponentChunkLinks({
      format: 'jsx',
      components: ['button', 'button-pure', 'marque'],
    });
    const { container } = render(result);
    const regex = new RegExp(
      `${coreLinkCom}<link rel="preload" href="${baseHrefCom}/porsche-design-system.button.${hash}.js" as="script"><link rel="preload" href="${baseHrefCom}/porsche-design-system.button-pure.${hash}.js" as="script"><link rel="preload" href="${baseHrefCom}/porsche-design-system.marque.${hash}.js" as="script">`
    );

    expect(container.innerHTML).toMatch(regex);
  });

  COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
    it(`should return core and chunk link for ['${chunkName}']`, () => {
      const result: JSX.Element = getComponentChunkLinks({ format: 'jsx', components: [chunkName] });
      const { container } = render(result);
      const regex = new RegExp(
        `${coreLinkCom}<link rel="preload" href="${baseHrefCom}/porsche-design-system.${chunkName}.${hash}.js" as="script">`
      );

      expect(container.innerHTML).toMatch(regex);
    });
  });
});
