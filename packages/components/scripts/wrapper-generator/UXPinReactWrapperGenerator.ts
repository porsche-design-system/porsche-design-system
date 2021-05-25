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
    return super.generateImports(component, extendedProps, nonPrimitiveTypes).replace(/(?:useMergedClass)(?:, )?/g, ''); // remove unused imports
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    let cleanedComponent = super
      .generateComponent(component, extendedProps)
      .replace(/export const P(\w+) =/, 'export const $1 =') // adjust component name to match file name
      .replace('className, ', '') // remove className from props destructuring since it is useless
      .replace(/\s+class.*/, ''); // remove class mapping via useMergedClass since it is useless

    // add default children for components that need it
    if (cleanedComponent.includes('PropsWithChildren')) {
      const componentWithChildrenMap: { [key in TagName]?: string } = {
        'p-checkbox-wrapper': '<input type="checkbox" />',
        'p-radio-button-wrapper': '<input type="radio" />',
        'p-text-field-wrapper': '<input type="text" />',
        'p-textarea-wrapper': '<textarea />',
        'p-select-wrapper': ['<select>']
          .concat(Array.from(Array(3)).map((_, i) => `<option value="${i + 1}">Option ${i + 1}</option>`))
          .concat(['</select>'])
          .join('\\n'),
        'p-tabs-bar': Array.from(Array(3))
          .map((_, i) => `<button>Tab ${i + 1}</button>`)
          .join('\\n'),
      };

      if (Object.keys(componentWithChildrenMap).includes(component)) {
        const children = componentWithChildrenMap[component];
        cleanedComponent = cleanedComponent
          .replace(/(\.\.\.rest)/, `children = '${children}', $1`) // set default children value in props destructuring
          .replace(/(\.\.\.rest,\n)/, '$1      dangerouslySetInnerHTML: { __html: children },\n'); // put destructured children into props object

        // add default label for components that have it
        if (this.inputParser.getRawComponentInterface(component).includes('label?: string;')) {
          cleanedComponent = cleanedComponent
            .replace(/(\.\.\.rest)/, `label = '${this.getComponentFileName(component, true)}', $1`) // set default label value in props destructuring
            .replace(/(\.\.\.rest,\n)/, '$1      label,\n'); // put destructured label into props object
        }
      } else {
        // other components receive their component name as default
        cleanedComponent = cleanedComponent
          .replace(/(\.\.\.rest)/, `children = '${this.getComponentFileName(component, true)}', $1`) // set default children value in props destructuring
          .replace(/(\.\.\.rest,\n)/, '$1      children,\n'); // put destructured children into props object
      }
    }

    return cleanedComponent;
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
