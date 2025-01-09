<template>
  <Markdown>
    <component :is="component" v-if="component"></component>
  </Markdown>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Markdown from '@/components/Markdown.vue';
import type { Component as ComponentType } from 'vue/types/options';
import { paramCase } from 'change-case';

@Component({
  components: {
    Markdown,
  },
})
export default class CustomView extends Vue {
  public component: ComponentType | null = null;

  private get page(): string {
    return paramCase(this.$route.params.page);
  }

  @Watch('$route')
  private async onRouteChange(): Promise<void> {
    await this.loadComponent();
  }

  private async mounted(): Promise<void> {
    await this.loadComponent();
  }

  private async loadComponent(): Promise<void> {
    this.component = null;
    this.$store.commit('setIsLoading', true);
    try {
      this.component = (await import(`@/pages/${this.page}.md`)).default;
    } catch (e) {
      await this.redirect();
    }
    this.$store.commit('setIsLoading', false);
  }

  private async redirect(): Promise<void> {
    await this.$router.replace({ name: `404` });
  }
}
</script>
