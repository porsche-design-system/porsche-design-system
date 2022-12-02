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

  public generateProps(component: TagName, rawComponentInterface: string): string {
    // TODO: Is it needed to support generic type here? there is no component so far with a generic type i think?
    // const genericType = this.inputParser.hasGeneric(component) ? '<T>' : '';
    const propsName = this.generatePropsName(component);

    return `  export interface ${propsName} extends HTMLElement ${rawComponentInterface
      .replace(/\n/g, '\n  ') // Add spaces because it is inside a <script> tag
      .replace('};', '  }')}`; // Add spaces and remove unnecessary semicolon
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const propsName = this.generatePropsName(component);
    const eventNames = extendedProps
      .filter(({ isEvent }) => isEvent)
      .map(({ key, rawValueType }) => ({ eventName: camelCase(key.replace('on', '')), type: /<(\w+)>/.exec(rawValueType)![1] }));
    
    const defaultPropsWithValue = extendedProps
      .map(({ key, defaultValue, isEvent }) =>
        !(isEvent || defaultValue === undefined) ? ` ${key}: ${defaultValue}` : undefined
      )
      .filter((x) => x);

    return `  const WebComponentTag = usePrefix('${component}');

  const props = withDefaults(defineProps<${propsName}>(), {${defaultPropsWithValue} });
  const pdsComponentRef = ref<${propsName}>({} as ${propsName});${
      eventNames.length
        ? eventNames.map(({ eventName, type }) => {
            const value = '';

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

  private generatePropsName(component: TagName): string {
    return `${pascalCase(component)}Props`;
  }
}
