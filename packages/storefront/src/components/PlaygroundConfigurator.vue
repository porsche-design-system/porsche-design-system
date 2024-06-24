<template>
  <div class="playground">
    <div class="header">
      <ThemeSelect :theme="theme" @update="switchTheme" :hide-label="true" />
      <DirSelect :dir="dir" @update="switchDir" />
    </div>
    <div
      :class="{
        example: true,
        'example--light': theme === 'light',
        'example--dark': theme === 'dark',
        'example--auto': theme === 'auto',
      }"
    >
      <DynamicIframe :markup="markup['vanilla-js']" :theme="theme" :dir="dir" />
      <div class="configure">
        <p-accordion
          :theme="theme"
          :heading="'Props'"
          :headingTag="'h3'"
          :open="isPropsAccordionOpen"
          @update="onUpdatePropsAccordion"
        >
          <ConfigureProps :component-props="componentProps" @update="onUpdateProps" />
        </p-accordion>
        <p-accordion
          v-if="componentSlots.length > 1"
          :theme="theme"
          :heading="'Slots'"
          :headingTag="'h3'"
          :open="isSlotsAccordionOpen"
          @update="onUpdateSlotsAccordion"
        >
          <ConfigureSlots :component-slots="componentSlots" @update="onUpdateSlots" />
        </p-accordion>
      </div>

      <CodeBlock
        :class="{ 'code-block--framework': true }"
        :markup="activeFrameworkMarkup"
        :convert-markup="false"
        :theme="theme"
      ></CodeBlock>
      <CodeEditor
        :markup="activeFrameworkMarkup"
        :theme="theme"
        :dir="dir"
        :framework="activeFramework"
        :backgroundColor="backgroundColor"
      ></CodeEditor>
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
  import { BackgroundColor, Framework, FrameworkMarkup, PlaygroundDir, PlaygroundTheme } from '@/models';
  import { getComponentExampleMarkup } from '@/utils/getComponentMarkup';
  import { AccordionUpdateEventDetail } from '@porsche-design-system/components';
  import { type ComponentSlots, componentSlots } from '@/utils/componentSlots';
  import { type ComponentProps, getComponentProps } from '@/utils/componentProps';
  import ConfigureProps from '@/components/ConfigureProps.vue';
  import ConfigureSlots from '@/components/ConfigureSlots.vue';
  import ThemeSelect from '@/components/ThemeSelect.vue';
  import DirSelect from '@/components/DirSelect.vue';

  @Component({
    components: {
      DirSelect,
      ThemeSelect,
      ConfigureProps,
      ConfigureSlots,
      CodeBlock,
      CodeEditor,
      DynamicIframe,
    },
  })
  export default class PlaygroundConfigurator extends Vue {
    @Prop() public component!: TagName;
    @Prop() public codeSamples?: FrameworkMarkup;
    @Prop({ default: 'background-base' }) public backgroundColor!: BackgroundColor;

    componentProps: ComponentProps = {};
    componentSlots: ComponentSlots = [];

    markup: FrameworkMarkup = {};

    isPropsAccordionOpen: boolean = false;
    isSlotsAccordionOpen: boolean = false;

    created() {
      this.componentProps = getComponentProps(this.component);
      this.componentSlots = componentSlots[this.component];
      if (this.componentProps['theme']) {
        this.componentProps['theme'].selectedValue = this.theme;
      }
      this.updateMarkup();
    }

    updateMarkup() {
      this.markup = getComponentExampleMarkup(
        this.component,
        this.componentProps,
        this.componentSlots,
        this.codeSamples
      );
    }

    onUpdateProps({ key, value }: { key: keyof ComponentProps; value: any }) {
      this.componentProps[key].selectedValue = value;
      this.updateMarkup();
    }

    onUpdateSlots(key: keyof ComponentSlots) {
      const slot = this.componentSlots.find((slot) => slot.name === key)!;
      slot.isShown = !slot.isShown;
      this.updateMarkup();
    }

    onUpdatePropsAccordion(e: AccordionUpdateEventDetail) {
      this.isPropsAccordionOpen = e.detail.open;
    }
    onUpdateSlotsAccordion(e: AccordionUpdateEventDetail) {
      this.isSlotsAccordionOpen = e.detail.open;
    }

    public switchTheme(e: Event): void {
      this.$store.commit('setPlaygroundTheme', (e.target as HTMLInputElement).value);
      this.componentProps['theme'].selectedValue = (e.target as HTMLInputElement).value;
      this.updateMarkup();
    }

    public switchDir = (e: Event): void => {
      this.$store.commit('setPlaygroundDir', (e.target as HTMLInputElement).value);
    };

    public get activeFramework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    public get activeFrameworkMarkup(): string {
      // in case there aren't all frameworks available we use the first one as fallback
      return this.markup[this.activeFramework] || Object.values(this.markup)[0];
    }

    public get theme(): PlaygroundTheme {
      return this.$store.getters.playgroundTheme || 'light';
    }

    public get dir(): PlaygroundDir {
      return this.$store.getters.playgroundDir || 'ltr';
    }
  }
</script>

<style scoped lang="scss">
  @use '@porsche-design-system/components-js/styles' as *;
  @import '../styles/internal.variables';

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

    .configure {
      width: 100%;
      padding: $pds-spacing-static-medium $pds-spacing-static-large;
      border-top: 1px solid var(--playground-border-color);
    }

    .code-block,
    p-button {
      padding: 0 $pds-spacing-static-large $pds-spacing-static-large;
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
</style>
