<template>
  <div class="container">
    <p-select-wrapper label="Choose Framework">
      <!-- TODO: reuse usedFrameworks as utility-->
      <select v-model="framework" name="some-name">
        <option value="vanilla-js">Vanilla Js</option>
        <option value="angular">Angular</option>
        <option value="react">React</option>
      </select>
    </p-select-wrapper>
    <p-select-wrapper label="Choose PDS version">
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
  export default class OpenInStackBlitz extends Vue {
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
    justify-items: start;
    margin-top: 1rem;
  }
  p-select-wrapper {
    min-width: 200px;
  }
</style>
