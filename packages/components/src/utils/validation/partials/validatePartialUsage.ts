import { FONT_FACE_CDN_FILE_CN, FONT_FACE_CDN_FILE_COM } from '@porsche-design-system/assets';
import type { PartialName } from '@porsche-design-system/shared';
import { getCDNBaseURL } from '../../getCDNBaseURL';
import { consoleWarn, throwException } from '../../log';
import {
  getPorscheDesignSystemPrefixesForVersions,
  getPreloadedTagNamesForVersions,
  getUsedTagNamesForVersions,
  getUsedTagNamesWithoutPreloadForVersions,
} from './helper';

export const validatePartialUsage = (): void => {
  // TODO: before reactivating we need to be able to distinguish between Light DOM and/or Shadow DOM usage.
  // validateGetInitialStylesUsage();
  internalPartial.validateGetFontFaceStylesUsage();
  internalPartial.validateGetFontLinksUsage();
  // TODO: integration test (real world test) first, before rollout
  // validateGetLoaderScriptUsage();
  // validateGetComponentChunkLinksUsage();
};

export const validateGetFontFaceStylesUsage = (): void => {
  const baseUrl = getCDNBaseURL();
  const styleUrl =
    ROLLUP_REPLACE_IS_STAGING !== 'staging' && process.env.NODE_ENV !== 'development'
      ? `${baseUrl}/styles/${baseUrl.match(/\.cn\//) ? FONT_FACE_CDN_FILE_CN : FONT_FACE_CDN_FILE_COM}`
      : 'http://localhost:3001/styles/font-face.css';
  if (!document.head.querySelector(`link[href="${styleUrl}"],style[data-pds-font-face-styles=""]`)) {
    internalPartial.logPartialValidationWarning('getFontFaceStyles');
  }
};

export const validateGetFontLinksUsage = (): void => {
  if (!document.head.querySelector('link[rel=preload][as=font][href*=porsche-next]')) {
    internalPartial.logPartialValidationWarning('getFontLinks');
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

  for (const [version, tagNames] of Object.entries(usedTagNamesWithoutPreloadForVersions)) {
    consoleWarn(
      `Usage of Porsche Design System v${version} component '${tagNames.join(', ')}' detected without preloading.`,
      internalPartial.getValidatePartialErrorSecondaryText('getComponentChunkLinks')
    );
  }
};

export const validateGetLoaderScriptUsage = (): void => {
  if (!document.body.querySelector('script[data-pds-loader-script]')) {
    internalPartial.logPartialValidationWarning('getLoaderScript');
  }
};

export const validateGetInitialStylesUsage = (): void => {
  if (!document.head.querySelector('style[data-pds-initial-styles]')) {
    internalPartial.throwPartialValidationError('getInitialStyles');
  }
};

export const logPartialValidationWarning = (partialName: PartialName, prefix?: string): void => {
  consoleWarn(
    internalPartial.getValidatePartialErrorPrimaryText(partialName, prefix),
    internalPartial.getValidatePartialErrorSecondaryText(partialName)
  );
};

export const throwPartialValidationError = (partialName: PartialName, prefix?: string): void => {
  throwException(
    `${internalPartial.getValidatePartialErrorPrimaryText(partialName, prefix)} ${internalPartial.getValidatePartialErrorSecondaryText(partialName, true)}`
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

export const internalPartial = {
  getValidatePartialErrorPrimaryText,
  getValidatePartialErrorSecondaryText,
  throwPartialValidationError,
  validateGetFontFaceStylesUsage,
  validateGetFontLinksUsage,
  logPartialValidationWarning,
};
