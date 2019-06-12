<template>
  <div class="playground">
    <template>Hello</template>
    <slot :theme="this.theme"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Playground extends Vue {
    public theme = 'highlight';

    private mounted(): void {
      setTimeout(() => {
        this.theme = 'ghost';
      }, 1000);
    }
  }
</script>

<style scoped lang="scss">
  .playground {
    padding: 30px;
    border: 1px solid deeppink;
  }
</style>
