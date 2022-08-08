jest.mock('@stackblitz/sdk', () => ({ openProject: jest.fn() }));
import * as stackBlitzHelperUtils from '../../src/utils/stackblitz/helper';
import * as vanillaJsBoilerPlateUtils from '../../src/utils/stackblitz/vanillaJsBoilerplate';
import * as reactBoilerPlateUtils from '../../src/utils/stackblitz/reactBoilerplate';
import * as angularBoilerPlateUtils from '../../src/utils/stackblitz/angularBoilerplate';
import { openInStackBlitz } from '../../src/utils';
import type { FrameworksWithoutShared, OpenInStackBlitzOpts } from '../../src/utils';
import { getBackgroundColor } from '../../src/utils/stackblitz/helper';
import * as sdk from '@stackblitz/sdk';
import type { Project, OpenOptions } from '@stackblitz/sdk';

describe('openInStackBlitz()', () => {
  const getOpenInStackblitzOptions = (framework: FrameworksWithoutShared): OpenInStackBlitzOpts => ({
    markup: 'Some markup',
    framework,
    theme: 'light',
    hasFrameworkMarkup: false,
    colorScheme: 'default',
  });

  it.each<FrameworksWithoutShared>(['vanilla-js', 'angular', 'react'])(
    'should call getBackgroundColor() and getPdsComponents() with correct parameters',
    (framework) => {
      const openInStackBlitzOptions = getOpenInStackblitzOptions(framework);
      const { markup, hasFrameworkMarkup, theme, colorScheme } = openInStackBlitzOptions;

      const getBodyStylesMockValue = 'ffff';
      const { project, openOptions } = {
        project: {
          files: {},
          template: 'some template',
          title: 'some title',
          description: 'some description',
        },
        openOptions: {},
      } as unknown as { project: Project; openOptions: OpenOptions };

      const pdsComponents = ['p-text'];

      const getBackgroundColorSpy = jest
        .spyOn(stackBlitzHelperUtils, 'getBackgroundColor')
        .mockImplementationOnce(() => 'ffff');

      const getPdsComponentsSpy = jest
        .spyOn(stackBlitzHelperUtils, 'getPdsComponents')
        .mockImplementationOnce(() => pdsComponents);

      const getProjectAndOpenOptionsSpyMap = {
        'vanilla-js': jest
          .spyOn(vanillaJsBoilerPlateUtils, 'getVanillaJsProjectAndOpenOptions')
          .mockReturnValue({ project, openOptions }),
        angular: jest
          .spyOn(angularBoilerPlateUtils, 'getAngularProjectAndOpenOptions')
          .mockReturnValue({ project, openOptions }),
        react: jest
          .spyOn(reactBoilerPlateUtils, 'getReactProjectAndOpenOptions')
          .mockReturnValue({ project, openOptions }),
      };

      // @ts-ignore
      const sdkSpy = jest.spyOn(sdk, 'openProject');

      openInStackBlitz(openInStackBlitzOptions);

      expect(getBackgroundColorSpy).toBeCalledWith(theme, colorScheme);
      expect(getPdsComponentsSpy).toBeCalledWith(markup);
      expect(getProjectAndOpenOptionsSpyMap[framework]).toBeCalledWith({
        markup,
        hasFrameworkMarkup,
        title: `Porsche Design System ${framework} sandbox`,
        description: 'p-text component example',
        bodyStyles: `body { background: ${getBodyStylesMockValue}; }`,
        pdsComponents,
        additionalDependencies: undefined,
      });

      expect(sdkSpy).toBeCalledWith(project, openOptions);
    }
  );
});
