<template>
  <div>
    <component :is="component" v-for="(component, index) in components" :key="index"></component>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import {config} from '@/design-system.config';
  import {decodeUrl} from '@/services/utils';

  @Component
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

    private isPageExistent(): boolean {
      const category = decodeUrl(this.$route.params.category);
      const page = decodeUrl(this.$route.params.page);

      return config.pages[category] && config.pages[category][page];
    }

    private async loadPage(): Promise<void> {
      const category = decodeUrl(this.$route.params.category);
      const page = decodeUrl(this.$route.params.page);

      this.components = [];

      if (typeof config.pages[category][page] === 'object') {
        for (const component of config.pages[category][page]) {
          this.components.push((await component()).default);
        }
      } else {
        this.components.push((await config.pages[category][page]()).default);
      }
    }

    private async redirect(): Promise<void> {
      this.$router.replace('/');
    }
  }
</script>
