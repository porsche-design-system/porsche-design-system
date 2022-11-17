import {
  PartialName,
  partialValidationWarning,
  validateGetComponentChunkLinksUsage,
  validateGetFontLinksUsage,
  validateGetLoaderScriptUsage,
  validatePartialUsage,
} from './validatePartialUsage';
import * as validatePartialUsageUtils from './validatePartialUsage';
import { TagNamesForVersions } from './helper';
import * as helperUtils from './helper';

document.porscheDesignSystem = {
  '1.2.3': { prefixes: [''] },
  '1.2.4': { prefixes: ['prefix'] },
  '1.2.5': { prefixes: ['my-prefix'] },
};

beforeEach(() => {
  document.head.innerHTML = ''; // reset between tests
  jest.spyOn(global.console, 'warn').mockImplementation(); // to suppress logs
});

describe('validatePartialUsage()', () => {
  const originalEnv = process.env;
  afterEach(() => {
    process.env = originalEnv;
  });

  it.each<[string, string]>([
    ['production', 'test'],
    ['production', 'production'],
  ])(
    'should call validateGetFontLinksUsage(), validateGetComponentChunkLinksUsage(), validateGetLoaderScriptUsage() and validateGetInitialStylesUsage() for ROLLUP_REPLACE_IS_STAGING: "%s" and process.env.NODE_ENV: "%s"',
    (rollupReplaceIsStaging, nodeEnv) => {
      // @ts-ignore
      ROLLUP_REPLACE_IS_STAGING = rollupReplaceIsStaging;
      process.env = { ...originalEnv, NODE_ENV: nodeEnv };

      const validateGetFontLinksUsageSpy = jest.spyOn(validatePartialUsageUtils, 'validateGetFontLinksUsage');
      const validateGetComponentChunkLinksUsagesSpy = jest.spyOn(
        validatePartialUsageUtils,
        'validateGetComponentChunkLinksUsage'
      );
      const validateGetLoaderScriptUsageSpy = jest.spyOn(validatePartialUsageUtils, 'validateGetLoaderScriptUsage');
      const validateGetInitialStylesUsageSpy = jest.spyOn(validatePartialUsageUtils, 'validateGetInitialStylesUsage');

      validatePartialUsage();

      expect(validateGetFontLinksUsageSpy).toBeCalledWith();
      expect(validateGetComponentChunkLinksUsagesSpy).toBeCalledWith();
      expect(validateGetLoaderScriptUsageSpy).toBeCalledWith();
      expect(validateGetInitialStylesUsageSpy).toBeCalledWith();
    }
  );

  it.each<[string, string]>([
    ['staging', 'test'],
    ['staging', 'development'],
    ['staging', 'production'],
    ['production', 'development'],
  ])(
    'should not call any function for ROLLUP_REPLACE_IS_STAGING: "%s" and process.env.NODE_ENV: "%s"',
    (rollupReplaceIsStaging, nodeEnv) => {
      // @ts-ignore
      ROLLUP_REPLACE_IS_STAGING = rollupReplaceIsStaging;
      process.env = { ...originalEnv, NODE_ENV: nodeEnv };

      const validateGetFontLinksUsageSpy = jest.spyOn(validatePartialUsageUtils, 'validateGetFontLinksUsage');
      const validateGetComponentChunkLinksUsagesSpy = jest.spyOn(
        validatePartialUsageUtils,
        'validateGetComponentChunkLinksUsage'
      );
      const validateGetLoaderScriptUsageSpy = jest.spyOn(validatePartialUsageUtils, 'validateGetLoaderScriptUsage');
      const validateGetInitialStylesUsageSpy = jest.spyOn(validatePartialUsageUtils, 'validateGetInitialStylesUsage');

      validatePartialUsage();

      expect(validateGetFontLinksUsageSpy).not.toBeCalledWith();
      expect(validateGetComponentChunkLinksUsagesSpy).not.toBeCalledWith();
      expect(validateGetLoaderScriptUsageSpy).not.toBeCalledWith();
      expect(validateGetInitialStylesUsageSpy).not.toBeCalledWith();
    }
  );
});

describe('validateGetFontLinksUsage()', () => {
  it('should call partialValidationWarning() with correct parameter', () => {
    const spy = jest.spyOn(validatePartialUsageUtils, 'partialValidationWarning');
    validateGetFontLinksUsage();

    expect(spy).toBeCalledWith('getFontLink');
  });

  // TODO: also test with different rel, as and href?
  it('should not call partialValidationWarning() with "getFontLink" if font link is found', () => {
    const fontLink = document.createElement('link');
    fontLink.setAttribute('rel', 'preload');
    fontLink.setAttribute('as', 'font');
    fontLink.setAttribute('href', 'porsche-next-w-la-regular');
    document.head.appendChild(fontLink);
    const spy = jest.spyOn(validatePartialUsageUtils, 'partialValidationWarning');

    validateGetFontLinksUsage();

    expect(spy).not.toBeCalledWith('getFontLink');
  });
});

