<template>
  <div>

    <header class="teaser">
      <div class="cover">
        <video
          class="video"
          src="../assets/porsche-ui-kit.mp4"
          poster="../assets/porsche-ui-kit.jpg"
          autoPlay muted playsInline></video>
      </div>
    </header>

    <article class="intro">
      <p-grid>
        <p-grid-child size='{"base": 12, "m": 4}'>
          <p-headline type="headline-3" level="1">Porsche UI Kit</p-headline>
          <p-text type="24">Design System</p-text>
          <p-text class="p-spacing-mt--8">
            <router-link to="/getting-started/about">Learn more about it</router-link>
          </p-text>
        </p-grid-child>
        <p-grid-child class="p-spacing-mt--24 p-spacing-mt--0-m" size='{"base": 12, "m": 8}'>
          <p-text type="24">
            The Porsche UI Kit provides the design fundamentals for easily creating aesthetic and qualitative
            digital products. Ready to use as reusable Sketch libraries, coded React components or HTML and CSS
            elements. Everything built and tested following the Porsche quality standards and corporate design
            principles.
          </p-text>
          <p-text class="p-spacing-mt--16">
            While Porsche UI Kit v1 is coming soon as npm package with code examples and design documentation have
            a look at v0 documentation of <a href="https://ui.porsche.com/v0/core/">Porsche UI Kit – Core v0</a>
            and <a href="https://ui.porsche.com/v0/react/">Porsche UI Kit – React v0</a> in the meantime.
          </p-text>
          <p-flex class="p-spacing-mt--16" gap="16" wrap="wrap">
            <p-flex-item>
              <p-button-regular class="p-spacing-mt--16" variant="highlight" href="/#/getting-started/start-designing">Start designing</p-button-regular>
            </p-flex-item>
            <p-flex-item>
              <p-button-regular class="p-spacing-mt--16" variant="highlight" href="/#/getting-started/start-coding">Start coding</p-button-regular>
            </p-flex-item>
          </p-flex>
        </p-grid-child>
      </p-grid>
    </article>

    <article class="newsletter">
      <p-grid>
        <p-grid-child size='{"base": 12, "m": 3}'>
          <p-headline type="headline-3" level="2">Always stay informed</p-headline>
        </p-grid-child>
        <p-grid-child size='{"base": 12, "m": 8}' offset='{"base": 0, "m": 1}'>
          <p-text type="24">Join our mailing list and get informed about relevant updates and topics.</p-text>
          <p-text class="p-spacing-mt--16">
            <a href="http://eepurl.com/ghVSjH" target="_blank" rel="noopener noreferrer">Subscribe to mailing list</a>
          </p-text>
        </p-grid-child>
      </p-grid>
    </article>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Home extends Vue {}
</script>

<style scoped lang="scss">
  @import "~@porscheui/ui-kit-js/src/styles/utility/index";

  .teaser {
    &:first-child {
      margin-top: -$p-spacing-32;

      @include breakpoint("s") {
        margin-top: -$p-spacing-64;
      }
    }

    margin: {
      left: -$p-spacing-32;
      right: -$p-spacing-32;
    }

    @include breakpoint("s") {
      margin: {
        left: -$p-spacing-64;
        right: -$p-spacing-64;
      }
    }
  }

  .cover {
    position: relative;
    padding-top: 34%;
    overflow: hidden;
    background: $p-color-neutral-grey-2;
    border-bottom: 1px solid $p-color-neutral-grey-2;

  }

  .video {
    width: calc(100% + 4px);
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .intro {
    margin: {
      left: -$p-spacing-32;
      right: -$p-spacing-32;
    }
    padding: $p-spacing-32;

    @include breakpoint("s") {
      margin: {
        left: -$p-spacing-64;
        right: -$p-spacing-64;
      }
      padding: $p-spacing-64;
    }
    p a {
      text-decoration: none;
      color: $p-color-porsche-red;
      transition: color $p-animation-hover-duration $p-animation-hover-bezier;

      &:hover {
        color: $p-color-porsche-dark-red;
      }
    }

    h2 + p a {
      border-bottom: 1px solid $p-color-porsche-red;
    }
  }

  .newsletter {
    &:last-child {
      margin-bottom: -$p-spacing-32;

      @include breakpoint("s") {
        margin-bottom: -$p-spacing-64;
      }
    }

    margin: {
      left: -$p-spacing-32;
      right: -$p-spacing-32;
    }
    padding: $p-spacing-32;
    background: $p-color-surface-light;

    @include breakpoint("s") {
      margin: {
        left: -$p-spacing-64;
        right: -$p-spacing-64;
      }
      padding: $p-spacing-64;
    }

    a {
      border-bottom: 1px solid $p-color-porsche-red;
      text-decoration: none;
      color: $p-color-porsche-red;
      transition: color $p-animation-hover-duration $p-animation-hover-bezier;

      &:hover {
        color: $p-color-porsche-dark-red;
      }
    }
  }
</style>
