<template>
  <p-button
    type="submit"
    :theme="theme"
    :icon-source="stackBlitzIcon"
    @click="
      openInStackBlitz({
        markup,
        framework,
        theme,
        hasFrameworkMarkup,
        additionalDependencies,
        colorScheme,
      })
    "
    >Edit in StackBlitz
  </p-button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { Theme } from '@/models';
  import { openInStackBlitz } from '@/utils/stackblitz/openInStackBlitz';
  import type { FrameworksWithoutShared } from '@/utils/stackblitz/helper';

  @Component
  export default class CodeEditor extends Vue {
    @Prop({ default: '' }) public markup!: string;
    @Prop({ default: 'light' }) public theme!: Theme;
    @Prop({ default: 'vanilla-js' }) public framework!: FrameworksWithoutShared;
    @Prop({ default: false }) public hasFrameworkMarkup!: boolean;
    @Prop({ default: 'default' }) public colorScheme!: 'default' | 'surface';
    @Prop() public additionalDependencies?: string[];

    stackBlitzIcon = require('../assets/icon-stackblitz.svg');
    openInStackBlitz = openInStackBlitz;
  }
</script>
