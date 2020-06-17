<template>
  <div>
    <header class="teaser">
      <div class="cover">
        <video
          class="video"
          src="../assets/porsche-design-system.mp4"
          poster="../assets/porsche-design-system.jpg"
          autoplay
          muted
          playsinline
        >
          <track src="../assets/captions_en.vtt" kind="descriptions" srclang="en" label="english captions">
        </video>
      </div>
    </header>

    <article class="intro">
      <p-grid>
        <p-grid-item size='{"base": 12, "m": 4}'>
          <p-headline variant="headline-3" tag="h1">Porsche Design System</p-headline>
          <p-text size="{ base:'small', s: 'medium' }">for web applications</p-text>
          <p-text class="spacing-mt-8">
            <router-link to="/about/introduction">Learn more about it</router-link>
          </p-text>
        </p-grid-item>
        <p-grid-item class="spacing-mt-32 spacing-mt-0-min-m" size='{"base": 12, "m": 8}'>
          <p-text size="medium">
            The Porsche Design System provides the design fundamentals and elements for efficiently creating aesthetic and high-quality
            web applications, including easy-to-use Sketch libraries, coded Web Components and comprehensive usage guidelines. Everything is built and tested following the Porsche quality standards and corporate design
            principles.
          </p-text>
          <p-text class="spacing-mt-32">
            We provide releases for <strong>Vanilla JS</strong>, <strong>Angular</strong> and <strong>React</strong> based on Web Components and appreciate any feedback, feature requests or suggestions on our public <a href="https://github.com/porscheui/porsche-design-system-contribution/issues">Contribution Board</a>.
          </p-text>
          <p-flex class="spacing-mt-16" gap="16" wrap="wrap">
            <p-flex-item>
              <router-link to="/start-designing/introduction" class="router-link spacing-mt-16 spacing-mr-32">
                <p-link variant="primary">Start Designing</p-link>
              </router-link>
            </p-flex-item>
            <p-flex-item>
              <router-link to="/start-coding/introduction" class="router-link spacing-mt-16">
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
          <p-headline variant="headline-3" tag="h2">Learn more about UX Design at Porsche</p-headline>
        </p-grid-item>
        <p-grid-item size='{"base": 12, "m": 8}' offset='{"base": 0, "m": 1}'>
          <p-text
            size="medium">Are you working for a digital product or application at Porsche? We are happy to invite you to our UX onboarding and tell you more about our culture of digital experience design.
          </p-text>
          <p-text variant="18" class="spacing-mt-16">
            <p-link variant="tertiary" href="https://ux.porsche.com">Sign Up for UX Onboarding</p-link>
          </p-text>
        </p-grid-item>
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
  @import '~@porsche-design-system/utilities/scss';

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
    background: $p-color-theme-light-neutral-contrast-low;
    border-bottom: 1px solid $p-color-theme-light-neutral-contrast-low;
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
        color: darken($p-color-theme-light-state-hover, 10%);
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
        color: darken($p-color-theme-light-state-hover, 10%);
      }
    }
  }
</style>
