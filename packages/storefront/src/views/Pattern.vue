<template>
  <component :is="component" v-if="component"></component>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { Component as ComponentType } from "vue/types/options";

  @Component
  export default class Patterns extends Vue {
    public component: ComponentType | null = null;

    private get category(): string {
      return this.$route.params.category.toLowerCase();
    }

    private get page(): string {
      return this.$route.params.page.toLowerCase();
    }

    @Watch('$route')
    private async onRouteChange(): Promise<void> {
      await this.loadComponent();
    }

    private async mounted(): Promise<void> {
      await this.loadComponent();
    }

    private async loadComponent(): Promise<void> {
      try {
        await this.$store.dispatch('toggleLoadingAsync', true);
        this.component = (await (() => import(`@/pages/patterns/${this.category}/${this.page}.vue`))()).default;
        await this.$store.dispatch('toggleLoadingAsync', false);
      } catch (e) {
        this.redirect();
      }
    }

    private redirect(): void {
      this.$router.replace({name: `404`});
    }
  }
</script>
