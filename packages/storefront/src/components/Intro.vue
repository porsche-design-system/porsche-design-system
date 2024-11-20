<template>
  <article>
    <p-text :theme="storefrontTheme" class="heading" size="large">
      The Porsche Design System provides the design fundamentals and elements for efficiently creating aesthetic and
      high-quality web applications, including easy-to-use Figma and UX Pin libraries, coded Web Components and
      comprehensive usage guidelines. Everything is built and tested following the Porsche quality standards and
      corporate design principles.
    </p-text>
    <p-text :theme="storefrontTheme" class="paragraph" color="contrast-high">
      We provide protected
      <a href="https://figma.com/file/EkdP468u4ZVuIRwalKCscb/Design-System-v3?type=design&node-id=105-146">Figma</a>
      and UX Pin libraries, as well as public accessible
      <a href="https://npmjs.com/org/porsche-design-system">npm releases</a> for Vanilla JS,
      <a href="https://angular.io" target="_blank">Angular</a>, <a href="https://react.dev">React</a>,
      <a href="https://nextjs.org">Next.js</a>, <a href="https://remix.run">Remix</a> and
      <a href="https://vuejs.org">Vue</a> based on Web Components with TypeScript and SSR support and appreciate any
      feedback, feature requests or suggestions on our public accessible
      <a href="https://github.com/porsche-design-system/porsche-design-system/issues">issue board</a>.
    </p-text>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { type StorefrontTheme } from '@/models';

@Component({})
export default class Intro extends Vue {
  public get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }
}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  article {
    display: grid;
    gap: $pds-grid-gap;

    @include pds-media-query-min('s') {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .heading,
  .paragraph {
    max-width: 54rem;
  }

  .heading {
    grid-column: span 3;
  }

  .paragraph {
    grid-column: span 2;
  }
</style>
