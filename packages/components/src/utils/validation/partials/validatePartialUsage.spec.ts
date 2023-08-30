import {
  getWarningRecommendation,
  logPartialValidationWarning,
  validateGetFontFaceStylesheetUsage,
  validateGetComponentChunkLinksUsage,
  validateGetFontLinksUsage,
  validateGetInitialStylesUsage,
  validateGetLoaderScriptUsage,
  validatePartialUsage,
} from './validatePartialUsage';
import type { PartialName } from '@porsche-design-system/shared';
import type { TagNamesForVersions } from './helper';
import * as validatePartialUsageUtils from './validatePartialUsage';
import * as helperUtils from './helper';
import * as getCDNBaseURLUtils from '../../getCDNBaseURL';
import { FONT_FACE_CDN_FILE_CN, FONT_FACE_CDN_FILE_COM } from '@porsche-design-system/styles';

beforeAll(() => {
  const sharedProps = {
    readyResolve: () => {},
    isReady: Promise.resolve,
  };
  document.porscheDesignSystem = {
    cdn: { url: '', prefixes: [] },
    '1.2.3': { ...sharedProps, prefixes: [''] },
    '1.2.4': { ...sharedProps, prefixes: ['prefix'] },
    '1.2.5': { ...sharedProps, prefixes: ['my-prefix'] },
  }; // initialize pds document
});

afterAll(() => {
  delete document.porscheDesignSystem; // reset pds document
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
    'should call validateGetFontFaceStylesheetUsage(), validateGetFontLinksUsage(), validateGetComponentChunkLinksUsage(), validateGetLoaderScriptUsage() and validateGetInitialStylesUsage() for ROLLUP_REPLACE_IS_STAGING: "%s" and process.env.NODE_ENV: "%s"',
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
      const validateGetFontFaceStylesheetUsageSpy = jest.spyOn(
        validatePartialUsageUtils,
        'validateGetFontFaceStylesheetUsage'
      );

      validatePartialUsage();

      expect(validateGetFontFaceStylesheetUsageSpy).toBeCalledWith();
      expect(validateGetFontLinksUsageSpy).toBeCalledWith();
      expect(validateGetInitialStylesUsageSpy).toBeCalledWith();
      // TODO: integration test (real world test) first, before rollout
      expect(validateGetComponentChunkLinksUsagesSpy).not.toBeCalled();
      expect(validateGetLoaderScriptUsageSpy).not.toBeCalledWith();
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
      const validateGetFontFaceStylesheetUsageSpy = jest.spyOn(
        validatePartialUsageUtils,
        'validateGetFontFaceStylesheetUsage'
      );

      validatePartialUsage();

      expect(validateGetFontFaceStylesheetUsageSpy).not.toBeCalled();
      expect(validateGetFontLinksUsageSpy).not.toBeCalled();
      expect(validateGetComponentChunkLinksUsagesSpy).not.toBeCalled();
      expect(validateGetLoaderScriptUsageSpy).not.toBeCalled();
      expect(validateGetInitialStylesUsageSpy).not.toBeCalled();
    }
  );
});

describe('validateGetFontFaceStylesheetUsage()', () => {
  it('should call document.head.querySelector() with correct parameters', () => {
    const spy = jest.spyOn(document.head, 'querySelector');
    validateGetFontFaceStylesheetUsage();

    expect(spy).toBeCalledWith(
      `link[href="https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}"]`
    );

    jest.spyOn(getCDNBaseURLUtils, 'getCDNBaseURL').mockReturnValue('https://cdn.ui.porsche.cn/porsche-design-system');
    validateGetFontFaceStylesheetUsage();

    expect(spy).toBeCalledWith(
      `link[href="https://cdn.ui.porsche.cn/porsche-design-system/styles/${FONT_FACE_CDN_FILE_CN}"]`
    );
  });

  it('should call logPartialValidationWarning() with correct parameters', () => {
    jest.spyOn(document, 'querySelector').mockReturnValue(null);
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetFontFaceStylesheetUsage();

    expect(spy).toBeCalledWith('getFontFaceStylesheet');
  });
});

