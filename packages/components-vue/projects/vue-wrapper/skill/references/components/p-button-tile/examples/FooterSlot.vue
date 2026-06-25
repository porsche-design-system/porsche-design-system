<script setup lang="ts">
  import { PButtonTile, PTag, PText } from '@porsche-design-system/components-vue';
</script>

<template>
  <div class="grid grid-cols-2 gap-static-md">
    <PButtonTile label="Some label" description="Some Description">
      <PTag slot="header" color="background-frosted" :compact="true">
        Some tag
      </PTag>
      <img src="assets/lights.jpg" alt="Some image description" />
      <PText slot="footer">
        Some footer text
      </PText>
    </PButtonTile>
    <PButtonTile label="Some label" description="Some Description" :compact="true">
      <PTag slot="header" color="background-frosted" :compact="true">
        Some tag
      </PTag>
      <img src="assets/lights.jpg" alt="Some image description" />
      <PText slot="footer">
        Some footer text
      </PText>
    </PButtonTile>
  </div>
</template>
