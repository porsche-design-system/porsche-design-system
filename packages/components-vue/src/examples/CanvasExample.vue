<script setup lang="ts">
  import { PButtonPure, PCanvas, PTag } from '@porsche-design-system/components-vue';
  import { ref } from 'vue';

  const isSidebarStartOpen = ref(false);
  const onToggleSidebarStart = (): void => {
    isSidebarStartOpen.value = !isSidebarStartOpen.value;
  };
  const onDismissSidebarStart = (): void => {
    isSidebarStartOpen.value = false;
  };

  const isSidebarEndOpen = ref(false);
  const onToggleSidebarEnd = (): void => {
    isSidebarEndOpen.value = !isSidebarEndOpen.value;
  };
  const onDismissSidebarEnd = (): void => {
    isSidebarEndOpen.value = false;
  };
</script>

<template>
  <PCanvas
    :sidebarStartWidth="'medium'"
    :sidebarEndWidth="'medium'"
    @dismissSidebarStart="onDismissSidebarStart"
    :sidebarStartOpen="isSidebarStartOpen"
    @dismissSidebarEnd="onDismissSidebarEnd"
    :sidebarEndOpen="isSidebarEndOpen"
  >
    <div slot="header">
      <PTag color="background-base">Header</PTag>
      <PButtonPure icon="menu-lines" @click="onToggleSidebarStart">Toggle Sidebar Start</PButtonPure>
      <PButtonPure icon="menu-lines" @click="onToggleSidebarEnd">Toggle Sidebar End</PButtonPure>
    </div>

    <div class="module">
      <div class="tile tile--full">Full</div>
    </div>
    <div class="module">
      <div class="tile tile--one-half">One Half</div>
      <div class="tile tile--one-half">One Half</div>
    </div>
    <div class="module">
      <div class="tile tile--one-third">One Third</div>
      <div class="tile tile--one-third">One Third</div>
      <div class="tile tile--one-third">One Third</div>
    </div>
    <div class="module">
      <div class="tile tile--one-third">One Third</div>
      <div class="tile tile--two-thirds">Two Thirds</div>
    </div>

    <div slot="footer">
      <PTag color="background-base">Footer</PTag>
    </div>
    <div slot="sidebar-start">
      <PTag color="background-base">Sidebar</PTag>
    </div>
    <div slot="sidebar-end">
      <PTag color="background-base">Sidebar</PTag>
    </div>
  </PCanvas>
</template>

<style>
  body {
    overflow-x: hidden;
  }
</style>

<style scoped>
  p-canvas::part(header) {
    background: #d1fbc6;
  }

  p-canvas::part(main) {
    background: #bed0ff;
  }

  p-canvas::part(footer) {
    background: #f7c6fb;
  }

  p-canvas::part(sidebar-start) {
    background: #ffbebe;
  }

  p-canvas::part(sidebar-end) {
    background: #ffbebe;
  }

  .module {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
  }

  .tile {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: #fff;
  }

  .tile--full {
    grid-column: var(--pds-grid-span-full);
  }

  .tile--one-half {
    grid-column: var(--pds-grid-span-one-half);
  }

  .tile--one-third {
    grid-column: var(--pds-grid-span-one-third);
  }

  .tile--two-thirds {
    grid-column: var(--pds-grid-span-two-thirds);
  }
</style>
