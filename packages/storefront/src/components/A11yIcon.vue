<template>
  <p-icon theme="auto" name="accessibility" :size="size" color="notification-info" aria-hidden="true"></p-icon>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class A11yIcon extends Vue {
    @Prop({ default: 'large' }) public size!: 'large' | 'medium' | 'small';
  }
</script>
