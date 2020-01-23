<template>
  <hr class="divider" :class="{'spacing-small': (spacing === 'small')}"/>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class Divider extends Vue {
    @Prop({default: 'none'}) public spacing!: 'none' | 'small';
  }
</script>

<style scoped lang="scss">
  @import "~@porsche-design-system/scss-utils/index";

  .divider {
    border: 0;
    height: 1px;
    background: $p-color-theme-light-neutral-contrast-low;

    &.spacing-small {
      margin: $p-spacing-24 0;
    }
  }
</style>
