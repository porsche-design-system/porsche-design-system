<template>
  <div class="container">
    <!--    <CodeBlock :frameworks="['vanilla-js', 'angular', 'react', 'next-js']" :show-code-markup="false"></CodeBlock>-->
    <!--    <slot />-->
    <p-select-wrapper label="Choose Framework">
      <select name="some-name">
        <option value="vanilla-js">Vanilla Js</option>
        <option value="angular">Angular</option>
        <option value="react">React</option>
        <option value="next-js">Next Js</option>
      </select>
    </p-select-wrapper>
    <p-select-wrapper label="Choose PDS version">
      <select name="some-name">
        <option value="14.2.1">14.2.1</option>
        <option value="16.0.0">16.0.0</option>
        <option value="latest">latest</option>
      </select>
    </p-select-wrapper>
    <CodeEditor
      :framework="activeFramework"
      :button-label="'Open template in StackBlitz'"
      :markup="markup"
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

    public get activeFramework(): Framework {
      return this.$store.getters.selectedFramework;
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
</style>
