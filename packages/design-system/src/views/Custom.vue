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
  private component: any = null;

  get area(): string {
    return this.$route.params.area.toLowerCase();
  }

  get page(): string {
    return this.$route.params.page.toLowerCase();
  }

  @Watch('$route')
  private async onRouteChange(): Promise<void> {
    await this.updateComponent();
  }

  private async mounted(): Promise<void> {
    await this.updateComponent();
  }

  private async updateComponent(): Promise<void> {
    try {
      this.component = (await (() => import(`@/pages/${this.area}/${this.page}.md`))()).default
    } catch (e) {
      this.$router.replace('/');
    }
  }
}
</script>
