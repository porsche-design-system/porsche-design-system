import { FONT_FACE_CDN_FILE_CN, FONT_FACE_CDN_FILE_COM } from '@porsche-design-system/assets';
import type { PartialName } from '@porsche-design-system/shared';
import { vi } from 'vitest';
import * as getCDNBaseURLUtils from '../../getCDNBaseURL';
import * as loggerUtils from '../../log/logger';
import type { TagNamesForVersions } from './helper';
import * as helperUtils from './helper';
import * as validatePartialUsageUtils from './validatePartialUsage';
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
  document.porscheDesignSystem = undefined; // reset pds document
});

beforeEach(() => {
  document.head.innerHTML = ''; // reset between tests
  vi.spyOn(global.console, 'warn').mockImplementation(() => null); // to suppress logs
});

describe('validatePartialUsage()', () => {
  const originalEnv = process.env;
  afterEach(() => {
    process.env = originalEnv;
  });

  it('should call validateGetInitialStylesUsage(), validateGetFontFaceStylesUsage() and validateGetFontLinksUsage()', () => {
    const validateGetInitialStylesUsageSpy = vi
      .spyOn(validatePartialUsageUtils, 'validateGetInitialStylesUsage')
      .mockImplementation(() => null); // mocked since it throws an exception
    const validateGetFontFaceStylesUsageSpy = vi.spyOn(
      validatePartialUsageUtils.internalPartial,
      'validateGetFontFaceStylesUsage'
    );
    const validateGetFontLinksUsageSpy = vi.spyOn(
      validatePartialUsageUtils.internalPartial,
      'validateGetFontLinksUsage'
    );
    const validateGetComponentChunkLinksUsagesSpy = vi.spyOn(
      validatePartialUsageUtils,
      'validateGetComponentChunkLinksUsage'
    );
    const validateGetLoaderScriptUsageSpy = vi.spyOn(validatePartialUsageUtils, 'validateGetLoaderScriptUsage');

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
      // @ts-expect-error
      ROLLUP_REPLACE_IS_STAGING = rollupReplaceIsStaging;
      process.env = { ...originalEnv, NODE_ENV: nodeEnv };

      const spy = vi.spyOn(document.head, 'querySelector');
      validateGetFontFaceStylesUsage();

      expect(spy).toHaveBeenCalledWith(
        `link[href="https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}"],style[data-pds-font-face-styles=""]`
      );

      vi.spyOn(getCDNBaseURLUtils, 'getCDNBaseURL').mockReturnValue('https://cdn.ui.porsche.cn/porsche-design-system');
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
      // @ts-expect-error
      ROLLUP_REPLACE_IS_STAGING = rollupReplaceIsStaging;
      process.env = { ...originalEnv, NODE_ENV: nodeEnv };

      const spy = vi.spyOn(document.head, 'querySelector');
      validateGetFontFaceStylesUsage();

      expect(spy).toHaveBeenCalledWith(
        'link[href="http://localhost:3001/styles/font-face.css"],style[data-pds-font-face-styles=""]'
      );
    }
  );

  it('should call document.head.querySelector() with correct parameters', () => {
    const spy = vi.spyOn(document.head, 'querySelector');
    validateGetFontFaceStylesUsage();

    expect(spy).toHaveBeenCalledWith(
      `link[href="https://cdn.ui.porsche.com/porsche-design-system/styles/${FONT_FACE_CDN_FILE_COM}"],style[data-pds-font-face-styles=""]`
    );

    vi.spyOn(getCDNBaseURLUtils, 'getCDNBaseURL').mockReturnValue('https://cdn.ui.porsche.cn/porsche-design-system');
    validateGetFontFaceStylesUsage();

    expect(spy).toHaveBeenCalledWith(
      `link[href="https://cdn.ui.porsche.cn/porsche-design-system/styles/${FONT_FACE_CDN_FILE_CN}"],style[data-pds-font-face-styles=""]`
    );
  });

  it('should call logPartialValidationWarning() with correct parameters', () => {
    vi.spyOn(document, 'querySelector').mockReturnValue(null);
    const spy = vi.spyOn(validatePartialUsageUtils.internalPartial, 'logPartialValidationWarning');

    validateGetFontFaceStylesUsage();

    expect(spy).toHaveBeenCalledWith('getFontFaceStyles');
  });
});

