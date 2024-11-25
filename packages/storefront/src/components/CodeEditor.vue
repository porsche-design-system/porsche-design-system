<template>
  <div v-if="isEmbedded" id="stackblitz-demo"></div>
  <p-button
    v-else
    type="button"
    :theme="theme"
    :icon-source="stackBlitzIcon"
    :disabled="framework === 'shared'"
    :loading="isLoading"
    @click="onButtonClick()"
    >{{ buttonLabel }}
  </p-button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import type { BackgroundColor, Framework, PlaygroundDir, PlaygroundTheme } from '@/models';
import { openInStackBlitz } from '@/utils';
import type { ExternalDependency, SharedImportKey } from '@/utils';
import { isStableStorefrontRelease } from '@/utils/stackblitz/helper';
import type { PorscheDesignSystemBundle, PorscheDesignSystemBundleMap } from '@/utils/stackblitz/types';

const porscheDesignSystemBundleMap: PorscheDesignSystemBundleMap = {};

@Component
export default class CodeEditor extends Vue {
  @Prop({ default: false }) public isEmbedded!: boolean;
  @Prop({ default: '' }) public markup!: string;
  @Prop({ default: 'light' }) public theme!: PlaygroundTheme;
  @Prop({ default: 'ltr' }) public dir!: PlaygroundDir;
  @Prop({ default: 'vanilla-js' }) public framework!: Exclude<Framework, 'shared'>;
  @Prop({ default: 'background-base' }) public backgroundColor!: BackgroundColor;
  @Prop({ default: () => [] }) public externalStackBlitzDependencies!: ExternalDependency[];
  @Prop({ default: () => [] }) public sharedImportKeys!: SharedImportKey[];
  @Prop({ default: 'Edit in StackBlitz' }) public buttonLabel!: string;
  @Prop({ default: '' }) public pdsVersion!: string;

  isLoading = false;
  stackBlitzIcon = require('../assets/icon-stackblitz.svg');

  public async mounted(): void {
    if (this.isEmbedded) {
      await this.initializeStackBlitzEmbed();
    }
  }

  @Watch('markup')
  public onMarkupChange(newMarkup: string, oldMarkup: string): Promise<void> {
    if (this.isEmbedded && newMarkup !== oldMarkup) {
      this.updateStackBlitz();
    }
  }

  public async onButtonClick() {
    this.isLoading = true;
    openInStackBlitz({
      porscheDesignSystemBundle: await CodeEditor.porscheDesignSystemBundle(this.framework, this.pdsVersion),
      markup: this.markup,
      framework: this.framework,
      theme: this.theme,
      dir: this.dir,
      externalDependencies: this.externalStackBlitzDependencies,
      backgroundColor: this.backgroundColor,
      sharedImportKeys: this.sharedImportKeys,
      pdsVersion: this.pdsVersion,
      embedElement: undefined,
    });
    this.isLoading = false;
  }

  private async initializeStackBlitzEmbed() {
    if (this.framework !== 'shared') {
      openInStackBlitz({
        porscheDesignSystemBundle: await CodeEditor.porscheDesignSystemBundle(this.framework, this.pdsVersion),
        markup: this.markup,
        framework: this.framework,
        theme: this.theme,
        dir: this.dir,
        externalDependencies: this.externalStackBlitzDependencies,
        backgroundColor: this.backgroundColor,
        sharedImportKeys: this.sharedImportKeys,
        pdsVersion: this.pdsVersion,
        embedElement: 'stackblitz-demo',
      });
    }
  }

  private updateStackBlitz() {
    const iframe = document.getElementById('stackblitz-demo') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = '';
      this.initializeStackBlitzEmbed();
    }
  }

  private static async porscheDesignSystemBundle(
    framework: Exclude<Framework, 'shared'>,
    pdsVersion?: string
  ): Promise<PorscheDesignSystemBundle> {
    const jsBundle = await CodeEditor.fetchPorscheDesignSystemBundle('js', pdsVersion);

    switch (framework) {
      case 'vanilla-js':
        return jsBundle;
      case 'angular':
        return {
          ...jsBundle,
          ...(await CodeEditor.fetchPorscheDesignSystemBundle('angular', pdsVersion)),
        };
      case 'react':
        return {
          ...jsBundle,
          ...(await CodeEditor.fetchPorscheDesignSystemBundle('react', pdsVersion)),
        };
      case 'vue':
        return {
          ...jsBundle,
          ...(await CodeEditor.fetchPorscheDesignSystemBundle('vue', pdsVersion)),
        };
    }
  }

  public static async fetchPorscheDesignSystemBundle(
    framework: keyof PorscheDesignSystemBundleMap,
    pdsVersion?: string
  ): Promise<PorscheDesignSystemBundle> {
    if (!pdsVersion && !isStableStorefrontRelease() && !porscheDesignSystemBundleMap[framework]) {
      // { cache: 'no-store' }: download a resource with cache busting, to bypass the cache completely.
      const response = await fetch(`porsche-design-system/components-${framework}.json`, { cache: 'no-store' });
      porscheDesignSystemBundleMap[framework] = (await response.json()) as PorscheDesignSystemBundle;
    }

    return porscheDesignSystemBundleMap[framework] || {};
  }
}
</script>

<style lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;

  iframe#stackblitz-demo {
    border: 1px solid var(--playground-border-color);
    border-radius: $pds-border-radius-medium;
  }
</style>
