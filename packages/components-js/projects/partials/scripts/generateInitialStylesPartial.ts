import { INTERNAL_TAG_NAMES, TAG_NAMES, TAG_NAMES_WITH_SKELETON } from '@porsche-design-system/shared';
import {
  getButtonSkeletonStyles,
  SKELETON_COLOR_THEME_PLACEHOLDER,
  SKELETON_LINEAR_GRADIENT_COLOR_1,
  SKELETON_LINEAR_GRADIENT_COLOR_2,
} from '../../../../components/src/components/action/button/button-skeleton-styles';
import { getSelectWrapperSkeletonStyles } from '../../../../components/src/components/form/select-wrapper/select-wrapper/select-wrapper-skeleton-styles';
import { joinArrayElementsToString } from './utils';

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
    'p-select-wrapper': getSelectWrapperSkeletonStyles(),
  };

  const tagNames = joinArrayElementsToString(
    TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x) && !TAG_NAMES_WITH_SKELETON.includes(x))
  );

  const tagNamesWithSkeleton = joinArrayElementsToString(TAG_NAMES_WITH_SKELETON);

  const func = `export const getInitialStyles = (opts?: InitialStylesOptions): string => {
  const options: InitialStylesOptions = {
    prefix: '',
    withoutTags: false,
    theme: 'light',
    ...opts
  };
  const { prefix, withoutTags, theme } = options;


  const tagNames = [${tagNames}];
  let styleInnerHtml = tagNames.map((x) => prefix
    ? \`\${prefix}-\${x}\`
    : x
  ).join(',') + '{visibility:hidden}';

  const tagNamesWithSkeleton = [${tagNamesWithSkeleton}];

  const skeletonStyles =  ${JSON.stringify(skeletonStyles)};

  let skeletonStyleStringWithPrefix = tagNamesWithSkeleton.map((tagName)=> {
    if(prefix){
      const tagRegExp = new RegExp(tagName, 'g');
      return \`\${skeletonStyles[tagName].replace(tagRegExp, \`\${prefix}-\${tagName}\`)}\`;
    } else {
      return skeletonStyles[tagName];
    }
  }).join('');


  skeletonStyleStringWithPrefix = skeletonStyleStringWithPrefix.replace(/${SKELETON_COLOR_THEME_PLACEHOLDER}/g,\`\${theme === 'light' ? '#E3E4E5': '#626669'}\`);
  skeletonStyleStringWithPrefix = skeletonStyleStringWithPrefix.replace(/${SKELETON_LINEAR_GRADIENT_COLOR_1}/g,\`\${theme === 'light' ? '#E3E4E5': '#656871'}\`);
  skeletonStyleStringWithPrefix = skeletonStyleStringWithPrefix.replace(/${SKELETON_LINEAR_GRADIENT_COLOR_2}/g,\`\${theme === 'light' ? '#0000000d': '#888b94'}\`);

  styleInnerHtml += skeletonStyleStringWithPrefix;

  styleInnerHtml += '\\\\${skeletonKeyframes}';

  const result = withoutTags
    ? styleInnerHtml
    : \`<style>\${styleInnerHtml}</style>\`;
   return result;
};`;

  return [types, func].join('\n\n');
};
