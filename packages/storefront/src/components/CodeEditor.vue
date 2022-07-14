<template>
  <p-button type="submit" :theme="theme" :icon-source="stackBlitzIcon" @click="editInStackBlitz()"
    >Edit in StackBlitz
  </p-button>

  <!--    <div class="codepen" :data-prefill="dataPrefill" data-height="400" data-theme-id="light" data-editable="true">-->
  <!--      <pre data-lang="html" v-html="escapedMarkup"></pre>-->
  <!--      <pre data-lang="js">porscheDesignSystem.load()</pre>-->
  <!--    </div>-->
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { Framework, Theme } from '@/models';
  import { themeDark } from '@porsche-design-system/utilities-v2';
  import { codePenConfig } from '@/lib/partialResults';
  import { openInStackBlitz } from '@/utils/stackblitz';

  @Component
  export default class CodeEditor extends Vue {
    @Prop({ default: '' }) public markup!: string;
    @Prop({ default: 'light' }) public theme!: Theme;
    @Prop({ default: 'vanilla-js' }) public framework!: Framework;
    @Prop({ default: '' }) public additionalJavaScriptLogic?: string;

    stackBlitzIcon = require('../assets/icon-stackblitz.svg');

    editInStackBlitz() {
      openInStackBlitz({
        markup: this.markup,
        framework: this.framework,
        theme: this.theme,
        additionalJavaScriptLogic: this.additionalJavaScriptLogic,
      });
    }

    // private mounted(): void {
    //   // @ts-ignore
    //   window.__CPEmbed(this.$el.querySelector('.codepen'));
    //   <script async src="https://static.codepen.io/assets/embed/ei.js"><\/script>
    // }
    //
    // public get dataPrefill(): string {
    //   return JSON.stringify({
    //     scripts: 'https://designsystem.porsche.com/v2/pds-loader.js'
    //   });
    // }
    //
    // public get escapedMarkup(): string {
    //   return escapeHtml(this.markup);
    // }

    public get codepen(): string {
      // https://blog.codepen.io/documentation/prefill/
      return JSON.stringify({
        title: 'Porsche Design System',
        editors: '100', // html open, css closed, js closed
        html: this.markup,
        ...codePenConfig,
        ...(this.theme === 'dark' && { css: codePenConfig.css + `body { background: ${themeDark.background.base}; }` }),
        // js_external: `${path}${PDS_LOADER_FILENAME}`,
      });
    }
  }
</script>
