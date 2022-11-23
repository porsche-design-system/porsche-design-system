import {
  partialValidationWarning,
  validateGetComponentChunkLinksUsage,
  validateGetFontLinksUsage,
  validateGetInitialStylesUsage,
  validateGetLoaderScriptUsage,
  validatePartialUsage,
} from './validatePartialUsage';
import type { PartialName } from './validatePartialUsage';
import type { TagNamesForVersions } from './helper';
import * as validatePartialUsageUtils from './validatePartialUsage';
import * as helperUtils from './helper';

beforeAll(() => {
  document.porscheDesignSystem = {
    '1.2.3': { prefixes: [''] },
    '1.2.4': { prefixes: ['prefix'] },
    '1.2.5': { prefixes: ['my-prefix'] },
  }; // initialize pds document
});

afterAll(() => {
  document.porscheDesignSystem = undefined; // reset pds document
});

beforeEach(() => {
  document.head.innerHTML = ''; // reset between tests
  jest.spyOn(global.console, 'warn').mockImplementation(); // to suppress logs
});

describe('validatePartialUsage()', () => {
  const originalEnv = process.env;
  afterEach(() => {
    process.env = originalEnv;
    document.clear();
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

      expect(validateGetFontLinksUsageSpy).not.toBeCalled();
      expect(validateGetComponentChunkLinksUsagesSpy).not.toBeCalled();
      expect(validateGetLoaderScriptUsageSpy).not.toBeCalled();
      expect(validateGetInitialStylesUsageSpy).not.toBeCalled();
    }
  );
});

describe('validateGetFontLinksUsage()', () => {
  it('should call document.querySelector() with correct parameters', () => {
    const spy = jest.spyOn(document, 'querySelector');

    validateGetFontLinksUsage();

    expect(spy).toBeCalledWith('link[rel=preload][as=font][href*=porsche-next-w-la-regular]');
  });

  it('should call partialValidationWarning() with correct parameters', () => {
    jest.spyOn(document, 'querySelector').mockReturnValue(null);
    const spy = jest.spyOn(validatePartialUsageUtils, 'partialValidationWarning');

    validateGetFontLinksUsage();

    expect(spy).toBeCalledWith('getFontLink');
  });

  it('should not call partialValidationWarning() if font link is found', () => {
    jest.spyOn(document, 'querySelector').mockReturnValue(document.createElement('link'));
    const spy = jest.spyOn(validatePartialUsageUtils, 'partialValidationWarning');

    validateGetFontLinksUsage();

    expect(spy).not.toBeCalled();
  });
});

