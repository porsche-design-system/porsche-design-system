<template>
  <Markdown>
    <component :is="component" v-if="component"></component>
  </Markdown>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Markdown from '@/components/Markdown.vue';

@Component({
  components: {
    Markdown
  }
})
export default class Custom extends Vue {
  public component: any = null;

  private get area(): string {
    return this.$route.params.area.toLowerCase();
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
      this.component = (await (() => import(`@/pages/${this.area}/${this.page}.md`))()).default;
    } catch (e) {
      await this.redirect();
    }
  }

  private async redirect(): Promise<void> {
    this.$router.replace('/');
  }
}
</script>
