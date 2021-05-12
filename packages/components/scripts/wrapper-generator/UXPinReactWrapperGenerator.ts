import type { TagName } from '@porsche-design-system/shared';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';
import { ExtendedProp } from './DataStructureBuilder';
import type { AdditionalFile } from './AbstractWrapperGenerator';
import { pascalCase } from 'change-case';

export class UXPinReactWrapperGenerator extends ReactWrapperGenerator {
  protected projectDir = 'uxpin-wrapper';

  public getComponentFileName(component: TagName, withOutExtension?: boolean): string {
    return `${pascalCase(component.replace('p-', ''))}${withOutExtension ? '' : '.tsx'}`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    return super
      .generateImports(component, extendedProps, nonPrimitiveTypes)
      .replace(/(?:HTMLAttributes|useMergedClass)(?:, )?/g, '');
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    return super.generateProps(component, rawComponentInterface).replace('HTMLAttributes<{}> & ', '');
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    return super
      .generateComponent(component, extendedProps)
      .replace(/export const P(\w+) =/, 'export const $1 =')
      .replace('className, ', '')
      .replace(/\s+class.*/, '');
  }

  public getAdditionalFiles(): AdditionalFile[] {
    const uxPinConfigContent = `module.exports = {
  components: {
    categories: [
      {
        name: 'Uncategorized',
        include: [
          'src/lib/components/*.tsx',
        ],
      },
    ],
    wrapper: 'src/UXPinWrapper.tsx',
    webpackConfig: 'webpack.config.js',
  },
  name: 'Porsche Design System',
};`;

    return [{ name: 'uxpin.config.js', relativePath: '../../../', content: uxPinConfigContent }];
  }
}
