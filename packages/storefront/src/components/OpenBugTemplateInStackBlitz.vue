<template>
  <div class="container">
    <div>
      <p-text class="segmented-control-label">Choose your Framework:</p-text>
      <p-segmented-control
        :value="selectedFramework"
        aria-label="Choose your Framework:"
        @segmentedControlChange="onSegmentedControlChange"
      >
        <p-segmented-control-item v-for="(framework, index) in frameworks" :key="index" :value="framework">{{
          frameworkNameMap[framework]
        }}</p-segmented-control-item>
      </p-segmented-control>
    </div>
    <p-select-wrapper label="Choose your Porsche Design System version:">
      <select v-model="selectedPdsVersion" name="some-name">
        <option v-for="(pdsVersion, index) in pdsVersions" :key="index" :value="pdsVersion">{{ pdsVersion }}</option>
      </select>
    </p-select-wrapper>
    <CodeEditor
      :button-label="'Open template in StackBlitz'"
      :markup="markup"
      :framework="selectedFramework"
      :pds-version="selectedPdsVersion"
    ></CodeEditor>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import CodeEditor from '@/components/CodeEditor.vue';
  import type { Framework } from '@/models';
  import { dependencies } from '../../../components-js/package.json';
  import { frameworkNameMap } from '@/utils/frameworkNameMap';

  @Component({
    components: { CodeEditor },
  })
  export default class OpenBugTemplateInStackBlitz extends Vue {
    markup = '<p>Place your reproduction code here</p>';
    frameworks: Exclude<Framework, 'shared'>[] = ['vanilla-js', 'angular', 'react'];
    selectedFramework: Exclude<Framework, 'shared'> = 'vanilla-js';
    selectedPdsVersion = dependencies['@porsche-design-system/components-js'];
    pdsVersions: string[] = [];
    frameworkNameMap = frameworkNameMap;

    private async fetchVersions(): Promise<{ [key: string]: string }> {
      const response = await fetch('https://registry.npmjs.org/@porsche-design-system/components-js');
      return (await response.json()).versions;
    }

    private getFilteredKeys(obj: { [key: string]: string }): string[] {
      return Object.keys(obj)
        .filter((version) => !version.includes('rc') && !version.includes('beta'))
        .reverse();
    }

    onSegmentedControlChange(e: CustomEvent) {
      this.selectedFramework = e.detail.value;
    }

    async mounted(): Promise<void> {
      this.pdsVersions = this.getFilteredKeys(await this.fetchVersions());
    }
  }
</script>

<style>
  .container {
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
  }
  .segmented-control-label {
    margin-bottom: 0.25rem;
  }
  p-select-wrapper {
    justify-self: start;
  }
  p-button {
    justify-self: start;
  }
</style>
