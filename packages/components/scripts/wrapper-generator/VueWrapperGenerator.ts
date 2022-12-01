import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import type { TagName } from '@porsche-design-system/shared';
import type { ExtendedProp } from './DataStructureBuilder';
import { pascalCase } from 'change-case';

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
    const genericType = this.inputParser.hasGeneric(component) ? '<T>' : '';
    const propsName = this.generatePropsName(component) + genericType;

    // TODO: improve formatting?
    return `  export type ${propsName} = ${rawComponentInterface.replace(/\n/g, '\n  ').replace('};', '  };')};`;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const propsName = this.generatePropsName(component);

    // TODO: should be improved, also formatting
    const defaultPropsWithValue = extendedProps
      .map(({ key, defaultValue, isEvent }) =>
        !(isEvent || defaultValue === undefined) ? ` ${key}: ${defaultValue}` : undefined
      )
      .filter((x) => x);

    return `  const WebComponentTag = usePrefix('${component}');

  const props = withDefaults(defineProps<${propsName}>(), {${defaultPropsWithValue} });
  const pdsComponentRef = ref<${propsName}>({});

  onMounted(() => {
    syncProperties(props, pdsComponentRef.value);
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
