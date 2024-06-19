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
  import type { Theme } from '@porsche-design-system/components';
  import { getComponentExamplePage } from '@/utils/configurator';
  import { spacingStaticLarge } from '@porsche-design-system/utilities-v2';
  import type { PlaygroundDir } from '@/models';

  @Component
  export default class DynamicIframe extends Vue {
    @Prop({ type: String, default: 'about:blank' }) iframeSrc!: string;
    @Prop({ type: String, required: true }) markup!: string;
    @Prop() theme!: Theme;
    @Prop() dir!: PlaygroundDir;

    isFullWindow = false;

    mounted() {
      this.injectMarkup();
    }

    @Watch('markup')
    onMarkupChanged() {
      this.injectMarkup();
    }

    @Watch('dir')
    onDirChanged() {
      this.injectMarkup();
    }

    injectMarkup() {
      const iframe = this.$refs.iframe as HTMLIFrameElement;
      if (iframe) {
        iframe.onload = () => {
          // TODO: Share with openInStackBlitz
          const globalStyles =
            this.theme === 'auto'
              ? `body { margin: ${spacingStaticLarge}; background: ${getBackgroundColor('light', 'background-base')}; }
      @media (prefers-color-scheme: dark) {
        body { background: ${getBackgroundColor('dark', 'background-base')}; }
      }`
              : `body { margin: ${spacingStaticLarge}; background: ${getBackgroundColor(this.theme, 'background-base')}; }`;

          if (iframe.contentWindow && iframe.contentDocument) {
            const iframeDocument = iframe.contentDocument;
            iframeDocument.open();
            iframeDocument.write(getComponentExamplePage(this.markup, this.dir, globalStyles));
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
