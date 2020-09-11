/* Auto Generated Below */
  
type Options = {
  cdn?: 'auto' | 'cn';
  withoutTags?: boolean;
};

export const getFontFaceCSS = (opts?: Options): string => {
  const url = `${opts?.cdn === 'cn' ? 'https://cdn.ui.porsche.cn' : 'https://cdn.ui.porsche.com'}/porsche-design-system/styles/${opts?.cdn === 'cn' ? 'font-face.min.cn.172e88acd22bc094e313d6d7bd56a11a.css' : 'font-face.min.b0ce2316e7754d7e76bbc1ff9fcc7932.css'}`;
  return opts?.withoutTags ? url : '<link rel=stylesheet href=$URL$>'.replace('$URL$', url);
}

export const getPorscheDesignSystemCoreStyles = (opts?: Pick<Options, 'withoutTags'>): string => {
  const styleInnerHtml = 'p-button,p-button-pure,p-checkbox-wrapper,p-content-wrapper,p-divider,p-fieldset-wrapper,p-flex,p-flex-item,p-grid,p-grid-item,p-headline,p-icon,p-link,p-link-pure,p-link-social,p-marque,p-pagination,p-radio-button-wrapper,p-select-wrapper,p-spinner,p-text,p-text-field-wrapper,p-text-list,p-text-list-item,p-textarea-wrapper{visibility:hidden}';
  return opts?.withoutTags ? styleInnerHtml : `<style>${styleInnerHtml}</style>`;
};