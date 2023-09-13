<template>
  <p-button-pure :theme="theme()" :icon="icon()" hide-label="true" @click="cycleTheme()"
    >Toggle theme of platform</p-button-pure
  >
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { type Theme } from '@/models';

  @Component
  export default class CyclePlatformTheme extends Vue {
    mounted(): void {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.onPrefersColorSchemeChange);
    }

    destroyed(): void {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.onPrefersColorSchemeChange);
    }

    public onPrefersColorSchemeChange(): void {
      if (this.theme() === 'auto') {
        this.$forceUpdate();
      }
    }

    public isPreferredColorSchemeDark(): boolean {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    public theme(): Theme {
      return this.$store.getters.platformTheme;
    }

    public icon(): 'moon' | 'sun' {
      if ((this.theme() === 'auto' && this.isPreferredColorSchemeDark()) || this.theme() === 'dark') {
        return 'sun';
      } else {
        return 'moon';
      }
    }

    public cycleTheme(): void {
      const themes: Theme[] = ['auto', this.isPreferredColorSchemeDark() ? 'light' : 'dark'];
      const newTheme = themes[(Math.max(0, themes.indexOf(this.theme())) + 1) % themes.length];
      document.body.classList.remove('light-mode', 'dark-mode', 'auto-dark-mode');
      document.body.classList.add(
        {
          light: 'light-mode',
          dark: 'dark-mode',
          auto: 'auto-dark-mode',
        }[newTheme]
      );
      this.$store.commit('setPlatformTheme', newTheme);
    }
  }
</script>
