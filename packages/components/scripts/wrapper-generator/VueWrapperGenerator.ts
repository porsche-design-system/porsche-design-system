import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import { componentMeta } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import type { ExtendedProp } from './DataStructureBuilder';
import { camelCase, pascalCase } from 'change-case';

export class VueWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-vue';
  protected projectDir = 'vue-wrapper';

  public getComponentFileName(component: TagName): string {
    return `${pascalCase(component.replace('p-', ''))}Wrapper.vue`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);
    const hasProps = componentMeta[component].props;

    const vueImports = ['ref', ...(hasProps ? ['onMounted', 'onUpdated'] : [])];
    const importsFromVue = `import { ${vueImports.join(', ')} } from 'vue';`;

    const utilsImports = [
      'getPrefixedTagName',
      ...(hasProps ? ['syncProperties'] : []),
      ...(hasEventProps ? ['addEventListenerToElementRef'] : []),
    ];
    const importsFromUtils = `import { ${utilsImports.join(', ')} } from '../../utils';`;

    const importsFromTypes = nonPrimitiveTypes.length
      ? `import type { ${nonPrimitiveTypes.join(', ')} } from '../types';`
      : '';

    return `<script setup lang="ts">
  ${[importsFromVue, importsFromUtils, importsFromTypes].filter((x) => x).join('\n  ')}`;
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    const propsName = this.generatePropsName(component);

    return componentMeta[component].props
      ? `  type ${propsName} = ${rawComponentInterface
          .replace(
            /\n\s+\/\*\*\n[\s\w*.]+\s+\*\/\n\s+on[A-Z].+;/g, // Remove event prop and description
            ''
          )
          .replace(/\n/g, '\n  ') // Add spaces because it is inside a <script> tag
          .replace('};', '  }')}` // Add spaces and remove unnecessary semicolon
      : '';
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const propsName = this.generatePropsName(component);
    const eventNamesAndTypes = extendedProps
      .filter(({ isEvent }) => isEvent)
      .map(({ key, rawValueType }) => ({
        eventName: camelCase(key.replace('on', '')),
        type: /<(\w+)>/.exec(rawValueType)![1],
      }));
    const hasEvent = componentMeta[component].hasEvent;
    const hasProps = componentMeta[component].props;

    const defaultPropsWithValue = extendedProps
      .map(({ key, defaultValue, isEvent }) =>
        !(isEvent || defaultValue === undefined) ? `${key}: ${defaultValue}` : undefined
      )
      .filter((x) => x)
      .join(', ');

    const syncProperties = 'syncProperties(pdsComponentRef.value!, props);';
    const defineProps = `defineProps<${propsName}>()`;

    return `  const webComponentTag = getPrefixedTagName('${component}');
${
  hasProps
    ? `
  const props = ${
     defaultPropsWithValue.length ? `withDefaults(${defineProps}, { ${defaultPropsWithValue} })` : defineProps
   };`
    : ''
}
  const pdsComponentRef = ref<${hasProps ? `${propsName} & HTMLElement` : 'HTMLElement'}>();${
      hasEvent
        ? `
  const emit = defineEmits<{ ${eventNamesAndTypes
    .map(({ eventName, type }) => `(e: '${eventName}', value: ${type}): void;`)
    .join(' ')} }>();`
        : ''
    }${
      hasProps
        ? `

  onMounted(() => {
    ${syncProperties}${
            hasEvent
              ? eventNamesAndTypes
                  .map(
                    ({ eventName }) => `
    addEventListenerToElementRef(pdsComponentRef.value!, '${eventName}', emit);`
                  )
                  .join('')
              : ''
          }
  });

  onUpdated(() => {
    ${syncProperties}
  });`
        : ''
    }
</script>

<template>
  <component :is="webComponentTag" ref="pdsComponentRef"><slot /></component>
</template>`;
  }

  public getBarrelFileContent(componentFileNameWithoutExtension: string, componentSubDir: string): string {
    return `export { default as P${pascalCase(componentFileNameWithoutExtension.replace('Wrapper', ''))} } from './${
      componentSubDir ? componentSubDir + '/' : ''
    }${componentFileNameWithoutExtension}.vue';`;
  }

  private generatePropsName(component: TagName): string {
    return `${pascalCase(component)}Props`;
  }
}
