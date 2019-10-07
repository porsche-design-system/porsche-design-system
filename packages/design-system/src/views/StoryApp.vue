<template>
  <Markdown>
    <component :is="component" v-for="(component, index) in components" :key="index"></component>
  </Markdown>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {config as webConfig} from '@/../design-system.web.config';
import {config as appConfig} from '@/../design-system.app.config';
import { decodeUrl } from '@/services/utils';
import Markdown from '@/components/Markdown.vue';
import { StoriesApp } from '@/interface';

@Component({
  components: {
    Markdown
  }
})
export default class Page extends Vue {
  public components: any[] = [];

  private get area(): string {
    return this.$route.meta.area;
  }

  private get category(): string {
    return decodeUrl(this.$route.params.category);
  }

  private get story(): string {
    return decodeUrl(this.$route.params.story);
  }

  private get config(): StoriesApp {
    return appConfig.stories;
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

    try {
      await this.$store.dispatch('toggleLoadingAsync', true);
      const page = this.config[this.category][this.story];

      if (typeof page === 'object') {
        for (const file of page) {
          this.components.push((await file()).default);
        }
      } else {
        this.components.push((await page()).default);
      }
      await this.$store.dispatch('toggleLoadingAsync', false);
    } catch (e) {
      this.redirect();
    }
  }

  private redirect(): void {
    this.$router.replace({name: `404-${this.area}`});
  }
}
</script>
