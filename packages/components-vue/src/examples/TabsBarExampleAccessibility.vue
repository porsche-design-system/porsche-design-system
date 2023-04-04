<script setup lang="ts">
  import type { TabsBarChangeEvent } from '@porsche-design-system/components-vue';
  import { PTabsBar, PText } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const tabIndex = ref(0);
  const tabPanels: string[] = ['One', 'Two', 'Three'];

  const onChange = (e: CustomEvent<TabsBarChangeEvent>): void => {
    tabIndex.value = e.activeTabIndex;
  };
</script>

<template>
  <PTabsBar :activeTabIndex="tabIndex" @change="onChange">
    <button
      v-for="(tabPanel, index) in tabPanels"
      :key="index"
      :type="'button'"
      :id="`tab-item-${index}`"
      :aria-controls="`tab-panel-${index}`"
    >
      Tab {{ tabPanel }}
    </button>
  </PTabsBar>
  <div
    v-for="(content, index) in tabPanels"
    :key="index"
    :role="'tabpanel'"
    :id="`tab-panel-${index}`"
    :hidden="tabIndex !== index"
    :tabIndex="tabIndex === index ? 0 : -1"
    :aria-labelledby="`tab-item-${index}`"
  >
    <PText>Your content of Tab {{ index + 1 }}</PText>
  </div>
</template>

<style>
  div[role='tabpanel'] {
    outline: 1px solid transparent;
    outline-offset: 2px;
    margin-top: 8px;
  }
  div[role='tabpanel']:focus {
    outline-color: #000;
  }
  div[role='tabpanel']:focus:not(:focus-visible) {
    outline-color: transparent;
  }
</style>
