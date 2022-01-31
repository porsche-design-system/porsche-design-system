<template>
  <form action="https://codepen.io/pen/define" method="POST" target="_blank">
    <input type="hidden" name="data" :value="codepen" />
    <p-button
      :theme="theme"
      type="submit"
      :icon-source="codepenIcon"
      :disabled="framework !== 'vanilla-js'"
      :title="framework !== 'vanilla-js' && 'CodePen is only available for Vanilla JS'"
      >Edit in CodePen</p-button
    >
  </form>

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
  import { getLoaderScript } from '@porsche-design-system/components-js/partials';

  @Component
  export default class CodeEditor extends Vue {
    @Prop({ default: '' }) public markup!: string;
    @Prop({ default: 'light' }) public theme!: Theme;
    @Prop({ default: 'vanilla-js' }) public framework!: Framework;

    codepenIcon = require('../assets/icon-codepen.svg');

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
        // css_external: 'https://...css',
        layout: 'left',
        editors: '100',
        title: 'Porsche Design System',
        html: this.markup,
        ...(this.theme === 'dark' && { css: `body { background: ${themeDark.background.base}; }` }),
        // js_external: `${path}${PDS_LOADER_FILENAME}`,
        js: getLoaderScript({ withoutTags: true }),
      });
    }
  }
</script>
