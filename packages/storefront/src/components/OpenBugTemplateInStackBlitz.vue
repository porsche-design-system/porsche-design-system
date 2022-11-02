<template>
  <div class="container">
    <div>
      <p-text>Choose your Framework:</p-text>
      <!-- TODO: reuse usedFrameworks as utility-->
      <p-segmented-control :value="framework" v-model="framework" aria-label="Choose your Framework:">
        <p-segmented-control-item value="vanilla-js">Vanilla Js</p-segmented-control-item>
        <p-segmented-control-item value="angular">Angular</p-segmented-control-item>
        <p-segmented-control-item value="react">React</p-segmented-control-item>
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
      :framework="framework"
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

  @Component({
    components: { CodeEditor },
  })
  export default class OpenBugTemplateInStackBlitz extends Vue {
    markup = '<p>Place your reproduction code here</p>';
    framework: Exclude<Framework, 'shared'> = 'vanilla-js';
    selectedPdsVersion = dependencies['@porsche-design-system/components-js'];
    pdsVersions: string[] = [];

    private async getVersions(): Promise<string[]> {
      return fetch('https://registry.npmjs.org/@porsche-design-system/components-js')
        .then((res) => res.json())
        .then((res) => Object.keys(res.versions));
    }

    async mounted(): Promise<void> {
      this.pdsVersions = await this.getVersions();
    }
  }
</script>

<style>
  .container {
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
  }
  p-segmented-control {
    margin-top: 0.25rem;
  }
  p-select-wrapper {
    min-width: 200px;
    justify-self: start;
  }
  p-button {
    justify-self: start;
  }
</style>
