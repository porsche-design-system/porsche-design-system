import {
  getValidatePartialErrorPrimaryText,
  getValidatePartialErrorSecondaryText,
  logPartialValidationWarning,
  throwPartialValidationError,
  validateGetComponentChunkLinksUsage,
  validateGetFontFaceStylesUsage,
  validateGetFontLinksUsage,
  validateGetInitialStylesUsage,
  validateGetLoaderScriptUsage,
  validatePartialUsage,
} from './validatePartialUsage';
import type { PartialName } from '@porsche-design-system/shared';
import type { TagNamesForVersions } from './helper';
import * as loggerUtils from '../../log/logger';
import * as validatePartialUsageUtils from './validatePartialUsage';
import * as helperUtils from './helper';
import * as getCDNBaseURLUtils from '../../getCDNBaseURL';
import { FONT_FACE_CDN_FILE_CN, FONT_FACE_CDN_FILE_COM } from '@porsche-design-system/assets';

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
  });

  it('should call validateGetInitialStylesUsage(), validateGetFontFaceStylesUsage() and validateGetFontLinksUsage()', () => {
    const validateGetInitialStylesUsageSpy = jest
      .spyOn(validatePartialUsageUtils, 'validateGetInitialStylesUsage')
      .mockImplementation(); // mocked since it throws an exception
    const validateGetFontFaceStylesUsageSpy = jest.spyOn(validatePartialUsageUtils, 'validateGetFontFaceStylesUsage');
    const validateGetFontLinksUsageSpy = jest.spyOn(validatePartialUsageUtils, 'validateGetFontLinksUsage');
    const validateGetComponentChunkLinksUsagesSpy = jest.spyOn(
      validatePartialUsageUtils,
      'validateGetComponentChunkLinksUsage'
    );
    const validateGetLoaderScriptUsageSpy = jest.spyOn(validatePartialUsageUtils, 'validateGetLoaderScriptUsage');

    validatePartialUsage();

    // TODO: before reactivating we need to be able to distinguish between Light DOM and/or Shadow DOM usage.
    expect(validateGetInitialStylesUsageSpy).not.toHaveBeenCalledWith();
    expect(validateGetFontFaceStylesUsageSpy).toHaveBeenCalledWith();
    expect(validateGetFontLinksUsageSpy).toHaveBeenCalledWith();
    // TODO: integration test (real world test) first, before rollout
    expect(validateGetComponentChunkLinksUsagesSpy).not.toHaveBeenCalled();
    expect(validateGetLoaderScriptUsageSpy).not.toHaveBeenCalledWith();
  });
});

