import type { TagName } from '@porsche-design-system/shared';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';
import { ExtendedProp } from './DataStructureBuilder';
import type { AdditionalFile } from './AbstractWrapperGenerator';

export class UXPinReactWrapperGenerator extends ReactWrapperGenerator {
  protected projectDir = 'uxpin-wrapper';

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    return super
      .generateImports(component, extendedProps, nonPrimitiveTypes)
      .replace(/import type/g, 'import')
      .replace(/(?:HTMLAttributes|useMergedClass)(?:, )?/g, '')
      .replace(/(import) ({.*} from 'react')/, '$1 React, $2');
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    return super.generateProps(component, rawComponentInterface).replace('HTMLAttributes<{}> & ', '');
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    return super
      .generateComponent(component, extendedProps)
      .replace(/export const \w+ =/, 'export default')
      .replace('className, ', '')
      .replace(/\s+class.*/, '');
  }

  public getAdditionalFiles(): AdditionalFile[] {
    const uxPinWrapperContent = `import React, { useEffect } from 'react';
import { load } from '@porsche-design-system/components-js';

export default ({ children }): JSX.Element => {
  useEffect(() => {
    load();
  }, []);

  return children;
};`;

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
    wrapper: 'src/lib/UXPinWrapper.tsx',
    webpackConfig: 'webpack.config.js',
  },
  name: 'Porsche Design System',
};`;

    return [
      { name: 'UXPinWrapper.tsx', relativePath: '../', content: uxPinWrapperContent },
      { name: 'uxpin.config.js', relativePath: '../../../', content: uxPinConfigContent },
    ];
  }
}
