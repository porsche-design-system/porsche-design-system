<template>
  <nav>
    <ul class="list">
      <li v-for="(pages, category, index) in config.pages" :key="index">
        <p-headline type="headline-5" level="3">{{ category }}</p-headline>
        <ul>
          <li v-for="(v, page, index) in pages" :key="index">
            <router-link class="link" :to="`/${encodeUrl(category)}/${encodeUrl(page)}`">
              <p-text-link tag="span">{{ page }}</p-text-link>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <Divider spacing="small"/>
    <p-headline type="headline-4" level="2">Components</p-headline>
    <ul class="list">
      <li v-for="(stories, category, index) in config.stories" :key="index">
        <p-headline type="headline-5" level="3">{{ category }}</p-headline>
        <ul>
          <li v-for="(v, story, index) in stories" :key="index">
            <router-link class="link" :to="`/components/${encodeUrl(category)}/${encodeUrl(story)}`">
              <p-text-link tag="span">{{ story }}</p-text-link>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {config} from '@/design-system.config';
  import {encodeUrl} from '@/services/utils';
  import Divider from '@/components/Divider.vue';

  @Component({
    components: {
      Divider,
    },
  })
  export default class Sidebar extends Vue {

    public config = config;
    public encodeUrl = encodeUrl;
  }
</script>

<style scoped lang="scss">
  @import "~@porscheui/ui-kit-js/src/styles/utility/index";

  ul, li {
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
    padding: $p-spacing-4 0;
    text-decoration: none;
    color: $p-color-porsche-black;
    display: block;

    &.router-link-active,
    &:hover {
      color: $p-color-porsche-red;
    }

    &:focus {
      outline: 1px solid $p-color-state-focus;
      outline-offset: 4px;
    }
  }
</style>
