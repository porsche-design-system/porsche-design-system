<template>
  <div class="playground">
    <p-accordion
      :theme="$store.getters.storefrontTheme"
      :heading="'Configure'"
      :headingTag="'h3'"
      :open="isConfigureAccordionOpen"
      @update="onUpdateConfigureAccordion"
    >
      <div class="configure">
        <div>
          <div v-for="{ key, value } in propsMeta" :key="key">
            <p-select
              :id="key"
              :label="key"
              :value="selectedValues[key]"
              @update="onUpdateProps($event, key)"
              :theme="$store.getters.storefrontTheme"
            >
              <p-select-option
                v-if="value.allowedValues === 'boolean'"
                v-for="option in ['true', 'false']"
                :key="option"
                :value="option"
              >
                {{ option }}{{ `${value.defaultValue}` === option ? ' (default)' : '' }}
              </p-select-option>
              <p-select-option
                v-if="Array.isArray(value.allowedValues)"
                v-for="option in value.allowedValues"
                :key="option"
                :value="option"
              >
                {{ option }}{{ value.defaultValue == option ? ' (default)' : '' }}
              </p-select-option>
              <!--        TODO: Add condition for aria-->
            </p-select>
          </div>
        </div>
        <div>
          <p-select
            label="Content"
            :theme="$store.getters.storefrontTheme"
            :value="selectedContent"
            @update="onUpdateContent"
          >
            <p-select-option v-for="{ key, value } in contents" :value="value" :key="key">{{ key }}</p-select-option>
          </p-select>
          <p-multi-select
            label="Include slots"
            :theme="$store.getters.storefrontTheme"
            :value="selectedSlots"
            @update="onUpdateSlots"
          >
            <p-multi-select-option v-for="slot in componentMeta.namedSlots" :key="slot" :value="slot">{{
              slot
            }}</p-multi-select-option>
          </p-multi-select>
        </div>
      </div>
    </p-accordion>

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
      <!--      <div class="demo" v-html="markup['vanilla-js']"></div>-->
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
  import { Prop, Watch } from 'vue-property-decorator';
  import CodeBlock from '@/components/CodeBlock.vue';
  import CodeEditor from '@/components/CodeEditor.vue';
  import DynamicIframe from '@/components/DynamicIframe.vue';
  import { TagName } from '@porsche-design-system/shared';
  import { ComponentMeta, getComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
  import { BackgroundColor, Framework, FrameworkMarkup } from '@/models';
  import { getComponentSlotContent, getFlyoutExamples } from '@/utils/getComponentMarkup';
  import type { MultiSelectUpdateEventDetail, SelectUpdateEventDetail } from '@porsche-design-system/components-vue';
  import { AccordionUpdateEventDetail } from '@porsche-design-system/components';

  @Component({
    components: {
      CodeBlock,
      CodeEditor,
      DynamicIframe,
    },
  })
  export default class PlaygroundConfigurator extends Vue {
    @Prop() public component!: TagName;
    @Prop({ default: 'background-base' }) public backgroundColor!: BackgroundColor;

    componentMeta: ComponentMeta = {} as ComponentMeta;
    propsMeta: { key: string; value: PropMeta }[] = [];
    selectedValues: { [key: string]: any } = {};
    appliedValues: { [key: string]: any } = {};

    contents: { key: string; value: string }[] = [];
    selectedContent: string = '';

    // Save for each slot if it should be rendered
    selectedSlots: { key: string; value: boolean }[] = [];
    markup: FrameworkMarkup = {};

    isConfigureAccordionOpen: boolean = false;

    async created() {
      this.componentMeta = getComponentMeta(this.component);
      this.propsMeta = Object.entries(this.componentMeta.propsMeta).map(([key, value]) => ({ key, value }));

      // Initialize selected values with default values
      this.propsMeta.forEach(({ key, value }) => {
        if (value.allowedValues === 'boolean') {
          this.selectedValues[key] = `${value.defaultValue}`;
        } else {
          this.selectedValues[key] = value.defaultValue;
        }
      });

      const componentSlotContent = getComponentSlotContent(this.component);
      this.contents = Object.entries(componentSlotContent.content).map(([key, value]) => ({
        key,
        value,
      }));

      // Set selected content to default initially
      this.selectedContent = componentSlotContent.content.default;

      // Set default content slot true initially
      this.selectedSlots = Object.entries(componentSlotContent).map(([key, value]) => ({
        key,
        value: key === 'content',
      }));

      // this.appliedValues['style'] = '--p-flyout-width: 80vw; --p-flyout-max-width: 1000px;';

      this.updateMarkup();
    }

    async updateMarkup(key?: string) {
      // TODO: Don't apply default values?
      // TODO: Theme has to be patched
      if (key) {
        this.appliedValues[key] = this.selectedValues[key];
      }

      // TODO: Theme has to be patched
      const slotContent = getComponentSlotContent(this.component);
      const slots = this.selectedSlots.reduce((acc, slot) => {
        if (slot.value) {
          if (slot.key === 'content') {
            acc[slot.key] = this.selectedContent;
          } else {
            acc[slot.key] = slotContent[slot.key];
          }
        }
        return acc;
      }, {} as any);

      this.markup = getFlyoutExamples('p-flyout', this.appliedValues, slots);
      this.$nextTick(() => {
        this.$emit('markup-changed', this.markup);
      });
    }

    onUpdateProps(e: SelectUpdateEventDetail, key: string) {
      this.selectedValues[key] = e.detail.value;
      this.updateMarkup(key);
    }

    onUpdateContent(e: SelectUpdateEventDetail) {
      this.selectedContent = e.detail.value;
      this.updateMarkup();
    }

    onUpdateSlots(e: MultiSelectUpdateEventDetail) {
      this.selectedSlots = Object.entries(getComponentSlotContent(this.component)).map(([key, value]) => ({
        key,
        value: key === 'content' ? true : e.detail.value.includes(key),
      }));
      this.updateMarkup();
    }

    public get activeFramework(): Framework {
      return this.$store.getters.selectedFramework;
    }

    public get activeFrameworkMarkup(): string {
      // in case there aren't all frameworks available we use the first one as fallback
      return this.markup[this.activeFramework];
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
    padding: $pds-spacing-static-large;
    overflow-x: auto;
    border: 1px solid var(--playground-border-color);
    border-radius: $pds-border-radius-large;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: $pds-spacing-static-large;
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
