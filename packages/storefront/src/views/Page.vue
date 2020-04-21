<template>
  <Markdown>
    <component :is="component" v-for="(component, index) in components" :key="index"></component>
  </Markdown>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { config as storefrontConfig } from '@/../storefront.config';
  import { decodeUrl } from '@/services/utils';
  import Markdown from '@/components/Markdown.vue';
  import { ComponentListImport, Pages } from '@/interface';
  import { Component as ComponentType } from 'vue/types/options';

  @Component({
    components: {
      Markdown
    }
  })
  export default class Page extends Vue {
    public components: ComponentType[] = [];

    private get category(): string {
      return decodeUrl(this.$route.params.category);
    }

    private get page(): string {
      return decodeUrl(this.$route.params.page);
    }

    private get config(): Pages {
      return storefrontConfig.pages;
    }

    private get pages(): ComponentListImport {
      return this.config?.[this.category]?.[this.page];
    }

    @Watch('$route')
    private async onRouteChange(): Promise<void> {
      await this.loadComponents();
    }

    private async mounted(): Promise<void> {
      await this.loadComponents();
    }

    private async loadComponents(): Promise<void> {
      this.components = [];
      await this.$store.dispatch('toggleLoadingAsync', true);

      try {
        for (const page of this.pages) {
          this.components.push((await page()).default);
        }
      } catch (e) {
        this.redirect();
      }

      await this.$store.dispatch('toggleLoadingAsync', false);
    }

    private redirect(): void {
      this.$router.replace({name: `404`});
    }
  }
</script>
