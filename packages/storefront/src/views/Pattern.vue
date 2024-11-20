<template>
  <component :is="component" v-if="component"></component>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import type { Component as ComponentType } from 'vue/types/options';
import { paramCase } from 'change-case';

@Component
export default class PatternView extends Vue {
  public component: ComponentType | null = null;

  private get category(): string {
    return paramCase(this.$route.params.category);
  }

  private get pattern(): string {
    return paramCase(this.$route.params.pattern);
  }

  @Watch('$route')
  private async onRouteChange(): Promise<void> {
    await this.loadComponent();
  }

  private async mounted(): Promise<void> {
    await this.loadComponent();
  }

  private async loadComponent(): Promise<void> {
    this.component = null;

    // isLoading is not used since patterns are rendered in standalone router-view of App.vue
    // this.$store.commit('setIsLoading', true);
    try {
      this.component = (await import(`@/pages/patterns/${this.category}/example-${this.pattern}.vue`)).default;
    } catch (e) {
      await this.redirect();
    }
    // this.$store.commit('setIsLoading', false);
  }

  private async redirect(): Promise<void> {
    await this.$router.replace({ name: `404` });
  }
}
</script>