describe('validateGetComponentChunkLinksUsage()', () => {
  it('should call getPorscheDesignSystemPrefixesForVersions() with correct parameter', () => {
    const spy = jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions');
    validateGetComponentChunkLinksUsage();

    expect(spy).toBeCalledWith();
  });

  it('should call getPreloadedTagNamesForVersions() with correct parameter', () => {
    const spy = jest.spyOn(helperUtils, 'getPreloadedTagNamesForVersions');
    validateGetComponentChunkLinksUsage();

    expect(spy).toBeCalledWith(['1.2.3', '1.2.4', '1.2.5']);
  });

  it('should call getUsedTagNamesForVersions() with correct parameter', () => {
    const spy = jest.spyOn(helperUtils, 'getUsedTagNamesForVersions');
    validateGetComponentChunkLinksUsage();

    expect(spy).toBeCalledWith({ '1.2.3': [''], '1.2.4': ['prefix'], '1.2.5': ['my-prefix'] });
  });

  it('should call getUsedTagNamesWithoutPreloadForVersions() with correct parameters', () => {
    const preloadTagNamesForVersionsMock: TagNamesForVersions = { '1.2.3': ['p-text'] };
    jest.spyOn(helperUtils, 'getPreloadedTagNamesForVersions').mockReturnValue(preloadTagNamesForVersionsMock);

    const usedTagNamesForVersionsMock: TagNamesForVersions = { '1.2.3': ['p-button'] };
    jest.spyOn(helperUtils, 'getUsedTagNamesForVersions').mockReturnValue(usedTagNamesForVersionsMock);

    const spy = jest.spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions');
    validateGetComponentChunkLinksUsage();

    expect(spy).toBeCalledWith(usedTagNamesForVersionsMock, preloadTagNamesForVersionsMock);
  });

  it('should not warn when getUsedTagNamesWithoutPreloadForVersions() returns {}', () => {
    jest.spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions').mockReturnValue({});
    const spy = jest.spyOn(global.console, 'warn');
    validateGetComponentChunkLinksUsage();

    expect(spy).not.toBeCalled();
  });

  it('should warn for each version returned from getUsedTagNamesWithoutPreloadForVersions()', () => {
    jest
      .spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions')
      .mockReturnValue({ '1.2.3': ['p-text'], '1.2.4': ['p-text', 'p-button', 'p-link'] });

    const spy = jest.spyOn(global.console, 'warn');
    validateGetComponentChunkLinksUsage();

    // TODO: do we really want to check the whole warning message?
    expect(spy).toBeCalledWith(
      "Usage of Porsche Design System v1.2.3 component 'p-text' detected, without preloading. We recommend the usage of the\n" +
        "'getComponentChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/component-chunk-links to enhance performance and loading behavior"
    );
    expect(spy).toBeCalledWith(
      "Usage of Porsche Design System v1.2.4 component 'p-text, p-button, p-link' detected, without preloading. We recommend the usage of the\n" +
        "'getComponentChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/component-chunk-links to enhance performance and loading behavior"
    );
  });
});

describe('validateGetLoaderScriptUsage()', () => {
  it('should call partialValidationWarning() with correct parameter', () => {
    const spy = jest.spyOn(validatePartialUsageUtils, 'partialValidationWarning');
    validateGetLoaderScriptUsage();

    expect(spy).toBeCalledWith('getLoaderScript');
  });

  it('should not call partialValidationWarning() if loader script is found', () => {
    const loaderScript = document.createElement('script');
    loaderScript.setAttribute('data-pds-loader-script', '');
    document.head.appendChild(loaderScript);
    const spy = jest.spyOn(validatePartialUsageUtils, 'partialValidationWarning');

    validateGetLoaderScriptUsage();

    expect(spy).not.toBeCalledWith('getLoaderScript');
  });
});

describe('validateGetInitialStylesUsage()', () => {
  it('', () => {});
});

describe('partialValidationWarning()', () => {
  it('should warn with correct parameter when called with partial getFontLink()', () => {
    const partialName: PartialNames = 'getFontLink';
    const spy = jest.spyOn(console, 'warn');
    partialValidationWarning(partialName);

    expect(spy).toBeCalledWith(
      "You are not using 'getFontLink()'. The Porsche Design System recommends the usage of the 'getFontLink()'\n" +
        'partial as described at https://designsystem.porsche.com/v2/partials/font-links to enhance performance and loading behavior'
    );
  });

  it('should warn with correct parameter when called with partial getLoaderScript()', () => {
    const partialName: PartialNames = 'getLoaderScript';
    const spy = jest.spyOn(console, 'warn');
    partialValidationWarning(partialName);

    expect(spy).toBeCalledWith(
      "You are not using 'getLoaderScript()'. The Porsche Design System recommends the usage of the 'getLoaderScript()'\n" +
        'partial as described at https://designsystem.porsche.com/v2/partials/loader-script to enhance performance and loading behavior'
    );
  });
});
