export const minifyCss = (css: string): string => {
  // TODO: could remove whitespace in selectors following
  // - before/after + combinator, e.g. ` + ` -> should not be removed within calc()
  return css
    .replace(/\s\s+|\.\\(?=:)|[\n\\]+(?!\+)| (?={)|;(?=\s+})|(:|media)\s(?=.*;?)/g, '$1')
    .replace(/\s?(,|>|~)\s/g, '$1');
};
