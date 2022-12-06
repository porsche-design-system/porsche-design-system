import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import type { TagName } from '@porsche-design-system/shared';
import type { ExtendedProp } from './DataStructureBuilder';
import { camelCase, pascalCase } from 'change-case';

export class VueWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-vue';
  protected projectDir = 'vue-wrapper';

  public getComponentFileName(component: TagName): string {
    return `${component.replace('p-', '')}.wrapper.vue`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);

    const vueImports = ['onMounted', 'onUpdated', 'ref'];
    const importsFromVue = `import { ${vueImports.join(', ')} } from 'vue';`;

    const utilsImports = ['usePrefix', 'syncProperties', ...(hasEventProps ? ['addEventListenerToElementRef'] : [])];
    const importsFromUtils = `import { ${utilsImports.join(', ')} } from '../../utils';`;

    const importsFromTypes = nonPrimitiveTypes.length
      ? `import type { ${nonPrimitiveTypes.join(', ')} } from '../types';`
      : '';

    return `<script setup lang="ts">
  ${[importsFromVue, importsFromUtils, importsFromTypes].filter((x) => x).join('\n  ')}`;
  }

  //TODO: remove with defaults if no defaults are present
  //TODO: solution for multiple events
  //TODO: remove event props

  public generateProps(component: TagName, rawComponentInterface: string): string {
    const propsName = this.generatePropsName(component);

    // TODO: Use type as soon as imported Properties are supported https://github.com/vuejs/core/issues/4294
    return `  type ${propsName} = ${rawComponentInterface
      .replace(/\n/g, '\n  ') // Add spaces because it is inside a <script> tag
      .replace('};', '  }')}`; // Add spaces and remove unnecessary semicolon
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const propsName = this.generatePropsName(component);
    const eventNames = extendedProps
      .filter(({ isEvent }) => isEvent)
      .map(({ key, rawValueType }) => ({
        eventName: camelCase(key.replace('on', '')),
        type: /<(\w+)>/.exec(rawValueType)![1],
      }));

    const defaultPropsWithValue = extendedProps
      .map(({ key, defaultValue, isEvent }) =>
        !(isEvent || defaultValue === undefined) ? ` ${key}: ${defaultValue}` : undefined
      )
      .filter((x) => x);

    return `  const WebComponentTag = usePrefix('${component}');

  const props = withDefaults(defineProps<${propsName}>(), {${defaultPropsWithValue} });
  const pdsComponentRef = ref<${propsName} & Partial<HTMLElement>>();${
      eventNames.length
        ? eventNames.map(({ eventName, type }) => {
            return `
  const emit = defineEmits<{ (e: '${eventName}', value: ${type}): void }>();`;
          })
        : ''
    }

  onMounted(() => {
    syncProperties(props, pdsComponentRef.value);${
      eventNames.length
        ? eventNames.map(
            ({ eventName }) => `
    addEventListenerToElementRef(pdsComponentRef.value, '${eventName}', emit)`
          )
        : ''
    }
  });

  onUpdated(() => {
    syncProperties(props, pdsComponentRef.value);
  });
</script>

<template>
  <WebComponentTag ref="pdsComponentRef"><slot /></WebComponentTag>
</template>`;
  }

  public getBarrelFileContent(componentFileNameWithoutExtension: string, componentSubDir: string): string {
    return `export { default as P${pascalCase(componentFileNameWithoutExtension.replace('.wrapper', ''))} } from './${
      componentSubDir ? componentSubDir + '/' : ''
    }${componentFileNameWithoutExtension}.vue';`;
  }

  private generatePropsName(component: TagName): string {
    return `${pascalCase(component)}Props`;
  }
}