describe('validateGetComponentChunkLinksUsage()', () => {
  it('should call Object.keys() with correct parameters', () => {
    const spy = jest.spyOn(Object, 'keys');

    validateGetComponentChunkLinksUsage();

    expect(spy).toBeCalledWith(document.porscheDesignSystem);
  });

  it('should call getPorscheDesignSystemPrefixesForVersions() with correct parameters', () => {
    const spy = jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions');

    validateGetComponentChunkLinksUsage();

    expect(spy).toBeCalledWith();
  });

  it('should call getPreloadedTagNamesForVersions() with correct parameters', () => {
    const mockReturnValue = ['1.2.3', '1.2.4', '1.2.5'];
    jest.spyOn(Object, 'keys').mockReturnValueOnce(mockReturnValue); // Only Mock the first call which is caused by the function
    const spy = jest.spyOn(helperUtils, 'getPreloadedTagNamesForVersions');

    validateGetComponentChunkLinksUsage();

    expect(spy).toBeCalledWith(mockReturnValue);
  });

  it('should call getUsedTagNamesForVersions() with correct parameters', () => {
    const mockReturnValue: { [key: string]: [string] } = { '1.2.3': [''], '1.2.4': ['prefix'], '1.2.5': ['my-prefix'] };
    jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions').mockReturnValue(mockReturnValue);
    const spy = jest.spyOn(helperUtils, 'getUsedTagNamesForVersions');

    validateGetComponentChunkLinksUsage();

    expect(spy).toBeCalledWith(mockReturnValue);
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

  it('should not call console.warn when getUsedTagNamesWithoutPreloadForVersions() returns {}', () => {
    jest.spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions').mockReturnValue({});
    const spy = jest.spyOn(global.console, 'warn');

    validateGetComponentChunkLinksUsage();

    expect(spy).not.toBeCalled();
  });

  it('should call console.warn for each version returned from getUsedTagNamesWithoutPreloadForVersions()', () => {
    jest
      .spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions')
      .mockReturnValue({ '1.2.3': ['p-text'], '1.2.4': ['p-text', 'p-button', 'p-link'] });
    const spy = jest.spyOn(global.console, 'warn');

    validateGetComponentChunkLinksUsage();

    // TODO: do we really want to check the whole warning message?
    expect(spy).toBeCalledWith(
      "Usage of Porsche Design System v1.2.3 component 'p-text' detected, without preloading. We recommend the usage of the\n" +
        "'getComponentChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/component-chunk-links to enhance performance and loading behavior."
    );
    expect(spy).toBeCalledWith(
      "Usage of Porsche Design System v1.2.4 component 'p-text, p-button, p-link' detected, without preloading. We recommend the usage of the\n" +
        "'getComponentChunkLinks()' partial as described at https://designsystem.porsche.com/v2/partials/component-chunk-links to enhance performance and loading behavior."
    );
  });
});

describe('validateGetLoaderScriptUsage()', () => {
  it('should call document.querySelector() with correct parameters', () => {
    const spy = jest.spyOn(document, 'querySelector');
    validateGetLoaderScriptUsage();

    expect(spy).toBeCalledWith('script[data-pds-loader-script]');
  });

  it('should call partialValidationWarning() with correct parameters', () => {
    jest.spyOn(document, 'querySelector').mockReturnValue(null);
    const spy = jest.spyOn(validatePartialUsageUtils, 'partialValidationWarning');

    validateGetLoaderScriptUsage();

    expect(spy).toBeCalledWith('getLoaderScript');
  });

  it('should not call partialValidationWarning() if loader script is found', () => {
    jest.spyOn(document, 'querySelector').mockReturnValue(document.createElement('link'));
    const spy = jest.spyOn(validatePartialUsageUtils, 'partialValidationWarning');

    validateGetLoaderScriptUsage();

    expect(spy).not.toBeCalled();
  });
});

describe('validateGetInitialStylesUsage()', () => {
  it('should call getPorscheDesignSystemPrefixesForVersions() with correct parameters', () => {
    const spy = jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions');

    validateGetInitialStylesUsage();

    expect(spy).toBeCalledWith();
  });

  it('should should call console.warn thrice when initial style is not found', () => {
    jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions').mockReturnValue({
      '1.2.3': [''],
      '1.2.4': ['prefix'],
      '1.2.5': ['my-prefix'],
    });
    const spy = jest.spyOn(global.console, 'warn');

    validateGetInitialStylesUsage();

    expect(spy).toBeCalledTimes(3);
  });

  it('should call document.querySelector() thrice with correct parameters', () => {
    jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions').mockReturnValue({
      '1.2.3': [''],
      '1.2.4': ['prefix'],
      '1.2.5': ['my-prefix'],
    });
    const spy = jest.spyOn(document, 'querySelector');

    validateGetInitialStylesUsage();

    expect(spy).toBeCalledWith('style[data-pds-initial-styles]');
    expect(spy).toBeCalledWith('style[data-pds-initial-styles-prefix]');
    expect(spy).toBeCalledWith('style[data-pds-initial-styles-my-prefix]');
    expect(spy).toBeCalledTimes(3);
  });

  it('should not call console.warn when initial style tags are found for each prefix', () => {
    jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions').mockReturnValue({
      '1.2.3': [''],
      '1.2.4': ['prefix'],
      '1.2.5': ['my-prefix'],
    });
    jest.spyOn(document, 'querySelector').mockReturnValue(document.createElement('style'));
    const spy = jest.spyOn(global.console, 'warn');

    validateGetInitialStylesUsage();

    expect(spy).not.toBeCalled();
  });
});

describe('partialValidationWarning()', () => {
  it.each<PartialName>(['getFontLink', 'getLoaderScript'])(
    'should call console.warn with correct parameters when called with partial %s()',
    (partialName) => {
      const spy = jest.spyOn(global.console, 'warn');

      partialValidationWarning(partialName);

      expect(spy).toBeCalledTimes(1);
    }
  );
});
