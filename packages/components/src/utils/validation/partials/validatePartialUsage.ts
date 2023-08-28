import {
  getPorscheDesignSystemPrefixesForVersions,
  getPreloadedTagNamesForVersions,
  getUsedTagNamesForVersions,
  getUsedTagNamesWithoutPreloadForVersions,
} from './helper';
import type { PartialName } from '@porsche-design-system/shared';
import { FONT_FACE_CDN_FILE_CN, FONT_FACE_CDN_FILE_COM } from '@porsche-design-system/styles';
import { consoleWarn } from '../../log';
import { getCDNBaseURL } from '../../getCDNBaseURL';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    porscheDesignSystem: {
      [key: `${number}.${number}.${number}`]: {
        prefixes: string[];
        isReady: () => Promise<void>;
        readyResolve: () => void;
      };
      cdn: string;
    };
  }
}

export const validatePartialUsage = (): void => {
  // Ensure no warning is thrown when started with yarn start except for getFontFaceStylesheet()
  if (ROLLUP_REPLACE_IS_STAGING !== 'staging' && process.env.NODE_ENV !== 'development') {
    validateGetInitialStylesUsage();
    validateGetFontFaceStylesheetUsage();
    validateGetFontLinksUsage();
    // TODO: integration test (real world test) first, before rollout
    // validateGetLoaderScriptUsage();
    // validateGetComponentChunkLinksUsage();
  }
};

export const validateGetFontFaceStylesheetUsage = (): void => {
  const baseUrl = getCDNBaseURL();
  const styleUrl = `${baseUrl}/styles/${baseUrl.match(/\.cn\//) ? FONT_FACE_CDN_FILE_CN : FONT_FACE_CDN_FILE_COM}`;
  if (!document.head.querySelector(`link[href="${styleUrl}"]`)) {
    logPartialValidationWarning('getFontFaceStylesheet');
  }
};

export const validateGetFontLinksUsage = (): void => {
  if (!document.head.querySelector('link[rel=preload][as=font][href*=porsche-next-w-la-regular]')) {
    logPartialValidationWarning('getFontLinks');
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
    consoleWarn(
      `Usage of Porsche Design System v${version} component '${tagNames.join(', ')}' detected without preloading.`,
      getWarningRecommendation('getComponentChunkLinks')
    );
  });
};

export const validateGetLoaderScriptUsage = (): void => {
  if (!document.body.querySelector('script[data-pds-loader-script]')) {
    logPartialValidationWarning('getLoaderScript');
  }
};

export const validateGetInitialStylesUsage = (): void => {
  if (!document.head.querySelector('style[data-pds-initial-styles]')) {
    logPartialValidationWarning('getInitialStyles');
  }
};

export const logPartialValidationWarning = (partialName: PartialName, prefix?: string): void => {
  consoleWarn(
    `The Porsche Design System ${
      prefix ? `with prefix: '${prefix}' ` : ''
    }is used without using the ${partialName}() partial.`,
    getWarningRecommendation(partialName)
  );
};

export const getWarningRecommendation = (partialName: string): string => {
  const partialUrl = partialName
    .replace('get', '')
    .replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase to param-case
    .toLowerCase();
  return `The usage of the ${partialName}() partial is recommended as described at https://designsystem.porsche.com/v3/partials/${partialUrl} to enhance loading behavior.`;
};
