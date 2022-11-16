import { COMPONENT_TAG_NAMES_WITH_CHUNK } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import { getPreloadedTagNamesForVersion, getPorscheDesignSystemPrefixes } from './helper';
import { getTagNameWithoutPrefix } from '../../tag-name';

type PartialNames = 'getFontLink' | 'getLoaderScript';

declare global {
  interface Document {
    porscheDesignSystem: { [key: string]: { prefixes: [string] } };
  }
}

export const validatePartialUsage = (): void => {
  if (!(ROLLUP_REPLACE_IS_STAGING === 'staging' && process.env.NODE_ENV === 'development')) {
    validateGetFontLinksUsage();
    validateGetComponentChunkLinksUsage();
    validateGetLoaderScriptUsage();
    validateInitialStylesWithPrefixUsage();
  }
};

export const validateGetFontLinksUsage = (): void => {
  if (!document.querySelector('link[rel=preload][as=font][href*=porsche-next-w-la-regular]')) {
    partialValidationWarning('getFontLink');
  }
};

const validateGetComponentChunkLinksUsage = (): void => {
  const usedPdsVersions = Object.keys(document.porscheDesignSystem);

  const prefixesForVersion: { [key: string]: [string] } = Object.entries(document.porscheDesignSystem).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: value.prefixes,
    }),
    {}
  );

  const preloadTagNamesForVersion: { [key: string]: TagName[] } = usedPdsVersions.reduce(
    (result, version) => ({
      ...result,
      [version]: getPreloadedTagNamesForVersion(version),
    }),
    {}
  );

  const usedTagNamesForVersion: { [key: string]: TagName[] } = Object.entries(prefixesForVersion).reduce(
    (result, [version, prefixes]) => {
      const pdsComponentsSelector = prefixes
        .map((prefix) => {
          return prefix
            ? COMPONENT_TAG_NAMES_WITH_CHUNK.map((tagName) => `${prefix}-${tagName}`)
            : COMPONENT_TAG_NAMES_WITH_CHUNK;
        })
        .join();

      const pdsElements = Array.from(document.querySelectorAll(pdsComponentsSelector));

      const tagNames = pdsElements
        .map(getTagNameWithoutPrefix)
        .filter((tagName, idx, arr) => arr.indexOf(tagName) === idx);

      return {
        ...result,
        [version]: tagNames,
      };
    },
    {}
  );

  const usedTagNamesWithoutPreloadForVersion: { [key: string]: string[] } = Object.entries(
    usedTagNamesForVersion
  ).reduce((result, [version, tagNames]) => {
    const tagNamesWithoutPreload = tagNames.filter((tagName) => !preloadTagNamesForVersion[version].includes(tagName));

    return tagNamesWithoutPreload.length
      ? {
          ...result,
          [version]: tagNamesWithoutPreload,
        }
      : result;
  }, {});

  Object.entries(usedTagNamesWithoutPreloadForVersion).forEach(([version, tagNames]) => {
    console.warn(
      `Usage of Porsche Design System v${version} component '${tagNames.join(
        ', '
      )}' detected, without preloading. We recommend the usage of the
'getComponentChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/component-chunk-links to enhance performance and loading behavior`
    );
  });
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
