<template>
  <label>
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
    @include pds-focus;
    @include pds-frosted-glass;
    -webkit-appearance: none;
    appearance: none;
    border: 0;
    width: 36px;
    height: 36px;
    text-align: center;
    cursor: pointer;
    box-sizing: content-box;
    border-radius: $pds-border-radius-small;
    background: var(--theme-background-frosted);
    color: var(--theme-primary);
    transition:
      border-color #{$pds-motion-duration-short},
      background-color #{$pds-motion-duration-short};

    @media (hover: hover) {
      &:hover {
        background-color: hsl(240 4% 70% / 35%);
        border-color: hsl(240 4% 70% / 35%);
      }
    }
  }
</style>
