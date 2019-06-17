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
  @import "~@porscheui/ui-kit-js/src/styles/utility/index";

  .divider {
    border: 0;
    height: 1px;
    background: $p-color-neutral-grey-2;
  }

  .spacing-small {
    margin: 1.125rem 0;
  }
</style>
