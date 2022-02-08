import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { withoutTagsOption } from './utils';

export const generateInitialStylesPartial = (): string => {
  const types = `type GetInitialStylesOptions = {
  prefix?: string;
  ${withoutTagsOption}
  format?: Format;
};
type GetInitialStylesOptionsFormatHtml = Omit<GetInitialStylesOptions, 'withoutTags'> & {
  format: 'html';
};
type GetInitialStylesOptionsFormatJsx = Omit<GetInitialStylesOptions, 'withoutTags'> & {
   format: 'jsx';
};
type GetInitialStylesOptionsWithoutTags = Omit<GetInitialStylesOptions, 'format'>;`;

  const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x))
    .map((x) => `'${x}'`)
    .join(', ');

  const func = `export function getInitialStyles(opts?: GetInitialStylesOptionsFormatHtml): string;
export function getInitialStyles(opts?: GetInitialStylesOptionsFormatJsx): JSX.Element;
export function getInitialStyles(opts?: GetInitialStylesOptionsWithoutTags): string;
export function getInitialStyles(opts?: GetInitialStylesOptions): string | JSX.Element {
  const { prefix, withoutTags, format }: GetInitialStylesOptions = {
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
