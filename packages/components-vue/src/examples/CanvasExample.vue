<script setup lang="ts">
  import {
    type CanvasSidebarStartUpdateEventDetail,
    PButton,
    PCanvas,
    PHeading,
    PText,
  } from '@porsche-design-system/components-vue';
  import { breakpointS } from '@porsche-design-system/components-vue/emotion';
  import { ref } from 'vue';

  // initially, sidebar should be closed on mobile and opened on desktop
  const isSidebarStartOpen = ref(window.matchMedia(`(min-width: ${breakpointS}px)`).matches);
  const isSidebarEndOpen = ref(false);

  const onSidebarStartUpdate = (e: CanvasSidebarStartUpdateEventDetail): void => {
    isSidebarStartOpen.value = e.open;
  };

  const onSidebarEndOpen = (): void => {
    isSidebarEndOpen.value = true;
  };

  const onSidebarEndDismiss = (): void => {
    isSidebarEndOpen.value = false;
  };
</script>

<template>
  <PCanvas
    :sidebarStartOpen="isSidebarStartOpen"
    :sidebarEndOpen="isSidebarEndOpen"
    @sidebarStartUpdate="onSidebarStartUpdate"
    @sidebarEndDismiss="onSidebarEndDismiss"
  >
    <a slot="title" href="#">App Name</a>

    <PButton
      slot="header-end"
      icon="configurate"
      variant="secondary"
      :compact="true"
      :hideLabel="true"
      @click="onSidebarEndOpen"
    >
      Open sidebar
    </PButton>

    <div class="-p-canvas-grid">
      <PText class="-col-span-full-1">Content</PText>

      <div class="tile -col-span-4">Grid span 4x</div>
      <div class="tile -col-span-4">Grid span 4x</div>
      <div class="tile -col-span-4">Grid span 4x</div>

      <div class="tile -col-span-full-1">12 Grid columns</div>
      <div class="tile -col-span-full-2">10 Grid columns</div>
      <div class="tile -col-span-full-3">8 Grid columns</div>
    </div>

    <div slot="footer" class="-p-canvas-grid">
      <PText class="-col-span-full-1">Footer</PText>
      <div class="tile -col-span-full-1">12 Grid columns</div>
    </div>

    <div slot="sidebar-start">
      <PText>Sidebar Start</PText>
    </div>

    <PHeading slot="sidebar-end-header" tag="h2" size="small"> Sidebar End Header </PHeading>

    <div slot="sidebar-end">
      <PText>Sidebar End</PText>
    </div>
  </PCanvas>
</template>

<style scoped>
  .-col-span-full-1 {
    grid-column: 1 / -1;
  }

  .-col-span-full-2 {
    grid-column: 2 / -2;
  }

  .-col-span-full-3 {
    grid-column: 3 / -3;
  }

  .-col-span-4 {
    grid-column: span 4;
  }

  .tile {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: lightpink;
  }
</style>