describe('validateGetFontFaceStylesUsage()', () => {
  const originalEnv = process.env;
  afterEach(() => {
    process.env = originalEnv;
  });

  it.each<[string, string]>([
    ['production', 'test'],
    ['production', 'production'],
  ])(
    'should call document.head.querySelector() with correct parameters for ROLLUP_REPLACE_IS_STAGING: "%s" and process.env.NODE_ENV: "%s"',
    (rollupReplaceIsStaging, nodeEnv) => {
      // @ts-ignore
      ROLLUP_REPLACE_IS_STAGING = rollupReplaceIsStaging;
      process.env = { ...originalEnv, NODE_ENV: nodeEnv };

      const spy = jest.spyOn(document.head, 'querySelector');
      validateGetFontFaceStylesUsage();

      expect(spy).toHaveBeenCalledWith(
        `link[href="https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}"],style[data-pds-font-face-styles=""]`
      );

      jest
        .spyOn(getCDNBaseURLUtils, 'getCDNBaseURL')
        .mockReturnValue('https://cdn.ui.porsche.cn/porsche-design-system');
      validateGetFontFaceStylesUsage();

      expect(spy).toHaveBeenCalledWith(
        `link[href="https://cdn.ui.porsche.cn/porsche-design-system/styles/${FONT_FACE_CDN_FILE_CN}"],style[data-pds-font-face-styles=""]`
      );
    }
  );

  it.each<[string, string]>([
    ['staging', 'test'],
    ['staging', 'development'],
    ['staging', 'production'],
    ['production', 'development'],
  ])(
    'should call document.head.querySelector() with correct parameters for ROLLUP_REPLACE_IS_STAGING: "%s" and process.env.NODE_ENV: "%s"',
    (rollupReplaceIsStaging, nodeEnv) => {
      // @ts-ignore
      ROLLUP_REPLACE_IS_STAGING = rollupReplaceIsStaging;
      process.env = { ...originalEnv, NODE_ENV: nodeEnv };

      const spy = jest.spyOn(document.head, 'querySelector');
      validateGetFontFaceStylesUsage();

      expect(spy).toHaveBeenCalledWith(
        'link[href="http://localhost:3001/styles/font-face.min.css"],style[data-pds-font-face-styles=""]'
      );
    }
  );

  it('should call document.head.querySelector() with correct parameters', () => {
    const spy = jest.spyOn(document.head, 'querySelector');
    validateGetFontFaceStylesUsage();

    expect(spy).toHaveBeenCalledWith(
      `link[href="https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}"],style[data-pds-font-face-styles=""]`
    );

    jest.spyOn(getCDNBaseURLUtils, 'getCDNBaseURL').mockReturnValue('https://cdn.ui.porsche.cn/porsche-design-system');
    validateGetFontFaceStylesUsage();

    expect(spy).toHaveBeenCalledWith(
      `link[href="https://cdn.ui.porsche.cn/porsche-design-system/styles/${FONT_FACE_CDN_FILE_CN}"],style[data-pds-font-face-styles=""]`
    );
  });

  it('should call logPartialValidationWarning() with correct parameters', () => {
    jest.spyOn(document, 'querySelector').mockReturnValue(null);
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetFontFaceStylesUsage();

    expect(spy).toHaveBeenCalledWith('getFontFaceStyles');
  });
});

describe('validateGetFontLinksUsage()', () => {
  it('should call document.querySelector() with correct parameters', () => {
    const spy = jest.spyOn(document.head, 'querySelector');

    validateGetFontLinksUsage();

    expect(spy).toHaveBeenCalledWith('link[rel=preload][as=font][href*=porsche-next-w-la-regular]');
  });

  it('should call logPartialValidationWarning() with correct parameters', () => {
    jest.spyOn(document.head, 'querySelector').mockReturnValue(null);
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetFontLinksUsage();

    expect(spy).toHaveBeenCalledWith('getFontLinks');
  });

  it('should not call logPartialValidationWarning() if font link is found', () => {
    jest.spyOn(document.head, 'querySelector').mockReturnValue(document.createElement('link'));
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetFontLinksUsage();

    expect(spy).not.toHaveBeenCalled();
  });
});

