<template>
  <component :is="component" v-if="component"></component>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Watch } from 'vue-property-decorator';
  import { Component as ComponentType } from 'vue/types/options';
  import { paramCase } from 'change-case';

  @Component
  export default class KitchenSinkSites extends Vue {
    public component: ComponentType | null = null;

    private get page(): string {
      return paramCase(this.$route.params.page);
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
      await this.$store.dispatch('toggleLoadingAsync', true);
      try {
        this.component = (
          await (() => import(`@/pages/kitchensink/${this.page}.vue`))()
        ).default;
      } catch (e) {
        await this.redirect();
      }
      await this.$store.dispatch('toggleLoadingAsync', false);
    }

    private async redirect(): Promise<void> {
      console.log("redirect");
      await this.$router.replace({ name: `404` });
    }
  }
</script>
