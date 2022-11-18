import {
  getPorscheDesignSystemPrefixesForVersions,
  getPreloadedTagNamesForVersions,
  getUsedTagNamesForVersions,
  getUsedTagNamesWithoutPreloadForVersions,
} from './helper';

export type PartialName = 'getFontLink' | 'getLoaderScript';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    // Extend Document interface so we don't have to cast it on any
    porscheDesignSystem: { [key: string]: { prefixes: string[] } };
  }
}

export const validatePartialUsage = (): void => {
  // Ensure no warning is thrown when started with yarn start
  if (ROLLUP_REPLACE_IS_STAGING !== 'staging' && process.env.NODE_ENV !== 'development') {
    validateGetFontLinksUsage();
    validateGetComponentChunkLinksUsage();
    validateGetLoaderScriptUsage();
    validateGetInitialStylesUsage();
  }
};

export const validateGetFontLinksUsage = (): void => {
  if (!document.querySelector('link[rel=preload][as=font][href*=porsche-next-w-la-regular]')) {
    partialValidationWarning('getFontLink');
  }
};

export const validateGetComponentChunkLinksUsage = (): void => {
  const registeredPdsVersions = Object.keys(document.porscheDesignSystem);
  const prefixesForVersions = getPorscheDesignSystemPrefixesForVersions();
  const preloadTagNamesForVersions = getPreloadedTagNamesForVersions(registeredPdsVersions);
  const usedTagNamesForVersions = getUsedTagNamesForVersions(prefixesForVersions);
  const usedTagNamesWithoutPreloadForVersions = getUsedTagNamesWithoutPreloadForVersions(
    usedTagNamesForVersions,
    preloadTagNamesForVersions
  );

  Object.entries(usedTagNamesWithoutPreloadForVersions).forEach(([version, tagNames]) => {
    console.warn(
      `Usage of Porsche Design System v${version} component '${tagNames.join(
        ', '
      )}' detected, without preloading. We recommend the usage of the
'getComponentChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/component-chunk-links to enhance performance and loading behavior.`
    );
  });
};

export const validateGetLoaderScriptUsage = (): void => {
  if (!document.querySelector('script[data-pds-loader-script]')) {
    partialValidationWarning('getLoaderScript');
  }
};

export const validateGetInitialStylesUsage = (): void => {
  const warningRecommendation =
    'We recommend the usage of the partial as described at https://designsystem.porsche.com/v2/partials/initial-styles, to ensure that there is no flash of content.';

  Object.values(getPorscheDesignSystemPrefixesForVersions())
    .flat()
    .forEach((prefix) => {
      if (prefix && !document.querySelector(`style[data-pds-initial-styles-${prefix}]`)) {
        console.warn(
          `You are using the Porsche Design System with prefix: '${prefix}' without using the 'getInitialStyles()' partial. ${warningRecommendation}`
        );
      } else if (!document.querySelector('style[data-pds-initial-styles]')) {
        console.warn(
          `You are using the Porsche Design System without using the 'getInitialStyles()' partial. ${warningRecommendation}`
        );
      }
    });
};

export const partialValidationWarning = (partialName: PartialName): void => {
  const partialNameToLinkPathMap: Record<PartialName, string> = {
    getFontLink: 'font-links',
    getLoaderScript: 'loader-script',
  };

  console.warn(
    `You are not using '${partialName}()'. The Porsche Design System recommends the usage of the '${partialName}()'
partial as described at https://designsystem.porsche.com/v2/partials/${partialNameToLinkPathMap[partialName]} to enhance performance and loading behavior.`
  );
};
