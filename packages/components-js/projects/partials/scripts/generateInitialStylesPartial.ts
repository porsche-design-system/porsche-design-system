import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';

export const generateInitialStylesPartial = (): string => {
  const types = `type InitialStylesOptions = {
  prefix?: string;
  withoutTags?: boolean;
  format?: Format;
};
type InitalStylesOptionsFormatHtml = InitialStylesOptions & {
  format?: 'html';
};
type InitalStylesOptionsFormatJsx = InitialStylesOptions & {
   withoutTags?: 'false';
   format?: 'jsx';
};`;

  const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x))
    .map((x) => `'${x}'`)
    .join(', ');

  const func = `export function getInitialStyles(opts?: InitalStylesOptionsFormatHtml): string;
export function getInitialStyles(opts?: InitalStylesOptionsFormatJsx): JSX.Element;
export function getInitialStyles(opts?: InitialStylesOptions): string | JSX.Element {
  const { prefix, withoutTags, format }: InitialStylesOptions = {
    prefix: '',
    withoutTags: false,
    format: 'html',
    ...opts
  };

  const tagNames = [${tagNames}];
  const styleInnerHtml = tagNames.map((x) => prefix
    ? \`\${prefix}-\${x}\`
    : x
  ).join(',') + '{visibility:hidden}';

  const markup = format === 'html' ? \`<style>\${styleInnerHtml}</style>\` : <style>{styleInnerHtml}</style>;

  return withoutTags
    ? styleInnerHtml
    : markup;
};`;

  return [types, func].join('\n\n');
};
