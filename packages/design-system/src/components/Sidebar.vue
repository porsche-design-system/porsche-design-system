<template>
  <nav>
    <ul v-if="config.pages" class="list">
      <li v-for="(pages, category, index) in config.pages" :key="index">
        <p-headline variant="headline-5" tag="h3">{{ category }}</p-headline>
        <ul>
          <li v-for="(v, page, index) in pages" :key="index">
            <router-link class="link" :to="`/${area}/${encodeUrl(category)}/${encodeUrl(page)}`">
              <p-text-link tag="span" color="inherit">{{ page }}</p-text-link>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <Divider v-if="config.stories" spacing="small" />
    <p-headline v-if="config.stories" variant="headline-4" tag="h2">Components</p-headline>
    <ul v-if="config.stories" class="list">
      <li v-for="(stories, category, index) in config.stories" :key="index">
        <p-headline variant="headline-5" tag="h3">{{ category }}</p-headline>
        <ul>
          <li v-for="(v, story, index) in stories" :key="index">
            <router-link class="link" :to="`/${area}/components/${encodeUrl(category)}/${encodeUrl(story)}`">
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
import {config as webConfig, DesignSystemWebConfig} from '@/../design-system.web.config';
import {config as appConfig, DesignSystemAppConfig} from '@/../design-system.app.config';
import {encodeUrl} from '@/services/utils';
import Divider from '@/components/Divider.vue';

@Component({
  components: {
    Divider
  }
})
export default class Sidebar extends Vue {
  public encodeUrl = encodeUrl;

  get area(): string {
    return this.$route.meta.area;
  }

  get config(): DesignSystemWebConfig | DesignSystemAppConfig {
    switch (this.area) {
      case 'app': return appConfig;
      case 'web': return webConfig;
      default: return webConfig;
    }
  }
}
</script>

<style scoped lang="scss">
  @import '~@porsche-ui/ui-kit-scss-utils/index';

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
