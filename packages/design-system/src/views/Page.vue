<template>
  <component v-if="page" :is="page"></component>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import {pages} from '@/design-system.config';
  import {decodeUrl} from '@/services/utils';

  @Component
  export default class Page extends Vue {

    private page = null;

    @Watch('$route')
    private async onRouteChange(): Promise<void> {
      await this.updateComponent();
    }

    private async created(): Promise<void> {
      await this.updateComponent();
    }

    private async updateComponent(): Promise<void> {
      if (this.isRouteValid) {
        await this.loadPage();
      } else {
        await this.navigateToHome();
      }
    }

    private async loadPage(): Promise<void> {
      this.page = (await import(`@/${this.pagePath}`)).default;
    }

    private async navigateToHome(): Promise<void> {
      this.$router.replace('/');
    }

    private get isRouteValid(): boolean {
      const category = decodeUrl(this.$route.params.category);
      const page = decodeUrl(this.$route.params.page);

      return !!(pages[category] && pages[category][page]);
    }

    private get pagePath(): string {
      const category = decodeUrl(this.$route.params.category);
      const page = decodeUrl(this.$route.params.page);

      return pages[category][page];
    }
  }
</script>
