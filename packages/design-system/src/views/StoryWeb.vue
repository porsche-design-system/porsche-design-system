<template>
  <div>
    <nav class="tabs">
      <p-text
        class="tab"
        variant="28-thin"
        tag="div"
        v-if="isStoryExistent('design')"
      >
        <router-link to="#design">Design</router-link>
      </p-text>
      <p-text
        class="tab"
        variant="28-thin"
        tag="div"
        v-if="isStoryExistent('code')"
      >
        <router-link to="#code">Code</router-link>
      </p-text>
      <p-text
        class="tab"
        variant="28-thin"
        tag="div"
        v-if="isStoryExistent('props')"
      >
        <router-link to="#props">Props</router-link>
      </p-text>
    </nav>
    <Markdown>
      <component :is="component" v-for="(component, index) in components" :key="index"></component>
    </Markdown>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { config as webConfig } from '@/../design-system.web.config';
import { decodeUrl } from '@/services/utils';
import Markdown from '@/components/Markdown.vue';
import { StoriesWeb, Tabs } from '@/interface';

@Component({
  components: {
    Markdown
  }
})
export default class Story extends Vue {
  public components: any[] = [];

  private get area(): string {
    return this.$route.meta.area;
  }

  private get category(): string {
    return decodeUrl(this.$route.params.category);
  }

  private get story(): string {
    return decodeUrl(this.$route.params.story);
  }

  private get tab(): string {
    return this.$route.hash.substring(1).toLowerCase();
  }

  private get config(): StoriesWeb {
    return webConfig.stories;
  }

  public isStoryExistent(tab: Tabs): boolean {
    return (
      this.config &&
      this.config[this.category] &&
      this.config[this.category][this.story] &&
      this.config[this.category][this.story][tab]
    );
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

    try {
      await this.$store.dispatch('toggleLoadingAsync', true);
      const story = this.config[this.category][this.story][this.tab as Tabs];

      if (typeof story === 'object') {
        for (const file of story) {
          this.components.push((await file()).default);
        }
      } else {
        this.components.push((await story()).default);
      }
      await this.$store.dispatch('toggleLoadingAsync', false);
    } catch (e) {
      this.redirect();
    }
  }

  private async redirect(): Promise<void> {
    if (this.isStoryExistent('design')) {
      this.$router.replace('#design');
    } else if (this.isStoryExistent('code')) {
      this.$router.replace('#code');
    } else if (this.isStoryExistent('props')) {
      this.$router.replace('#props');
    } else {
      this.$router.replace({name: `404-${this.area}`});
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@porsche-ui/ui-kit-scss-utils/index";

  .tabs {
    display: flex;
    margin-bottom: $p-spacing-64;
    border-bottom: 1px solid $p-color-neutral-grey-2;

    .tab {
      &:not(:last-child) {
        margin-right: $p-spacing-40;
      }

      a {
        display: block;
        padding-bottom: $p-spacing-8;
        border-bottom: 3px solid transparent;
        text-decoration: none;
        color: $p-color-neutral-grey-6;
        transition: color $p-animation-hover-duration $p-animation-hover-bezier;

        &:hover {
          color: $p-color-porsche-red;
        }

        &:focus {
          outline: 1px solid $p-color-state-focus;
          outline-offset: 4px;
        }

        &.router-link-exact-active {
          cursor: default;
          color: $p-color-porsche-black;
          border-bottom-color: $p-color-porsche-red;
        }
      }
    }
  }
</style>
