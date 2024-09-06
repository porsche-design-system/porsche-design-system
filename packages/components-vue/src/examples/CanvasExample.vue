<script setup lang="ts">
  import { PCanvas, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <PCanvas>
    <a slot="title" href="#">App Name</a>

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
      <PText>Footer</PText>
    </div>
    <div slot="sidebar-start">
      <PText>Sidebar Start</PText>
    </div>
    <div slot="sidebar-end">
      <PText>Sidebar End</PText>
    </div>
  </PCanvas>
</template>

<style>
  body {
    overflow-x: hidden;
  }
</style>

<style scoped>
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
    background: lightpink;
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
