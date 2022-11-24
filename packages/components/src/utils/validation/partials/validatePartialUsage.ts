import {
  getPorscheDesignSystemPrefixesForVersions,
  getPreloadedTagNamesForVersions,
  getUsedTagNamesForVersions,
  getUsedTagNamesWithoutPreloadForVersions,
} from './helper';
import { paramCase } from 'change-case';
import type { PartialName } from '@porsche-design-system/shared';

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
    throwPartialValidationWarning('getFontLinks');
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
      )}' detected, without preloading. ${getWarningRecommendation('getComponentChunkLinks')}`
    );
  });
};

export const validateGetLoaderScriptUsage = (): void => {
  if (!document.querySelector('script[data-pds-loader-script]')) {
    throwPartialValidationWarning('getLoaderScript');
  }
};

export const validateGetInitialStylesUsage = (): void => {
  Object.values(getPorscheDesignSystemPrefixesForVersions())
    .flat()
    .forEach((prefix) => {
      if (prefix && !document.querySelector(`style[data-pds-initial-styles-${prefix}]`)) {
        throwPartialValidationWarning('getInitialStyles', prefix);
      } else if (!document.querySelector('style[data-pds-initial-styles]')) {
        throwPartialValidationWarning('getInitialStyles');
      }
    });
};

export const throwPartialValidationWarning = (partialName: PartialName, prefix?: string): void => {
  console.warn(
    `You are using the Porsche Design System ${
      prefix && `with prefix: ${prefix} `
    }without using the ${partialName}()' partial. ${getWarningRecommendation(partialName)}`
  );
};

export const getWarningRecommendation = (partialName): string => {
  return `We recommend the usage of the ${partialName}() partial as described at https://designsystem.porsche.com/v2/"partials/${paramCase(
    partialName.replace('get', '')
  )}", to enhance loading and bootstrapping experience.`;
};
