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
import {Pages} from '@/interface';

@Component({
  components: {
    Markdown
  }
})
export default class Page extends Vue {
  public components: any[] = [];

  private get area(): string {
    return (this.$route.params.area || '').toLowerCase();
  }

  private get category(): string {
    return decodeUrl((this.$route.params.category || ''));
  }

  private get page(): string {
    return decodeUrl((this.$route.params.page || ''));
  }

  private get config(): Pages {
    switch (this.area) {
      case 'app': return appConfig.pages;
      case 'web': return webConfig.pages;
      default: return webConfig.pages;
    }
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
      const page = this.config[this.category][this.page];
      if (typeof page === 'object') {
        for (const file of page) {
          this.components.push((await file()).default);
        }
      } else {
        this.components.push((await page()).default);
      }
    } catch (e) {
      await this.redirect();
    }
  }

  private async redirect(): Promise<void> {
    this.$router.replace({name: '404'});
  }
}
</script>
