<template>
  <p-icon class="icon" name="accessibility" size="medium" color="notification-neutral" aria-hidden="true"></p-icon>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class A11yIcon extends Vue {}
</script>

<style scoped lang="scss">
  .icon {
    vertical-align: text-bottom;
  }
</style>
