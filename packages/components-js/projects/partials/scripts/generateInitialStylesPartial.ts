import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { withoutTagsOption } from './utils';

export const generateInitialStylesPartial = (): string => {
  const types = `type GetInitialStyles = {
  prefix?: string;
  ${withoutTagsOption}
  format?: Format;
};
type GetInitialStylesFormatHtml = Omit<GetInitialStyles, 'withoutTags'> & {
  format: 'html';
};
type GetInitialStylesFormatJsx = Omit<GetInitialStyles, 'withoutTags'> & {
   format: 'jsx';
};`;

  const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x))
    .map((x) => `'${x}'`)
    .join(', ');

  const func = `export function getInitialStyles(opts?: GetInitialStylesFormatHtml): string;
export function getInitialStyles(opts?: GetInitialStylesFormatJsx): JSX.Element;
export function getInitialStyles(opts?: GetInitialStyles): string;
export function getInitialStyles(opts?: GetInitialStyles): string | JSX.Element {
  const { prefix, withoutTags, format }: GetInitialStyles = {
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
