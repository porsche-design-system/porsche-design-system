<template>
  <div>
    <p-tabs-bar v-if="hasTabs" :active-tab-index="activeTabIndex" size="medium">
      <router-link v-for="(tab, index) in tabs" :key="index" :to="createTabLink(tab)">{{ tab }}</router-link>
    </p-tabs-bar>
    <p-divider v-if="hasTabs"></p-divider>
    <Markdown>
      <component :is="component" v-for="(component, index) in components" :key="index"></component>
    </Markdown>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Watch } from 'vue-property-decorator';
  import { config as STOREFRONT_CONFIG } from '@/../storefront.config';
  import Markdown from '@/components/Markdown.vue';
  import { StorefrontConfigPage } from '@/models';
  import { Component as ComponentType } from 'vue/types/options';
  import { capitalCase, paramCase } from 'change-case';

  @Component({
    components: {
      Markdown,
    },
  })
  export default class Page extends Vue {
    public components: ComponentType[] = [];

    public get hasTabs(): boolean {
      return this.tabs.length > 0;
    }

    public get activeTabIndex(): number {
      return this.tabs.indexOf(this.tab);
    }

    public get tabs(): string[] {
      const page = STOREFRONT_CONFIG?.[this.category]?.[this.page];

      if (!page || Array.isArray(page)) {
        return [];
      } else {
        return Object.keys(page);
      }
    }

    public createTabLink(name: string): string {
      return '/' + [this.category, this.page, name].map((x) => paramCase(x)).join('/');
    }

    @Watch('$route')
    private async onRouteChange(): Promise<void> {
      await this.loadComponents();
    }

    private async mounted(): Promise<void> {
      await this.loadComponents();
    }

    private get category(): string {
      return capitalCase(this.$route.params.category);
    }

    private get page(): string {
      return capitalCase(this.$route.params.page);
    }

    private get tab(): string {
      const { tab } = this.$route.params;
      return tab && capitalCase(tab);
    }

    private get pages(): StorefrontConfigPage {
      const page = STOREFRONT_CONFIG?.[this.category]?.[this.page];

      if (!page || Array.isArray(page)) {
        return page;
      } else {
        return page[this.tab];
      }
    }

    private async loadComponents(): Promise<void> {
      this.components = [];
      await this.$store.dispatch('toggleLoadingAsync', true);
      if (this.pages?.length) {
        this.components = await Promise.all(
          this.pages.map(async (x) => ((await x()) as { default: ComponentType }).default)
        );
      } else {
        await this.redirect();
      }
      await this.$store.dispatch('toggleLoadingAsync', false);
    }

    private async redirect(): Promise<void> {
      if (this.hasTabs) {
        await this.$router.replace(this.createTabLink(this.tabs[0]));
      } else {
        await this.$router.replace({ name: '404' });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  p-divider {
    margin-bottom: $p-spacing-64;
  }
</style>
