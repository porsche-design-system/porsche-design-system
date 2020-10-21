<template>
  <div>
    <p-flex>
      <form action="https://codepen.io/pen/define" method="POST" target="_blank">
        <input type="hidden" name="data" :value="codepen" />
        <p-button type="submit">CodePen</p-button>
      </form>

      <form action="https://stackblitz.com/run?file=index.html" method="POST" target="_blank">
        <input type="hidden" name="project[files][index.js]" value="" />
        <input type="hidden" name="project[files][index.html]" :value="stackblitz.html" />
        <input type="hidden" name="project[description]" value="Porsche Design System" />
        <input type="hidden" name="project[dependencies]" value="{}" />
        <input type="hidden" name="project[template]" value="javascript" />
        <input type="hidden" name="project[options][openFile]" value="index.html" />
        <p-button type="submit">StackBlitz</p-button>
      </form>

      <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
        <input type="hidden" name="parameters" :value="codesandbox" />
        <p-button type="submit">CodeSandbox</p-button>
      </form>
    </p-flex>

    <div class="codepen" :data-prefill="dataPrefill" data-height="400" data-theme-id="light" data-editable="true">
      <pre data-lang="html" v-html="escapedMarkup"></pre>
      <pre data-lang="js">porscheDesignSystem.load()</pre>
    </div>
  </div>
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

    public mounted(): void {
      // @ts-ignore
      window.__CPEmbed(this.$el.querySelector('.codepen'));
    }

    public get dataPrefill(): string {
      return JSON.stringify({
        scripts: 'https://designsystem.porsche.com/v2/pds-loader.js'
      });
    }

    public get escapedMarkup(): string {
      return escapeHtml(this.markup);
    }

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

    /* eslint-disable no-useless-escape */
    public get stackblitz() {
      return {
        html:
          this.markup +
          `\n
  <script src="https://designsystem.porsche.com/v2/pds-loader.js"><\/script>
  <script>porscheDesignSystem.load();<\/script>`
      };
    }
    /* eslint-enable no-useless-escape */

    public get codesandbox() {
      return getParameters({
        files: {
          'index.html': {
            content: this.stackblitz.html,
            isBinary: false
          }
        }
      });
    }
  }
</script>
