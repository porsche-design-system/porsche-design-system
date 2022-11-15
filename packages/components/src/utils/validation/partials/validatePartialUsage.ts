// prettier-ignore
export const COMPONENT_CHUNK_NAMES = ['accordion', 'banner', 'button-group', 'button-pure', 'button', 'carousel', 'checkbox-wrapper', 'content-wrapper', 'divider', 'fieldset-wrapper', 'flex', 'grid', 'headline', 'icon', 'inline-notification', 'link-pure', 'link-social', 'link-tile', 'link', 'marque', 'modal', 'pagination', 'popover', 'radio-button-wrapper', 'scroller', 'segmented-control', 'select-wrapper', 'spinner', 'stepper-horizontal', 'switch', 'table', 'tabs-bar', 'tabs', 'tag-dismissible', 'tag', 'text-field-wrapper', 'text-list', 'text', 'textarea-wrapper', 'toast'];

import { getTagName } from '../../tag-name';
import { getChunkLinkElementsForVersion, getPorscheDesignSystemPrefixes } from './helper';

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
  const prefixes = getPorscheDesignSystemPrefixes();

  const preloadChunkLinksForVersion: { [key: string]: Element[] } = usedPdsVersions.reduce(
    (result, version) => ({
      ...result,
      [version]: getChunkLinkElementsForVersion(version),
    }),
    {}
  );
  console.log(preloadChunkLinksForVersion);

  const allPdsComponentsSelector = prefixes
    .map((prefix) => {
      return prefix ? COMPONENT_CHUNK_NAMES.map((tagName) => `${prefix}-${tagName}`) : COMPONENT_CHUNK_NAMES;
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
