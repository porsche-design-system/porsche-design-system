import { TAG_NAMES } from '@porsche-design-system/shared';

export const generateInitialStylesPartial = (): string => {
  const types = `type InitialStylesOptions = {
  prefix?: string;
  withoutTags?: boolean;
}`;

  const tagNames = TAG_NAMES.map((x) => `'${x}'`).join(', ');

  const func = `
export const getInitialStyles = (opts?: InitialStylesOptions): string => {
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
