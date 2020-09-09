/* Auto Generated Below */
  
type Options = { withoutTags: boolean };

export const getFontFaceCSS = (options?: Options): string =>
  options?.withoutTags ? 'https://cdn.ui.porsche.com/porsche-design-system/styles/font-face.min.02a9c7ba97467baa51aa8a2ac5d1a777.css' : '<link rel=stylesheet href=https://cdn.ui.porsche.com/porsche-design-system/styles/font-face.min.02a9c7ba97467baa51aa8a2ac5d1a777.css>';

export const getPorscheDesignSystemCoreStyles = (options?: Options): string => {
  const styleInnerHtml = 'p-button,p-button-pure,p-checkbox-wrapper,p-content-wrapper,p-divider,p-fieldset-wrapper,p-flex,p-flex-item,p-grid,p-grid-item,p-headline,p-icon,p-link,p-link-pure,p-link-social,p-marque,p-pagination,p-radio-button-wrapper,p-select-wrapper,p-spinner,p-text,p-text-field-wrapper,p-text-list,p-text-list-item,p-textarea-wrapper{visibility:hidden}';
  return options?.withoutTags ? styleInnerHtml : `<style>${styleInnerHtml}</style>`;
};