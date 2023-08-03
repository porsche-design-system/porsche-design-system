import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';
import type { AdditionalFile } from './AbstractWrapperGenerator';
import { paramCase, pascalCase } from 'change-case';

type PresetsProps = { [key: string]: number | string | boolean | string[] | object | null };

type FormComponentName = 'Checkbox' | 'RadioButton' | 'Select' | 'TextField' | 'Textarea'; // the 5 form components created "manually" in uxpin-wrapper project

const addNestedIndentation = (x: string): string => `  ${x}`;

export class UXPinReactWrapperGenerator extends ReactWrapperGenerator {
  protected projectDir = 'uxpin-wrapper';

  private spacingProps: string[] = ['top', 'left', 'right', 'bottom'].map((x) => `spacing${pascalCase(x)}`);

  constructor() {
    super();
    this.ignoreComponents = [
      ...this.ignoreComponents,
      'p-content-wrapper',
      'p-flex',
      'p-flex-item',
      'p-grid',
      'p-grid-item',
      'p-pagination',
    ];
  }

  public getComponentFileName(component: TagName): string {
    return `${pascalCase(component.replace('p-', ''))}.tsx`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    let imports = super
      .generateImports(component, extendedProps, nonPrimitiveTypes)
      .replace(/(?:useMergedClass|BreakpointCustomizable)(?:, )?/g, ''); // remove unused imports

    if (component === 'p-toast') {
      imports = imports
        .replace(/( } from '\.\.\/\.\.\/hooks';)/, ', useToastManager$1')
        .replace(/( } from '\.\.\/types';)/, ', ToastState$1');
    } else if (component === 'p-button' || component === 'p-button-pure') {
      imports = imports.replace(/, (?:ButtonType|ButtonPureType)/, '');
    } else if (component === 'p-marque') {
      imports = imports.replace(/, MarqueTarget/, '');
    } else if (component === 'p-text') {
      imports = imports.replace(/, TextSize/, '');
    }

    // add spacing imports
    imports += ['import type { Spacing }', 'import { getPaddingStyles }']
      .map((imp, i) => `${i === 0 ? '\n' : ''}${imp} from '../../spacing';`)
      .join('\n');

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

    const addUxPinIgnorePropAnnotation = (props: string, prop: string): string => {
      return props.replace(new RegExp(`(\\s{4}\\*\\/\\s{3}${prop}\\?:.*)`), `\n   * @uxpinignoreprop$1`);
    };

    let props = super.generateProps(component, rawComponentInterface);

    // add custom props to wrappers
    if (component === 'p-toast') {
      props = addProp(props, 'text: string;');
      props = addProp(props, 'state: ToastState;');
    } else if (component === 'p-text-field-wrapper') {
      // TODO: useful for combined component without nested DummyInputs
      // const typeLiteral = getComponentMeta(component)
      //   .requiredChildSelector!.split(',')
      //   .map((x) => `'${x.slice(x.indexOf('=') + 1, -1)}'`)
      //   .join(' | ');
      // props = addProp(props, `type?: ${typeLiteral};`);

      props = addProp(props, 'isWithinForm?: boolean;');
      props = addProp(props, 'onFormSubmit?: () => void;');
    }

    // add onClick prop for marque, buttons and links, but not button-group
    else if (!!component.match(/(button|link|marque|stepper-horizontal-item|tag-dismissible)(?!-group)/)) {
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
      const sizeValues = [12, 16, 18, 20, 22, 24, 28, 30, 32, 36, 42, 44, 48, 52, 60, 62, 72, 84].join(' | ');
      props = props.replace(/(size\?: )TextSize/, `$1${sizeValues}`);
    }

    // add uxpinignoreprop annotations
    if (component === 'p-modal') {
      props = addUxPinIgnorePropAnnotation(props, 'open');
    } else if (component === 'p-link' || component === 'p-link-pure' || component === 'p-link-social') {
      props = addUxPinIgnorePropAnnotation(props, 'href');
    }

    // add uxpinbind annotations
    if (component === 'p-accordion') {
      props = addUxPinBindAnnotation(props, 'open', 'onUpdate', 'open');
      props = addUxPinBindAnnotation(props, 'open', 'onAccordionChange', 'open');
    } else if (component === 'p-switch') {
      props = addUxPinBindAnnotation(props, 'checked', 'onUpdate', 'checked');
      props = addUxPinBindAnnotation(props, 'checked', 'onSwitchChange', 'checked');
    } else if (component === 'p-segmented-control') {
      props = addUxPinBindAnnotation(props, 'value', 'onUpdate', 'value');
      props = addUxPinBindAnnotation(props, 'value', 'onSegmentedControlChange', 'value');
    } else if (component === 'p-tabs-bar') {
      props = addUxPinBindAnnotation(props, 'activeTabIndex', 'onUpdate', 'activeTabIndex');
      props = addUxPinBindAnnotation(props, 'activeTabIndex', 'onTabChange', 'activeTabIndex');
    }

    // add spacing props to every component
    const spacings = this.spacingProps.map((x) => `${x}?: Spacing;`).join('\n  ');
    const htmlAttributesType = this.generateHTMLAttributesType().replace(/\|/g, '\\$&');
    props = props.replace(new RegExp(`(${htmlAttributesType} & {\n)`), `$1  ${spacings}\n`);

    return props;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    let cleanedComponent = super
      .generateComponent(component, extendedProps)
      .replace(/export const P(\w+) =/, 'export const $1 =') // adjust component name to match file name
      .replace('className, ', '') // remove className from props destructuring since it is useless
      .replace(/\s+class.*/, ''); // remove class mapping via useMergedClass since it is useless

    cleanedComponent = this.insertComponentAnnotation(cleanedComponent, component);

    // destructure spacing props
    const spacings = this.spacingProps.join(', ');
    cleanedComponent = cleanedComponent.replace(/(\.\.\.rest)/, `${spacings}, $1`);

    // build inline style prop
    cleanedComponent = cleanedComponent.replace(
      /(\.\.\.rest,\n)/,
      `$1      style: getPaddingStyles({ ${spacings} }),\n`
    );

    // add default children for components that need it
    if (cleanedComponent.includes('PropsWithChildren')) {
      // components receive their component name as default
      cleanedComponent = cleanedComponent
        .replace(/(\.\.\.rest)/, `children = '${this.stripFileExtension(component)}', $1`) // set default children value in props destructuring
        .replace(/(\.\.\.rest,\n)/, '$1      children,\n'); // put destructured children into props object

      // other special treatments that need default props
      if (component === 'p-text') {
        cleanedComponent = cleanedComponent
          .replace(/(size =) 'small'/, '$1 16') // change destructured size
          .replace(', size,', ", 'inherit',") // always set inherit in propsToSync
          .replace(/(style: )(getPaddingStyles.+),/, '$1{ ...$2, fontSize: size },'); // patch inline style
      } else if (component === 'p-link' || component === 'p-link-social') {
        // set default href
        cleanedComponent = cleanedComponent.replace(/(href),(.*?PropsWithChildren)/, "$1 = '#',$2");
      } else if (component === 'p-segmented-control-item') {
        // set default value, otherwise validation will throw an error
        cleanedComponent = cleanedComponent.replace(/(, value),/, "$1 = 'value',");
      } else if (component === 'p-text-field-wrapper') {
        cleanedComponent = cleanedComponent
          .replace(/(\.\.\.rest)/, 'isWithinForm, onFormSubmit, $1') // destructure custom props
          .replace(
            // patch jsx to wrap component in form
            /(<WebComponentTag {...props} \/>)/,
            `isWithinForm ? (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit && onFormSubmit();
        }}
      >
        $1
      </form>
    ) : (
      $1
    )`
          );
      }
    } else if (component === 'p-toast') {
      cleanedComponent = cleanedComponent
        .replace(/(\.\.\.rest)/, "text, state = 'info', $1") // destructure custom props
        .replace(
          // integrate toast manager hook and call addMessage based on custom 'text' and 'state' props
          /((const propsToSync =)|(useBrowserLayoutEffect\(\(\) =>))/,
          `const { addMessage } = useToastManager();
    const messageObject = { text, state };
    useBrowserLayoutEffect(() => {
      messageObject.text && addMessage(messageObject);
    }, [messageObject]);

    $1`
        )
        .replace(/(style: )(getPaddingStyles.+),/, '$1{ ...$2, minWidth: 100, minHeight: 50 },'); // patch inline style
    }

    const removeDestructuredProp = (component: string, prop: string): string => {
      return component.replace(new RegExp(`('?${prop}'?(?: = [A-z'-]+)?(?:, )?)`, 'g'), '');
    };

    // remove destructured props
    if (component === 'p-button' || component === 'p-button-pure') {
      cleanedComponent = removeDestructuredProp(cleanedComponent, 'type');
    } else if (component === 'p-marque') {
      cleanedComponent = removeDestructuredProp(cleanedComponent, 'href');
      cleanedComponent = removeDestructuredProp(cleanedComponent, 'target');
    }

    // cast BreakpointCustomizable default prop values to any because BreakpointCustomizable types are removed for uxpin
    extendedProps
      .filter((prop) => prop.isDefaultValueComplex && prop.defaultValue.match(/\bbase\b/))
      .forEach((prop) => {
        cleanedComponent = cleanedComponent.replace(new RegExp(`${prop.key} = ${prop.defaultValue}`), '$& as any');
      });

    return cleanedComponent;
  }

  public shouldGenerateFolderPerComponent(component: TagName): boolean {
    switch (component) {
      case 'p-accordion':
      case 'p-button-group':
      case 'p-button-tile':
      case 'p-checkbox-wrapper':
      case 'p-fieldset':
      case 'p-link-tile':
      case 'p-link-tile-model-signature':
      case 'p-modal':
      case 'p-radio-button-wrapper':
      case 'p-segmented-control':
      case 'p-select-wrapper':
      case 'p-stepper-horizontal':
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

    const componentsWithPresetChildrenMap: {
      [key in TagName]?: {
        props?: PresetsProps;
        children?: string;
        formComponent?: { name: FormComponentName; extraProps: PresetsProps };
      };
    } = {
      'p-accordion': {
        props: { heading: 'Heading' },
        children: '<Text uxpId="accordion-text" children="Content" />',
      },
      'p-button-group': {
        children: [
          '<Button variant="primary" uxpId="button-primary" />',
          '<Button variant="secondary" uxpId="button-secondary" />',
        ].join(glue),
      },
      'p-button-tile': {
        props: { label: 'Some label', description: 'Some description' },
        children: '<DummyImg uxpId="dummy-img" />',
      },
      'p-checkbox-wrapper': {
        props: { label: 'CheckboxWrapper' },
        children: '<DummyCheckbox uxpId="dummy-checkbox" />',
        formComponent: {
          name: 'Checkbox',
          extraProps: { label: 'My Checkbox', checked: true },
        },
      },
      'p-fieldset': {
        props: { label: 'Fieldset' },
      },
      'p-link-tile': {
        props: { label: 'Some label', description: 'Some description' },
        children: '<DummyImg uxpId="dummy-img" />',
      },
      'p-link-tile-model-signature': {
        props: { heading: 'Some heading' },
        children: [
          '<DummyImg uxpId="dummy-img" />',
          '<Link slot="primary" variant="primary" theme="dark" href="#" uxpId="link-primary">Some link</Link>', // we need to set variant and theme props for uxpin editor to display the right config
          '<Link slot="secondary" variant="secondary" theme="dark" href="#" uxpId="link-secondary">Some link</Link>', // we need to set variant and theme props for uxpin editor to display the right config
        ].join(glue),
      },
      'p-modal': {
        props: { heading: 'Heading', open: true },
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
        props: { label: 'RadioButtonWrapper' },
        children: '<DummyRadioButton uxpId="dummy-radio-button" />',
        formComponent: {
          name: 'RadioButton',
          extraProps: { label: 'My RadioButton', checked: true },
        },
      },
      'p-segmented-control': {
        props: { value: 1 },
        children: Array.from(Array(3))
          .map(
            (_, i) =>
              `<SegmentedControlItem uxpId="segmented-control-item-${i + 1}" value="${i + 1}" children="Value ${
                i + 1
              }" />`
          )
          .join(glue),
      },
      'p-select-wrapper': {
        props: { label: 'SelectWrapper' },
        children:
          '<DummySelect uxpId="dummy-select" options={Array.from(Array(3)).map((_, i) => `Option ${i + 1}`)} />',
        formComponent: {
          name: 'Select',
          extraProps: { label: 'My Select', options: ['Option 1', 'Option 2', 'Option 3'] },
        },
      },
      'p-stepper-horizontal': {
        children: [
          '<StepperHorizontalItem uxpId="stepper-horizontal-step-1" state="current">Enter personal details</StepperHorizontalItem>',
          '<StepperHorizontalItem uxpId="stepper-horizontal-step-2">Confirm e-mail</StepperHorizontalItem>',
          '<StepperHorizontalItem uxpId="stepper-horizontal-step-3">Set password</StepperHorizontalItem>',
        ].join(glue),
      },
      'p-text-field-wrapper': {
        props: { label: 'TextFieldWrapper' },
        children: '<DummyTextField uxpId="dummy-text-field" />',
        formComponent: {
          name: 'TextField',
          extraProps: { label: 'My TextField' },
        },
      },
      'p-textarea-wrapper': {
        props: { label: 'TextareaWrapper' },
        children: '<DummyTextarea uxpId="dummy-textarea" />',
        formComponent: {
          name: 'Textarea',
          extraProps: { label: 'My Textarea' },
        },
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
        props: { activeTabIndex: 0 },
        children: Array.from(Array(2))
          .map((_, i) => `<TabsItem label="Tab ${i + 1}" uxpId="tabs-item-${i + 1}" children="Content ${i + 1}" />`)
          .join(glue),
      },
      'p-tabs-bar': {
        props: { activeTabIndex: 0 },
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

    const componentPresetFiles: AdditionalFile[] = Object.entries(componentsWithPresetChildrenMap).reduce(
      (acc, [component, { props, children = '', formComponent }]) => {
        const mainPresetsFile = this.generateMainComponentPreset(component as TagName, props, children);

        const formPresetsFile =
          formComponent &&
          this.generateFormComponentPreset(component as TagName, formComponent.name, formComponent.extraProps);

        return [...acc, ...([mainPresetsFile, formPresetsFile].filter((x) => x) as AdditionalFile[])];
      },
      [] as AdditionalFile[]
    );

    const configFile = this.generateUXPinConfigFile();

    return [...componentPresetFiles, configFile];
  }

  // Component declaration can be preceded by JSDoc comments
  // to customize the behavior in UXPin Editor or Preview (E.g.: render in a React Portal)
  // https://www.uxpin.com/docs/merge/adjusting-components/
  private insertComponentAnnotation(cleanedComponent: string, component: TagName): string {
    const comments = this.getAllComponentComments(component);
    if (comments.length) {
      const annotations = `/**
${comments.join(`\n`)}
*/
`;
      return annotations + cleanedComponent;
    } else {
      return cleanedComponent;
    }
  }

  private getAllComponentComments(component: TagName): string[] {
    const comments = this.shouldRenderInReactPortal(component) ? ['* @uxpinuseportal'] : [];
    return comments;
  }

  private shouldRenderInReactPortal(component: TagName): boolean {
    switch (component) {
      case 'p-modal':
      case 'p-toast':
        return true;
      default:
        return false;
    }
  }

  private generateMainComponentPreset(component: TagName, props?: PresetsProps, children?: string): AdditionalFile {
    const componentName = this.stripFileExtension(component);

    // extract other components and get rid of duplicates
    const allComponents: string[] = (children?.match(/<([A-Za-z]+)/g) || [])
      .map((x) => x.replace(/</g, ''))
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

    const stringifiedProps = getStringifiedProps({
      uxpId: paramCase(componentName),
      ...props,
    });

    const content = `${imports}

export default (
  <${componentName} ${stringifiedProps}>
    ${children}
  </${componentName}>
);`;

    return this.generatePresetsFile(componentName, content);
  }

  private generateFormComponentPreset(
    wrapperTagName: TagName,
    formComponentName: FormComponentName,
    extraProps: PresetsProps
  ): AdditionalFile {
    const { props } = getComponentMeta(wrapperTagName);
    const defaultProps = cleanComponentMetaProps(props);

    const stringifiedProps = getStringifiedProps({
      uxpId: paramCase(formComponentName),
      ...defaultProps,
      ...extraProps,
    });

    const content = `import { ${formComponentName} } from '../${formComponentName}';

export default <${formComponentName} ${stringifiedProps} />;
  `;

    return this.generatePresetsFile('../../form/' + formComponentName, content);
  }

  private generatePresetsFile(relativePath: string, content: string): AdditionalFile {
    return {
      name: '0-default.jsx',
      relativePath: relativePath + '/presets',
      content,
    };
  }

  private generateUXPinConfigFile(): AdditionalFile {
    const componentsBasePath = 'src/lib/components/';
    const componentPaths = this.relevantComponentTagNames
      .map((component) => {
        const componentSubDir = this.shouldGenerateFolderPerComponent(component)
          ? this.stripFileExtension(component) + '/'
          : '';
        const fileName = this.getComponentFileName(component);
        return `${componentsBasePath}${componentSubDir}${fileName}`;
      })
      .map((path) => `'${path}'`)
      .join(',\n          ');

    const content = `module.exports = {
  components: {
    pageHeadTags: require("@porsche-design-system/components-js/partials").getInitialStyles(),
    categories: [
      {
        name: 'Uncategorized',
        include: [
          ${componentPaths}
        ],
      },
      {
        name: 'Form components',
        include: ['src/form/*/*.tsx'],
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

    return { name: 'uxpin.config.js', relativePath: '../../..', content };
  }
}

function getStringifiedProps(props: PresetsProps): string {
  return Object.entries(props)
    .map(([key, value]) => `${key}=${wrapAttributeWithDelimiter(value)}`)
    .join(' ');
}

function wrapAttributeWithDelimiter(attribute: string | number | boolean | string[] | object | null): string {
  if (typeof attribute === 'string') {
    return `"` + attribute + `"`;
  } else {
    return '{' + JSON.stringify(attribute) + '}';
  }
}

function cleanComponentMetaProps(props: ReturnType<typeof getComponentMeta>['props']): PresetsProps {
  return Object.entries(props || {}).reduce((result, [prop, value]) => {
    return value !== null ? { ...result, [prop]: value } : result; // filter out `null` values that trigger errors in UXPin editor
  }, {} as PresetsProps);
}
