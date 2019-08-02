<template>
  <nav>
    <ul class="list">
      <li v-for="(pages, category, index) in config.pages" :key="index">
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
    <Divider v-if="isAreaWeb()" spacing="small" />
    <p-headline v-if="isAreaWeb()" variant="headline-4" tag="h2">Components</p-headline>
    <ul class="list" v-if="isAreaWeb()">
      <li
        v-for="(stories, category, index) in config.stories"
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
import {config as webConfig, DesignSystemWebConfig} from '@/../design-system.web.config';
import {config as appConfig, DesignSystemAppConfig} from '@/../design-system.app.config';
import {decodeUrl, encodeUrl, featureToggle} from '@/services/utils';
import Divider from '@/components/Divider.vue';

@Component({
  components: {
    Divider
  }
})
export default class Sidebar extends Vue {
  public encodeUrl = encodeUrl;
  public featureToggle = featureToggle;

  get area(): string {
    let area = '';
    if (this.$route.meta.area) {
      area = decodeUrl(this.$route.meta.area).toLowerCase();
    } else if (this.$route.params.area) {
      area = decodeUrl(this.$route.params.area).toLowerCase();
    }

    if (['web', 'app'].includes(area)) {
      return area;
    }
    return 'web';
  }

  get config(): DesignSystemWebConfig | DesignSystemAppConfig {
    return this.area === 'app' ? appConfig : webConfig;
  }

  public isAreaWeb(): boolean {
    return this.area === 'web';
  }
}
</script>

<style scoped lang="scss">
  @import '~@porscheui/ui-kit-scss-utils/index';

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
