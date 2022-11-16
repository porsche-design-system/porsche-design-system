import { COMPONENT_CHUNK_NAMES } from '@porsche-design-system/shared';
import { getChunkLinkElementsForVersion, getPorscheDesignSystemPrefixes } from './helper';
import { getTagNameWithoutPrefix } from '../../tag-name';

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

const validateGetComponentChunkLinksUsage = (): void => {
  const usedPdsVersions = Object.keys((document as any).porscheDesignSystem || {});

  const prefixesForVersion: { [key: string]: [string] } = Object.entries((document as any).porscheDesignSystem).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: (value as any).prefixes,
    }),
    {}
  );

  const preloadChunkLinksForVersion: { [key: string]: Element[] } = usedPdsVersions.reduce(
    (result, version) => ({
      ...result,
      [version]: getChunkLinkElementsForVersion(version),
    }),
    {}
  );

  const usedTagNamesForVersion = Object.entries(prefixesForVersion).reduce((result, [version, prefixes]) => {
    const allPdsComponentsSelector = prefixes
      .map((prefix) => {
        return COMPONENT_CHUNK_NAMES.map((tagName) => (prefix ? `${prefix}-p-${tagName}` : `p-${tagName}`));
      })
      .join();

    const allPdsElements = Array.from(document.querySelectorAll(allPdsComponentsSelector));

    const allTagNamesLowerCase = allPdsElements
      .map(getTagNameWithoutPrefix)
      .filter((tagName, idx, arr) => arr.indexOf(tagName) === idx);

    return {
      ...result,
      [version]: allTagNamesLowerCase,
    };
  }, {});

  const usedTagNamesWithoutPreloadForVersion: { [key: string]: string[] } = Object.entries(
    usedTagNamesForVersion
  ).reduce((result, [version, tagNames]) => {
    const tagNamesWithoutPreload = (tagNames as string[]).filter((tagName) => {
      if (
        preloadChunkLinksForVersion[version].find((chunkLink: HTMLLinkElement) =>
          chunkLink.href.includes(`porsche-design-system.${tagName.replace('p-', '')}`)
        )
      ) {
        return tagName;
      }
    });

    return {
      ...result,
      [version]: tagNamesWithoutPreload,
    };
  }, {});

  Object.entries(usedTagNamesWithoutPreloadForVersion).forEach(([version, tagNames]) => {
    if (tagNames.length) {
      console.warn(
        `Usage of Porsche Design System v${version} components '${tagNames.join(
          ', '
        )}'detected, without preloading them. We recommend the usage of the
'getComponentChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/component-chunk-links to enhance performance and loading behavior`
      );
    }
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
