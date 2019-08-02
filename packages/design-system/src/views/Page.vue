<template>
  <Markdown>
    <component :is="component" v-for="(component, index) in components" :key="index"></component>
  </Markdown>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {config as webConfig, DesignSystemWebConfig} from '@/../design-system.web.config';
import {config as appConfig, DesignSystemAppConfig} from '@/../design-system.app.config';
import { decodeUrl } from '@/services/utils';
import Markdown from '@/components/Markdown.vue';

@Component({
  components: {
    Markdown
  }
})
export default class Page extends Vue {
  private components: any[] = [];

  @Watch('$route')
  private async onRouteChange(): Promise<void> {
    await this.updateComponents();
  }

  private async mounted(): Promise<void> {
    await this.updateComponents();
  }

  private async updateComponents(): Promise<void> {
    if (this.isPageExistent()) {
      await this.loadPage();
    } else {
      await this.redirect();
    }
  }

  private get config(): DesignSystemWebConfig | DesignSystemAppConfig {
    const area = decodeUrl(this.$route.params.area).toLowerCase();
    return area === 'app' ? appConfig : webConfig;
  }

  private isPageExistent(): boolean {
    const category = decodeUrl(this.$route.params.category);
    const page = decodeUrl(this.$route.params.page);

    return this.config.pages && this.config.pages[category] && this.config.pages[category][page];
  }

  private async loadPage(): Promise<void> {
    const category = decodeUrl(this.$route.params.category);
    const page = decodeUrl(this.$route.params.page);

    this.components = [];

    if (typeof this.config.pages[category][page] === 'object') {
      for (const component of this.config.pages[category][page]) {
        this.components.push((await component()).default);
      }
    } else {
      this.components.push((await this.config.pages[category][page]()).default);
    }
  }

  private async redirect(): Promise<void> {
    const area = decodeUrl(this.$route.params.area).toLowerCase();
    this.$router.replace(`/${area}`);
  }
}
</script>
