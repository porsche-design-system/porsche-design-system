<template>
  <div class="disclaimer">
    <p-text theme="dark">
      We are very excited to announce the first Release Candidate 1.0.0-RC.1 of the Porsche Design System.
    </p-text>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Disclaimer extends Vue {}
</script>

<style scoped lang="scss">
@import '~@porsche-design-system/scss-utils/index';

.disclaimer {
  padding: $p-spacing-8 $p-spacing-32;
  background: $p-color-theme-light-notification-success;
}
</style>
