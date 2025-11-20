import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { metadata } from '@porsche-design-system/storefront/src/app/layout';
import { camelCase, pascalCase } from 'change-case';
import * as path from 'path';
import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';

export class AngularWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-angular';
  protected projectDir = 'angular-wrapper';

  // ngc with { enableIvy: false } can't handle index.ts barrel files 🤷
  // https://github.com/ng-packagr/ng-packagr/issues/1013#issuecomment-424877378
  protected barrelFileName = 'barrel.ts';

  public getComponentFileName(component: TagName): string {
    return `${component.replace('p-', '')}.wrapper.ts`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);
    const hasControlValueAccessor = this.hasControlValueAccessor(component);

    const angularImports = [
      'Component',
      ...(hasEventProps ? ['EventEmitter'] : []),
      ...(hasControlValueAccessor ? ['forwardRef', 'ChangeDetectorRef', 'ElementRef', 'Renderer2'] : []),
    ].sort();
    const importsFromAngular = `import { ${angularImports.join(', ')} } from '@angular/core';`;

    const importsFromComponentsWrapperModule = '';

    const importsFromUtils = `import { BaseComponent } from '../../utils';`;

    const typesImports = nonPrimitiveTypes;
    const importsFromTypes = typesImports.length ? `import type { ${typesImports.join(', ')} } from '../types';` : '';

    const importsFromAngularForms = hasControlValueAccessor
      ? `import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';`
      : '';

    return [
      importsFromAngular,
      importsFromUtils,
      importsFromTypes,
      importsFromComponentsWrapperModule,
      importsFromAngularForms,
    ]
      .filter(Boolean)
      .join('\n');
  }

  public generateProps(_: TagName, __: string): string {
    return '';
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const inputProps = extendedProps.filter(({ isEvent }) => !isEvent);
    const outputProps = extendedProps
      .filter(({ isEvent }) => isEvent)
      .map((x) => ({ ...x, key: camelCase(x.key.substring(2)) }));

    const inputs = inputProps.length ? `[${inputProps.map(({ key }) => `'${key}'`).join(', ')}]` : '';
    const outputs = outputProps.length ? `[${outputProps.map(({ key }) => `'${key}'`).join(', ')}]` : '';

    const componentName = this.generateComponentName(component);
    const meta = getComponentMeta(component);
    const hasControlValueAccessor = this.hasControlValueAccessor(component);
    const hasInputEvent = !!Object.keys(meta.eventsMeta ?? {}).find((e) => e === 'input');

    const componentOpts = [
      `selector: '${component},[${component}]'`,
      `template: '<ng-content />'`,
      ...(inputs ? [`inputs: ${inputs}`] : []),
      ...(outputs ? [`outputs: ${outputs}`] : []),
      `standalone: false`,
      ...(hasControlValueAccessor
        ? [
            `providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ${componentName}),
      multi: true,
    },
  ]`,
            `host: {
    '(${hasInputEvent ? 'input' : 'change'})': '_onChange($event.target.${component === 'p-checkbox' ? 'checked' : 'value'})',
    '(blur)': '_onTouched()'
  }`,
          ]
        : []),
    ]
      .filter(Boolean)
      .join(',\n  ');

    const classMembers = [
      ...inputProps.map(
        (x) =>
          (x.isDeprecated ? '/** @deprecated */\n  ' : '') + `${x.key}${x.isOptional ? '?' : ''}: ${x.rawValueType};`
      ),
      ...outputProps.map(
        (x) =>
          (x.isDeprecated ? '/** @deprecated */\n  ' : '') +
          `${x.key} = new EventEmitter<CustomEvent<${x.rawValueType.match(/<(.*?)>/)?.[1]}>>();`
      ),
    ].join('\n  ');

    const genericType = this.inputParser.hasGeneric(component) ? '<T>' : '';

    const controlValueAccessor = hasControlValueAccessor ? ' implements ControlValueAccessor' : '';
    const controlValueAccessorImpl = hasControlValueAccessor
      ? `constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _cdr: ChangeDetectorRef
  ) {
    super(_cdr, _elementRef);
  }

  _onChange: (value: any) => void = () => {};
  _onTouched: () => void = () => {};

  writeValue(value: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, '${component === 'p-checkbox' ? 'checked' : 'value'}', value);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }`
      : '';

    return `${this.inputParser.getDeprecationMessage(component)}@Component({
  ${componentOpts}
})
export class ${componentName}${genericType} extends BaseComponent${controlValueAccessor} {
  ${classMembers}
  ${controlValueAccessorImpl}
}`;
  }

  public getAdditionalBarrelFileContent(): string {
    const componentNames = this.relevantComponentTagNames.map(this.generateComponentName);
    const imports = this.relevantComponentTagNames
      .map(
        (cmp, idx) => `import { ${componentNames[idx]} } from './${path.parse(this.getComponentFileName(cmp)).name}';`
      )
      .join('\n');

    const exports = `export const DECLARATIONS = [
  ${componentNames.join(',\n  ')}
];`;

    return [imports, exports].join('\n\n');
  }

  private generateComponentName(component: TagName): string {
    return pascalCase(component);
  }

  private hasControlValueAccessor(component: TagName): boolean {
    const meta = getComponentMeta(component);
    return meta.hasElementInternals && component !== 'p-button' && component !== 'p-button-pure';
  }
}
