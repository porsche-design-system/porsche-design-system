<template>
  <nav>
    <p-accordion
      compact="true"
      :key="index"
      v-bind:open="accordion[category]"
      v-on:accordionChange="toggleActive(category)"
    >
      <span slot="heading">{{ category }}</span>
      <ul v-show="accordion[category]">
        <li v-for="(tabs, page, index) in pages" :key="index">
          <router-link :to="`/${paramCase(category)}/${paramCase(page)}`" v-slot="{ href, navigate, isActive }">
            <p-link-pure :href="href" @click="navigate" class="link" :active="isActive">{{ page }}</p-link-pure>
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
  import { StorefrontConfig } from '@/models';
  import { config as storefrontConfig } from '@/../storefront.config';
  import { capitalCase, paramCase } from 'change-case';
  import { Route } from 'vue-router';

  @Component
  export default class Sidebar extends Vue {
    public config: StorefrontConfig = storefrontConfig;
    public paramCase = paramCase;
    public accordion: { [id: string]: boolean } = {};

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
    margin: $p-spacing-4 0;
    display: inline-block;
    text-decoration: none;
  }
</style>
