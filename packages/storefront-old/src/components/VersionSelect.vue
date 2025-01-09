<template>
  <label>
    <p-heading :theme="$store.getters.storefrontTheme" size="small">Porsche Design System</p-heading>
    <select v-model="version" v-on:change="onVersionChange" aria-label="Switch Porsche Design System version">
      <option v-for="option in versionOptions" :key="option" :value="option">{{ option }}</option>
    </select>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  components: {},
})
export default class VersionSelect extends Vue {
  public version = 'v3';
  public versionOptions: string[] = ['v3', 'v2', 'v1'];

  public onVersionChange = (event: Event): void => {
    window.location.href = `https://designsystem.porsche.com/${(event.target as HTMLInputElement).value}`;
  };
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  label {
    display: flex;
    flex-wrap: wrap;
    gap: $pds-spacing-static-small;
    align-items: center;
  }

  select {
    @include pds-text-x-small;
    & {
      @include pds-focus;
    }
    & {
      -webkit-appearance: none;
      appearance: none;
      border: 0;
      padding: $pds-spacing-static-x-small $pds-spacing-static-small;
      cursor: pointer;
      box-sizing: content-box;
      border-radius: $pds-border-radius-small;
      background: var(--theme-state-hover);
      color: var(--theme-primary);
    }
  }
</style>
