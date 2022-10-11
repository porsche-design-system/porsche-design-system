import type { TagName } from '@porsche-design-system/shared';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';
import type { SkeletonProps } from './AbstractWrapperGenerator';
import { pascalCase, paramCase } from 'change-case';

export class NextJsReactWrapperGenerator extends ReactWrapperGenerator {
  protected projectDir = 'components-wrapper';

  public generateImports(
    component: TagName,
    extendedProps: ExtendedProp[],
    nonPrimitiveTypes: string[],
    hasSkeleton?: boolean
  ): string {
    let imports = super.generateImports(component, extendedProps, nonPrimitiveTypes, hasSkeleton);
    const ssrComponentName = this.getSsrComponentName(component);
    imports += `\nimport { ${ssrComponentName} } from '../components-stencil/${paramCase(ssrComponentName)}';`;

    return imports;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[], skeletonProps: SkeletonProps): string {
    let tweakedComponent = super.generateComponent(component, extendedProps, skeletonProps);

    // destructure children prop
    tweakedComponent = tweakedComponent.replace(/\.\.\.rest/, `children, $&`);

    const hasChildren = this.inputParser.canHaveChildren(component);

    // add props
    const propsToSync = extendedProps.filter(({ isEvent }) => !isEvent);
    const spreadProps = propsToSync.map(({ key }) => key).join(', ');
    tweakedComponent = tweakedComponent.replace(
      /\.\.\.rest,\n/,
      `$&      // @ts-ignore
      ...(!process.browser
      ? {
          children: (
            <${this.getSsrComponentName(component)}
              {...{ ${spreadProps ? `${spreadProps} , ` : ''}${hasChildren ? 'children' : ''} }}
            />
          ),
        }
      : { children }),
`
    );

    return tweakedComponent;
  }

  private getSsrComponentName(component: TagName): string {
    return pascalCase(component.slice(2));
  }
}
