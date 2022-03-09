import { joinArrayElementsToString, withoutTagsOption } from './utils';
import { INTERNAL_TAG_NAMES, TAG_NAMES, TAG_NAMES_WITH_SKELETON } from '@porsche-design-system/shared';
import {
  getButtonLinkPureSkeletonCss,
  getButtonLinkSocialSkeletonCss,
  getCheckboxRadioWrapperSkeletonCss,
  getFieldsetWrapperSkeletonCss,
  getHeadlineSkeletonCss,
  getSelectTextFieldWrapperSkeletonCss,
  getTextareaWrapperSkeletonCss,
  getTextListItemSkeletonCss,
  getTextListSkeletonCss,
  getTextSkeletonCss,
} from '../../../../components/src/styles/skeletons';

// TODO: remove skeleton styles after all are hydrated

const skeletonTagNamesTypeLiteral = joinArrayElementsToString(TAG_NAMES_WITH_SKELETON, ' | ');

const tagNames = joinArrayElementsToString(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)));

const tagNamesWithSkeleton = joinArrayElementsToString(TAG_NAMES_WITH_SKELETON);

// includes skeleton styles
export const generateInitialStylesPartial = (): string => {
  // 'any' is fallback when TAG_NAMES_WITH_SKELETON is an empty array because shared wasn't built, yet
  const types = `export type SkeletonTagName = ${skeletonTagNamesTypeLiteral || 'any'};

  type GetInitialStylesOptions = {
  skeletonTagNames?: SkeletonTagName[];
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

  const skeletonTypes = `type SkeletonStylesOptions = {
  prefixedTagNamesWithSkeleton: string[];
  prefixedUnusedTagNamesWithSkeleton: string[];
  prefix?: string;
}`;

  const skeletonKeyframes = '@keyframes opacity{0%{opacity:0.35}50%{opacity:0.15}100%{opacity:0.35}';

  // combining tagNames avoids redundant CSS
  const skeletonStyles = {
    'p-button|p-link|p-link-social': getButtonLinkSocialSkeletonCss(),
    'p-button-pure|p-link-pure': getButtonLinkPureSkeletonCss(),
    'p-checkbox-wrapper|p-radio-button-wrapper': getCheckboxRadioWrapperSkeletonCss(),
    'p-fieldset-wrapper': getFieldsetWrapperSkeletonCss(),
    'p-headline': getHeadlineSkeletonCss(),
    'p-select-wrapper|p-text-field-wrapper': getSelectTextFieldWrapperSkeletonCss(),
    'p-text': getTextSkeletonCss(),
    'p-text-list': getTextListSkeletonCss(),
    'p-text-list-item': getTextListItemSkeletonCss(),
    'p-textarea-wrapper': getTextareaWrapperSkeletonCss(),
  };

  const initialStylesFunction = `export function getInitialStyles(opts?: GetInitialStylesOptionsFormatHtml): string;
export function getInitialStyles(opts?: GetInitialStylesOptionsFormatJsx): JSX.Element;
export function getInitialStyles(opts?: GetInitialStylesOptionsWithoutTags): string;
export function getInitialStyles(opts?: GetInitialStylesOptions): string | JSX.Element {
  const { skeletonTagNames, prefix, withoutTags, format }: GetInitialStylesOptions = {
    skeletonTagNames: [],
    prefix: '',
    withoutTags: false,
    format: 'html',
    ...opts
  };

  const tagNames = [${tagNames}];
  const prefixedTagNames = getPrefixedTagNames(tagNames, prefix);

  const tagNamesWithSkeleton: SkeletonTagName[] = [${tagNamesWithSkeleton}];

  const invalidSkeletonComponentTagNames = skeletonTagNames.filter((x) => !tagNamesWithSkeleton.includes(x));

  if (invalidSkeletonComponentTagNames.length) {
    throw new Error(\`The following supplied skeleton tag names are invalid:
  \${invalidSkeletonComponentTagNames.join(', ')}

Please use only valid component tag names:
  \${tagNamesWithSkeleton.join(', ')}\`);
  }

  const usedTagNamesWithSkeleton = tagNamesWithSkeleton.filter((skeletonTagName) => skeletonTagNames.includes(skeletonTagName));
  const prefixedTagNamesWithSkeleton = getPrefixedTagNames(usedTagNamesWithSkeleton, prefix);
  const prefixedUnusedTagNamesWithSkeleton = getPrefixedTagNames(tagNamesWithSkeleton.filter((skeletonTagName) => !skeletonTagNames.includes(skeletonTagName)), prefix);

  const initialVisibilityHiddenStyles = prefixedTagNames.join(',') + '{visibility:hidden}';

  const mergedStyles = \`\${initialVisibilityHiddenStyles}\${getSkeletonStyles({prefixedTagNamesWithSkeleton,prefixedUnusedTagNamesWithSkeleton, prefix})}\`;
  const markup = format === 'html' ?  \`<style>\${mergedStyles}</style>\` : <style>{mergedStyles}</style>;

  return withoutTags
    ? mergedStyles
    : markup;
};`;

  const skeletonStylesFunction = `const getSkeletonStyles = (opts?: SkeletonStylesOptions): string => {
  const options: SkeletonStylesOptions = {
     prefixedTagNamesWithSkeleton: [],
     prefixedUnusedTagNamesWithSkeleton: [],
     prefix: '',
     ...opts
  };
  const { prefixedTagNamesWithSkeleton, prefixedUnusedTagNamesWithSkeleton, prefix } = options;

  const skeletonStylesWithKey = ${JSON.stringify(skeletonStyles)};
  let skeletonStyles = prefixedTagNamesWithSkeleton.map((prefixedTagName)=>{
    let tagNameToFind = prefixedTagName;

    // if prefix is used it has to be removed and the tagName has to be reassigned
    // in order to find tagName in keys of skeletonStyles
    if(prefix){
      const prefixRegExp = new RegExp(\`\${prefix}-\`, 'g');
      tagNameToFind = prefixedTagName.replace(prefixRegExp, '');
    }
    const tagNameToFindRegExp = new RegExp(\`(\${tagNameToFind}(?!-))\`, 'g');

    // returns tagName in combined keys of skeletonStyles
    const skeletonStyleKey = Object.keys(skeletonStylesWithKey)[
        Object.keys(skeletonStylesWithKey).findIndex(
          (skeletonStyleKey) => skeletonStyleKey.split('|').some((x) => x.match(tagNameToFindRegExp))
        )
    ];
    let skeletonStyle = skeletonStylesWithKey[skeletonStyleKey];
    if (skeletonStyle) {
      if (prefix) {
        // add prefix to style
        skeletonStyleKey.split('|').forEach(key => {
          skeletonStyle = skeletonStyle.replace(new RegExp(\`(\${key}(?!-))\`, 'g'), prefix + '-' + key);
        });
      };

      // if tagName is found, the key-value-pair can be removed since the style is already applied
      // e.g. 'p-button' is found => check for 'p-link' or 'p-link-social' is redundant
      delete skeletonStylesWithKey[skeletonStyleKey];

      return skeletonStyle;
    } else {
      return '';
    }
  }).join('');

  // remove unused skeleton selectors
  // TODO: adjust cleanup script to not remove wrong styles (e.g. when using p-text-field-wrapper in skeletonTagNames, the after is removed)
  // prefixedUnusedTagNamesWithSkeleton.forEach((tagName) => {
  //   const unusedSkeletonTagName = new RegExp(\`((?:,)*\${tagName}:not\\\\(\\\\.hydrated\\\\)(?:\\\\:\\\\:(?:after|before))*)\`, 'g');
  //   skeletonStyles = skeletonStyles.replace(unusedSkeletonTagName, '');
  // });

  const result = skeletonStyles + \`\${prefixedTagNamesWithSkeleton.length ? '${skeletonKeyframes}' : ''}\`;
  return result;
};`;

  const helperFunction = `const getPrefixedTagNames = (tagNames: string[], prefix?: string): string[] => {
  return prefix ? tagNames.map((x) => \`\${prefix}-\${x}\`) : tagNames;
}
`;

  return [types, skeletonTypes, helperFunction, initialStylesFunction, skeletonStylesFunction].join('\n\n');
};
