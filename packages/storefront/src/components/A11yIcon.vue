<template>
  <p-icon class="icon" name="accessibility" :size="size" color="notification-neutral" aria-hidden="true"></p-icon>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class A11yIcon extends Vue {
    @Prop({ default: 'medium' }) public size!: 'medium' | 'small';
  }
</script>

<style scoped lang="scss">
  .icon {
    vertical-align: text-bottom;
  }
</style>
