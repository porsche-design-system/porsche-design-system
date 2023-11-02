import { sortVersions, validateVersions, Version } from './validateVersions';
import * as validateVersionsUtils from './validateVersions';
import * as loggerUtils from '../log/logger';

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

    const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');
    const sortVersionsSpy = jest.spyOn(validateVersionsUtils, 'sortVersions');

    validateVersions();

    expect(sortVersionsSpy).toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `Multiple different versions are used with following prefixes:\n`,
      {
        '1.2.3': [''],
        '1.2.4': ['prefix'],
        '1.2.5': ['my-prefix'],
      },
      '\nPlease upgrade all instances to the latest used version: 1.2.5'
    );
  });

  it('should warn about multiple used versions in correct oder and suggest correct version to upgrade', () => {
    const sharedProps = {
      readyResolve: () => {},
      isReady: Promise.resolve,
    };
    document.porscheDesignSystem = {
      cdn: { url: '', prefixes: [] },
      '3.9.0': { ...sharedProps, prefixes: ['prefix'] },
      '1.2.5': { ...sharedProps, prefixes: ['prefix, another-prefix'] },
      '1.2.3': { ...sharedProps, prefixes: [''] },
      '1.2.4': { ...sharedProps, prefixes: ['prefix, another-prefix'] },
      '2.5.1': { ...sharedProps, prefixes: ['prefix'] },
    }; // initialize pds document

    const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');
    const sortVersionsSpy = jest.spyOn(validateVersionsUtils, 'sortVersions');

    validateVersions();

    expect(sortVersionsSpy).toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `Multiple different versions are used with following prefixes:\n`,
      {
        '1.2.3': [''],
        '1.2.4': ['prefix, another-prefix'],
        '1.2.5': ['prefix, another-prefix'],
        '2.5.1': ['prefix'],
        '3.9.0': ['prefix'],
      },
      '\nPlease upgrade all instances to the latest used version: 3.9.0'
    );
  });

  it('should not warn about multiple used versions when only one version is used', () => {
    const sharedProps = {
      readyResolve: () => {},
      isReady: Promise.resolve,
    };
    document.porscheDesignSystem = {
      cdn: { url: '', prefixes: [] },
      '1.2.5': { ...sharedProps, prefixes: ['prefix, another-prefix'] },
    }; // initialize pds document

    const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');
    validateVersions();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});

describe('sortVersions()', () => {
  it.each([
    ['2.0.0', '1.0.0', 1],
    ['1.1.0', '1.0.0', 1],
    ['1.0.1', '1.0.0', 1],
    ['2.1.2', '2.1.1', 1],
    ['2.1.2-rc.2', '2.1.2-rc.1', 1],
  ])('(%s) > (%s) = %d', (versionA: Version, versionB: Version, expected: number) => {
    expect(sortVersions(versionA, versionB)).toBe(expected);
  });

  it.each([
    ['1.0.0', '2.0.0', -1],
    ['1.0.0', '1.1.0', -1],
    ['1.0.0', '1.0.1', -1],
    ['2.1.1', '2.1.2', -1],
    ['2.1.2-rc.1', '2.1.2-rc.2', -1],
  ])('(%s) < (%s) = %d', (versionA: Version, versionB: Version, expected: number) => {
    expect(sortVersions(versionA, versionB)).toBe(expected);
  });

  it.each([
    ['1.0.0', '1.0.0', 0],
    ['2.3.4', '2.3.4', 0],
    ['3.5.6', '3.5.6', 0],
    ['2.1.1', '2.1.1', 0],
    ['2.1.2-rc.1', '2.1.2-rc.1', 0],
  ])('(%s) == (%s) = %d', (versionA: Version, versionB: Version, expected: number) => {
    expect(sortVersions(versionA, versionB)).toBe(expected);
  });
});
