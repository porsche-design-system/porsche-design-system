/* Auto Generated Below */
  
type Options = {
  cdn?: 'auto' | 'cn';
  withoutTags?: boolean;
};

export const getFontFaceCSS = (opts?: Options): string => {
  const url = `${opts?.cdn === 'cn' ? 'https://cdn.ui.porsche.cn' : 'https://cdn.ui.porsche.com'}/porsche-design-system/styles/${opts?.cdn === 'cn' ? 'font-face.min.cn.c1b46971322e96095de49987cdc90226.css' : 'font-face.min.de7353ac41430a74da152a5bf0e7bb5b.css'}`;
  return opts?.withoutTags ? url : '<link rel=stylesheet href=$URL$>'.replace('$URL$', url);
}

export const getPorscheDesignSystemCoreStyles = (opts?: Pick<Options, 'withoutTags'>): string => {
  const styleInnerHtml = 'p-button,p-button-pure,p-checkbox-wrapper,p-content-wrapper,p-divider,p-fieldset-wrapper,p-flex,p-flex-item,p-grid,p-grid-item,p-headline,p-icon,p-link,p-link-pure,p-link-social,p-marque,p-pagination,p-radio-button-wrapper,p-select-wrapper,p-spinner,p-tabs,p-tabs-bar,p-tabs-item,p-text,p-text-field-wrapper,p-text-list,p-text-list-item,p-textarea-wrapper{visibility:hidden}';
  return opts?.withoutTags ? styleInnerHtml : `<style>${styleInnerHtml}</style>`;
};