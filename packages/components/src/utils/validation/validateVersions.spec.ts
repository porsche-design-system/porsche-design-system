import { sortVersions, validateVersions, Version } from './validateVersions';
import * as validateVersionsUtils from './validateVersions';
import * as loggerUtils from '../log/logger';
import * as helperUtils from './partials/helper';

declare global {
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

describe('validateVersions()', () => {
  it('should warn about multiple used versions', () => {
    const versions = {
      '1.2.3': [''],
      '1.2.4': ['prefix, another-prefix'],
      '1.2.5': ['prefix, another-prefix'],
    };

    const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');
    const sortVersionsSpy = jest.spyOn(validateVersionsUtils, 'sortVersions');
    const getPorscheDesignSystemPrefixesForVersionsSpy = jest
      .spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions')
      .mockReturnValue(versions);

    validateVersions();

    expect(getPorscheDesignSystemPrefixesForVersionsSpy).toHaveBeenCalled();
    expect(sortVersionsSpy).toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `Multiple different versions are used with following prefixes:\n`,
      versions,
      '\nPlease upgrade all instances to the latest used version: 1.2.5'
    );
  });

  it('should warn about multiple used versions in correct oder and suggest correct version to upgrade', () => {
    const versions = {
      '3.9.0': ['prefix'],
      '1.2.5': ['prefix, another-prefix'],
      '1.2.3': [''],
      '1.2.4': ['prefix, another-prefix'],
      '2.5.1': ['prefix'],
    };

    const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');
    const sortVersionsSpy = jest.spyOn(validateVersionsUtils, 'sortVersions');
    const getPorscheDesignSystemPrefixesForVersionsSpy = jest
      .spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions')
      .mockReturnValue(versions);

    validateVersions();

    expect(getPorscheDesignSystemPrefixesForVersionsSpy).toHaveBeenCalled();
    expect(sortVersionsSpy).toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `Multiple different versions are used with following prefixes:\n`,
      versions,
      '\nPlease upgrade all instances to the latest used version: 3.9.0'
    );
  });

  it('should not warn about multiple used versions when only one version is used', () => {
    const versions = {
      '1.2.3': [''],
    };

    const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');
    const getPorscheDesignSystemPrefixesForVersionsSpy = jest
      .spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions')
      .mockReturnValue(versions);

    validateVersions();

    expect(getPorscheDesignSystemPrefixesForVersionsSpy).toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});

describe('sortVersions()', () => {
  it.each([
    ['2.0.0', '1.0.0', 1],
    ['1.1.0', '1.0.0', 1],
    ['1.0.1', '1.0.0', 1],
    ['2.1.2', '2.1.1', 1],
  ])('(%s) > (%s) = %d', (versionA: Version, versionB: Version, expected: number) => {
    expect(sortVersions(versionA, versionB)).toBe(expected);
  });

  it.each([
    ['1.0.0', '2.0.0', -1],
    ['1.0.0', '1.1.0', -1],
    ['1.0.0', '1.0.1', -1],
    ['2.1.1', '2.1.2', -1],
  ])('(%s) < (%s) = %d', (versionA: Version, versionB: Version, expected: number) => {
    expect(sortVersions(versionA, versionB)).toBe(expected);
  });

  it.each([
    ['1.0.0', '1.0.0', 0],
    ['2.3.4', '2.3.4', 0],
    ['3.5.6', '3.5.6', 0],
    ['2.1.1', '2.1.1', 0],
  ])('(%s) == (%s) = %d', (versionA: Version, versionB: Version, expected: number) => {
    expect(sortVersions(versionA, versionB)).toBe(expected);
  });
});
