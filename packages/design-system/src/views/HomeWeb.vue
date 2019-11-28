<template>
  <div>
    <header class="teaser">
      <div class="cover">
        <video
          class="video"
          src="../assets/web/porsche-ui-kit.mp4"
          poster="../assets/web/porsche-ui-kit.jpg"
          autoplay
          muted
          playsinline
        ></video>
      </div>
    </header>

    <article class="intro">
      <p-grid>
        <p-grid-item size='{"base": 12, "m": 4}'>
          <p-headline variant="headline-3" tag="h1">Porsche UI Kit</p-headline>
          <p-text size="medium">Web Design System</p-text>
          <p-text class="spacing-mt-8">
            <router-link to="/web/getting-started/about">Learn more about it</router-link>
          </p-text>
        </p-grid-item>
        <p-grid-item class="spacing-mt-32 spacing-mt-0-min-m" size='{"base": 12, "m": 8}'>
          <p-text size="medium">
            The Porsche UI Kit Web Design System provides the design fundamentals and elements for efficiently creating aesthetic and high-quality
            web applications, including easy-to-use Sketch libraries, coded Web Components and comprehensive usage guidelines. Everything is built and tested following the Porsche quality standards and corporate design
            principles.
          </p-text>
          <p-text class="spacing-mt-32">
            We are happy to announce our first alpha version 1.0.0-alpha.x release of Porsche UI Kit (JS/ Angular/ React). Please take some time to check it out!
            We appreciate any feedback, feature requests or suggestions on our public <a href="https://github.com/porscheui/porsche-ui-contribution/issues">Contribution Board</a>.
          </p-text>
          <p-flex class="spacing-mt-16" gap="16" wrap="wrap">
            <p-flex-item>
              <p-button-regular
                class="spacing-mt-16 spacing-mr-32"
                variant="highlight"
                href="#/web/getting-started/start-designing"
              >Start Designing
              </p-button-regular>
            </p-flex-item>
            <p-flex-item>
              <p-button-regular
                class="spacing-mt-16"
                variant="highlight"
                href="#/web/getting-started/start-coding"
              >Start Coding
              </p-button-regular>
            </p-flex-item>
          </p-flex>
        </p-grid-item>
      </p-grid>
    </article>

    <article class="newsletter">
      <p-grid>
        <p-grid-item size='{"base": 12, "m": 3}'>
          <p-headline variant="headline-3" tag="h2">Always stay informed</p-headline>
        </p-grid-item>
        <p-grid-item size='{"base": 12, "m": 8}' offset='{"base": 0, "m": 1}'>
          <p-text
            size="medium"
          >Join our mailing list and get informed about relevant updates and topics.
          </p-text>
          <p-text variant="18" class="spacing-mt-16">
            <a
              href="http://eepurl.com/gnOIXD"
              target="_blank"
              rel="noopener noreferrer"
            >Subscribe to mailing list</a>
          </p-text>
        </p-grid-item>
      </p-grid>
    </article>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class HomeWeb extends Vue {}
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

    @include p-breakpoint('s') {
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

      @include p-breakpoint('s') {
        margin-bottom: -$p-spacing-64;
      }
    }

    margin: {
      left: -$p-spacing-32;
      right: -$p-spacing-32;
    }
    padding: $p-spacing-32;
    background: $p-color-surface-light;

    @include p-breakpoint('s') {
      margin: {
        left: -$p-spacing-64;
        right: -$p-spacing-64;
      }
      padding: $p-spacing-64;
    }

    a {
      color: $p-color-porsche-red;
      transition: color $p-animation-hover-duration $p-animation-hover-bezier;

      &:hover {
        color: $p-color-porsche-dark-red;
      }
    }
  }
</style>
