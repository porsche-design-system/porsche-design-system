import { getComponentChunkLinks } from '../../../src';
import type { ComponentChunkName } from '../../../../components-wrapper';
import { COMPONENT_CHUNK_NAMES } from '../../../../components-wrapper';
import { renderToString } from 'react-dom/server';

const { version } = require('../../../../components-wrapper/package.json');

const hash = '[a-z0-9]{20}';
const baseHrefCom = 'https:\\/\\/cdn\\.ui\\.porsche\\.com\\/porsche-design-system\\/components';
const baseHrefCn = 'https:\\/\\/cdn\\.ui\\.porsche\\.cn\\/porsche-design-system\\/components';

jest.mock('../../../src/shared');

describe('validation', () => {
  it('should throw error on invalid components parameter', () => {
    expect(() => getComponentChunkLinks({ components: (['some-invalid-component'] as any[]) })).
toThrowErrorMatchingInlineSnapshot(`
"[Porsche Design System] The following supplied component chunk names are invalid:
  some-invalid-component

Please use only valid component chunk names:
  accordion, banner, button-group, button-pure, button-tile, button, carousel, checkbox-wrapper, content-wrapper, crest, display, divider, fieldset-wrapper, fieldset, flex, flyout, grid, heading, headline, icon, inline-notification, link-pure, link-social, link-tile-model-signature, link-tile-product, link-tile, link, marque, modal, model-signature, multi-select, pagination, pin-code, popover, radio-button-wrapper, scroller, segmented-control, select-wrapper, spinner, stepper-horizontal, switch, table, tabs-bar, tabs, tag-dismissible, tag, text-field-wrapper, text-list, text, textarea-wrapper, toast, wordmark"
`);
  });
});

describe('format: html', () => {
  const coreLinkCom = `<link rel=preload href=${baseHrefCom}/porsche-design-system\\.v${version}\\.${hash}\\.js as=script crossorigin>`;

  it('should return core link', () => {
    const result = getComponentChunkLinks();
    expect(result).toMatch(new RegExp(`^${coreLinkCom}$`));
  });

  it('should return core link for china cdn', () => {
    const result = getComponentChunkLinks({ cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel=preload href=${baseHrefCn}/porsche-design-system\\.v${version}\\.${hash}\\.js as=script crossorigin>$`
    );
    expect(result).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result = getComponentChunkLinks({ components: ['button', 'button-pure', 'marque'] });
    const regex = new RegExp(
      `^${coreLinkCom}<link rel=preload href=${baseHrefCom}/porsche-design-system\\.button\\.${hash}\\.js as=script><link rel=preload href=${baseHrefCom}/porsche-design-system\\.button-pure\\.${hash}\\.js as=script><link rel=preload href=${baseHrefCom}/porsche-design-system\\.marque\\.${hash}\\.js as=script>$`
    );
    expect(result).toMatch(regex);
  });

  COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
    it(`should return core and chunk link for ['${chunkName}']`, () => {
      const result = getComponentChunkLinks({ components: [chunkName] });
      const regex = new RegExp(
        `^${coreLinkCom}<link rel=preload href=${baseHrefCom}/porsche-design-system\\.${chunkName}\\.${hash}\\.js as=script>$`
      );

      expect(result).toMatch(regex);
    });
  });
});

describe('format: jsx', () => {
  const coreLinkCom = `<link rel="preload" href="${baseHrefCom}/porsche-design-system\\\.v${version}\\\.${hash}\\\.js" as="script" crossorigin=""/>`;

  it('should return core link', () => {
    const result = getComponentChunkLinks({ format: 'jsx' });
    expect(renderToString(result)).toMatch(new RegExp(`^${coreLinkCom}$`));
  });

  it('should return core link for china cdn', () => {
    const result = getComponentChunkLinks({ format: 'jsx', cdn: 'cn' });
    const regex = new RegExp(
      `^<link rel="preload" href="${baseHrefCn}/porsche-design-system\\.v${version}\\.${hash}\\.js" as="script" crossorigin=""/>$`
    );
    expect(renderToString(result)).toMatch(regex);
  });

  it('should return multiple links', () => {
    const result = getComponentChunkLinks({
      format: 'jsx',
      components: ['button', 'button-pure', 'marque'],
    });
    const regex = new RegExp(
      `^${coreLinkCom}<link rel="preload" href="${baseHrefCom}/porsche-design-system\\.button\\.${hash}\\.js" as="script"/><link rel="preload" href="${baseHrefCom}/porsche-design-system\\.button-pure\\.${hash}\\.js" as="script"/><link rel="preload" href="${baseHrefCom}/porsche-design-system\\.marque\\.${hash}\\.js" as="script"/>$`
    );

    expect(renderToString(result)).toMatch(regex);
  });

  COMPONENT_CHUNK_NAMES.forEach((chunkName: ComponentChunkName) => {
    it(`should return core and chunk link for ['${chunkName}']`, () => {
      const result = getComponentChunkLinks({ format: 'jsx', components: [chunkName] });
      const regex = new RegExp(
        `^${coreLinkCom}<link rel="preload" href="${baseHrefCom}/porsche-design-system\\.${chunkName}\\.${hash}\\.js" as="script"/>$`
      );

      expect(renderToString(result)).toMatch(regex);
    });
  });
});
