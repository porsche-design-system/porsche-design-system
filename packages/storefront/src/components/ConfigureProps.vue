<template>
  <div class="configurator--props">
    <div
      v-for="[key, value] in Object.entries(componentProps).filter(
        ([key, value]) => !value.isAria && key !== 'theme' && value.type !== 'string[]'
      )"
    >
      <p-select
        v-if="value.allowedValues === 'boolean' || Array.isArray(value.allowedValues)"
        :key="key"
        :id="key"
        :label="key"
        :required="componentProps[key].isRequired"
        :value="componentProps[key].selectedValue"
        @update="onUpdateProps(key, $event.detail.value)"
        :theme="theme"
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
      <p-text-field-wrapper v-if="value.allowedValues === 'string'" :label="key" :theme="theme">
        <input
          type="text"
          :name="key"
          :value="value.selectedValue || ''"
          @input="onUpdateProps(key, $event.target.value)"
          :required="componentProps[key].isRequired"
        />
      </p-text-field-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import type { ComponentProps } from '@/utils/componentProps';
  import { PlaygroundTheme } from '@/models';

  @Component({})
  export default class ConfigureProps extends Vue {
    @Prop() public componentProps!: ComponentProps;

    onUpdateProps(key: string, value: string) {
      this.$emit('update', { key, value });
    }

    public get theme(): PlaygroundTheme {
      return this.$store.getters.playgroundTheme || 'light';
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
