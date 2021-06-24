<template>
  <div :class="{ 'code-block-extended': true, example: isSlotSet }">
    <div v-if="isSlotSet" class="demo">
      <slot />
    </div>
    <CodeBlock :markup="markup" :frameworks="Object.keys(frameworks)"></CodeBlock>
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
  export default class CodeBlockExtended extends Vue {
    @Prop({ default: {} }) public frameworks!: FrameworkMarkup;

    public get framework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    get markup(): string {
      return this.frameworks[this.framework]!;
    }

    public get isSlotSet(): boolean {
      return !!this.$scopedSlots.default;
    }
  }
</script>

<style scoped lang="scss">
  @import '~@porsche-design-system/utilities/scss';
  @import '../styles/internal.variables';

  .example {
    padding: $p-spacing-32;
    border: 1px solid $p-color-neutral-contrast-low;
    background: $p-color-background-default;
    margin-top: 1rem;
  }

  ::v-deep pre {
    max-height: 50rem;
  }

  .demo ~ .code-block {
    margin-top: $p-spacing-32;
  }
</style>
