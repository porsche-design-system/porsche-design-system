import { TAG_NAMES_WITH_CHUNK, type TagName } from '@porsche-design-system/shared';
import { getTagNameWithoutPrefix } from '../../tag-name';
import { isAlreadyInArray } from '../../is-already-in-array';

export type TagNamesForVersions = { [key: string]: TagName[] };

export const getPreloadedTagNamesForCoreChunk = (coreChunkLink: HTMLLinkElement): TagName[] => {
  const preloadedTagNames: TagName[] = [];

  let nextSibling = coreChunkLink.nextElementSibling as HTMLLinkElement;
  while (nextSibling?.href && !!/porsche-design-system\.[a-z-]+\./.exec(nextSibling.href)) {
    const tagName = ('p-' + nextSibling.href.split('/').pop().split('.')[1]) as TagName;
    preloadedTagNames.push(tagName);
    nextSibling = nextSibling.nextElementSibling as HTMLLinkElement;
  }

  return preloadedTagNames;
};

export const getPreloadedTagNamesForVersion = (version: string): TagName[] => {
  const coreChunkLinkElement: HTMLLinkElement = document.querySelector(
    `[href*=porsche-design-system.v${version}]`.replace(/\./g, '\\.')
  );

  return coreChunkLinkElement ? getPreloadedTagNamesForCoreChunk(coreChunkLinkElement) : [];
};

export const getPreloadedTagNamesForVersions = (versions: string[]): TagNamesForVersions =>
  versions.reduce(
    (result, version) => ({
      ...result,
      [version]: getPreloadedTagNamesForVersion(version),
    }),
    {}
  );

export const getPdsComponentsSelector = (prefixes: string[]): string =>
  prefixes
    .map((prefix) => {
      return prefix ? TAG_NAMES_WITH_CHUNK.map((tagName) => `${prefix}-${tagName}`) : TAG_NAMES_WITH_CHUNK;
    })
    .join();

export const getUsedTagNamesForVersions = (prefixesForVersions: { [key: string]: string[] }): TagNamesForVersions =>
  Object.entries(prefixesForVersions).reduce((result, [version, prefixes]) => {
    const pdsComponentsSelector = getPdsComponentsSelector(prefixes);
    const pdsElements = Array.from(document.querySelectorAll(pdsComponentsSelector));
    const tagNames = pdsElements.map(getTagNameWithoutPrefix);

    const phnHeader = document.querySelector('phn-header');
    if (prefixes.includes('phn') && phnHeader) {
      const phnPdsElements = Array.from(phnHeader.shadowRoot.querySelectorAll(pdsComponentsSelector));
      const pdsPhnTagNames = phnPdsElements.map(getTagNameWithoutPrefix);
      return {
        ...result,
        [version]: [...tagNames, ...pdsPhnTagNames].filter(isAlreadyInArray),
      };
    }
    return {
      ...result,
      [version]: tagNames.filter(isAlreadyInArray),
    };
  }, {});

export const getUsedTagNamesWithoutPreloadForVersions = (
  usedTagNamesForVersions: TagNamesForVersions,
  preloadedTagNamesForVersions: TagNamesForVersions
): { [key: string]: string[] } =>
  Object.entries(usedTagNamesForVersions).reduce((result, [version, tagNames]) => {
    const tagNamesWithoutPreload = tagNames.filter(
      (tagName) => !preloadedTagNamesForVersions[version].includes(tagName)
    );

    return tagNamesWithoutPreload.length
      ? {
          ...result,
          [version]: tagNamesWithoutPreload,
        }
      : result;
  }, {});

export const getPorscheDesignSystemPrefixesForVersions = (): { [key: string]: string[] } =>
  Object.entries(document.porscheDesignSystem).reduce(
    (result, [key, value]) =>
      typeof value === 'string'
        ? result // can be 'cdn' key with string value
        : {
            ...result,
            [key]: value.prefixes,
          },
    {}
  );
