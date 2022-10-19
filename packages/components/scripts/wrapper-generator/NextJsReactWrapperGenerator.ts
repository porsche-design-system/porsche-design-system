import type { TagName } from '@porsche-design-system/shared';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';
import { pascalCase, paramCase } from 'change-case';

export class NextJsReactWrapperGenerator extends ReactWrapperGenerator {
  protected projectDir = 'react-ssr-wrapper';

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    let imports = super.generateImports(component, extendedProps, nonPrimitiveTypes);
    const ssrComponentName = this.getSsrComponentName(component);
    imports += `\nimport { ${ssrComponentName} } from '../dsr-components/${paramCase(
      ssrComponentName.replace('DSR', '')
    )}';`;

    return imports;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    let tweakedComponent = super.generateComponent(component, extendedProps);
    const hasChildren = this.inputParser.canHaveChildren(component);

    // destructure children prop
    if (hasChildren) {
      tweakedComponent = tweakedComponent.replace(/\.\.\.rest/, `children, $&`);
    }

    // add hydrated class
    tweakedComponent = tweakedComponent.replace(
      /const props = \{/,
      `// @ts-ignore
    if (!process.browser) {
      className = className ? \`\${className} hydrated\` : 'hydrated';
    }

    $&`
    );

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
        : {
            ${hasChildren ? 'children,\n            ' : ''}suppressHydrationWarning: true,
          }),
`
    );

    return tweakedComponent;
  }

  private getSsrComponentName(component: TagName): string {
    return 'DSR' + pascalCase(component.slice(2));
  }
}
