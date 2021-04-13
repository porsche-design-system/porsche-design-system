<template>
  <div class="disclaimer" role="complementary" aria-label="disclaimer">
    <p-text>
      <strong>Announcement:</strong> Porsche Design System is now on v2.0.0, therefore this site and documentation is outdated. <a href="https://designsystem.porsche.com/v2">Please visit the new Porsche Design System to get the most up to date designs and code!</a>
    </p-text>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Disclaimer extends Vue {}
</script>

<style scoped lang="scss">
@import '~@porsche-design-system/utilities/scss';

.disclaimer {
  padding: $p-spacing-8 $p-spacing-32;
  background: $p-color-theme-light-notification-warning;
}
</style>