describe('validateGetFontLinksUsage()', () => {
  it('should call document.querySelector() with correct parameters', () => {
    const spy = jest.spyOn(document.head, 'querySelector');

    validateGetFontLinksUsage();

    expect(spy).toBeCalledWith('link[rel=preload][as=font][href*=porsche-next-w-la-regular]');
  });

  it('should call logPartialValidationWarning() with correct parameters', () => {
    jest.spyOn(document.head, 'querySelector').mockReturnValue(null);
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetFontLinksUsage();

    expect(spy).toBeCalledWith('getFontLinks');
  });

  it('should not call logPartialValidationWarning() if font link is found', () => {
    jest.spyOn(document.head, 'querySelector').mockReturnValue(document.createElement('link'));
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

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

  it('should call consoleWarn() util for each version returned from getUsedTagNamesWithoutPreloadForVersions()', () => {
    jest
      .spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions')
      .mockReturnValue({ '1.2.3': ['p-text'], '1.2.4': ['p-text', 'p-button', 'p-link'] });
    const spy = jest.spyOn(global.console, 'warn');

    validateGetComponentChunkLinksUsage();

    expect(spy).toBeCalledTimes(2);
  });

  it('should call getWarningRecommendation() with correct parameters for each version returned from getUsedTagNamesWithoutPreloadForVersions()', () => {
    jest
      .spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions')
      .mockReturnValue({ '1.2.3': ['p-text'], '1.2.4': ['p-text', 'p-button', 'p-link'] });
    const spy = jest.spyOn(validatePartialUsageUtils, 'getWarningRecommendation');

    validateGetComponentChunkLinksUsage();

    expect(spy).toBeCalledWith('getComponentChunkLinks');
    expect(spy).toBeCalledTimes(2);
  });

  it('should not call consoleWarn() util and should not call getWarningRecommendation() when getUsedTagNamesWithoutPreloadForVersions() returns {}', () => {
    jest.spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions').mockReturnValue({});
    const warnSpy = jest.spyOn(global.console, 'warn');
    const getWarningRecommendationSpy = jest.spyOn(validatePartialUsageUtils, 'getWarningRecommendation');

    validateGetComponentChunkLinksUsage();

    expect(warnSpy).not.toBeCalled();
    expect(getWarningRecommendationSpy).not.toBeCalled();
  });
});

describe('validateGetLoaderScriptUsage()', () => {
  it('should call document.querySelector() with correct parameters', () => {
    const spy = jest.spyOn(document.body, 'querySelector');
    validateGetLoaderScriptUsage();

    expect(spy).toBeCalledWith('script[data-pds-loader-script]');
  });

  it('should call logPartialValidationWarning() with correct parameters', () => {
    jest.spyOn(document.body, 'querySelector').mockReturnValue(null);
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetLoaderScriptUsage();

    expect(spy).toBeCalledWith('getLoaderScript');
  });

  it('should not call logPartialValidationWarning() if loader script is found', () => {
    jest.spyOn(document.body, 'querySelector').mockReturnValue(document.createElement('link'));
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetLoaderScriptUsage();

    expect(spy).not.toBeCalled();
  });
});

describe('validateGetInitialStylesUsage()', () => {
  it('should call document.querySelector() with correct parameters', () => {
    jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions').mockReturnValue({
      '1.2.3': [''],
      '1.2.4': ['prefix'],
      '1.2.5': ['my-prefix'],
    });
    const spy = jest.spyOn(document.head, 'querySelector');

    validateGetInitialStylesUsage();

    expect(spy).toBeCalledWith('style[data-pds-initial-styles]');
    expect(spy).toBeCalledTimes(1);
  });

  it('should call logPartialValidationWarning() with correct parameters when initial style is not found', () => {
    jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions').mockReturnValue({
      '1.2.3': [''],
      '1.2.4': ['prefix'],
      '1.2.5': ['my-prefix'],
    });
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetInitialStylesUsage();

    expect(spy).toBeCalledWith('getInitialStyles');
    expect(spy).toBeCalledTimes(1);
  });

  it('should not call logPartialValidationWarning() when initial style tags are found for each prefix', () => {
    jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions').mockReturnValue({
      '1.2.3': [''],
      '1.2.4': ['prefix'],
      '1.2.5': ['my-prefix'],
    });
    jest.spyOn(document.head, 'querySelector').mockReturnValue(document.createElement('style'));
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetInitialStylesUsage();

    expect(spy).not.toBeCalled();
  });
});

describe('logPartialValidationWarning()', () => {
  it.each<PartialName>([
    'getFontFaceStylesheet',
    'getFontLinks',
    'getLoaderScript',
    'getComponentChunkLinks',
    'getInitialStyles',
  ])(
    'should call consoleWarn() util and getWarningRecommendation() with correct parameters when called with partial name: "%s"',
    (partialName) => {
      const warnSpy = jest.spyOn(global.console, 'warn');
      const getWarningRecommendationSpy = jest.spyOn(validatePartialUsageUtils, 'getWarningRecommendation');

      logPartialValidationWarning(partialName);

      expect(warnSpy).toBeCalledTimes(1);
      expect(getWarningRecommendationSpy).toBeCalledWith(partialName);
    }
  );
});

describe('getWarningRecommendation()', () => {
  it('should return string with correct parameters when called with partial getFontLinks()', () => {
    expect(getWarningRecommendation('getFontLinks')).toEqual(
      'The usage of the getFontLinks() partial is recommended as described at https://designsystem.porsche.com/v3/partials/font-links to enhance loading behavior.'
    );
  });
});
