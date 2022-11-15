import { TAG_NAMES } from '@porsche-design-system/shared';
import { getTagName } from '../tag-name';

type PartialNames = 'getFontLink' | 'getLoaderScript';

export const validatePartialUsage = (): void => {
  validateGetFontLinksUsage();
  validateGetComponentChunkLinksUsage();
  validateGetLoaderScriptUsage();
  validateInitialStylesWithPrefixUsage();
};

export const validateGetFontLinksUsage = (): void => {
  if (!document.querySelector('link[rel=preload][as=font][href*=porsche-next-w-la-regular]')) {
    partialValidationWarning('getFontLink');
  }
};

const getAllCoreRelatedChunkSiblings = (node: Element): Element[] => {
  let nextSibling = node.nextElementSibling as any;
  const coreRelatedChunkSiblings = [];

  while (nextSibling?.href && nextSibling.href.includes('porsche-design-system.')) {
    coreRelatedChunkSiblings.push(nextSibling);
    nextSibling = nextSibling.nextElementSibling as any;
  }
  return coreRelatedChunkSiblings;
};

const temp = (version) => {
  const coreChunkLinkNode = document.querySelector(`[href*=porsche-design-system.v${version}]`.replace(/\./g, '\\.'));

  if (coreChunkLinkNode) {
    return [coreChunkLinkNode, ...getAllCoreRelatedChunkSiblings(coreChunkLinkNode)];
  }
};

const validateGetComponentChunkLinksUsage = (): void => {
  const usedPdsVersions = Object.keys((document as any).porscheDesignSystem || {});
  const prefixes = getPorscheDesignSystemPrefixes();

  const preloadChunkLinksForVersion: { [key: string]: Element[] } = usedPdsVersions.reduce(
    (result, version) => ({
      ...result,
      [version]: temp(version),
    }),
    {}
  );
  console.log(preloadChunkLinksForVersion);

  const preloadablePdsTagNames = TAG_NAMES.filter(
    (tagName) =>
      ![
        'p-table-body',
        'p-table-head',
        'p-table-head-row',
        'p-table-head-cell',
        'p-table-row',
        'p-table-cell',
        'p-grid-item',
        'p-flex-item',
        'p-segmented-control-item',
        'p-select-wrapper-dropdown',
        'p-tabs-item',
        'p-text-list-item',
        'p-toast-item',
        'p-stepper-horizontal-item',
      ].includes(tagName)
  );

  const allPdsComponentsSelector = prefixes
    .map((prefix) => {
      return prefix ? preloadablePdsTagNames.map((tagName) => `${prefix}-${tagName}`) : preloadablePdsTagNames;
    })
    .join();

  const allPdsElements = Array.from(document.querySelectorAll(allPdsComponentsSelector));

  const allTagNamesLowerCase = allPdsElements
    .map(getTagName)
    .filter((tagName, idx, arr) => arr.indexOf(tagName) === idx);

  console.log(allTagNamesLowerCase);

  const usedTagNamesWithoutPreload: string[] = [];

  if (usedTagNamesWithoutPreload.length) {
    console.warn(
      `The Porsche Design System detected the usage of the components '${usedTagNamesWithoutPreload.join(
        ', '
      )}' without preloading. We recommend the usage of the
'getComponentChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/component-chunk-links to enhance performance and loading behavior`
    );
  }
};

export const validateGetLoaderScriptUsage = (): void => {
  if (!document.querySelector('script[data-pds-loader-script]')) {
    partialValidationWarning('getLoaderScript');
  }
};

export const validateInitialStylesWithPrefixUsage = (): void => {
  getPorscheDesignSystemPrefixes().forEach((prefix) => {
    if (prefix && !document.head.querySelector(`style[data-pds-initial-styles-${prefix}]`)) {
      console.warn(
        `You are using the Porsche Design System with prefixing but without 'getInitialStyles({ prefix: ${prefix} })'.
Please make sure to apply the 'getInitialStyles()' partial as described at https://designsystem.porsche.com/v2/partials/initial-styles`
      );
    }
  });
};

const partialValidationWarning = (partialName: PartialNames): void => {
  const partialNameToLinkPathMap: Record<PartialNames, string> = {
    getFontLink: 'font-links',
    getLoaderScript: 'loader-script',
  };

  console.warn(
    `You are not using '${partialName}()'. The Porsche Design System recommends the usage of the '${partialName}()'
partial as described at https://designsystem.porsche.com/v2/partials/${partialNameToLinkPathMap[partialName]} to enhance performance and loading behavior`
  );
};

const getPorscheDesignSystemPrefixes = (): string[] =>
  (document as any).porscheDesignSystem
    ? Object.entries((document as any).porscheDesignSystem)
        .map(([, value]) => (value as any).prefixes)
        .filter((prefix, idx, arr) => arr.findIndex((p) => p.target === prefix.target) === idx)
        .flat()
    : [];
