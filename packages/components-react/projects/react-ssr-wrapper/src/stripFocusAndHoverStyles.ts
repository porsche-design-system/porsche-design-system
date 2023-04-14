export const stripFocusAndHoverStyles = (css: string): string =>
  css.replace(/\n.*(?::focus|:hover|hover:hover)[\s\S]+?\n}/g, '');
