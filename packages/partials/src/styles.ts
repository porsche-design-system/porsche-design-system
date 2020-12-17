/* Auto Generated Below */
  
type Options = {
  cdn?: 'auto' | 'cn';
  withoutTags?: boolean;
  prefix?: string;
};

export const getFontFaceCSS = (opts?: Pick<Options, 'cdn' | 'withoutTags'>): string => {
  const url = `${opts?.cdn === 'cn' ? 'https://cdn.ui.porsche.cn' : 'https://cdn.ui.porsche.com'}/porsche-design-system/styles/${opts?.cdn === 'cn' ? 'font-face.min.cn.ab128226e97d77abe80c8c491374b9b3.css' : 'font-face.min.6fdc3844907953937260ca9bdb49bf8d.css'}`;
  return opts?.withoutTags ? url : `<link rel=stylesheet href=${url}>`;
}

export const getPorscheDesignSystemCoreStyles = (opts?: Pick<Options, 'withoutTags' | 'prefix'>): string => {
  const tagNames = ['p-banner', 'p-button', 'p-button-pure', 'p-checkbox-wrapper', 'p-content-wrapper', 'p-divider', 'p-fieldset-wrapper', 'p-flex', 'p-flex-item', 'p-grid', 'p-grid-item', 'p-headline', 'p-icon', 'p-link', 'p-link-pure', 'p-link-social', 'p-marque', 'p-modal', 'p-pagination', 'p-radio-button-wrapper', 'p-select-wrapper', 'p-spinner', 'p-tabs', 'p-tabs-bar', 'p-tabs-item', 'p-text', 'p-text-field-wrapper', 'p-text-list', 'p-text-list-item', 'p-textarea-wrapper'];
  const styleInnerHtml = tagNames.map((x) => opts?.prefix ? `${opts.prefix}-${x}` : x).join(',') + '{visibility:hidden}';
  return opts?.withoutTags ? styleInnerHtml : `<style>${styleInnerHtml}</style>`;
};