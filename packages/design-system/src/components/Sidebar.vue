<template>
  <nav>
    <ul class="list">
      <li v-for="(pages, category, index) in config.pages[area]" :key="index">
        <p-headline variant="headline-5" tag="h3">{{ category }}</p-headline>
        <ul>
          <li v-for="(v, page, index) in pages" :key="index">
            <router-link
              class="link"
              :to="`/${encodeUrl(area)}/${encodeUrl(category)}/${encodeUrl(page)}`"
            >
              <p-text-link tag="span" color="inherit">{{ page }}</p-text-link>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <Divider v-if="area === 'web'" spacing="small" />
    <p-headline v-if="area === 'web'" variant="headline-4" tag="h2">Components</p-headline>
    <ul class="list" v-if="area === 'web'">
      <li
        v-for="(stories, category, index) in config.stories[area]"
        :key="index"
        v-if="featureToggle('Q2/2019 Components') || ['Basic', 'Layout'].includes(category)"
      >
        <p-headline variant="headline-5" tag="h3">{{ category }}</p-headline>
        <ul>
          <li
            v-for="(v, story, index) in stories"
            :key="index"
            v-if="featureToggle('Q2/2019 Components') || ['Color', 'Typography', 'Grid', 'Spacing'].includes(story)"
          >
            <router-link
              class="link"
              :to="`/web/components/${encodeUrl(category)}/${encodeUrl(story)}`"
            >
              <p-text-link tag="span" color="inherit">{{ story }}</p-text-link>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { config } from '@/../design-system.config';
import { encodeUrl, featureToggle } from '@/services/utils';
import Divider from '@/components/Divider.vue';

@Component({
  components: {
    Divider
  }
})
export default class Sidebar extends Vue {
  @Prop({ default: 'web' }) public area?: string;
  public config = config;
  public encodeUrl = encodeUrl;
  public featureToggle = featureToggle;
}
</script>

<style scoped lang="scss">
  @import '~@porscheui/ui-kit-js/src/styles/utility/index';

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
    padding: $p-spacing-4 0;
    text-decoration: none;
    color: $p-color-porsche-black;
    display: inline-block;

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
