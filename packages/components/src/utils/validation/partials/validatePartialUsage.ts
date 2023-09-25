import {
  getPorscheDesignSystemPrefixesForVersions,
  getPreloadedTagNamesForVersions,
  getUsedTagNamesForVersions,
  getUsedTagNamesWithoutPreloadForVersions,
} from './helper';
import type { PartialName } from '@porsche-design-system/shared';
import { FONT_FACE_CDN_FILE_CN, FONT_FACE_CDN_FILE_COM } from '@porsche-design-system/styles';
import { consoleWarn, throwException } from '../../log';
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
      cdn: {
        url: string;
        prefixes: string[]; // to not break older versions
      };
    };
  }
}

export const validatePartialUsage = (): void => {
  // ensure no validation is happening via `yarn start`
  validateGetInitialStylesUsage();
  validateGetFontFaceStylesheetUsage();
  validateGetFontLinksUsage();
  // TODO: integration test (real world test) first, before rollout
  // validateGetLoaderScriptUsage();
  // validateGetComponentChunkLinksUsage();
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
      getValidatePartialErrorSecondaryText('getComponentChunkLinks')
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
    throwPartialValidationError('getInitialStyles');
  }
};

export const logPartialValidationWarning = (partialName: PartialName, prefix?: string): void => {
  consoleWarn(
    getValidatePartialErrorPrimaryText(partialName, prefix),
    getValidatePartialErrorSecondaryText(partialName)
  );
};

export const throwPartialValidationError = (partialName: PartialName, prefix?: string): void => {
  throwException(
    getValidatePartialErrorPrimaryText(partialName, prefix) +
      ' ' +
      getValidatePartialErrorSecondaryText(partialName, true)
  );
};

export const getValidatePartialErrorPrimaryText = (partialName: string, prefix?: string): string => {
  return `The Porsche Design System ${
    prefix ? `with prefix: '${prefix}' ` : ''
  }is used without using the ${partialName}() partial.`;
};

export const getValidatePartialErrorSecondaryText = (partialName: string, required?: boolean): string => {
  const partialUrl = partialName
    .replace('get', '')
    .replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase to param-case
    .toLowerCase();
  return `The usage of the ${partialName}() partial is ${
    required ? 'required' : 'recommended'
  } as described at https://designsystem.porsche.com/v3/partials/${partialUrl} to enhance loading behavior.`;
};
