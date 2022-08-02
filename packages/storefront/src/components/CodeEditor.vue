<template>
  <p-button type="submit" :theme="theme" :icon-source="stackBlitzIcon" @click="editInStackBlitz()"
    >Edit in StackBlitz
  </p-button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { Theme } from '@/models';
  import { SharedTableMarkup, FrameworksWithoutShared, openInStackBlitz } from '@/utils/stackblitz/openInStackBlitz';

  @Component
  export default class CodeEditor extends Vue {
    @Prop({ default: '' }) public markup!: string;
    @Prop({ default: 'light' }) public theme!: Theme;
    @Prop({ default: 'vanilla-js' }) public framework!: FrameworksWithoutShared;
    @Prop({ default: false }) public hasFrameworkMarkup!: boolean;
    @Prop({ default: 'default' }) public colorScheme!: 'default' | 'surface';
    @Prop({ default: '' }) public sharedTableMarkup?: SharedTableMarkup;
    @Prop({ default: '' }) public additionalDependencies?: string[];

    stackBlitzIcon = require('../assets/icon-stackblitz.svg');

    // TODO: Redundant, how to improve?
    editInStackBlitz() {
      openInStackBlitz({
        markup: this.markup,
        framework: this.framework,
        theme: this.theme,
        hasFrameworkMarkup: this.hasFrameworkMarkup,
        additionalDependencies: this.additionalDependencies,
        sharedTableMarkup: this.sharedTableMarkup,
        colorScheme: this.colorScheme,
      });
    }
  }
</script>