describe('validateGetComponentChunkLinksUsage()', () => {
  it('should call Object.keys() with correct parameters', () => {
    const spy = jest.spyOn(Object, 'keys');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith(document.porscheDesignSystem);
  });

  it('should call getPorscheDesignSystemPrefixesForVersions() with correct parameters', () => {
    const spy = jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith();
  });

  it('should call getPreloadedTagNamesForVersions() with correct parameters', () => {
    const mockReturnValue = ['1.2.3', '1.2.4', '1.2.5'];
    jest.spyOn(Object, 'keys').mockReturnValueOnce(mockReturnValue); // Only Mock the first call which is caused by the function
    const spy = jest.spyOn(helperUtils, 'getPreloadedTagNamesForVersions');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith(mockReturnValue);
  });

  it('should call getUsedTagNamesForVersions() with correct parameters', () => {
    const mockReturnValue: { [key: string]: [string] } = { '1.2.3': [''], '1.2.4': ['prefix'], '1.2.5': ['my-prefix'] };
    jest.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions').mockReturnValue(mockReturnValue);
    const spy = jest.spyOn(helperUtils, 'getUsedTagNamesForVersions');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith(mockReturnValue);
  });

  it('should call getUsedTagNamesWithoutPreloadForVersions() with correct parameters', () => {
    const preloadTagNamesForVersionsMock: TagNamesForVersions = { '1.2.3': ['p-text'] };
    jest.spyOn(helperUtils, 'getPreloadedTagNamesForVersions').mockReturnValue(preloadTagNamesForVersionsMock);

    const usedTagNamesForVersionsMock: TagNamesForVersions = { '1.2.3': ['p-button'] };
    jest.spyOn(helperUtils, 'getUsedTagNamesForVersions').mockReturnValue(usedTagNamesForVersionsMock);

    const spy = jest.spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions');
    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith(usedTagNamesForVersionsMock, preloadTagNamesForVersionsMock);
  });

  it('should call consoleWarn() util for each version returned from getUsedTagNamesWithoutPreloadForVersions()', () => {
    jest
      .spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions')
      .mockReturnValue({ '1.2.3': ['p-text'], '1.2.4': ['p-text', 'p-button', 'p-link'] });
    const spy = jest.spyOn(global.console, 'warn');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should call getValidatePartialErrorSecondaryText() with correct parameters for each version returned from getUsedTagNamesWithoutPreloadForVersions()', () => {
    jest
      .spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions')
      .mockReturnValue({ '1.2.3': ['p-text'], '1.2.4': ['p-text', 'p-button', 'p-link'] });
    const spy = jest.spyOn(validatePartialUsageUtils, 'getValidatePartialErrorSecondaryText');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith('getComponentChunkLinks');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should not call consoleWarn() util and should not call getValidatePartialErrorSecondaryText() when getUsedTagNamesWithoutPreloadForVersions() returns {}', () => {
    jest.spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions').mockReturnValue({});
    const warnSpy = jest.spyOn(global.console, 'warn');
    const getValidatePartialErrorSecondaryTextSpy = jest.spyOn(
      validatePartialUsageUtils,
      'getValidatePartialErrorSecondaryText'
    );

    validateGetComponentChunkLinksUsage();

    expect(warnSpy).not.toHaveBeenCalled();
    expect(getValidatePartialErrorSecondaryTextSpy).not.toHaveBeenCalled();
  });
});

describe('validateGetLoaderScriptUsage()', () => {
  it('should call document.querySelector() with correct parameters', () => {
    const spy = jest.spyOn(document.body, 'querySelector');
    validateGetLoaderScriptUsage();

    expect(spy).toHaveBeenCalledWith('script[data-pds-loader-script]');
  });

  it('should call logPartialValidationWarning() with correct parameters', () => {
    jest.spyOn(document.body, 'querySelector').mockReturnValue(null);
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetLoaderScriptUsage();

    expect(spy).toHaveBeenCalledWith('getLoaderScript');
  });

  it('should not call logPartialValidationWarning() if loader script is found', () => {
    jest.spyOn(document.body, 'querySelector').mockReturnValue(document.createElement('link'));
    const spy = jest.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetLoaderScriptUsage();

    expect(spy).not.toHaveBeenCalled();
  });
});

describe('validateGetInitialStylesUsage()', () => {
  it('should call document.head.querySelector() with correct parameters', () => {
    const spy = jest.spyOn(document.head, 'querySelector');
    jest.spyOn(validatePartialUsageUtils, 'throwPartialValidationError').mockImplementation(); // mocked since it throws an exception

    validateGetInitialStylesUsage();

    expect(spy).toHaveBeenCalledWith('style[data-pds-initial-styles]');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call throwPartialValidationError() with correct parameters when initial style is not found', () => {
    const spy = jest.spyOn(validatePartialUsageUtils, 'throwPartialValidationError').mockImplementation(); // mocked since it throws an exception

    validateGetInitialStylesUsage();

    expect(spy).toHaveBeenCalledWith('getInitialStyles');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not call throwPartialValidationError() when initial style tags are found for each prefix', () => {
    jest.spyOn(document.head, 'querySelector').mockReturnValue(document.createElement('style'));
    const spy = jest.spyOn(validatePartialUsageUtils, 'throwPartialValidationError');

    validateGetInitialStylesUsage();

    expect(spy).not.toHaveBeenCalled();
  });
});

