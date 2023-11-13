import { validateVersions, VERSION_VALIDATION_TIMEOUT } from './validateVersions';
import * as loggerUtils from '../log/logger';

describe('validateVersions()', () => {
  it('should warn about multiple used versions', async () => {
    const sharedProps = {
      readyResolve: () => {},
      isReady: Promise.resolve,
    };
    document.porscheDesignSystem = {
      cdn: { url: '', prefixes: [] },
      '1.2.3': { ...sharedProps, prefixes: [''] },
      '1.2.4': { ...sharedProps, prefixes: ['prefix'] },
      '1.2.5': { ...sharedProps, prefixes: ['my-prefix'] },
    };

    const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');

    validateVersions();

    await new Promise((resolve) => setTimeout(resolve, VERSION_VALIDATION_TIMEOUT)); // Wait until version validation

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Multiple different versions detected!\nPlease upgrade all instances to the latest version in use.\nRefer to the document.porscheDesignSystem object for detailed information on the current versions in use.\n',
      document.porscheDesignSystem
    );
  });

  it('should not warn about multiple used versions when only one version is used', async () => {
    const sharedProps = {
      readyResolve: () => {},
      isReady: Promise.resolve,
    };
    document.porscheDesignSystem = {
      cdn: { url: '', prefixes: [] },
      '1.2.5': { ...sharedProps, prefixes: ['prefix, another-prefix'] },
    };

    const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');
    validateVersions();

    await new Promise((resolve) => setTimeout(resolve, VERSION_VALIDATION_TIMEOUT)); // Wait until version validation
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});
