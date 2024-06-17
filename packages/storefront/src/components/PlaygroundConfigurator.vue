<template>
  <div class="playground">
    <div
      :class="{
        example: true,
        'example--light': $store.getters.storefrontTheme === 'light',
        'example--dark': $store.getters.storefrontTheme === 'dark',
        'example--auto': $store.getters.storefrontTheme === 'auto',
        // 'example--surface': mergedConfig.backgroundColor === 'background-surface',
        // 'example--height-fixed': mergedConfig.height === 'fixed',
        // 'example--spacing-inline': mergedConfig.spacing === 'inline',
        // 'example--spacing-block': mergedConfig.spacing === 'block',
        // 'example--spacing-block-small': mergedConfig.spacing === 'block-small',
        // 'example--overflow-x-visible': mergedConfig.overflowX === 'visible',
        // 'example--fullscreen': isFullWindow,
      }"
    >
      <p-accordion
        :theme="$store.getters.storefrontTheme"
        :heading="'Configure'"
        :headingTag="'h3'"
        :open="isConfigureAccordionOpen"
        @update="onUpdateConfigureAccordion"
      >
        <div class="configure">
          <div>
            <ConfiguratorProps :component-props="componentProps" @update="onUpdateProps" />
          </div>
          <div>
            <div v-for="{ name, isShown, description } in selectedSlots.filter((slot) => slot.name)" :key="name">
              <p-checkbox-wrapper :label="name" :theme="$store.getters.storefrontTheme">
                <input type="checkbox" :name="name" :checked="isShown" @change="toggleSelectedSlot(name)" />
              </p-checkbox-wrapper>
              <p-text :theme="$store.getters.storefrontTheme">{{ description }}</p-text>
            </div>
          </div>
        </div>
      </p-accordion>

      <DynamicIframe :markup="markup['vanilla-js']" />
      <CodeBlock
        :class="{ 'code-block--framework': true }"
        :markup="activeFrameworkMarkup"
        :convert-markup="false"
        :theme="$store.getters.storefrontTheme"
      ></CodeBlock>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import CodeBlock from '@/components/CodeBlock.vue';
  import CodeEditor from '@/components/CodeEditor.vue';
  import DynamicIframe from '@/components/DynamicIframe.vue';
  import { TagName } from '@porsche-design-system/shared';
  import { BackgroundColor, Framework, FrameworkMarkup } from '@/models';
  import { getFlyoutExamples } from '@/utils/getComponentMarkup';
  import { AccordionUpdateEventDetail } from '@porsche-design-system/components';
  import { type ComponentSlots, componentSlots } from '@/utils/componentSlots';
  import ConfiguratorProps from '@/components/ConfiguratorProps.vue';
  import { type ComponentProps, getComponentProps } from '@/utils/componentProps';

  @Component({
    components: {
      ConfiguratorProps,
      CodeBlock,
      CodeEditor,
      DynamicIframe,
    },
  })
  export default class PlaygroundConfigurator extends Vue {
    @Prop() public component!: TagName;
    @Prop({ default: 'background-base' }) public backgroundColor!: BackgroundColor;

    componentProps: ComponentProps = {};
    selectedSlots: ComponentSlots = [];

    markup: FrameworkMarkup = {};

    isConfigureAccordionOpen: boolean = false;

    created() {
      this.componentProps = getComponentProps(this.component);
      this.selectedSlots = componentSlots[this.component];
      this.updateMarkup();
    }

    updateMarkup() {
      // TODO: Patch theme into selected props
      this.markup = getFlyoutExamples('p-flyout', this.componentProps, this.selectedSlots);
    }

    toggleSelectedSlot(slotName: string) {
      const slot = this.selectedSlots.find((slot) => slot.name === slotName)!;
      slot.isShown = !slot.isShown;
      this.updateMarkup();
    }

    onUpdateProps({ key, value }: { key: keyof ComponentProps; value: any }) {
      if (this.componentProps[key].defaultValue === value) {
        this.componentProps[key].selectedValue = undefined;
      } else {
        this.componentProps[key].selectedValue = value;
      }
      this.updateMarkup();
    }

    public get activeFramework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    public get activeFrameworkMarkup(): string {
      // in case there aren't all frameworks available we use the first one as fallback
      return this.markup[this.activeFramework] || Object.values(this.markup)[0];
    }

    onUpdateConfigureAccordion(e: AccordionUpdateEventDetail) {
      this.isConfigureAccordionOpen = e.detail.open;
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @import '../styles/internal.variables';

  :deep > #stackblitz-embed {
    height: 600px;
  }

  .playground {
    display: flex;
    flex-direction: column;
    gap: $pds-spacing-static-small;
  }

  .header {
    display: flex;
    gap: $pds-spacing-fluid-x-small;
    flex-direction: column;

    @include pds-media-query-min('xs') {
      flex-direction: row;
    }
  }

  .select {
    @include pds-media-query-min('xs') {
      width: min(calc(50% - #{$pds-spacing-fluid-x-small} / 2), 12.5rem);
    }
  }

  .example {
    position: relative;
    overflow-x: auto;
    border: 1px solid var(--playground-border-color);
    border-radius: $pds-border-radius-large;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: var(--playground-background-color);

    &--light,
    &--auto {
      --playground-border-color: #{$pds-theme-light-contrast-low};
      --playground-background-color: #{$pds-theme-light-background-base};

      &.example--surface {
        --playground-border-color: #{$pds-theme-light-background-surface};
        --playground-background-color: #{$pds-theme-light-background-surface};
      }
    }

    &--dark {
      --playground-border-color: #{$pds-theme-dark-contrast-low};
      --playground-background-color: #{$pds-theme-dark-background-base};

      &.example--surface {
        --playground-border-color: #{$pds-theme-dark-background-surface};
        --playground-background-color: #{$pds-theme-dark-background-surface};
      }
    }

    &--auto {
      @media (prefers-color-scheme: dark) {
        --playground-border-color: #{$pds-theme-dark-contrast-low};
        --playground-background-color: #{$pds-theme-dark-background-base};

        &.example--surface {
          --playground-border-color: #{$pds-theme-dark-background-surface};
          --playground-background-color: #{$pds-theme-dark-background-surface};
        }
      }
    }

    &--overflow-x-visible {
      overflow-x: visible;
    }

    // Child Layout "height"
    &--height-fixed .demo {
      :deep(> *) {
        height: 11.25rem;
      }
    }

    // Child layout "spacing"
    &--spacing-block .demo,
    &--spacing-inline .demo {
      &::before {
        content: '';
        display: block;
        margin-top: -$pds-spacing-static-medium;
      }

      :deep(> *) {
        margin-top: $pds-spacing-static-medium;
      }
    }

    &--spacing-inline .demo {
      :deep(> *) {
        &:not(:last-child) {
          margin-inline-end: $pds-spacing-static-medium;
        }
      }
    }

    &--spacing-block-small .demo {
      &::before {
        content: '';
        display: block;
        margin-top: -$pds-spacing-static-small;
      }

      :deep(> *) {
        margin-top: $pds-spacing-static-small;
      }
    }

    &--fullscreen {
      position: fixed;
      inset: 0;
      overflow: auto;
      z-index: 999;
      margin: 0;
      padding-top: 0;
      border: 0;
      border-radius: 0;

      .demo {
        margin: 0 (-$pds-spacing-static-large);
      }
    }

    p-accordion {
      width: 100%;
      padding: $pds-spacing-static-medium $pds-spacing-static-large;
    }

    iframe {
      border-top: 1px solid var(--playground-border-color);
      border-bottom: 1px solid var(--playground-border-color);
    }

    .code-block {
      padding: $pds-spacing-static-large;
    }
  }

  .demo,
  .configurator {
    width: 100%;
  }

  .code-block {
    &--framework :deep(pre) {
      max-height: 40rem;
    }
  }

  .btn-fullscreen {
    position: absolute;
    top: $pds-spacing-static-small;
    inset-inline-end: $pds-spacing-static-small;
    z-index: 1; // to be above certain examples
  }

  .configure {
    display: flex;
    gap: $pds-spacing-fluid-small;
    flex-direction: column;

    @include pds-media-query-min('xs') {
      flex-direction: row;
    }

    div {
      width: 100%;
    }
  }
</style>
