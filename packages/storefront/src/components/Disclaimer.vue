<template>
  <div class="disclaimer" role="complementary" aria-label="disclaimer">
    <p-text>
      <strong>Announcement:</strong> This version of the Porsche Design System is outdated. <a href="https://designsystem.porsche.com">Please visit the new Porsche Design System to get the latest design and code!</a>
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
