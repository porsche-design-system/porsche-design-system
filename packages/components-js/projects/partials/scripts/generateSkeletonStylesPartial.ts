import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { getButtonSkeletonStyles } from '@porsche-design-system/components/src/components/action/button/button-skeleton-styles';
// import { COMPONENT_CHUNK_NAMES } from '../../components-wrapper';
// TODO: partial to be used after body tag
export const generateSkeletonStylesPartial = (): string => {
  // TODO: filter out components that we want to provide skeleton styles for

  // const chunkNamesTypeLiteral = COMPONENT_CHUNK_NAMES.map((x) => `'${x}'`).join(' | ');
  const chunkNamesTypeLiteral = 'button';
  // 'any' is fallback when COMPONENT_CHUNK_NAMES is an empty array because components-js wasn't built, yet
  const types = `type ComponentChunkName = ${chunkNamesTypeLiteral || 'any'};

type SkeletonStylesOptions = {
  components?: ComponentChunkName[];
  prefix?: string;
  withoutTags?: boolean;
};`;

  const tagNames = TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x))
    .map((x) => `'${x}'`)
    .join(', ');

  const func = `export const getInitialStyles = (opts?: SkeletonStylesOptions): string => {
  const options: InitialStylesOptions = {
    prefix: '',
    withoutTags: false,
    ...opts
  };
  const { prefix, withoutTags } = options;

  const tagNames = [${tagNames}];


  const styleInnerHtml = tagNames.map((x) => {
      const key=  prefix ? \`\${prefix}-\${x}\` : x;
      return \`\${key}{${skeletonStylesMap[x]()}}\`\;
  }).join('');


  return withoutTags
    ? styleInnerHtml
    : \`<style>\${styleInnerHtml}</style>\`;
};`;

  return [types, func].join('\n\n');
};

const skeletonStylesMap = {
  'p-button': getButtonSkeletonStyles,
};

export const setAriaBusy = () => {
  // set on every key of skeletonStylesMap?
  // 'p-button'
};
