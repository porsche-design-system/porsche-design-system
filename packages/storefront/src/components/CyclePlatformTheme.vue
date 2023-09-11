<template>
  <p-button-pure :theme="$store.getters.platformTheme" icon="sun" hide-label="true" @click="cycleTheme()"
    >Toggle theme of platform</p-button-pure
  >
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { type Theme } from '@/models';

  const themes: Theme[] = ['light', 'dark', 'auto'];

  @Component
  export default class CyclePlatformTheme extends Vue {
    public cycleTheme(): void {
      this.$store.commit(
        'setPlatformTheme',
        themes[(themes.indexOf(this.$store.getters.platformTheme) + 1) % themes.length]
      );
    }
  }
</script>
