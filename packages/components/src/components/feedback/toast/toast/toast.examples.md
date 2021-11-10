# Notifications

## Toast

Review the [notification decision tree](components/notifications/decision-tree) to determine which notification component is best for a particular scenario.

## Basic
// TODO: Hint about using it outside of routing if possible

<Playground :frameworkMarkup="basic" :config="config"></Playground>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { getToastCodeSamples } from '@porsche-design-system/shared';
  
  @Component
  export default class Code extends Vue {
    config = { themeable: true };
    
    basic = getToastCodeSamples();
  }
</script>