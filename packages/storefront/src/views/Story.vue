<template>
  <div>
    <nav class="tabs" v-if="hasTabs">
      <p-text size="inherit" tag="div" weight="thin" class="tab" v-for="(tab, index) in tabs" :key="index">
        <router-link :to="getTabLink(tab)">{{ tab }}</router-link>
      </p-text>
    </nav>
    <Markdown>
      <component :is="component" v-for="(component, index) in components" :key="index"></component>
    </Markdown>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import {config as storefrontConfig} from '@/../storefront.config';
  import {decodeUrl, encodeUrl} from '@/services/utils';
  import Markdown from '@/components/Markdown.vue';
  import {ComponentListImport, Stories} from '@/interface';
  import {Component as ComponentType} from 'vue/types/options';

  @Component({
    components: {
      Markdown
    }
  })
  export default class Story extends Vue {
    public components: ComponentType[] = [];

    public get hasTabs(): boolean {
      return this.tabs.length > 0;
    }

    public get tabs(): string[] {
      const story = this.config?.[this.category]?.[this.story];

      if (!story || Array.isArray(story)) {
        return [];
      }

      return Object.keys(story);
    }

    private get category(): string {
      return decodeUrl(this.$route.params.category);
    }

    private get story(): string {
      return decodeUrl(this.$route.params.story);
    }

    private get tab(): string {
      return decodeUrl(this.$route.hash.substring(1));
    }

    private get config(): Stories {
      return storefrontConfig.stories;
    }

    private get stories(): ComponentListImport {
      const story = this.config?.[this.category]?.[this.story];

      if (!story || Array.isArray(story)) {
        return story;
      }

      return story[this.tab];
    }

    public getTabLink(name: string): string {
      return `#${encodeUrl(name)}`;
    }

    public getFirstTabName(): string {
      return this.tabs[0];
    }

    @Watch('$route')
    private async onRouteChange(): Promise<void> {
      await this.loadComponents();
    }

    private async mounted(): Promise<void> {
      await this.loadComponents();
    }

    private async loadComponents(): Promise<void> {
      this.components = [];
      await this.$store.dispatch('toggleLoadingAsync', true);

      try {
        for (const story of this.stories) {
          this.components.push((await story()).default);
        }
      } catch (e) {
        this.redirect();
      }

      await this.$store.dispatch('toggleLoadingAsync', false);
    }

    private async redirect(): Promise<void> {
      if (this.hasTabs) {
        await this.$router.replace(this.getTabLink(this.getFirstTabName()));
      } else {
        await this.$router.replace({name: `404`});
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@porsche-design-system/utilities/scss/index";

  .tabs {
    display: flex;
    margin-bottom: $p-spacing-64;
    border-bottom: 1px solid $p-color-theme-light-neutral-contrast-low;

    .tab {
      @include p-type-scale($p-font-size-28);

      &:not(:last-child) {
        margin-right: $p-spacing-40;
      }

      a {
        display: block;
        padding-bottom: $p-spacing-8;
        border-bottom: 3px solid transparent;
        text-decoration: none;
        color: $p-color-theme-light-neutral-contrast-medium;
        transition: color $p-animation-hover-duration $p-animation-hover-bezier;

        &:hover {
          color: $p-color-theme-light-state-hover;
        }

        &:focus {
          outline: 1px solid $p-color-theme-light-state-focus;
          outline-offset: 4px;
        }

        &.router-link-exact-active {
          cursor: default;
          color: $p-color-theme-light-default;
          border-bottom-color: $p-color-theme-light-brand;
        }
      }
    }
  }
</style>
