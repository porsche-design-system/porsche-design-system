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
  const skeletonTypes = `type SkeletonStylesOptions = {
  prefixedTagNamesWithSkeleton: string[];
  prefix?: string;
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

  const joinArrayElementsToStringFunction = joinArrayElementsToString.toString();
  const joinArrayElementsFunctionBody = joinArrayElementsToStringFunction.slice(
    joinArrayElementsToStringFunction.indexOf('{') + 1,
    joinArrayElementsToStringFunction.lastIndexOf('}')
  );

  const initialStylesFunction = `export const getInitialStyles = (opts?: InitialStylesOptions): string => {
  const options: InitialStylesOptions = {
    prefix: '',
    withoutTags: false,
    theme: 'light',
    ...opts
  };
  const { prefix, withoutTags, theme } = options;


  const tagNames = [${tagNames}];
  const prefixedTagNames = getPrefixedTagNames(tagNames, prefix)

  const styleInnerHtml= prefixedTagNames.join(',') + '{visibility:hidden}';

  const tagNamesWithSkeleton = [${tagNamesWithSkeleton}];
  const prefixedTagNamesWithSkeleton = getPrefixedTagNames(tagNamesWithSkeleton, prefix);
  // TODO: figure out how without tags is supposed to work with skeleton script
  const result = withoutTags ? styleInnerHtml : \`<style>\${styleInnerHtml}\${getSkeletonStyles({prefixedTagNamesWithSkeleton, prefix, theme})}</style><script>\${setAriaAttributesOnSkeleton(prefixedTagNamesWithSkeleton)}</script>\`;
  return result;
};`;

  const skeletonStylesFunction = `export const getSkeletonStyles = (opts?: SkeletonStylesOptions): string => {
  const options: SkeletonStylesOptions = {
     prefixedTagNamesWithSkeleton: [],
     prefix: '',
     theme: 'light',
     ...opts
  };
  const { prefixedTagNamesWithSkeleton, prefix, theme } = options;

  const skeletonStyles = ${JSON.stringify(skeletonStyles)};

  const skeletonStylesWithPrefix = [];

  prefixedTagNamesWithSkeleton.forEach(prefixedTagName =>{
    const prefixRegExp = new RegExp(prefixedTagName+"-", 'g');
    const tagName = prefixedTagName.replace(prefixRegExp, '');
    if(prefix){
      const tagRegExp = new RegExp(tagName, 'g');
      skeletonStylesWithPrefix.push(\`\${skeletonStyles[tagName].replace(tagRegExp, prefixedTagName)}\`);
    } else {
      skeletonStylesWithPrefix.push(skeletonStyles[tagName]);
    }
  });

  let skeletonStyleStringWithPrefix = skeletonStylesWithPrefix.join('');

  skeletonStyleStringWithPrefix = skeletonStyleStringWithPrefix.replace(/${SKELETON_COLOR_THEME_PLACEHOLDER}/g,\`\${theme === 'light' ? '#E3E4E5': '#626669'}\`);
  skeletonStyleStringWithPrefix = skeletonStyleStringWithPrefix.replace(/${SKELETON_LINEAR_GRADIENT_COLOR_1}/g,\`\${theme === 'light' ? '#E3E4E5': '#656871'}\`);
  skeletonStyleStringWithPrefix = skeletonStyleStringWithPrefix.replace(/${SKELETON_LINEAR_GRADIENT_COLOR_2}/g,\`\${theme === 'light' ? '#0000000d': '#888b94'}\`);

  // escape the @ sign for sed replace command to work properly
  return skeletonStyleStringWithPrefix + '\\\\${skeletonKeyframes}';
};`;

  const ariaAttributeFunction = `export const setAriaAttributesOnSkeleton = (prefixedSkeletonTagNames: string[]): string => \`
  const toggleAriaAttributes = (target, state) => {
    target.ariaBusy = state;
    target.ariaHidden = state;
  }

  const setSkeletonAriaProperties = (target) => {
    if (target.className.includes("hydrated")) {
      toggleAriaAttributes(target, false)
      unobserveAttributes(target);
    } else {
      toggleAriaAttributes(target, true);
    }
  }

  const attributeMutationMap = new Map();

  const attributeObserver = new MutationObserver((mutations) => {
    mutations
      // reduce array to only entries that have really a changed value
      .filter((mutation) => mutation.oldValue !== mutation.target.getAttribute(mutation.attributeName))
      // remove duplicates so we execute callback only once per node
      .filter((mutation, idx, arr) => arr.findIndex((m) => m.target === mutation.target) === idx)
      .forEach((mutation) => attributeMutationMap.get(mutation.target)?.(mutation.target));
  });

  const observeAttributes = (node, attributes, callback) => {
    // node might not be defined in connectedCallback
    if (node) {
      attributeMutationMap.set(node, callback);
      attributeObserver.observe(node, { attributeFilter: attributes, attributeOldValue: true });
    }
  };

  const unobserveAttributes = (node) => {
    attributeMutationMap.delete(node);
  };

  \${joinArrayElementsToString(prefixedSkeletonTagNames)}.forEach(tagName => {
    observeAttributes(document.querySelector(tagName), ['class'], setSkeletonAriaProperties)
  })
\`;`;

  const helperFunctions = `const getPrefixedTagNames = (tagNames: string[], prefix?: string): string[] => {
    return prefix ? tagNames.map((x) => \`\${prefix}-\${x}\`) : tagNames;
}
const joinArrayElementsToString = (array: string[]): string => {
  ${joinArrayElementsFunctionBody}
};
`;

  return [
    types,
    skeletonTypes,
    helperFunctions,
    initialStylesFunction,
    skeletonStylesFunction,
    ariaAttributeFunction,
  ].join('\n\n');
};
