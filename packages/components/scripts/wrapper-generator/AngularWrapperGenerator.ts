import type { TagName } from '@porsche-design-system/shared';
import { camelCase, pascalCase } from 'change-case';
import { AbstractWrapperGenerator, SkeletonProps } from './AbstractWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';

export class AngularWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-angular';

  // ngc with { enableIvy: false } can't handle index.ts barrel files 🤷‍♂️
  // https://github.com/ng-packagr/ng-packagr/issues/1013#issuecomment-424877378
  protected barrelFileName = 'barrel.ts';

  public getComponentFileName(component: TagName, withOutExtension?: boolean): string {
    return `${component.replace('p-', '')}.wrapper${withOutExtension ? '' : '.ts'}`;
  }

  public generateImports(
    component: TagName,
    extendedProps: ExtendedProp[],
    nonPrimitiveTypes: string[],
    hasSkeleton: boolean
  ): string {
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);

    const angularImports = [
      'ChangeDetectionStrategy',
      'ChangeDetectorRef',
      'Component',
      'ElementRef',
      ...(hasEventProps ? ['EventEmitter'] : []),
      'NgZone',
      ...(hasSkeleton ? ['Inject', 'OnInit'] : []),
    ];
    const importsFromAngular = `import { ${angularImports.join(', ')} } from '@angular/core';`;

    const importsFromComponentsWrapperModule = hasSkeleton
      ? `import { USES_SKELETONS } from '../../skeleton-helper' `
      : '';

    const providerImports = ['ProxyCmp', ...(hasEventProps ? ['proxyOutputs'] : [])];
    const importsFromProvider = `import { ${providerImports.join(', ')} } from '../../utils';`;

    const typesImports = nonPrimitiveTypes.filter((type) => !type.match(/P[a-z|A-Z]*CustomEvent/));
    const importsFromTypes = typesImports.length ? `import type { ${typesImports.join(', ')} } from '../types';` : '';

    return [importsFromAngular, importsFromProvider, importsFromTypes, importsFromComponentsWrapperModule]
      .filter((x) => x)
      .join('\n');
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    return '';
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[], skeletonProps: SkeletonProps): string {
    const inputProps = extendedProps.filter(({ isEvent }) => !isEvent);
    const outputProps = extendedProps
      .filter(({ isEvent }) => isEvent)
      .map((x) => ({ ...x, key: camelCase(x.key.substr(2)) }));

    const inputs = inputProps.length
      ? `const inputs: string[] = [${inputProps.map(({ key }) => `'${key}'`).join(', ')}];`
      : '';
    const outputs = outputProps.length
      ? `const outputs: string[] = [${outputProps.map(({ key }) => `'${key}'`).join(', ')}];`
      : '';

    const inputsAndOutputs = [inputs, outputs].filter((x) => x).join('\n');
    const decoratorOpts = (inputs ? ['inputs'] : []).filter((x) => x).join('\n');

    const componentOpts = [
      `selector: '${component},[${component}]'`,
      'changeDetection: ChangeDetectionStrategy.OnPush',
      `template: '<ng-content></ng-content>'`,
      ...(inputs ? ['inputs'] : []),
      ...(outputs ? ['outputs'] : []),
    ]
      .filter((x) => x)
      .join(',\n  ');

    const classMembers = [
      'protected el: HTMLElement;',
      ...inputProps.map((x) => `${x.key}: ${x.rawValueType};`),
      ...outputProps.map((x) => `${x.key}!: EventEmitter<CustomEvent<${x.rawValueType.match(/<(.*?)>/)?.[1]}>>;`),
    ].join('\n  ');

    const hasSkeleton = !!skeletonProps.length;

    const skeletonsOnInit = hasSkeleton
      ? `
  ngOnInit() {
    if (this.usesSkeletons) {
      this.el.classList.add(...[${this.getSkeletonClassNames(skeletonProps)
        .map((skeletonClass) => {
          return skeletonClass
            .replace(/(\w*? && `)/, 'this.$1') // add this. to property
            .replace(/(\w*?\)\.replace)/, 'this.$1'); // add this. to property inside stringify
        })
        .join(',')}].filter((x) => x));
    }
  }`
      : '';

    const constructorCode = [
      'c.detach();',
      'this.el = r.nativeElement;',
      ...(outputs ? ['proxyOutputs(this, outputs);'] : []),
    ].join('\n    ');

    const genericType = this.inputParser.hasGeneric(component) ? '<T>' : '';
    const implementsOnInit = hasSkeleton ? ' implements OnInit' : '';
    const constructorParams = `c: ChangeDetectorRef, r: ElementRef, protected z: NgZone${
      hasSkeleton ? ', @Inject(USES_SKELETONS) public usesSkeletons: boolean' : ''
    }`;

    return `${inputsAndOutputs}

@ProxyCmp({
  ${decoratorOpts}
})
@Component({
  ${componentOpts}
})
export class ${this.generateComponentName(component)}${genericType}${implementsOnInit} {
  ${classMembers}

  constructor(${constructorParams}) {
    ${constructorCode}
  }${skeletonsOnInit}
}`;
  }

  public getAdditionalBarrelFileContent(): string {
    const componentNames = this.relevantComponentTagNames.map(this.generateComponentName);
    const imports = this.relevantComponentTagNames
      .map((cmp, idx) => `import { ${componentNames[idx]} } from './${this.getComponentFileName(cmp, true)}';`)
      .join('\n');

    const exports = `export const DECLARATIONS = [
  ${componentNames.join(',\n  ')}
];`;

    return [imports, exports].join('\n\n');
  }

  private generateComponentName(component: TagName): string {
    return pascalCase(component);
  }
}
