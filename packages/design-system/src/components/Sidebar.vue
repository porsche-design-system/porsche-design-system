<template>
  <nav>
    <ul>
      <li v-for="(categories, category) in pages">
        <h2>{{ category }}</h2>
        <ul>
          <li v-for="(story, page) in categories">
            <router-link :to="`/${encodeUrl(category)}/${encodeUrl(page)}`">{{ page }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <ul>
      <li v-for="(categories, category) in stories">
        <h2>{{ category }}</h2>
        <ul>
          <li v-for="(story, component) in categories">
            <router-link :to="`/components/${encodeUrl(category)}/${encodeUrl(component)}`">{{ component }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {pages, stories} from '@/design-system.config';

  @Component
  export default class Sidebar extends Vue {

    public pages = pages;
    public stories = stories;

    public encodeUrl(param: string): string {
      return param.toLowerCase().replace(' ', '-');
    }
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
