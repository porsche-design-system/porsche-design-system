<template>
  <nav>
    <ul>
      <li v-for="(pages, category) in config.pages">
        <h2>{{ category }}</h2>
        <ul>
          <li v-for="(file, page) in pages">
            <router-link :to="`/${encodeUrl(category)}/${encodeUrl(page)}`">{{ page }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <ul>
      <li v-for="(stories, category) in config.stories">
        <h2>{{ category }}</h2>
        <ul>
          <li v-for="(tabs, story) in stories">
            <router-link :to="`/components/${encodeUrl(category)}/${encodeUrl(story)}`">{{ story }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {config} from '@/design-system.config';
  import {encodeUrl} from '@/services/utils.ts';

  @Component
  export default class Sidebar extends Vue {

    public config = config;
    public encodeUrl = encodeUrl;
  }
</script>

<style scoped lang="scss">
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
</style>
