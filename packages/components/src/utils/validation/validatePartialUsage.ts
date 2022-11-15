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

const coreRelatedChunkSiblings: Element[] = [];

const getAllCoreRelatedChunkSiblings = (node: Element): Element[] => {
  const nextSibling = node.nextElementSibling as any;

  if (nextSibling.href && nextSibling.href.includes(`porsche-design-system.`)) {
    coreRelatedChunkSiblings.push(nextSibling);
    coreRelatedChunkSiblings.concat(getAllCoreRelatedChunkSiblings(nextSibling));
  }
  return coreRelatedChunkSiblings;
};

const validateGetComponentChunkLinksUsage = (): void => {
  const usedPdsVersions = Object.keys((document as any).porscheDesignSystem ?? {});
  const prefixes = getPorscheDesignSystemPrefixes();

  let chunksLinkNodes: Element[] = [];
  const preloadChunkLinksForVersion: [{ [key: string]: Element[] }] = [{}];

  usedPdsVersions.forEach((version) => {
    const coreChunkLinkNode = document.querySelector(
      `[href*=porsche-design-system\\.v${version.replace(/\./g, '\\.')}]`
    );
    console.log(coreChunkLinkNode);

    if (coreChunkLinkNode) {
      chunksLinkNodes.push(coreChunkLinkNode);
      chunksLinkNodes.concat(getAllCoreRelatedChunkSiblings(coreChunkLinkNode));
      preloadChunkLinksForVersion.push({ [version]: chunksLinkNodes });
    } else {
      console.warn(
        `You are using the Porsche Design System version '${version}' without preloading it. We recommend the usage of the
'getComponentChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/component-chunk-links to enhance performance and loading behavior`
      );
    }
  });

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

  const usedTagNamesWithoutPreload: string[] = [];

  allTagNamesWithoutDuplicates.forEach((tagName) => {
    if (
      preloadChunkLinksForVersion.map((x) => {
        const chunkLinkNodes = Object.values(x).flat();
        return chunkLinkNodes.find((chunkLinkNode) =>
          (chunkLinkNode as HTMLLinkElement).href.includes(`porsche.design.system.${tagName}`)
        );
      })
    ) {
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
