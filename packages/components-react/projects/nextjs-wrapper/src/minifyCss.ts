// TODO: remove :hover and :focus styles
export const minifyCss = (css: string): string =>
  css.replace(/\s\s+|\.\\(?=:)|[\n\\]+| (?={)|;(?=\s+})|(:|media)\s(?=.*;?)/g, '$1');
