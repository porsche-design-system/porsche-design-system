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

    // add spacing props to every component
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

    // destructure spacing props
    const spacings = this.spacingProps.join(', ');
    cleanedComponent = cleanedComponent.replace(/(\.\.\.rest)/, `${spacings}, $1`);

    // build inline style prop
    const styleSpacings = this.spacingProps.map((x) => `padding${x.replace('spacing', '')}: ${x}`).join(', ');
    cleanedComponent = cleanedComponent.replace(/(\.\.\.rest,\n)/, `$1      style: { ${styleSpacings} },\n`);

    return cleanedComponent;
  }

  public shouldGenerateFolderPerComponent(component: TagName): boolean {
    switch (component) {
      case 'p-button-group':
      case 'p-checkbox-wrapper':
      case 'p-radio-button-wrapper':
      case 'p-select-wrapper':
      case 'p-text-field-wrapper':
      case 'p-textarea-wrapper':
      case 'p-tabs-bar':
        return true;
      default:
        return false;
    }
  }

  public getAdditionalFiles(): AdditionalFile[] {
    const componentsWithPresetChildrenMap: { [key in TagName]?: { props?: string; children?: string } } = {
      'p-button-group': {
        children: [
          '<Button variant="primary" uxpId="button-primary" />',
          '<Button variant="secondary" uxpId="button-secondary" />',
        ].join('\n    '),
      },
      'p-checkbox-wrapper': {
        props: 'label="CheckboxWrapper"',
        children: '<DummyCheckbox uxpId="dummy-checkbox" />',
      },
      'p-radio-button-wrapper': {
        props: 'label="RadioButtonWrapper"',
        children: '<DummyRadioButton uxpId="dummy-radio-button" />',
      },
      'p-select-wrapper': {
        props: 'label="SelectWrapper"',
        children:
          '<DummySelect uxpId="dummy-select" options={Array.from(Array(3)).map((_, i) => `Option ${i + 1}`)} />',
      },
      'p-text-field-wrapper': {
        props: 'label="TextFieldWrapper"',
        children: '<DummyTextField uxpId="dummy-text-field" />',
      },
      'p-textarea-wrapper': {
        props: 'label="TextareaWrapper"',
        children: '<DummyTextarea uxpId="dummy-textarea" />',
      },
      'p-tabs-bar': {
        props: 'activeTabIndex={0}',
        children: Array.from(Array(3))
          .map((_, i) => `<DummyButton uxpId="dummy-button-${i + 1}" children="Tab ${i + 1}" />`)
          .join('\n    '),
      },
    };

    const componentPresetFiles: AdditionalFile[] = Object.entries(componentsWithPresetChildrenMap).map(
      ([component, { props, children }]) => {
        const componentName = this.getComponentFileName(component as TagName, true);

        // extract other components and get rid of duplicates
        const allComponents: string[] = (children?.match(/<([A-Za-z]+)/g) || [])
          .map((x) => x.replace('<', ''))
          .filter((x, i, a) => a.indexOf(x) === i);

        const otherComponents = allComponents.filter((x) => !x.startsWith('Dummy'));
        const dummyComponents = allComponents.filter((x) => x.startsWith('Dummy'));

        const otherImports = otherComponents.length ? `import { ${otherComponents.join(', ')} } from '../..';` : '';
        const dummyImports = dummyComponents.length
          ? `import { ${dummyComponents.join(', ')} } from '../../../../dummy';`
          : '';

        const imports = [`import { ${componentName} } from '../${componentName}';`, otherImports, dummyImports]
          .filter((x) => x)
          .join('\n');

        const content = `${imports}

export default (
  <${componentName} uxpId="${paramCase(componentName)}"${props ? ' ' + props : ''}>
    ${children}
  </${componentName}>
);`;

        const additionalFile: AdditionalFile = {
          name: '0-default.jsx',
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
      { name: 'uxpin.config.js', relativePath: '../../..', content: uxPinConfigContent },
    ];
  }
}
