<template>
  <div>
    <nav class="tabs" v-if="hasTabs">
      <p-text size="inherit" tag="div" weight="thin" class="tab" v-for="(tab, index) in tabs" :key="index">
        <router-link :to="createTabLink(tab)">{{ tab }}</router-link>
      </p-text>
    </nav>
    <Markdown>
      <component :is="component" v-for="(component, index) in components" :key="index"></component>
    </Markdown>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { config as STOREFRONT_CONFIG } from '@/../storefront.config';
  import Markdown from '@/components/Markdown.vue';
  import { ComponentListImport } from '@/interface';
  import { Component as ComponentType } from 'vue/types/options';
  import { capitalCase, paramCase } from 'change-case';

  @Component({
    components: {
      Markdown
    }
  })
  export default class Page extends Vue {
    public components: ComponentType[] = [];

    public get hasTabs(): boolean {
      return this.tabs.length > 0;
    }

    public get tabs(): string[] {
      const page = STOREFRONT_CONFIG?.[this.category]?.[this.page];

      if (!page || Array.isArray(page)) {
        return [];
      }

      return Object.keys(page);
    }

    public createTabLink(name: string): string {
      return `#${paramCase(name)}`;
    }

    @Watch('$route')
    private async onRouteChange(): Promise<void> {
      await this.loadComponents();
    }

    private async mounted(): Promise<void> {
      await this.loadComponents();
    }

    private get category(): string {
      return capitalCase(this.$route.params.category);
    }

    private get page(): string {
      return capitalCase(this.$route.params.page);
    }

    private get tab(): string {
      return capitalCase(this.$route.hash.substring(1));
    }

    private get pages(): ComponentListImport {
      const page = STOREFRONT_CONFIG?.[this.category]?.[this.page];

      if (!page || Array.isArray(page)) {
        return page;
      }

      return page[this.tab];
    }

    private async loadComponents(): Promise<void> {
      this.components = [];
      await this.$store.dispatch('toggleLoadingAsync', true);
      try {
        for (const page of this.pages) {
          this.components.push((await page()).default);
        }
      } catch (e) {
        await this.redirect();
      }
      await this.$store.dispatch('toggleLoadingAsync', false);
    }

    private async redirect(): Promise<void> {
      if (this.hasTabs) {
        await this.$router.replace(this.createTabLink(this.tabs[0]));
      } else {
        await this.$router.replace({name: `404`});
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@porsche-design-system/utilities/scss";

  .tabs {
    position: relative;
    display: flex;
    overflow-x: auto;
    margin-bottom: $p-spacing-64;
    border-bottom: 1px solid $p-color-theme-light-neutral-contrast-low;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      margin-left: p-rem(-48px);
      width: p-rem(48px);
      background: rgb(255,255,255);
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%);
    }

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
          outline-offset: -1px;
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
