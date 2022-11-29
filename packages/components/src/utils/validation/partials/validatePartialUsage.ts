import {
  getPorscheDesignSystemPrefixesForVersions,
  getPreloadedTagNamesForVersions,
  getUsedTagNamesForVersions,
  getUsedTagNamesWithoutPreloadForVersions,
} from './helper';
import type { PartialName } from '@porsche-design-system/shared';
import { FONT_FACE_CDN_URL } from '@porsche-design-system/styles';
import { injectGlobalStyle } from '../../inject-global-style';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    // Extend Document interface so we don't have to cast it on any
    porscheDesignSystem: { [key: string]: { prefixes: string[] } };
  }
}

export const validatePartialUsage = (): void => {
  // Ensure no warning is thrown when started with yarn start except for getFontFaceStylesheet()
  validateFontFaceStylesheetUsage();
  if (ROLLUP_REPLACE_IS_STAGING !== 'staging' && process.env.NODE_ENV !== 'development') {
    validateGetFontLinksUsage();
    validateGetComponentChunkLinksUsage();
    validateGetLoaderScriptUsage();
    validateGetInitialStylesUsage();
  }
};

export const validateFontFaceStylesheetUsage = (): void => {
  const styleUrl =
    ROLLUP_REPLACE_IS_STAGING === 'production' ? FONT_FACE_CDN_URL : 'http://localhost:3001/styles/font-face.min.css';
  if (!document.head.querySelector(`link[href="${styleUrl}"]`)) {
    injectGlobalStyle(styleUrl);
    throwPartialValidationWarning('getFontFaceStylesheet');
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
      )}' detected without preloading. ${getWarningRecommendation('getComponentChunkLinks')}`
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
      if (
        !document.querySelector(prefix ? `style[data-pds-initial-styles-${prefix}]` : 'style[data-pds-initial-styles]')
      ) {
        throwPartialValidationWarning('getInitialStyles', prefix);
      }
    });
};

export const throwPartialValidationWarning = (partialName: PartialName, prefix?: string): void => {
  console.warn(
    `You are using the Porsche Design System ${
      prefix ? `with prefix: '${prefix}' ` : ''
    }without using the ${partialName}() partial.${
      partialName === 'getFontFaceStylesheet'
        ? ' The Porsche Design System had to inject our font-face.css file into your head.'
        : ''
    } ${getWarningRecommendation(partialName)}`
  );
};

export const getWarningRecommendation = (partialName: string): string => {
  const partialUrl = partialName
    .replace('get', '')
    .replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase to param-case
    .toLowerCase();
  return `We recommend the usage of the ${partialName}() partial as described at https://designsystem.porsche.com/v2/partials/${partialUrl} to enhance loading behavior.`;
};
