<template>
  <div>
    <header class="teaser">
      <div class="cover">
        <div class="cover-intro">
          <div class="cover-intro-container">
          <p-display size="small" tag="h2">Welcome to the new digital</p-display>
          <p-text class="cover-intro-text" color="contrast-high" size="large">Become today a part of tomorrow’s Porsche new design language with the new Porsche Design System 3.0.</p-text>
          </div>
        </div>
        <div class="cover-image"></div>
      </div>
    </header>

    <article class="intro">

      <p-grid>
        <p-grid-item class="spacing-mt-32 spacing-mt-0-min-m" size="{base: 12, m: 12}">
          <p-text size="large">
            The Porsche Design System provides the design fundamentals and elements for efficiently creating aesthetic
            and high-quality web applications, including easy-to-use Figma and UX Pin libraries, coded Web Components
            and comprehensive usage guidelines. Everything is built and tested following the Porsche quality standards
            and corporate design principles.
          </p-text>
          <p-text class="spacing-mt-32" size="medium" color="">
            We provide releases for Vanilla JS, Angular and React based on Web Components and appreciate any feedback, feature requests or suggestions on our public Contribution Board.
          </p-text>
          <p-flex class="spacing-mt-16" gap="16" wrap="wrap">
            <p-flex-item>
              <p-link-tile href="'#'" label="'Some Label'" description="'Some Description'" aspect-ratio="3:4">
                <img src="https://designsystem.porsche.com/v3/img/image-grid.acfa41cf.png" width="3000" height="2000" alt="'Some alt text'" />
              </p-link-tile>
            </p-flex-item>
            <p-flex-item>
              <p-link variant="primary" class="router-link spacing-mt-16 spacing-mr-32">
                <router-link to="/start-coding/introduction">Start Coding</router-link>
              </p-link>
            </p-flex-item>
            <p-flex-item>
              <p-link variant="primary" class="router-link spacing-mt-16">
                <router-link to="/news/migration-guide">Start migrating from v2 to v3 (technically)</router-link>
              </p-link>
            </p-flex-item>
          </p-flex>
        </p-grid-item>
      </p-grid>
    </article>
    <article class="newsletter">
      <p-grid>
        <p-grid-item size="{base: 12, m: 3}">
          <p-heading size="large" tag="h2">Learn more about UX Design at Porsche</p-heading>
        </p-grid-item>
        <p-grid-item size="{base: 12, m: 8}" offset="{base: 0, m: 1}">
          <p-text size="medium"
            >Are you working for a digital product or application at Porsche? We are happy to invite you to our UX
            onboarding and tell you more about our culture of digital experience design.
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
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class Home extends Vue {}
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @import '../styles/internal.variables';

  .teaser {
    &:first-child {
      margin-top: -$pds-spacing-static-large;

      @include pds-media-query-min('s') {
        margin-top: -4rem;
      }
    }

    margin: {
      left: -$pds-spacing-static-large;
      right: -$pds-spacing-static-large;
    }

    @include pds-media-query-min('s') {
      margin: {
        left: -4rem;
        right: -4rem;
      }
    }
  }

  .cover {
    position: relative;
    height: 900px;
    overflow: hidden;
    background: radial-gradient(54.76% 107.92% at 64.08% 89.73%, #C5C8DF 0%, #EBDDF9 52.6%, #FFFFFF 100%);
  }

  .cover-image {
    background-image: url("../assets/tablet.png");
    background-repeat: no-repeat;
    background-size: 50%;
    width: 100%;
    height: 100%;
    background-position: right 10vw bottom -20vh;
  }


  .cover-intro {
    position: absolute;
    width: 100%;
    height: 100%;
}

  .cover-intro-container {
    text-align: left;
    position: absolute;
    top: 25%;
    left: 0;
    color: white;
    width: 30%;
    height: auto;
    vertical-align: middle;
    margin: 4rem;
  }

  .cover-intro-text {
    padding-top: $pds-spacing-fluid-medium;
  }



  .intro {
    margin: {
      left: -$pds-spacing-static-large;
      right: -$pds-spacing-static-large;
    }
    padding: $pds-spacing-static-large;

    @include pds-media-query-min('s') {
      margin: {
        left: -4rem;
        right: -4rem;
      }
      padding: 4rem;
    }

    p a {
      text-decoration: none;
      color: $pds-theme-light-primary;
      transition: color $p-animation-hover-duration $p-animation-hover-bezier;

      &:hover {
        color: darken($pds-theme-light-state-hover, 10%);
      }
    }

    h2 + p a {
      border-bottom: 1px solid $pds-theme-light-primary;
    }
  }

  .newsletter {
    &:last-child {
      margin-bottom: -$pds-spacing-static-large;

      @include pds-media-query-min('s') {
        margin-bottom: -4rem;
      }
    }

    margin: {
      left: -$pds-spacing-static-large;
      right: -$pds-spacing-static-large;
    }
    padding: $pds-spacing-static-large;
    background: $pds-theme-light-background-surface;

    @include pds-media-query-min('s') {
      margin: {
        left: -4rem;
        right: -4rem;
      }
      padding: 4rem;
    }

    a {
      color: $pds-theme-light-primary;
      transition: color $p-animation-hover-duration $p-animation-hover-bezier;

      &:hover {
        color: darken($pds-theme-light-state-hover, 10%);
      }
    }
  }
</style>
