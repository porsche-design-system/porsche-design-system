<template>
  <div>
    <nav class="tabs">
      <p-text class="tab" variant="28-thin" tag="div" v-if="isStoryExistent('design')">
        <router-link to="#design">Design</router-link>
      </p-text>
      <p-text
        class="tab"
        variant="28-thin"
        tag="div"
        v-if="isStoryExistent('code') && featureToggle('Q2/2019 Components')"
      >
        <router-link to="#code">Code</router-link>
      </p-text>
      <p-text
        class="tab"
        variant="28-thin"
        tag="div"
        v-if="isStoryExistent('props') && featureToggle('Q2/2019 Components')"
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
import { config } from '@/../design-system.web.config';
import { decodeUrl, featureToggle } from '@/services/utils';
import Markdown from '@/components/Markdown.vue';

@Component({
  components: {
    Markdown
  }
})
export default class Story extends Vue {
  public featureToggle = featureToggle;
  private components: any[] = [];

  @Watch('$route')
  private async onRouteChange(): Promise<void> {
    await this.updateComponents();
  }

  private async mounted(): Promise<void> {
    await this.updateComponents();
  }

  private async updateComponents(): Promise<void> {
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
      config.stories &&
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
      for (const component of config.stories[category][story][tab]) {
        this.components.push((await component()).default);
      }
    } else {
      this.components.push((await config.stories[category][story][tab]()).default);
    }
  }

  private async redirect(): Promise<void> {
    const category = decodeUrl(this.$route.params.category);
    const story = decodeUrl(this.$route.params.story);

    if (
      config.stories &&
      config.stories[category] &&
      config.stories[category][story] &&
      config.stories[category][story].design
    ) {
      this.$router.replace('#design');
    } else if (
      config.stories &&
      config.stories[category] &&
      config.stories[category][story] &&
      config.stories[category][story].code
    ) {
      this.$router.replace('#code');
    } else if (
      config.stories &&
      config.stories[category] &&
      config.stories[category][story] &&
      config.stories[category][story].props
    ) {
      this.$router.replace('#props');
    } else {
      this.$router.replace({name: 'not-found'});
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@porscheui/ui-kit-scss-utils/index";

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
