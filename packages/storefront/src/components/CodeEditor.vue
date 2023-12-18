<template>
  <p-button
    type="button"
    :theme="theme"
    :icon-source="stackBlitzIcon"
    :disabled="framework === 'shared' || framework === 'vue'"
    :loading="isLoading"
    @click="onButtonClick()"
    >{{ buttonLabel }}
  </p-button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import type { BackgroundColor, Framework, PlaygroundDir, PlaygroundTheme } from '@/models';
  import { openInStackBlitz } from '@/utils';
  import type { ExternalDependency, SharedImportKey } from '@/utils';
  import { isStableStorefrontRelease } from '@/utils/stackblitz/helper';
  import type { PorscheDesignSystemBundle, PorscheDesignSystemBundleMap } from '@/utils/stackblitz/types';

  const porscheDesignSystemBundleMap: PorscheDesignSystemBundleMap = {};

  @Component
  export default class CodeEditor extends Vue {
    @Prop({ default: '' }) public markup!: string;
    @Prop({ default: 'light' }) public theme!: PlaygroundTheme;
    @Prop({ default: 'ltr' }) public dir!: PlaygroundDir;
    @Prop({ default: 'vanilla-js' }) public framework!: Exclude<Framework, 'shared' | 'vue'>; // we don't have stackblitz integration for vue yet, therefore excluding vue
    @Prop({ default: 'background-base' }) public backgroundColor!: BackgroundColor;
    @Prop({ default: () => [] }) public externalStackBlitzDependencies!: ExternalDependency[];
    @Prop({ default: () => [] }) public sharedImportKeys!: SharedImportKey[];
    @Prop({ default: 'Edit in StackBlitz' }) public buttonLabel!: string;
    @Prop({ default: '' }) public pdsVersion!: string;

    isLoading = false;
    stackBlitzIcon = require('../assets/icon-stackblitz.svg');

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
      });
      this.isLoading = false;
    }

    private static async porscheDesignSystemBundle(
      framework: Exclude<Framework, 'shared' | 'vue'>, // we don't have stackblitz integration for vue yet, therefore excluding vue
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
