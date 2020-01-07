<template>
  <div>
    <header class="teaser">
      <div class="cover">
        <video
          class="video"
          src="../assets/web/porsche-design-system.mp4"
          poster="../assets/web/porsche-design-system.jpg"
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
          <p-text size="{ base:'small', s: 'medium' }">for web applications</p-text>
          <p-text class="spacing-mt-8">
            <router-link to="/web/getting-started/about">Learn more about it</router-link>
          </p-text>
        </p-grid-item>
        <p-grid-item class="spacing-mt-32 spacing-mt-0-min-m" size='{"base": 12, "m": 8}'>
          <p-text size="medium">
            The Porsche Design System provides the design fundamentals and elements for efficiently creating aesthetic and high-quality
            web applications, including easy-to-use Sketch libraries, coded Web Components and comprehensive usage guidelines. Everything is built and tested following the Porsche quality standards and corporate design
            principles.
          </p-text>
          <p-text class="spacing-mt-32">
            We are happy to announce the first Release Candidate 1.0.0-RC.1 of the Porsche Design System (JS/ Angular/ React). Please take some time to check it out!
            We appreciate any feedback, feature requests or suggestions on our public <a href="https://github.com/porscheui/porsche-ui-contribution/issues">Contribution Board</a>.
          </p-text>
          <p-flex class="spacing-mt-16" gap="16" wrap="wrap">
            <p-flex-item>
              <router-link to="/web/getting-started/start-designing" class="router-link spacing-mt-16 spacing-mr-32">
                <p-link variant="primary">Start Designing</p-link>
              </router-link>
            </p-flex-item>
            <p-flex-item>
              <router-link to="/web/getting-started/start-coding" class="router-link spacing-mt-16">
                <p-link variant="primary">Start Coding</p-link>
              </router-link>
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
  @import '~@porsche-design-system/scss-utils/index';

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
    background: $p-color-theme-light-surface;

    @include p-breakpoint('s') {
      margin: {
        left: -$p-spacing-64;
        right: -$p-spacing-64;
      }
      padding: $p-spacing-64;
    }

    a {
      color: $p-color-theme-light-brand;
      transition: color $p-animation-hover-duration $p-animation-hover-bezier;

      &:hover {
        color: darken($p-color-theme-light-brand, 10%);
      }
    }
  }
</style>
