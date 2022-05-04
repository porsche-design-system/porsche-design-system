import { joinArrayElementsToString, withoutTagsOption } from './utils';
import {
  getMinifiedCss,
  INTERNAL_TAG_NAMES,
  SKELETON_TAG_NAMES,
  SKELETONS_ACTIVE,
  TAG_NAMES,
} from '@porsche-design-system/shared';
import {
  getButtonLinkPureSkeletonStyles,
  getButtonLinkSocialSkeletonStyles,
  getCheckboxRadioWrapperSkeletonStyles,
  getFieldsetWrapperSkeletonStyles,
  getPseudoElementStyles,
  getSelectTextFieldWrapperSkeletonStyles,
  getTextareaWrapperSkeletonStyles,
} from '../../../../components/src/styles/skeletons';

// TODO: remove skeleton styles after all are hydrated

const tagNames = joinArrayElementsToString(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)));
const tagNamesWithSkeleton = joinArrayElementsToString(SKELETON_TAG_NAMES);

// includes skeleton styles when SKELETONS_ACTIVE is set to true
export const generateInitialStylesPartial = (): string => {
  const types = `type GetInitialStylesOptions = {${SKELETONS_ACTIVE ? '\n  skeletonTagNames?: SkeletonTagName[];' : ''}
  prefix?: string;
  ${withoutTagsOption}
  format?: Format;
};
type GetInitialStylesOptionsFormatHtml = Omit<GetInitialStylesOptions, 'withoutTags'> & { format: 'html' };
type GetInitialStylesOptionsFormatJsx = Omit<GetInitialStylesOptions, 'withoutTags'> & { format: 'jsx' };
type GetInitialStylesOptionsWithoutTags = Omit<GetInitialStylesOptions, 'format'>;`;

  const skeletonTypes = `type SkeletonTagName = ${joinArrayElementsToString(SKELETON_TAG_NAMES, ' | ')};

type GetSkeletonStylesOptions = {
  prefixedTagNamesWithSkeleton: string[];
  prefixedUnusedTagNamesWithSkeleton: string[];
  prefix?: string;
};`;

  const skeletonKeyframes = '@keyframes opacity{0%{opacity:0.35}50%{opacity:0.15}100%{opacity:0.35}}';

  // combining tagNames avoids redundant CSS
  const skeletonStyles = {
    'p-button|p-link|p-link-social': getButtonLinkSocialSkeletonStyles(),
    'p-button-pure|p-link-pure': getButtonLinkPureSkeletonStyles(),
    'p-checkbox-wrapper|p-radio-button-wrapper': getCheckboxRadioWrapperSkeletonStyles(),
    'p-fieldset-wrapper': getFieldsetWrapperSkeletonStyles(),
    'p-select-wrapper|p-text-field-wrapper': getSelectTextFieldWrapperSkeletonStyles(),
    'p-textarea-wrapper': getTextareaWrapperSkeletonStyles(),
    pseudo: getPseudoElementStyles(),
  };
  const minifiedSkeletonStyles = Object.entries(skeletonStyles).reduce(
    (prevValue, [key, value]) => ({ ...prevValue, [key]: getMinifiedCss(value) }),
    {}
  );

  const initialStylesFunction = `export function getInitialStyles(opts?: GetInitialStylesOptionsFormatHtml): string;
export function getInitialStyles(opts?: GetInitialStylesOptionsFormatJsx): JSX.Element;
export function getInitialStyles(opts?: GetInitialStylesOptionsWithoutTags): string;
export function getInitialStyles(opts?: GetInitialStylesOptions): string | JSX.Element {
  const { ${SKELETONS_ACTIVE ? 'skeletonTagNames, ' : ''}prefix, withoutTags, format }: GetInitialStylesOptions = {${
    SKELETONS_ACTIVE ? '\n    skeletonTagNames: [],' : ''
  }
    prefix: '',
    withoutTags: false,
    format: 'html',
    ...opts,
  };

  const tagNames = [${tagNames}];
  const prefixedTagNames = getPrefixedTagNames(tagNames, prefix);
  ${
    SKELETONS_ACTIVE
      ? `const tagNamesWithSkeleton: SkeletonTagName[] = [${tagNamesWithSkeleton}];

  const invalidSkeletonComponentTagNames = skeletonTagNames.filter((x) => !tagNamesWithSkeleton.includes(x));

  if (invalidSkeletonComponentTagNames.length) {
    throw new Error(\`The following supplied skeleton tag names are invalid:
  \${invalidSkeletonComponentTagNames.join(', ')}

Please use only valid component tag names:
  \${tagNamesWithSkeleton.join(', ')}\`);
  }

  const usedTagNamesWithSkeleton = tagNamesWithSkeleton.filter((skeletonTagName) => skeletonTagNames.includes(skeletonTagName));
  const prefixedTagNamesWithSkeleton = getPrefixedTagNames(usedTagNamesWithSkeleton, prefix);
  const prefixedUnusedTagNamesWithSkeleton = getPrefixedTagNames(tagNamesWithSkeleton.filter((skeletonTagName) => !skeletonTagNames.includes(skeletonTagName)), prefix);\n`
      : ''
  }
  throwIfRunInBrowser('getInitialStyles');

  const styleAttributes = ['pds-initial-styles'${
    SKELETONS_ACTIVE ? `, usedTagNamesWithSkeleton.length && 'uses-skeleton'` : ''
  }].filter(x => x).join(' ');
  const styleProps = { 'pds-initial-styles': 'true'${
    SKELETONS_ACTIVE ? `, ...(usedTagNamesWithSkeleton.length && { 'uses-skeleton': 'true' })` : ''
  } };

  const styles = prefixedTagNames.join(',') + '{visibility:hidden}.hydrated{visibility:inherit}'${
    SKELETONS_ACTIVE
      ? '\n    + getSkeletonStyles({prefixedTagNamesWithSkeleton,prefixedUnusedTagNamesWithSkeleton, prefix})'
      : ''
  };

  const markup = format === 'html'
    ? \`<style \$\{styleAttributes\}>\${styles}</style>\`
    : <style  {...styleProps} dangerouslySetInnerHTML={{ __html: styles }} />;

  return withoutTags
    ? styles
    : markup;
}`;

  const skeletonStylesFunction = `const getSkeletonStyles = (opts?: GetSkeletonStylesOptions): string => {
  const { prefixedTagNamesWithSkeleton, prefixedUnusedTagNamesWithSkeleton, prefix }: GetSkeletonStylesOptions = {
    prefixedTagNamesWithSkeleton: [],
    prefixedUnusedTagNamesWithSkeleton: [],
    prefix: '',
    ...opts,
  };

  const skeletonStylesWithKey = ${JSON.stringify(minifiedSkeletonStyles)};
  let skeletonStyles = prefixedTagNamesWithSkeleton.map((prefixedTagName) => {
    let tagNameToFind = prefixedTagName;

    // if prefix is used it has to be removed and the tagName has to be reassigned
    // in order to find tagName in keys of skeletonStyles
    if (prefix) {
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
      }

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

  const result = skeletonStyles + \`\${prefixedTagNamesWithSkeleton.length ? \`\${skeletonStylesWithKey.pseudo}${skeletonKeyframes}\` : ''}\`;
  return result;
};`;

  const helperFunction = `const getPrefixedTagNames = (tagNames: string[], prefix?: string): string[] => {
  return prefix ? tagNames.map((x) => \`\${prefix}-\${x}\`) : tagNames;
};`;

  return [
    types,
    initialStylesFunction,
    helperFunction,
    ...(SKELETONS_ACTIVE ? [skeletonTypes, skeletonStylesFunction] : []),
  ].join('\n\n');
};
