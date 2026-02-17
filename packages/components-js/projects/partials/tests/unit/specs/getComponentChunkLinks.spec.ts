import { renderToString } from 'react-dom/server';
import { vi, describe, it, expect } from 'vitest';
import type { ComponentChunkName } from '../../../../components-wrapper';
import { COMPONENT_CHUNK_NAMES } from '../../../../components-wrapper';
import { getComponentChunkLinks } from '../../../src';

const { version } = require('../../../../components-wrapper/package.json');

const hash = '[a-z0-9]{20}';
const baseHrefCom = 'https:\\/\\/cdn\\.ui\\.porsche\\.com\\/porsche-design-system\\/components';
const baseHrefCn = 'https:\\/\\/cdn\\.ui\\.porsche\\.cn\\/porsche-design-system\\/components';

vi.mock('../../../src/shared');

describe('validation', () => {
  it('should throw error on invalid components parameter', () => {
    expect(() =>
      getComponentChunkLinks({ components: ['some-invalid-component'] as any[] })
    ).toThrowErrorMatchingInlineSnapshot(`
      [Error: [Porsche Design System] The following supplied component chunk names are invalid:
        some-invalid-component

      Please use only valid component chunk names:
        accordion, banner, button-pure, button-tile, button, canvas, carousel, checkbox, crest, display, divider, drilldown, fieldset, flag, flyout, heading, icon, inline-notification, input-date, input-email, input-month, input-number, input-password, input-search, input-tel, input-text, input-time, input-url, input-week, link-pure, link-tile-product, link-tile, link, modal, model-signature, multi-select, optgroup, pagination, pin-code, popover, radio-group, scroller, segmented-control, select, sheet, spinner, stepper-horizontal, switch, table, tabs-bar, tabs, tag-dismissible, tag, text-list, text, textarea, toast, wordmark]
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
    const result = getComponentChunkLinks({ components: ['button', 'button-pure', 'crest'] });
    const regex = new RegExp(
      `^${coreLinkCom}<link rel=preload href=${baseHrefCom}/porsche-design-system\\.button\\.${hash}\\.js as=script><link rel=preload href=${baseHrefCom}/porsche-design-system\\.button-pure\\.${hash}\\.js as=script><link rel=preload href=${baseHrefCom}/porsche-design-system\\.crest\\.${hash}\\.js as=script>$`
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
      components: ['button', 'button-pure', 'crest'],
    });
    const regex = new RegExp(
      `^${coreLinkCom}<link rel="preload" href="${baseHrefCom}/porsche-design-system\\.button\\.${hash}\\.js" as="script"/><link rel="preload" href="${baseHrefCom}/porsche-design-system\\.button-pure\\.${hash}\\.js" as="script"/><link rel="preload" href="${baseHrefCom}/porsche-design-system\\.crest\\.${hash}\\.js" as="script"/>$`
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
