<template>
  <nav v-show="!this.isSearchVisible">
    <!-- TODO: spacer class could be applied with an additional abstraction layer in storefront.config.ts  -->
    <p-accordion
      :theme="platformTheme"
      v-for="(pages, category, index) in config"
      :key="index"
      :heading="category"
      :class="['Components', 'Must Know'].includes(category) && 'spacer'"
      :open="accordion[category]"
      @update="toggleActive(category)"
      compact="true"
    >
      <ul>
        <li v-for="(tabs, page, index) in pages" :key="index">
          <router-link :to="getRoute(category, page)" v-slot="{ isActive, href, navigate }">
            <p-link-pure :theme="platformTheme" icon="none" :active="isActive">
              <a :href="href" @click="navigate"
                >{{ page }}<span title="deprecated">{{ getDeprecated(category, page) }}</span></a
              >
            </p-link-pure>
          </router-link>
        </li>
      </ul>
    </p-accordion>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Watch } from 'vue-property-decorator';
  import { StorefrontConfig, StorefrontTheme } from '@/models';
  import { capitalCase, paramCase } from 'change-case';
  import { Route } from 'vue-router';
  import { config as storefrontConfig } from '@/../storefront.config';
  import type { TagName } from '@porsche-design-system/shared';
  import { getComponentMeta } from '@porsche-design-system/component-meta';

  @Component({
    components: {},
  })
  export default class Navigation extends Vue {
    public config: StorefrontConfig = storefrontConfig;
    public accordion: { [id: string]: boolean } = {};

    public get platformTheme(): StorefrontTheme {
      return this.$store.getters.platformTheme;
    }

    public get isSearchVisible(): boolean {
      return this.$store.getters.isSearchActive;
    }

    public getRoute(category: string, page: string): string {
      return `/${paramCase(category)}/${paramCase(page)}`;
    }

    private created(): void {
      this.accordion = Object.keys(this.config).reduce(
        (result, category) => {
          result[category] = false;
          return result;
        },
        {} as { [id: string]: boolean }
      );

      this.config.Components = Object.keys(this.config.Components).reduce(
        (result, category) => {
          result[category] = this.config.Components[category];
          return result;
        },
        {} as StorefrontConfig['Components']
      );
    }

    @Watch('$route')
    private onRouteChange(to: Route): void {
      this.accordion = { ...this.accordion, [Navigation.category(to)]: true };
    }

    toggleActive(category: string): void {
      this.accordion = { ...this.accordion, [category]: !this.accordion[category] };
    }

    getDeprecated(category: string, page: string): string {
      if (category === 'Components' && getComponentMeta(('p-' + paramCase(page)) as TagName)?.isDeprecated) {
        return ' 🚫';
      } else {
        return '';
      }
    }

    private static category(route: Route): string {
      const { category } = route.params;
      return category ? capitalCase(category) : '';
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  nav {
    @include pds-media-query-min('m') {
      display: block !important; // ensure it won't get hidden because of visible search results which are needed on mobile view
    }
  }

  .spacer {
    margin-top: $pds-spacing-fluid-small;
  }

  ul,
  li {
    list-style: none;
  }

  p-link-pure {
    width: 100%;
    margin: $pds-spacing-static-x-small 0;
    display: inline-block;
    text-decoration: none;
  }
</style>
