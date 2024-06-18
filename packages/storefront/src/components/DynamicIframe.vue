<template>
  <div
    :class="{
      iframe: true,
      'iframe--fullscreen': isFullWindow,
    }"
  >
    <iframe ref="iframe" :src="iframeSrc"></iframe>
    <p-button
      class="btn-fullscreen"
      type="button"
      :icon="isFullWindow ? 'zoom-in' : 'zoom-out'"
      :aria="JSON.stringify({ 'aria-expanded': isFullWindow })"
      @click="toggleFullscreen()"
    >
      {{ isFullWindow ? 'Minimize' : 'Maximize' }}
    </p-button>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { getBackgroundColor } from '@/utils/stackblitz/helper';
  import { Theme } from '@porsche-design-system/components';

  @Component
  export default class DynamicIframe extends Vue {
    @Prop({ type: String, default: 'about:blank' }) iframeSrc!: string;
    @Prop({ type: String, required: true }) markup!: string;
    @Prop() theme!: Theme;

    created() {
      console.log(this.theme);
      console.log(`body { background: ${getBackgroundColor(this.theme, 'background-base')}; }`);
    }

    isFullWindow = false;

    mounted() {
      this.injectMarkup();
    }

    @Watch('markup')
    onMarkupChanged() {
      this.injectMarkup();
    }

    injectMarkup() {
      const iframe = this.$refs.iframe as HTMLIFrameElement;
      if (iframe) {
        iframe.onload = () => {
          // TODO: Share with openInStackBlitz
          const globalStyles =
            this.theme === 'auto'
              ? `body { background: ${getBackgroundColor('light', 'background-base')}; }
      @media (prefers-color-scheme: dark) {
        body { background: ${getBackgroundColor('dark', 'background-base')}; }
      }`
              : `body { background: ${getBackgroundColor(this.theme, 'background-base')}; }`;

          if (iframe.contentWindow && iframe.contentDocument) {
            const iframeDocument = iframe.contentDocument;
            const loaderScript =
              'var porscheDesignSystem;(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{load:()=>r});const o="porscheDesignSystem";function n(){return document[o]||(document[o]={}),document[o]}function s({script:e,version:t,prefix:s}){const r=function(e){const t=n(),{[e]:o}=t;if(!o){let o=()=>{};const n=new Promise((e=>o=e));t[e]={isInjected:!1,isReady:()=>n,readyResolve:o,prefixes:[],registerCustomElements:null}}return t[e]}(t),{isInjected:c,prefixes:i=[],registerCustomElements:d}=r,[u]=Object.entries(n()).filter((([e,o])=>e!==t&&"object"==typeof o&&o.prefixes.includes(s)));if(u)throw new Error(`[Porsche Design System v${t}] prefix \'${s}\' is already registered with version \'${u[0]}\' of the Porsche Design System. Please use a different one.\\nTake a look at document.${o} for more details.`);c||(function(e){const t=document.createElement("script");t.src=e,t.setAttribute("crossorigin",""),document.body.appendChild(t)}(e),r.isInjected=!0),i.includes(s)||(i.push(s),d&&d(s))}const r=(e={})=>{const t="PORSCHE_DESIGN_SYSTEM_CDN";window[t]=e.cdn||window[t]||(window.location.origin.match(/\\.cn$/)?"cn":"auto");const o="porscheDesignSystem";document[o]||(document[o]={}),document[o].cdn={url:"https://cdn.ui.porsche."+("cn"===window[t]?"cn":"com"),prefixes:[]},s({version:"3.16.0-rc.0",script:"http://localhost:3001/components/porsche-design-system.v3.16.0-rc.0.df94e2ad7f528f9c1844.js",prefix:e.prefix||""})};porscheDesignSystem=t})();porscheDesignSystem.load();';
            iframeDocument.open();
            iframeDocument.write(`
              <!DOCTYPE html>
              <html>
                <head>
                <style>
                    ${globalStyles}
                </style>
                </head>
                <body style="margin: 32px;">
                  <div id="app">${this.markup}</div>
                  <script data-pds-loader-script>${loaderScript}<\/script>
                </body>
              </html>
            `);
            iframeDocument.close();
          }
        };
        // Reload the iframe to trigger onload
        iframe.src = this.iframeSrc;
      }
    }

    public toggleFullscreen(): void {
      this.isFullWindow = !this.isFullWindow;
      document.body.style.overflow = this.isFullWindow ? 'hidden' : '';
      document.body[this.isFullWindow ? 'addEventListener' : 'removeEventListener'](
        'keydown',
        this.onFullScreenKeyDown
      );
    }

    private onFullScreenKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.toggleFullscreen();
      }
    };
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  .iframe {
    width: 100%;
    position: relative;
    display: flex;

    iframe {
      width: 100%;
      height: 500px;
      border: none;
    }

    .btn-fullscreen {
      position: absolute;
      top: $pds-spacing-static-small;
      inset-inline-end: $pds-spacing-static-small;
      z-index: 1; // to be above certain examples
    }
  }

  .iframe--fullscreen {
    position: fixed;
    inset: 0;
    height: 100%;
    overflow: auto;
    z-index: 999;
    border: none;
    iframe {
      height: 100%;
    }
  }
</style>
