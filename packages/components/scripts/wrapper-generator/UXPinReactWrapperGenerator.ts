import type { TagName } from '@porsche-design-system/shared';
import { spacing, font } from '@porsche-design-system/utilities';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';
import { ExtendedProp } from './DataStructureBuilder';
import type { AdditionalFile } from './AbstractWrapperGenerator';
import { pascalCase, paramCase } from 'change-case';

const addNestedIndentation = (x: string): string => `  ${x}`;

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
    const addProp = (props: string, prop: string): string => {
      return props.replace(/(};)$/, `  ${prop}\n$1`);
    };

    const removeProp = (props: string, prop: string): string => {
      return props.replace(new RegExp(`\\s\\s\\/\\*\\*(.*\\n){3}\\s\\s${prop}.*\\n`), '');
    };

    const addUxPinBindAnnotation = (props: string, prop: string, eventProp: string, eventDetail?: string): string => {
      const detailChild = eventDetail ? `.${eventDetail}` : '';
      return props.replace(
        new RegExp(`(\\s{4}\\*\\/\\s{3}${prop}\\?:.*)`),
        `\n   * @uxpinbind ${eventProp} 0.detail${detailChild}$1`
      );
    };

    let props = super.generateProps(component, rawComponentInterface);

    // add custom props to wrappers
    if (component === 'p-banner') {
      props = addProp(props, 'title?: string;');
      props = addProp(props, 'description?: string;');
    }
    // add onClick prop for marque, buttons and links, but not button-group
    else if (!!component.match(/(button|link|marque)(?!-group)/)) {
      props = addProp(props, 'onClick?: (e: MouseEvent) => void;');
    }

    // remove BreakpointCustomizable types since designers can't use JSON
    props = props.replace(/BreakpointCustomizable<(.*)>/g, '$1');

    // remove useless props
    if (component === 'p-marque') {
      props = removeProp(props, 'href');
      props = removeProp(props, 'target');
    } else if (component === 'p-button' || component === 'p-button-pure') {
      props = removeProp(props, 'type');
    }

    // override props
    if (component === 'p-text') {
      const sizeValues = Object.keys(font.size)
        .filter((x) => !x.match(/[a-z]/)) // only keep numeric fvalues
        .join(' | ');
      props = props.replace(/(size\?: )TextSize/, `$1${sizeValues}`);
    }

    // add uxpinbind annotations
    if (component === 'p-accordion') {
      props = addUxPinBindAnnotation(props, 'open', 'onAccordionChange', 'open');
    } else if (component === 'p-modal') {
      props = addUxPinBindAnnotation(props, 'open', 'onClose');
    } else if (component === 'p-switch') {
      props = addUxPinBindAnnotation(props, 'checked', 'onSwitchChange', 'checked');
    } else if (component === 'p-tabs-bar') {
      props = addUxPinBindAnnotation(props, 'activeTabIndex', 'onTabChange', 'activeTabIndex');
    }

    // add spacing props to every component
    const spacings = this.spacingProps.map((x) => `${x}?: ${Object.keys(spacing).join(' | ')};`).join('\n  ');
    props = props.replace(/(HTMLAttributes<{}> & {\n)/, `$1  ${spacings}\n`);

    return props;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    let cleanedComponent = super
      .generateComponent(component, extendedProps)
      .replace(/export const P(\w+) =/, 'export const $1 =') // adjust component name to match file name
      .replace('className, ', '') // remove className from props destructuring since it is useless
      .replace(/\s+class.*/, ''); // remove class mapping via useMergedClass since it is useless

    // destructure spacing props
    const spacings = this.spacingProps.join(', ');
    cleanedComponent = cleanedComponent.replace(/(\.\.\.rest)/, `${spacings}, $1`);

    // build inline style prop
    const styleSpacings = this.spacingProps.map((x) => `padding${x.replace('spacing', '')}: ${x}`).join(', ');
    cleanedComponent = cleanedComponent.replace(/(\.\.\.rest,\n)/, `$1      style: { ${styleSpacings} },\n`);

    // add default children for components that need it
    if (cleanedComponent.includes('PropsWithChildren')) {
      // special treatments
      if (component === 'p-banner') {
        cleanedComponent = cleanedComponent
          .replace(/(\.\.\.rest)/, `title = 'Title', description = 'Description', $1`) // set default children value in props destructuring
          .replace(/PropsWithChildren<(.*)>/, '$1') // remove PropsWithChildren
          .replace(
            // map custom title and description props to slotted children
            /(<Tag {...props}) \/>/,
            [
              '(',
              ...[
                '$1>',
                ...['<span slot="title" children={title} />', '<span slot="description" children={description} />'].map(
                  addNestedIndentation
                ),
                '</Tag>',
              ].map(addNestedIndentation),
              ')',
            ].join('\n    ')
          );
      } else {
        // other components receive their component name as default
        cleanedComponent = cleanedComponent
          .replace(/(\.\.\.rest)/, `children = '${this.getComponentFileName(component, true)}', $1`) // set default children value in props destructuring
          .replace(/(\.\.\.rest,\n)/, '$1      children,\n'); // put destructured children into props object
      }

      // another special treatment that needs default children
      if (component === 'p-text') {
        cleanedComponent = cleanedComponent
          .replace(/(size =) 'small'/, '$1 16') // change destructured size
          .replace(', size,', ", 'inherit',") // always set inherit in propsToSync
          .replace(/(style: {)/, '$1 fontSize: size,'); // patch inline style
      }
    }

    return cleanedComponent;
  }

  public shouldGenerateFolderPerComponent(component: TagName): boolean {
    switch (component) {
      case 'p-accordion':
      case 'p-button-group':
      case 'p-checkbox-wrapper':
      case 'p-flex':
      case 'p-grid':
      case 'p-modal':
      case 'p-radio-button-wrapper':
      case 'p-select-wrapper':
      case 'p-text-field-wrapper':
      case 'p-textarea-wrapper':
      case 'p-table':
      case 'p-tabs':
      case 'p-tabs-bar':
      case 'p-text-list':
        return true;
      default:
        return false;
    }
  }

  public getAdditionalFiles(): AdditionalFile[] {
    const glue = '\n    ';

    const componentsWithPresetChildrenMap: { [key in TagName]?: { props?: string; children?: string } } = {
      'p-accordion': {
        props: 'heading="Heading"',
        children: '<Text uxpId="accordion-text" children="Content" />',
      },
      'p-button-group': {
        children: [
          '<Button variant="primary" uxpId="button-primary" />',
          '<Button variant="secondary" uxpId="button-secondary" />',
        ].join(glue),
      },
      'p-checkbox-wrapper': {
        props: 'label="CheckboxWrapper"',
        children: '<DummyCheckbox uxpId="dummy-checkbox" />',
      },
      'p-flex': {
        children: ['<FlexItem uxpId="flex-item-1" />', '<FlexItem uxpId="flex-item-2" />'].join(glue),
      },
      'p-grid': {
        children: ['<GridItem size={6} uxpId="grid-item-1" />', '<GridItem size={6} uxpId="grid-item-2" />'].join(glue),
      },
      'p-modal': {
        props: 'heading="Heading"',
        children: [
          '<Text uxpId="modal-text">Some Content</Text>',
          '<ButtonGroup uxpId="modal-button-group" spacingTop={32}>',
          ...[
            '<Button uxpId="modal-button-1" children="Save" />',
            '<Button uxpId="modal-button-2" variant="tertiary" children="Close" />',
          ].map(addNestedIndentation),
          '</ButtonGroup>',
        ].join(glue),
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
      'p-table': {
        children: [
          '<TableHead uxpId="table-head">',
          ...[
            '<TableHeadRow uxpId="table-head-row">',
            ...[
              '<TableHeadCell uxpId="table-head-cell-1" sort={{ id: "col1", active: true, direction: "asc" }}>Column 1</TableHeadCell>',
              '<TableHeadCell uxpId="table-head-cell-2" sort={{ id: "col2", active: false, direction: "asc" }}>Column 2</TableHeadCell>',
            ].map(addNestedIndentation),
            '</TableHeadRow>',
          ].map(addNestedIndentation),
          '</TableHead>',
          '<TableBody uxpId="table-body">',
          ...Array.from(Array(3)).map((_, i) =>
            [
              `<TableRow uxpId="table-row-${i + 1}">`,
              ...[
                `<TableCell uxpId="table-row-${i + 1}-cell-1">Cell 1</TableCell>`,
                `<TableCell uxpId="table-row-${i + 1}-cell-2">Cell 2</TableCell>`,
              ].map(addNestedIndentation),
              '</TableRow>',
            ]
              .map(addNestedIndentation)
              .join(glue)
          ),
          '</TableBody>',
        ].join(glue),
      },
      'p-tabs': {
        props: 'activeTabIndex={0}',
        children: Array.from(Array(2))
          .map((_, i) => `<TabsItem label="Tab ${i + 1}" uxpId="tabs-item-${i + 1}" children="Content ${i + 1}" />`)
          .join(glue),
      },
      'p-tabs-bar': {
        props: 'activeTabIndex={0}',
        children: Array.from(Array(3))
          .map((_, i) => `<DummyButton uxpId="dummy-button-${i + 1}" children="Tab ${i + 1}" />`)
          .join(glue),
      },
      'p-text-list': {
        children: Array.from(Array(2))
          .map((_, i) => `<TextListItem uxpId="text-list-item-${i + 1}" children="Item ${i + 1}" />`)
          .join(glue),
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
