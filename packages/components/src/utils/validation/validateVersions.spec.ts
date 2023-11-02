import { validateVersions } from './validateVersions';
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
    const getPorscheDesignSystemPrefixesForVersionsSpy = jest
      .spyOn(helperUtils, 'getPorscheDesignSystemPrefixesForVersions')
      .mockReturnValue(versions);

    validateVersions();

    expect(getPorscheDesignSystemPrefixesForVersionsSpy).toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `Multiple different versions are used with following prefixes:\n`,
      versions,
      '\nPlease upgrade all instances to the latest used version: 1.2.5'
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
