<template>
  <div>
    <nav>
      <router-link class="tab" v-if="isStoryExistent('design')" to="#design">Design</router-link>
      <router-link class="tab" v-if="isStoryExistent('code')" to="#code">Code</router-link>
      <router-link class="tab" v-if="isStoryExistent('props')" to="#props">Props</router-link>
    </nav>
    <component :is="component" v-for="(component, index) in components" :key="index"></component>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import {config} from '@/design-system.config';
  import {decodeUrl} from '@/services/utils';

  @Component
  export default class Story extends Vue {

    private components: any[] = [];

    @Watch('$route')
    private async onRouteChange(): Promise<void> {
      await this.updateComponent();
    }

    private async mounted(): Promise<void> {
      await this.updateComponent();
    }

    private async updateComponent(): Promise<void> {
      if (this.isStoryExistent()) {
        await this.loadStory();
      } else {
        await this.redirect();
      }
    }

    private isStoryExistent(tab: string = this.$route.hash.substring(1)): boolean {
      const category = decodeUrl(this.$route.params.category);
      const story = decodeUrl(this.$route.params.story);

      return (
        (tab === 'design' || tab === 'code' || tab === 'props') &&
        config.stories[category] &&
        config.stories[category][story] &&
        config.stories[category][story][tab]
      );
    }

    private async loadStory(): Promise<void> {
      const category = decodeUrl(this.$route.params.category);
      const story = decodeUrl(this.$route.params.story);
      const tab = this.$route.hash.substring(1) as 'design' | 'code' | 'props';

      this.components = [];

      if (typeof config.stories[category][story][tab] === 'object') {
        for (const part of config.stories[category][story][tab]) {
          this.components.push((await part()).default);
        }
      } else {
        this.components.push((await config.stories[category][story][tab]()).default);
      }
    }

    private async redirect(): Promise<void> {
      const category = decodeUrl(this.$route.params.category);
      const story = decodeUrl(this.$route.params.story);

      if (!config.stories[category] || !config.stories[category][story]) {
        this.$router.replace('/');
      } else if (config.stories[category][story].design) {
        this.$router.replace('#design');
      } else if (config.stories[category][story].code) {
        this.$router.replace('#code');
      } else if (config.stories[category][story].props) {
        this.$router.replace('#props');
      } else {
        this.$router.replace('/');
      }
    }
  }
</script>

<style scoped lang="scss">
  a.tab {
    text-decoration: none;
    color: black;
    padding: 10px;
    border-bottom: 3px solid #ccc;

    &.router-link-exact-active {
      border-bottom-color: red;
    }
  }
</style>