describe('validateGetFontLinksUsage()', () => {
  it('should call document.querySelector() with correct parameters', () => {
    const spy = vi.spyOn(document.head, 'querySelector');

    validateGetFontLinksUsage();

    expect(spy).toHaveBeenCalledWith('link[rel=preload][as=font][href*=porsche-next]');
  });

  it('should call logPartialValidationWarning() with correct parameters', () => {
    vi.spyOn(document.head, 'querySelector').mockReturnValue(null);
    const spy = vi.spyOn(validatePartialUsageUtils.internalPartial, 'logPartialValidationWarning');

    validateGetFontLinksUsage();

    expect(spy).toHaveBeenCalledWith('getFontLinks');
  });

  it('should not call logPartialValidationWarning() if font link is found', () => {
    vi.spyOn(document.head, 'querySelector').mockReturnValue(document.createElement('link'));
    const spy = vi.spyOn(validatePartialUsageUtils, 'logPartialValidationWarning');

    validateGetFontLinksUsage();

    expect(spy).not.toHaveBeenCalled();
  });
});

describe('validateGetComponentChunkLinksUsage()', () => {
  it('should call Object.keys() with correct parameters', () => {
    const spy = vi.spyOn(Object, 'keys');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith(document.porscheDesignSystem);
  });

  it('should call getPorscheDesignSystemPrefixesForVersions() with correct parameters', () => {
    const spy = vi.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith();
  });

  it('should call getPreloadedTagNamesForVersions() with correct parameters', () => {
    const mockReturnValue = ['1.2.3', '1.2.4', '1.2.5'];
    vi.spyOn(Object, 'keys').mockReturnValueOnce(mockReturnValue); // Only Mock the first call which is caused by the function
    const spy = vi.spyOn(helperUtils, 'getPreloadedTagNamesForVersions');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith(mockReturnValue);
  });

  it('should call getUsedTagNamesForVersions() with correct parameters', () => {
    const mockReturnValue: { [key: string]: [string] } = { '1.2.3': [''], '1.2.4': ['prefix'], '1.2.5': ['my-prefix'] };
    vi.spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions').mockReturnValue(mockReturnValue);
    const spy = vi.spyOn(helperUtils, 'getUsedTagNamesForVersions');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith(mockReturnValue);
  });

  it('should call getUsedTagNamesWithoutPreloadForVersions() with correct parameters', () => {
    const preloadTagNamesForVersionsMock: TagNamesForVersions = { '1.2.3': ['p-text'] };
    vi.spyOn(helperUtils, 'getPreloadedTagNamesForVersions').mockReturnValue(preloadTagNamesForVersionsMock);

    const usedTagNamesForVersionsMock: TagNamesForVersions = { '1.2.3': ['p-button'] };
    vi.spyOn(helperUtils, 'getUsedTagNamesForVersions').mockReturnValue(usedTagNamesForVersionsMock);

    const spy = vi.spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions');
    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith(usedTagNamesForVersionsMock, preloadTagNamesForVersionsMock);
  });

  it('should call consoleWarn() util for each version returned from getUsedTagNamesWithoutPreloadForVersions()', () => {
    vi.spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions').mockReturnValue({
      '1.2.3': ['p-text'],
      '1.2.4': ['p-text', 'p-button', 'p-link'],
    });
    const spy = vi.spyOn(global.console, 'warn');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should call getValidatePartialErrorSecondaryText() with correct parameters for each version returned from getUsedTagNamesWithoutPreloadForVersions()', () => {
    vi.spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions').mockReturnValue({
      '1.2.3': ['p-text'],
      '1.2.4': ['p-text', 'p-button', 'p-link'],
    });
    const spy = vi.spyOn(validatePartialUsageUtils.internalPartial, 'getValidatePartialErrorSecondaryText');

    validateGetComponentChunkLinksUsage();

    expect(spy).toHaveBeenCalledWith('getComponentChunkLinks');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should not call consoleWarn() util and should not call getValidatePartialErrorSecondaryText() when getUsedTagNamesWithoutPreloadForVersions() returns {}', () => {
    vi.spyOn(helperUtils, 'getUsedTagNamesWithoutPreloadForVersions').mockReturnValue({});
    const warnSpy = vi.spyOn(global.console, 'warn');
    const getValidatePartialErrorSecondaryTextSpy = vi.spyOn(
      validatePartialUsageUtils.internalPartial,
      'getValidatePartialErrorSecondaryText'
    );

    validateGetComponentChunkLinksUsage();

    expect(warnSpy).not.toHaveBeenCalled();
    expect(getValidatePartialErrorSecondaryTextSpy).not.toHaveBeenCalled();
  });
});

