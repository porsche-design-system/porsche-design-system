<template>
  <form action="https://codepen.io/pen/define" method="POST" target="_blank">
    <input type="hidden" name="data" :value="codepen" />
    <p-button type="submit" :icon-source="codepenIcon">Edit in CodePen</p-button>
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
  import { getParameters } from 'codesandbox/lib/api/define';
  import { escapeHtml } from '@/utils';

  @Component
  export default class CodeEditor extends Vue {
    @Prop({ default: '' }) public markup!: string;

    codepenIcon = require('../assets/icon-codepen.svg');

    // public mounted(): void {
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

    public get codepen() {
      return JSON.stringify({
        // css_external: 'https://...css',
        layout: 'left',
        editors: '100',
        title: 'Porsche Design System',
        html: this.markup,
        js_external: 'https://designsystem.porsche.com/v2/pds-loader.js',
        js: 'porscheDesignSystem.load()'
      });
    }
  }
</script>
