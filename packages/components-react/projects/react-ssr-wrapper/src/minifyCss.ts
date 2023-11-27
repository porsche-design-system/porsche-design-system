export const minifyCss = (css: string): string => {
  // TODO: could remove whitespace in selectors following
  // - commas: e.g. `, `
  // - before/after + combinator, e.g. ` + `
  // - and potentially other combinators
  return css.replace(/\s\s+|\.\\(?=:)|[\n\\]+(?!\+)| (?={)|;(?=\s+})|(:|media)\s(?=.*;?)/g, '$1');
};
