import { INTERNAL_TAG_NAMES, TAG_NAMES, TAG_NAMES_WITH_SKELETON } from '@porsche-design-system/shared';
import { getButtonSkeletonStyles } from '../../../../components/src/components/action/button/button-skeleton-styles';
export const generateInitialStylesPartial = (): string => {
  const types = `type InitialStylesOptions = {
  prefix?: string;
  withoutTags?: boolean;
  theme?: 'light' | 'dark';
}`;
  const skeletonKeyframes: string =
    '@keyframes shimmer{0%{background-position:-450px 0}100%{background-position:450px 0}}';

  const skeletonStyles: { [key: string]: string } = {
    'p-button': getButtonSkeletonStyles(),
  };

  const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x) && !TAG_NAMES_WITH_SKELETON.includes(x))
    .map((x) => `'${x}'`)
    .join(', ');

  const func = `export const getInitialStyles = (opts?: InitialStylesOptions): string => {
  const options: InitialStylesOptions = {
    prefix: '',
    withoutTags: false,
    theme: 'light',
    ...opts
  };
  const { prefix, withoutTags, theme } = options;
  const skeletonStyles =  ${JSON.stringify(skeletonStyles)};
  let styleStringWithPrefix = prefix
    ? \`\${prefix}-\${skeletonStyles['p-button']}\`
    : skeletonStyles['p-button']

  styleStringWithPrefix = styleStringWithPrefix.replace('PDS_REPLACE_WITH_THEME_COLOR',\`\${theme === 'light' ? '#000': '#fff'}\`);


  const tagNames = [${tagNames}];
  let styleInnerHtml = tagNames.map((x) => prefix
    ? \`\${prefix}-\${x}\`
    : x
  ).join(',') + '{visibility:hidden}';

  styleInnerHtml += styleStringWithPrefix;

  styleInnerHtml += '\\\\${skeletonKeyframes}';

  const result = withoutTags
    ? styleInnerHtml
    : \`<style>\${styleInnerHtml}</style>\`;
   return result;
};`;

  return [types, func].join('\n\n');
};
