import { ComponentMeta, PropMeta, getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { kebabCase, pascalCase } from 'change-case';
import type { AdditionalFile } from './AbstractWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';

type PresetsProps = { [key: string]: number | string | boolean | string[] | object | null };

type FormComponentName = 'Checkbox' | 'RadioButton' | 'SelectWrapperDummy' | 'TextField' | 'Textarea'; // the 5 form components created "manually" in uxpin-wrapper project

const addNestedIndentation = (x: string): string => `  ${x}`;

export class UXPinReactWrapperGenerator extends ReactWrapperGenerator {
  protected projectDir = 'uxpin-wrapper';
  protected hiddenComponents: TagName[] = [];

  constructor() {
    super();
    this.ignoreComponents = [
      ...this.ignoreComponents,
      'p-canvas',
      'p-checkbox-wrapper',
      'p-content-wrapper',
      'p-fieldset-wrapper',
      'p-flex',
      'p-flex-item',
      'p-drilldown',
      'p-drilldown-item',
      'p-grid',
      'p-grid-item',
      'p-headline',
      'p-link-social',
      'p-marque',
      'p-pagination',
      'p-select-wrapper',
      'p-textarea-wrapper',
    ];

    // components which should be generated and hidden in uxpin editor
    this.hiddenComponents = [
      'p-text-field-wrapper',
      'p-radio-button-wrapper',
      'p-stepper-horizontal',
      'p-stepper-horizontal-item',
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
    else if (!!component.match(/(button|link|marque|stepper-horizontal-item|tag-dismissible|crest)(?!-group)/)) {
      props = addProp(props, 'onClick?: (e: MouseEvent) => void;');
    }

    // remove BreakpointCustomizable types since designers can't use JSON
    props = props.replace(/BreakpointCustomizable<(.*)>/g, '$1');

    // hidden uxpin props which allows updating property from library level in uxpin editor
    props = addProp(
      props,
      '/** @uxpinignoreprop */ \n  uxpinOnChange: (prevValue: any, nextValue: any, propertyName: string) => void;'
    );

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
    } else if (
      component === 'p-link' ||
      component === 'p-link-pure' ||
      component === 'p-link-social' ||
      component === 'p-link-tile-product' ||
      component === 'p-crest'
    ) {
      props = addUxPinIgnorePropAnnotation(props, 'href');
      props = addUxPinIgnorePropAnnotation(props, 'target');
    } else if (component === 'p-banner') {
      props = addUxPinIgnorePropAnnotation(props, 'width');
    } else if (component === 'p-button' || component === 'p-button-pure') {
      props = addUxPinIgnorePropAnnotation(props, 'name');
      props = addUxPinIgnorePropAnnotation(props, 'value');
    } else if (component === 'p-icon') {
      props = addUxPinIgnorePropAnnotation(props, 'lazy');
    } else if (component === 'p-model-signature') {
      props = addUxPinIgnorePropAnnotation(props, 'fetchPriority');
      props = addUxPinIgnorePropAnnotation(props, 'lazy');
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
    } else if (component === 'p-select' || component === 'p-multi-select') {
      props = addUxPinBindAnnotation(props, 'value', 'onUpdate', 'value');
    }

    return props;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    let cleanedComponent = super
      .generateComponent(component, extendedProps)
      .replace(/export const P(\w+) =/, 'export const $1 =') // adjust component name to match file name
      .replace('className, ', '') // remove className from props destructuring since it is useless
      .replace(/\s+class.*/, ''); // remove class mapping via useMergedClass since it is useless

    cleanedComponent = this.insertComponentAnnotation(cleanedComponent, component);

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
            /<WebComponentTag \{\.\.\.props} \/>/,
            `isWithinForm ? (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit && onFormSubmit();
        }}
      >
        {/* @ts-ignore */}
        $&
      </form>
    ) : (
      // @ts-ignore
      $&
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

    if (component === 'p-pin-code') {
      cleanedComponent = cleanedComponent.replace(
        "useEventCallback(elementRef, 'update', onUpdate as any);",
        [
          'const eventCallback = (e:Event) => {',
          "       rest.uxpinOnChange(value, (e as CustomEvent<PinCodeUpdateEventDetail>).detail.value, 'value');",
          '       if (onUpdate) {',
          '         onUpdate(e as CustomEvent<PinCodeUpdateEventDetail>);',
          '       }',
          '    }',
          "    useEventCallback(elementRef, 'update', eventCallback);",
        ].join('\n')
      );
    }

    if (['p-flyout', 'p-modal', 'p-banner'].includes(component)) {
      cleanedComponent = cleanedComponent.replace(
        "useEventCallback(elementRef, 'dismiss', onDismiss as any);",
        [
          'const dismissCallback = (e:Event) => {',
          "       rest.uxpinOnChange(open, false, 'open');",
          '       if (onDismiss) {',
          '         onDismiss(e as CustomEvent<void>);',
          '       }',
          '    }',
          "    useEventCallback(elementRef, 'dismiss', dismissCallback);",
        ].join('\n')
      );
    }

    // make crest and link-pure anchor if onClick is defined
    if (component === 'p-crest' || component === 'p-link-pure' || component === 'p-link-tile-product') {
      cleanedComponent = cleanedComponent.replace(
        'const props = {',
        [
          '',
          'useBrowserLayoutEffect(() => {',
          '  const { current } = elementRef;',
          "  (current as any).href = rest.onClick ? '#' : undefined;",
          '}, [rest.onClick]);',
          '',
          'const props = {',
        ].join('\n    ')
      );
    }

    if (component === 'p-inline-notification') {
      cleanedComponent = cleanedComponent.replace(
        "useEventCallback(elementRef, 'dismiss', onDismiss as any);",
        [
          'const dismissCallback = (e:Event) => {',
          "       rest.uxpinOnChange(`visible`, 'hidden', 'stateIa');",
          '       if (onDismiss) {',
          '         onDismiss(e as CustomEvent<void>);',
          '       }',
          '    }',
          "    useEventCallback(elementRef, 'dismiss', dismissCallback);",
        ].join('\n')
      );
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
      case 'p-banner':
      case 'p-button-group':
      case 'p-button-tile':
      case 'p-carousel':
      case 'p-checkbox':
      case 'p-fieldset':
      case 'p-link-tile':
      case 'p-link-tile-model-signature':
      case 'p-link-tile-product':
      case 'p-multi-select':
      case 'p-modal':
      case 'p-radio-button-wrapper':
      case 'p-segmented-control':
      case 'p-select':
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
      'p-banner': {
        props: { heading: 'Heading', description: 'Description', open: true },
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
      'p-carousel': {
        props: { heading: 'Some heading' },
        children: [
          "<DummyDiv uxpId=\"dummy-div-1\" uxpinCustomStyles={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#00b0f4', height: 150 }} children=\"Slide 1\" />",
          "<DummyDiv uxpId=\"dummy-div-2\" uxpinCustomStyles={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#00b0f4', height: 150 }}  children=\"Slide 2\" />",
          "<DummyDiv uxpId=\"dummy-div-3\" uxpinCustomStyles={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#00b0f4', height: 150 }}  children=\"Slide 3\" />",
          "<DummyDiv uxpId=\"dummy-div-4\" uxpinCustomStyles={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#00b0f4', height: 150 }}  children=\"Slide 4\" />",
          "<DummyDiv uxpId=\"dummy-div-5\" uxpinCustomStyles={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#00b0f4', height: 150 }}  children=\"Slide 5\" />",
        ].join(glue),
      },
      'p-checkbox': {
        props: { label: 'label' },
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
      'p-link-tile-product': {
        props: { label: 'Some label', description: 'Some description', heading: 'Weekender', price: '1.911,00 €' },
        children: '<DummyImg uxpId="dummy-img" src="https://designsystem.porsche.com/v3/assets/weekender.webp" />',
      },
      'p-multi-select': {
        props: { name: 'options', label: 'Some Label' },
        children: [
          '<Optgroup uxpId="group-1" label="Some optgroup label 1">',
          ' <MultiSelectOption uxpId="opt-1" value="a">Option A</MultiSelectOption>',
          ' <MultiSelectOption uxpId="opt-2" value="b">Option B</MultiSelectOption>',
          ' <MultiSelectOption uxpId="opt-3" value="c">Option C</MultiSelectOption>',
          ' <MultiSelectOption uxpId="opt-4" value="d">Option D</MultiSelectOption>',
          ' <MultiSelectOption uxpId="opt-5" value="e">Option E</MultiSelectOption>',
          ' <MultiSelectOption uxpId="opt-6" value="f">Option F</MultiSelectOption>',
          '</Optgroup>',
          '<Optgroup uxpId="group-3" label="Some optgroup label 2">',
          ' <MultiSelectOption uxpId="opt-7"  value="g">Option G</MultiSelectOption>',
          ' <MultiSelectOption uxpId="opt-8"  value="h">Option H</MultiSelectOption>',
          ' <MultiSelectOption uxpId="opt-9"  value="i">Option I</MultiSelectOption>',
          '</Optgroup>',
        ].join(glue),
      },
      'p-modal': {
        props: { heading: 'Heading', open: true },
        children: [
          '<Text uxpId="modal-text">Some Content</Text>',
          '<ButtonGroup slot="footer" uxpId="modal-button-group" >',
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
      'p-select': {
        props: { name: 'options', label: 'Some Label', description: 'Some description', value: 'a' },
        children: [
          '<SelectOption uxpId="opt-1" value="a">Option A</SelectOption>',
          '<SelectOption uxpId="opt-2" value="b">Option B</SelectOption>',
          '<SelectOption uxpId="opt-3" value="c">Option C</SelectOption>',
        ].join(glue),
      },
      'p-select-wrapper': {
        props: { label: 'SelectWrapper' },
        children:
          '<DummySelect uxpId="dummy-select" options={Array.from(Array(3)).map((_, i) => `Option ${i + 1}`)} />',
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
  // https://uxpin.com/docs/merge/adjusting-components/
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
      uxpId: kebabCase(componentName),
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
    const { propsMeta } = getComponentMeta(wrapperTagName);
    const defaultProps = cleanComponentMetaProps(propsMeta);

    const stringifiedProps = getStringifiedProps({
      uxpId: kebabCase(formComponentName),
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
    const uxpinComponents = [
      `'src/form/RadioButton/RadioButton.tsx'`,
      `'src/form/TextField/TextField.tsx'`,
      `'src/wrappers/StepperHorizontal/StepperHorizontal.tsx'`,
      `'src/wrappers/StepperHorizontalItem.tsx'`,
    ];
    const componentPaths = [
      ...this.relevantComponentTagNames
        .filter((component) => !this.hiddenComponents.includes(component))
        .map((component) => {
          const componentSubDir = this.shouldGenerateFolderPerComponent(component)
            ? this.stripFileExtension(component) + '/'
            : '';
          const fileName = this.getComponentFileName(component);
          return `${componentsBasePath}${componentSubDir}${fileName}`;
        })
        .map((path) => `'${path}'`),
      ...uxpinComponents,
    ]
      .sort((componentA, componentB) =>
        componentA.split('/').pop().toLowerCase().localeCompare(componentB.split('/').pop().toLowerCase())
      )
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
        name: 'Dummy',
        include: [
         'src/dummy/DummyButton.tsx',
         'src/dummy/DummyImg.tsx',
         'src/dummy/DummyLink.tsx',
         'src/dummy/DummySpan.tsx',
         'src/dummy/DummyDiv.tsx'
        ],
      },
    ],
    wrapper: 'src/UXPinWrapper.tsx',
    webpackConfig: 'webpack.config.js',
  },
  name: 'Porsche Design System',
  settings: {
    useUXPinProps: true,
    useFitToContentAsDefault: true,
    propertyConfigurations: {
      Flyout: {
        open: { disabled: true, context: 'canvas', value: false, },
      },
      Modal: {
        open: { disabled: true, context: 'canvas', value: false },
      }
    }
  },
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

function cleanComponentMetaProps(props: ComponentMeta['propsMeta']): PresetsProps {
  return Object.entries(props || {}).reduce((result, [prop, value]) => {
    return value.defaultValue !== null ? { ...result, [prop]: value.defaultValue } : result; // filter out `null` values that trigger errors in UXPin editor
  }, {} as PresetsProps);
}
