<script setup lang="ts">
  import { PTag } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="flex flex-wrap gap-static-md">
    <PTag icon="car" variant="primary">
      <button type="button">
        Variant primary
      </button>
    </PTag>
    <PTag variant="secondary">
      <button type="button">
        Variant secondary
      </button>
    </PTag>
    <PTag variant="info">
      <button type="button">
        Variant info
      </button>
    </PTag>
    <PTag variant="warning">
      <button type="button">
        Variant warning
      </button>
    </PTag>
    <PTag variant="success">
      <button type="button">
        Variant success
      </button>
    </PTag>
    <PTag variant="error">
      <button type="button">
        Variant error
      </button>
    </PTag>
  </div>
</template>
