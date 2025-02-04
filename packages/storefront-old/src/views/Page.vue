<template>
  <div>
    <nav aria-label="Content">
      <p-tabs-bar v-if="hasTabs" :theme="storefrontTheme" :active-tab-index="activeTabIndex" size="medium">
        <router-link v-for="(tab, index) in tabs" :key="index" :to="createTabLink(tab)">{{ tab }}</router-link>
      </p-tabs-bar>
    </nav>

    <div v-if="isLoading">
      <div :class="['skeleton', 'skeleton--h1', getSkeletonTheme()]"></div>
      <!-- intro text -->
      <div v-if="category !== 'Styles'">
        <div :class="['skeleton', 'skeleton--text', 'skeleton--text--full', getSkeletonTheme()]"></div>
        <div :class="['skeleton', 'skeleton--text', 'skeleton--text--full', getSkeletonTheme()]"></div>
        <div :class="['skeleton', 'skeleton--text', getSkeletonTheme()]"></div>
      </div>

      <!-- table of contents -->
      <div :class="['skeleton', 'skeleton--h2', getSkeletonTheme()]"></div>
      <div :class="['skeleton', 'skeleton--text', 'skeleton--text--toc', getSkeletonTheme()]"></div>
      <div :class="['skeleton', 'skeleton--text', 'skeleton--text--toc', getSkeletonTheme()]"></div>
      <div :class="['skeleton', 'skeleton--text', 'skeleton--text--toc', getSkeletonTheme()]"></div>
    </div>
    <Markdown v-else>
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
import type { StorefrontConfigPage, StorefrontTheme } from '@/models';
import type { Component as ComponentType } from 'vue/types/options';
import { capitalCase, paramCase } from 'change-case';
import { isPreferredColorSchemeDark, onPrefersColorSchemeChange, removeOnPrefersColorSchemeChange } from '@/utils';

@Component({
  components: {
    Markdown,
  },
})
export default class PageView extends Vue {
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

    onPrefersColorSchemeChange(this, () => {
      if (this.storefrontTheme === 'auto') {
        this.$forceUpdate();
      }
    });
  }

  destroyed(): void {
    removeOnPrefersColorSchemeChange(this);
  }

  public get category(): string {
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

  // called twice when navigation happens via sidebar because initial link goes to category and not to first tab
  private async loadComponents(): Promise<void> {
    this.components = [];
    if (this.pages?.length) {
      this.$store.commit('setIsLoading', true);
      this.components = await Promise.all(
        this.pages.map(async (x) => ((await x()) as { default: ComponentType }).default)
      );
      this.$store.commit('setIsLoading', false);
    } else {
      await this.redirect();
    }
  }

  private async redirect(): Promise<void> {
    if (this.hasTabs) {
      await this.$router.replace(this.createTabLink(this.tabs[0]));
    } else {
      await this.$router.replace({ name: '404' });
    }
  }

  public get isLoading(): boolean {
    return this.$store.getters.isLoading;
  }

  public get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }

  // needs to real function, because a getter like `public get skeletonTheme()` is not called again on this.$forceUpdate()
  public getSkeletonTheme(): string {
    return (this.storefrontTheme === 'auto' && isPreferredColorSchemeDark()) || this.storefrontTheme === 'dark'
      ? 'skeleton--dark'
      : 'skeleton--light';
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  p-tabs-bar {
    margin-bottom: $pds-spacing-fluid-large;
  }

  .skeleton {
    height: $pds-font-line-height;

    &--h1 {
      max-width: 200px;
      @include pds-heading-xx-large;
      margin-top: $pds-spacing-fluid-large; // synced with h1 style of Markdown.vue

      // without tabs-bar
      &:first-child {
        margin-top: 0;
      }
    }

    // table of contents heading
    &--h2 {
      max-width: 150px;
      @include pds-heading-medium;
      margin: 4rem 0 1rem; // synced with .toc in TableOfContents.vue
    }

    &--text {
      width: 75%;
      @include pds-text-small;
      margin-top: $pds-spacing-fluid-small; // synced with p style of Markdown.vue

      &--toc {
        max-width: 250px;
        margin-top: 1px;
      }

      &--full {
        width: 100%;
      }
    }

    &--light {
      @include pds-skeleton('light');
    }

    &--dark {
      @include pds-skeleton('dark');
    }
  }
</style>
