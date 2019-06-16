<template>
  <nav>
    <ul>
      <li v-for="(pages, category, index) in config.pages" :key="index">
        <h2>{{ category }}</h2>
        <ul>
          <li v-for="(v, page, index) in pages" :key="index">
            <router-link :to="`/${encodeUrl(category)}/${encodeUrl(page)}`">{{ page }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <ul>
      <li v-for="(stories, category, index) in config.stories" :key="index">
        <h2>{{ category }}</h2>
        <ul>
          <li v-for="(v, story, index) in stories" :key="index">
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

    &.router-link-active {
      color: #42b983;
    }
  }
</style>
