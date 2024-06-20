<template>
  <div class="configure-slots">
    <div v-for="{ name, isShown, description } in componentSlots.filter((slot) => slot.name)" :key="name">
      <p-checkbox-wrapper :label="name" :theme="$store.getters.storefrontTheme">
        <input type="checkbox" :name="name" :checked="isShown" @change="onUpdateSlots(name)" />
      </p-checkbox-wrapper>
      <p-text :theme="$store.getters.storefrontTheme">{{ description }}</p-text>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import type { ComponentSlots } from '@/utils/componentSlots';

  @Component({})
  export default class ConfiguratorProps extends Vue {
    @Prop() public componentSlots!: ComponentSlots;

    onUpdateSlots(key: string) {
      this.$emit('update', key);
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  .configure-slots {
    display: flex;
    flex-direction: column;
    gap: $pds-spacing-static-medium;
    & > div p-checkbox-wrapper {
      margin-bottom: $pds-spacing-static-small;
    }
  }
</style>
