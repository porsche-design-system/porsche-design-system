<template>
  <div class="playground-static">
    <div v-if="isSlotSet" class="demo">
      <slot />
    </div>
    <CodeBlock class="code-block" :markup="markup" :frameworks="Object.keys(frameworks)"></CodeBlock>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import type { Framework, FrameworkMarkup } from '@/models';
  import CodeBlock from '@/components/CodeBlock.vue';

  @Component({
    components: {
      CodeBlock,
    },
  })
  export default class PlaygroundStatic extends Vue {
    @Prop({ default: {} }) public frameworks!: FrameworkMarkup;

    public get framework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    public get markup(): string {
      return this.frameworks[this.framework]!;
    }

    public get isSlotSet(): boolean {
      return !!this.$scopedSlots.default;
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';

  .playground-static {
    padding: $p-spacing-32;
    overflow-x: auto;
    border: 1px solid $p-color-neutral-contrast-low;
    background: $p-color-background-default;
  }

  .code-block ::v-deep pre {
    max-height: 40rem;
  }

  .demo ~ .code-block {
    margin-top: $p-spacing-32;
  }
</style>
