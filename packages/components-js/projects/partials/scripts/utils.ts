import { minify as htmlMinifier } from 'html-minifier';

export const minifyHTML = (str: string): string => {
  return htmlMinifier(str, {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    includeAutoGeneratedTags: false,
    quoteCharacter: '"',
  });
};

export const withoutTagsOption = `/** @deprecated will be removed in v3, use \`format: 'jsx'\` instead */
  withoutTags?: boolean;`;
