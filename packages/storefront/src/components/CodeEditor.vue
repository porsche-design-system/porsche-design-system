<template>
  <p-button
    type="button"
    :theme="theme"
    :icon-source="stackBlitzIcon"
    :disabled="framework === 'shared'"
    @click="
      openInStackBlitz({
        markup,
        framework,
        theme,
        externalStackBlitzDependencies,
        backgroundColorScheme: colorScheme,
        sharedImportKeys,
      })
    "
    >Edit in StackBlitz
  </p-button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import type { ColorScheme, Framework, Theme } from '@/models';
  import { openInStackBlitz } from '@/utils';
  import type { ExternalStackBlitzDependency, SharedImportKey } from '@/utils';

  @Component
  export default class CodeEditor extends Vue {
    @Prop({ default: '' }) public markup!: string;
    @Prop({ default: 'light' }) public theme!: Theme;
    @Prop({ default: 'vanilla-js' }) public framework!: Exclude<Framework, 'shared'>;
    @Prop({ default: 'default' }) public colorScheme!: ColorScheme;
    @Prop() public externalStackBlitzDependencies!: ExternalStackBlitzDependency[];
    @Prop() public sharedImportKeys!: SharedImportKey[];

    stackBlitzIcon = require('../assets/icon-stackblitz.svg');
    openInStackBlitz = openInStackBlitz;
  }
</script>
