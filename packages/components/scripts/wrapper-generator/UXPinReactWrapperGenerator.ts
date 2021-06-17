import type { TagName } from '@porsche-design-system/shared';
import { spacing } from '@porsche-design-system/utilities';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';
import { ExtendedProp } from './DataStructureBuilder';
import type { AdditionalFile } from './AbstractWrapperGenerator';
import { pascalCase, paramCase } from 'change-case';

export class UXPinReactWrapperGenerator extends ReactWrapperGenerator {
  protected projectDir = 'uxpin-wrapper';
  protected ignoreComponents: TagName[] = ['p-content-wrapper', 'p-pagination'];

  private spacingProps: string[] = ['top', 'left', 'right', 'bottom'].map((x) => `spacing${pascalCase(x)}`);

  public getComponentFileName(component: TagName, withOutExtension?: boolean): string {
    return `${pascalCase(component.replace('p-', ''))}${withOutExtension ? '' : '.tsx'}`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    let imports = super
      .generateImports(component, extendedProps, nonPrimitiveTypes)
      .replace(/(?:useMergedClass|BreakpointCustomizable)(?:, )?/g, ''); // remove unused imports

    // when component is nested we need to fix relative imports
    if (this.shouldGenerateFolderPerComponent(component)) {
      imports = imports.replace(/'(\.\.\/)/g, "'$1$1");
    }

    return imports;
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    let props = super.generateProps(component, rawComponentInterface);

    // add onClick prop for marque, buttons and links, but not button-group
    if (!!component.match(/(button|link|marque)(?!-group)/)) {
      props = props.replace(/(};)$/, '  onClick?: (e: MouseEvent) => void;\n$1');
    }

    // remove BreakpointCustomizable types since designers can't use JSON
    props = props.replace(/BreakpointCustomizable<(.*)>/g, '$1');

    const removePropFromProps = (props: string, prop: string) => {
      return props.replace(new RegExp(`\\s\\s\\/\\*\\*(.*\\n){3}\\s\\s${prop}.*\\n`), '');
    };

    // remove useless props
    if (component === 'p-marque') {
      props = removePropFromProps(props, 'href');
      props = removePropFromProps(props, 'target');
    } else if (component === 'p-button' || component === 'p-button-pure') {
      props = removePropFromProps(props, 'type');
    }

    // add margin props to every component
    const spacings = this.spacingProps.map((x) => `${x}?: ${Object.keys(spacing).join(' | ')};`).join('\n  ');
    props = props.replace(/(HTMLAttributes<\{}> & \{\n)/, `$1  ${spacings}\n`);

    return props;
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
        'p-radio-button-wrapper': '<input type="radio" />',
        'p-text-field-wrapper': '<input type="text" />',
        'p-textarea-wrapper': '<textarea />',
        'p-select-wrapper': ['<select>']
          .concat(Array.from(Array(3)).map((_, i) => `<option value="${i + 1}">Option ${i + 1}</option>`))
          .concat(['</select>'])
          .join('\\n'),
        'p-banner': ['<span slot="title">Banner Title</span>', '<span slot="description">Banner Description'].join(
          '\\n'
        ),
        'p-modal': [
          '<p-text>Some Content</p-text>',
          '<p-button-group class="footer">',
          '<p-button>Save</p-button>',
          '<p-button variant="tertiary">Close</p-button>',
          '</p-button-group>',
        ].join('\\n'),
      };

      if (Object.keys(componentWithChildrenMap).includes(component)) {
        const children = componentWithChildrenMap[component];
        cleanedComponent = cleanedComponent
          .replace(/(\.\.\.rest)/, `children = '${children}', $1`) // set default children value in props destructuring
          .replace(/(\.\.\.rest,\n)/, '$1      dangerouslySetInnerHTML: { __html: children },\n'); // put destructured children into props object

        // add default label for components that have it
        if (this.inputParser.getRawComponentInterface(component).includes('label?: string;')) {
          cleanedComponent = cleanedComponent
            .replace(/(\.\.\.rest)/, `label = 'Some Label', $1`) // set default label value in props destructuring
            .replace(/(\.\.\.rest,\n)/, '$1      label,\n'); // put destructured label into props object
        }
      } else {
        // other components receive their component name as default
        cleanedComponent = cleanedComponent
          .replace(/(\.\.\.rest)/, `children = '${this.getComponentFileName(component, true)}', $1`) // set default children value in props destructuring
          .replace(/(\.\.\.rest,\n)/, '$1      children,\n'); // put destructured children into props object
      }
    }

    // adjust tabs-bar
    if (component === 'p-tabs-bar') {
      cleanedComponent = cleanedComponent.replace(/({ activeTabIndex),/, '$1 = 0,');
    }

    // destructure margin props
    const spacings = this.spacingProps.join(', ');
    cleanedComponent = cleanedComponent.replace(/(\.\.\.rest)/, `${spacings}, $1`);

    // build inline style prop
    const styleSpacings = this.spacingProps.map((x) => `padding${x.replace('spacing', '')}: ${x}`).join(', ');
    cleanedComponent = cleanedComponent.replace(/(\.\.\.rest,\n)/, `$1      style: { ${styleSpacings} },\n`);

    return cleanedComponent;
  }

  public shouldGenerateFolderPerComponent(component: TagName): boolean {
    return !!component.match(/(checkbox-wrapper)/);
  }

  public getAdditionalFiles(): AdditionalFile[] {
    const componentsWithPresetChildrenMap: { [key in TagName]?: string } = {
      'p-checkbox-wrapper': '<DummyCheckbox uxpId="dummy-checkbox" />',
    };
    const componentPresetFiles: AdditionalFile[] = Object.entries(componentsWithPresetChildrenMap).map(
      ([component, children]) => {
        const componentName = this.getComponentFileName(component as TagName, true);

        // extract dummy components and get rid of duplicates
        const dummyComponents = (children.match(/(Dummy[A-Za-z]+)/g) || [])
          .filter((x, i, a) => a.indexOf(x) === i)
          .join(', ');
        const dummyImports = dummyComponents ? `import { ${dummyComponents} } from '../../../../dummy';` : '';

        const imports = [`import { ${componentName} } from '../${componentName}';`, dummyImports]
          .filter((x) => x)
          .join('\n');

        const content = `${imports}

export default (
  <${componentName} uxpId="${paramCase(componentName)}">
    ${children}
  </${componentName}>
);`;

        const additionalFile: AdditionalFile = {
          name: '0-preset.jsx',
          relativePath: componentName + '/presets',
          content,
        };
        return additionalFile;
      }
    );

    const componentsBasePath = 'src/lib/components/';
    const componentPaths = this.relevantComponentTagNames
      .map((component) => {
        const componentSubDir = this.shouldGenerateFolderPerComponent(component)
          ? this.getComponentFileName(component, true) + '/'
          : '';
        const fileName = this.getComponentFileName(component);
        return `${componentsBasePath}${componentSubDir}${fileName}`;
      })
      .map((path) => `'${path}'`)
      .join(',\n          ');

    const uxPinConfigContent = `module.exports = {
  components: {
    categories: [
      {
        name: 'Uncategorized',
        include: [
          ${componentPaths}
        ],
      },
      {
        name: 'Dummy',
        include: ['src/dummy/*.tsx'],
      },
    ],
    wrapper: 'src/UXPinWrapper.tsx',
    webpackConfig: 'webpack.config.js',
  },
  name: 'Porsche Design System',
};`;

    return [
      ...componentPresetFiles,
      { name: 'uxpin.config.js', relativePath: '../../../', content: uxPinConfigContent },
    ];
  }
}
