<template>
  <article v-show="isActive">
    <slot/>
  </article>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class Tab extends Vue {
    @Prop({required: true}) public name!: string;
    @Prop({default: false}) public selected!: boolean;

    public isActive = false;

    public mounted(): void {
      this.isActive = this.selected;
    }
  }
</script>

<style scoped lang="scss">
</style>
