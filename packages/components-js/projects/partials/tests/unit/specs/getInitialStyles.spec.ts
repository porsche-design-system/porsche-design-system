import { format } from 'prettier';
import { renderToString } from 'react-dom/server';
import { getInitialStyles } from '../../../src';

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
    expect(result).toMatchInlineSnapshot(`"'sha256-xpyJBAn3ZJ5R++EAN1i25ugPllMZ58BjiLqaSUpLyuw='"`);
  });

  it('should return hash for core styles with custom prefix', async () => {
    const result = getInitialStyles({ format: 'sha256', prefix: 'custom-prefix' });
    expect(result).toMatchInlineSnapshot(`"'sha256-C7bm6kHHqoRGU/VwlpNP7fxUlMo8O7MdAwgRbUSndK8='"`);
  });

  it('should return hash for core styles with multiple custom prefixes', async () => {
    const result = getInitialStyles({ format: 'sha256', prefix: ['', 'some-prefix', 'another-prefix'] });
    expect(result).toMatchInlineSnapshot(`"'sha256-HnOysEVsgrt8KjyNcD0mYTSP4rn5TvptCoI4Wwt+YmY='"`);
  });
});

describe('globalStyles', () => {
  it('should return correct styles for globalStyles=true', async () => {
    const result = getInitialStyles();
    expect(result).toMatchInlineSnapshot(
      `"<style data-pds-initial-styles>html,body{margin:0;padding:0;font-family:'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif;line-height:calc(6px + 2.125ex);letter-spacing:normal;text-size-adjust:none;-webkit-text-size-adjust:none}:is(p-accordion,p-banner,p-button,p-button-group,p-button-pure,p-button-tile,p-canvas,p-carousel,p-checkbox,p-checkbox-wrapper,p-content-wrapper,p-crest,p-display,p-divider,p-drilldown,p-drilldown-item,p-drilldown-link,p-fieldset,p-fieldset-wrapper,p-flag,p-flex,p-flex-item,p-flyout,p-grid,p-grid-item,p-heading,p-headline,p-icon,p-inline-notification,p-input-date,p-input-email,p-input-month,p-input-number,p-input-password,p-input-search,p-input-tel,p-input-text,p-input-time,p-input-url,p-input-week,p-link,p-link-pure,p-link-social,p-link-tile,p-link-tile-model-signature,p-link-tile-product,p-marque,p-modal,p-model-signature,p-multi-select,p-multi-select-option,p-optgroup,p-pagination,p-pin-code,p-popover,p-radio-button-wrapper,p-radio-group,p-radio-group-option,p-scroller,p-segmented-control,p-segmented-control-item,p-select,p-select-option,p-select-wrapper,p-sheet,p-spinner,p-stepper-horizontal,p-stepper-horizontal-item,p-switch,p-table,p-table-body,p-table-cell,p-table-head,p-table-head-cell,p-table-head-row,p-table-row,p-tabs,p-tabs-bar,p-tabs-item,p-tag,p-tag-dismissible,p-text,p-text-field-wrapper,p-text-list,p-text-list-item,p-textarea,p-textarea-wrapper,p-toast,p-wordmark):not(:defined,.ssr,[data-ssr]){visibility:hidden}</style>"`
    );
  });

  it('should return correct styles for globalStyles=false', async () => {
    const result = getInitialStyles({ globalStyles: false });
    expect(result).toMatchInlineSnapshot(
      `"<style data-pds-initial-styles>:is(p-accordion,p-banner,p-button,p-button-group,p-button-pure,p-button-tile,p-canvas,p-carousel,p-checkbox,p-checkbox-wrapper,p-content-wrapper,p-crest,p-display,p-divider,p-drilldown,p-drilldown-item,p-drilldown-link,p-fieldset,p-fieldset-wrapper,p-flag,p-flex,p-flex-item,p-flyout,p-grid,p-grid-item,p-heading,p-headline,p-icon,p-inline-notification,p-input-date,p-input-email,p-input-month,p-input-number,p-input-password,p-input-search,p-input-tel,p-input-text,p-input-time,p-input-url,p-input-week,p-link,p-link-pure,p-link-social,p-link-tile,p-link-tile-model-signature,p-link-tile-product,p-marque,p-modal,p-model-signature,p-multi-select,p-multi-select-option,p-optgroup,p-pagination,p-pin-code,p-popover,p-radio-button-wrapper,p-radio-group,p-radio-group-option,p-scroller,p-segmented-control,p-segmented-control-item,p-select,p-select-option,p-select-wrapper,p-sheet,p-spinner,p-stepper-horizontal,p-stepper-horizontal-item,p-switch,p-table,p-table-body,p-table-cell,p-table-head,p-table-head-cell,p-table-head-row,p-table-row,p-tabs,p-tabs-bar,p-tabs-item,p-tag,p-tag-dismissible,p-text,p-text-field-wrapper,p-text-list,p-text-list-item,p-textarea,p-textarea-wrapper,p-toast,p-wordmark):not(:defined,.ssr,[data-ssr]){visibility:hidden}</style>"`
    );
  });
});
