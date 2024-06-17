<template>
  <div>
    <div v-for="[key, value] in Object.entries(componentProps)" :key="key">
      <p-select
        :id="key"
        :label="key"
        :value="
          componentProps[key].selectedValue === undefined ? value.defaultValue : componentProps[key].selectedValue
        "
        @update="onUpdateProps($event, key)"
        :theme="$store.getters.storefrontTheme"
      >
        <p-select-option
          v-if="value.allowedValues === 'boolean'"
          v-for="option in ['true', 'false']"
          :key="option"
          :value="option"
        >
          {{ option }}{{ `${value.defaultValue}` === option ? ' (default)' : '' }}
        </p-select-option>
        <p-select-option
          v-if="Array.isArray(value.allowedValues)"
          v-for="option in value.allowedValues"
          :key="option"
          :value="option"
        >
          {{ option }}{{ value.defaultValue == option ? ' (default)' : '' }}
        </p-select-option>
      </p-select>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import type { ComponentProps } from '@/utils/componentProps';

  @Component({})
  export default class ConfiguratorProps extends Vue {
    @Prop() public componentProps!: ComponentProps;

    onUpdateProps(e: any, key: string) {
      this.$emit('update', { key, value: e.detail.value });
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @import '../styles/internal.variables';
</style>