describe('validateGetLoaderScriptUsage()', () => {
  it('should call document.querySelector() with correct parameters', () => {
    const spy = vi.spyOn(document.body, 'querySelector');
    validateGetLoaderScriptUsage();

    expect(spy).toHaveBeenCalledWith('script[data-pds-loader-script]');
  });

  it('should call logPartialValidationWarning() with correct parameters', () => {
    vi.spyOn(document.body, 'querySelector').mockReturnValue(null);
    const spy = vi.spyOn(validatePartialUsageUtils.internalPartial, 'logPartialValidationWarning');

    validateGetLoaderScriptUsage();

    expect(spy).toHaveBeenCalledWith('getLoaderScript');
  });

  it('should not call logPartialValidationWarning() if loader script is found', () => {
    vi.spyOn(document.body, 'querySelector').mockReturnValue(document.createElement('link'));
    const spy = vi.spyOn(validatePartialUsageUtils.internalPartial, 'logPartialValidationWarning');

    validateGetLoaderScriptUsage();

    expect(spy).not.toHaveBeenCalled();
  });
});

describe('validateGetInitialStylesUsage()', () => {
  it('should call document.head.querySelector() with correct parameters', () => {
    const spy = vi.spyOn(document.head, 'querySelector');
    vi.spyOn(validatePartialUsageUtils.internalPartial, 'throwPartialValidationError').mockImplementation(() => null); // mocked since it throws an exception

    validateGetInitialStylesUsage();

    expect(spy).toHaveBeenCalledWith('style[data-pds-initial-styles]');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call throwPartialValidationError() with correct parameters when initial style is not found', () => {
    const spy = vi
      .spyOn(validatePartialUsageUtils.internalPartial, 'throwPartialValidationError')
      .mockImplementation(() => null); // mocked since it throws an exception

    validateGetInitialStylesUsage();

    expect(spy).toHaveBeenCalledWith('getInitialStyles');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not call throwPartialValidationError() when initial style tags are found for each prefix', () => {
    vi.spyOn(document.head, 'querySelector').mockReturnValue(document.createElement('style'));
    const spy = vi.spyOn(validatePartialUsageUtils.internalPartial, 'throwPartialValidationError');

    validateGetInitialStylesUsage();

    expect(spy).not.toHaveBeenCalled();
  });
});

describe('throwPartialValidationError()', () => {
  it('should call throwException() with result of getValidatePartialErrorPrimaryText() and getValidatePartialErrorSecondaryText() when called with "getInitialStyles"', () => {});

  const throwExceptionSpy = vi.spyOn(loggerUtils, 'throwException').mockImplementation(() => null);
  const getValidatePartialErrorPrimaryTextSpy = vi
    .spyOn(validatePartialUsageUtils.internalPartial, 'getValidatePartialErrorPrimaryText')
    .mockReturnValue('main');
  const getValidatePartialErrorSecondaryTextSpy = vi
    .spyOn(validatePartialUsageUtils.internalPartial, 'getValidatePartialErrorSecondaryText')
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
      const consoleWarnSpy = vi.spyOn(loggerUtils, 'consoleWarn');
      const getValidatePartialErrorPrimaryTextSpy = vi
        .spyOn(validatePartialUsageUtils.internalPartial, 'getValidatePartialErrorPrimaryText')
        .mockReturnValue('main');
      const getValidatePartialErrorSecondaryTextSpy = vi
        .spyOn(validatePartialUsageUtils.internalPartial, 'getValidatePartialErrorSecondaryText')
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
