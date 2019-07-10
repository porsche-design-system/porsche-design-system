<template>
  <Markdown>
    <component :is="component" v-if="component"></component>
  </Markdown>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import Markdown from '@/components/Markdown.vue';

  @Component({
    components: {
      Markdown,
    },
  })
  export default class Custom extends Vue {

    private component: any = null;

    @Watch('$route')
    private async onRouteChange(): Promise<void> {
      await this.updateComponent();
    }

    private async mounted(): Promise<void> {
      await this.updateComponent();
    }

    private async updateComponent(): Promise<void> {
      if (this.isPageExistent()) {
        await this.loadPage();
      } else {
        await this.redirect();
      }
    }

    private isPageExistent(): boolean {
      return ['markdown', 'license'].includes(this.$route.params.page);
    }

    private async loadPage(): Promise<void> {
      this.component = (await (() => import(`@/pages/${this.$route.params.page}.md`))()).default;
    }

    private async redirect(): Promise<void> {
      this.$router.replace('/');
    }
  }
</script>
