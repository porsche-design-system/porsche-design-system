import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { withoutTagsOption } from './utils';
import { INTERNAL_TAG_NAMES, TAG_NAMES, TAG_NAMES_WITH_SKELETON } from '@porsche-design-system/shared';
import { joinArrayElementsToString } from './utils';
import {
  getButtonLinkPureSkeletonCss,
  getButtonLinkSkeletonCss,
  getCheckboxRadioWrapperSkeletonCss,
  getSelectTextFieldWrapperSkeletonCss,
  getTextareaWrapperSkeletonCss,
  SKELETON_COLOR_THEME_PLACEHOLDER,
  SKELETON_LINEAR_GRADIENT_COLOR_1,
  SKELETON_LINEAR_GRADIENT_COLOR_2,
} from '../../../../components/src/styles/skeletons';

// TODO: use array of components to provide skeletons
// TODO: remove skeleton styles after all are hydrated
export const generateInitialStylesPartial = (): string => {
  const types = `type GetInitialStylesOptions = {
  prefix?: string;
  ${withoutTagsOption}
  theme?: 'light' | 'dark';
  format?: Format;
};
type GetInitialStylesOptionsFormatHtml = Omit<GetInitialStylesOptions, 'withoutTags'> & {
  format: 'html';
};
type GetInitialStylesOptionsFormatJsx = Omit<GetInitialStylesOptions, 'withoutTags'> & {
   format: 'jsx';
};
type GetInitialStylesOptionsWithoutTags = Omit<GetInitialStylesOptions, 'format'>;`;

  const skeletonTypes = `type SkeletonStylesOptions = {
  prefixedTagNamesWithSkeleton: string[];
  prefix?: string;
  theme?: 'light' | 'dark';
}`;

  const skeletonKeyframes = '@keyframes shimmer{0%{background-position:-450px 0}100%{background-position:450px 0}}';

  const skeletonStyles = [
    getButtonLinkSkeletonCss(),
    getButtonLinkPureSkeletonCss(),
    getCheckboxRadioWrapperSkeletonCss(),
    getSelectTextFieldWrapperSkeletonCss(),
    getTextareaWrapperSkeletonCss(),
  ].join('');

  const tagNames = joinArrayElementsToString(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)));

  const tagNamesWithSkeleton = joinArrayElementsToString(TAG_NAMES_WITH_SKELETON);

  const initialStylesFunction = `export function getInitialStyles(opts?: GetInitialStylesOptionsFormatHtml): string;
export function getInitialStyles(opts?: GetInitialStylesOptionsFormatJsx): JSX.Element;
export function getInitialStyles(opts?: GetInitialStylesOptionsWithoutTags): string;
export function getInitialStyles(opts?: GetInitialStylesOptions): string | JSX.Element {
  const { prefix, withoutTags, theme, format }: GetInitialStylesOptions = {
    prefix: '',
    withoutTags: false,
    theme: 'light',
    format: 'html',
    ...opts
  };

  const tagNames = [${tagNames}];
  const prefixedTagNames = getPrefixedTagNames(tagNames, prefix)

  const initialVisibilityHiddenStyles = prefixedTagNames.join(',') + '{visibility:hidden}';

  const tagNamesWithSkeleton = [${tagNamesWithSkeleton}];
  const prefixedTagNamesWithSkeleton = getPrefixedTagNames(tagNamesWithSkeleton, prefix);

  const mergedStyles = \`\${initialVisibilityHiddenStyles}\${getSkeletonStyles({prefixedTagNamesWithSkeleton, prefix, theme})}\`;
  const markup = format === 'html' ?  \`<style>\${mergedStyles}</style>\` : <style>{mergedStyles}</style>;

  return withoutTags
    ? mergedStyles
    : markup;
};`;

  const skeletonStylesFunction = `const getSkeletonStyles = (opts?: SkeletonStylesOptions): string => {
  const options: SkeletonStylesOptions = {
     prefixedTagNamesWithSkeleton: [],
     prefix: '',
     theme: 'light',
     ...opts
  };
  const { prefixedTagNamesWithSkeleton, prefix, theme } = options;

  let skeletonStyles = '${skeletonStyles}';

  if(prefix){
    prefixedTagNamesWithSkeleton.forEach(prefixedTagName =>{
      const prefixRegExp = new RegExp(\`\${prefix}-\`, 'g');
      const tagName = prefixedTagName.replace(prefixRegExp, '');
      const tagRegExp = new RegExp(\`\${tagName}(?!-)\`, 'g');
      skeletonStyles = skeletonStyles.replace(tagRegExp, prefixedTagName);
    });
  }

  skeletonStyles = skeletonStyles.replace(/${SKELETON_COLOR_THEME_PLACEHOLDER}/g,\`\${theme === 'light' ? '#E3E4E5': '#626669'}\`);
  skeletonStyles = skeletonStyles.replace(/${SKELETON_LINEAR_GRADIENT_COLOR_1}/g,\`\${theme === 'light' ? '#E3E4E5': '#656871'}\`);
  skeletonStyles = skeletonStyles.replace(/${SKELETON_LINEAR_GRADIENT_COLOR_2}/g,\`\${theme === 'light' ? '#0000000d': '#888b94'}\`);

  const result = skeletonStyles + '${skeletonKeyframes}';
  // escape the "at" sign for sed replace command to work properly
  return result.replace(/(@)/g, '\\\\$1');
};`;

  const helperFunction = `const getPrefixedTagNames = (tagNames: string[], prefix?: string): string[] => {
  return prefix ? tagNames.map((x) => \`\${prefix}-\${x}\`) : tagNames;
}
`;

  return [types, skeletonTypes, helperFunction, initialStylesFunction, skeletonStylesFunction].join('\n\n');
};
