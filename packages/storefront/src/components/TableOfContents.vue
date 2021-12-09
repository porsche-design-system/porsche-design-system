<template>
  <div class="toc">
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
      const { pathname } = document.location;
      this.links = Array.from(this.$el.parentElement!.querySelectorAll('h2')).map((h2) => {
        const { innerText } = h2;
        const id = paramCase(innerText);
        h2.id = id;

        return {
          href: pathname.slice(1) + '#' + id,
          title: innerText,
        };
      });

      componentsReady().then(this.scrollToAnchorLink);
    }

    private scrollToAnchorLink(): void {
      const { hash } = window.location;

      if (hash) {
        const { offsetTop } = (this.$el.parentElement!.querySelector(hash) as HTMLElement) || {};
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
