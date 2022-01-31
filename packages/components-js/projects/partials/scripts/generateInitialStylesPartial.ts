import { INTERNAL_TAG_NAMES, TAG_NAMES, TAG_NAMES_WITH_SKELETON } from '@porsche-design-system/shared';

export const generateInitialStylesPartial = (): string => {
  const types = `type InitialStylesOptions = {
  prefix?: string;
  withoutTags?: boolean;
}`;

  const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x) && !TAG_NAMES_WITH_SKELETON.includes(x))
    .map((x) => `'${x}'`)
    .join(', ');

  const func = `export const getInitialStyles = (opts?: InitialStylesOptions): string => {
  const options: InitialStylesOptions = {
    prefix: '',
    withoutTags: false,
    ...opts
  };
  const { prefix, withoutTags } = options;

  const tagNames = [${tagNames}];
  const styleInnerHtml = tagNames.map((x) => prefix
    ? \`\${prefix}-\${x}\`
    : x
  ).join(',') + '{visibility:hidden}';

  return withoutTags
    ? styleInnerHtml
    : \`<style>\${styleInnerHtml}</style>\`;
};`;

  return [types, func].join('\n\n');
};
