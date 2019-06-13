<template>
  <nav>
    <ul>
      <li v-for="(categories, category) in pages">
        <h2>{{ category }}</h2>
        <ul>
          <li v-for="(file, page) in categories">
            <router-link :to="`/${encode(category)}/${encode(page)}`">{{ page }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Pages} from '@/pages';

  @Component
  export default class Sidebar extends Vue {

    public pages: Pages = {};

    public async mounted() {
      this.pages = (await import('@/pages')).pages;
    }

    public encode(param: string): string {
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
