<template>
  <p-fieldset :theme="storefrontTheme" label="Choose your Template:">
    <p-segmented-control
      :theme="storefrontTheme"
      :value="selectedFramework"
      aria-label="Choose your Framework:"
      @update="(e) => (this.selectedFramework = e.detail.value)"
    >
      <p-segmented-control-item v-for="(framework, index) in frameworks" :key="index" :value="framework">{{
        frameworkNameMap[framework]
      }}</p-segmented-control-item>
    </p-segmented-control>
    <p-select-wrapper :theme="storefrontTheme" label="Choose your Porsche Design System version:">
      <select v-model="selectedPdsVersion">
        <option v-for="(pdsVersion, index) in pdsVersions" :key="index" :value="pdsVersion">{{ pdsVersion }}</option>
      </select>
    </p-select-wrapper>
    <ThemeSelect
      :theme="selectedTheme"
      v-on:update="(e) => (this.selectedTheme = e.detail.value)"
      label="Choose your theme:"
    />

    <CodeEditor
      :theme="selectedTheme"
      :buttonLabel="'Open template in StackBlitz'"
      :markup="markup"
      :framework="selectedFramework"
      :pdsVersion="selectedPdsVersion"
    ></CodeEditor>
  </p-fieldset>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CodeEditor from '@/components/CodeEditor.vue';
import ThemeSelect from '@/components/ThemeSelect.vue';
import type { Framework } from '@/models';
import { frameworkNameMap } from '@/utils/frameworkNameMap';
import { PlaygroundTheme, StorefrontTheme } from '@/models';

@Component({
  components: { ThemeSelect, CodeEditor },
})
export default class OpenBugTemplateInStackBlitz extends Vue {
  frameworks: Exclude<Framework, 'shared'>[] = ['vanilla-js', 'angular', 'react'];
  selectedFramework: Exclude<Framework, 'shared'> = 'vanilla-js';
  pdsVersions: string[] = [];
  selectedPdsVersion = '';
  frameworkNameMap = frameworkNameMap;
  selectedTheme: PlaygroundTheme = 'light';

  public get storefrontTheme(): StorefrontTheme {
    return this.$store.getters.storefrontTheme;
  }

  get markup(): string {
    return `<p-text theme="${this.selectedTheme}">Place your reproduction code here</p-text>`;
  }

  private async fetchVersions(): Promise<string[]> {
    const response = await fetch('https://registry.npmjs.org/@porsche-design-system/components-js', {
      // link to docs: https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format
      headers: {
        accept: 'application/vnd.npm.install-v1+json',
      },
    });
    return Object.keys((await response.json()).versions);
  }

  private getFilteredVersions(arr: string[]): string[] {
    return arr
      .filter((version) => version.match(/^\d+\.\d+\.\d+$/)) // Match only stable releases
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  }

  async mounted(): Promise<void> {
    this.pdsVersions = this.getFilteredVersions(await this.fetchVersions());
    this.selectedPdsVersion = this.pdsVersions[0];
    this.selectedTheme = this.$store.getters.storefrontTheme;
  }
}
</script>

<style scoped lang="scss">
  p-fieldset {
    margin: 1rem 0;
    > * {
      margin-bottom: 1rem;
      max-width: 20rem;
    }
  }
</style>
