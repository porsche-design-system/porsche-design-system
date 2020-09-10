/* Auto Generated Below */

type Options = {
  cdn?: 'auto' | 'cn';
  withoutTags?: boolean;
};

export const getFontFaceCSS = (opts?: Options): string => {
  const url = `${
    opts?.cdn === 'cn' ? 'https://cdn.ui.porsche.cn' : 'https://cdn.ui.porsche.com'
  }/porsche-design-system/styles/${
    opts?.cdn === 'cn'
      ? 'font-face.min.cn.abdac883866edfff1d135131399118d9.css'
      : 'font-face.min.02a9c7ba97467baa51aa8a2ac5d1a777.css'
  }`;
  return opts?.withoutTags ? url : '<link rel=stylesheet href=$URL$>'.replace('$URL$', url);
};

export const getPorscheDesignSystemCoreStyles = (opts?: Options): string => {
  const styleInnerHtml =
    'p-button,p-button-pure,p-checkbox-wrapper,p-content-wrapper,p-divider,p-fieldset-wrapper,p-flex,p-flex-item,p-grid,p-grid-item,p-headline,p-icon,p-link,p-link-pure,p-link-social,p-marque,p-pagination,p-radio-button-wrapper,p-select-wrapper,p-spinner,p-text,p-text-field-wrapper,p-text-list,p-text-list-item,p-textarea-wrapper{visibility:hidden}';
  return opts?.withoutTags ? styleInnerHtml : `<style>${styleInnerHtml}</style>`;
};
