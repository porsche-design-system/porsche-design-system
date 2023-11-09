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
    }; // initialize pds document

    const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');

    validateVersions();

    await new Promise((resolve) => setTimeout(resolve, VERSION_VALIDATION_TIMEOUT + 1000)); // Wait until version validation

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Multiple different versions detected! Look into the document.porscheDesignSystem object for more information about the used versions:\n',
      document.porscheDesignSystem
    );
  });

  it('should warn about multiple used versions in correct oder and suggest correct version to upgrade', async () => {
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

    validateVersions();

    await new Promise((resolve) => setTimeout(resolve, VERSION_VALIDATION_TIMEOUT + 1000)); // Wait until version validation

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Multiple different versions detected! Look into the document.porscheDesignSystem object for more information about the used versions:\n',
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
    }; // initialize pds document

    const consoleWarnSpy = jest.spyOn(loggerUtils, 'consoleWarn');
    validateVersions();

    await new Promise((resolve) => setTimeout(resolve, VERSION_VALIDATION_TIMEOUT + 1000)); // Wait until version validation
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });
});
