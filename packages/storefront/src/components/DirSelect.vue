<template>
  <p-select-wrapper class="select" :theme="$store.getters.storefrontTheme" label="Direction" hide-label="true">
    <select name="dir" :value="dir" @change="$emit('update', $event)">
      <option disabled>Select direction</option>
      <option value="ltr">LTR (left-to-right)</option>
      <option value="rtl">RTL (right-to-left)</option>
      <option value="auto">Auto</option>
    </select>
  </p-select-wrapper>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Prop } from 'vue-property-decorator';
  import { PlaygroundTheme } from '@/models';
  import Component from 'vue-class-component';

  @Component
  export default class DirSelect extends Vue {
    @Prop({ default: 'ltr' }) public dir!: PlaygroundTheme;
  }
</script>
