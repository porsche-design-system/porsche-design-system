<template>
  <nav>
    <ul class="list">
      <li v-for="(pages, category, index) in config" :key="index">
        <p-button-pure
          size="small"
          weight="bold"
          :icon="accordion[category] ? 'minus' : 'plus'"
          @click="toggleActive(category)"
        >{{ category }}
        </p-button-pure
        >
        <ul v-show="accordion[category]">
          <li v-for="(tabs, page, index) in pages" :key="index">
            <router-link :to="`/${paramCase(category)}/${paramCase(page)}`" v-slot="{ href, navigate, isActive }">
              <p-link-pure :href="href" @click="navigate" class="link" :active="isActive">{{ page }}</p-link-pure>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
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
    const {Components: unorderedComponents} = this.config;
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
    this.accordion = {...this.accordion, [Sidebar.category(to)]: true};
  }

  toggleActive(category: string): void {
    this.accordion = {...this.accordion, [category]: !this.accordion[category]};
  }

  private static category(route: Route): string {
    return route.params.category ? capitalCase(route.params.category) : '';
  }
}
</script>

<style scoped lang="scss">
@import '~@porsche-design-system/utilities/scss';

ul,
li {
  list-style: none;
}

.list {
  width: 100%;
  display: inline-block;
  margin-top: $p-spacing-24;

  &:last-child {
    margin-bottom: $p-spacing-16;
  }

  > li:not(:first-child) {
    margin-top: $p-spacing-16;
  }

  ul {
    margin-top: $p-spacing-8;
  }
}

.link {
  margin: $p-spacing-4 0;
  display: inline-block;
  text-decoration: none;
}
</style>
