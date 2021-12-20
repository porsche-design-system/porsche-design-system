<template>
  <nav>
    <Search :hideNavigation="this.hideNavigation" v-on:hide-navigation-change="shouldHideNavigation" />
    <template v-if="!this.hideNavigation">
      <p-accordion
        v-for="(pages, category, index) in config"
        :key="index"
        :heading="category"
        v-bind:open="accordion[category]"
        v-on:accordionChange="toggleActive(category)"
        compact="true"
      >
        <ul>
          <li v-for="(tabs, page, index) in pages" :key="index">
            <p-link-pure class="link" icon="none" :active="isActive(category, page)">
              <router-link :to="getRoute(category, page)">{{ page }}</router-link>
            </p-link-pure>
          </li>
        </ul>
      </p-accordion>
    </template>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Watch } from 'vue-property-decorator';
  import { StorefrontConfig } from '@/models';
  import { capitalCase, paramCase } from 'change-case';
  import { Route } from 'vue-router';
  import { config as storefrontConfig } from '@/../storefront.config';

  import Search from '@/components/Search.vue';

  @Component({
    components: {
      Search,
    },
  })
  export default class Sidebar extends Vue {
    public config: StorefrontConfig = storefrontConfig;
    public paramCase = paramCase;
    public accordion: { [id: string]: boolean } = {};
    public hideNavigation = false;

    public getRoute(category: string, page: string): string {
      return `/${paramCase(category)}/${paramCase(page)}`;
    }

    public isActive(category: string, page: string, tab: string): boolean {
      const currentPath = this.$route.path;
      const route = this.getRoute(category, page);
      let pathWithoutTab = '';

      if (currentPath.split('/').length > 2) {
        pathWithoutTab = currentPath.substr(0, currentPath.lastIndexOf('/'));
      }
      return pathWithoutTab ? pathWithoutTab === route : currentPath.includes(route);
    }

    private created(): void {
      Object.keys(this.config).map((category) => {
        this.accordion[category] = false;
      });

      // sort components alphabetically
      const { Components: unorderedComponents } = this.config;
      const orderedComponents: typeof unorderedComponents = {};
      Object.keys(this.config.Components)
        .sort()
        .forEach((category) => {
          orderedComponents[category] = unorderedComponents[category];
        });
      this.config.Components = orderedComponents;
    }

    @Watch('$route')
    private onRouteChange(to: Route): void {
      this.accordion = { ...this.accordion, [Sidebar.category(to)]: true };
    }

    toggleActive(category: string): void {
      this.accordion = { ...this.accordion, [category]: !this.accordion[category] };
    }

    shouldHideNavigation(hideNavigation: boolean): void {
      this.hideNavigation = hideNavigation;
    }

    private static category(route: Route): string {
      const { category } = route.params;
      return category ? capitalCase(category) : '';
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  ul,
  li {
    list-style: none;
  }

  .link {
    width: 100%;
    margin: $p-spacing-4 0;
    display: inline-block;
    text-decoration: none;
  }
</style>
