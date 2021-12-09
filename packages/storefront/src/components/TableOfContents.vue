<template>
  <div v-if="links.length > 1" class="toc">
    <p-headline variant="headline-5">Table of Contents</p-headline>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <p-link-pure :href="link.href" :icon="returnIcon" v-on:click="onLinkClick(link, $event)">{{
          link.title
        }}</p-link-pure>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { paramCase } from 'change-case';
  import { componentsReady } from '@porsche-design-system/components-js';

  type Link = { href: string; title: string };

  @Component
  export default class TableOfContents extends Vue {
    links: Link[] = [];
    returnIcon = require('../assets/icon-return.svg');

    mounted(): void {
      const currentUrl = document.location.href.replace(/#.*/, '');
      this.links = Array.from<HTMLElement>(this.$el.parentElement!.parentElement!.querySelectorAll('h2')).map((h2) => {
        const { innerText } = h2;
        const id = paramCase(innerText);
        const href = currentUrl + '#' + id;

        // add anchor link to headline
        const link = document.createElement('p-link-pure');
        (link as any).size = 'inherit';
        (link as any).innerText = '#';
        (link as any).icon = 'none';
        (link as any).href = href;
        link.addEventListener('click', (e) => {
          this.onLinkClick({ title: '', href }, e);
        });

        h2.append(link);
        h2.id = id;

        return {
          href,
          title: innerText,
        };
      });

      componentsReady().then(this.scrollToAnchorLink);
    }

    private scrollToAnchorLink(): void {
      const { hash } = window.location;

      if (hash) {
        const { offsetTop } = (this.$el.parentElement!.parentElement!.querySelector(hash) as HTMLElement) || {};
        window.scrollTo({ top: offsetTop });
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
    margin-top: 4rem;
  }

  li {
    list-style: none;
  }
</style>
