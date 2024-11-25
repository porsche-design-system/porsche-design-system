jest.mock('@stackblitz/sdk', () => ({ openProject: jest.fn() }));

import { openInStackBlitz } from '../../src/utils/stackblitz/openInStackBlitz';
import type { StackBlitzFrameworkOpts } from '../../src/utils';
import type { Framework, StackBlitzProjectAndOpenOptions } from '../../src/models';
import type { OpenInStackBlitzOpts } from '../../src/utils/stackblitz/openInStackBlitz';

import * as sdk from '@stackblitz/sdk';
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';
import * as getVanillaJsProjectAndOpenOptionsUtils from '../../src/utils/stackblitz/getVanillaJsProjectAndOpenOptions';
import * as getReactProjectAndOpenOptionsUtils from '../../src/utils/stackblitz/getReactProjectAndOpenOptions';
import * as getAngularProjectAndOpenOptionsUtils from '../../src/utils/stackblitz/getAngularProjectAndOpenOptions';

describe('openInStackBlitz()', () => {
  const sharedOpenInStackBlitzOptions: OpenInStackBlitzOpts = {
    porscheDesignSystemBundle: {},
    markup: 'Some markup',
    dir: 'ltr',
    theme: 'light',
    framework: 'vanilla-js',
    backgroundColor: 'background-base',
    externalDependencies: [],
    sharedImportKeys: [],
    pdsVersion: '',
  };

  const mockedGetBackgroundColor = '#fff';

  const sharedFrameworkOptions: StackBlitzFrameworkOpts = {
    porscheDesignSystemBundle: {},
    markup: sharedOpenInStackBlitzOptions.markup,
    dir: sharedOpenInStackBlitzOptions.dir,
    externalDependencies: sharedOpenInStackBlitzOptions.externalDependencies,
    sharedImportKeys: sharedOpenInStackBlitzOptions.sharedImportKeys,
    title: '',
    description: 'Porsche Design System component example',
    globalStyles: `body { background: ${mockedGetBackgroundColor}; }`,
    pdsVersion: '',
  };

  const mockedProjectAndOpenOptions: StackBlitzProjectAndOpenOptions = {
    files: {
      'App.tsx': 'Some markup',
    },
    template: 'html',
    title: sharedFrameworkOptions.title,
    description: sharedFrameworkOptions.description,
    dependencies: {},
    openFile: 'Some file',
  };

  it('should call getBackgroundColor() with correct parameters', () => {
    const spy = jest.spyOn(stackBlitzHelperUtils, 'getBackgroundColor');
    const openInStackBlitzOptions: OpenInStackBlitzOpts = { ...sharedOpenInStackBlitzOptions, framework: 'vanilla-js' };

    openInStackBlitz(openInStackBlitzOptions);

    expect(spy).toHaveBeenCalledWith(openInStackBlitzOptions.theme, openInStackBlitzOptions.backgroundColor);
  });

  it('should call getVanillaJsProjectAndOpenOptions() with correct parameters', () => {
    jest.spyOn(stackBlitzHelperUtils, 'getBackgroundColor').mockReturnValue(mockedGetBackgroundColor);

    const spy = jest.spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getVanillaJsProjectAndOpenOptions');
    const openInStackBlitzOptions: OpenInStackBlitzOpts = { ...sharedOpenInStackBlitzOptions, framework: 'vanilla-js' };

    openInStackBlitz(openInStackBlitzOptions);

    expect(spy).toHaveBeenCalledWith({
      ...sharedFrameworkOptions,
      title: `Porsche Design System vanilla-js sandbox`,
    });
  });

  it('should call getAngularProjectAndOpenOptions() with correct parameters', () => {
    jest.spyOn(stackBlitzHelperUtils, 'getBackgroundColor').mockReturnValue(mockedGetBackgroundColor);

    const spy = jest.spyOn(getAngularProjectAndOpenOptionsUtils, 'getAngularProjectAndOpenOptions');
    const openInStackBlitzOptions: OpenInStackBlitzOpts = {
      ...sharedOpenInStackBlitzOptions,
      framework: 'angular',
    };

    openInStackBlitz(openInStackBlitzOptions);

    expect(spy).toHaveBeenCalledWith({ ...sharedFrameworkOptions, title: `Porsche Design System angular sandbox` });
  });

  it('should call getReactProjectAndOpenOptions() with correct parameters', () => {
    jest.spyOn(stackBlitzHelperUtils, 'getBackgroundColor').mockReturnValue(mockedGetBackgroundColor);

    const spy = jest.spyOn(getReactProjectAndOpenOptionsUtils, 'getReactProjectAndOpenOptions');
    const openInStackBlitzOptions: OpenInStackBlitzOpts = {
      ...sharedOpenInStackBlitzOptions,
      framework: 'react',
    };

    openInStackBlitz(openInStackBlitzOptions);

    expect(spy).toHaveBeenCalledWith({ ...sharedFrameworkOptions, title: `Porsche Design System react sandbox` });
  });

  it.each<Exclude<Framework, 'shared'>>(['vanilla-js', 'angular', 'react'])(
    'should call sdk.openProject() with correct parameters for framework: %s',
    () => {
      // @ts-ignore
      const spy = jest.spyOn(sdk, 'openProject');
      jest
        .spyOn(getVanillaJsProjectAndOpenOptionsUtils, 'getVanillaJsProjectAndOpenOptions')
        .mockReturnValue(mockedProjectAndOpenOptions);
      jest
        .spyOn(getAngularProjectAndOpenOptionsUtils, 'getAngularProjectAndOpenOptions')
        .mockReturnValue(mockedProjectAndOpenOptions);
      jest
        .spyOn(getReactProjectAndOpenOptionsUtils, 'getReactProjectAndOpenOptions')
        .mockReturnValue(mockedProjectAndOpenOptions);

      openInStackBlitz(sharedOpenInStackBlitzOptions);

      const { openFile, ...project } = mockedProjectAndOpenOptions;

      expect(spy).toHaveBeenCalledWith(project, { openFile });
    }
  );
});
