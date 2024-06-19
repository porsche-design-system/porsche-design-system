<template>
  <div class="configurator--props">
    <p-select
      v-for="[key, value] in Object.entries(componentProps).filter(([key, value]) => !value.isAria && key !== 'theme')"
      :key="key"
      :id="key"
      :label="key"
      :value="componentProps[key].selectedValue"
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
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import type { ComponentProps } from '@/utils/componentProps';

  @Component({})
  export default class ConfigureProps extends Vue {
    @Prop() public componentProps!: ComponentProps;

    onUpdateProps(e: any, key: string) {
      this.$emit('update', { key, value: e.detail.value });
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  .configurator--props {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: $pds-spacing-fluid-small;
  }
</style>
