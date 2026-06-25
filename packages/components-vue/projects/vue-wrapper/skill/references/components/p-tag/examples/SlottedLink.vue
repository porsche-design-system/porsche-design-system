<script setup lang="ts">
  import { PTag } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="flex flex-wrap gap-static-md">
    <PTag icon="car" variant="primary">
      <a href="https://porsche.com">
        Variant primary
      </a>
    </PTag>
    <PTag variant="secondary">
      <a href="https://porsche.com">
        Variant secondary
      </a>
    </PTag>
    <PTag variant="info">
      <a href="https://porsche.com">
        Variant info
      </a>
    </PTag>
    <PTag variant="warning">
      <a href="https://porsche.com">
        Variant warning
      </a>
    </PTag>
    <PTag variant="success">
      <a href="https://porsche.com">
        Variant success
      </a>
    </PTag>
    <PTag variant="error">
      <a href="https://porsche.com">
        Variant error
      </a>
    </PTag>
  </div>
</template>
