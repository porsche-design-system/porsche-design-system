<template>
  <nav>
    <ul v-if="config.pages" class="list">
      <li v-for="(pages, category, index) in config.pages" :key="index">
        <p-headline variant="headline-4" tag="h2">{{ category }}</p-headline>
        <ul>
          <li v-for="(v, page, index) in pages" :key="index">
            <router-link :to="`/${encodeUrl(category)}/${encodeUrl(page)}`"
                         v-slot="{ href, navigate, isActive }">
              <p-link-pure :href="href" @click="navigate" class="link" :active="isActive">{{ page }}</p-link-pure>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <p-divider v-if="config.stories" class="divider-spacing-small"></p-divider>
    <p-headline v-if="config.stories" variant="headline-3" tag="h2">Components</p-headline>
    <ul v-if="config.stories" class="list">
      <li v-for="(stories, category, index) in config.stories" :key="index">
        <p-headline variant="headline-4" tag="h3">{{ category }}</p-headline>
        <ul>
          <li v-for="(v, story, index) in stories" :key="index">
            <router-link :to="`/components/${encodeUrl(category)}/${encodeUrl(story)}`"
                         v-slot="{ href, navigate, isActive }">
              <p-link-pure :href="href" @click="navigate" class="link" :active="isActive">{{ story }}</p-link-pure>
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
  import { encodeUrl } from '@/services/utils';

  @Component
  export default class Sidebar extends Vue {
    public encodeUrl = encodeUrl;

    get config(): StorefrontConfig {
      return storefrontConfig;
    }
  }

</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss/index';

  ul,
  li {
    list-style: none;
  }

  .list {
    width: 100%;
    display: inline-block;
    margin-top: $p-spacing-24;

    &:last-child {
      margin-bottom: $p-spacing-24;
    }

    > li:not(:first-child) {
      margin-top: $p-spacing-24;
    }
  }

  .link {
    margin: $p-spacing-4 0;
    display: inline-block;
    text-decoration: none;
  }
</style>
