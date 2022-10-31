<template>
  <div class="container">
    <!--    <CodeBlock :frameworks="['vanilla-js', 'angular', 'react', 'next-js']" :show-code-markup="false"></CodeBlock>-->
    <!--    <slot />-->
    <p-select-wrapper label="Choose Framework">
      <select v-model="framework" name="some-name">
        <option value="vanilla-js">Vanilla Js</option>
        <option value="angular">Angular</option>
        <option value="react">React</option>
        <option value="next-js">Next Js</option>
      </select>
    </p-select-wrapper>
    <p-select-wrapper label="Choose PDS version">
      <select v-model="pdsVersion" name="some-name">
        <option value="2.14.0">2.14.0</option>
        <option value="2.16.0">2.16.0</option>
        <option value="latest">latest</option>
      </select>
    </p-select-wrapper>
    <CodeEditor
      :button-label="'Open template in StackBlitz'"
      :markup="markup"
      :framework="framework"
      :pds-version="pdsVersion"
    ></CodeEditor>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Framework } from '@/models';
  import CodeBlock from '@/components/CodeBlock.vue';
  import CodeEditor from '@/components/CodeEditor.vue';

  @Component({
    components: { CodeEditor, CodeBlock },
  })
  export default class OpenInStackBlitz extends Vue {
    markup = '<p>Place your reproduction code here</p>';
    framework = 'vanilla-js';
    pdsVersion = 'latest';
  }
</script>

<style>
  .container {
    display: grid;
    gap: 1rem;
    justify-items: start;
    margin-top: 1rem;
  }
</style>