describe('throwPartialValidationError()', () => {
  it('should call throwException() with result of getValidatePartialErrorPrimaryText() and getValidatePartialErrorSecondaryText() when called with "getInitialStyles"', () => {});

  const throwExceptionSpy = jest.spyOn(loggerUtils, 'throwException').mockImplementation();
  const getValidatePartialErrorPrimaryTextSpy = jest
    .spyOn(validatePartialUsageUtils, 'getValidatePartialErrorPrimaryText')
    .mockReturnValue('main');
  const getValidatePartialErrorSecondaryTextSpy = jest
    .spyOn(validatePartialUsageUtils, 'getValidatePartialErrorSecondaryText')
    .mockReturnValue('additional');

  throwPartialValidationError('getInitialStyles', 'my-prefix');

  expect(getValidatePartialErrorPrimaryTextSpy).toHaveBeenCalledWith('getInitialStyles', 'my-prefix');
  expect(getValidatePartialErrorSecondaryTextSpy).toHaveBeenCalledWith('getInitialStyles', true);
  expect(throwExceptionSpy).toHaveBeenCalledWith('main additional');
});

describe('logPartialValidationWarning()', () => {
  it.each<PartialName>([
    'getFontFaceStylesheet',
    'getFontLinks',
    'getLoaderScript',
    'getComponentChunkLinks',
    'getInitialStyles',
  ])(
    'should call consoleWarn() with result of getValidatePartialErrorPrimaryText() and getValidatePartialErrorSecondaryText() when called with "%s"',
    (partialName) => {
      const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');
      const getValidatePartialErrorPrimaryTextSpy = jest
        .spyOn(validatePartialUsageUtils, 'getValidatePartialErrorPrimaryText')
        .mockReturnValue('main');
      const getValidatePartialErrorSecondaryTextSpy = jest
        .spyOn(validatePartialUsageUtils, 'getValidatePartialErrorSecondaryText')
        .mockReturnValue('additional');

      logPartialValidationWarning(partialName);

      expect(getValidatePartialErrorPrimaryTextSpy).toHaveBeenCalledWith(partialName, undefined);
      expect(getValidatePartialErrorSecondaryTextSpy).toHaveBeenCalledWith(partialName);
      expect(consoleWarnSpy).toHaveBeenCalledWith('main', 'additional');
    }
  );
});

describe('getValidatePartialErrorPrimaryText()', () => {
  it('should return correct string when called with "getFontLinks"', () => {
    expect(getValidatePartialErrorPrimaryText('getFontLinks')).toEqual(
      'The Porsche Design System is used without using the getFontLinks() partial.'
    );
  });

  it('should return correct string when called with "getFontLinks" and "my-prefix"', () => {
    expect(getValidatePartialErrorPrimaryText('getFontLinks', 'my-prefix')).toEqual(
      "The Porsche Design System with prefix: 'my-prefix' is used without using the getFontLinks() partial."
    );
  });
});

describe('getValidatePartialErrorSecondaryText()', () => {
  it('should return correct string when called with "getFontLinks"', () => {
    expect(getValidatePartialErrorSecondaryText('getFontLinks')).toEqual(
      'The usage of the getFontLinks() partial is recommended as described at https://designsystem.porsche.com/v3/partials/font-links to enhance loading behavior.'
    );
  });

  it('should return correct string when called with "getFontLinks" and required=true', () => {
    expect(getValidatePartialErrorSecondaryText('getFontLinks', true)).toEqual(
      'The usage of the getFontLinks() partial is required as described at https://designsystem.porsche.com/v3/partials/font-links to enhance loading behavior.'
    );
  });
});
