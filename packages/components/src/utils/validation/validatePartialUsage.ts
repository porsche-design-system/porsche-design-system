type PartialNames = 'getFontLink' | 'getComponentChunkLinks' | 'getLoaderScript';

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
  const allNodes = Array.from(document.querySelectorAll('*'));
  const allTagNamesLowerCase = allNodes.map((node) => node.tagName.toLowerCase());

  const defaultTagNames: string[] = allTagNamesLowerCase.filter((tagName) => tagName.startsWith('p-'));
  const prefixedTagNames: string[] = allTagNamesLowerCase
    .filter((tagName) => prefixes.find((prefix) => tagName.startsWith(`${prefix}-p-`)))
    .map((tagName) => tagName.replace(/(?:\w+-)+p-/, 'p-'));

  const preloadableTagNames = [...new Set(defaultTagNames.concat(prefixedTagNames))].filter(
    (tagName) =>
      !tagName.includes('-item') &&
      !tagName.includes('-body') &&
      !tagName.includes('-head') &&
      !tagName.includes('-cell') &&
      !tagName.includes('-row')
  );

  preloadableTagNames.forEach((tagName) => {
    if (!document.querySelector(`link[rel=preload][as=script][data-pds-${tagName}-chunk-link][crossorigin]`)) {
      console.warn(
        `The Porsche Design System detected the usage of '${tagName}' without preloading it with 'getComponentChunkLinks()'. We recommend the usage of the
'getComponentChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/component-chunk-links to enhance performance and loading behavior`
      );
    }
  });
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
    getComponentChunkLinks: 'component-chunk-links',
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
