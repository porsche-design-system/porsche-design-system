<template>
  <div class="playground">
    <slot/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class Playground extends Vue {
  }
</script>

<style scoped lang="scss">
  .playground {
    padding: 30px;
    border: 1px solid deeppink;
  }
</style>
