import { TAG_NAMES } from '@porsche-design-system/shared';

type PartialNames = 'getFontLink' | 'getLoaderScript';

export const validatePartialUsage = (): void => {
  validateGetFontLinksUsage();
  validateGetComponentChunkLinksUsage();
  validateGetLoaderScriptUsage();
  validateInitialStylesWithPrefixUsage();
};

const validateGetFontLinksUsage = (): void => {
  if (!document.querySelector('link[rel=preload][as=font][href*=porsche-next-w-la-regular]')) {
    partialValidationWarning('getFontLink');
  }
};

const validateGetComponentChunkLinksUsage = (): void => {
  const prefixes = getPorscheDesignSystemPrefixes();

  // Component tag names which should not be searched
  // [ 'p-table-body', 'p-table-head', 'p-table-head-row', 'p-table-head-cell', 'p-table-row', 'p-table-cell', 'p-grid-item', 'p-flex-item', 'p-segmented-control-item', 'p-select-wrapper-dropdown', 'p-tabs-item', 'p-text-list-item', 'p-toast-item', 'p-stepper-horizontal-item']

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

  const allDefaultPdsNodes = Array.from(document.querySelectorAll(preloadablePdsTagNames.join()));
  const allPrefixedPdsTagNames = prefixes.map((prefix) =>
    preloadablePdsTagNames.map((tagName) => `${prefix}-${tagName}`)
  );
  const allPrefixedPdsNodes = Array.from(document.querySelectorAll(allPrefixedPdsTagNames.join()));
  const allTagNamesLowerCase = [...allDefaultPdsNodes.concat(allPrefixedPdsNodes)]
    .map((node) => node.tagName.toLowerCase())
    .map((tagName) => tagName.replace(/(?:\w+-)+p-/, 'p-'));

  const allTagNamesWithoutDuplicates = new Set(allTagNamesLowerCase);

  let usedTagNamesWithoutPreload: string[] = [];

  allTagNamesWithoutDuplicates.forEach((tagName) => {
    let chunkName = tagName;

    const componentNameToChunkNameMap = {
      'p-inline-notification': 'p-banner',
      'p-button-group': 'p-button',
      'p-tag-dismissible': 'p-tag',
    };

    if (['p-inline-notification', 'p-button-group', 'p-tag-dismissible'].includes(tagName)) {
      chunkName = componentNameToChunkNameMap[tagName];
    }

    if (!document.querySelector(`link[rel=preload][as=script][data-pds-${chunkName}-chunk-link][crossorigin]`)) {
      usedTagNamesWithoutPreload.push(tagName);
    }
  });

  if (usedTagNamesWithoutPreload.length) {
    console.warn(
      `The Porsche Design System detected the usage of the components '${usedTagNamesWithoutPreload.join(
        ', '
      )}' without preloading. We recommend the usage of the
'getComponentChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/component-chunk-links to enhance performance and loading behavior`
    );
  }
};

const validateGetLoaderScriptUsage = (): void => {
  if (!document.querySelector('script[data-pds-loader-script]')) {
    partialValidationWarning('getLoaderScript');
  }
};

const validateInitialStylesWithPrefixUsage = (): void => {
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
