import {
  getValidatePartialErrorPrimaryText,
  getValidatePartialErrorSecondaryText,
  logPartialValidationWarning,
  throwPartialValidationError,
  validateGetComponentChunkLinksUsage,
  validateGetFontFaceStylesheetUsage,
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
  });

  it('should call validateGetInitialStylesUsage(), validateGetFontFaceStylesheetUsage() and validateGetFontLinksUsage()"', () => {
      const validateGetInitialStylesUsageSpy = jest
        .spyOn(validatePartialUsageUtils, 'validateGetInitialStylesUsage')
        .mockImplementation(); // mocked since it throws an exception
      const validateGetFontFaceStylesheetUsageSpy = jest.spyOn(
        validatePartialUsageUtils,
        'validateGetFontFaceStylesheetUsage'
      );
      const validateGetFontLinksUsageSpy = jest.spyOn(validatePartialUsageUtils, 'validateGetFontLinksUsage');
      const validateGetComponentChunkLinksUsagesSpy = jest.spyOn(
        validatePartialUsageUtils,
        'validateGetComponentChunkLinksUsage'
      );
      const validateGetLoaderScriptUsageSpy = jest.spyOn(validatePartialUsageUtils, 'validateGetLoaderScriptUsage');

      validatePartialUsage();

      expect(validateGetInitialStylesUsageSpy).toBeCalledWith();
      expect(validateGetFontFaceStylesheetUsageSpy).toBeCalledWith();
      expect(validateGetFontLinksUsageSpy).toBeCalledWith();
      // TODO: integration test (real world test) first, before rollout
      expect(validateGetComponentChunkLinksUsagesSpy).not.toBeCalled();
      expect(validateGetLoaderScriptUsageSpy).not.toBeCalledWith();
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

  it('should call getValidatePartialErrorSecondaryText() with correct parameters for each version returned from getUsedTagNamesWithoutPreloadForVersions()', () => {
    jest
      .spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions')
      .mockReturnValue({ '1.2.3': ['p-text'], '1.2.4': ['p-text', 'p-button', 'p-link'] });
    const spy = jest.spyOn(validatePartialUsageUtils, 'getValidatePartialErrorSecondaryText');

    validateGetComponentChunkLinksUsage();

    expect(spy).toBeCalledWith('getComponentChunkLinks');
    expect(spy).toBeCalledTimes(2);
  });

  it('should not call consoleWarn() util and should not call getValidatePartialErrorSecondaryText() when getUsedTagNamesWithoutPreloadForVersions() returns {}', () => {
    jest.spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions').mockReturnValue({});
    const warnSpy = jest.spyOn(global.console, 'warn');
    const getValidatePartialErrorSecondaryTextSpy = jest.spyOn(
      validatePartialUsageUtils,
      'getValidatePartialErrorSecondaryText'
    );

    validateGetComponentChunkLinksUsage();

    expect(warnSpy).not.toBeCalled();
    expect(getValidatePartialErrorSecondaryTextSpy).not.toBeCalled();
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
  it('should call document.head.querySelector() with correct parameters', () => {
    const spy = jest.spyOn(document.head, 'querySelector');
    jest.spyOn(validatePartialUsageUtils, 'throwPartialValidationError').mockImplementation(); // mocked since it throws an exception

    validateGetInitialStylesUsage();

    expect(spy).toBeCalledWith('style[data-pds-initial-styles]');
    expect(spy).toBeCalledTimes(1);
  });

  it('should call throwPartialValidationError() with correct parameters when initial style is not found', () => {
    const spy = jest.spyOn(validatePartialUsageUtils, 'throwPartialValidationError').mockImplementation(); // mocked since it throws an exception

    validateGetInitialStylesUsage();

    expect(spy).toBeCalledWith('getInitialStyles');
    expect(spy).toBeCalledTimes(1);
  });

  it('should not call throwPartialValidationError() when initial style tags are found for each prefix', () => {
    jest.spyOn(document.head, 'querySelector').mockReturnValue(document.createElement('style'));
    const spy = jest.spyOn(validatePartialUsageUtils, 'throwPartialValidationError');

    validateGetInitialStylesUsage();

    expect(spy).not.toBeCalled();
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

  expect(getValidatePartialErrorPrimaryTextSpy).toBeCalledWith('getInitialStyles', 'my-prefix');
  expect(getValidatePartialErrorSecondaryTextSpy).toBeCalledWith('getInitialStyles', true);
  expect(throwExceptionSpy).toBeCalledWith('main additional');
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

      expect(getValidatePartialErrorPrimaryTextSpy).toBeCalledWith(partialName, undefined);
      expect(getValidatePartialErrorSecondaryTextSpy).toBeCalledWith(partialName);
      expect(consoleWarnSpy).toBeCalledWith('main', 'additional');
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
