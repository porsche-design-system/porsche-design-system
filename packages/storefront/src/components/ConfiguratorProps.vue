<template>
  <div>
    <div v-for="[key, value] in Object.entries(configuratorProps)" :key="key">
      <p-select
        :id="key"
        :label="key"
        :value="appliedProps[key] === undefined ? value.defaultValue : appliedProps[key]"
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
  import type { PropMeta } from '@porsche-design-system/component-meta';
  import { TagName } from '@porsche-design-system/shared';
  import { getComponentProps } from '@/utils/componentProps';

  @Component({})
  export default class ConfiguratorProps extends Vue {
    @Prop() public component!: TagName;

    configuratorProps: { [x: string]: PropMeta } = {};

    // Props which will be applied to the rendered component and displayed code
    appliedProps: { [x: string]: any } = {};

    created() {
      this.configuratorProps = getComponentProps(this.component);

      // TODO: Populate required default values which are null
      // Initially set applied props to undefined or specify custom default value
      Object.entries(this.configuratorProps).forEach(([key]) => {
        this.appliedProps[key] = undefined;
      });
    }

    onUpdateProps(e: any, key: string) {
      // If the selected value is not the default apply it
      if (this.configuratorProps[key].defaultValue === e.detail.value) {
        this.appliedProps[key] = undefined;
      } else {
        this.appliedProps[key] = e.detail.value;
      }

      this.$emit('update', this.appliedProps);
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @import '../styles/internal.variables';
</style>
