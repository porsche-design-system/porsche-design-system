<template>
  <p-button-pure
    :theme="storefrontTheme"
    :icon="getIcon()"
    hide-label="true"
    aria-live="polite"
    type="button"
    @click="cycleTheme()"
  >
    Use {{ getIcon() === 'moon' ? 'dark' : 'light' }} mode
  </p-button-pure>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import type { StorefrontTheme } from '@/models';
import { isPreferredColorSchemeDark, onPrefersColorSchemeChange, removeOnPrefersColorSchemeChange } from '@/utils';

@Component
export default class CycleStorefrontTheme extends Vue {
  mounted(): void {
    onPrefersColorSchemeChange(this, () => {
      if (this.storefrontTheme === 'auto') {
        this.$forceUpdate();
      }
    });
  }

  destroyed(): void {
    removeOnPrefersColorSchemeChange(this);
  }

  public get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }

  // needs to real function, because a getter like `public get icon()` is not called again on this.$forceUpdate()
  public getIcon(): 'moon' | 'sun' {
    if ((this.storefrontTheme === 'auto' && isPreferredColorSchemeDark()) || this.storefrontTheme === 'dark') {
      return 'sun';
    } else {
      return 'moon';
    }
  }

  public cycleTheme(): void {
    const themes: StorefrontTheme[] = ['auto', isPreferredColorSchemeDark() ? 'light' : 'dark'];
    const newTheme = themes[(Math.max(0, themes.indexOf(this.storefrontTheme)) + 1) % themes.length];
    document.body.classList.remove('light-mode', 'dark-mode', 'auto-dark-mode');
    document.body.classList.add(
      {
        light: 'light-mode',
        dark: 'dark-mode',
        auto: 'auto-dark-mode',
      }[newTheme]
    );
    this.$store.commit('setStorefrontTheme', newTheme);
  }
}
</script>
