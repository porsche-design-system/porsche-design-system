<template>
  <nav>
    <ul class="list">
      <li v-for="(pages, category, index) in config" :key="index">
        <p-button-pure size="small" weight="bold" :icon="isActive(category) ? 'minus' : 'plus'" @click="toggleActive(category)">{{ category }}</p-button-pure>
        <ul v-show="isActive(category)">
          <li v-for="(tabs, page, index) in pages" :key="index">
            <router-link :to="`/${paramCase(category)}/${paramCase(page)}`"
                         v-slot="{ href, navigate, isActive }">
              <p-link-pure :href="href" @click="navigate" class="link" :active="isActive">{{ page }}</p-link-pure>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { StorefrontConfig } from '@/interface';
  import { config as storefrontConfig } from '@/../storefront.config';
  import { paramCase } from 'change-case';

  @Component
  export default class Sidebar extends Vue {
    public config: StorefrontConfig = storefrontConfig;
    public paramCase = paramCase;
    public accordion: {[id: string]: boolean} = {};

    private created(): void {
      for (const category of Object.keys(this.config)) {
        this.accordion[category] = false;
      }
    }

    toggleActive(id: string): void {
      this.accordion[id] = !this.accordion[id];
      this.accordion = Object.assign({}, this.accordion);
    }

    isActive(id: string): boolean {
      return this.accordion[id];
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
