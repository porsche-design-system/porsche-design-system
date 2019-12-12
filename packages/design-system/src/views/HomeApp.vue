<template>
  <div>
    <header class="teaser">
      <div class="cover">
        <video
          class="video"
          src="../assets/app/porsche-ui-kit.mp4"
          poster="../assets/app/porsche-ui-kit.jpg"
          autoplay
          muted
          playsinline
        ></video>
      </div>
    </header>

    <article class="intro">
      <p-grid>
        <p-grid-item size='{"base": 12, "m": 4}'>
          <p-headline variant="headline-3" tag="h1">Porsche Design System</p-headline>
          <p-text size="{ base:'small', s: 'medium' }">for native applications</p-text>
          <p-text class="spacing-mt-8">
            <router-link to="/app/getting-started/about">Learn more about it</router-link>
          </p-text>
        </p-grid-item>
        <p-grid-item class="spacing-mt-32 spacing-mt-0-min-m" size='{"base": 12, "m": 8}'>
          <p-text size="medium">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua.
          </p-text>
        </p-grid-item>
      </p-grid>
    </article>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class HomeApp extends Vue {}
</script>

<style scoped lang="scss">
  @import '~@porsche-ui/ui-kit-scss-utils/index';

  .teaser {
    &:first-child {
      margin-top: -$p-spacing-32;

      @include p-breakpoint('s') {
        margin-top: -$p-spacing-64;
      }
    }

    margin: {
      left: -$p-spacing-32;
      right: -$p-spacing-32;
    }

    @include p-breakpoint('s') {
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
    background: $p-color-theme-dark-neutral-2;
    border-bottom: 1px solid $p-color-theme-dark-neutral-2;
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

    @include p-breakpoint('s') {
      margin: {
        left: -$p-spacing-64;
        right: -$p-spacing-64;
      }
      padding: $p-spacing-64;
    }

    p a {
      text-decoration: none;
      color: $p-color-theme-light-brand;
      transition: color $p-animation-hover-duration $p-animation-hover-bezier;

      &:hover {
        color: darken($p-color-theme-light-brand, 10%);
      }
    }

    h2 + p a {
      border-bottom: 1px solid $p-color-theme-light-brand;
    }
  }
</style>
