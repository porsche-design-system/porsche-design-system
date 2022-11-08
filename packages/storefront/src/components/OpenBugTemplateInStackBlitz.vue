<template>
  <div class="container">
    <p-fieldset-wrapper label="Choose your Template:" class="fieldset-wrapper">
      <p-segmented-control
        :value="selectedFramework"
        aria-label="Choose your Framework:"
        @segmentedControlChange="(e) => (this.selectedFramework = e.detail.value)"
      >
        <p-segmented-control-item v-for="(framework, index) in frameworks" :key="index" :value="framework">{{
          frameworkNameMap[framework]
        }}</p-segmented-control-item>
      </p-segmented-control>
      <p-select-wrapper label="Choose your Porsche Design System version:">
        <select v-model="selectedPdsVersion" name="some-name">
          <option v-for="(pdsVersion, index) in pdsVersions" :key="index" :value="pdsVersion">{{ pdsVersion }}</option>
        </select>
      </p-select-wrapper>
    </p-fieldset-wrapper>
    <CodeEditor
      :buttonLabel="'Open template in StackBlitz'"
      :markup="markup"
      :framework="selectedFramework"
      :pdsVersion="selectedPdsVersion"
    ></CodeEditor>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import CodeEditor from '@/components/CodeEditor.vue';
  import type { Framework } from '@/models';
  import { frameworkNameMap } from '@/utils/frameworkNameMap';
  import { dependencies } from '../../../components-js/package.json';

  @Component({
    components: { CodeEditor },
  })
  export default class OpenBugTemplateInStackBlitz extends Vue {
    markup = '<p-text>Place your reproduction code here</p-text>';
    frameworks: Exclude<Framework, 'shared'>[] = ['vanilla-js', 'angular', 'react'];
    selectedFramework: Exclude<Framework, 'shared'> = 'vanilla-js';
    pdsVersions: string[] = [];
    selectedPdsVersion = dependencies['@porsche-design-system/components-js'];
    frameworkNameMap = frameworkNameMap;

    private async fetchVersions(): Promise<string[]> {
      const response = await fetch('https://registry.npmjs.org/@porsche-design-system/components-js', {
        headers: {
          accept: 'application/vnd.npm.install-v1+json',
        },
      });
      return Object.keys((await response.json()).versions);
    }

    private getFilteredVersions(arr: string[]): string[] {
      return arr.filter((version) => !version.includes('rc') && !version.includes('beta')).reverse();
    }

    async mounted(): Promise<void> {
      this.pdsVersions = this.getFilteredVersions(await this.fetchVersions());
      this.selectedPdsVersion = this.pdsVersions[0];
    }
  }
</script>

<style>
  .container {
    margin: 2rem 0;
  }
  .fieldset-wrapper > * {
    margin-bottom: 2rem;
    max-width: 20rem;
  }
  p-segmented-control {
    margin-top: 1rem;
  }
</style>
