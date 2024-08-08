import { getInitialStyles } from '../../../src';
import { renderToString } from 'react-dom/server';
import { format } from 'prettier';

const getFormattedCSSWithoutTag = (style: string): Promise<string> => {
  return format(style.replace(/<style.*>([\s\S]*)<\/style>/g, '$1'), { parser: 'css' });
};

describe('format: html', () => {
  it('should return core styles', async () => {
    const result = getInitialStyles();
    expect(result).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });

  it('should return core styles with custom prefix', async () => {
    const result = getInitialStyles({ prefix: 'custom-prefix' });
    expect(result).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });

  it('should return core styles with multiple custom prefixes', async () => {
    const result = getInitialStyles({ prefix: ['', 'some-prefix', 'another-prefix'] });
    expect(result).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });
});

describe('format: jsx', () => {
  it('should return core styles', async () => {
    const result = getInitialStyles({ format: 'jsx' });
    const html = renderToString(result);
    expect(html).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(html)).toMatchSnapshot();
  });

  it('should return core styles with custom prefix', async () => {
    const result = getInitialStyles({ format: 'jsx', prefix: 'custom-prefix' });
    const html = renderToString(result);
    expect(html).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(html)).toMatchSnapshot();
  });

  it('should return core styles with multiple custom prefixes', async () => {
    const result = getInitialStyles({ format: 'jsx', prefix: ['', 'some-prefix', 'another-prefix'] });
    const html = renderToString(result);
    expect(html).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(html)).toMatchSnapshot();
  });
});

describe('format: sha256', () => {
  it('should return hash for core styles', async () => {
    const result = getInitialStyles({ format: 'sha256' });
    expect(result).toMatchInlineSnapshot(`"'sha256-TJayBA+t8JxrzwyDRL1GyuH1+Y3/fQYa92NjjdgP85E='"`);
  });

  it('should return hash for core styles with custom prefix', async () => {
    const result = getInitialStyles({ format: 'sha256', prefix: 'custom-prefix' });
    expect(result).toMatchInlineSnapshot(`"'sha256-I4Fjl4ZpYkTigxKyaizheOosGGLUQwkG3n/kcKs6WBQ='"`);
  });

  it('should return hash for core styles with multiple custom prefixes', async () => {
    const result = getInitialStyles({ format: 'sha256', prefix: ['', 'some-prefix', 'another-prefix'] });
    expect(result).toMatchInlineSnapshot(`"'sha256-h430HKYWT7XrPcUrQUlpUjC6uUVjltkM2I6vxXCN2Fs='"`);
  });
});

describe('globalStyles', () => {
  it('should return correct styles for globalStyles=true', async () => {
    const result = getInitialStyles();
    expect(result).toMatchInlineSnapshot(
      `"<style data-pds-initial-styles>html,body{margin:0;padding:0;font-family:'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif;line-height:calc(6px + 2.125ex);letter-spacing:normal;text-size-adjust:none;-webkit-text-size-adjust:none}h1,h2,h3,h4,h5,h6{font-weight:600}p{hyphens:auto;font-weight:400;overflow-wrap:break-word}b,strong{font-weight:700}p-accordion,p-banner,p-button,p-button-group,p-button-pure,p-button-tile,p-canvas,p-carousel,p-checkbox-wrapper,p-content-wrapper,p-crest,p-display,p-divider,p-fieldset,p-fieldset-wrapper,p-flex,p-flex-item,p-flyout,p-flyout-multilevel,p-flyout-multilevel-item,p-grid,p-grid-item,p-heading,p-headline,p-icon,p-inline-notification,p-link,p-link-pure,p-link-social,p-link-tile,p-link-tile-model-signature,p-link-tile-product,p-marque,p-modal,p-model-signature,p-multi-select,p-multi-select-option,p-optgroup,p-pagination,p-pin-code,p-popover,p-radio-button-wrapper,p-scroller,p-segmented-control,p-segmented-control-item,p-select,p-select-option,p-select-wrapper,p-spinner,p-stepper-horizontal,p-stepper-horizontal-item,p-switch,p-table,p-table-body,p-table-cell,p-table-head,p-table-head-cell,p-table-head-row,p-table-row,p-tabs,p-tabs-bar,p-tabs-item,p-tag,p-tag-dismissible,p-text,p-text-field-wrapper,p-text-list,p-text-list-item,p-textarea,p-textarea-wrapper,p-toast,p-wordmark{visibility:hidden}.hydrated,.ssr{visibility:inherit}</style>"`
    );
  });

  it('should return correct styles for globalStyles=false', async () => {
    const result = getInitialStyles({ globalStyles: false });
    expect(result).toMatchInlineSnapshot(
      `"<style data-pds-initial-styles>p-accordion,p-banner,p-button,p-button-group,p-button-pure,p-button-tile,p-canvas,p-carousel,p-checkbox-wrapper,p-content-wrapper,p-crest,p-display,p-divider,p-fieldset,p-fieldset-wrapper,p-flex,p-flex-item,p-flyout,p-flyout-multilevel,p-flyout-multilevel-item,p-grid,p-grid-item,p-heading,p-headline,p-icon,p-inline-notification,p-link,p-link-pure,p-link-social,p-link-tile,p-link-tile-model-signature,p-link-tile-product,p-marque,p-modal,p-model-signature,p-multi-select,p-multi-select-option,p-optgroup,p-pagination,p-pin-code,p-popover,p-radio-button-wrapper,p-scroller,p-segmented-control,p-segmented-control-item,p-select,p-select-option,p-select-wrapper,p-spinner,p-stepper-horizontal,p-stepper-horizontal-item,p-switch,p-table,p-table-body,p-table-cell,p-table-head,p-table-head-cell,p-table-head-row,p-table-row,p-tabs,p-tabs-bar,p-tabs-item,p-tag,p-tag-dismissible,p-text,p-text-field-wrapper,p-text-list,p-text-list-item,p-textarea,p-textarea-wrapper,p-toast,p-wordmark{visibility:hidden}.hydrated,.ssr{visibility:inherit}</style>"`
    );
  });
});
