<template>
  <div v-if="links.length > 1" class="toc">
    <p-heading :theme="storefrontTheme" size="medium" tag="h2">{{
      isChangelog ? 'Last Releases' : 'Table of Contents'
    }}</p-heading>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <p-link-pure
          :theme="storefrontTheme"
          :href="link.href"
          :icon-source="returnIcon"
          v-on:click="onLinkClick(link, $event)"
          >{{ link.title }}</p-link-pure
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { paramCase } from 'change-case';
import { componentsReady } from '@porsche-design-system/components-js';
import { getAnchorLink } from '@/utils';
import type { StorefrontTheme } from '@/models';

type Link = { href: string; title: string };

@Component
export default class TableOfContents extends Vue {
  @Prop({ default: 'h2' }) public tag!: 'h2' | 'h3';
  @Prop({ default: false }) public isChangelog!: boolean;

  links: Link[] = [];
  returnIcon = require('../assets/icon-return.svg');

  public get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }

  mounted(): void {
    // cut off trailing `#` character
    const currentUrl = getAnchorLink('').slice(0, -1);

    const getHeadings = function (elem: Element, tag: string): HTMLElement[] {
      const descendants = elem.parentNode!.children;
      return Array.from(descendants).filter((sibling) => sibling.tagName.toLowerCase() === tag) as HTMLElement[];
    };

    this.links = getHeadings(this.$el, this.tag).map((heading) => {
      const { innerText } = heading;
      // extract version '3.8.0' from '[3.8.0] - 2023-11-02'
      const title = this.isChangelog ? innerText.replace(/\[(\d+\.\d+\.\d+(-.+)?)].+/, '$1') : innerText;
      const id = (this.isChangelog ? 'v' : '') + paramCase(title); // hash needs to start with a letter
      const href = currentUrl + '#' + id;

      // add anchor link to headline
      const link = document.createElement('p-link-pure');
      /* eslint-disable @typescript-eslint/no-explicit-any */
      (link as any).theme = this.storefrontTheme;
      (link as any).size = 'inherit';
      (link as any).innerText = '#';
      (link as any).title = 'Link to this heading';
      (link as any).icon = 'none';
      (link as any).href = encodeURI(href);
      /* eslint-enable */
      link.addEventListener('click', (e) => {
        this.onLinkClick({ title: '', href }, e);
      });

      heading.append(link);
      heading.id = id;
      // enable programmatic focusing, so that keyboard users don't break flow when using TOC
      heading.tabIndex = -1;

      return {
        href,
        title,
      };
    });

    if (this.isChangelog) {
      this.links = this.links
        .filter((item) => !item.title.match(/-(?:rc|alpha|beta)/)) // keep only stable releases
        .slice(1, 6); // skip unreleased and limit to 5
    }

    componentsReady().then(this.scrollToAnchorLink);
  }

  private scrollToAnchorLink(): void {
    const { hash } = window.location;

    if (hash) {
      const headline = this.$el.parentElement!.parentElement!.querySelector(hash) as HTMLElement;

      window.scrollTo({
        top: headline.offsetTop,
        behavior: window.matchMedia('(prefers-reduced-motion)').matches ? 'auto' : 'smooth',
      });
      headline.focus({ preventScroll: true });
    }
  }

  private onLinkClick(link: Link, e: MouseEvent): void {
    const { altKey, ctrlKey, metaKey, shiftKey } = e;
    if (metaKey || altKey || ctrlKey || shiftKey) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    window.history.pushState(null, '', link.href);
    this.scrollToAnchorLink();
  }
}
</script>

<style scoped lang="scss">
  .toc {
    margin-top: 4rem; // synced with skeleton in Page.vue
  }

  p-heading {
    margin-bottom: 1rem; // synced with skeleton in Page.vue
  }

  li {
    list-style: none;
  }
</style>
